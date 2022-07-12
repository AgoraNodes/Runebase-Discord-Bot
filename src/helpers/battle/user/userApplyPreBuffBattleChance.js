/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';

const userApplyPreBuffBattleChance = async (
  userState, // Current User State
  battleMonsterState,
  stageZeroInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  t, // database transaction
) => {
  const battleLogs = [];
  const monstersToUpdate = [];
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
              const createBattleLog = await db.battleLog.create({
                battleId: battle.id,
                log: `${battleMonster.monster.name} was stunned by ${debuff.name}`,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              });
              battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
              effects.push('Stunned');
            }
          }
        }
      }
    }
    if (effects.length > 0) {
      monstersToUpdate.push(
        {
          ...battleMonster,
          stunned: true,
          attackType: useAttack.name,
          // userDamage: 'Stunned',
          effects,
        },
      );
    }
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  stageZeroInfoArray.push({
    monsterId: selectedMonster.id,
    monstersToUpdate,
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageZeroInfoArray,
    userState,
    battleMonsterState,
  ];
};

export default userApplyPreBuffBattleChance;
