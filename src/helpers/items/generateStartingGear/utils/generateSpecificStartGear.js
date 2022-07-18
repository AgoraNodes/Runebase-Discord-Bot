import {
  Sequelize,
} from "sequelize";
import db from '../../../../models';

import { randomIntFromInterval } from '../../utils';

export const generateSpecificStartItem = async (
  name,
  t,
) => {
  const randomBaseItem = await db.itemBase.findOne({
    order: [
      [Sequelize.literal('RAND()')],
    ],
    where: {
      name,
    },
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

  const itemQualityRecord = await db.itemQuality.findOne({
    where: {
      name: 'Normal',
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

  let levelReq;
  let rndDefense;
  let minDamage;
  let maxDamage;
  let minThrowDamage;
  let maxThrowDamage;

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

  const createNewItem = await db.item.create({
    name: randomBaseItem.name,
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
