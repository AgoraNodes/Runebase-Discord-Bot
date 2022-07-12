/* eslint-disable no-restricted-syntax */
import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
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
import userApplyPreBuffBattleChance from './user/userApplyPreBuffBattleChance';
import applyEnemyDebuffEffects from './utils/applyEnemyDebuffEffects';

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
  let stageZeroInfoArray = []; // Start of Round effects (ex: stun from debuff)
  let stageOneInfoArray = []; // User Attacking Monsters
  let stageTwoInfoArray = []; // Monsters attack the user
  let retaliationArray = []; // Test for Retaliation in stageTwo to apply in stageThree
  let stageThreeInfoArray = []; // Retaliation effects
  let stageFourInfoArray = []; // Apply Debuff damage
  let stageFiveInfoArray = []; // Count Down Debuffs
  let stageSixInfoArray = []; // Stage 6 is a placeholder for after round effects
  let stageSevenInfoArray = []; // when battle is complete effects
  let isBattleComplete = false; // Test for battle completion
  let totalDamageByMonsters = 0;
  // let battleLogDatabasePromises = [];
  let saveToDatabasePromises = [];

  // TODO: Only Gather Exp if Units are not lower then 5 levels of user level
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

  const allBattleMonsters = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
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

  let userState = JSON.parse(JSON.stringify(userCurrentCharacter));
  userState.hp = hp;
  userState.mp = mp;
  const initialUserState = JSON.parse(JSON.stringify(userState));
  let battleMonsterState = JSON.parse(JSON.stringify(allBattleMonsters));

  console.log('Processing Debuff Effects');
  // APPLY ALL ENEMY DEBUFFS

  [
    battleMonsterState,
  ] = await applyEnemyDebuffEffects(
    battleMonsterState,
  );

  // DETERMINE IF UNIT IS STUNNED FROM DEBUFFS AND OTHER PREBATTLE DEBUFF EFFECTS
  console.log('Stage #0 Processing');
  [
    stageZeroInfoArray,
    userState,
    battleMonsterState,
    saveToDatabasePromises,
  ] = await userApplyPreBuffBattleChance(
    userState, // Current User State
    battleMonsterState,
    stageZeroInfoArray, // Array to fill with battle info
    battle, // battle database record
    useAttack, // Which attack is used by user
    currentSelectedMonster.id, // which Monster do we have selected?
    saveToDatabasePromises, // Database Promises to execute and wait for
    t, // database transaction
  );

  console.log('Stage #1 Processing');
  // Stage One
  if (
    useAttack.buff
    && !useAttack.aoe
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new User State
      saveToDatabasePromises, // Return battle promises
    ] = await userApplyBuffSingle(
      userState, // Current User State
      stageOneInfoArray, // Stage One Info Array
      battle, // passing battle object? (maybe we can reduce to just battle.id)?
      useAttack, // What attack are we using?
      currentSelectedMonster.id, // Which Monster is selected?
      saveToDatabasePromises, // Saving to Database promises
      t, // Transaction object sequelize
    );
  } else if (
    useAttack.debuff
    && useAttack.aoe
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState,
      battleMonsterState,
      saveToDatabasePromises,
    ] = await userApplyDebuffAoE(
      userState, // Current User State
      battleMonsterState,
      stageOneInfoArray,
      battle,
      useAttack,
      currentSelectedMonster.id,
      saveToDatabasePromises,
      t,
    );
  } else if (
    useAttack.debuff
    && !useAttack.aoe
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState,
      battleMonsterState,
      saveToDatabasePromises,
    ] = await userApplyDebuffSingle(
      userState, // Current User State
      battleMonsterState,
      stageOneInfoArray,
      battle,
      useAttack,
      currentSelectedMonster.id,
      saveToDatabasePromises,
      t,
    );
  } else if (
    !useAttack.debuff
    && useAttack.aoe
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState,
      battleMonsterState,
      saveToDatabasePromises,
    ] = await userApplyAttackAoE(
      userState, // Current User State
      battleMonsterState,
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      currentSelectedMonster.id, // which Monster do we have selected?
      saveToDatabasePromises,
      t, // database transaction
    );
  } else {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState,
      battleMonsterState,
      saveToDatabasePromises,
    ] = await userApplyAttackSingle(
      userState,
      battleMonsterState,
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      currentSelectedMonster.id, // which Monster do we have selected?
      saveToDatabasePromises,
      t, // database transaction
    );
  }

  // Stage Two
  console.log('Stage #2 Processing');
  // Process Monster Moves/Attacks
  const isBattleMonsterAlive = battleMonsterState.filter((obj) => obj.currentHp > 0);

  // If there are no monsters left, tag battle as complete
  if (!isBattleMonsterAlive || isBattleMonsterAlive.length < 1) {
    isBattleComplete = true;
  }
  if (!isBattleComplete) {
    // if (battleMonsterState) {
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
      t, // database transaction
    );
    // }

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
      isBattleComplete = true;
    }
  }

  if (isBattleComplete) {
    saveToDatabasePromises.push(
      new Promise((resolve, reject) => {
        battle.update({
          complete: true,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        }).then(resolve());
      }),
    );
  }
  // STAGE 8 (Unrecorded for rendering)
  // TODO: TEST IF NEW VALUE SURPASSES MAX HEALTH / MANA (Life Steal & after battle heal effects)

  saveToDatabasePromises.push(
    new Promise((resolve, reject) => {
      userCurrentCharacter.condition.update({
        life: userCurrentCharacter.condition.life - (totalDamageByMonsters - Math.round((totalDamageByMonsters * (userState.hp.totalLifeBonus / 100)))),
        mana: userCurrentCharacter.condition.mana - useAttack.cost,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }).then(resolve());
    }),
  );

  for (const [i, battleMonsterStateToSave] of battleMonsterState.entries()) {
    saveToDatabasePromises.push(
      new Promise((resolve, reject) => {
        db.BattleMonster.update({
          currentHp: battleMonsterStateToSave.currentHp,
        }, {
          where: {
            id: battleMonsterStateToSave.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        }).then(resolve());
      }),
    );
  }

  await Promise.all(saveToDatabasePromises);

  // Fetch Updated Battle for next round -> See battle controller for handling
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
  console.log(`lifesteal: ${regularAttack.lifesteal}`);
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
