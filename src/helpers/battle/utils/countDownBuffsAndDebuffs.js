/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from "../../../models";

// TODO: Use Promises to push to database
const countDownBuffsAndDebuffs = async (
  stageFiveInfoArray,
  userState,
  battleMonsterState,
  t,
) => {
  const newUserBuffsArray = [];
  const monstersToUpdate = [];
  // Count Down Debuffs
  for (const monsterToCountDownDebuff of battleMonsterState) {
    if (monsterToCountDownDebuff.currentHp > 0) {
      const newBattleMonstersDebuffArrays = [];
      if (monsterToCountDownDebuff.debuffs.length > 0) {
        for (const monsterDebuff of monsterToCountDownDebuff.debuffs) {
          if (monsterDebuff.new) {
            newBattleMonstersDebuffArrays.push(
              monsterDebuff,
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
                ...monsterDebuff,
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
      monsterToCountDownDebuff.debuffs = newBattleMonstersDebuffArrays;
      monstersToUpdate.push(
        monsterToCountDownDebuff,
      );
    }
  }

  if (userState.buffs.length > 0) {
    for (const userBuff of userState.buffs) {
      if (userBuff.new) {
        console.log('user buff is new');
        newUserBuffsArray.push(
          userBuff,
        );
      } else if (
        userBuff.rounds >= 1
        && !userBuff.new
      ) {
        console.log('user buff is not new');
        newUserBuffsArray.push(
          {
            ...userBuff,
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
