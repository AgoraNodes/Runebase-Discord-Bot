export const calculateWizardSkillDamage = (
  skillToCalculate,
  attack,
) => {
  let newMinDamage = attack.min;
  let newMaxDamage = attack.max;
  let newAttackRating = attack.ar;
  let cost = 0;
  if (skillToCalculate.skill.name === "Bonk") {
    newMinDamage = Math.round((newMinDamage + 1 + ((skillToCalculate.points * 1) - 1)));
    newMaxDamage += Math.round(((newMaxDamage / 100) * (50 + ((skillToCalculate.points * 5) - 5))));
    newAttackRating += Math.round(((newAttackRating / 100) * (20 + ((skillToCalculate.points * 5) - 5))));
    cost = 2;
  }

  return {
    name: skillToCalculate.skill.name,
    cost,
    min: newMinDamage,
    max: newMaxDamage,
    ar: newAttackRating,
  };
};
