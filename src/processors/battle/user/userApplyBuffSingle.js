import db from '../../../models';

const userApplyBuffSingle = async (
  userState,
  allRoundBuffsInfoArray,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonsterId,
  saveToDatabasePromises,
  t,
) => {
  const battleLogs = [];
  const existingBuff = userState.buffs.find((x) => x.name === useAttack.name);

  if (existingBuff) {
    await db.buff.destroy({
      where: {
        id: existingBuff.id,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    const index = userState.buffs.findIndex((o) => o.id === existingBuff.id);
    if (index !== -1) userState.buffs.splice(index, 1);
  }
  if (!existingBuff) {
    allRoundBuffsInfoArray.push(useAttack.name);
  }

  const buffObject = {
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
  };
  saveToDatabasePromises.push(
    new Promise((resolve, reject) => {
      db.buff.create(buffObject, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }).then(() => resolve());
    }),
  );
  userState.buffs.unshift(
    buffObject,
  );

  const log = `${userState.user.username} used ${useAttack.name}`;
  saveToDatabasePromises.push(
    new Promise((resolve, reject) => {
      db.battleLog.create({
        battleId: battle.id,
        log,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }).then(resolve());
    }),
  );

  battleLogs.unshift({
    log,
  });

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: selectedMonsterId,
    monstersToUpdate: [],
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  console.log('done applying buff');
  return [
    stageOneInfoArray,
    userState,
    allRoundBuffsInfoArray,
    saveToDatabasePromises,
  ];
};

export default userApplyBuffSingle;
