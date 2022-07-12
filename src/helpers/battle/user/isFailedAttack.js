import db from '../../../models';

const isFailedAttack = async (
  userState,
  lvl,
  useAttack,
  battle,
  battleLogs,
  updatedMonster,
  updatedMonstersArray,
  t,
) => {
  // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
  let attackFailed = false;
  if (useAttack.attackType === 'Physical') {
    // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
    // AR = Attacker's Attack Rating
    // DR = Defender's Defense rating
    // Alvl = Attacker's level
    // Dlvl = Defender's level
    const userHitChance = (200 * (useAttack.ar / (useAttack.ar + updatedMonster.monster.defense)) * (lvl / (lvl + updatedMonster.monster.level))) * 100;

    const isBlocked = Math.random() < Number(updatedMonster.monster.block) / 100; // Did We block the attack?
    const isParried = Math.random() < Number(updatedMonster.monster.parry) / 100; // Did monster parry the attack?
    const isNotMissed = Math.random() < Number(userHitChance) / 100; // Did User hit monster?

    if (!isNotMissed) {
      updatedMonstersArray.push({
        ...updatedMonster,
        userDamage: 'Missed',
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Missed',
      });
      const createBattleLog = await db.battleLog.create({
        battleId: battle.id,
        log: `${userState.user.username} ${useAttack.name} missed ${updatedMonster.monster.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
      attackFailed = true;
    } else if (isBlocked) {
      updatedMonstersArray.push({
        ...updatedMonster, // the updated monster info
        userDamage: 'Blocked', // Damage to show on hit
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Blocked', // TODO: Attack Type should be used to determin the animation to pick
      });
      const createBattleLog = await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} blocked ${userState.user.username} ${useAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
      attackFailed = true;
    } else if (isParried) {
      updatedMonstersArray.push({
        ...updatedMonster,
        userDamage: 'Parried',
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Parried',
      });

      const createBattleLog = await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} parried ${userState.user.username} ${useAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog)));
      attackFailed = true;
    }
  }

  return [
    battleLogs,
    updatedMonstersArray,
    attackFailed,
  ];
};

export default isFailedAttack;
