import { generateWarriorStartGear } from "./warrior";
import { generatePaladinStartGear } from './paladin';
import { generateSorceressStartGear } from './sorceress';
import { generateDruidStartGear } from './druid';
import { generateAssassinStartGear } from './assassin';
import { generateNecromancerStartGear } from "./necromancer";
import { generateAmazonStartGear } from "./amazon";

export const generateStartGear = async (
  className,
  t,
) => {
  let mainHand;
  let offHand;
  if (className === 'Warrior') {
    [
      mainHand,
      offHand,
    ] = await generateWarriorStartGear(
      t,
    );
  }
  if (className === 'Paladin') {
    [
      mainHand,
      offHand,
    ] = await generatePaladinStartGear(
      t,
    );
  }
  if (className === 'Necromancer') {
    [
      mainHand,
      offHand,
    ] = await generateNecromancerStartGear(
      t,
    );
  }
  if (className === 'Sorceress') {
    [
      mainHand,
      offHand,
    ] = await generateSorceressStartGear(
      t,
    );
  }
  if (className === 'Druid') {
    [
      mainHand,
      offHand,
    ] = await generateDruidStartGear(
      t,
    );
  }
  if (className === 'Assassin') {
    [
      mainHand,
      offHand,
    ] = await generateAssassinStartGear(
      t,
    );
  }
  if (className === 'Amazon') {
    [
      mainHand,
      offHand,
    ] = await generateAmazonStartGear(
      t,
    );
  }
  return [
    mainHand,
    offHand,
  ];
};
