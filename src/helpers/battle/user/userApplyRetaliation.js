/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../utils";
import db from '../../../models';
import calculateCritDamage from "../utils/calculateCritDamage";

const userApplyRetliation = async (
  userState,
  saveToDatabasePromises,
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
        saveToDatabasePromises,
      ] = await isFailedAttack(
        userState,
        lvl,
        useAttack,
        battle,
        battleLogs,
        updatedMonster,
        monstersToUpdate,
        saveToDatabasePromises,
        t,
      );
      if (!attackFailed) {
        let randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Get Random Damage
        let didWeCrit = false;
        [
          didWeCrit,
          randomAttackDamage,
        ] = calculateCritDamage(
          randomAttackDamage,
          useAttack.crit,
        );

        // Generate Battle log
        const log = `${userState.user.username} used ${useAttack.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage`;
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

        if (updatedMonster.currentHp < 1) {
          const log = `${userState.user.username} killed ${updatedMonster.monster.name}`;
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
        }

        updatedMonster.currentHp -= randomAttackDamage;
        monstersToUpdate.push({
          ...updatedMonster,
          didWeCrit,
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
    saveToDatabasePromises,
  ];
};
export default userApplyRetliation;
