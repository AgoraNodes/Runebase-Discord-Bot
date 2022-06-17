import {
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../../messages';

export const destroyItem = async (
  userCurrentCharacter,
  itemId,
  discordChannel,
  io,
  queue,
) => {
  const activity = [];
  let findItemToDestroy;
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      findItemToDestroy = await db.item.findOne({
        where: {
          id: itemId,
          inventoryId: userCurrentCharacter.inventoryId,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const unlinkItemFromUser = findItemToDestroy.update({
        inventoryId: null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const preActivity = await db.activity.create({
        type: 'destroyItem_s',
        earnerId: userCurrentCharacter.user.id,
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
          type: 'destroyItem',
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

  const myUpdatedUser = await db.UserClass.findOne({
    where: {
      classId: userCurrentCharacter.user.currentClassId,
    },
    include: [
      {
        model: db.user,
        as: 'user',
        where: {
          id: `${userCurrentCharacter.user.id}`,
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
        model: db.inventory,
        as: 'inventory',
        include: [
          {
            model: db.item,
            as: 'items',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
        ],
      },
    ],
  });

  return [
    myUpdatedUser,
    findItemToDestroy,
  ];
};
