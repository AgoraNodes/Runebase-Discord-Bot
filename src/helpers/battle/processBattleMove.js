import {
  Op,
} from 'sequelize';
import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
import { calculateSkillDamage } from "../skills/calculateSkillDamage";
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
  const unitUsedMove = "Attack";
  const {
    attackOne,
    attackTwo,
    regularAttack,
    block,
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
  const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max);
  const monsterToUpdate = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);
  const updatedMonster = await monsterToUpdate.decrement('currentHp', {
    by: randomAttackDamage,
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  const newUserMp = userCurrentCharacter.condition.mana - useAttack.cost;
  await userCurrentCharacter.condition.update({
    mana: newUserMp,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  console.log('2');
  const monsterInfo = [];

  const createBattleLog = await db.battleLog.create({
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
  console.log('3');
  const battleInfoArray = [];

  if (allRemainingBattleMonster) {
    let currentUserHp = userCurrentCharacter.condition.life;
    let totalDamageByMonsters = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const remainingMonster of allRemainingBattleMonster) {
      if (currentUserHp > 0) {
        const randomMonsterAttackDamage = randomIntFromInterval(remainingMonster.monster.minDamage, remainingMonster.monster.maxDamage);
        battleInfoArray.push({
          monsterId: remainingMonster.id,
          damage: randomMonsterAttackDamage,
          currentHp: currentUserHp - randomMonsterAttackDamage,
        });
        totalDamageByMonsters += randomMonsterAttackDamage;
        currentUserHp -= randomMonsterAttackDamage;

        await db.battleLog.create({
          battleId: battle.id,
          log: `${remainingMonster.monster.name} used attack on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
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
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }
  console.log('4');
  const updatedBattle = await db.battle.findOne({
    where: {
      id: battle.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
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

  console.log('done processing battle moves');

  return [
    userCurrentCharacter,
    updatedBattle,
    battleInfoArray,
    monsterInfo,
    sumExp,
  ];
};
