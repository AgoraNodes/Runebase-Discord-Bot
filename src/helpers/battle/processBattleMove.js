import {
  Op,
} from 'sequelize';
import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
// import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
// import { calculateSkillDamage } from "../stats/calculateSkills";
import { randomIntFromInterval } from "../utils";

export const processBattleMove = async (
  userCurrentCharacter,
  battle,
  currentSelectedMonster,
  attackUsed,
  io,
  queue,
  t,
) => {
  const sumExp = battle.BattleMonsters.reduce((accumulator, object) => accumulator + object.monster.exp, 0);
  // const isAnyMobAlive = battle.BattleMonsters.find((element) => element.currentHp > 0);
  console.log('1');
  // const unitUsedMove = "Attack";
  const {
    lvl,
    attackOne,
    attackTwo,
    regularAttack,
    block,
    defense,
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );
  let useAttack;
  if (attackUsed === 'main') {
    if (userCurrentCharacter.condition.mana >= attackOne.cost) {
      useAttack = attackOne;
    } else {
      useAttack = regularAttack;
    }
  }
  if (attackUsed === 'secondary') {
    if (userCurrentCharacter.condition.mana >= attackTwo.cost) {
      useAttack = attackTwo;
    } else {
      useAttack = regularAttack;
    }
  }
  const newUserMp = userCurrentCharacter.condition.mana - useAttack.cost;

  const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max);
  const monsterToUpdate = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);
  const updatedMonster = await monsterToUpdate.decrement('currentHp', {
    by: randomAttackDamage,
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  const monsterInfo = [];

  await db.battleLog.create({
    battleId: battle.id,
    log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${monsterToUpdate.monster.name} for ${randomAttackDamage} damage`,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  if (updatedMonster.currentHp > 0) {
    monsterInfo.push({
      monsterId: updatedMonster.id,
      userDamage: randomAttackDamage,
      currentMonsterHp: monsterToUpdate.currentHp - randomAttackDamage,
      currentUserMp: newUserMp,
      died: false,
      newDebuff: false,
    });
  } else {
    await db.battleLog.create({
      battleId: battle.id,
      log: `${userCurrentCharacter.user.username} killed ${monsterToUpdate.monster.name}`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    monsterInfo.push({
      monsterId: updatedMonster.id,
      userDamage: randomAttackDamage,
      currentMonsterHp: monsterToUpdate.currentHp - randomAttackDamage,
      currentMp: newUserMp,
      died: true,
    });
  }
  const allRemainingBattleMonster = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
      currentHp: {
        [Op.gt]: 0,
      },
    },
    include: [
      {
        model: db.monster,
        as: 'monster',
        include: [
          {
            model: db.monsterAttack,
            as: 'monsterAttacks',
          },
        ],
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  console.log(allRemainingBattleMonster);
  console.log('allRemainingBattleMonster');
  if (!allRemainingBattleMonster || allRemainingBattleMonster.length < 1) {
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  const battleInfoArray = [];

  if (allRemainingBattleMonster) {
    let currentUserHp = userCurrentCharacter.condition.life;
    let totalDamageByMonsters = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const remainingMonster of allRemainingBattleMonster) {
      if (currentUserHp > 0) {
        // TODO: pick random moster attack type instead of regular attack
        let pickedMonsterAttack = remainingMonster.monster.monsterAttacks.find((x) => x.defaultAttack === true);
        const nonDefaultMonsterAttacks = remainingMonster.monster.monsterAttacks.filter((filterAttack) => filterAttack.defaultAttack === false);
        console.log(nonDefaultMonsterAttacks);
        // Pick a non-default monster attack based on chance
        let roll = Math.random();
        for (let i = 0, len = nonDefaultMonsterAttacks.length; i < len; ++i) {
          const { chance } = nonDefaultMonsterAttacks[i];
          console.log(chance);
          if (roll < (chance / 100)) {
            pickedMonsterAttack = nonDefaultMonsterAttacks[i];
            break;
          }
          roll -= chance;
        }
        const randomMonsterAttackDamage = randomIntFromInterval(pickedMonsterAttack.minDmg, pickedMonsterAttack.maxDmg); // Get Random Monster Damage
        const randomMonsterAttackRating = randomIntFromInterval(pickedMonsterAttack.minAr, pickedMonsterAttack.maxAr); // Get Random Monster Damage

        // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
        // AR = Attacker's Attack Rating
        // DR = Defender's Defense rating
        // Alvl = Attacker's level
        // Dlvl = Defender's level
        const monsterHitChance = (200 * (randomMonsterAttackRating / (randomMonsterAttackRating + defense)) * (remainingMonster.monster.level / (remainingMonster.monster.level + lvl))) * 100;
        console.log(monsterHitChance);
        console.log('monsterHitChance');

        const isBlocked = Math.random() < Number(block) / 100; // Did We block the attack?
        const isParried = Math.random() < Number(regularAttack.parry) / 100; // Did We parry the attack?
        const isNotMissed = Math.random() < Number(monsterHitChance) / 100; // Did Monster hit user?

        if (!isNotMissed) {
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Missed',
            damage: 0,
            currentHp: currentUserHp,
            log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
          });
          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (isBlocked) {
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Blocked',
            damage: 0,
            currentHp: currentUserHp,
            log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          });
          await db.battleLog.create({
            battleId: battle.id,
            log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (isParried) {
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Parried',
            damage: 0,
            currentHp: currentUserHp,
            log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          });

          await db.battleLog.create({
            battleId: battle.id,
            log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else {
          // TODO Check if we counter attack (retaliate)
          // TODO Create Kick Damage calculation in statscalculations
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: pickedMonsterAttack.name,
            damage: randomMonsterAttackDamage,
            currentHp: currentUserHp - randomMonsterAttackDamage,
            log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
          });
          totalDamageByMonsters += randomMonsterAttackDamage;
          currentUserHp -= randomMonsterAttackDamage;

          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }

        if (currentUserHp < 1) {
          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} killed ${userCurrentCharacter.user.username}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
    await userCurrentCharacter.condition.update({
      life: userCurrentCharacter.condition.life - totalDamageByMonsters,
      mana: newUserMp,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  const updatedBattle = await db.battle.findOne({
    where: {
      id: battle.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
      [db.BattleMonster, 'id', 'DESC'],
    ],
    include: [
      {
        model: db.battleLog,
        as: 'battleLogs',
        required: false,
      },
      {
        model: db.BattleMonster,
        as: 'BattleMonsters',
        include: [
          {
            model: db.monster,
            as: 'monster',
          },
        ],
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  return [
    userCurrentCharacter,
    updatedBattle,
    battleInfoArray,
    monsterInfo,
    sumExp,
  ];
};
