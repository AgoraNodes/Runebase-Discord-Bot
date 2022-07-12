/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const removeNewTagFromBuffsAndDebuffs = async (
  userCurrentCharacter,
  monsters,
  t,
) => {
  // console.log('start removing new tags from buffs & debuffs');
  for (const monsterToRemoveNewDebuffTag of monsters) {
    if (monsterToRemoveNewDebuffTag.debuffs.length > 0) {
      for (const monsterDebuff of monsterToRemoveNewDebuffTag.debuffs) {
        if (monsterDebuff.new) {
          await monsterDebuff.update({
            new: false,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
    if (monsterToRemoveNewDebuffTag.buffs.length > 0) {
      for (const monsterbuff of monsterToRemoveNewDebuffTag.buffs) {
        if (monsterbuff.new) {
          await monsterbuff.update({
            new: false,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }
  // console.log(userCurrentCharacter.buffs);
  // console.log('intermediate');

  if (userCurrentCharacter.buffs.length > 0) {
    for (const userBuff of userCurrentCharacter.buffs) {
      if (userBuff.new) {
        await userBuff.update({
          new: false,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
    }
  }

  if (userCurrentCharacter.debuffs.length > 0) {
    for (const userDebuff of userCurrentCharacter.debuffs) {
      if (userDebuff.new) {
        await userDebuff.update({
          new: false,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }
    }
  }

  // console.log('done removing new tag from buffs & debuffs');
};
export default removeNewTagFromBuffsAndDebuffs;
