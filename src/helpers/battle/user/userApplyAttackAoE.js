/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';

const userApplyAttackAoE = async (
  userState, // Current User State
  battleMonsterState,
  lvl, // Users Level
  stageOneInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonster, // which Monster do we have selected?
  t, // database transaction
) => {
  let battleLogs = [];
  let monstersToUpdate = [];
  let attackFailed = true;
  // Apply ALL AOE Debuffs here
  for (const battleMonster of battleMonsterState) {
    const updatedMonster = JSON.parse(JSON.stringify(battleMonster));
    if (updatedMonster.currentHp > 0) {
      // Apply Armor Debuff if exists
      if (updatedMonster.debuffs.length > 0) {
        for (const debuff of updatedMonster.debuffs) {
          if (debuff.reducedArmor) {
            updatedMonster.monster.armor = Math.round(updatedMonster.monster.defense - ((updatedMonster.monster.defense / 100) * debuff.reducedArmor));
          }
        }
      }

      [
        battleLogs,
        monstersToUpdate,
        attackFailed,
      ] = await isFailedAttack(
        userState,
        lvl,
        useAttack,
        battle,
        battleLogs,
        updatedMonster,
        monstersToUpdate,
        t,
      );

      const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Random attack damage between min-max
      // TODO: Apply Damage reductions? based on attackType (useAttack.attackType)

      if (!attackFailed) {
        // Apply Damage to monster
        updatedMonster.currentHp -= randomAttackDamage;

        // Generate Battle log
        const createBattleLog = await db.battleLog.create({
          battleId: battle.id,
          log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));

        if (updatedMonster.currentHp < 1) {
          const killLog = await db.battleLog.create({
            battleId: battle.id,
            log: `${userState.user.username} killed ${selectedMonster.monster.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          battleLogs.unshift(JSON.parse(JSON.stringify(killLog)));
        }
        monstersToUpdate.push(
          {
            ...updatedMonster,
            userDamage: randomAttackDamage,
            attackType: useAttack.name,
          },
        );
      }
    }
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  stageOneInfoArray.push({
    monsterId: selectedMonster.id,
    monstersToUpdate,
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageOneInfoArray,
    userState,
    battleMonsterState,
  ];
};

export default userApplyAttackAoE;
