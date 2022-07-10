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

  let monsterInfoArray = [];
  let battleInfoArray = [];
  const selectedMonster = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);

  if (
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

  await userCurrentCharacter.condition.update({
    life: userCurrentCharacter.condition.life - totalDamageByMonsters,
    mana: userCurrentCharacter.condition.mana - useAttack.cost,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  // Count down Debuffs
  const findAllMonsterToCountDownDebuff = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
    },
    include: [
      {
        model: db.debuff,
        as: 'debuffs',
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  for (const monsterToCountDownDebuff of findAllMonsterToCountDownDebuff) {
    if (monsterToCountDownDebuff.debuffs.length > 0) {
      for (const debuffToCountDown of monsterToCountDownDebuff.debuffs) {
        if (
          debuffToCountDown.rounds >= 1
          && !debuffToCountDown.new
        ) {
          await debuffToCountDown.decrement('rounds', {
            by: 1,
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (debuffToCountDown.rounds < 1) {
          await debuffToCountDown.destroy({
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
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
            model: db.debuff,
            as: 'debuffs',
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

  return [
    userCurrentCharacter,
    updatedBattle,
    battleInfoArray,
    monsterInfoArray,
    sumExp,
  ];
};
