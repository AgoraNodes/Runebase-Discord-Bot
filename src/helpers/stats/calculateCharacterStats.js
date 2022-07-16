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
        [Op.gt]: currentCharacter.UserGroup.exp,
      },
      groupId: currentCharacter.UserGroup.user.currentRealmId,
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
  console.log(currentCharacter.UserGroup.exp);
  console.log(currentCharacter.UserGroup.user.currentRealmId);
  console.log('calcstats 1');
  console.log(currentCharacter.UserGroup);
  console.log(nextRank);
  const userCurrentRank = currentCharacter.UserGroup.UserGroupRank
    && currentCharacter.UserGroup.UserGroupRank.rank
    ? currentCharacter.UserGroup.UserGroupRank.rank
    : {
      level: 0,
      expNeeded: nextRank.expNeeded,
    };
  console.log('before next rank calc');
  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : userCurrentRank.expNeeded;
  const countedSpendAttributes = currentCharacter.stats.strength
    + currentCharacter.stats.dexterity
    + currentCharacter.stats.vitality
    + currentCharacter.stats.energy;
  const unspendAttributes = (userCurrentRank.level * 5) - countedSpendAttributes;
  let FR = 0;
  let PR = 0;
  let LR = 0;
  let CR = 0;
  let block = 0;
  let defense = 0;
  let totalLifeBonus = 0;
  const totalManaBonus = 0;
  const lifeSteal = 0;
  const manaSteal = 0;
  console.log('calcstats 2');
  const initialStrength = currentCharacter.UserGroup.user.currentClass.strength + currentCharacter.stats.strength;
  const initialDexterity = currentCharacter.UserGroup.user.currentClass.dexterity + currentCharacter.stats.dexterity;
  const initialVitality = currentCharacter.UserGroup.user.currentClass.vitality + currentCharacter.stats.vitality;
  const initialEnergy = currentCharacter.UserGroup.user.currentClass.energy + currentCharacter.stats.energy;
  let strength = initialStrength;
  let dexterity = initialDexterity;
  let vitality = initialVitality;
  let energy = initialEnergy;
  console.log('calcstats 3');
  const maxStamina = currentCharacter.UserGroup.user.currentClass.stamina + currentCharacter.stats.stamina;
  const currentStaminaPoints = currentCharacter.condition.stamina;
  let currentHp = currentCharacter.condition.life;
  let maxHp = currentCharacter.UserGroup.user.currentClass.life + currentCharacter.stats.life;
  const currentMp = currentCharacter.condition.mana;
  let maxMp = currentCharacter.UserGroup.user.currentClass.mana + currentCharacter.stats.mana;

  defense += currentCharacter.UserGroup.user.currentClass.defense;
  console.log('calcstats 4');
  let canWearHelm = false;
  let canWearMainHand = false;
  let canWearOffHand = false;
  let canWearArmor = false;
  let canWearGloves = false;
  let canWearBelt = false;
  let canWearBoots = false;
  console.log('calcstats 4-1');
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
  console.log('calcstats 5');
  let addedLifeByItemVitality = 0;
  let addedManaByItemEnergy = 0;
  if (currentCharacter.class.name === 'Warrior') {
    // const totalLoops = (vitality - initialVitality);
    // Consider looping over points to calculate for example: +1.5 value
    // EXAMPLE GIVEN: if loopcount % 2 === 0 then life 2 else 1
    // FOR NOW WE USE Math.round.. perhaps we keep it this way
    addedLifeByItemVitality = (vitality - initialVitality) * 4;
    addedManaByItemEnergy = (energy - initialEnergy) * 1;
  }
  if (
    currentCharacter.class.name === 'Amazon'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 3;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.5);
  }
  if (
    currentCharacter.class.name === 'Assasin'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 3;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.75);
  }
  if (
    currentCharacter.class.name === 'Paladin'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 3;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.5);
  }
  if (
    currentCharacter.class.name === 'Druid'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 2;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
  }
  if (
    currentCharacter.class.name === 'Necromancer'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 2;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
  }
  if (
    currentCharacter.class.name === 'Sorceress'
  ) {
    addedLifeByItemVitality = (vitality - initialVitality) * 2;
    addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
  }
  maxHp += addedLifeByItemVitality;
  maxMp += addedManaByItemEnergy;
  // Added Damage % by Strength
  const addedStrengthDamagePercentage = 1 + (strength / 100); // Should we substract starting strength from this? (YES/NO)

  console.log('after addsss');
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
    ar: currentCharacter.UserGroup.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
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
    ar: currentCharacter.UserGroup.user.currentClass.attackRating + (currentCharacter.stats.dexterity * 5),
    crit: 0,
    stun: 0,
    parry: 0,
    lifeSteal,
    manaSteal,
    cost: 0,
  };

  console.log('beore passives calc');
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
    currentCharacter.UserGroup.user.user_id,
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

  console.log(userCurrentRank);
  console.log(userCurrentRank.level);
  console.log(regularAttack);

  console.log('done calculating character stats');
  // TODO: APPLY CAPS BEFORE APPLYING THEM TO FINAL RETURN
  return {
    username: currentCharacter.UserGroup.user.username,
    currentClass: currentCharacter.UserGroup.user.currentClass.name,
    lvl: userCurrentRank.level,
    exp: currentCharacter.UserGroup.exp,
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
      current: currentHp > maxHp ? maxHp : currentHp,
      max: maxHp,
      totalLifeBonus,
    },
    mp: {
      current: currentMp > maxMp ? maxMp : currentMp,
      max: maxMp,
      totalManaBonus,
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
