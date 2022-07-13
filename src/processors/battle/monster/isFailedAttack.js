import db from '../../../models';
import { randomIntFromInterval } from "../../../helpers/utils";

const isFailedAttack = async (
  userState,
  lvl,
  block,
  defense,
  regularAttack,
  battle,
  battleLogs,
  remainingMonster,
  useAttack,
  saveToDatabasePromises,
  t,
) => {
  let individualBattleObject;
  // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
  let attackFailed = false;
  const randomMonsterAttackRating = randomIntFromInterval(useAttack.minAr, useAttack.maxAr); // Get Random Monster Damage

  if (useAttack.damageType.name === 'Physical') {
    // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
    // AR = Attacker's Attack Rating
    // DR = Defender's Defense rating
    // Alvl = Attacker's level
    // Dlvl = Defender's level
    const monsterHitChance = (200 * (randomMonsterAttackRating / (randomMonsterAttackRating + defense)) * (remainingMonster.monster.level / (remainingMonster.monster.level + lvl))) * 100;

    const isBlocked = Math.random() < Number(block) / 100; // Did We block the attack?
    const isParried = Math.random() < Number(regularAttack.parry) / 100; // Did We parry the attack?
    const isNotMissed = Math.random() < Number(monsterHitChance) / 100; // Did Monster hit user?

    if (!isNotMissed) {
      const log = `${remainingMonster.monster.name} ${useAttack.name} missed ${userState.user.username}`;
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

      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Missed',
        damage: 0,
        userState: JSON.parse(JSON.stringify(userState)),
        useAttack,
        battleLogs,
      };
      attackFailed = true;
    } else if (isBlocked) {
      const log = `${userState.user.username} blocked ${remainingMonster.monster.name} ${useAttack.name}`;
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

      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Blocked',
        damage: 0,
        userState: JSON.parse(JSON.stringify(userState)),
        useAttack,
        battleLogs,
      };
      attackFailed = true;
    } else if (isParried) {
      const log = `${userState.user.username} parried ${remainingMonster.monster.name} ${useAttack.name}`;
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

      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Parried',
        damage: 0,
        userState: JSON.parse(JSON.stringify(userState)),
        useAttack,
        battleLogs,
      };
      attackFailed = true;
    }
  }

  return [
    individualBattleObject,
    attackFailed,
    saveToDatabasePromises,
  ];
};

export default isFailedAttack;
