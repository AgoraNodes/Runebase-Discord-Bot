import {
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { fetchUserCurrentCharacter } from "../character/character";

export const addStrength = async (
  currentUserCharacter,
  io,
  queue,
) => {
  const activity = [];
  let cannotSpend;
  console.log(currentUserCharacter);
  console.log('before add strength');
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      const user = await db.user.findOne({
        where: {
          id: currentUserCharacter.UserGroup.user.id,
        },
        include: [
          {
            model: db.class,
            as: 'currentClass',
          },
          {
            model: db.UserGroup,
            as: 'UserGroup',
            where: {
              groupId: {
                [Op.col]: 'user.currentRealmId',
              },
            },
            include: [
              {
                model: db.rank,
                as: 'ranks',
              },
              {
                model: db.UserGroupClass,
                as: 'UserGroupClass',
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
          },

        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      console.log(user);
      console.log('user!!');

      const calc = (
        user.UserGroup.UserGroupClass.stats.strength
        + user.UserGroup.UserGroupClass.stats.dexterity
        + user.UserGroup.UserGroupClass.stats.vitality
        + user.UserGroup.UserGroupClass.stats.energy
      ) < (user.UserGroup.ranks[0].level * 5);

      if (!calc) {
        cannotSpend = true;
        return;
      }

      const updateStrength = await user.UserGroup.UserGroupClass.stats.update({
        strength: user.UserGroup.UserGroupClass.stats.strength + 1,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const preActivity = await db.activity.create({
        type: 'addStrength_s',
        earnerId: currentUserCharacter.UserGroup.user.id,
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
    }).catch(async (err) => {
      console.log(err);
      try {
        await db.error.create({
          type: 'addStrength',
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

  console.log('addstrength');
  const myUpdatedUser = await fetchUserCurrentCharacter(
    currentUserCharacter.UserGroup.user.user_id, // user discord id
    false, // Need inventory?
  );

  return [
    myUpdatedUser,
    cannotSpend,
  ];
};
