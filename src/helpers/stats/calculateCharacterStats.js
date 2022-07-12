import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import { calculateSkillDamage } from "./calculateSkills";
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
import calculatePassives from "./calculatePassives";
import calculateBuffs from "./calculateBuffs";

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

  const strength = currentCharacter.user.currentClass.strength + currentCharacter.stats.strength;
  const dexterity = currentCharacter.user.currentClass.dexterity + currentCharacter.stats.dexterity;
  const vitality = currentCharacter.user.currentClass.vitality + currentCharacter.stats.vitality;
  const energy = currentCharacter.user.currentClass.energy + currentCharacter.stats.energy;

  if (
    currentCharacter.equipment.offHand
    && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields'
  ) {
    const shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
    const blocking = (shieldBlock * (dexterity - 15)) / (userCurrentRank.id * 2);
    block = blocking > 50 ? 50 : blocking;
  }
  const maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
  const currentStaminaPoints = currentCharacter.condition.stamina;

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

  const kick = currentCharacter.equipment.boots
    ? {
      name: 'Kick',
      attackType: 'Physical',
      min: currentCharacter.equipment.boots.minDamage,
      max: currentCharacter.equipment.boots.maxDamage,
      ar: currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
      crit: 0,
      cost: 0,
    }
    : {
      name: 'Kick',
      attackType: 'Physical',
      min: 1,
      max: 2,
      ar: currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
      crit: 0,
      cost: 0,
    };

  let regularAttack = {
    name: 'Attack',
    attackType: 'Physical',
    min: currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.minDamage : 1,
    max: currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.maxDamage : 2,
    minThrow: currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.minThrowDamage ? currentCharacter.equipment.mainHand.minThrowDamage : 0,
    maxThrow: currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.maxThrowDamage ? currentCharacter.equipment.mainHand.maxThrowDamage : 0,
    ar: currentCharacter.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
    crit: 0,
    stun: 0,
    parry: 0,
    lifeSteal: 0,
    manaSteal: 0,
    cost: 0,
  };

  // Add Passive Skill stats
  [
    defense,
    regularAttack,
    FR,
    PR,
    LR,
    CR,
  ] = await calculatePassives(
    currentCharacter,
    defense,
    regularAttack,
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
  };
};
