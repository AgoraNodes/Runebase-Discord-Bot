"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processBattleMove = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _calculateCharacterStats = require("../../helpers/stats/calculateCharacterStats");

var _userApplyDebuffAoE = _interopRequireDefault(require("./user/userApplyDebuffAoE"));

var _userApplyDebuffSingle = _interopRequireDefault(require("./user/userApplyDebuffSingle"));

var _userApplyAttackSingle = _interopRequireDefault(require("./user/userApplyAttackSingle"));

var _userApplyAttackAoE = _interopRequireDefault(require("./user/userApplyAttackAoE"));

var _monstersApplyAttack = _interopRequireDefault(require("./monster/monstersApplyAttack"));

var _userApplyRetaliation = _interopRequireDefault(require("./user/userApplyRetaliation"));

var _userApplyDebuffDamage = _interopRequireDefault(require("./user/userApplyDebuffDamage"));

var _countDownBuffsAndDebuffs = _interopRequireDefault(require("./utils/countDownBuffsAndDebuffs"));

var _userApplyBuffSingle = _interopRequireDefault(require("./user/userApplyBuffSingle"));

var _selectAttack = _interopRequireDefault(require("./utils/selectAttack"));

var _removeNewTagFromBuffsAndDebuffs = _interopRequireDefault(require("./utils/removeNewTagFromBuffsAndDebuffs"));

var _userApplyPreBuffBattleChance = _interopRequireDefault(require("./user/userApplyPreBuffBattleChance"));

var _applyEnemyDebuffEffects = _interopRequireDefault(require("./utils/applyEnemyDebuffEffects"));

var _userApplyBattleCompleteEffects = _interopRequireDefault(require("./user/userApplyBattleCompleteEffects"));

