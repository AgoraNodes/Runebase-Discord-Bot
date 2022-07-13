/* eslint-disable no-restricted-syntax */
// import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../../helpers/utils";
import db from '../../../models';

const userApplyDebuffDamage = async (
  userState,
  battleMonsterState,
  saveToDatabasePromises,
  battle,
  stageFourInfoArray,
  t,
) => {
  for await (const monster of battleMonsterState) {
    if (monster.currentHp > 0) {
      if (monster.debuffs.length > 0) {
        for await (const debuffToCountDown of monster.debuffs) {
          if (
            !debuffToCountDown.new
            && debuffToCountDown.minDmg
            && debuffToCountDown.maxDmg
          ) {
            const battleLogs = [];
            const monstersToUpdate = [];
            const updatedMonster = JSON.parse(JSON.stringify(monster));
            const randomAttackDamage = randomIntFromInterval(debuffToCountDown.minDmg, debuffToCountDown.maxDmg); // Get Random Monster Damage

            // Generate Battle log
            const log = `${updatedMonster.monster.name} suffers from ${debuffToCountDown.name} for ${randomAttackDamage} damage`;
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
              userDamage: randomAttackDamage,
              attackType: debuffToCountDown.name,
            });

            battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

            stageFourInfoArray.push({
              monsterId: updatedMonster.id,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              battleLogs,
              userState: JSON.parse(JSON.stringify(userState)),
              ranged: false,
            });
          }
        }
      }
    }
  }
  return [
    stageFourInfoArray,
    battleMonsterState,
    userState,
    saveToDatabasePromises,
  ];
};
export default userApplyDebuffDamage;
