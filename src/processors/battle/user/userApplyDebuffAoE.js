/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyDebuffAoE = async (
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
  const monstersToUpdate = [];
  const selectedMonster = battleMonsterState.find((element) => element.id === selectedMonsterId);
  // Apply ALL AOE Debuffs here
  for (const battleMonster of battleMonsterState) {
    const BattleMonsterToUpdate = JSON.parse(JSON.stringify(battleMonster));
    if (battleMonster.currentHp > 0) {
      const existingDebuff = battleMonster.debuffs.find((x) => x.name === useAttack.name);
      if (existingDebuff) {
        await db.debuff.destroy({
          where: {
            id: existingDebuff.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        const index = BattleMonsterToUpdate.debuffs.findIndex((o) => o.id === existingDebuff.id);
        if (index !== -1) BattleMonsterToUpdate.debuffs.splice(index, 1);
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
        BattleMonsterId: battleMonster.id,
        reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
        minDmg: useAttack.min ? useAttack.min : null,
        maxDmg: useAttack.max ? useAttack.max : null,
        stun: useAttack.stun ? useAttack.stun : null,
      };

      saveToDatabasePromises.push(
        new Promise((resolve, reject) => {
          db.debuff.create(debuffObject, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          }).then(() => resolve());
        }),
      );

      BattleMonsterToUpdate.debuffs.unshift(
        debuffObject,
      );

      battleMonsterState = battleMonsterState.map((obj) => [BattleMonsterToUpdate].find((o) => o.id === obj.id) || obj);

      monstersToUpdate.push({
        ...BattleMonsterToUpdate,
        userDamage: useAttack.name,
        attackType: useAttack.name,
      });

      // Generate Battle Log
      const log = `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`;
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
  }

  userState.mp.current -= useAttack.cost;

  console.log(JSON.parse(JSON.stringify(monstersToUpdate)));
  stageOneInfoArray.push({
    monsterId: selectedMonsterId,
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

export default userApplyDebuffAoE;
