"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processBattleMove = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _userApplyDebuffAoE = _interopRequireDefault(require("./user/userApplyDebuffAoE"));

var _userApplyDebuffSingle = _interopRequireDefault(require("./user/userApplyDebuffSingle"));

var _userApplyAttackSingle = _interopRequireDefault(require("./user/userApplyAttackSingle"));

var _userApplyAttackAoE = _interopRequireDefault(require("./user/userApplyAttackAoE"));

var _userApplyRetaliation = _interopRequireDefault(require("./user/userApplyRetaliation"));

var _userApplyDebuffDamage = _interopRequireDefault(require("./user/userApplyDebuffDamage"));

var _userApplyBuffSingle = _interopRequireDefault(require("./user/userApplyBuffSingle"));

var _userApplyPreBuffBattleChance = _interopRequireDefault(require("./user/userApplyPreBuffBattleChance"));

var _userApplyBattleCompleteEffects = _interopRequireDefault(require("./user/userApplyBattleCompleteEffects"));

var _countDownBuffsAndDebuffs = _interopRequireDefault(require("./utils/countDownBuffsAndDebuffs"));

var _applyEnemyDebuffEffects = _interopRequireDefault(require("./utils/applyEnemyDebuffEffects"));

var _removeNewTagFromBuffsAndDebuffs = _interopRequireDefault(require("./utils/removeNewTagFromBuffsAndDebuffs"));

var _selectAttack = _interopRequireDefault(require("./utils/selectAttack"));

var _monstersApplyAttack = _interopRequireDefault(require("./monster/monstersApplyAttack"));

