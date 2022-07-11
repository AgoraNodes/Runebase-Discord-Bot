/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyBuffSingle = async (
  userCurrentCharacter,
  monsterInfoArray,
  battle,
  useAttack,
  selectedMonster,
  t,
) => {
  console.log('start apply buff');
  const battleLogs = [];
  const userCharacter = JSON.parse(JSON.stringify(userCurrentCharacter));
  const updatedMonster = JSON.parse(JSON.stringify(selectedMonster));
  const existingBuff = userCurrentCharacter.buffs.find((x) => x.name === useAttack.name);

  if (existingBuff) {
    await existingBuff.destroy({
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    const index = userCharacter.buffs.findIndex((o) => o.id === existingBuff.id);
    if (index !== -1) userCharacter.buffs.splice(index, 1);
  }

  const createBuff = await db.buff.create({
    name: useAttack.name,
    UserClassId: userCharacter.id,
    damageBonus: useAttack.damageBonus ? useAttack.damageBonus : null,
    attackBonus: useAttack.attackBonus ? useAttack.attackBonus : null,
    defenseBonus: useAttack.defenseBonus ? useAttack.defenseBonus : null,
    parryBonus: useAttack.parryBonus ? useAttack.parryBonus : null,
    lifeBonus: useAttack.lifeBonus ? useAttack.lifeBonus : null,
    chance: useAttack.chance ? useAttack.chance : 100,
    new: true,
    rounds: useAttack.rounds,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  userCharacter.buffs.unshift(
    JSON.parse(JSON.stringify(createBuff)),
  );

  const createBattleLog = await db.battleLog.create({
    battleId: battle.id,
    log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog.log)));

  userCharacter.condition.mana -= useAttack.cost;

  monsterInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: [],
    useAttack,
    battleLogs,
    userCharacter,
    currentUserMp: userCurrentCharacter.condition.mana - useAttack.cost,
  });

  console.log('done applying buff');
  return [
    monsterInfoArray,
  ];
};

export default userApplyBuffSingle;
