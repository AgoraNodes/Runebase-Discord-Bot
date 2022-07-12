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
  const useAttack = selectAttack(
    userCurrentCharacter,
    attackUsed,
    attackOne,
    attackTwo,
    regularAttack,
  );
  await removeNewTagFromBuffsAndDebuffs(
    userCurrentCharacter,
    battle.BattleMonsters,
    t,
  );
  let retaliationArray = [];
  let stageZeroInfoArray = []; // Start of Round effects (ex: stun from debuff)
  let stageOneInfoArray = []; // User Attacking Monsters
  let stageTwoInfoArray = []; // Monsters attack the user
  let stageThreeInfoArray = []; // Retaliation effects
  let stageFourInfoArray = []; // Apply Debuff damage
  let stageFiveInfoArray = []; // Count Down Debuffs
  let stageSixInfoArray = []; // Stage 6 is a placeholder for after round effects
  let stageSevenInfoArray = []; // when battle is complete effects
  let userState = JSON.parse(JSON.stringify(userCurrentCharacter));

  const allBattleMonsters = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
      // currentHp: {
      //   [Op.gt]: 0,
      // },
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

  // let battleMonsterState = JSON.parse(JSON.stringify(battle.BattleMonsters));
  let battleMonsterState = JSON.parse(JSON.stringify(allBattleMonsters));
  userState.hp = hp;
  userState.mp = mp;
  const initialUserState = JSON.parse(JSON.stringify(userState));
  const selectedMonster = battleMonsterState.find((element) => element.id === currentSelectedMonster.id);

  // TODO: APPLY ALL ENEMY DEBUFFS / ALSO DETERMINE IF UNIT IS STUNNED FROM DEBUFFS
  console.log('Stage #0 Processing');
  stageZeroInfoArray = [];

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
      battleMonsterState,
    ] = await userApplyDebuffAoE(
      userState, // Current User State
      battleMonsterState,
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
      battleMonsterState,
    ] = await userApplyDebuffSingle(
      userState, // Current User State
      battleMonsterState,
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
      battleMonsterState,
    ] = await userApplyAttackAoE(
      userState, // Current User State
      battleMonsterState,
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
      battleMonsterState,
    ] = await userApplyAttackSingle(
      userState,
      battleMonsterState,
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
  // battleMonsterState = battleMonsterState.filter((obj) => obj.currentHp > 0);
  const isBattleMonsterAlive = battleMonsterState.filter((obj) => obj.currentHp > 0);
  // If there are no monsters left, tag battle as complete
  if (!isBattleMonsterAlive || isBattleMonsterAlive.length < 1) {
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }
  let totalDamageByMonsters = 0;

  if (battleMonsterState) {
    [
      totalDamageByMonsters,
      userState,
      battleMonsterState,
      stageTwoInfoArray,
      retaliationArray,
    ] = await monstersApplyAttack(
      userState,
      battleMonsterState,
      lvl, // Users Level
      block, // users Block
      defense, // Users defense
      regularAttack, // Users Regular Attack
      stageTwoInfoArray, // Array to fill with battle info
      battle, // battle database record
      // allRemainingBattleMonster, // All the remaining Monsters
      t, // database transaction
    );
  }

  console.log('Stage #3 Processing');
  // Stage Three
  if (retaliationArray.length > 0) {
    [
      stageThreeInfoArray,
      userState,
      battleMonsterState,
    ] = await userApplyRetliation(
      userState,
      battleMonsterState,
      battle,
      retaliationArray,
      stageThreeInfoArray,
      kick,
      lvl,
      t,
    );
  }

  console.log('Stage #4 Processing');
  // Stage Four
  // Apply debuff damage
  [
    stageFourInfoArray,
    battleMonsterState,
    userState,
  ] = await userApplyDebuffDamage(
    userState,
    battleMonsterState,
    battle,
    stageFourInfoArray,
    t,
  );

  // Stage 5
  // Count Down buffs, debuffs / after round effects (heal?)
  [
    stageFiveInfoArray,
    userState,
    battleMonsterState,
  ] = await countDownBuffsAndDebuffs(
    stageFiveInfoArray,
    userState,
    battleMonsterState,
    t,
  );

  // Stage 6 After Round User Effects (example: userHeal each Round)
  console.log('Stage 6 is a placeholder');
  stageSixInfoArray = [];

  // Stage 7 (Battle Complete effects) (Mana/Health REGEN)
  stageSevenInfoArray = [];
  const isBattleMonsterAliveFinal = battleMonsterState.filter((obj) => obj.currentHp > 0);
  if (!isBattleMonsterAliveFinal || isBattleMonsterAliveFinal.length < 1) {
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }
  // STAGE 8 (Unrecorded for rendering)
  // TODO: TEST IF NEW VALUE SURPASSES MAX HEALTH / MANA
  await userCurrentCharacter.condition.update({
    life: userCurrentCharacter.condition.life - (totalDamageByMonsters - Math.round((totalDamageByMonsters * (userState.hp.totalLifeBonus / 100)))),
    mana: userCurrentCharacter.condition.mana - useAttack.cost,
  }, {
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  for (const updateThisMonster of battleMonsterState) {
    await db.BattleMonster.update({
      currentHp: updateThisMonster.currentHp,
    }, {
      where: {
        id: updateThisMonster.id,
      },
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
    stageZeroInfoArray,
    stageOneInfoArray,
    stageTwoInfoArray,
    stageThreeInfoArray,
    stageFourInfoArray,
    stageFiveInfoArray,
    stageSixInfoArray,
    stageSevenInfoArray,
    sumExp,
  ];
};
