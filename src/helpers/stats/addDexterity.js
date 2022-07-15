import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { fetchUserCurrentCharacter } from "../character/character";

export const addDexterity = async (
  currentUserCharacter,
  io,
  queue,
) => {
  const activity = [];
  let cannotSpend;
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      const user = await db.user.findOne({
        where: {
          id: currentUserCharacter.user.id,
        },
        include: [
          {
            model: db.class,
            as: 'currentClass',
          },
          {
            model: db.rank,
            as: 'ranks',
          },
          {
            model: db.UserClass,
            as: 'UserClass',
            where: {
              classId: {
                [Op.col]: 'user.currentClassId',
              },
            },
            include: [
              {
                model: db.stats,
                as: 'stats',
              },
              {
                model: db.condition,
                as: 'condition',
              },
            ],
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const calc = (
        user.UserClass.stats.strength
        + user.UserClass.stats.dexterity
        + user.UserClass.stats.vitality
        + user.UserClass.stats.energy
      ) < (user.ranks[0].level * 5);

      if (!calc) {
        cannotSpend = true;
        return;
      }

      const updateDexterity = await user.UserClass.stats.update({
        dexterity: user.UserClass.stats.dexterity + 1,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const preActivity = await db.activity.create({
        type: 'addDexterity_s',
        earnerId: currentUserCharacter.user.id,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const finalActivity = await db.activity.findOne({
        where: {
          id: preActivity.id,
        },
        include: [
          {
            model: db.user,
            as: 'earner',
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      activity.unshift(finalActivity);
      t.afterCommit(() => {
        console.log('done updating dex');
      });
    }).catch(async (err) => {
      console.log(err);
      try {
        await db.error.create({
          type: 'addDexterity',
          error: `${err}`,
        });
      } catch (e) {
        logger.error(`Error Discord: ${e}`);
      }
    });
    if (activity.length > 0) {
      io.to('admin').emit('updateActivity', {
        activity,
      });
    }
  });

  const myUpdatedUser = await fetchUserCurrentCharacter(
    currentUserCharacter.user.user_id, // user discord id
    false, // Need inventory?
  );

  return [
    myUpdatedUser,
    cannotSpend,
  ];
};
