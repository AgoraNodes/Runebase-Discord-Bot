export const calculateBarbSkillDamage = (
  skillToCalculate,
  attack,
) => {
  console.log('start calculating barb skills');
  let newAttack = attack;

  if (skillToCalculate.skill.name === "Bonk") {
    const newMinDamage = newAttack.min + skillToCalculate.points + Math.round(((newAttack.min / 100) * (50 + ((skillToCalculate.points - 1) * 5))));
    const newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(((newAttack.max / 100) * (50 + ((skillToCalculate.points - 1) * 5))));
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (20 + ((skillToCalculate.points - 1) * 5))));
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
      cost: 2,
    };
  }

  if (skillToCalculate.skill.name === "Stun") {
    const newMinDamage = newAttack.min + skillToCalculate.points + Math.round(((newAttack.min / 100) * (5 + ((skillToCalculate.points - 1) * 1))));
    const newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(((newAttack.max / 100) * (5 + ((skillToCalculate.points - 1) * 1))));
    const newStun = newAttack.stun + 5 + ((skillToCalculate.points - 1) * 1);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newMinDamage,
      max: newMaxDamage,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: newAttack.ar,
      crit: newAttack.crit,
      stun: newStun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
    };
  }

  if (skillToCalculate.skill.name === "Strategic Strike") {
    const newMinDamage = newAttack.min + skillToCalculate.points + Math.round(((newAttack.min / 100) * (20 + ((skillToCalculate.points - 1) * 5))));
    const newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(((newAttack.max / 100) * (20 + ((skillToCalculate.points - 1) * 5))));
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (40 + ((skillToCalculate.points - 1) * 5))));
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
      cost: 2,
    };
  }

  if (skillToCalculate.skill.name === "Wound") {
    const newMinDamage = (newAttack.min / 100) * (50 + ((skillToCalculate.points - 1) * 5));
    const newMaxDamage = (newAttack.max / 100) * (50 + ((skillToCalculate.points - 1) * 5));
    const rounds = 2 + (0.2 * (skillToCalculate.points - 1));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newMinDamage,
      max: newMaxDamage,
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
      aoe: false,
    };
  }

  if (skillToCalculate.skill.name === "Double Swing") {
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (15 + ((skillToCalculate.points - 1) * 5))));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newAttack.min * 2,
      max: newAttack.max * 2,
      minThrow: newAttack.minThrow,
      maxThrow: newAttack.maxThrow,
      ar: Math.round(newAttackRating),
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
    };
  }

  if (skillToCalculate.skill.name === "Double Throw") {
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (15 + ((skillToCalculate.points - 1) * 5))));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newAttack.min,
      max: newAttack.max,
      minThrow: newAttack.minThrow * 2,
      maxThrow: newAttack.maxThrow * 2,
      ar: Math.round(newAttackRating),
      crit: newAttack.crit,
      stun: newAttack.stun,
      parry: newAttack.parry,
      lifeSteal: newAttack.lifeSteal,
      manaSteal: newAttack.manaSteal,
      cost: 2,
      ranged: true,
      throw: true,
    };
  }

  if (skillToCalculate.skill.name === "Howl") {
    const reducedArmor = 10 + ((skillToCalculate.points - 1) * 2);
    const debuffRounds = 2 + ((skillToCalculate.points - 1) * 0.2);
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
      rounds: Math.round(debuffRounds),
    };
  }

  if (skillToCalculate.skill.name === "Strategic Shout") {
    const attackBonus = 40 + ((skillToCalculate.points - 1) * 5);
    const buffRounds = 2 + ((skillToCalculate.points - 1) * 0.2);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      attackBonus: Math.round(attackBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(buffRounds),
    };
  }

  if (skillToCalculate.skill.name === "War Cry") {
    const parryBonus = 30 + ((skillToCalculate.points - 1) * 5);
    const buffRounds = 2 + ((skillToCalculate.points - 1) * 0.5);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      parryBonus: Math.round(parryBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(buffRounds),
    };
  }

  if (skillToCalculate.skill.name === "Battle Cry") {
    const damageBonus = 40 + ((skillToCalculate.points - 1) * 5);
    const buffRounds = 2 + ((skillToCalculate.points - 1) * 0.2);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      damageBonus: Math.round(damageBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(buffRounds),
    };
  }

  if (skillToCalculate.skill.name === "Battle Orders") {
    const lifeBonus = 40 + ((skillToCalculate.points - 1) * 5);
    const buffRounds = 2 + ((skillToCalculate.points - 1) * 0.2);
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      lifeBonus: Math.round(lifeBonus),
      cost: 2,
      ranged: true,
      buff: true,
      rounds: Math.round(buffRounds),
    };
  }

  if (skillToCalculate.skill.name === "Battle Command") {
    const newMinDamage = (newAttack.min / 100) * (10 + ((skillToCalculate.points - 1) * 5));
    const newMaxDamage = (newAttack.max / 100) * (10 + ((skillToCalculate.points - 1) * 5));
    const rounds = 2 + (0.5 * (skillToCalculate.points - 1));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      min: newMinDamage,
      max: newMaxDamage,
      cost: 2,
      rounds: Math.round(rounds),
      ranged: true,
      debuff: true,
      aoe: true,
    };
  }

  if (skillToCalculate.skill.name === "Screech") {
    const rounds = 2 + (0.2 * (skillToCalculate.points - 1));
    const chance = 10 + (2 * (skillToCalculate.points - 1));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Magic',
      stun: true,
      chance: 100, // Temp testing
      cost: 0, // 2
      // rounds: Math.round(rounds),
      rounds: 20,
      ranged: true,
      debuff: true,
      aoe: true,
    };
  }

  if (skillToCalculate.skill.name === "Cleave") {
    const newMinDamage = (newAttack.min / 100) * (50 + ((skillToCalculate.points - 1) * 5));
    const newMaxDamage = (newAttack.max / 100) * (50 + ((skillToCalculate.points - 1) * 5));
    newAttack = {
      name: skillToCalculate.skill.name,
      attackType: 'Physical',
      min: newMinDamage,
      max: newMaxDamage,
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
      aoe: true,
    };
  }

  console.log('done calculating barb attacks');
  return newAttack;
};
