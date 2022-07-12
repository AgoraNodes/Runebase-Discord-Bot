/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../utils";
import db from '../../../models';

const userApplyRetliation = async (
  userState,
  battleMonsterState,
  battle,
  retaliationArray,
  stageThreeInfoArray,
  useAttack,
  lvl,
  t,
) => {
  for await (const retaliation of retaliationArray) {
    let battleLogs = [];
    let monstersToUpdate = [];
    let attackFailed = true;
    let individualBattleObject;
    const monster = battleMonsterState.find((x) => x.id === retaliation.monsterId);
    if (monster && monster.currentHp > 0) {
      const updatedMonster = JSON.parse(JSON.stringify(monster));
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
      if (!attackFailed) {
        const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Get Random Monster Damage

        // Apply Damage to monster
        // await monster.decrement('currentHp', {
        //   by: randomAttackDamage,
        //   lock: t.LOCK.UPDATE,
        //   transaction: t,
        // });
        // Generate Battle log
        const createBattleLog = await db.battleLog.create({
          battleId: battle.id,
          log: `${userState.user.username} used ${useAttack.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
        if (updatedMonster.currentHp < 1) {
          const createKillBattleLog = await db.battleLog.create({
            battleId: battle.id,
            log: `${userState.user.username} killed ${updatedMonster.monster.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          battleLogs.unshift(JSON.parse(JSON.stringify(createKillBattleLog)));
        }

        updatedMonster.currentHp -= randomAttackDamage;
        monstersToUpdate.push({
          ...updatedMonster,
          userDamage: randomAttackDamage,
          attackType: useAttack.name,
        });
      }
      battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

      individualBattleObject = {
        monsterId: updatedMonster.id,
        monstersToUpdate,
        userState: JSON.parse(JSON.stringify(userState)),
        battleLogs,
        useAttack,
      };
      stageThreeInfoArray.push(individualBattleObject);
    }
  }
  return [
    stageThreeInfoArray,
    userState,
    battleMonsterState,
  ];
};
export default userApplyRetliation;
