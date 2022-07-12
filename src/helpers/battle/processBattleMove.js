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
import removeNewTagFromBuffsAndDebuffs from './utils/removeNewTagFromBuffsAndDebuffs';

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
    hp,
    mp,
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );
  console.log('start processing battle Move after stats calc');
  const useAttack = selectAttack(
    userCurrentCharacter,
    attackUsed,
    attackOne,
    attackTwo,
    regularAttack,
  );
  console.log(2);
  await removeNewTagFromBuffsAndDebuffs(
    userCurrentCharacter,
    battle.BattleMonsters,
    t,
  );
  console.log(3);
  let retaliationArray = [];
  let stageOneInfoArray = [];
  let stageTwoInfoArray = [];
  let stageThreeInfoArray = [];
  let stageFourInfoArray = [];
  let userState = JSON.parse(JSON.stringify(userCurrentCharacter));
  userState.hp = hp;
  userState.mp = mp;
  const initialUserState = JSON.parse(JSON.stringify(userState));
  console.log(initialUserState.hp);
  console.log('initialUserStateStartProcessor');
  const selectedMonster = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);

  console.log('Stage #1 Processing');
  // Stage One
  if (
    useAttack.buff
    && !useAttack.aoe
  ) {
    [
      stageOneInfoArray,
      userState,
    ] = await userApplyBuffSingle(
      userCurrentCharacter,
      userState, // Current User State
      stageOneInfoArray,
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
      stageOneInfoArray,
      userState,
    ] = await userApplyDebuffAoE(
      userState, // Current User State
      stageOneInfoArray,
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
      stageOneInfoArray,
      userState,
    ] = await userApplyDebuffSingle(
      userState, // Current User State
      stageOneInfoArray,
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
      stageOneInfoArray,
      userState,
    ] = await userApplyAttackAoE(
      userState, // Current User State
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      selectedMonster, // which Monster do we have selected?
      t, // database transaction
    );
  } else {
    [
      stageOneInfoArray,
      userState,
    ] = await userApplyAttackSingle(
      userState,
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      selectedMonster, // which Monster do we have selected?
      t, // database transaction
    );
  }

  // Stage Two
  console.log('Stage #2 Processing');
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
            include: [
              {
                model: db.damageType,
                as: 'damageType',
              },
            ],
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
      userState,
      stageTwoInfoArray,
      retaliationArray,
    ] = await monstersApplyAttack(
      userState,
      lvl, // Users Level
      block, // users Block
      defense, // Users defense
      regularAttack, // Users Regular Attack
      stageTwoInfoArray, // Array to fill with battle info
      battle, // battle database record
      allRemainingBattleMonster, // Which attack is used by user
      t, // database transaction
    );
  }

  console.log('Stage #3 Processing');
  // Stage Three
  if (retaliationArray.length > 0) {
    [
      stageThreeInfoArray,
    ] = await userApplyRetliation(
      userCurrentCharacter,
      battle,
      retaliationArray,
      stageThreeInfoArray,
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

  console.log('Stage #4 Processing');
  // Stage Four
  // Apply debuff damage
  if (findAllMonsterToCountDownDebuff.length > 0) {
    [
      stageFourInfoArray,
    ] = await userApplyDebuffDamage(
      userCurrentCharacter,
      battle,
      stageFourInfoArray,
      findAllMonsterToCountDownDebuff,
      t,
    );
  }

  await countDownBuffsAndDebuffs(
    findAllMonsterToCountDownDebuff,
    userCurrentCharacter,
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
  console.log(`parry: ${regularAttack.parry}`);
  console.log(`crit: ${regularAttack.crit}`);
  console.log(`defense: ${defense}`);
  console.log(`attack rating: ${regularAttack.ar}`);
  console.log(`initialUserState.hp`);
  console.log(initialUserState.hp);
  return [
    userCurrentCharacter,
    initialUserState,
    updatedBattle,
    stageOneInfoArray,
    stageTwoInfoArray,
    stageThreeInfoArray,
    stageFourInfoArray,
    sumExp,
  ];
};
