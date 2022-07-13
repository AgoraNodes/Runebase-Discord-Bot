/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../../helpers/utils";
import pickRandomMonsterAttack from './pickRandomMonsterAttack';
import isFailedAttack from './isFailedAttack';
import calculateUserRetaliation from './calculateUserRetaliation';

const monstersApplyAttack = async (
  userState, // Current User State
  saveToDatabasePromises,
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
    if (
      remainingMonster.currentHp > 0
      && !remainingMonster.stunned
    ) {
      let individualBattleObject;
      let attackFailed = true;
      const battleLogs = [];
      if (userState.hp.current > 0) {
        const [
          useAttack,
        ] = pickRandomMonsterAttack(
          remainingMonster,
        );
        const randomMonsterAttackDamage = randomIntFromInterval(useAttack.minDmg, useAttack.maxDmg); // Get Random Monster Damage

        [
          individualBattleObject,
          attackFailed,
          saveToDatabasePromises,
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
          saveToDatabasePromises,
          t,
        );

        if (!attackFailed) {
          const log = `${remainingMonster.monster.name} used ${useAttack.name} on ${userState.user.username} for ${randomMonsterAttackDamage} damage`;
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

          userState.hp.current -= randomMonsterAttackDamage;
          totalDamageByMonsters += randomMonsterAttackDamage;
          individualBattleObject = {
            monsterId: remainingMonster.id,
            useAttack,
            damage: randomMonsterAttackDamage,
            userState: JSON.parse(JSON.stringify(userState)),
            battleLogs,
            monstersToUpdate: [],
          };
        }

        if (userState.hp.current < 1) {
          const log = `${remainingMonster.monster.name} killed ${userState.user.username}`;
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
    saveToDatabasePromises,
  ];
};

export default monstersApplyAttack;
