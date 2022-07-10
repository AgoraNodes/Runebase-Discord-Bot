/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';

const userApplyAttackAoE = async (
  userCurrentCharacter, // UserCharacter
  lvl, // Users Level
  monsterInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonster, // which Monster do we have selected?
  t, // database transaction
) => {
  let userBattleLogs = [];
  let updatedMonstersArray = [];
  let attackFailed = true;
  // Apply ALL AOE Debuffs here
  for (const battleMonster of battle.BattleMonsters) {
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
        userBattleLogs,
        updatedMonstersArray,
        attackFailed,
      ] = await isFailedAttack(
        userCurrentCharacter,
        lvl,
        useAttack,
        battle,
        userBattleLogs,
        updatedMonster,
        updatedMonstersArray,
        t,
      );

      const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Random attack damage between min-max
      // TODO: Apply Damage reductions? based on attackType (useAttack.attackType)

      if (!attackFailed) {
        // Apply Damage to monster
        await selectedMonster.decrement('currentHp', {
          by: randomAttackDamage,
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        updatedMonster.currentHp -= randomAttackDamage;

        // Generate Battle log
        await db.battleLog.create({
          battleId: battle.id,
          log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        userBattleLogs.unshift({
          log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
        });
        if (updatedMonster.currentHp < 1) {
          userBattleLogs.unshift({
            log: `${userCurrentCharacter.user.username} killed ${selectedMonster.monster.name}`,
          });
        }
        updatedMonstersArray.push(
          {
            ...updatedMonster,
            userDamage: randomAttackDamage,
            // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
            // died: !(updatedMonster.currentHp > 0),
            attackType: useAttack.name,
          },
        );
      }
    }
  }

  monsterInfoArray.push({
    monsterId: selectedMonster.id,
    // userDamage: useAttack.name,
    monstersToUpdate: updatedMonstersArray,
    // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
    battleLogs: userBattleLogs,
    currentUserMp: userCurrentCharacter.condition.mana - useAttack.cost,
    // died: false,
    ranged: true,
  });

  return [
    monsterInfoArray,
  ];
};

export default userApplyAttackAoE;
