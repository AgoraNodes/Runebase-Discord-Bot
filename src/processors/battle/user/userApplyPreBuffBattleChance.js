/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyPreBuffBattleChance = async (
  userState, // Current User State
  allRoundEffectsInfoArray,
  battleMonsterState,
  stageZeroInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  saveToDatabasePromises,
  t, // database transaction
) => {
  const battleLogs = [];
  const monstersToUpdate = [];
  const selectedMonster = battleMonsterState.find((element) => element.id === selectedMonsterId);
  // Apply ALL AOE Debuffs here
  for (const battleMonster of battleMonsterState) {
    const effects = [];
    if (battleMonster.currentHp > 0) {
      if (battleMonster.debuffs.length > 0) {
        for (const debuff of battleMonster.debuffs) {
          if (debuff.stun) {
            const isUnitStunned = Math.random() < Number(debuff.chance) / 100;
            if (isUnitStunned) {
              // Generate Battle log
              const log = `${battleMonster.monster.name} was stunned by ${debuff.name}`;
              saveToDatabasePromises.push(
                new Promise((resolve, reject) => {
                  db.battleLog.create({
                    battleId: battle.id,
                    log,
                  }, {
                    lock: t.LOCK.UPDATE,
                    transaction: t,
                  }).then(() => resolve());
                }),
              );
              battleLogs.unshift({
                log,
              });
              effects.push('Stunned');
            }
          }
        }
      }
    }
    allRoundEffectsInfoArray.push(
      ...effects,
    );
    if (effects.length > 0) {
      monstersToUpdate.push(
        {
          ...battleMonster,
          stunned: true,
          attackType: useAttack.name,
          effects,
        },
      );
    }
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  stageZeroInfoArray.push({
    monsterId: selectedMonster.id,
    monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageZeroInfoArray,
    userState,
    allRoundEffectsInfoArray,
    battleMonsterState,
    saveToDatabasePromises,
  ];
};

export default userApplyPreBuffBattleChance;
