/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyDebuffSingle = async (
  userState,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonster,
  t,
) => {
  const battleLogs = [];
  const updatedMonster = JSON.parse(JSON.stringify(selectedMonster));
  // Apply ALL Single Unit Debuffs here

  if (selectedMonster.currentHp > 0) {
    const existingDebuff = selectedMonster.debuffs.find((x) => x.name === useAttack.name);
    if (existingDebuff) {
      await existingDebuff.destroy({
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const index = updatedMonster.debuffs.findIndex((o) => o.id === existingDebuff.id);
      if (index !== -1) updatedMonster.debuffs.splice(index, 1);
    }
    const createDebuff = await db.debuff.create({
      name: useAttack.name,
      new: true,
      rounds: useAttack.rounds,
      BattleMonsterId: updatedMonster.id,
      reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
      minDmg: useAttack.min ? useAttack.min : null,
      maxDmg: useAttack.max ? useAttack.max : null,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    updatedMonster.debuffs.unshift(
      JSON.parse(JSON.stringify(createDebuff)),
    );
    battleLogs.unshift({
      log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
    });
    await db.battleLog.create({
      battleId: battle.id,
      log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: [
      {
        ...updatedMonster,
        userDamage: useAttack.name,
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: useAttack.name,
      },
    ],
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageOneInfoArray,
    userState,
  ];
};

export default userApplyDebuffSingle;
