import {
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { fetchUserCurrentCharacter } from "../character/character";

export const addEnergy = async (
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
      ) < (user.ranks[0].id * 5);

      if (!calc) {
        cannotSpend = true;
        return;
      }
      let addMana = 0;

      if (user.currentClass.name === 'Warrior') {
        addMana = 1;
      } else if (
        user.currentClass.name === 'Druid'
        || user.currentClass.name === 'Necromancer'
        || user.currentClass.name === 'Sorceress'
      ) {
        addMana = 2;
      } else if (
        user.currentClass.name === 'Amazon'
        || user.currentClass.name === 'Paladin'
      ) {
        addMana = 1;
        if (user.UserClass.stats.energy % 2 === 0) {
          addMana = 2;
        }
      } else if (user.currentClass.name === 'Assasin') {
        addMana = 2;
        if (user.UserClass.stats.energy % 4 === 0) {
          addMana = 1;
        }
      }

      const updateEnergy = await user.UserClass.stats.update({
        energy: user.UserClass.stats.energy + 1,
        mana: user.UserClass.stats.mana + addMana,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const updateCondition = await user.UserClass.condition.update({
        mana: user.UserClass.condition.mana + addMana,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const preActivity = await db.activity.create({
        type: 'addEnergy_s',
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
    }).catch(async (err) => {
      console.log(err);
      try {
        await db.error.create({
          type: 'addEnergy',
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
