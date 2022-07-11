/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyDebuffSingle = async (
  userCurrentCharacter,
  monsterInfoArray,
  battle,
  useAttack,
  selectedMonster,
  t,
) => {
  const userBattleLogs = [];
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
    userBattleLogs.unshift({
      log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
    });
    await db.battleLog.create({
      battleId: battle.id,
      log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  monsterInfoArray.push({
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
    battleLogs: userBattleLogs,
    currentUserMp: userCurrentCharacter.condition.mana - useAttack.cost,
    ranged: false,
  });

  return [
    monsterInfoArray,
  ];
};

export default userApplyDebuffSingle;
