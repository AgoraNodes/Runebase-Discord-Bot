import db from '../../../models';

const isFailedAttack = async (
  userState,
  lvl,
  useAttack,
  battle,
  battleLogs,
  updatedMonster,
  updatedMonstersArray,
  saveToDatabasePromises,
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

      // Create battleLog
      const log = `${userState.user.username} ${useAttack.name} missed ${updatedMonster.monster.name}`;
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

      attackFailed = true;
    } else if (isBlocked) {
      updatedMonstersArray.push({
        ...updatedMonster, // the updated monster info
        userDamage: 'Blocked', // Damage to show on hit
        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
        // died: !(updatedMonster.currentHp > 0),
        attackType: 'Blocked', // TODO: Attack Type should be used to determin the animation to pick
      });

      const log = `${updatedMonster.monster.name} blocked ${userState.user.username} ${useAttack.name}`;
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
      attackFailed = true;
    } else if (isParried) {
      updatedMonstersArray.push({
        ...updatedMonster,
        userDamage: 'Parried',
        attackType: 'Parried',
      });

      const log = `${updatedMonster.monster.name} parried ${userState.user.username} ${useAttack.name}`;
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
      attackFailed = true;
    }
  }

  return [
    battleLogs,
    updatedMonstersArray,
    attackFailed,
    saveToDatabasePromises,
  ];
};

export default isFailedAttack;
