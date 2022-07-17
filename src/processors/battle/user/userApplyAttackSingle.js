import db from '../../../models';
import { randomIntFromInterval } from "../../../helpers/utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';
import {
  lifeSteal,
  manaSteal,
} from '../utils/utils';

const userApplyAttackSingle = async (
  userState, // Current User State
  battleMonsterState,
  allRoundEffectsInfoArray,
  totalHealedByLifeSteal,
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
  let lifeStolen = false;
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
    console.log('Stage #1 - Attack Not Failed (User Attacking)');
    let randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Random attack damage between min-max
    lifeStolen = lifeSteal(randomAttackDamage, useAttack.lifeSteal);
    // Test Crit
    let didUserCrit = false;
    [
      didUserCrit,
      randomAttackDamage,
    ] = calculateCritDamage(
      randomAttackDamage,
      useAttack.crit,
    );
    console.log('Stage #1 - After Calculating User Crit Damage');
    // Test Stun
    const didUserStun = Math.random() < Number(useAttack.stun) / 100;

    updatedMonster.currentHp -= randomAttackDamage;

    // Generate Battle log
    console.log('Stage #1 - Generating Battle Logs');
    const log = `${userState.UserGroup.user.username} used ${useAttack.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage${didUserCrit ? ' (crit)' : ''}`;
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
      const log = `${userState.UserGroup.user.username} killed ${updatedMonster.monster.name}`;
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

    if (updatedMonster.stunned) {
      allRoundEffectsInfoArray.push('Stunned');
    }
    monstersToUpdate.push(
      {
        ...updatedMonster,
        didUserCrit,
        stunned: updatedMonster.stunned ? true : didUserStun,
        userDamage: randomAttackDamage,
        attackType: useAttack.name,
      },
    );
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);
  userState.mp.current -= useAttack.cost;
  totalHealedByLifeSteal += lifeStolen || 0;
  const addAmountLife = lifeStolen || 0;
  userState.hp.current = (userState.hp.current + addAmountLife) > userState.hp.max ? userState.hp.max : (userState.hp.current + addAmountLife);

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
    useAttack,
    battleLogs,
    receivedHeal: lifeStolen || false,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  console.log('Stage #1 - Returning Values');
  return [
    stageOneInfoArray,
    userState,
    battleMonsterState,
    allRoundEffectsInfoArray,
    totalHealedByLifeSteal,
    saveToDatabasePromises,
  ];
};

export default userApplyAttackSingle;
