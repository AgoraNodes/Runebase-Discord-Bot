/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const countDownBuffsAndDebuffs = async (
  findAllMonsterToCountDownDebuff,
  userCurrentCharacter,
  t,
) => {
  // Count Down Debuffs
  for (const monsterToCountDownDebuff of findAllMonsterToCountDownDebuff) {
    if (monsterToCountDownDebuff.debuffs.length > 0) {
      for (const monsterDebuff of monsterToCountDownDebuff.debuffs) {
        if (
          monsterDebuff.rounds >= 1
          && !monsterDebuff.new
        ) {
          await monsterDebuff.decrement('rounds', {
            by: 1,
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (monsterDebuff.rounds < 1) {
          await monsterDebuff.destroy({
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }
  if (userCurrentCharacter.buffs.length > 0) {
    for (const userBuff of userCurrentCharacter.buffs) {
      if (
        userBuff.rounds >= 1
        && !userBuff.new
      ) {
        await userBuff.decrement('rounds', {
          by: 1,
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      } else if (userBuff.rounds < 1) {
        await userBuff.destroy({
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
    }
  }
};
export default countDownBuffsAndDebuffs;
