/* eslint-disable no-restricted-syntax */
import db from '../../models';

import userApplyDebuffAoE from './user/userApplyDebuffAoE';
import userApplyDebuffSingle from './user/userApplyDebuffSingle';
import userApplyAttackSingle from './user/userApplyAttackSingle';
import userApplyAttackAoE from './user/userApplyAttackAoE';
import userApplyRetliation from './user/userApplyRetaliation';
import userApplyDebuffDamage from './user/userApplyDebuffDamage';
import userApplyBuffSingle from './user/userApplyBuffSingle';
import userApplyPreBuffBattleChance from './user/userApplyPreBuffBattleChance';
import userApplyBattleCompleteEffects from './user/userApplyBattleCompleteEffects';

import countDownBuffsAndDebuffs from './utils/countDownBuffsAndDebuffs';
import applyEnemyDebuffEffects from './utils/applyEnemyDebuffEffects';
import removeNewTagFromBuffsAndDebuffs from './utils/removeNewTagFromBuffsAndDebuffs';
import selectAttack from './utils/selectAttack';

import monstersApplyAttack from './monster/monstersApplyAttack';

import { calculateCharacterStats } from '../../helpers/stats/calculateCharacterStats';
// import reFetchBattle from '../../helpers/fetchBattle';

export const processBattleMove = async (
  userCurrentCharacter, // Our current character
  battle, // The battle object
  currentSelectedMonster, // The Monster we got selected
  attackUsed, // The attack we used
  t, // Sequelize Transaction object
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
  let totalDamageByMonsters = 0; // Total accumilated damage by monsters
  let totalHealedByLifeSteal = 0; // total heal accumilated by healing effects
  let saveToDatabasePromisesOne = []; // First database promises
  let saveToDatabasePromisesTwo = []; // Second database promises (should not start to run before saveToDatabasePromisesOne has finished)

  // TODO: Only Gather Exp if Units are not lower then 5 levels of user level
  const sumExp = battle.BattleMonsters.reduce((accumulator, object) => accumulator + object.monster.exp, 0);

  const {
    lvl, // The Users Current level
    attackOne, // The user current Main Selected Attack
    attackTwo, // The user current secondary selected Attack
    regularAttack, // The user Regular attack
    block, // The user Block
    defense, // The user defense
    kick, // the user kick attack
    hp, // the user hp object
    mp, // the user mp object
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );

  // Create the current userState for processing
  let userState = JSON.parse(JSON.stringify(userCurrentCharacter));
  userState.hp = hp;
  userState.mp = mp;
  const initialUserState = JSON.parse(JSON.stringify(userState));

  // Parse all the battlemonsters into state array
  let battleMonsterState = JSON.parse(JSON.stringify(battle.BattleMonsters));

  // Test Which user attack to execute.. (pick regular attack if not enough mana)
  // TODO: Throwing weapons?
  const useAttack = selectAttack(
    userState, // Pass Current user state
    attackUsed, // Pass attack picked by user
    attackOne, // The user current Main Selected Attack
    attackTwo, // The user current secondary selected Attack
    regularAttack, // The user Regular attack
  );

  console.log('Stage PreProcessing');
  // Removing New Tag From Buffs/Debuffs
  [
    userState, // Return new user state
    battleMonsterState, // Return new battlemonster state
    saveToDatabasePromisesOne, // return database promises
  ] = await removeNewTagFromBuffsAndDebuffs(
    userState, // Pass userstate
    battleMonsterState, // pass battlemonster state
    saveToDatabasePromisesOne, // pass saveToDatabasePromisesOne array
    t, // Sequelize Transaction object
  );

  /// APPLY ALL ENEMY DEBUFFS
  [
    battleMonsterState, // Return new battleMonsterState
  ] = await applyEnemyDebuffEffects(
    battleMonsterState, // Pass battleMonsterState
  );

  // DETERMINE IF UNIT IS STUNNED FROM DEBUFFS AND OTHER PREBATTLE DEBUFF EFFECTS
  console.log('Stage #0 Processing');
  [
    stageZeroInfoArray, // Return stageZeroInfoArray
    userState, // Return new userstate
    battleMonsterState, // Return new battlemonster state
    saveToDatabasePromisesTwo, // Return database promises
  ] = await userApplyPreBuffBattleChance(
    userState, // Current User State
    battleMonsterState, // Pass battlemonster state
    stageZeroInfoArray, // Array to fill with battle info
    battle, // battle database record
    useAttack, // Which attack is used by user
    currentSelectedMonster.id, // which Monster do we have selected?
    saveToDatabasePromisesTwo, // Database Promises to execute and wait for
    t, // database transaction
  );

  console.log('Stage #1 Processing');
  // Stage One
  if (
    useAttack.buff // If attack is a buff
    && !useAttack.aoe // and the attack is NOT an AOE attack
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new User State
      saveToDatabasePromisesTwo, // Return database promises
    ] = await userApplyBuffSingle(
      userState, // Current User State
      stageOneInfoArray, // Stage One Info Array
      battle, // passing battle object? (maybe we can reduce to just battle.id)?
      useAttack, // What attack are we using?
      currentSelectedMonster.id, // Which Monster is selected?
      saveToDatabasePromisesTwo, // pass the Database promises array
      t, // Transaction object sequelize
    );
  } else if (
    useAttack.debuff // if Attack is a debuff
    && useAttack.aoe // and the attack is an AOE attack
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new userState
      battleMonsterState, // Return new Battlemonster state
      saveToDatabasePromisesTwo,
    ] = await userApplyDebuffAoE(
      userState, // Current User State
      battleMonsterState, // Battlemonster state
      stageOneInfoArray, // Pass stageOneInfoArray
      battle,
      useAttack, // pass the user used attack
      currentSelectedMonster.id,
      saveToDatabasePromisesTwo, // pass the Database promises array
      t,
    );
  } else if (
    useAttack.debuff // If the attack is a debuff
    && !useAttack.aoe // and not an AOE attack
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new userState
      battleMonsterState, // Return new Battlemonster state
      saveToDatabasePromisesTwo,
    ] = await userApplyDebuffSingle(
      userState, // Current User State
      battleMonsterState, // pass the Battlemonster state
      stageOneInfoArray, // pass StageOneInfo Array
      battle,
      useAttack, // pass the user used attack
      currentSelectedMonster.id,
      saveToDatabasePromisesTwo, // pass the Database promises array
      t,
    );
  } else if (
    !useAttack.debuff // if the attack is NOT a debuff
    && useAttack.aoe // and the attack is an AOE attack
  ) {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new userState
      battleMonsterState, // Return new Battlemonster state
      totalHealedByLifeSteal,
      saveToDatabasePromisesTwo,
    ] = await userApplyAttackAoE(
      userState, // Current User State
      battleMonsterState, // pass the Battlemonster state
      totalHealedByLifeSteal,
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      currentSelectedMonster.id, // which Monster do we have selected?
      saveToDatabasePromisesTwo, // pass the Database promises array
      t, // database transaction
    );
  } else {
    [
      stageOneInfoArray, // Return completed StageOneInfo Array
      userState, // Return new userState
      battleMonsterState, // Return new Battlemonster state
      totalHealedByLifeSteal,
      saveToDatabasePromisesTwo,
    ] = await userApplyAttackSingle(
      userState, // pass the userState
      battleMonsterState, // pass the battlemonster state
      totalHealedByLifeSteal, // pass the totalHealedByLifeSteal variable
      lvl, // Users Level
      stageOneInfoArray, // Array to fill with battle info
      battle, // battle database record
      useAttack, // Which attack is used by user
      currentSelectedMonster.id, // which Monster do we have selected?
      saveToDatabasePromisesTwo, // pass the Database promises array
      t, // database transaction
    );
  }

  // If there are no monsters left, tag battle as complete
  const isBattleMonsterAlive = battleMonsterState.filter((obj) => obj.currentHp > 0);
  if (!isBattleMonsterAlive || isBattleMonsterAlive.length < 1) {
    isBattleComplete = true;
  }

  // Stage Two
  console.log('Stage #2 Processing');
  // Process Monster Moves/Attacks
  if (!isBattleComplete) {
    // TODO: ADD ABILITY FOR ENEMY TO APPLY BUFFS TO SELF OR GROUP
    // TODO: ADD ABILITY FOR ENEMY TO APPLY DEBUFFS TO USER
    [
      totalDamageByMonsters, // Return total damage done by monsters
      userState, // Return the new userState
      battleMonsterState, // Return new Battlemonster state
      stageTwoInfoArray, // Return the stageTwoInfoArray to pass to render
      retaliationArray, // Return array with retaliation info
      saveToDatabasePromisesTwo, // DataPromises to execute
    ] = await monstersApplyAttack(
      userState, // Pass the userState
      saveToDatabasePromisesTwo, // pass database promises array
      battleMonsterState, // pass battlemonster state
      lvl, // Users Level
      block, // users Block
      defense, // Users defense
      regularAttack, // Users Regular Attack
      stageTwoInfoArray, // Array to fill with battle info
      battle, // battle database record
      t, // database transaction
    );

    console.log('Stage #3 Processing');
    // Stage Three
    if (retaliationArray.length > 0) {
      [
        stageThreeInfoArray, // Return completed stageThreeInfoArray Array
        userState, // Return the new userState
        battleMonsterState, // Return new Battlemonster state
        totalHealedByLifeSteal,
        saveToDatabasePromisesTwo,
      ] = await userApplyRetliation(
        userState,
        totalHealedByLifeSteal,
        saveToDatabasePromisesTwo, // pass the Database promises array
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
      stageFourInfoArray, // Return completed stageFourInfoArray Array
      battleMonsterState, // Return new Battlemonster state
      userState, // Return the new userState
    ] = await userApplyDebuffDamage(
      userState,
      battleMonsterState,
      battle,
      stageFourInfoArray,
      t,
    );
  }

  await Promise.all(saveToDatabasePromisesOne);

  if (!isBattleComplete) {
    // Stage 5
    // Count Down buffs, debuffs / after round effects (heal?)
    [
      stageFiveInfoArray, // Return completed stageFiveInfoArray Array
      userState, // Return the new userState
      battleMonsterState, // Return new Battlemonster state
    ] = await countDownBuffsAndDebuffs(
      stageFiveInfoArray,
      userState,
      battleMonsterState,
      t,
    );

    // Stage 6 After Round User Effects (example: manaRegen each Round)
    console.log('Stage 6 is a placeholder');
    stageSixInfoArray = [];

    // Test if Battle is complete
    const isBattleMonsterAliveFinal = battleMonsterState.filter((obj) => obj.currentHp > 0);
    if (!isBattleMonsterAliveFinal || isBattleMonsterAliveFinal.length < 1) {
      isBattleComplete = true;
    }
  }

  // Stage 7 (Battle Complete effects) (Mana/Health REGEN)
  if (isBattleComplete) {
    [
      stageSevenInfoArray, // Return completed stageSevenInfoArray Array
      userState, // Return the new userState
      totalHealedByLifeSteal,
      saveToDatabasePromisesTwo,
    ] = await userApplyBattleCompleteEffects(
      stageSevenInfoArray,
      userState,
      battle,
      totalHealedByLifeSteal,
      saveToDatabasePromisesTwo, // pass the Database promises array
      t,
    );

    // Tag the battle as complete
    saveToDatabasePromisesTwo.push(
      new Promise((resolve, reject) => {
        db.battle.update({
          complete: true,
        }, {
          where: {
            id: battle.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        }).then(() => resolve());
      }),
    );
  }
  // STAGE 8 (Unrecorded for rendering)
  // TODO: TEST IF NEW VALUE SURPASSES MAX HEALTH / MANA (Life Steal & after battle heal effects)

  const newLifeValue = userCurrentCharacter.condition.life
    - (totalDamageByMonsters - Math.round((totalDamageByMonsters * (userState.hp.totalLifeBonus / 100))))
    + (totalHealedByLifeSteal - Math.round((totalHealedByLifeSteal * (userState.hp.totalLifeBonus / 100))));

  saveToDatabasePromisesTwo.push(
    new Promise((resolve, reject) => {
      userCurrentCharacter.condition.update({
        life: newLifeValue
          > (userState.hp.max - Math.round((userState.hp.max * (userState.hp.totalLifeBonus / 100))))
          ? (userState.hp.max - Math.round((userState.hp.max * (userState.hp.totalLifeBonus / 100))))
          : newLifeValue,
        mana: userCurrentCharacter.condition.mana - useAttack.cost,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }).then(() => resolve());
    }),
  );

  for (const [i, battleMonsterStateToSave] of battleMonsterState.entries()) {
    saveToDatabasePromisesTwo.push(
      new Promise((resolve, reject) => {
        db.BattleMonster.update({
          currentHp: battleMonsterStateToSave.currentHp,
        }, {
          where: {
            id: battleMonsterStateToSave.id,
          },
          lock: t.LOCK.UPDATE,
          transaction: t,
        }).then(() => resolve());
      }),
    );
  }

  await Promise.all(saveToDatabasePromisesTwo);

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
  console.log(updatedBattle.BattleMonsters);
  console.log('updatedBattle.complete');
  console.log(updatedBattle.complete);
  console.log('done processing moves');
  console.log(`parry: ${regularAttack.parry}`);
  console.log(`crit: ${regularAttack.crit}`);
  console.log(`defense: ${defense}`);
  console.log(`attack rating: ${regularAttack.ar}`);
  console.log(`lifesteal: ${regularAttack.lifeSteal}`);
  console.log(`initialUserState.hp`);
  console.log(initialUserState.hp);
  console.log('\nkick:');
  console.log(JSON.stringify(kick));
  const newBattleState = JSON.parse(JSON.stringify(updatedBattle));

  return [
    userCurrentCharacter,
    initialUserState,
    newBattleState,
    stageZeroInfoArray,
    stageOneInfoArray,
    stageTwoInfoArray,
    stageThreeInfoArray,
    stageFourInfoArray,
    stageFiveInfoArray,
    stageSixInfoArray,
    stageSevenInfoArray,
    sumExp,
    // newBattleState,
  ];
};
