import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
import { calculateSkillDamage } from "../skills/calculateSkillDamage";

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const processBattleMove = async (
  userCurrentCharacter,
  battle,
  attackUsed,
  io,
  queue,
  t,
) => {
  // console.log('what');
  // console.log(attackUsed);
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
  const randomMonsterAttackDamage = randomIntFromInterval(battle.monsters[0].minDamage, battle.monsters[0].maxDamage);
  const updatedMonster = await battle.monsters[0].BattleMonster.update({
    currentHp: battle.monsters[0].BattleMonster.currentHp - randomAttackDamage,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  const createBattleLog = await db.battleLog.create({
    battleId: battle.id,
    log: `${userCurrentCharacter.user.username} used ${useAttack.name} ${battle.monsters[0].name} for ${randomAttackDamage} damage`,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  if (updatedMonster.currentHp < 1) {
    await db.battleLog.create({
      battleId: battle.id,
      log: `${userCurrentCharacter.user.username} killed ${battle.monsters[0].name}`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }
  let updatedUserCondition;
  if (updatedMonster.currentHp > 0) {
    updatedUserCondition = await userCurrentCharacter.condition.update({
      life: userCurrentCharacter.condition.life - randomMonsterAttackDamage,
      mana: userCurrentCharacter.condition.mana - useAttack.cost,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    await db.battleLog.create({
      battleId: battle.id,
      log: `${battle.monsters[0].name} used attack ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  if (userCurrentCharacter.condition.life < 1) {
    await db.battleLog.create({
      battleId: battle.id,
      log: `${battle.monsters[0].name} killed ${userCurrentCharacter.user.username}`,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  // console.log(updatedMonster);
  // console.log(attackOne);
  // console.log('123');
  // Fetch Updated User Character And Battle
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
        model: db.monster,
        as: 'monsters',
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  const userInfo = {
    alive: updatedUserCondition > 0,
    attackDamage: randomAttackDamage,
    attack: useAttack.name,
  };
  const monsterInfo = {
    alive: updatedMonster.currentHp > 0,
    attackDamage: randomMonsterAttackDamage,
    attack: unitUsedMove,
  };
  return [
    userCurrentCharacter,
    updatedBattle,
    userInfo,
    monsterInfo,
  ];
};
