/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../utils";
import db from '../../../models';

const userApplyRetliation = async (
  userCurrentCharacter,
  battle,
  retaliationArray,
  retaliationInfoArray,
  allRemainingBattleMonster,
  attackUsed,
  lvl,
  t,
) => {
  for await (const retaliation of retaliationArray) {
    let battleLogs = [];
    let updatedMonstersArray = [];
    let attackFailed = true;
    let individualBattleObject;
    const monster = allRemainingBattleMonster.find((x) => x.id === retaliation.monsterId);
    if (monster) {
      const updatedMonster = JSON.parse(JSON.stringify(monster));
      [
        battleLogs,
        updatedMonstersArray,
        attackFailed,
      ] = await isFailedAttack(
        userCurrentCharacter,
        lvl,
        attackUsed,
        battle,
        battleLogs,
        updatedMonster,
        updatedMonstersArray,
        t,
      );
      if (!attackFailed) {
        const randomAttackDamage = randomIntFromInterval(attackUsed.min, attackUsed.max); // Get Random Monster Damage

        // Apply Damage to monster
        await monster.decrement('currentHp', {
          by: randomAttackDamage,
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        // Generate Battle log
        await db.battleLog.create({
          battleId: battle.id,
          log: `${userCurrentCharacter.user.username} used ${attackUsed.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        battleLogs.unshift({
          log: `${userCurrentCharacter.user.username} used ${attackUsed.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage`,
        });
        if (updatedMonster.currentHp < 1) {
          battleLogs.unshift({
            log: `${userCurrentCharacter.user.username} killed ${updatedMonster.monster.name}`,
          });
        }

        updatedMonster.currentHp -= randomAttackDamage;
        updatedMonstersArray.push({
          ...updatedMonster,
          userDamage: randomAttackDamage,
          // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
          // died: !(updatedMonster.currentHp > 0),
          attackType: attackUsed.name,
        });
      }
      individualBattleObject = {
        monsterId: updatedMonster.id,
        monstersToUpdate: updatedMonstersArray,
        battleLogs,
        currentUserMp: userCurrentCharacter.condition.mana,
        ranged: false,
      };
      retaliationInfoArray.push(individualBattleObject);
    }
  }
  return [
    retaliationInfoArray,
  ];
};
export default userApplyRetliation;
