/* eslint-disable no-restricted-syntax */
const applyEnemyDebuffEffects = async (
  battleMonsterState,
) => {
  // Apply Armor Debuff if exists
  for (let i = 0; i < battleMonsterState.length; i++) {
    if (battleMonsterState[i].debuffs && battleMonsterState[i].debuffs.length > 0) {
      for (const debuff of battleMonsterState[i].debuffs) {
        if (debuff.reducedArmor) {
          battleMonsterState[i].monster.armor = Math.round(battleMonsterState[i].monster.defense - ((battleMonsterState[i].monster.defense / 100) * debuff.reducedArmor));
        }
      }
    }
  }

  return [
    battleMonsterState,
  ];
};

export default applyEnemyDebuffEffects;
