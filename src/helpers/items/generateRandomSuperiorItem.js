import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';

import { randomIntFromInterval } from './utils';

export const generateRandomSuperiorItem = async (level) => {
  const randomBaseItem = await db.itemBase.findOne({
    order: [
      [Sequelize.literal('RAND()')],
    ],
    where: {
      // '$itemFamily.itemType.name$': 'Throwing',
      levelReq: {
        [Op.or]: [
          {
            [Op.lte]: level,
          },
          null,
        ],
      },
    },
    // where: { '$itemFamily.name$': 'War Axe' },
    include: [
      {
        model: db.itemFamily,
        as: 'itemFamily',
        where: {
          name: {
            [Op.or]: [
              {
                [Op.ne]: "Rings",
              },
              {
                [Op.ne]: "Amulets",
              },
            ],
          },
        },
        include: [
          {
            model: db.itemType,
            as: 'itemType',
          },
        ],
      },
    ],
  });
  const itemQualityRecord = await db.itemQuality.findOne({
    where: {
      name: 'Superior',
    },
  });

  let levelReq;
  let rndDefense;
  let minDamage;
  let maxDamage;
  let minThrowDamage;
  let maxThrowDamage;
  let addEdefense = 0;
  let addEdamage = 0;

  // Calculate level requirement
  if (randomBaseItem.levelReq) {
    levelReq = randomBaseItem.levelReq;
  }

  // Calculate Defense
  if (randomBaseItem.minDefense && randomBaseItem.maxDefense) {
    rndDefense = randomIntFromInterval(
      randomBaseItem.minDefense,
      randomBaseItem.maxDefense,
    );
  }

  // calculate min, max damage
  // Calculate Defense
  if (randomBaseItem.minDamage && randomBaseItem.maxDamage) {
    minDamage = randomBaseItem.minDamage;
    maxDamage = randomBaseItem.maxDamage;
  }

  if (randomBaseItem.minThrowDamage && randomBaseItem.maxThrowDamage) {
    minThrowDamage = randomBaseItem.minThrowDamage;
    maxThrowDamage = randomBaseItem.maxThrowDamage;
  }

  if (
    randomBaseItem.itemFamily.itemType.name === 'Helms'
    || randomBaseItem.itemFamily.itemType.name === 'Armors'
    || randomBaseItem.itemFamily.itemType.name === 'Shields'
    || randomBaseItem.itemFamily.itemType.name === 'Gloves'
    || randomBaseItem.itemFamily.itemType.name === 'Boots'
    || randomBaseItem.itemFamily.itemType.name === 'Belts'
    || randomBaseItem.itemFamily.itemType.name === 'Circlets'
    || randomBaseItem.itemFamily.itemType.name === 'Barbarian Helms'
    || randomBaseItem.itemFamily.itemType.name === 'Druid Pelts'
    || randomBaseItem.itemFamily.itemType.name === 'Paladin Shields'
    || randomBaseItem.itemFamily.itemType.name === 'Necromancer Shrunken Heads'
  ) {
    const rndEdefense = randomIntFromInterval(
      5,
      15,
    );
    addEdefense += rndEdefense;
  }
  if (
    randomBaseItem.itemFamily.itemType.name === 'Axes'
    || randomBaseItem.itemFamily.itemType.name === 'Bows'
    || randomBaseItem.itemFamily.itemType.name === 'Crossbows'
    || randomBaseItem.itemFamily.itemType.name === 'Daggers'
    || randomBaseItem.itemFamily.itemType.name === 'Javelins'
    || randomBaseItem.itemFamily.itemType.name === 'Maces'
    || randomBaseItem.itemFamily.itemType.name === 'Polearms'
    || randomBaseItem.itemFamily.itemType.name === 'Scepters'
    || randomBaseItem.itemFamily.itemType.name === 'Spears'
    || randomBaseItem.itemFamily.itemType.name === 'Staves'
    || randomBaseItem.itemFamily.itemType.name === 'Swords'
    || randomBaseItem.itemFamily.itemType.name === 'Throwing'
    || randomBaseItem.itemFamily.itemType.name === 'Wands'
    || randomBaseItem.itemFamily.itemType.name === 'Amazon Weapons'
    || randomBaseItem.itemFamily.itemType.name === 'Assasin Katars'
    || randomBaseItem.itemFamily.itemType.name === 'Sorceress Orbs'
  ) {
    const rndEdamage = randomIntFromInterval(
      5,
      15,
    );
    addEdamage += rndEdamage;
  }

  const createNewItem = await db.item.create({
    name: `Superior ${randomBaseItem.name}`,
    itemBaseId: randomBaseItem.id,
    itemQualityId: itemQualityRecord.id,
    durability: randomBaseItem.durability,
    stack: randomBaseItem.maxStack,
    ...(
      levelReq && {
        levelReq,
      }
    ),
    ...(
      rndDefense && {
        defense: rndDefense,
      }
    ),
    ...(
      addEdefense !== 0 && {
        eDefense: addEdefense,
      }
    ),
    ...(
      addEdamage !== 0 && {
        eDamage: addEdamage,
      }
    ),
    ...(
      minDamage && {
        minDamage,
      }
    ),
    ...(
      maxDamage && {
        maxDamage,
      }
    ),
    ...(
      minThrowDamage && {
        minThrowDamage,
      }
    ),
    ...(
      maxThrowDamage && {
        maxThrowDamage,
      }
    ),
  });

  const newItem = await db.item.findOne({
    where: {
      id: createNewItem.id,
    },
    include: [
      {
        model: db.itemQuality,
        as: 'itemQuality',
        required: true,
      },
      {
        model: db.itemBase,
        as: 'itemBase',
        required: true,
        include: [
          {
            model: db.itemFamily,
            as: 'itemFamily',
            required: true,
            include: [
              {
                model: db.itemType,
                as: 'itemType',
                required: true,
              },
            ],
          },
        ],
      },
    ],
  });

  return newItem;
};
