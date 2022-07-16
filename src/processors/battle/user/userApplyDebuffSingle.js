/* eslint-disable no-await-in-loop */
import db from '../../../models';

const userApplyDebuffSingle = async (
  userState,
  allRoundDebuffsInfoArray,
  battleMonsterState,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonsterId,
  saveToDatabasePromises,
  t,
) => {
  const battleLogs = [];
  const updatedMonster = battleMonsterState.find((element) => element.id === selectedMonsterId);
  // Apply ALL Single Unit Debuffs here

  if (updatedMonster.currentHp > 0) {
    const existingDebuff = updatedMonster.debuffs.find((x) => x.name === useAttack.name);
    if (existingDebuff) {
      await db.debuff.destroy({
        where: {
          id: existingDebuff.id,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const index = updatedMonster.debuffs.findIndex((o) => o.id === existingDebuff.id);
      if (index !== -1) updatedMonster.debuffs.splice(index, 1);
    }
    if (!existingDebuff) {
      allRoundDebuffsInfoArray.push(
        useAttack.name,
      );
    }

    const debuffObject = {
      name: useAttack.name,
      new: true,
      rounds: useAttack.rounds,
      BattleMonsterId: updatedMonster.id,
      reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
      minDmg: useAttack.min ? useAttack.min : null,
      maxDmg: useAttack.max ? useAttack.max : null,
    };

    saveToDatabasePromises.push(
      new Promise((resolve, reject) => {
        db.debuff.create(debuffObject, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        }).then(() => resolve());
      }),
    );

    updatedMonster.debuffs.unshift(
      debuffObject,
    );

    const log = `${userState.UserGroup.user.username} used ${useAttack.name} on ${updatedMonster.monster.name}`;
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

  userState.mp.current -= useAttack.cost;

  const monstersToUpdate = [
    {
      ...updatedMonster,
      userDamage: useAttack.name,
      attackType: useAttack.name,
    },
  ];
  battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageOneInfoArray,
    userState,
    allRoundDebuffsInfoArray,
    battleMonsterState,
    saveToDatabasePromises,
  ];
};

export default userApplyDebuffSingle;
