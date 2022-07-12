/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
// import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../utils";
import db from '../../../models';

const userApplyDebuffDamage = async (
  userState,
  battleMonsterState,
  battle,
  stageFourInfoArray,
  t,
) => {
  for await (const monster of battleMonsterState) {
    // console.log('debuff 1');
    if (monster.currentHp > 0) {
      if (monster.debuffs.length > 0) {
        for await (const debuffToCountDown of monster.debuffs) {
          if (
            !debuffToCountDown.new
            && debuffToCountDown.minDmg
            && debuffToCountDown.maxDmg
          ) {
            // console.log('debuff 2');
            const battleLogs = [];
            const monstersToUpdate = [];
            const updatedMonster = JSON.parse(JSON.stringify(monster));
            const randomAttackDamage = randomIntFromInterval(debuffToCountDown.minDmg, debuffToCountDown.maxDmg); // Get Random Monster Damage
            // Generate Battle log
            const createBattleLog = await db.battleLog.create({
              battleId: battle.id,
              log: `${updatedMonster.monster.name} suffers from ${debuffToCountDown.name} for ${randomAttackDamage} damage`,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));

            // console.log('debuff 6');
            if (updatedMonster.currentHp < 1) {
              const createKillLog = await db.battleLog.create({
                battleId: battle.id,
                log: `${userState.user.username} killed ${updatedMonster.monster.name}`,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              });
              battleLogs.unshift(JSON.parse(JSON.stringify(createKillLog)));
            }
            // console.log('debuff 7');
            updatedMonster.currentHp -= randomAttackDamage;
            monstersToUpdate.push({
              ...updatedMonster,
              userDamage: randomAttackDamage,
              // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
              // died: !(updatedMonster.currentHp > 0),
              attackType: debuffToCountDown.name,
            });

            battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

            stageFourInfoArray.push({
              monsterId: updatedMonster.id,
              monstersToUpdate,
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
  ];
};
export default userApplyDebuffDamage;
