"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBarbSkillDamage = void 0;

var calculateBarbSkillDamage = function calculateBarbSkillDamage(skillToCalculate, attack) {
  console.log('start calculating barb skills');
  var newAttack = attack;

  if (skillToCalculate.skill.name === "Bonk") {
    var newMinDamage = newAttack.min + skillToCalculate.points + Math.round(newAttack.min / 100 * (50 + (skillToCalculate.points - 1) * 5));
    var newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(newAttack.max / 100 * (50 + (skillToCalculate.points - 1) * 5));
    var newAttackRating = newAttack.ar + Math.round(newAttack.ar / 100 * (20 + (skillToCalculate.points - 1) * 5));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newMinDamage,
      max: newMaxDamage,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: newAttackRating,
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2
    };
  }

  if (skillToCalculate.skill.name === "Stun") {
    var _newMinDamage = newAttack.min + skillToCalculate.points + Math.round(newAttack.min / 100 * (5 + (skillToCalculate.points - 1) * 1));

    var _newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(newAttack.max / 100 * (5 + (skillToCalculate.points - 1) * 1));

    var newStun = newAttack.stun + 5 + (skillToCalculate.points - 1) * 1;
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: _newMinDamage,
      max: _newMaxDamage,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: newAttack.ar,
      crit: newAttack.crit,
      stun: newStun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2
    };
  }

  if (skillToCalculate.skill.name === "Strategic Strike") {
    var _newMinDamage2 = newAttack.min + skillToCalculate.points + Math.round(newAttack.min / 100 * (20 + (skillToCalculate.points - 1) * 5));

    var _newMaxDamage2 = newAttack.max + skillToCalculate.points + Math.round(newAttack.max / 100 * (20 + (skillToCalculate.points - 1) * 5));

    var _newAttackRating = newAttack.ar + Math.round(newAttack.ar / 100 * (40 + (skillToCalculate.points - 1) * 5));

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: _newMinDamage2,
      max: _newMaxDamage2,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: _newAttackRating,
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2
    };
  }

  if (skillToCalculate.skill.name === "Wound") {
    var _newMinDamage3 = newAttack.min / 100 * (50 + (skillToCalculate.points - 1) * 5);

    var _newMaxDamage3 = newAttack.max / 100 * (50 + (skillToCalculate.points - 1) * 5);

    var rounds = 2 + 0.2 * (skillToCalculate.points - 1);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: _newMinDamage3,
      max: _newMaxDamage3,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: newAttack.ar,
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
      rounds: Math.round(rounds),
      ranged: false,
      debuff: true,
      aoe: false
    };
  }

  if (skillToCalculate.skill.name === "Double Swing") {
    var _newAttackRating2 = newAttack.ar + Math.round(newAttack.ar / 100 * (15 + (skillToCalculate.points - 1) * 5));

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newAttack.min * 2,
      max: newAttack.max * 2,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: Math.round(_newAttackRating2),
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2
    };
  }

  if (skillToCalculate.skill.name === "Double Throw") {
    var _newAttackRating3 = newAttack.ar + Math.round(newAttack.ar / 100 * (15 + (skillToCalculate.points - 1) * 5));

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newAttack.min,
      max: newAttack.max,
      minThrow: newAttack.minThrow * 2,
      maxThrow: newAttack.maxThrow * 2,
      ar: Math.round(_newAttackRating3),
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
      ranged: true,
      "throw": true
    };
  }

  if (skillToCalculate.skill.name === "Howl") {
    var reducedArmor = 10 + (skillToCalculate.points - 1) * 2;
    var debuffRounds = 2 + (skillToCalculate.points - 1) * 0.2;
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      min: null,
      max: null,
      reducedArmor: Math.round(reducedArmor),
      stun: false,
      cost: 2,
      ranged: true,
      debuff: true,
      aoe: true,
      rounds: Math.round(debuffRounds)
    };
  }

  if (skillToCalculate.skill.name === "Strategic Shout") {
    var attackBonus = 40 + (skillToCalculate.points - 1) * 5;
    var buffRounds = 2 + (skillToCalculate.points - 1) * 0.2;
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      attackBonus: Math.round(attackBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(buffRounds)
    };
  }

  if (skillToCalculate.skill.name === "War Cry") {
    var parryBonus = 30 + (skillToCalculate.points - 1) * 5;

    var _buffRounds = 2 + (skillToCalculate.points - 1) * 0.5;

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      parryBonus: Math.round(parryBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(_buffRounds)
    };
  }

  if (skillToCalculate.skill.name === "Battle Cry") {
    var damageBonus = 40 + (skillToCalculate.points - 1) * 5;

    var _buffRounds2 = 2 + (skillToCalculate.points - 1) * 0.2;

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      damageBonus: Math.round(damageBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(_buffRounds2)
    };
  }

  if (skillToCalculate.skill.name === "Battle Orders") {
    var lifeBonus = 40 + (skillToCalculate.points - 1) * 5;

    var _buffRounds3 = 2 + (skillToCalculate.points - 1) * 0.2;

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      lifeBonus: Math.round(lifeBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(_buffRounds3)
    };
  }

  if (skillToCalculate.skill.name === "Battle Command") {
    var _newMinDamage4 = newAttack.min / 100 * (10 + (skillToCalculate.points - 1) * 5);

    var _newMaxDamage4 = newAttack.max / 100 * (10 + (skillToCalculate.points - 1) * 5);

    var _rounds = 2 + 0.5 * (skillToCalculate.points - 1);

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      min: _newMinDamage4,
      max: _newMaxDamage4,
      cost: 2,
      rounds: Math.round(_rounds),
      ranged: true,
      debuff: true,
      aoe: true
    };
  }

  if (skillToCalculate.skill.name === "Screech") {
    var _rounds2 = 2 + 0.2 * (skillToCalculate.points - 1);

    var chance = 10 + 2 * (skillToCalculate.points - 1);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      stun: true,
      chance: chance,
      cost: 2,
      rounds: Math.round(_rounds2),
      ranged: true,
      debuff: true,
      aoe: true
    };
  }

  if (skillToCalculate.skill.name === "Cleave") {
    var _newMinDamage5 = newAttack.min / 100 * (50 + (skillToCalculate.points - 1) * 5);

    var _newMaxDamage5 = newAttack.max / 100 * (50 + (skillToCalculate.points - 1) * 5);

    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: _newMinDamage5,
      max: _newMaxDamage5,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: newAttack.ar,
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
      ranged: false,
      debuff: false,
      aoe: true
    };
  }

  console.log('done calculating barb attacks');
  return newAttack;
};

exports.calculateBarbSkillDamage = calculateBarbSkillDamage;