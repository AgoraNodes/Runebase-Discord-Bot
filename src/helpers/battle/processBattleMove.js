/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  Op,
} from 'sequelize';
import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
// import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
// import { calculateSkillDamage } from "../stats/calculateSkills";
import { randomIntFromInterval } from "../utils";
import userApplyDebuffAoE from './user/userApplyDebuffAoE';
import userApplyDebuffSingle from './user/userApplyDebuffSingle';
import userApplyAttackSingle from './user/userApplyAttackSingle';
import userApplyAttackAoE from './user/userApplyAttackAoE';
import monstersApplyAttack from './monster/monstersApplyAttack';
import userApplyRetliation from './user/userApplyRetaliation';
import userApplyDebuffDamage from './user/userApplyDebuffDamage';
import countDownBuffsAndDebuffs from './utils/countDownBuffsAndDebuffs';
import userApplyBuffSingle from './user/userApplyBuffSingle';
import selectAttack from './utils/selectAttack';

// TODO: Make code more readable by moving monster/user updates in their own designated function
// TODO: APPLY BUFFS TO USER CHARACTER
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
  const {
    lvl,
    attackOne,
    attackTwo,
    regularAttack,
    block,
    defense,
    kick,
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );
  const useAttack = selectAttack(
    userCurrentCharacter,
    attackUsed,
    attackOne,
    attackTwo,
    regularAttack,
  );

  // Remove new tag from existing debuffs
  for (const monsterToRemoveNewDebuffTag of battle.BattleMonsters) {
    if (monsterToRemoveNewDebuffTag.debuffs.length > 0) {
      for (const debuffToCountDown of monsterToRemoveNewDebuffTag.debuffs) {
        if (debuffToCountDown.new) {
          await debuffToCountDown.update({
            new: false,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }

  let retaliationArray = [];
  let retaliationInfoArray = [];
  let monsterInfoArray = [];
  let battleInfoArray = [];
  let debuffDamageInfoArray = [];

  const selectedMonster = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);

  if (
    useAttack.buff
    && !useAttack.aoe
  ) {
    [
      monsterInfoArray,
    ] = await userApplyBuffSingle(
      userCurrentCharacter,
      monsterInfoArray,
      battle,
      useAttack,
      selectedMonster,
      t,
    );
  } else if (
    useAttack.debuff
    && useAttack.aoe
  ) {
    [
      monsterInfoArray,
    ] = await userApplyDebuffAoE(
      userCurrentCharacter,
      monsterInfoArray,
      battle,
      useAttack,
      selectedMonster,
      t,
    );
  } else if (
    useAttack.debuff
    && !useAttack.aoe
  ) {
    [
      monsterInfoArray,
    ] = await userApplyDebuffSingle(
      userCurrentCharacter,
      monsterInfoArray,
      battle,
      useAttack,
      selectedMonster,
      t,
    );
  } else if (
    !useAttack.debuff
    && useAttack.aoe
  ) {
    [
      monsterInfoArray,
    ] = await userApplyAttackAoE(
      userCurrentCharacter, // UserCharacter
      lvl, // Users Level
      monsterInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      selectedMonster, // which Monster do we have selected?
      t, // database transaction
    );
  } else {
    [
      monsterInfoArray,
    ] = await userApplyAttackSingle(
      userCurrentCharacter, // UserCharacter
      lvl, // Users Level
      monsterInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      selectedMonster, // which Monster do we have selected?
      t, // database transaction
    );
  }

  console.log('before processing battle moves');
  // Process Monster Moves/Attacks
  const allRemainingBattleMonster = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
      currentHp: {
        [Op.gt]: 0,
      },
    },
    include: [
      {
        model: db.debuff,
        as: 'debuffs',
      },
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

  console.log('123');
  // If there are no monsters left, tag battle as complete
  if (!allRemainingBattleMonster || allRemainingBattleMonster.length < 1) {
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }
  let totalDamageByMonsters = 0;

  if (allRemainingBattleMonster) {
    [
      totalDamageByMonsters,
      battleInfoArray,
      retaliationArray,
    ] = await monstersApplyAttack(
      userCurrentCharacter, // UserCharacter
      lvl, // Users Level
      block, // users Block
      defense, // Users defense
      regularAttack, // Users Regular Attack
      battleInfoArray, // Array to fill with battle info
      battle, // battle database record
      allRemainingBattleMonster, // Which attack is used by user
      t, // database transaction
    );
  }

  if (retaliationArray.length > 0) {
    [
      retaliationInfoArray,
    ] = await userApplyRetliation(
      userCurrentCharacter,
      battle,
      retaliationArray,
      retaliationInfoArray,
      allRemainingBattleMonster,
      kick,
      lvl,
      t,
    );
  }

  // Find all remaining Debuffs
  const findAllMonsterToCountDownDebuff = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
    },
    include: [
      {
        model: db.monster,
        as: 'monster',
      },
      {
        model: db.debuff,
        as: 'debuffs',
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  // Apply debuff damage
  if (findAllMonsterToCountDownDebuff.length > 0) {
    [
      debuffDamageInfoArray,
    ] = await userApplyDebuffDamage(
      userCurrentCharacter,
      battle,
      debuffDamageInfoArray,
      findAllMonsterToCountDownDebuff,
      t,
    );
  }

  await countDownBuffsAndDebuffs(
    findAllMonsterToCountDownDebuff,
    t,
  );

  await userCurrentCharacter.condition.update({
    life: userCurrentCharacter.condition.life - totalDamageByMonsters,
    mana: userCurrentCharacter.condition.mana - useAttack.cost,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

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
            model: db.debuff,
            as: 'debuffs',
          },
          {
            model: db.buff,
            as: 'buffs',
          },
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

  console.log('done processing moves');
  return [
    userCurrentCharacter,
    updatedBattle,
    battleInfoArray,
    monsterInfoArray,
    retaliationInfoArray,
    debuffDamageInfoArray,
    sumExp,
  ];
};