var _fetchBattle = _interopRequireDefault(require("../../helpers/fetchBattle"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// TODO: Make code more readable by moving monster/user updates in their own designated function
// TODO: APPLY BUFFS TO USER CHARACTER
var processBattleMove = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, battleOld, currentSelectedMonster, attackUsed, io, queue, t) {
    var battle, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, retaliationArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, isBattleComplete, totalDamageByMonsters, totalHealedByLifeSteal, saveToDatabasePromises, sumExp, _yield$calculateChara, lvl, attackOne, attackTwo, regularAttack, block, defense, kick, hp, mp, useAttack, allBattleMonsters, userState, initialUserState, battleMonsterState, _yield$applyEnemyDebu, _yield$applyEnemyDebu2, _yield$userApplyPreBu, _yield$userApplyPreBu2, _yield$userApplyBuffS, _yield$userApplyBuffS2, _yield$userApplyDebuf, _yield$userApplyDebuf2, _yield$userApplyDebuf3, _yield$userApplyDebuf4, _yield$userApplyAttac, _yield$userApplyAttac2, _yield$userApplyAttac3, _yield$userApplyAttac4, isBattleMonsterAlive, _yield$monstersApplyA, _yield$monstersApplyA2, _yield$userApplyRetli, _yield$userApplyRetli2, _yield$userApplyDebuf5, _yield$userApplyDebuf6, _yield$countDownBuffs, _yield$countDownBuffs2, isBattleMonsterAliveFinal, _yield$userApplyBattl, _yield$userApplyBattl2, newLifeValue, _iterator, _step, _loop, updatedBattle, newBattleState;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchBattle["default"])(battleOld, t);

          case 2:
            battle = _context.sent;
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

            totalDamageByMonsters = 0;
            totalHealedByLifeSteal = 0; // let battleLogDatabasePromises = [];

            saveToDatabasePromises = []; // TODO: Only Gather Exp if Units are not lower then 5 levels of user level

            sumExp = battle.BattleMonsters.reduce(function (accumulator, object) {
              return accumulator + object.monster.exp;
            }, 0);
            _context.next = 19;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 19:
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
            useAttack = (0, _selectAttack["default"])(userCurrentCharacter, attackUsed, attackOne, attackTwo, regularAttack);
            _context.next = 32;
            return (0, _removeNewTagFromBuffsAndDebuffs["default"])(userCurrentCharacter, battle.BattleMonsters, t);

          case 32:
            _context.next = 34;
            return _models["default"].BattleMonster.findAll({
              where: {
                battleId: battle.id
              },
              include: [{
                model: _models["default"].debuff,
                as: 'debuffs'
              }, {
                model: _models["default"].monster,
                as: 'monster',
                include: [{
                  model: _models["default"].monsterAttack,
                  as: 'monsterAttacks',
                  include: [{
                    model: _models["default"].damageType,
                    as: 'damageType'
                  }]
                }]
              }],
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 34:
            allBattleMonsters = _context.sent;
            userState = JSON.parse(JSON.stringify(userCurrentCharacter));
            userState.hp = hp;
            userState.mp = mp;
            initialUserState = JSON.parse(JSON.stringify(userState));
            battleMonsterState = JSON.parse(JSON.stringify(allBattleMonsters));
            console.log('Processing Debuff Effects'); // APPLY ALL ENEMY DEBUFFS

            _context.next = 43;
            return (0, _applyEnemyDebuffEffects["default"])(battleMonsterState);

          case 43:
            _yield$applyEnemyDebu = _context.sent;
            _yield$applyEnemyDebu2 = (0, _slicedToArray2["default"])(_yield$applyEnemyDebu, 1);
            battleMonsterState = _yield$applyEnemyDebu2[0];
            // DETERMINE IF UNIT IS STUNNED FROM DEBUFFS AND OTHER PREBATTLE DEBUFF EFFECTS
            console.log('Stage #0 Processing');
            _context.next = 49;
            return (0, _userApplyPreBuffBattleChance["default"])(userState, // Current User State
            battleMonsterState, stageZeroInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromises, // Database Promises to execute and wait for
            t // database transaction
            );

          case 49:
            _yield$userApplyPreBu = _context.sent;
            _yield$userApplyPreBu2 = (0, _slicedToArray2["default"])(_yield$userApplyPreBu, 4);
            stageZeroInfoArray = _yield$userApplyPreBu2[0];
            userState = _yield$userApplyPreBu2[1];
            battleMonsterState = _yield$userApplyPreBu2[2];
            saveToDatabasePromises = _yield$userApplyPreBu2[3];
            console.log('Stage #1 Processing'); // Stage One

            if (!(useAttack.buff && !useAttack.aoe)) {
              _context.next = 66;
              break;
            }

            _context.next = 59;
            return (0, _userApplyBuffSingle["default"])(userState, // Current User State
            stageOneInfoArray, // Stage One Info Array
            battle, // passing battle object? (maybe we can reduce to just battle.id)?
            useAttack, // What attack are we using?
            currentSelectedMonster.id, // Which Monster is selected?
            saveToDatabasePromises, // Saving to Database promises
            t // Transaction object sequelize
            );

          case 59:
            _yield$userApplyBuffS = _context.sent;
            _yield$userApplyBuffS2 = (0, _slicedToArray2["default"])(_yield$userApplyBuffS, 3);
            stageOneInfoArray = _yield$userApplyBuffS2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyBuffS2[1];
            // Return new User State
            saveToDatabasePromises // Return battle promises
            = _yield$userApplyBuffS2[2];
            _context.next = 109;
            break;

          case 66:
            if (!(useAttack.debuff && useAttack.aoe)) {
              _context.next = 77;
              break;
            }

            _context.next = 69;
            return (0, _userApplyDebuffAoE["default"])(userState, // Current User State
            battleMonsterState, stageOneInfoArray, battle, useAttack, currentSelectedMonster.id, saveToDatabasePromises, t);

          case 69:
            _yield$userApplyDebuf = _context.sent;
            _yield$userApplyDebuf2 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf, 4);
            stageOneInfoArray = _yield$userApplyDebuf2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyDebuf2[1];
            battleMonsterState = _yield$userApplyDebuf2[2];
            saveToDatabasePromises = _yield$userApplyDebuf2[3];
            _context.next = 109;
            break;

          case 77:
            if (!(useAttack.debuff && !useAttack.aoe)) {
              _context.next = 88;
              break;
            }

            _context.next = 80;
            return (0, _userApplyDebuffSingle["default"])(userState, // Current User State
            battleMonsterState, stageOneInfoArray, battle, useAttack, currentSelectedMonster.id, saveToDatabasePromises, t);

          case 80:
            _yield$userApplyDebuf3 = _context.sent;
            _yield$userApplyDebuf4 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf3, 4);
            stageOneInfoArray = _yield$userApplyDebuf4[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyDebuf4[1];
            battleMonsterState = _yield$userApplyDebuf4[2];
            saveToDatabasePromises = _yield$userApplyDebuf4[3];
            _context.next = 109;
            break;

          case 88:
            if (!(!useAttack.debuff && useAttack.aoe)) {
              _context.next = 100;
              break;
            }

            _context.next = 91;
            return (0, _userApplyAttackAoE["default"])(userState, // Current User State
            battleMonsterState, totalHealedByLifeSteal, lvl, // Users Level
            stageOneInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromises, t // database transaction
            );

          case 91:
            _yield$userApplyAttac = _context.sent;
            _yield$userApplyAttac2 = (0, _slicedToArray2["default"])(_yield$userApplyAttac, 5);
            stageOneInfoArray = _yield$userApplyAttac2[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyAttac2[1];
            battleMonsterState = _yield$userApplyAttac2[2];
            totalHealedByLifeSteal = _yield$userApplyAttac2[3];
            saveToDatabasePromises = _yield$userApplyAttac2[4];
            _context.next = 109;
            break;

          case 100:
            _context.next = 102;
            return (0, _userApplyAttackSingle["default"])(userState, battleMonsterState, totalHealedByLifeSteal, lvl, // Users Level
            stageOneInfoArray, // Array to fill with battle info
            battle, // battle database record
            useAttack, // Which attack is used by user
            currentSelectedMonster.id, // which Monster do we have selected?
            saveToDatabasePromises, t // database transaction
            );

          case 102:
            _yield$userApplyAttac3 = _context.sent;
            _yield$userApplyAttac4 = (0, _slicedToArray2["default"])(_yield$userApplyAttac3, 5);
            stageOneInfoArray = _yield$userApplyAttac4[0];
            // Return completed StageOneInfo Array
            userState = _yield$userApplyAttac4[1];
            battleMonsterState = _yield$userApplyAttac4[2];
            totalHealedByLifeSteal = _yield$userApplyAttac4[3];
            saveToDatabasePromises = _yield$userApplyAttac4[4];

          case 109:
            // If there are no monsters left, tag battle as complete
            isBattleMonsterAlive = battleMonsterState.filter(function (obj) {
              return obj.currentHp > 0;
            });

            if (!isBattleMonsterAlive || isBattleMonsterAlive.length < 1) {
              isBattleComplete = true;
            } // Stage Two


            console.log('Stage #2 Processing'); // Process Monster Moves/Attacks

            if (isBattleComplete) {
              _context.next = 153;
              break;
            }

            _context.next = 115;
            return (0, _monstersApplyAttack["default"])(userState, saveToDatabasePromises, battleMonsterState, lvl, // Users Level
            block, // users Block
            defense, // Users defense
            regularAttack, // Users Regular Attack
            stageTwoInfoArray, // Array to fill with battle info
            battle, // battle database record
            t // database transaction
            );

          case 115:
            _yield$monstersApplyA = _context.sent;
            _yield$monstersApplyA2 = (0, _slicedToArray2["default"])(_yield$monstersApplyA, 6);
            totalDamageByMonsters = _yield$monstersApplyA2[0];
            userState = _yield$monstersApplyA2[1];
            battleMonsterState = _yield$monstersApplyA2[2];
            stageTwoInfoArray = _yield$monstersApplyA2[3];
            retaliationArray = _yield$monstersApplyA2[4];
            saveToDatabasePromises = _yield$monstersApplyA2[5];
            // }
            console.log('Stage #3 Processing'); // Stage Three

            if (!(retaliationArray.length > 0)) {
              _context.next = 134;
              break;
            }

            _context.next = 127;
            return (0, _userApplyRetaliation["default"])(userState, totalHealedByLifeSteal, saveToDatabasePromises, battleMonsterState, battle, retaliationArray, stageThreeInfoArray, kick, lvl, t);

          case 127:
            _yield$userApplyRetli = _context.sent;
            _yield$userApplyRetli2 = (0, _slicedToArray2["default"])(_yield$userApplyRetli, 5);
            stageThreeInfoArray = _yield$userApplyRetli2[0];
            userState = _yield$userApplyRetli2[1];
            battleMonsterState = _yield$userApplyRetli2[2];
            totalHealedByLifeSteal = _yield$userApplyRetli2[3];
            saveToDatabasePromises = _yield$userApplyRetli2[4];

          case 134:
            console.log('Stage #4 Processing'); // Stage Four
            // Apply debuff damage

            _context.next = 137;
            return (0, _userApplyDebuffDamage["default"])(userState, battleMonsterState, battle, stageFourInfoArray, t);

          case 137:
            _yield$userApplyDebuf5 = _context.sent;
            _yield$userApplyDebuf6 = (0, _slicedToArray2["default"])(_yield$userApplyDebuf5, 3);
            stageFourInfoArray = _yield$userApplyDebuf6[0];
            battleMonsterState = _yield$userApplyDebuf6[1];
            userState = _yield$userApplyDebuf6[2];
            _context.next = 144;
            return (0, _countDownBuffsAndDebuffs["default"])(stageFiveInfoArray, userState, battleMonsterState, t);

          case 144:
            _yield$countDownBuffs = _context.sent;
            _yield$countDownBuffs2 = (0, _slicedToArray2["default"])(_yield$countDownBuffs, 3);
            stageFiveInfoArray = _yield$countDownBuffs2[0];
            userState = _yield$countDownBuffs2[1];
            battleMonsterState = _yield$countDownBuffs2[2];
            // Stage 6 After Round User Effects (example: manaRegen each Round)
            console.log('Stage 6 is a placeholder');
            stageSixInfoArray = []; // Test if Battle is complete

            isBattleMonsterAliveFinal = battleMonsterState.filter(function (obj) {
              return obj.currentHp > 0;
            });

            if (!isBattleMonsterAliveFinal || isBattleMonsterAliveFinal.length < 1) {
              isBattleComplete = true;
            }

          case 153:
            if (!isBattleComplete) {
              _context.next = 163;
              break;
            }

            _context.next = 156;
            return (0, _userApplyBattleCompleteEffects["default"])(stageSevenInfoArray, userState, battle, totalHealedByLifeSteal, saveToDatabasePromises, t);

          case 156:
            _yield$userApplyBattl = _context.sent;
            _yield$userApplyBattl2 = (0, _slicedToArray2["default"])(_yield$userApplyBattl, 4);
            stageSevenInfoArray = _yield$userApplyBattl2[0];
            userState = _yield$userApplyBattl2[1];
            totalHealedByLifeSteal = _yield$userApplyBattl2[2];
            saveToDatabasePromises = _yield$userApplyBattl2[3];
            saveToDatabasePromises.push(new Promise(function (resolve, reject) {
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

          case 163:
            // STAGE 8 (Unrecorded for rendering)
            // TODO: TEST IF NEW VALUE SURPASSES MAX HEALTH / MANA (Life Steal & after battle heal effects)
            newLifeValue = userCurrentCharacter.condition.life - (totalDamageByMonsters - Math.round(totalDamageByMonsters * (userState.hp.totalLifeBonus / 100))) + (totalHealedByLifeSteal - Math.round(totalHealedByLifeSteal * (userState.hp.totalLifeBonus / 100)));
            saveToDatabasePromises.push(new Promise(function (resolve, reject) {
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

                saveToDatabasePromises.push(new Promise(function (resolve, reject) {
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

            _context.next = 169;
            return Promise.all(saveToDatabasePromises);

          case 169:
            _context.next = 171;
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

          case 171:
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
            return _context.abrupt("return", [userCurrentCharacter, initialUserState, newBattleState, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, sumExp // newBattleState,
            ]);

          case 187:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function processBattleMove(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

exports.processBattleMove = processBattleMove;