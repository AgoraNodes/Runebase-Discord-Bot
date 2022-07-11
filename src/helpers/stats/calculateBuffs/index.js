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
  const newRegularAttack = regularAttack;
  console.log(currentCharacter);
  if (currentCharacter.buffs && currentCharacter.buffs.length > 0) {
    for (const buff of currentCharacter.buffs) {
      if (buff.damageBonus) {
        newRegularAttack.min += ((newRegularAttack.min / 100) * buff.damageBonus);
        newRegularAttack.max += ((newRegularAttack.max / 100) * buff.damageBonus);
      }
      if (buff.attackBonus) {
        newRegularAttack.ar += ((newRegularAttack.ar / 100) * buff.attackBonus);
      }
      if (buff.parryBonus) {
        newRegularAttack.parry += buff.parryBonus;
      }
      if (buff.critBonus) {
        newRegularAttack.crit += buff.critBonus;
      }
      if (buff.defenseBonus) {
        newDefense += ((newDefense / 100) * buff.newDefense);
      }
      if (buff.lifeBonus) {
        newCurrentHp += ((newCurrentHp / 100) * buff.lifeBonus);
        newMaxHp += ((newMaxHp / 100) * buff.lifeBonus);
      }
    }
  }

  return [
    newDefense, // Defense
    newRegularAttack, // Regular Attack
    newCurrentHp,
    newMaxHp,
  ];
};

export default calculateBuffs;
