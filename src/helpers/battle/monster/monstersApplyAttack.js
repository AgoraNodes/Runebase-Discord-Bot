/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import pickRandomMonsterAttack from './pickRandomMonsterAttack';
import isFailedAttack from './isFailedAttack';

const monstersApplyAttack = async (
  userCurrentCharacter, // UserCharacter
  lvl, // Users Level
  block, // users Block
  defense, // Users defense
  regularAttack, // Users Regular Attack
  battleInfoArray, // Array to fill with battle info
  battle, // battle database record
  allRemainingBattleMonster, // Which attack is used by user
  t, // database transaction
) => {
  let currentUserHp = userCurrentCharacter.condition.life;
  let attackFailed = true;
  let totalDamageByMonsters = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const remainingMonster of allRemainingBattleMonster) {
    let individualBattleObject;
    const battleLogs = [];
    if (currentUserHp > 0) {
      const [
        pickedMonsterAttack,
      ] = pickRandomMonsterAttack(
        remainingMonster,
      );

      const randomMonsterAttackDamage = randomIntFromInterval(pickedMonsterAttack.minDmg, pickedMonsterAttack.maxDmg); // Get Random Monster Damage

      [
        individualBattleObject,
        attackFailed,
      ] = await isFailedAttack(
        userCurrentCharacter,
        currentUserHp,
        lvl,
        block,
        defense,
        regularAttack,
        battle,
        battleLogs,
        remainingMonster,
        pickedMonsterAttack,
        t,
      );

      if (!attackFailed) {
        // TODO Check if we counter attack (retaliate)
        // TODO Create Kick Damage calculation in statscalculations

        await db.battleLog.create({
          battleId: battle.id,
          log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        battleLogs.unshift({
          log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
        });
      }

      if (currentUserHp < 1) {
        await db.battleLog.create({
          battleId: battle.id,
          log: `${remainingMonster.monster.name} killed ${userCurrentCharacter.user.username}`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        battleLogs.unshift({
          log: `${remainingMonster.monster.name} killed ${userCurrentCharacter.user.username}`,
        });
      }
      totalDamageByMonsters += randomMonsterAttackDamage;
      currentUserHp -= randomMonsterAttackDamage;
      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: pickedMonsterAttack.name,
        damage: randomMonsterAttackDamage,
        currentHp: currentUserHp,
        // currentHp: currentUserHp - randomMonsterAttackDamage,
        battleLogs,
      };
    }

    battleInfoArray.push(individualBattleObject);
  }

  return [
    totalDamageByMonsters,
    battleInfoArray,
  ];
};

export default monstersApplyAttack;
