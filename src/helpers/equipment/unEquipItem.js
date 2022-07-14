import {
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { calcStrengthDexforReq } from "./calcStrengthDexforReq";

import { unEquipHelm } from "./unequip/Helm";
import { unEquipArmor } from './unequip/Armor';
import { unEquipOffHand } from './unequip/OffHand';

import { unEquipBelt } from './unequip/Belt';
import { unEquipBoots } from './unequip/Boots';
import { unEquipGloves } from './unequip/Gloves';
import { unEquipAmulet } from './unequip/Amulet';
import { unEquipMainHand } from './unequip/MainHand';
import { unEquipRing } from './unequip/Rings';
import { fetchUserCurrentCharacter } from "../character/character";

export const unEquipItem = async (
  userCurrentCharacter,
  itemId,
  discordChannel,
  io,
  queue,
) => {
  const activity = [];
  let cannotUnEquip;
  const cannotUnEquipReason = '';
  let findItemToUnEquip;
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
              },
              {
                model: db.item,
                as: 'offHand',
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

      findItemToUnEquip = await db.item.findOne({
        where: {
          id: itemId,
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

      if (
        findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Helms'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Circlets'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms'
      ) {
        await unEquipHelm(
          userCurrentCharacter,
          t,
        );
      }
      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Belts') {
        await unEquipBelt(
          userCurrentCharacter,
          t,
        );
      }
      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Gloves') {
        await unEquipGloves(
          userCurrentCharacter,
          t,
        );
      }

      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Boots') {
        await unEquipBoots(
          userCurrentCharacter,
          t,
        );
      }
      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Rings') {
        await unEquipRing(
          userCurrentCharacter,
          findItemToUnEquip,
          t,
        );
      }
      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Amulets') {
        await unEquipAmulet(
          userCurrentCharacter,
          t,
        );
      }
      if (findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Armors') {
        await unEquipArmor(
          userCurrentCharacter,
          t,
        );
      }
      if (
        findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Shields'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Sorceress Orbs'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads'
      ) {
        await unEquipOffHand(
          userCurrentCharacter,
          t,
        );
      }

      if (
        findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Axes'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Bows'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Crossbows'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Daggers'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Javelins'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Maces'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Polearms'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Scepters'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Spears'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Staves'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Swords'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Throwing'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Wands'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Assasin Katars'
        || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons'
      ) {
        await unEquipMainHand(
          userCurrentCharacter,
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
          type: 'unequipItem',
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
    userCurrentCharacter.user.user_id, // user discord id
    true, // Need inventory?
  );

  return [
    myUpdatedUser,
    findItemToUnEquip,
    cannotUnEquip,
    cannotUnEquipReason,
  ];
};
