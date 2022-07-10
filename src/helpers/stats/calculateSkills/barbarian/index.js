export const calculateBarbSkillDamage = (
  skillToCalculate,
  attack,
) => {
  let newAttack = attack;

  if (skillToCalculate.skill.name === "Bonk") {
    const newMinDamage = newAttack.min + skillToCalculate.points + Math.round(((newAttack.min / 100) * (50 + ((skillToCalculate.points - 1) * 5))));
    const newMaxDamage = newAttack.max + skillToCalculate.points + Math.round(((newAttack.max / 100) * (50 + ((skillToCalculate.points - 1) * 5))));
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (20 + ((skillToCalculate.points - 1) * 5))));
    newAttack = {
      name: skillToCalculate.skill.name,
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
    const rounds = 2 + (0.2 * (skillToCalculate.point - 1));
    newAttack = {
      name: skillToCalculate.skill.name,
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
    };
  }

  if (skillToCalculate.skill.name === "Double Swing") {
    const newAttackRating = newAttack.ar + Math.round(((newAttack.ar / 100) * (15 + ((skillToCalculate.points - 1) * 5))));
    newAttack = {
      name: skillToCalculate.skill.name,
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

  return newAttack;
};
