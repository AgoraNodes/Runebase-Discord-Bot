/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { use } from 'passport';
import db from '../../../models';

const userApplyDebuffAoE = async (
  userState,
  battleMonsterState,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonsterId,
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

      const createDebuff = await db.debuff.create({
        name: useAttack.name,
        new: true,
        rounds: useAttack.rounds,
        BattleMonsterId: battleMonster.id,
        reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
        minDmg: useAttack.min ? useAttack.min : null,
        maxDmg: useAttack.max ? useAttack.max : null,
        stun: useAttack.stun ? useAttack.stun : null,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      BattleMonsterToUpdate.debuffs.unshift(
        JSON.parse(JSON.stringify(createDebuff)),
      );
      console.log(BattleMonsterToUpdate);
      battleMonsterState = battleMonsterState.map((obj) => [BattleMonsterToUpdate].find((o) => o.id === obj.id) || obj);
      monstersToUpdate.push({
        ...BattleMonsterToUpdate,
        userDamage: useAttack.name,
        attackType: useAttack.name,
      });
      const createBattleLog = await db.battleLog.create({
        battleId: battle.id,
        log: `${userState.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
    }
  }

  userState.mp.current -= useAttack.cost;

  stageOneInfoArray.push({
    monsterId: selectedMonsterId,
    monstersToUpdate,
    useAttack,
    battleLogs,
    userState: JSON.parse(JSON.stringify(userState)),
  });

  return [
    stageOneInfoArray,
    userState,
    battleMonsterState,
  ];
};

export default userApplyDebuffAoE;
