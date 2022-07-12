import { generateRandomMagicItem } from "./generateRandomMagicItem";
import { generateRandomNormalItem } from './generateRandomNormalItem';
import { generateRandomLowQualityItem } from './generateRandomLowQualityItem';
import { generateRandomSuperiorItem } from './generateRandomSuperiorItem';

const lootQualityTable = [
  {
    id: 'Low Quality',
    chance: 0.02, // 2%
  },
  {
    id: 'Superior',
    chance: 0.02, // 2%
  },
  {
    id: 'Normal',
    chance: 0.4, // 40%
  },
  {
    id: 'Magic',
    chance: 0.15, // 15%
  },
];

export const generateLoot = async (
  level = 1,
) => {
  let roll = Math.random();
  console.log(roll);
  let pickedQuality = null;
  let item = false;
  for (let i = 0, len = lootQualityTable.length; i < len; ++i) {
    const loot = lootQualityTable[i];
    const { chance } = loot;
    if (roll < chance) {
      pickedQuality = loot;
      break;
    }
    roll -= chance;
  }
  if (pickedQuality) {
    if (pickedQuality.id === 'Low Quality') {
      item = await generateRandomLowQualityItem(level);
    }
    if (pickedQuality.id === 'Normal') {
      item = await generateRandomNormalItem(level);
    }
    if (pickedQuality.id === 'Superior') {
      item = await generateRandomSuperiorItem(level);
    }
    if (pickedQuality.id === 'Magic') {
      item = await generateRandomMagicItem(level);
    }
  }
  // console.log(pickedQuality);
  // console.log('picked quality');
  // console.log(item);
  return item;
};
