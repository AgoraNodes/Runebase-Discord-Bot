import { calculateWarriorSkillDamage } from './warrior';
import { calculateAmaSkillDamage } from './amazon';
import { calculateAssaSkillDamage } from './assassin';
import { calculatePalaSkillDamage } from './paladin';
import { calculateDruidSkillDamage } from './druid';
import { calculateNecroSkillDamage } from './necromancer';
import { calculateWizardSkillDamage } from './wizard';

export const calculateSkillDamage = async (
  userCharacter,
  skillToCalculate,
  attackOne,
  t,
) => {
  // console.log(skillToCalculate);
  console.log("userCharacter.class");
  console.log(userCharacter.class);
  let attack;
  if (userCharacter.class.name === 'Warrior') {
    attack = await calculateWarriorSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Assassin') {
    attack = await calculateAssaSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Druid') {
    attack = await calculateDruidSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Necromancer') {
    attack = await calculateNecroSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Wizard') {
    attack = await calculateWizardSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Paladin') {
    attack = await calculatePalaSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  if (userCharacter.class.name === 'Amazon') {
    attack = await calculateAmaSkillDamage(
      skillToCalculate,
      attackOne,
    );
  }
  return attack;
};
