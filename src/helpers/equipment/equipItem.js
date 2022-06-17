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
import { equipHelm } from "./equip/Helm";

export const equipItem = async (
  userCurrentCharacter,
  itemId,
  discordChannel,
  io,
  queue,
) => {
  const activity = [];
  let cannotEquip;
  let cannotEquipReason = '';
  let findItemToEquip;
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      const findUserCharacter = await db.UserClass.findOne({
        where: {
          id: userCurrentCharacter.id,
        },
        include: [
          {
            model: db.user,
            as: 'user',
            include: [
              {
                model: db.class,
                as: 'currentClass',
              },
              {
                model: db.UserRank,
                as: 'UserRank',
              },
            ],
          },
          {
            model: db.stats,
            as: 'stats',
          },
          {
            model: db.equipment,
            as: 'equipment',
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const findItemToEquip = await db.item.findOne({
        where: {
          id: itemId,
          inventoryId: userCurrentCharacter.inventoryId,
        },
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
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      console.log(findUserCharacter.user.UserRank);
      console.log(findItemToEquip.levelReq);
      if (
        findItemToEquip.levelReq
        && findUserCharacter.user.UserRank.id < findItemToEquip.levelReq
      ) {
        cannotEquipReason = 'Too low level';
        cannotEquip = true;
        return;
      }
      // TODO: check if user has enough strength and dexterity to equip the item here later
      // Maybe create an extra helper to do the calculation?
      cannotEquipReason = 'place holder';
      console.log(findUserCharacter.equipment);
      console.log(findItemToEquip);
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Helms') {
        await equipHelm(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      const preActivity = await db.activity.create({
        type: 'equipItem_s',
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
          type: 'equipItem',
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
    findItemToEquip,
    cannotEquip,
    cannotEquipReason,
  ];
};
