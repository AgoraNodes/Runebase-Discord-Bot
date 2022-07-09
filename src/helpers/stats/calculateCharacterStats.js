import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import { calculateSkillDamage } from "./calculateSkills";
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
import calculatePassives from "./calculatePassives";

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

  let regularAttack = {
    name: 'Attack',
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
  //
  const selectedSkills = await fetchUserCurrentSelectedSkills(
    currentCharacter.user.user_id,
    t,
  );

  // calculate Skill damage
  const attackOne = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedMainSkill,
    regularAttack,
    t,
  );

  // calculate Skill damage
  const attackTwo = await calculateSkillDamage(
    currentCharacter,
    selectedSkills.selectedSecondarySkill,
    regularAttack,
    t,
  );

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
  };
};
