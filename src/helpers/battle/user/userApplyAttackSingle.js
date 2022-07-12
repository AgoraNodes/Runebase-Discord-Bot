/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';

const userApplyAttackSingle = async (
  userState, // Current User State
  battleMonsterState,
  lvl, // Users Level
  stageOneInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  saveToDatabasePromises,
  t, // database transaction
) => {
  let battleLogs = [];
  let monstersToUpdate = [];
  let attackFailed = true;
  // APPLY USER Single MONSTER attack
  const updatedMonster = battleMonsterState.find((element) => element.id === selectedMonsterId);

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

  // TODO: Apply Damage reductions? based on attackType (useAttack.attackType)

  if (!attackFailed) {
    let randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Random attack damage between min-max
    // Test Crit
    let didUserCrit = false;
    [
      didUserCrit,
      randomAttackDamage,
    ] = calculateCritDamage(
      randomAttackDamage,
      useAttack.crit,
    );
    // Test Stun
    const didUserStun = Math.random() < Number(useAttack.stun) / 100;

    updatedMonster.currentHp -= randomAttackDamage;

    // Generate Battle log
    const log = `${userState.user.username} used ${useAttack.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage${didUserCrit ? ' (crit)' : ''}`;
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
    monstersToUpdate.push(
      {
        ...updatedMonster,
        didUserCrit,
        stunned: didUserStun,
        userDamage: randomAttackDamage,
        attackType: useAttack.name,
      },
    );
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate,
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageOneInfoArray,
    userState,
    battleMonsterState,
    saveToDatabasePromises,
  ];
};

export default userApplyAttackSingle;
