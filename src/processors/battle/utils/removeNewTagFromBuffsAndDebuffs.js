import db from "../../../models";

/* eslint-disable no-restricted-syntax */
const removeNewTagFromBuffsAndDebuffs = async (
  userState,
  battleMonsterState,
  allRoundBuffsInfoArray,
  allRoundDebuffsInfoArray,
  saveToDatabasePromisesOne,
  t,
) => {
  const monstersToUpdate = [];

  // Remove Debuff "new" tag from Monsters
  for (const monsterToRemoveNewDebuffTag of battleMonsterState) {
    const updatedDebuffs = [];
    const updatedBuffs = [];
    if (monsterToRemoveNewDebuffTag.debuffs.length > 0) {
      const { debuffs } = monsterToRemoveNewDebuffTag;
      for (const monsterDebuff of debuffs) {
        if (monsterDebuff.new) {
          saveToDatabasePromisesOne.push(
            new Promise((resolve, reject) => {
              db.debuff.update({
                new: false,
              }, {
                where: {
                  id: monsterDebuff.id,
                },
                lock: t.LOCK.UPDATE,
                transaction: t,
              }).then(() => resolve());
            }),
          );
        }
        // Alternative to removing all the duplicates at the end of the processor?
        // allRoundDebuffsInfoArray.push([
        //   ...allRoundDebuffsInfoArray,
        //   monsterDebuff.name,
        // ]);
        allRoundDebuffsInfoArray.push(
          monsterDebuff.name,
        );
        updatedDebuffs.push(
          {
            ...monsterDebuff,
            new: false,
          },
        );
      }
      monsterToRemoveNewDebuffTag.debuffs = updatedDebuffs;
    }

    if (monsterToRemoveNewDebuffTag.buffs.length > 0) {
      const { buffs } = monsterToRemoveNewDebuffTag;
      for (const monsterbuff of buffs) {
        if (monsterbuff.new) {
          saveToDatabasePromisesOne.push(
            new Promise((resolve, reject) => {
              db.buff.update({
                new: false,
              }, {
                where: {
                  id: monsterbuff.id,
                },
                lock: t.LOCK.UPDATE,
                transaction: t,
              }).then(() => resolve());
            }),
          );
        }
        allRoundBuffsInfoArray.push(
          monsterbuff,
        );
        updatedBuffs.push(
          {
            ...monsterbuff,
            new: false,
          },
        );
      }
      monsterToRemoveNewDebuffTag.buffs = updatedBuffs;
    }
    monstersToUpdate.push(monsterToRemoveNewDebuffTag);
  }

  const newUserBuffsArray = [];
  const newUserDebuffsArray = [];

  if (userState.buffs.length > 0) {
    for (const userBuff of userState.buffs) {
      if (userBuff.new) {
        saveToDatabasePromisesOne.push(
          new Promise((resolve, reject) => {
            db.buff.update({
              new: false,
            }, {
              where: {
                id: userBuff.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            }).then(() => resolve());
          }),
        );
      }
      allRoundBuffsInfoArray.push(
        userBuff.name,
      );
      newUserBuffsArray.push(
        {
          ...userBuff,
          new: false,
        },
      );
    }
  }

  if (userState.debuffs.length > 0) {
    for (const userDebuff of userState.debuffs) {
      if (userDebuff.new) {
        saveToDatabasePromisesOne.push(
          new Promise((resolve, reject) => {
            db.debuff.update({
              new: false,
            }, {
              where: {
                id: userDebuff.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            }).then(() => resolve());
          }),
        );
      }
      allRoundDebuffsInfoArray.push(
        userDebuff.name,
      );
      newUserDebuffsArray.push(
        {
          ...userDebuff,
          new: false,
        },
      );
    }
  }

  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);
  userState.buffs = newUserBuffsArray;
  userState.debuffs = newUserDebuffsArray;

  return [
    userState,
    battleMonsterState,
    allRoundBuffsInfoArray,
    allRoundDebuffsInfoArray,
    saveToDatabasePromisesOne,
  ];
};
export default removeNewTagFromBuffsAndDebuffs;
