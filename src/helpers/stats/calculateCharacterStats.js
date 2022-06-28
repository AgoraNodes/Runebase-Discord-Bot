import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import { calculateSkillDamage } from "../skills/calculateSkillDamage";
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";

export const calculateCharacterStats = async (
  currentCharacter,
  t = false,
) => {
  const nextRank = await db.rank.findOne({
    where: {
      expNeeded: {
        [Op.gt]: currentCharacter.user.exp,
      },
    },
    order: [
      ['id', 'ASC'],
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentCharacter.user.ranks[0].expNeeded;

  const countedSpendAttributes = currentCharacter.stats.strength
    + currentCharacter.stats.dexterity
    + currentCharacter.stats.vitality
    + currentCharacter.stats.energy;
  const AttributesToSpend = (currentCharacter.user.ranks[0].id * 5) - countedSpendAttributes;

  const strength = currentCharacter.user.currentClass.strength + currentCharacter.stats.strength;

  const dexterity = currentCharacter.user.currentClass.dexterity + currentCharacter.stats.dexterity;

  const vitality = currentCharacter.user.currentClass.vitality + currentCharacter.stats.vitality;

  const energy = currentCharacter.user.currentClass.energy + currentCharacter.stats.energy;

  // Calculate by skill in later version, instead of just weapon damage
  const attackOneMin = (
    currentCharacter.equipment.mainHand
  )
    ? (currentCharacter.equipment.mainHand.minDamage)
    : 1;

  const attackOnemax = (
    currentCharacter.equipment.mainHand
  )
    ? (currentCharacter.equipment.mainHand.maxDamage)
    : 2;

  const attackOneAr = currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5);

  const attackTwoAr = currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5);

  let block = 0;
  let defense = 0;
  if (
    currentCharacter.equipment.offHand
    && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields'
  ) {
    const shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
    const blocking = (shieldBlock * (dexterity - 15)) / (currentCharacter.user.ranks[0].id * 2);
    block = blocking > 50 ? 50 : blocking;
  }

  const maxHp = currentCharacter.user.currentClass.life + currentCharacter.stats.life;
  const currentHp = currentCharacter.condition.life;

  const maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
  const currentStaminaPoints = currentCharacter.condition.stamina;

  const maxMp = currentCharacter.user.currentClass.mana + currentCharacter.stats.mana;
  const currentMp = currentCharacter.condition.mana;

  defense += currentCharacter.user.currentClass.defense;

  Object.keys(currentCharacter.equipment).forEach((key) => {
    if (
      (key === 'helm'
        || key === 'belt'
        || key === 'boots'
        || key === 'gloves'
        || key === 'armor'
        || key === 'offHand'
        || key === 'amulet'
        || key === 'ringSlotTwo'
        || key === 'ringSlotOne'
      )
      && currentCharacter.equipment[key]
      && currentCharacter.equipment[key].defense
    ) {
      const realDefenseValue = Math.round((currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0))));
      defense += realDefenseValue;
    }
  });

  const selectedSkills = await fetchUserCurrentSelectedSkills(
    currentCharacter.user.user_id,
    t,
  );

  // calculate Skill damage
  const skillOne = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedMainSkill,
    {
      min: attackOneMin,
      max: attackOnemax,
      ar: attackOneAr,
    },
    t,
  );

  // calculate Skill damage
  const skillTwo = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedSecondarySkill,
    {
      min: attackOneMin,
      max: attackOnemax,
      ar: attackOneAr,
    },
    t,
  );

  return {
    username: currentCharacter.user.username,
    currentClass: currentCharacter.user.currentClass.name,
    lvl: currentCharacter.user.ranks[0].id,
    exp: currentCharacter.user.exp,
    expNext: nextRankExp,
    unspedAttributes: AttributesToSpend,
    strength,
    dexterity,
    vitality,
    energy,
    stamina: {
      current: currentStaminaPoints,
      max: maxStamina,
    },
    defense,
    block,
    hp: {
      current: currentHp,
      max: maxHp,
    },
    mp: {
      current: currentMp,
      max: maxMp,
    },
    FR: 0,
    PR: 0,
    LR: 0,
    CR: 0,
    attackOne: {
      name: skillOne.name,
      min: skillOne.min,
      max: skillOne.max,
      ar: skillOne.ar,
      cost: skillOne.cost,
    },
    attackTwo: {
      name: skillTwo.name,
      min: skillTwo.min,
      max: skillTwo.max,
      ar: skillTwo.ar,
      cost: skillTwo.cost,
    },
    regularAttack: {
      name: 'Attack',
      min: attackOneMin,
      max: attackOnemax,
      ar: attackOneAr,
      cost: 0,
    },
  };
};
