/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';

const userApplyDebuffAoE = async (
  userCurrentCharacter,
  userState,
  stageOneInfoArray,
  battle,
  useAttack,
  selectedMonster,
  t,
) => {
  const battleLogs = [];
  const updatedMonstersArray = [];
  // Apply ALL AOE Debuffs here
  for (const battleMonster of battle.BattleMonsters) {
    const BattleMonsterToUpdate = JSON.parse(JSON.stringify(battleMonster));
    if (battleMonster.currentHp > 0) {
      const existingDebuff = battleMonster.debuffs.find((x) => x.name === useAttack.name);
      if (existingDebuff) {
        await existingDebuff.destroy({
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
        reducedArmor: useAttack.reducedArmor,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      BattleMonsterToUpdate.debuffs.unshift(
        JSON.parse(JSON.stringify(createDebuff)),
      );
      updatedMonstersArray.push({
        ...BattleMonsterToUpdate,
        userDamage: useAttack.name,
        // currentMonsterHp: selectedMonster.currentHp - 0,
        // died: !(battleMonster.currentHp > 0),
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
    monsterId: selectedMonster.id,
    monstersToUpdate: updatedMonstersArray,
    useAttack,
    battleLogs,
    userState,
  });

  return [
    stageOneInfoArray,
    userState,
  ];
};

export default userApplyDebuffAoE;
