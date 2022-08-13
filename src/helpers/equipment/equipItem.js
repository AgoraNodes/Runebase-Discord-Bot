import {
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { calcStrengthDexforReq } from "./calcStrengthDexforReq";
import { equipHelm } from "./equip/Helm";
import { equipArmor } from './equip/Armor';
import { equipOffHand } from './equip/OffHand';

import { equipBelt } from './equip/Belt';
import { equipBoots } from './equip/Boots';
import { equipGloves } from './equip/Gloves';
import { equipAmulet } from './equip/Amulet';
import { equipMainHand } from './equip/MainHand';
import { equipRing } from './equip/Rings';
import { fetchUserCurrentCharacter } from "../character/character";

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
      console.log('eq 1');
      // const findUserCharacter = await fetchUserCurrentCharacter(
      //   userCurrentCharacter.UserGroup.user.user_id, // user discord id
      //   false, // Need inventory?
      //   t,
      // );

      const findUserCharacter = await db.UserGroupClass.findOne({
        where: {
          id: userCurrentCharacter.id,
          // '$UserGroup.group.id$': userCurrentCharacter.currentRealmId,
        },
        include: [
          {
            model: db.UserGroup,
            as: 'UserGroup',
            include: [
              {
                model: db.UserGroupRank,
                as: 'UserGroupRank',
                include: [
                  {
                    model: db.rank,
                    as: 'rank',
                  },
                ],
              },
              {
                model: db.group,
                as: 'group',
              },
              {
                model: db.user,
                as: 'user',
                include: [
                  {
                    model: db.class,
                    as: 'currentClass',
                  },
                ],
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
            include: [
              {
                model: db.item,
                as: 'helm',
              },
              {
                model: db.item,
                as: 'armor',
              },
              {
                model: db.item,
                as: 'amulet',
              },
              {
                model: db.item,
                as: 'mainHand',
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
                ],
              },
              {
                model: db.item,
                as: 'offHand',
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
                ],
              },
              {
                model: db.item,
                as: 'gloves',
              },
              {
                model: db.item,
                as: 'belt',
              },
              {
                model: db.item,
                as: 'boots',
              },
              {
                model: db.item,
                as: 'ringSlotOne',
              },
              {
                model: db.item,
                as: 'ringSlotTwo',
              },
            ],
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      console.log('eq 2');
      const [
        userStrength,
        userDexterity,
      ] = await calcStrengthDexforReq(
        findUserCharacter,
      );
      console.log('eq 3');
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
      console.log('eq 4');
      if (
        findItemToEquip.itemBase.strengthReq
        && userStrength < findItemToEquip.itemBase.strengthReq
      ) {
        cannotEquipReason = 'Too low Strength';
        cannotEquip = true;
        return;
      }

      if (
        findItemToEquip.itemBase.dexterityReq
        && userDexterity < findItemToEquip.itemBase.dexterityReq
      ) {
        cannotEquipReason = 'Too low Dexterity';
        cannotEquip = true;
        return;
      }

      if (
        findItemToEquip.levelReq
        && findUserCharacter.user.UserRank.id < findItemToEquip.levelReq
      ) {
        cannotEquipReason = 'Too low level';
        cannotEquip = true;
        return;
      }
      console.log(userCurrentCharacter.UserGroup.user.currentClass.name);

      if (
        (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Wizard Orbs'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Wizard'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Paladin'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Necromancer'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Amazon'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Assassin Katars'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Assassin'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Druid'
        )
        || (
          findItemToEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms'
          && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Warrior'
        )
      ) {
        cannotEquipReason = 'Cannot Equip with this class';
        cannotEquip = true;
        return;
      }

      if (
        findItemToEquip.itemBase.itemFamily.itemType.name === 'Helms'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Circlets'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms'
      ) {
        await equipHelm(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Belts') {
        await equipBelt(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Gloves') {
        await equipGloves(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }

      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Boots') {
        await equipBoots(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Rings') {
        await equipRing(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Amulets') {
        await equipAmulet(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (findItemToEquip.itemBase.itemFamily.itemType.name === 'Armors') {
        await equipArmor(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }
      if (
        findItemToEquip.itemBase.itemFamily.itemType.name === 'Shields'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Wizard Orbs'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads'
      ) {
        await equipOffHand(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }

      if (
        findItemToEquip.itemBase.itemFamily.itemType.name === 'Axes'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Bows'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Crossbows'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Daggers'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Javelins'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Maces'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Polearms'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Scepters'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Spears'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Staves'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Swords'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Throwing'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Wands'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Assassin Katars'
        || findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons'
      ) {
        await equipMainHand(
          userCurrentCharacter,
          findUserCharacter.equipment,
          findItemToEquip,
          t,
        );
      }

      const preActivity = await db.activity.create({
        type: 'equipItem_s',
        earnerId: userCurrentCharacter.UserGroup.user.id,
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
      console.log('error during equiping transaction');
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

  const myUpdatedUser = await db.UserGroupClass.findOne({
    where: {
      id: userCurrentCharacter.id,
      // classId: userCurrentCharacter.UserGroup.user.currentClassId,
      // '$UserGroup.group.id$': userCurrentCharacter.currentRealmId,
    },
    include: [
      {
        model: db.UserGroup,
        as: 'UserGroup',
        include: [
          {
            model: db.UserGroupRank,
            as: 'UserGroupRank',
            include: [
              {
                model: db.rank,
                as: 'rank',
              },
            ],
          },
          {
            model: db.group,
            as: 'group',
          },
          {
            model: db.user,
            as: 'user',
            include: [
              {
                model: db.class,
                as: 'currentClass',
              },
            ],
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
            separate: true,
            order: [
              ['updatedAt', 'DESC'],
            ],
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

  console.log('done equiping');
  return [
    myUpdatedUser,
    findItemToEquip,
    cannotEquip,
    cannotEquipReason,
  ];
};
