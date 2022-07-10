import db from '../../../models';
import { randomIntFromInterval } from "../../utils";

const isFailedAttack = async (
  userCurrentCharacter,
  currentUserHp,
  lvl,
  block,
  defense,
  regularAttack,
  battle,
  battleLogs,
  remainingMonster,
  pickedMonsterAttack,
  t,
) => {
  let individualBattleObject;
  // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
  let attackFailed = false;
  const randomMonsterAttackRating = randomIntFromInterval(pickedMonsterAttack.minAr, pickedMonsterAttack.maxAr); // Get Random Monster Damage

  if (pickedMonsterAttack.attackType === 'physical') {
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
      battleLogs.unshift({
        log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Missed',
        damage: 0,
        currentHp: currentUserHp,
        battleLogs,
      };
      attackFailed = true;
    } else if (isBlocked) {
      battleLogs.unshift({
        log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Blocked',
        damage: 0,
        currentHp: currentUserHp,
        battleLogs,
      };
      attackFailed = true;
    } else if (isParried) {
      battleLogs.unshift({
        log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
      });

      await db.battleLog.create({
        battleId: battle.id,
        log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      individualBattleObject = {
        monsterId: remainingMonster.id,
        attackType: 'Parried',
        damage: 0,
        currentHp: currentUserHp,
        battleLogs,
      };
      attackFailed = true;
    }
  }

  return [
    individualBattleObject,
    attackFailed,
  ];
};

export default isFailedAttack;
