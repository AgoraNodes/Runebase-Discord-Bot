import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import { randomIntFromInterval } from './utils';

export const generateRandomMagicItem = async (
  level,
  t = false,
) => {
  const randomBaseItem = await db.itemBase.findOne({
    order: [
      [Sequelize.literal('RAND()')],
    ],
    where: {
      // '$itemFamily.itemType.name$': 'Assassin Katars',
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
        include: [
          {
            model: db.itemType,
            as: 'itemType',
          },
        ],
      },
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });
  // console.log('after random Base item');
  // console.log(randomBaseItem);

  const itemQualityRecord = await db.itemQuality.findOne({
    where: {
      name: 'Magic',
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

  // console.log(randomBaseItem);
  // console.log(randomBaseItem.itemFamily);
  // console.log(randomBaseItem.itemFamily.itemType);

  const randomItemModifiers = await db.itemModifier.findAll({
    order: [
      [Sequelize.literal('RAND()')],
    ],
    where: {
      levelReq: {
        [Op.or]: [
          {
            [Op.lte]: level,
          },
          null,
        ],
      },
    },
    limit: 2,
    include: [
      {
        model: db.itemQuality,
        as: 'itemQuality',
        required: true,
        where: {
          name: 'Magic',
        },
      },
      {
        model: db.ItemModifierItemType,
        as: 'ItemModifierItemTypes',
        required: true,
        where: {
          itemTypeId: randomBaseItem.itemFamily.itemType.id,
        },
      },
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

  // console.log(randomItemModifiers);

  let prefixModifier;
  let suffixModifier;

  randomItemModifiers.forEach((modifier) => {
    if (modifier.prefix && !prefixModifier) {
      prefixModifier = modifier;
    }
    if (modifier.suffix && !suffixModifier) {
      suffixModifier = modifier;
    }
  });
  // console.log(prefixModifier);
  // console.log(suffixModifier);
  let levelReq;
  let rndDefense;
  let minDamage;
  let maxDamage;
  let minThrowDamage;
  let maxThrowDamage;
  let addStrength = 0;
  let addDexterity = 0;
  let addVitality = 0;
  let addEnergy = 0;
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

  // Calculate Strength
  if (prefixModifier && prefixModifier.minStrength && prefixModifier.maxStrength) {
    const rndStrength = randomIntFromInterval(
      prefixModifier.minStrength,
      prefixModifier.maxStrength,
    );
    addStrength += rndStrength;
  }
  if (suffixModifier && suffixModifier.minStrength && suffixModifier.maxStrength) {
    const rndStrength = randomIntFromInterval(
      suffixModifier.minStrength,
      suffixModifier.maxStrength,
    );
    addStrength += rndStrength;
  }

  // Calculate Dexterity
  if (prefixModifier && prefixModifier.minDexterity && prefixModifier.maxDexterity) {
    const rndDexterity = randomIntFromInterval(
      prefixModifier.minDexterity,
      prefixModifier.maxDexterity,
    );
    addDexterity += rndDexterity;
  }
  if (suffixModifier && suffixModifier.minDexterity && suffixModifier.maxDexterity) {
    const rndDexterity = randomIntFromInterval(
      suffixModifier.minDexterity,
      suffixModifier.maxDexterity,
    );
    addDexterity += rndDexterity;
  }

  // Calculate Vitality
  if (prefixModifier && prefixModifier.minVitality && prefixModifier.maxVitality) {
    const rndVitality = randomIntFromInterval(
      prefixModifier.minVitality,
      prefixModifier.maxVitality,
    );
    addVitality += rndVitality;
  }
  if (suffixModifier && suffixModifier.minVitality && suffixModifier.maxVitality) {
    const rndVitality = randomIntFromInterval(
      suffixModifier.minVitality,
      suffixModifier.maxVitality,
    );
    addVitality += rndVitality;
  }

  // Calculate Energy
  if (prefixModifier && prefixModifier.minEnergy && prefixModifier.maxEnergy) {
    const rndEnergy = randomIntFromInterval(
      prefixModifier.minEnergy,
      prefixModifier.maxEnergy,
    );
    addEnergy += rndEnergy;
  }
  if (suffixModifier && suffixModifier.minEnergy && suffixModifier.maxEnergy) {
    const rndEnergy = randomIntFromInterval(
      suffixModifier.minEnergy,
      suffixModifier.maxEnergy,
    );
    addEnergy += rndEnergy;
  }

  // Calculate ED (enhanced damage/defense)
  if (prefixModifier && prefixModifier.minEdefense && prefixModifier.maxEdefense) {
    const rndEdefense = randomIntFromInterval(
      prefixModifier.minEdefense,
      prefixModifier.maxEdefense,
    );
    addEdefense += rndEdefense;
  }
  if (suffixModifier && suffixModifier.minEdefense && suffixModifier.maxEdefense) {
    const rndEdefense = randomIntFromInterval(
      suffixModifier.minEdefense,
      suffixModifier.maxEdefense,
    );
    addEdefense += rndEdefense;
  }

  // Calculate ED (enhanced damage/defense)
  if (prefixModifier && prefixModifier.minEdamage && prefixModifier.maxEdamage) {
    const rndEdamage = randomIntFromInterval(
      prefixModifier.minEdamage,
      prefixModifier.maxEdamage,
    );
    addEdamage += rndEdamage;
  }
  if (suffixModifier && suffixModifier.minEdamage && suffixModifier.maxEdamage) {
    const rndEdamage = randomIntFromInterval(
      suffixModifier.minEdamage,
      suffixModifier.maxEdamage,
    );
    addEdamage += rndEdamage;
  }

  let baseItemName;
  if (randomBaseItem.itemFamily.name === 'Rings') {
    baseItemName = 'ring';
  } else if (randomBaseItem.itemFamily.name === 'Amulets') {
    baseItemName = 'amulet';
  } else {
    baseItemName = randomBaseItem.name;
  }
  const itemName = `${(prefixModifier && prefixModifier.prefix ? `${prefixModifier.prefix} ` : '')}${baseItemName}${(suffixModifier && suffixModifier.suffix ? ` ${suffixModifier.suffix}` : '')}`;

  const createNewItem = await db.item.create({
    name: itemName,
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
    ...(
      addStrength !== 0 && {
        strength: addStrength,
      }
    ),
    ...(
      addDexterity !== 0 && {
        dexterity: addDexterity,
      }
    ),
    ...(
      addVitality !== 0 && {
        vitality: addVitality,
      }
    ),
    ...(
      addEnergy !== 0 && {
        energy: addEnergy,
      }
    ),
  }, {
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
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
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

  return newItem;
};
