/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import pickRandomMonsterAttack from './pickRandomMonsterAttack';
import isFailedAttack from './isFailedAttack';
import calculateUserRetaliation from './calculateUserRetaliation';

const monstersApplyAttack = async (
  userState, // Current User State
  battleMonsterState,
  lvl, // Users Level
  block, // users Block
  defense, // Users defense
  regularAttack, // Users Regular Attack
  stageTwoInfoArray, // Array to fill with battle info
  battle, // battle database record
  t, // database transaction
) => {
  // const newUserState = JSON.parse(JSON.stringify(userState));
  // let currentUserHp = userCurrentCharacter.condition.life;
  let totalDamageByMonsters = 0;
  const retaliationArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const remainingMonster of battleMonsterState) {
    console.log('#1');
    if (
      remainingMonster.currentHp > 0
      && !remainingMonster.stunned
    ) {
      console.log('#2');
      let individualBattleObject;
      let attackFailed = true;
      const battleLogs = [];
      if (userState.hp.current > 0) {
        console.log('#3');
        const [
          useAttack,
        ] = pickRandomMonsterAttack(
          remainingMonster,
        );
        console.log('#4');
        const randomMonsterAttackDamage = randomIntFromInterval(useAttack.minDmg, useAttack.maxDmg); // Get Random Monster Damage

        console.log('#5');
        [
          individualBattleObject,
          attackFailed,
        ] = await isFailedAttack(
          userState,
          lvl,
          block,
          defense,
          regularAttack,
          battle,
          battleLogs,
          remainingMonster,
          useAttack,
          t,
        );
        console.log('#6');
        if (!attackFailed) {
          const createBattleLog = await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} used ${useAttack.name} on ${userState.user.username} for ${randomMonsterAttackDamage} damage`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          console.log('#7');
          battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
          userState.hp.current -= randomMonsterAttackDamage;
          totalDamageByMonsters += randomMonsterAttackDamage;
          individualBattleObject = {
            monsterId: remainingMonster.id,
            useAttack,
            damage: randomMonsterAttackDamage,
            userState: JSON.parse(JSON.stringify(userState)),
            battleLogs,
          };
        }

        if (userState.hp.current < 1) {
          const createKillBattleLog = await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} killed ${userState.user.username}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          battleLogs.unshift(JSON.parse(JSON.stringify(createKillBattleLog)));
        }

        stageTwoInfoArray.push(individualBattleObject);

        const retaliate = await calculateUserRetaliation(
          userState,
          remainingMonster.id,
        );

        if (retaliate && retaliate.length > 0) {
          retaliationArray.push(
            ...retaliate,
          );
        }
      }
    }
  }

  return [
    totalDamageByMonsters,
    userState,
    battleMonsterState,
    stageTwoInfoArray,
    retaliationArray,
  ];
};

export default monstersApplyAttack;
