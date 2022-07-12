/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';

const userApplyPreBuffBattleChance = async (
  userState, // Current User State
  battleMonsterState,
  stageZeroInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonster, // which Monster do we have selected?
  t, // database transaction
) => {
  const battleLogs = [];
  const monstersToUpdate = [];
  // Apply ALL AOE Debuffs here
  console.log('stune 1');
  for (const battleMonster of battleMonsterState) {
    console.log('stune 2');
    if (battleMonster.currentHp > 0) {
      console.log('stune 3');
      // Apply Armor Debuff if exists
      if (battleMonster.debuffs.length > 0) {
        console.log('stune 4');
        for (const debuff of battleMonster.debuffs) {
          console.log('stune 5');
          console.log(debuff);
          if (debuff.stun) {
            console.log('stune 6');
            const isUnitStunned = Math.random() < Number(debuff.chance) / 100;
            if (isUnitStunned) {
              // Generate Battle log
              const createBattleLog = await db.battleLog.create({
                battleId: battle.id,
                log: `${battleMonster.monster.name} was stunned by ${useAttack.name}`,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              });
              battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
              monstersToUpdate.push(
                {
                  ...battleMonster,
                  stunned: true,
                  attackType: useAttack.name,
                  userDamage: 'Stunned',
                },
              );
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
              console.log('UNIT IS STUNNED!!!');
            }
          }
        }
      }
    }
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  stageZeroInfoArray.push({
    monsterId: selectedMonster.id,
    monstersToUpdate,
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageZeroInfoArray,
    userState,
    battleMonsterState,
  ];
};

export default userApplyPreBuffBattleChance;
