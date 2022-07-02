import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../../messages';

export const addVitality = async (
  userId,
  discordChannel,
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
          id: userId,
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
      let addLife = 0;
      let addStamina = 1;

      if (user.currentClass.name === 'Assasin') {
        if (user.UserClass.stats.vitality % 4 === 0) {
          addStamina = 2;
        }
      }

      console.log(user.currentClass.name);
      if (user.currentClass.name === 'Barbarian') {
        addLife = 4;
      } else if (
        user.currentClass.name === 'Amazon'
        || user.currentClass.name === 'Assasin'
        || user.currentClass.name === 'Paladin'
      ) {
        addLife = 3;
      } else if (
        user.currentClass.name === 'Druid'
        || user.currentClass.name === 'Necromancer'
        || user.currentClass.name === 'Sorceress'
      ) {
        addLife = 2;
      }

      const updateVitality = await user.UserClass.stats.update({
        vitality: user.UserClass.stats.vitality + 1,
        life: user.UserClass.stats.life + addLife,
        stamina: user.UserClass.stats.stamina + addStamina,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const updateCondition = await user.UserClass.condition.update({
        life: user.UserClass.condition.life + addLife,
        stamina: user.UserClass.condition.stamina + addStamina,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const preActivity = await db.activity.create({
        type: 'addVitality_s',
        earnerId: userId,
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
          type: 'addVitality',
          error: `${err}`,
        });
      } catch (e) {
        logger.error(`Error Discord: ${e}`);
      }
      if (err.code && err.code === 50007) {
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "addVitality",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await discordChannel.send({
          embeds: [
            discordErrorMessage(
              "addVitality",
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    });
    if (activity.length > 0) {
      io.to('admin').emit('updateActivity', {
        activity,
      });
    }
  });

  const myUpdatedUser = await db.UserClass.findOne({
    where: {
      classId: {
        [Op.col]: 'user.currentClassId',
      },
    },
    include: [
      {
        model: db.user,
        as: 'user',
        where: {
          id: userId,
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
        ],
      },
      {
        model: db.stats,
        as: 'stats',
      },
      {
        model: db.condition,
        as: 'condition',
      },
      {
        model: db.equipment,
        as: 'equipment',
      },
      {
        model: db.class,
        as: 'class',
      },
    ],
  });

  return [
    myUpdatedUser,
    cannotSpend,
  ];
};
