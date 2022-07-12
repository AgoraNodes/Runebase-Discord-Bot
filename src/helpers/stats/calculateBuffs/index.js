/* eslint-disable no-restricted-syntax */
const calculateBuffs = async (
  currentCharacter,
  defense,
  regularAttack,
  currentHp,
  maxHp,
) => {
  let newCurrentHp = currentHp;
  let newMaxHp = maxHp;
  let newDefense = defense;
  let totalLifeBonus = 0;
  const newRegularAttack = regularAttack;
  console.log(currentCharacter);
  if (currentCharacter.buffs && currentCharacter.buffs.length > 0) {
    for (const buff of currentCharacter.buffs) {
      if (buff.damageBonus) {
        newRegularAttack.min += Math.round(((newRegularAttack.min / 100) * buff.damageBonus));
        newRegularAttack.max += Math.round(((newRegularAttack.max / 100) * buff.damageBonus));
      }
      if (buff.attackBonus) {
        newRegularAttack.ar += Math.round(((newRegularAttack.ar / 100) * buff.attackBonus));
      }
      if (buff.parryBonus) {
        newRegularAttack.parry += buff.parryBonus;
      }
      if (buff.critBonus) {
        newRegularAttack.crit += buff.critBonus;
      }
      if (buff.defenseBonus) {
        newDefense += Math.round(((newDefense / 100) * buff.newDefense));
      }
      if (buff.lifeBonus) {
        newCurrentHp += Math.round(((newCurrentHp / 100) * buff.lifeBonus));
        newMaxHp += Math.round(((newMaxHp / 100) * buff.lifeBonus));
        totalLifeBonus += buff.lifeBonus;
      }
    }
  }

  return [
    newDefense, // Defense
    newRegularAttack, // Regular Attack
    newCurrentHp,
    newMaxHp,
    totalLifeBonus,
  ];
};

export default calculateBuffs;
