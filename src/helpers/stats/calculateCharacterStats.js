import {
  Op,
} from "sequelize";
import db from '../../models';
import { calculateSkillDamage } from "./calculateSkills";
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
import calculatePassives from "./calculatePassives";
import calculateBuffs from "./calculateBuffs";

import calculateItemStats from "./calculateItemStats";

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
  const userCurrentRank = currentCharacter.user.ranks[0] ? currentCharacter.user.ranks[0] : { id: 0, expNeeded: nextRank.expNeeded };
  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : userCurrentRank.expNeeded;
  const countedSpendAttributes = currentCharacter.stats.strength
    + currentCharacter.stats.dexterity
    + currentCharacter.stats.vitality
    + currentCharacter.stats.energy;
  const unspendAttributes = (userCurrentRank.id * 5) - countedSpendAttributes;
  let FR = 0;
  let PR = 0;
  let LR = 0;
  let CR = 0;
  let block = 0;
  let defense = 0;
  let totalLifeBonus = 0;
  const lifeSteal = 0;
  const manaSteal = 0;

  let strength = currentCharacter.user.currentClass.strength + currentCharacter.stats.strength;
  let dexterity = currentCharacter.user.currentClass.dexterity + currentCharacter.stats.dexterity;
  let vitality = currentCharacter.user.currentClass.vitality + currentCharacter.stats.vitality;
  let energy = currentCharacter.user.currentClass.energy + currentCharacter.stats.energy;
  const maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
  const currentStaminaPoints = currentCharacter.condition.stamina;

  defense += currentCharacter.user.currentClass.defense;

  let canWearHelm = false;
  let canWearMainHand = false;
  let canWearOffHand = false;
  let canWearArmor = false;
  let canWearGloves = false;
  let canWearBelt = false;
  let canWearBoots = false;
  [
    strength,
    dexterity,
    vitality,
    energy,
    defense,
    block,
    canWearHelm,
    canWearMainHand,
    canWearOffHand,
    canWearArmor,
    canWearGloves,
    canWearBelt,
    canWearBoots,
  ] = await calculateItemStats(
    currentCharacter,
    userCurrentRank,
    strength,
    dexterity,
    vitality,
    energy,
    defense,
    block,
  );

  // Added Damage % by Strength
  const addedStrengthDamagePercentage = 1 + (strength / 100); // Should we substract starting strength from this? (YES/NO)

  // Kick Attack
  let kick = {
    name: 'Kick',
    attackType: 'Physical',
    min: canWearBoots
      && currentCharacter.equipment.boots
      ? Math.round(currentCharacter.equipment.boots.minDamage * addedStrengthDamagePercentage)
      : Math.round(1 * addedStrengthDamagePercentage),
    max: canWearBoots
      && currentCharacter.equipment.boots
      ? Math.round(currentCharacter.equipment.boots.maxDamage * addedStrengthDamagePercentage)
      : Math.round(2 * addedStrengthDamagePercentage),
    ar: currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
    crit: 0,
    lifeSteal,
    manaSteal,
    cost: 0,
  };

  // Regular Weapon Attack
  let regularAttack = {
    name: 'Attack',
    attackType: 'Physical',
    min: canWearMainHand
      && currentCharacter.equipment.mainHand
      ? Math.round(currentCharacter.equipment.mainHand.minDamage * addedStrengthDamagePercentage)
      : Math.round(1 * addedStrengthDamagePercentage),
    max: canWearMainHand
      && currentCharacter.equipment.mainHand
      ? Math.round(currentCharacter.equipment.mainHand.maxDamage * addedStrengthDamagePercentage)
      : Math.round(2 * addedStrengthDamagePercentage),
    minThrow: canWearMainHand
      && currentCharacter.equipment.mainHand
      && currentCharacter.equipment.mainHand.minThrowDamage
      ? Math.round(currentCharacter.equipment.mainHand.minThrowDamage * addedStrengthDamagePercentage)
      : Math.round(0 * addedStrengthDamagePercentage),
    maxThrow: canWearMainHand
      && currentCharacter.equipment.mainHand
      && currentCharacter.equipment.mainHand.maxThrowDamage
      ? Math.round(currentCharacter.equipment.mainHand.maxThrowDamage * addedStrengthDamagePercentage)
      : Math.round(0 * addedStrengthDamagePercentage),
    ar: currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
    crit: 0,
    stun: 0,
    parry: 0,
    lifeSteal,
    manaSteal,
    cost: 0,
  };

  // Add Passive Skill stats
  [
    defense,
    regularAttack,
    kick,
    FR,
    PR,
    LR,
    CR,
  ] = await calculatePassives(
    currentCharacter,
    defense,
    regularAttack,
    kick,
    FR,
    PR,
    LR,
    CR,
  );

  let currentHp = currentCharacter.condition.life;
  let maxHp = currentCharacter.user.currentClass.life + currentCharacter.stats.life;
  const currentMp = currentCharacter.condition.mana;
  const maxMp = currentCharacter.user.currentClass.mana + currentCharacter.stats.mana;

  console.log('before calculating buffs');
  // Calculate Buffs
  [
    defense,
    regularAttack,
    currentHp,
    maxHp,
    totalLifeBonus,
  ] = await calculateBuffs(
    currentCharacter,
    defense,
    regularAttack,
    currentHp,
    maxHp,
  );
  console.log('after calculating buffs');
  // Fetch Selected Skills
  const selectedSkills = await fetchUserCurrentSelectedSkills(
    currentCharacter.user.user_id,
    t,
  );
  console.log('after skill selection');
  // calculate Skill damage
  const attackOne = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedMainSkill,
    regularAttack,
    t,
  );
  console.log('after main skill damage');
  // calculate Skill damage
  const attackTwo = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedSecondarySkill,
    regularAttack,
    t,
  );

  console.log('done calculating character stats');
  // TODO: APPLY CAPS BEFORE APPLYING THEM TO FINAL RETURN
  return {
    username: currentCharacter.user.username,
    currentClass: currentCharacter.user.currentClass.name,
    lvl: userCurrentRank.id,
    exp: currentCharacter.user.exp,
    expNext: nextRankExp,
    unspendAttributes,
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
      totalLifeBonus,
    },
    mp: {
      current: currentMp,
      max: maxMp,
    },
    FR,
    PR,
    LR,
    CR,
    attackOne,
    attackTwo,
    regularAttack,
    kick,
    equipment: {
      canWearHelm,
      canWearMainHand,
      canWearOffHand,
      canWearArmor,
      canWearGloves,
      canWearBelt,
      canWearBoots,
    },
  };
};
