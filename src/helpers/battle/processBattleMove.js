import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
import { fetchUserCurrentCharacter } from "../character/character";

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const processBattleMove = async (
  userCurrentCharacter,
  battle,
  attackId,
  io,
  queue,
) => {
  const unitUsedMove = "Attack";
  const userUsedMove = "Attack";
  const {
    attackOne,
  } = await calculateCharacterStats(userCurrentCharacter);
  const randomAttackDamage = randomIntFromInterval(attackOne.min, attackOne.max);
  const randomMonsterAttackDamage = randomIntFromInterval(battle.monsters[0].minDamage, battle.monsters[0].maxDamage);
  const updatedMonster = await battle.monsters[0].BattleMonster.update({
    currentHp: battle.monsters[0].BattleMonster.currentHp - randomAttackDamage,
  });
  const createBattleLog = await db.battleLog.create({
    battleId: battle.id,
    log: `${userCurrentCharacter.user.username} attacked ${battle.monsters[0].name} for ${randomAttackDamage} damage`,
  });
  if (updatedMonster.currentHp < 1) {
    await db.battleLog.create({
      battleId: battle.id,
      log: `${userCurrentCharacter.user.username} killed ${battle.monsters[0].name}`,
    });
    await battle.update({
      complete: true,
    });
  }
  let updatedUserCondition;
  if (updatedMonster.currentHp > 0) {
    updatedUserCondition = await userCurrentCharacter.condition.update({
      life: userCurrentCharacter.condition.life - randomMonsterAttackDamage,
    });
    await db.battleLog.create({
      battleId: battle.id,
      log: `${battle.monsters[0].name} attacked ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
    });
  }
  console.log(updatedMonster);
  console.log(attackOne);
  console.log('123');
  // Fetch Updated User Character And Battle
  const updatedBattle = await db.battle.findOne({
    where: {
      id: battle.id,
    },
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
  });
  const updatedUserCurrentCharacter = await fetchUserCurrentCharacter(
    userCurrentCharacter.user.user_id, // user discord id
    false, // Need inventory?
  );
  const userInfo = {
    alive: updatedUserCondition > 0,
    attackDamage: randomAttackDamage,
    attack: userUsedMove,
  };
  const monsterInfo = {
    alive: updatedMonster.currentHp > 0,
    attackDamage: randomMonsterAttackDamage,
    attack: unitUsedMove,
  };
  return [
    updatedUserCurrentCharacter,
    updatedBattle,
    userInfo,
    monsterInfo,
  ];
};