var _calculateCharacterStats = require("../../helpers/stats/calculateCharacterStats");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import reFetchBattle from '../../helpers/fetchBattle';
var processBattleMove = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, // Our current character
  battle, // The battle object
  currentSelectedMonster, // The Monster we got selected
  attackUsed, // The attack we used
  t // Sequelize Transaction object
  ) {
    var allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, retaliationArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, isBattleComplete, totalDamageByMonsters, totalHealedByLifeSteal, saveToDatabasePromisesOne, saveToDatabasePromisesTwo, sumExp, _yield$calculateChara, lvl, attackOne, attackTwo, regularAttack, block, defense, kick, hp, mp, userState, initialUserState, battleMonsterState, useAttack, _yield$removeNewTagFr, _yield$removeNewTagFr2, _yield$applyEnemyDebu, _yield$applyEnemyDebu2, _yield$userApplyPreBu, _yield$userApplyPreBu2, _yield$userApplyBuffS, _yield$userApplyBuffS2, _yield$userApplyDebuf, _yield$userApplyDebuf2, _yield$userApplyDebuf3, _yield$userApplyDebuf4, _yield$userApplyAttac, _yield$userApplyAttac2, _yield$userApplyAttac3, _yield$userApplyAttac4, isBattleMonsterAlive, _yield$monstersApplyA, _yield$monstersApplyA2, _yield$userApplyRetli, _yield$userApplyRetli2, _yield$userApplyDebuf5, _yield$userApplyDebuf6, _yield$countDownBuffs, _yield$countDownBuffs2, isBattleMonsterAliveFinal, _yield$userApplyBattl, _yield$userApplyBattl2, newLifeValue, _iterator, _step, _loop, updatedBattle, newBattleState;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allRoundBuffsInfoArray = []; // an array with all the buffs used this round to load the images in renderer

            allRoundDebuffsInfoArray = []; // an array with the debuffs used this round to load the images in renderer

            allRoundEffectsInfoArray = []; // an array with the debuffs used this round to load the images in renderer

            stageZeroInfoArray = []; // Start of Round effects (ex: stun from debuff)

            stageOneInfoArray = []; // User Attacking Monsters

            stageTwoInfoArray = []; // Monsters attack the user

            retaliationArray = []; // Test for Retaliation in stageTwo to apply in stageThree

            stageThreeInfoArray = []; // Retaliation effects

            stageFourInfoArray = []; // Apply Debuff damage

            stageFiveInfoArray = []; // Count Down Debuffs

            stageSixInfoArray = []; // Stage 6 is a placeholder for after round effects

            stageSevenInfoArray = []; // when battle is complete effects

            isBattleComplete = false; // Test for battle completion

            totalDamageByMonsters = 0; // Total accumilated damage by monsters

            totalHealedByLifeSteal = 0; // total heal accumilated by healing effects

            saveToDatabasePromisesOne = []; // First database promises

            saveToDatabasePromisesTwo = []; // Second database promises (should not start to run before saveToDatabasePromisesOne has finished)
            // TODO: Only Gather Exp if Units are not lower then 5 levels of user level

            sumExp = battle.BattleMonsters.reduce(function (accumulator, object) {
              return accumulator + object.monster.exp;
            }, 0);
            _context.next = 20;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 20:
            _yield$calculateChara = _context.sent;
            lvl = _yield$calculateChara.lvl;
            attackOne = _yield$calculateChara.attackOne;
            attackTwo = _yield$calculateChara.attackTwo;
            regularAttack = _yield$calculateChara.regularAttack;
            block = _yield$calculateChara.block;
            defense = _yield$calculateChara.defense;
            kick = _yield$calculateChara.kick;
            hp = _yield$calculateChara.hp;
            mp = _yield$calculateChara.mp;
            // Create the current userState for processing
            userState = JSON.parse(JSON.stringify(userCurrentCharacter));
            userState.hp = hp;
            userState.mp = mp;
            initialUserState = JSON.parse(JSON.stringify(userState)); // Parse all the battlemonsters into state array

            battleMonsterState = JSON.parse(JSON.stringify(battle.BattleMonsters)); // Test Which user attack to execute.. (pick regular attack if not enough mana)
            // TODO: Throwing weapons?

            useAttack = (0, _selectAttack["default"])(userState, // Pass Current user state
            attackUsed, // Pass attack picked by user
            attackOne, // The user current Main Selected Attack
            attackTwo, // The user current secondary selected Attack
            regularAttack // The user Regular attack
            );
            console.log('Stage PreProcessing'); // Removing New Tag From Buffs/Debuffs

            _context.next = 39;
            return (0, _removeNewTagFromBuffsAndDebuffs["default"])(userState, // Pass userstate
            battleMonsterState, // pass battlemonster state
            allRoundBuffsInfoArray, allRoundDebuffsInfoArray, saveToDatabasePromisesOne, // pass saveToDatabasePromisesOne array
            t // Sequelize Transaction object
            );

          case 39:
            _yield$removeNewTagFr = _context.sent;
            _yield$removeNewTagFr2 = (0, _slicedToArray2["default"])(_yield$removeNewTagFr, 5);
            userState = _yield$removeNewTagFr2[0];
            // Return new user state
            battleMonsterState = _yield$removeNewTagFr2[1];
            // Return new battlemonster state
            allRoundBuffsInfoArray = _yield$removeNewTagFr2[2];
            allRoundDebuffsInfoArray = _yield$removeNewTagFr2[3];
            saveToDatabasePromisesOne // return database promises
            = _yield$removeNewTagFr2[4];
            _context.next = 48;
            return (0, _applyEnemyDebuffEffects["default"])(battleMonsterState // Pass battleMonsterState
            );

          case 48:
            _yield$applyEnemyDebu = _context.sent;
            _yield$applyEnemyDebu2 = (0, _slicedToArray2["default"])(_yield$applyEnemyDebu, 1);
            battleMonsterState // Return new battleMonsterState
            = _yield$applyEnemyDebu2[0];
            // DETERMINE IF UNIT IS STUNNED FROM DEBUFFS AND OTHER PREBATTLE DEBUFF EFFECTS
            console.log('Stage #0 Processing');
            _context.next = 54;
            return (0, _userApplyPreBuffBattleChance["default"])(userState, // Current User State
            allRoundEffectsInfoArray, battleMonsterState, // Pass battlemonster state
            stageZeroInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromisesTwo, // Database Promises to execute and wait for
            t // database transaction
            );

          case 54:
            _yield$userApplyPreBu = _context.sent;
            _yield$userApplyPreBu2 = (0, _slicedToArray2["default"])(_yield$userApplyPreBu, 5);
            stageZeroInfoArray = _yield$userApplyPreBu2[0];
            // Return stageZeroInfoArray
            userState = _yield$userApplyPreBu2[1];
            // Return new userstate
            allRoundEffectsInfoArray = _yield$userApplyPreBu2[2];
            battleMonsterState = _yield$userApplyPreBu2[3];
            // Return new battlemonster state
            saveToDatabasePromisesTwo // Return database promises
            = _yield$userApplyPreBu2[4];
            console.log('Stage #1 Processing'); // Stage One

            if (!(useAttack.buff // If attack is a buff
            && !useAttack.aoe // and the attack is NOT an AOE attack
            )) {
              _context.next = 73;
              break;
            }

            _context.next = 65;
            return (0, _userApplyBuffSingle["default"])(userState, // Current User State
            allRoundBuffsInfoArray, stageOneInfoArray, // Stage One Info Array
            battle, // passing battle object? (maybe we can reduce to just battle.id)?
            useAttack, // What attack are we using?
            currentSelectedMonster.id, // Which Monster is selected?
            saveToDatabasePromisesTwo, // pass the Database promises array
            t // Transaction object sequelize
            );

          case 65:
            _yield$userApplyBuffS = _context.sent;
            _yield$userApplyBuffS2 = (0, _slicedToArray2["default"])(_yield$userApplyBuffS, 4);
            stageOneInfoArray = _yield$userApplyBuffS2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyBuffS2[1];
            // Return new User State
            allRoundBuffsInfoArray = _yield$userApplyBuffS2[2];
            saveToDatabasePromisesTwo // Return database promises
            = _yield$userApplyBuffS2[3];
            _context.next = 120;
            break;

          case 73:
            if (!(useAttack.debuff // if Attack is a debuff
            && useAttack.aoe // and the attack is an AOE attack
            )) {
              _context.next = 85;
              break;
            }

            _context.next = 76;
            return (0, _userApplyDebuffAoE["default"])(userState, // Current User State
            allRoundDebuffsInfoArray, battleMonsterState, // Battlemonster state
            stageOneInfoArray, // Pass stageOneInfoArray
            battle, useAttack, // pass the user used attack
            currentSelectedMonster.id, saveToDatabasePromisesTwo, // pass the Database promises array
            t);

          case 76:
            _yield$userApplyDebuf = _context.sent;
            _yield$userApplyDebuf2 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf, 5);
            stageOneInfoArray = _yield$userApplyDebuf2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyDebuf2[1];
            // Return new userState
            allRoundDebuffsInfoArray = _yield$userApplyDebuf2[2];
            battleMonsterState = _yield$userApplyDebuf2[3];
            // Return new Battlemonster state
            saveToDatabasePromisesTwo = _yield$userApplyDebuf2[4];
            _context.next = 120;
            break;

          case 85:
            if (!(useAttack.debuff // If the attack is a debuff
            && !useAttack.aoe // and not an AOE attack
            )) {
              _context.next = 97;
              break;
            }

            _context.next = 88;
            return (0, _userApplyDebuffSingle["default"])(userState, // Current User State
            allRoundDebuffsInfoArray, battleMonsterState, // pass the Battlemonster state
            stageOneInfoArray, // pass StageOneInfo Array
            battle, useAttack, // pass the user used attack
            currentSelectedMonster.id, saveToDatabasePromisesTwo, // pass the Database promises array
            t);

          case 88:
            _yield$userApplyDebuf3 = _context.sent;
            _yield$userApplyDebuf4 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf3, 5);
            stageOneInfoArray = _yield$userApplyDebuf4[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyDebuf4[1];
            // Return new userState
            allRoundDebuffsInfoArray = _yield$userApplyDebuf4[2];
            battleMonsterState = _yield$userApplyDebuf4[3];
            // Return new Battlemonster state
            saveToDatabasePromisesTwo = _yield$userApplyDebuf4[4];
            _context.next = 120;
            break;

          case 97:
            if (!(!useAttack.debuff // if the attack is NOT a debuff
            && useAttack.aoe // and the attack is an AOE attack
            )) {
              _context.next = 110;
              break;
            }

            _context.next = 100;
            return (0, _userApplyAttackAoE["default"])(userState, // Current User State
            battleMonsterState, // pass the Battlemonster state
            allRoundEffectsInfoArray, totalHealedByLifeSteal, lvl, // Users Level
            stageOneInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromisesTwo, // pass the Database promises array
            t // database transaction
            );

          case 100:
            _yield$userApplyAttac = _context.sent;
            _yield$userApplyAttac2 = (0, _slicedToArray2["default"])(_yield$userApplyAttac, 6);
            stageOneInfoArray = _yield$userApplyAttac2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyAttac2[1];
            // Return new userState
            battleMonsterState = _yield$userApplyAttac2[2];
            // Return new Battlemonster state
            allRoundEffectsInfoArray = _yield$userApplyAttac2[3];
            totalHealedByLifeSteal = _yield$userApplyAttac2[4];
            saveToDatabasePromisesTwo = _yield$userApplyAttac2[5];
            _context.next = 120;
            break;

          case 110:
            _context.next = 112;
            return (0, _userApplyAttackSingle["default"])(userState, // pass the userState
            battleMonsterState, // pass the battlemonster state
            allRoundEffectsInfoArray, totalHealedByLifeSteal, // pass the totalHealedByLifeSteal variable
            lvl, // Users Level
            stageOneInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromisesTwo, // pass the Database promises array
            t // database transaction
            );

          case 112:
            _yield$userApplyAttac3 = _context.sent;
            _yield$userApplyAttac4 = (0, _slicedToArray2["default"])(_yield$userApplyAttac3, 6);
            stageOneInfoArray = _yield$userApplyAttac4[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyAttac4[1];
            // Return new userState
            battleMonsterState = _yield$userApplyAttac4[2];
            // Return new Battlemonster state
            allRoundEffectsInfoArray = _yield$userApplyAttac4[3];
            totalHealedByLifeSteal = _yield$userApplyAttac4[4];
            // Return total healed by lifeSteal
            saveToDatabasePromisesTwo // Return Database promises to fulfill
            = _yield$userApplyAttac4[5];

          case 120:
            // If there are no monsters left, tag battle as complete
            isBattleMonsterAlive = battleMonsterState.filter(function (obj) {
              return obj.currentHp > 0;
            });

            if (!isBattleMonsterAlive || isBattleMonsterAlive.length < 1) {
              isBattleComplete = true;
              console.log('Stage #1 - Battle Completion');
            } // Stage Two


            console.log('Stage #2 Processing');
            console.log('Stage #2-1 Processing'); // Process Monster Moves/Attacks

            if (isBattleComplete) {
              _context.next = 157;
              break;
            }

            console.log('battle is not complete'); // TODO: ADD ABILITY FOR ENEMY TO APPLY BUFFS TO SELF OR GROUP
            // TODO: ADD ABILITY FOR ENEMY TO APPLY DEBUFFS TO USER

            _context.next = 128;
            return (0, _monstersApplyAttack["default"])(userState, // Pass the userState
            saveToDatabasePromisesTwo, // pass database promises array
            battleMonsterState, // pass battlemonster state
            lvl, // Users Level
            block, // users Block
            defense, // Users defense
            regularAttack, // Users Regular Attack
            stageTwoInfoArray, // Array to fill with battle info
            battle, // battle database record
            t // database transaction
            );

          case 128:
            _yield$monstersApplyA = _context.sent;
            _yield$monstersApplyA2 = (0, _slicedToArray2["default"])(_yield$monstersApplyA, 6);
            totalDamageByMonsters = _yield$monstersApplyA2[0];
            // Return total damage done by monsters
            userState = _yield$monstersApplyA2[1];
            // Return the new userState
            battleMonsterState = _yield$monstersApplyA2[2];
            // Return new Battlemonster state
            stageTwoInfoArray = _yield$monstersApplyA2[3];
            // Return the stageTwoInfoArray to pass to render
            retaliationArray = _yield$monstersApplyA2[4];
            // Return array with retaliation info
            saveToDatabasePromisesTwo // DataPromises to execute
            = _yield$monstersApplyA2[5];
            console.log('Stage #3 Processing'); // Stage Three

            if (!(retaliationArray.length > 0)) {
              _context.next = 148;
              break;
            }

            _context.next = 140;
            return (0, _userApplyRetaliation["default"])(userState, totalHealedByLifeSteal, saveToDatabasePromisesTwo, // pass the Database promises array
            battleMonsterState, allRoundEffectsInfoArray, battle, retaliationArray, stageThreeInfoArray, kick, lvl, t);

          case 140:
            _yield$userApplyRetli = _context.sent;
            _yield$userApplyRetli2 = (0, _slicedToArray2["default"])(_yield$userApplyRetli, 6);
            stageThreeInfoArray = _yield$userApplyRetli2[0];
            // Return completed stageThreeInfoArray Array
            userState = _yield$userApplyRetli2[1];
            // Return the new userState
            battleMonsterState = _yield$userApplyRetli2[2];
            // Return new Battlemonster state
            allRoundEffectsInfoArray = _yield$userApplyRetli2[3];
            totalHealedByLifeSteal = _yield$userApplyRetli2[4];
            saveToDatabasePromisesTwo = _yield$userApplyRetli2[5];

          case 148:
            console.log('Stage #4 Processing'); // Stage Four
            // Apply debuff damage

            _context.next = 151;
            return (0, _userApplyDebuffDamage["default"])(userState, battleMonsterState, saveToDatabasePromisesOne, battle, stageFourInfoArray, t);

          case 151:
            _yield$userApplyDebuf5 = _context.sent;
            _yield$userApplyDebuf6 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf5, 4);
            stageFourInfoArray = _yield$userApplyDebuf6[0];
            // Return completed stageFourInfoArray Array
            battleMonsterState = _yield$userApplyDebuf6[1];
            // Return new Battlemonster state
            userState = _yield$userApplyDebuf6[2];
            // Return the new userState
            saveToDatabasePromisesOne = _yield$userApplyDebuf6[3];

          case 157:
            console.log('awaiting promises');
            _context.next = 160;
            return Promise.all(saveToDatabasePromisesOne);

          case 160:
            if (isBattleComplete) {
              _context.next = 173;
              break;
            }

            console.log('Stage #5 - Processing'); // Stage 5
            // Count Down buffs, debuffs / after round effects (heal?)

            _context.next = 164;
            return (0, _countDownBuffsAndDebuffs["default"])(stageFiveInfoArray, userState, battleMonsterState, t);

          case 164:
            _yield$countDownBuffs = _context.sent;
            _yield$countDownBuffs2 = (0, _slicedToArray2["default"])(_yield$countDownBuffs, 3);
            stageFiveInfoArray = _yield$countDownBuffs2[0];
            // Return completed stageFiveInfoArray Array
            userState = _yield$countDownBuffs2[1];
            // Return the new userState
            battleMonsterState // Return new Battlemonster state
            = _yield$countDownBuffs2[2];
            // Stage 6 After Round User Effects (example: manaRegen each Round)
            console.log('Stage 6 is a placeholder');
            stageSixInfoArray = []; // Test if Battle is complete

            isBattleMonsterAliveFinal = battleMonsterState.filter(function (obj) {
              return obj.currentHp > 0;
            });

            if (!isBattleMonsterAliveFinal || isBattleMonsterAliveFinal.length < 1) {
              isBattleComplete = true;
            }

          case 173:
            // Stage 7 (Battle Complete effects) (Mana/Health REGEN)
            console.log('Stage #7 - Processing');

            if (!isBattleComplete) {
              _context.next = 184;
              break;
            }

            _context.next = 177;
            return (0, _userApplyBattleCompleteEffects["default"])(stageSevenInfoArray, userState, battle, totalHealedByLifeSteal, saveToDatabasePromisesTwo, // pass the Database promises array
            t);

          case 177:
            _yield$userApplyBattl = _context.sent;
            _yield$userApplyBattl2 = (0, _slicedToArray2["default"])(_yield$userApplyBattl, 4);
            stageSevenInfoArray = _yield$userApplyBattl2[0];
            // Return completed stageSevenInfoArray Array
            userState = _yield$userApplyBattl2[1];
            // Return the new userState
            totalHealedByLifeSteal = _yield$userApplyBattl2[2];
            saveToDatabasePromisesTwo = _yield$userApplyBattl2[3];
            // Tag the battle as complete
            saveToDatabasePromisesTwo.push(new Promise(function (resolve, reject) {
              _models["default"].battle.update({
                complete: true
              }, {
                where: {
                  id: battle.id
                },
                lock: t.LOCK.UPDATE,
                transaction: t
              }).then(function () {
                return resolve();
              });
            }));

          case 184:
            // STAGE 8 (Unrecorded for rendering)
            // TODO: TEST IF NEW VALUE SURPASSES MAX HEALTH / MANA (Life Steal & after battle heal effects)
            newLifeValue = userCurrentCharacter.condition.life - (totalDamageByMonsters - Math.round(totalDamageByMonsters * (userState.hp.totalLifeBonus / 100))) + (totalHealedByLifeSteal - Math.round(totalHealedByLifeSteal * (userState.hp.totalLifeBonus / 100)));
            saveToDatabasePromisesTwo.push(new Promise(function (resolve, reject) {
              userCurrentCharacter.condition.update({
                life: newLifeValue > userState.hp.max - Math.round(userState.hp.max * (userState.hp.totalLifeBonus / 100)) ? userState.hp.max - Math.round(userState.hp.max * (userState.hp.totalLifeBonus / 100)) : newLifeValue,
                mana: userCurrentCharacter.condition.mana - useAttack.cost
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t
              }).then(function () {
                return resolve();
              });
            }));
            _iterator = _createForOfIteratorHelper(battleMonsterState.entries());

            try {
              _loop = function _loop() {
                var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                    i = _step$value[0],
                    battleMonsterStateToSave = _step$value[1];

                saveToDatabasePromisesTwo.push(new Promise(function (resolve, reject) {
                  _models["default"].BattleMonster.update({
                    currentHp: battleMonsterStateToSave.currentHp
                  }, {
                    where: {
                      id: battleMonsterStateToSave.id
                    },
                    lock: t.LOCK.UPDATE,
                    transaction: t
                  }).then(function () {
                    return resolve();
                  });
                }));
              };

              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _context.next = 190;
            return Promise.all(saveToDatabasePromisesTwo);

          case 190:
            // Remove all the duplicates from (allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray)
            allRoundBuffsInfoArray = (0, _toConsumableArray2["default"])(new Set(allRoundBuffsInfoArray));
            allRoundDebuffsInfoArray = (0, _toConsumableArray2["default"])(new Set(allRoundDebuffsInfoArray));
            allRoundEffectsInfoArray = (0, _toConsumableArray2["default"])(new Set(allRoundEffectsInfoArray)); // Fetch Updated Battle for next round -> See battle controller for handling

            _context.next = 195;
            return _models["default"].battle.findOne({
              where: {
                id: battle.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC'], [_models["default"].BattleMonster, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].BattleMonster,
                as: 'BattleMonsters',
                include: [{
                  model: _models["default"].debuff,
                  as: 'debuffs'
                }, {
                  model: _models["default"].buff,
                  as: 'buffs'
                }, {
                  model: _models["default"].monster,
                  as: 'monster'
                }]
              }],
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 195:
            updatedBattle = _context.sent;
            console.log(updatedBattle.BattleMonsters);
            console.log('updatedBattle.complete');
            console.log(updatedBattle.complete);
            console.log('done processing moves');
            console.log("parry: ".concat(regularAttack.parry));
            console.log("crit: ".concat(regularAttack.crit));
            console.log("defense: ".concat(defense));
            console.log("attack rating: ".concat(regularAttack.ar));
            console.log("lifesteal: ".concat(regularAttack.lifeSteal));
            console.log("initialUserState.hp");
            console.log(initialUserState.hp);
            console.log('\nkick:');
            console.log(JSON.stringify(kick));
            newBattleState = JSON.parse(JSON.stringify(updatedBattle));
            return _context.abrupt("return", [userCurrentCharacter, initialUserState, newBattleState, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, sumExp // newBattleState,
            ]);

          case 211:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function processBattleMove(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.processBattleMove = processBattleMove;