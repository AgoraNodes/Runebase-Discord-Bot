/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../utils";
import db from '../../../models';

const userApplyDebuffDamage = async (
  userCurrentCharacter,
  battle,
  stageFourInfoArray,
  findAllMonsterToCountDownDebuff,
  t,
) => {
  for await (const monster of findAllMonsterToCountDownDebuff) {
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
            const updatedMonstersArray = [];
            const updatedMonster = JSON.parse(JSON.stringify(monster));
            const randomAttackDamage = randomIntFromInterval(debuffToCountDown.minDmg, debuffToCountDown.maxDmg); // Get Random Monster Damage
            // Apply Damage to monster
            await monster.decrement('currentHp', {
              by: randomAttackDamage,
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            // console.log('debuff 4');
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
                log: `${userCurrentCharacter.user.username} killed ${updatedMonster.monster.name}`,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              });
              battleLogs.unshift(JSON.parse(JSON.stringify(createKillLog)));
            }
            // console.log('debuff 7');
            updatedMonster.currentHp -= randomAttackDamage;
            updatedMonstersArray.push({
              ...updatedMonster,
              userDamage: randomAttackDamage,
              // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
              // died: !(updatedMonster.currentHp > 0),
              attackType: debuffToCountDown.name,
            });
            stageFourInfoArray.push({
              monsterId: updatedMonster.id,
              monstersToUpdate: updatedMonstersArray,
              battleLogs,
              currentUserMp: userCurrentCharacter.condition.mana,
              ranged: false,
            });
          }
        }
      }
    }
  }
  return [
    stageFourInfoArray,
  ];
};
export default userApplyDebuffDamage;
