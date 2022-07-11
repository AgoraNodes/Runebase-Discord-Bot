/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const countDownBuffsAndDebuffs = async (
  findAllMonsterToCountDownDebuff,
  t,
) => {
  // Count Down Debuffs
  for (const monsterToCountDownDebuff of findAllMonsterToCountDownDebuff) {
    if (monsterToCountDownDebuff.debuffs.length > 0) {
      for (const debuffToCountDown of monsterToCountDownDebuff.debuffs) {
        if (
          debuffToCountDown.rounds >= 1
          && !debuffToCountDown.new
        ) {
          await debuffToCountDown.decrement('rounds', {
            by: 1,
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (debuffToCountDown.rounds < 1) {
          await debuffToCountDown.destroy({
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }
};
export default countDownBuffsAndDebuffs;
