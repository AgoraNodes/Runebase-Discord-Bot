/* eslint-disable no-await-in-loop */

import db from "../../../models";

/* eslint-disable no-restricted-syntax */
const countDownBuffsAndDebuffs = async (
  stageFiveInfoArray,
  userState,
  battleMonsterState,
  t,
) => {
  // const updatedMonstersArray = JSON.parse(JSON.stringify(findAllMonsterToCountDownDebuff));
  const newUserBuffsArray = [];
  const monstersToUpdate = [];
  // Count Down Debuffs
  for (const monsterToCountDownDebuff of battleMonsterState) {
    if (monsterToCountDownDebuff.currentHp > 0) {
      const newBattleMonstersDebuffArrays = [];
      const updatedBattleMonster = JSON.parse(JSON.stringify(monsterToCountDownDebuff));
      if (monsterToCountDownDebuff.debuffs.length > 0) {
        for (const monsterDebuff of monsterToCountDownDebuff.debuffs) {
          if (monsterDebuff.new) {
            newBattleMonstersDebuffArrays.push(
              JSON.parse(JSON.stringify(monsterDebuff)),
            );
          }
          if (
            monsterDebuff.rounds >= 1
            && !monsterDebuff.new
          ) {
            await db.debuff.decrement('rounds', {
              by: 1,
              where: {
                id: monsterDebuff.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            newBattleMonstersDebuffArrays.push(
              {
                ...JSON.parse(JSON.stringify(monsterDebuff)),
                rounds: monsterDebuff.rounds - 1,
              },
            );
          } else if (monsterDebuff.rounds < 1) {
            await db.debuff.destroy({
              where: {
                id: monsterDebuff.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
          }
        }
      }
      updatedBattleMonster.debuffs = newBattleMonstersDebuffArrays;
      monstersToUpdate.push(
        updatedBattleMonster,
      );
    }
  }

  if (userState.buffs.length > 0) {
    for (const userBuff of userState.buffs) {
      if (userBuff.new) {
        console.log('user buff is new');
        newUserBuffsArray.push(
          JSON.parse(JSON.stringify(userBuff)),
        );
      } else if (
        userBuff.rounds >= 1
        && !userBuff.new
      ) {
        console.log(userBuff);
        console.log('user buff is not new');
        newUserBuffsArray.push(
          {
            ...JSON.parse(JSON.stringify(userBuff)),
            rounds: userBuff.rounds - 1,
          },
        );
        await db.buff.decrement('rounds', {
          by: 1,
          where: {
            id: userBuff.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      } else if (userBuff.rounds <= 1) {
        await db.buff.destroy({
          where: {
            id: userBuff.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
    }
  }

  userState.buffs = newUserBuffsArray;

  stageFiveInfoArray.push({
    monstersToUpdate,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageFiveInfoArray,
    userState,
    battleMonsterState,
  ];
};
export default countDownBuffsAndDebuffs;
