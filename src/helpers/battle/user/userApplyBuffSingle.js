/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyBuffSingle = async (
  userCurrentCharacter,
  userState,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonster,
  t,
) => {
  console.log('start apply buff');
  const battleLogs = [];

  const updatedMonster = JSON.parse(JSON.stringify(selectedMonster));
  const existingBuff = userCurrentCharacter.buffs.find((x) => x.name === useAttack.name);

  if (existingBuff) {
    await existingBuff.destroy({
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    const index = userState.buffs.findIndex((o) => o.id === existingBuff.id);
    if (index !== -1) userState.buffs.splice(index, 1);
  }

  const createBuff = await db.buff.create({
    name: useAttack.name,
    UserClassId: userState.id,
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
  userState.buffs.unshift(
    JSON.parse(JSON.stringify(createBuff)),
  );

  const createBattleLog = await db.battleLog.create({
    battleId: battle.id,
    log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: updatedMonster.id,
    monstersToUpdate: [],
    useAttack,
    battleLogs,
    userState,
  });

  console.log('done applying buff');
  return [
    stageOneInfoArray,
    userState,
  ];
};

export default userApplyBuffSingle;
