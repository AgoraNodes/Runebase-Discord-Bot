"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateAssaSkillDamage = void 0;

var calculateAssaSkillDamage = function calculateAssaSkillDamage(skillToCalculate, attack) {
  var newMinDamage = attack.min;
  var newMaxDamage = attack.max;
  var newAttackRating = attack.ar;
  var cost = 0;

  if (skillToCalculate.skill.name === "Bonk") {
    newMinDamage = Math.round(newMinDamage + 1 + (skillToCalculate.points * 1 - 1));
    newMaxDamage += Math.round(newMaxDamage / 100 * (50 + (skillToCalculate.points * 5 - 5)));
    newAttackRating += Math.round(newAttackRating / 100 * (20 + (skillToCalculate.points * 5 - 5)));
    cost = 2;
  }

  return {
    name: skillToCalculate.skill.name,
    cost: cost,
    min: newMinDamage,
    max: newMaxDamage,
    ar: newAttackRating
  };
};

exports.calculateAssaSkillDamage = calculateAssaSkillDamage;