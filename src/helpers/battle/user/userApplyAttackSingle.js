/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';

const userApplyAttackSingle = async (
  userCurrentCharacter, // UserCharacter
  userState,
  lvl, // Users Level
  stageOneInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonster, // which Monster do we have selected?
  t, // database transaction
) => {
  let battleLogs = [];
  let updatedMonstersArray = [];
  let attackFailed = true;
  // APPLY USER Single MONSTER attack
  const updatedMonster = JSON.parse(JSON.stringify(selectedMonster));

  // Apply Armor Debuff if exists
  if (updatedMonster.debuffs.length > 0) {
    for (const debuff of updatedMonster.debuffs) {
      if (debuff.reducedArmor) {
        updatedMonster.monster.armor = Math.round(updatedMonster.monster.defense - ((updatedMonster.monster.defense / 100) * debuff.reducedArmor));
      }
    }
  }

  [
    battleLogs,
    updatedMonstersArray,
    attackFailed,
  ] = await isFailedAttack(
    userCurrentCharacter,
    lvl,
    useAttack,
    battle,
    battleLogs,
    updatedMonster,
    updatedMonstersArray,
    t,
  );

  let randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Random attack damage between min-max
  randomAttackDamage = calculateCritDamage(
    randomAttackDamage,
    useAttack.crit,
  );
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
    const createBattleLog = await db.battleLog.create({
      battleId: battle.id,
      log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));

    if (updatedMonster.currentHp < 1) {
      const createKillLog = await db.battleLog.create({
        battleId: battle.id,
        log: `${userState.user.username} killed ${selectedMonster.monster.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      battleLogs.unshift(JSON.parse(JSON.stringify(createKillLog)));
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

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: updatedMonstersArray,
    useAttack,
    battleLogs,
    userState,
  });

  return [
    stageOneInfoArray,
    userState,
  ];
};

export default userApplyAttackSingle;
