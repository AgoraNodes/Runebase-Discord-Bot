import db from '../../../models';

const isFailedAttack = async (
  userCurrentCharacter,
  lvl,
  useAttack,
  battle,
  userBattleLogs,
  updatedMonster,
  updatedMonstersArray,
  t,
) => {
  // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
  let attackFailed = false;
  if (useAttack.attackTpe === 'Physical') {
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
      userBattleLogs.unshift({
        log: `${userCurrentCharacter.user.username} ${useAttack.name} missed ${updatedMonster.monster.name}`,
      });
      updatedMonstersArray.push({
        ...updatedMonster,
        userDamage: 'Missed',
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Missed',
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${userCurrentCharacter.user.username} ${useAttack.name} missed ${updatedMonster.monster.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      attackFailed = true;
    } else if (isBlocked) {
      userBattleLogs.unshift({
        log: `${updatedMonster.monster.name} blocked ${userCurrentCharacter.user.username} ${useAttack.name}`,
      });
      updatedMonstersArray.push({
        ...updatedMonster, // the updated monster info
        userDamage: 'Blocked', // Damage to show on hit
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Blocked', // TODO: Attack Type should be used to determin the animation to pick
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} blocked ${userCurrentCharacter.user.username} ${useAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      attackFailed = true;
    } else if (isParried) {
      userBattleLogs.unshift({
        log: `${updatedMonster.monster.name} parried ${userCurrentCharacter.user.username} ${useAttack.name}`,
      });
      updatedMonstersArray.push({
        ...updatedMonster,
        userDamage: 'Parried',
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Parried',
      });

      await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} parried ${userCurrentCharacter.user.username} ${useAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      attackFailed = true;
    }
  }

  return [
    userBattleLogs,
    updatedMonstersArray,
    attackFailed,
  ];
};

export default isFailedAttack;
