"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordBattle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _battle = require("../render/battle/battle");

var _userDied = require("../render/battle/userDied");

var _outOfStamina = require("../render/battle/outOfStamina");

var _character = require("../helpers/character/character");

var _selectedSkills = require("../helpers/character/selectedSkills");

var _updateSelectedSkills = require("../helpers/character/updateSelectedSkills");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _battleComplete = require("../render/battle/battleComplete");

var _utils = require("../helpers/utils");

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

var _fetchBattle = _interopRequireDefault(require("../helpers/fetchBattle"));

var _processBattleMove = require("../processors/battle/processBattleMove");

var _experience = require("../helpers/client/experience");

var _generateLoot = require("../helpers/items/generateLoot");

var _item = require("../render/item");

var _buttons = require("../buttons");

var _embeds = require("../embeds");

var _messages = require("../messages");

var _skillEmoji = _interopRequireDefault(require("../config/skillEmoji"));

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var currentSelectedMonster;

var discordBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(discordClient, message, isDefered, queue) {
    var allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, userWallet, battle, newBattle, monster, randomAmountOfMobs, mobPromises, i, randomMonsterHp, newMobPromise, userCurrentSelectedSkills, mainSkillMap, secondarySkillMap, selectMonsterMap, _yield$calculateChara, hp, mp, myInitialUserState, _iterator3, _step3, userBuff, _iterator4, _step4, userDebuff, _iterator5, _step5, eachBattleMonster, _iterator6, _step6, monsterBuff, _iterator7, _step7, monsterDebuff, embedMessage, generateLootImagesArray, generateLootItemButtonArray, collector, newLoot;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            // let usedDeferReply = false;
            allRoundBuffsInfoArray = [];
            allRoundDebuffsInfoArray = [];
            allRoundEffectsInfoArray = []; // const activity = [];

            _context12.next = 5;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 5:
            userId = _context12.sent;
            _context12.next = 8;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 8:
            discordChannel = _context12.sent;
            _context12.next = 11;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 11:
            userCurrentCharacter = _context12.sent;
            console.log('battle1');
            _context12.next = 15;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 15:
            _yield$testPlayerRead = _context12.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context12.next = 21;
              break;
            }

            return _context12.abrupt("return", usedDeferReply);

          case 21:
            console.log('battle2');

            if (!(userCurrentCharacter.condition.stamina < 20)) {
              _context12.next = 34;
              break;
            }

            _context12.t0 = discordChannel;
            _context12.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context12.next = 27;
            return (0, _outOfStamina.renderOutOfStamina)(userCurrentCharacter);

          case 27:
            _context12.t2 = _context12.sent;
            _context12.t3 = [_context12.t2];
            _context12.t4 = [];
            _context12.t5 = {
              content: _context12.t1,
              files: _context12.t3,
              components: _context12.t4
            };
            _context12.next = 33;
            return _context12.t0.send.call(_context12.t0, _context12.t5);

          case 33:
            return _context12.abrupt("return");

          case 34:
            console.log('battle3');

            if (!(userCurrentCharacter.condition.life < 1)) {
              _context12.next = 47;
              break;
            }

            _context12.t6 = discordChannel;
            _context12.t7 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context12.next = 40;
            return (0, _userDied.renderUserDied)(userCurrentCharacter);

          case 40:
            _context12.t8 = _context12.sent;
            _context12.t9 = [_context12.t8];
            _context12.t10 = [];
            _context12.t11 = {
              content: _context12.t7,
              files: _context12.t9,
              components: _context12.t10
            };
            _context12.next = 46;
            return _context12.t6.send.call(_context12.t6, _context12.t11);

          case 46:
            return _context12.abrupt("return");

          case 47:
            _context12.next = 49;
            return userCurrentCharacter.condition.update({
              stamina: userCurrentCharacter.condition.stamina - 20
            });

          case 49:
            _context12.next = 51;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 51:
            userCurrentCharacter = _context12.sent;
            console.log('3');
            _context12.next = 55;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.UserGroup.user.id
              }
            });

          case 55:
            userWallet = _context12.sent;
            _context12.next = 58;
            return _models["default"].battle.findOne({
              where: {
                complete: false,
                UserGroupClassId: userCurrentCharacter.id
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
                  model: _models["default"].buff,
                  as: 'buffs'
                }, {
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
                }]
              }]
            });

          case 58:
            battle = _context12.sent;
            console.log('battle4');

            if (battle) {
              _context12.next = 75;
              break;
            }

            _context12.next = 63;
            return _models["default"].battle.create({
              complete: false,
              UserGroupClassId: userCurrentCharacter.id
            });

          case 63:
            newBattle = _context12.sent;
            _context12.next = 66;
            return _models["default"].monster.findOne({
              where: {
                name: 'Zombie'
              }
            });

          case 66:
            monster = _context12.sent;
            randomAmountOfMobs = (0, _utils.randomIntFromInterval)(3, 4);
            mobPromises = [];

            for (i = 0; i < randomAmountOfMobs; i += 1) {
              randomMonsterHp = (0, _utils.randomIntFromInterval)(monster.minHp, monster.maxHp);
              newMobPromise = _models["default"].BattleMonster.create({
                battleId: newBattle.id,
                monsterId: monster.id,
                currentHp: randomMonsterHp,
                maxHp: randomMonsterHp
              });
              mobPromises.push(newMobPromise);
            }

            _context12.next = 72;
            return Promise.all(mobPromises);

          case 72:
            _context12.next = 74;
            return _models["default"].battle.findOne({
              where: {
                id: newBattle.id
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
                  model: _models["default"].buff,
                  as: 'buffs'
                }, {
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
                }]
              }]
            });

          case 74:
            battle = _context12.sent;

          case 75:
            _context12.next = 77;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 77:
            userCurrentSelectedSkills = _context12.sent;
            console.log('battle5');
            mainSkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce(function (filtered, mySkill) {
              if (!mySkill.skill.passive) {
                var emoji = _skillEmoji["default"].find(function (a) {
                  return a.name === mySkill.skill.name;
                });

                var mapped = _objectSpread({
                  placeholder: 'pick a skill',
                  label: "Main Skill: ".concat(mySkill.skill.name),
                  value: "mainSkill:".concat(mySkill.id),
                  "default": mySkill.id === userCurrentSelectedSkills.selectedMainSkillId
                }, emoji ? {
                  emoji: emoji.emoji
                } : false);

                filtered.push(mapped);
              }

              return filtered;
            }, []);
            secondarySkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce(function (filtered, mySkill) {
              if (!mySkill.skill.passive) {
                var emoji = _skillEmoji["default"].find(function (a) {
                  return a.name === mySkill.skill.name;
                });

                var mapped = _objectSpread({
                  placeholder: 'pick a skill',
                  label: "Secondary Skill: ".concat(mySkill.skill.name),
                  value: "secondarySkill:".concat(mySkill.id),
                  "default": mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId
                }, emoji ? {
                  emoji: emoji.emoji
                } : false);

                filtered.push(mapped);
              }

              return filtered;
            }, []);
            console.log('battle6');

            if (!currentSelectedMonster || currentSelectedMonster && currentSelectedMonster.currentHp < 1 || battle.id !== currentSelectedMonster.battleId) {
              currentSelectedMonster = battle.BattleMonsters.find(function (element) {
                return element.currentHp > 0;
              });
            }

            selectMonsterMap = battle.BattleMonsters.reduce(function (filtered, battleMonster, index) {
              if (battleMonster.currentHp > 0) {
                var someNewValue = {
                  placeholder: 'Select a mob to attack',
                  label: "Select Mob: ".concat(battleMonster.monster.name, " #").concat(battleMonster.id, " (").concat(battleMonster.currentHp, " / ").concat(battleMonster.maxHp, ")"),
                  value: "selectMonster:".concat(battleMonster.id),
                  "default": currentSelectedMonster.id === battleMonster.id
                };
                filtered.push(someNewValue);
              }

              return filtered;
            }, []);
            console.log('battle7');
            _context12.next = 87;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 87:
            _yield$calculateChara = _context12.sent;
            hp = _yield$calculateChara.hp;
            mp = _yield$calculateChara.mp;
            myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
            myInitialUserState.hp = hp;
            myInitialUserState.mp = mp;

            if (myInitialUserState.buffs.length > 0) {
              _iterator3 = _createForOfIteratorHelper(myInitialUserState.buffs);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  userBuff = _step3.value;
                  allRoundBuffsInfoArray.push(userBuff.name);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }

            if (myInitialUserState.debuffs.lenth > 0) {
              _iterator4 = _createForOfIteratorHelper(myInitialUserState.debuffs);

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  userDebuff = _step4.value;
                  allRoundDebuffsInfoArray.push(userDebuff.name);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }

            if (battle.BattleMonsters.length > 0) {
              _iterator5 = _createForOfIteratorHelper(battle.BattleMonsters);

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  eachBattleMonster = _step5.value;

                  if (eachBattleMonster.buffs.length > 0) {
                    _iterator6 = _createForOfIteratorHelper(eachBattleMonster.buffs);

                    try {
                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        monsterBuff = _step6.value;
                        allRoundBuffsInfoArray.push(monsterBuff.name);
                      }
                    } catch (err) {
                      _iterator6.e(err);
                    } finally {
                      _iterator6.f();
                    }
                  }

                  if (eachBattleMonster.debuffs.length > 0) {
                    _iterator7 = _createForOfIteratorHelper(eachBattleMonster.debuffs);

                    try {
                      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                        monsterDebuff = _step7.value;
                        allRoundDebuffsInfoArray.push(monsterDebuff.name);
                      }
                    } catch (err) {
                      _iterator7.e(err);
                    } finally {
                      _iterator7.f();
                    }
                  }
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }

            allRoundBuffsInfoArray = (0, _toConsumableArray2["default"])(new Set(allRoundBuffsInfoArray));
            allRoundDebuffsInfoArray = (0, _toConsumableArray2["default"])(new Set(allRoundDebuffsInfoArray));
            console.log('battle9');
            _context12.t12 = discordChannel;
            _context12.t13 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context12.next = 103;
            return (0, _battle.renderBattleGif)(myInitialUserState, userCurrentSelectedSkills, battle, currentSelectedMonster, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray);

          case 103:
            _context12.t14 = _context12.sent;
            _context12.t15 = {
              attachment: _context12.t14,
              name: "battle.gif"
            };
            _context12.t16 = [_context12.t15];
            _context12.t17 = _discord.ActionRowBuilder;
            _context12.next = 109;
            return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

          case 109:
            _context12.t18 = _context12.sent;
            _context12.next = 112;
            return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

          case 112:
            _context12.t19 = _context12.sent;
            _context12.next = 115;
            return (0, _buttons.generateHealButton)();

          case 115:
            _context12.t20 = _context12.sent;
            _context12.t21 = [_context12.t18, _context12.t19, _context12.t20];
            _context12.t22 = {
              components: _context12.t21
            };
            _context12.t23 = new _context12.t17(_context12.t22);
            _context12.t24 = [_context12.t23].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-mob',
                options: selectMonsterMap
              })]
            })] : []), [new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-mainSkill',
                options: mainSkillMap
              })]
            }), new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-secondarySkill',
                options: secondarySkillMap
              })]
            })]);
            _context12.t25 = {
              content: _context12.t13,
              files: _context12.t16,
              components: _context12.t24
            };
            _context12.next = 123;
            return _context12.t12.send.call(_context12.t12, _context12.t25);

          case 123:
            embedMessage = _context12.sent;

            generateLootImagesArray = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(theLoot) {
                var lootArray, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, looot;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        lootArray = [];
                        _iteratorAbruptCompletion = false;
                        _didIteratorError = false;
                        _context.prev = 3;
                        _iterator = _asyncIterator(theLoot);

                      case 5:
                        _context.next = 7;
                        return _iterator.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                          _context.next = 19;
                          break;
                        }

                        looot = _step.value;
                        _context.t0 = lootArray;
                        _context.next = 12;
                        return (0, _item.renderItemImage)(looot);

                      case 12:
                        _context.t1 = _context.sent;
                        _context.t2 = "".concat(looot.id, ".png");
                        _context.t3 = {
                          attachment: _context.t1,
                          name: _context.t2
                        };

                        _context.t0.push.call(_context.t0, _context.t3);

                      case 16:
                        _iteratorAbruptCompletion = false;
                        _context.next = 5;
                        break;

                      case 19:
                        _context.next = 25;
                        break;

                      case 21:
                        _context.prev = 21;
                        _context.t4 = _context["catch"](3);
                        _didIteratorError = true;
                        _iteratorError = _context.t4;

                      case 25:
                        _context.prev = 25;
                        _context.prev = 26;

                        if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                          _context.next = 30;
                          break;
                        }

                        _context.next = 30;
                        return _iterator["return"]();

                      case 30:
                        _context.prev = 30;

                        if (!_didIteratorError) {
                          _context.next = 33;
                          break;
                        }

                        throw _iteratorError;

                      case 33:
                        return _context.finish(30);

                      case 34:
                        return _context.finish(25);

                      case 35:
                        return _context.abrupt("return", lootArray);

                      case 36:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 21, 25, 35], [26,, 30, 34]]);
              }));

              return function generateLootImagesArray(_x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateLootItemButtonArray = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(theLoot) {
                var lootButtonArray, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, looot, newButton;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        lootButtonArray = [];
                        _iteratorAbruptCompletion2 = false;
                        _didIteratorError2 = false;
                        _context2.prev = 3;
                        _iterator2 = _asyncIterator(theLoot);

                      case 5:
                        _context2.next = 7;
                        return _iterator2.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion2 = !(_step2 = _context2.sent).done)) {
                          _context2.next = 16;
                          break;
                        }

                        looot = _step2.value;
                        _context2.next = 11;
                        return (0, _buttons.generateAfterBattleLootButton)(looot);

                      case 11:
                        newButton = _context2.sent;
                        lootButtonArray.push(newButton);

                      case 13:
                        _iteratorAbruptCompletion2 = false;
                        _context2.next = 5;
                        break;

                      case 16:
                        _context2.next = 22;
                        break;

                      case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2["catch"](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t0;

                      case 22:
                        _context2.prev = 22;
                        _context2.prev = 23;

                        if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
                          _context2.next = 27;
                          break;
                        }

                        _context2.next = 27;
                        return _iterator2["return"]();

                      case 27:
                        _context2.prev = 27;

                        if (!_didIteratorError2) {
                          _context2.next = 30;
                          break;
                        }

                        throw _iteratorError2;

                      case 30:
                        return _context2.finish(27);

                      case 31:
                        return _context2.finish(22);

                      case 32:
                        return _context2.abrupt("return", lootButtonArray);

                      case 33:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[3, 18, 22, 32], [23,, 27, 31]]);
              }));

              return function generateLootItemButtonArray(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            console.log('battle 10');
            collector = embedMessage.createMessageComponentCollector({});
            newLoot = [];
            collector.on('collect', /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(interaction) {
                var newSelectedId;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context11.next = 6;
                          break;
                        }

                        if (!interaction.customId.startsWith('lootItem:')) {
                          _context11.next = 6;
                          break;
                        }

                        if (!(interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id)) {
                          _context11.next = 6;
                          break;
                        }

                        _context11.next = 5;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, This loot isn't ment for you!"),
                          ephemeral: true
                        });

                      case 5:
                        return _context11.abrupt("return");

                      case 6:
                        console.log('collector 1');

                        if (!(interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id)) {
                          _context11.next = 11;
                          break;
                        }

                        _context11.next = 10;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 10:
                        return _context11.abrupt("return");

                      case 11:
                        console.log('collector 2');

                        if (!(battle.UserGroupClassId !== userCurrentCharacter.id)) {
                          _context11.next = 16;
                          break;
                        }

                        _context11.next = 15;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, This battle belongs to a different character!"),
                          ephemeral: true
                        });

                      case 15:
                        return _context11.abrupt("return");

                      case 16:
                        if (!(interaction.isButton() && !interaction.customId.startsWith('lootItem:') && interaction.customId !== 'Heal')) {
                          _context11.next = 21;
                          break;
                        }

                        if (currentSelectedMonster) {
                          _context11.next = 21;
                          break;
                        }

                        _context11.next = 20;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, You need to select a monster to attack!"),
                          ephemeral: true
                        });

                      case 20:
                        return _context11.abrupt("return");

                      case 21:
                        console.log('collector 3'); // Heal Handling

                        if (!(interaction.isButton() && interaction.customId === 'Heal')) {
                          _context11.next = 47;
                          break;
                        }

                        _context11.next = 25;
                        return interaction.deferUpdate();

                      case 25:
                        console.log(userWallet);
                        _context11.t0 = interaction;
                        _context11.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context11.next = 30;
                        return (0, _embeds.confirmationHealMessage)(userCurrentCharacter.UserGroup.user.user_id, userWallet.available);

                      case 30:
                        _context11.t2 = _context11.sent;
                        _context11.t3 = [_context11.t2];
                        _context11.t4 = _discord.ActionRowBuilder;
                        _context11.next = 35;
                        return (0, _buttons.generateAcceptButton)();

                      case 35:
                        _context11.t5 = _context11.sent;
                        _context11.next = 38;
                        return (0, _buttons.generateDeclineButton)();

                      case 38:
                        _context11.t6 = _context11.sent;
                        _context11.t7 = [_context11.t5, _context11.t6];
                        _context11.t8 = {
                          components: _context11.t7
                        };
                        _context11.t9 = new _context11.t4(_context11.t8);
                        _context11.t10 = [_context11.t9];
                        _context11.t11 = {
                          content: _context11.t1,
                          embeds: _context11.t3,
                          components: _context11.t10
                        };
                        _context11.next = 46;
                        return _context11.t0.editReply.call(_context11.t0, _context11.t11);

                      case 46:
                        return _context11.abrupt("return");

                      case 47:
                        console.log('collector 4');

                        if (!(interaction.isButton() && interaction.customId === 'decline')) {
                          _context11.next = 72;
                          break;
                        }

                        _context11.next = 51;
                        return interaction.deferUpdate();

                      case 51:
                        _context11.t12 = interaction;
                        _context11.t13 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context11.t14 = [];
                        _context11.t15 = _discord.ActionRowBuilder;
                        _context11.next = 57;
                        return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                      case 57:
                        _context11.t16 = _context11.sent;
                        _context11.next = 60;
                        return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                      case 60:
                        _context11.t17 = _context11.sent;
                        _context11.next = 63;
                        return (0, _buttons.generateHealButton)();

                      case 63:
                        _context11.t18 = _context11.sent;
                        _context11.t19 = [_context11.t16, _context11.t17, _context11.t18];
                        _context11.t20 = {
                          components: _context11.t19
                        };
                        _context11.t21 = new _context11.t15(_context11.t20);
                        _context11.t22 = [_context11.t21].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
                          components: [new _discord.SelectMenuBuilder({
                            customId: 'select-mob',
                            options: selectMonsterMap
                          })]
                        })] : []), [new _discord.ActionRowBuilder({
                          components: [new _discord.SelectMenuBuilder({
                            customId: 'select-mainSkill',
                            options: mainSkillMap
                          })]
                        }), new _discord.ActionRowBuilder({
                          components: [new _discord.SelectMenuBuilder({
                            customId: 'select-secondarySkill',
                            options: secondarySkillMap
                          })]
                        })]);
                        _context11.t23 = {
                          content: _context11.t13,
                          embeds: _context11.t14,
                          components: _context11.t22
                        };
                        _context11.next = 71;
                        return _context11.t12.editReply.call(_context11.t12, _context11.t23);

                      case 71:
                        return _context11.abrupt("return");

                      case 72:
                        console.log('collector 5');
                        _context11.next = 75;
                        return (0, _fetchBattle["default"])(battle);

                      case 75:
                        battle = _context11.sent;
                        console.log('collector 6');

                        if (!(interaction.isButton() && interaction.customId === 'accept')) {
                          _context11.next = 83;
                          break;
                        }

                        _context11.next = 80;
                        return interaction.deferUpdate();

                      case 80:
                        _context11.next = 82;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(t) {
                                      var findWallet, userToUpdate, _yield$calculateChara2, hp, mp;

                                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.next = 2;
                                              return _models["default"].wallet.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.UserGroup.user.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 2:
                                              findWallet = _context3.sent;

                                              if (!(findWallet.available < 10000000)) {
                                                _context3.next = 28;
                                                break;
                                              }

                                              _context3.t0 = interaction;
                                              _context3.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context3.next = 8;
                                              return (0, _embeds.insufficientBalanceMessage)(userCurrentCharacter.UserGroup.user.user_id, 'Heal');

                                            case 8:
                                              _context3.t2 = _context3.sent;
                                              _context3.t3 = [_context3.t2];
                                              _context3.t4 = _discord.ActionRowBuilder;
                                              _context3.next = 13;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 13:
                                              _context3.t5 = _context3.sent;
                                              _context3.next = 16;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 16:
                                              _context3.t6 = _context3.sent;
                                              _context3.next = 19;
                                              return (0, _buttons.generateHealButton)();

                                            case 19:
                                              _context3.t7 = _context3.sent;
                                              _context3.t8 = [_context3.t5, _context3.t6, _context3.t7];
                                              _context3.t9 = {
                                                components: _context3.t8
                                              };
                                              _context3.t10 = new _context3.t4(_context3.t9);
                                              _context3.t11 = [_context3.t10].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context3.t12 = {
                                                content: _context3.t1,
                                                embeds: _context3.t3,
                                                components: _context3.t11
                                              };
                                              _context3.next = 27;
                                              return _context3.t0.editReply.call(_context3.t0, _context3.t12);

                                            case 27:
                                              return _context3.abrupt("return");

                                            case 28:
                                              _context3.next = 30;
                                              return userWallet.update({
                                                available: findWallet.available - 10000000
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 30:
                                              _context3.next = 32;
                                              return _models["default"].UserGroupClass.findOne({
                                                where: {
                                                  UserGroupId: userCurrentCharacter.UserGroup.id,
                                                  classId: userCurrentCharacter.UserGroup.user.currentClassId
                                                },
                                                include: [{
                                                  model: _models["default"].condition,
                                                  as: 'condition'
                                                }, {
                                                  model: _models["default"]["class"],
                                                  as: 'class'
                                                }, {
                                                  model: _models["default"].stats,
                                                  as: 'stats'
                                                }],
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 32:
                                              userToUpdate = _context3.sent;
                                              _context3.next = 35;
                                              return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

                                            case 35:
                                              _yield$calculateChara2 = _context3.sent;
                                              hp = _yield$calculateChara2.hp;
                                              mp = _yield$calculateChara2.mp;
                                              _context3.next = 40;
                                              return userCurrentCharacter.condition.update({
                                                life: hp.max,
                                                mana: mp.max
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 40:
                                              myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
                                              myInitialUserState.hp = {
                                                current: hp.max,
                                                max: hp.max,
                                                totalLifeBonus: hp.totalLifeBonus
                                              };
                                              myInitialUserState.mp = {
                                                current: mp.max,
                                                max: mp.max,
                                                totalManaBonus: mp.totalManaBonus
                                              };
                                              _context3.next = 45;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 45:
                                              userCurrentCharacter = _context3.sent;
                                              _context3.t13 = interaction;
                                              _context3.next = 49;
                                              return (0, _battle.renderBattleGif)(myInitialUserState, userCurrentSelectedSkills, battle, currentSelectedMonster, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray);

                                            case 49:
                                              _context3.t14 = _context3.sent;
                                              _context3.t15 = {
                                                attachment: _context3.t14,
                                                name: "battle.gif"
                                              };
                                              _context3.t16 = [_context3.t15];
                                              _context3.t17 = _discord.ActionRowBuilder;
                                              _context3.next = 55;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 55:
                                              _context3.t18 = _context3.sent;
                                              _context3.next = 58;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 58:
                                              _context3.t19 = _context3.sent;
                                              _context3.next = 61;
                                              return (0, _buttons.generateHealButton)();

                                            case 61:
                                              _context3.t20 = _context3.sent;
                                              _context3.t21 = [_context3.t18, _context3.t19, _context3.t20];
                                              _context3.t22 = {
                                                components: _context3.t21
                                              };
                                              _context3.t23 = new _context3.t17(_context3.t22);
                                              _context3.t24 = [_context3.t23].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context3.t25 = [];
                                              _context3.t26 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, you are now healed!");
                                              _context3.t27 = {
                                                files: _context3.t16,
                                                components: _context3.t24,
                                                embeds: _context3.t25,
                                                content: _context3.t26
                                              };
                                              _context3.next = 71;
                                              return _context3.t13.editReply.call(_context3.t13, _context3.t27);

                                            case 71:
                                            case "end":
                                              return _context3.stop();
                                          }
                                        }
                                      }, _callee3);
                                    }));

                                    return function (_x8) {
                                      return _ref6.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                                        while (1) {
                                          switch (_context4.prev = _context4.next) {
                                            case 0:
                                              console.log(err);
                                              _context4.prev = 1;
                                              _context4.next = 4;
                                              return _models["default"].error.create({
                                                type: 'Heal',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context4.next = 9;
                                              break;

                                            case 6:
                                              _context4.prev = 6;
                                              _context4.t0 = _context4["catch"](1);
                                              console.log(_context4.t0);

                                            case 9:
                                            case "end":
                                              return _context4.stop();
                                          }
                                        }
                                      }, _callee4, null, [[1, 6]]);
                                    }));

                                    return function (_x9) {
                                      return _ref7.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 82:
                        return _context11.abrupt("return");

                      case 83:
                        console.log('collector 7'); // End Heal handling

                        if (!interaction.isSelectMenu()) {
                          _context11.next = 89;
                          break;
                        }

                        if (!(interaction.customId === 'select-mob')) {
                          _context11.next = 89;
                          break;
                        }

                        _context11.next = 88;
                        return interaction.deferUpdate();

                      case 88:
                        if (interaction.values[0].startsWith('selectMonster:')) {
                          newSelectedId = Number(interaction.values[0].replace('selectMonster:', ''));
                          selectMonsterMap = battle.BattleMonsters.reduce(function (filtered, battleMonster, index) {
                            if (battleMonster.currentHp > 0) {
                              var someNewValue = {
                                placeholder: 'Select a mob to attack',
                                label: "Select Mob: ".concat(battleMonster.monster.name, " #").concat(battleMonster.id, " (").concat(battleMonster.currentHp, " / ").concat(battleMonster.maxHp, ")"),
                                value: "selectMonster:".concat(battleMonster.id),
                                "default": newSelectedId === battleMonster.id
                              };
                              filtered.push(someNewValue);
                            }

                            return filtered;
                          }, []);
                          currentSelectedMonster = battle.BattleMonsters.find(function (element) {
                            return element.id === newSelectedId;
                          });
                        }

                      case 89:
                        console.log('collector 8');
                        _context11.next = 92;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                          return _regenerator["default"].wrap(function _callee9$(_context9) {
                            while (1) {
                              switch (_context9.prev = _context9.next) {
                                case 0:
                                  _context9.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(t) {
                                      var attackUsed, initialUserState, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, sumExp, previousBattleState, itemId, findItemToLoot, findItemInDB, _yield$processBattleM, _yield$processBattleM2, newExp, highestLevelMob, foundLoot, foundLootTwo, checkCurrentSelected, skillId, _yield$calculateChara3, _hp, _mp;

                                      return _regenerator["default"].wrap(function _callee8$(_context8) {
                                        while (1) {
                                          switch (_context8.prev = _context8.next) {
                                            case 0:
                                              sumExp = 0;
                                              previousBattleState = JSON.parse(JSON.stringify(battle)); // const previousUserState = JSON.parse(JSON.stringify(userCurrentCharacter));

                                              if (!interaction.isButton()) {
                                                _context8.next = 171;
                                                break;
                                              }

                                              _context8.next = 5;
                                              return interaction.deferUpdate();

                                            case 5:
                                              if (!interaction.customId.startsWith('lootItem:')) {
                                                _context8.next = 58;
                                                break;
                                              }

                                              itemId = Number(interaction.customId.replace("lootItem:", ""));
                                              findItemToLoot = newLoot.find(function (x) {
                                                return x.id === itemId;
                                              });

                                              if (findItemToLoot) {
                                                _context8.next = 12;
                                                break;
                                              }

                                              _context8.next = 11;
                                              return interaction.reply({
                                                content: "<@".concat(interaction.user.id, ">, We didn't find this item for you to loot!"),
                                                ephemeral: true
                                              });

                                            case 11:
                                              return _context8.abrupt("return");

                                            case 12:
                                              _context8.next = 14;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: findItemToLoot.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 14:
                                              findItemInDB = _context8.sent;

                                              if (!findItemInDB.inventoryId) {
                                                _context8.next = 19;
                                                break;
                                              }

                                              _context8.next = 18;
                                              return interaction.followUp({
                                                content: "<@".concat(interaction.user.id, ">, Item was already looted!"),
                                                ephemeral: true
                                              });

                                            case 18:
                                              return _context8.abrupt("return");

                                            case 19:
                                              _context8.next = 21;
                                              return findItemInDB.update({
                                                inventoryId: userCurrentCharacter.inventoryId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 21:
                                              newLoot = newLoot.filter(function (data) {
                                                return data.id !== itemId;
                                              });
                                              _context8.t0 = interaction;
                                              _context8.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context8.next = 26;
                                              return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                            case 26:
                                              _context8.t3 = _context8.sent;
                                              _context8.t4 = {
                                                attachment: _context8.t3,
                                                name: "battleComplete.png"
                                              };
                                              _context8.t2 = [_context8.t4];
                                              _context8.t5 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 36;
                                                break;
                                              }

                                              _context8.next = 33;
                                              return generateLootImagesArray(newLoot);

                                            case 33:
                                              _context8.t6 = _context8.sent;
                                              _context8.next = 37;
                                              break;

                                            case 36:
                                              _context8.t6 = [];

                                            case 37:
                                              _context8.t7 = _context8.t6;
                                              _context8.t8 = (0, _context8.t5)(_context8.t7);
                                              _context8.t9 = _context8.t2.concat.call(_context8.t2, _context8.t8);
                                              _context8.t10 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 51;
                                                break;
                                              }

                                              _context8.t12 = _discord.ActionRowBuilder;
                                              _context8.next = 45;
                                              return generateLootItemButtonArray(newLoot);

                                            case 45:
                                              _context8.t13 = _context8.sent;
                                              _context8.t14 = {
                                                components: _context8.t13
                                              };
                                              _context8.t15 = new _context8.t12(_context8.t14);
                                              _context8.t11 = [_context8.t15];
                                              _context8.next = 52;
                                              break;

                                            case 51:
                                              _context8.t11 = [];

                                            case 52:
                                              _context8.t16 = _context8.t11;
                                              _context8.t17 = (0, _context8.t10)(_context8.t16);
                                              _context8.t18 = {
                                                content: _context8.t1,
                                                files: _context8.t9,
                                                components: _context8.t17
                                              };
                                              _context8.next = 57;
                                              return _context8.t0.editReply.call(_context8.t0, _context8.t18);

                                            case 57:
                                              return _context8.abrupt("return");

                                            case 58:
                                              _context8.next = 60;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 60:
                                              userCurrentCharacter = _context8.sent;
                                              _context8.t19 = interaction;
                                              _context8.t20 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context8.next = 65;
                                              return (0, _embeds.loadingBattleMoveEmbed)(userCurrentCharacter);

                                            case 65:
                                              _context8.t21 = _context8.sent;
                                              _context8.t22 = [_context8.t21];
                                              _context8.t23 = [];
                                              _context8.t24 = {
                                                content: _context8.t20,
                                                embeds: _context8.t22,
                                                components: _context8.t23
                                              };
                                              _context8.next = 71;
                                              return _context8.t19.editReply.call(_context8.t19, _context8.t24);

                                            case 71:
                                              if (!(userCurrentCharacter.condition.life < 1)) {
                                                _context8.next = 84;
                                                break;
                                              }

                                              _context8.t25 = interaction;
                                              _context8.t26 = [];
                                              _context8.next = 76;
                                              return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                            case 76:
                                              _context8.t27 = _context8.sent;
                                              _context8.t28 = {
                                                attachment: _context8.t27,
                                                name: "userDied.png"
                                              };
                                              _context8.t29 = [_context8.t28];
                                              _context8.t30 = [];
                                              _context8.t31 = {
                                                embeds: _context8.t26,
                                                files: _context8.t29,
                                                components: _context8.t30
                                              };
                                              _context8.next = 83;
                                              return _context8.t25.editReply.call(_context8.t25, _context8.t31);

                                            case 83:
                                              return _context8.abrupt("return");

                                            case 84:
                                              if (interaction.customId.startsWith('attackMain:')) {
                                                attackUsed = 'main';
                                              }

                                              if (interaction.customId.startsWith('attackSecondary:')) {
                                                attackUsed = 'secondary';
                                              }

                                              if (battle.complete) {
                                                _context8.next = 122;
                                                break;
                                              }

                                              _context8.next = 89;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, currentSelectedMonster, attackUsed, t);

                                            case 89:
                                              _yield$processBattleM = _context8.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 15);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              initialUserState = _yield$processBattleM2[1];
                                              battle = _yield$processBattleM2[2];
                                              allRoundBuffsInfoArray = _yield$processBattleM2[3];
                                              allRoundDebuffsInfoArray = _yield$processBattleM2[4];
                                              allRoundEffectsInfoArray = _yield$processBattleM2[5];
                                              stageZeroInfoArray = _yield$processBattleM2[6];
                                              stageOneInfoArray = _yield$processBattleM2[7];
                                              stageTwoInfoArray = _yield$processBattleM2[8];
                                              stageThreeInfoArray = _yield$processBattleM2[9];
                                              stageFourInfoArray = _yield$processBattleM2[10];
                                              stageFiveInfoArray = _yield$processBattleM2[11];
                                              stageSixInfoArray = _yield$processBattleM2[12];
                                              stageSevenInfoArray = _yield$processBattleM2[13];
                                              sumExp = _yield$processBattleM2[14];
                                              console.log("Is Battle Complete: ".concat(battle.complete ? 'Yes' : 'No'));

                                              if (!battle.complete) {
                                                _context8.next = 122;
                                                break;
                                              }

                                              console.log('battle is complete 1');
                                              currentSelectedMonster = null;
                                              _context8.next = 112;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.UserGroup.user.user_id, sumExp, 'battle', t);

                                            case 112:
                                              newExp = _context8.sent;
                                              highestLevelMob = Math.max.apply(Math, (0, _toConsumableArray2["default"])(battle.BattleMonsters.map(function (o) {
                                                return o.monster.level;
                                              })));
                                              _context8.next = 116;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 116:
                                              foundLoot = _context8.sent;

                                              if (foundLoot) {
                                                newLoot.push(foundLoot);
                                              }

                                              _context8.next = 120;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 120:
                                              foundLootTwo = _context8.sent;

                                              if (foundLootTwo) {
                                                newLoot.push(foundLootTwo);
                                              }

                                            case 122:
                                              if (!battle.complete) {
                                                _context8.next = 139;
                                                break;
                                              }

                                              console.log(initialUserState);
                                              console.log('before final renderbattleGif complete');
                                              _context8.t32 = interaction;
                                              _context8.t33 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context8.t34 = [];
                                              _context8.next = 130;
                                              return (0, _battle.renderBattleGif)(initialUserState, userCurrentSelectedSkills, previousBattleState, currentSelectedMonster, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray);

                                            case 130:
                                              _context8.t35 = _context8.sent;
                                              _context8.t36 = {
                                                attachment: _context8.t35,
                                                name: "battle.gif"
                                              };
                                              _context8.t37 = [_context8.t36];
                                              _context8.t38 = [];
                                              _context8.t39 = {
                                                content: _context8.t33,
                                                embeds: _context8.t34,
                                                files: _context8.t37,
                                                components: _context8.t38
                                              };
                                              _context8.next = 137;
                                              return _context8.t32.editReply.call(_context8.t32, _context8.t39);

                                            case 137:
                                              _context8.next = 167;
                                              break;

                                            case 139:
                                              checkCurrentSelected = battle.BattleMonsters.find(function (element) {
                                                return element && element.id === currentSelectedMonster.id;
                                              });
                                              currentSelectedMonster = checkCurrentSelected.currentHp > 0 ? checkCurrentSelected : battle.BattleMonsters.find(function (element) {
                                                return element.currentHp > 0;
                                              });
                                              selectMonsterMap = battle.BattleMonsters.reduce(function (filtered, battleMonster, index) {
                                                if (battleMonster.currentHp > 0) {
                                                  var someNewValue = {
                                                    placeholder: 'Select a mob to attack',
                                                    label: "Select Mob: ".concat(battleMonster.monster.name, " #").concat(battleMonster.id, " (").concat(battleMonster.currentHp, " / ").concat(battleMonster.maxHp, ")"),
                                                    value: "selectMonster:".concat(battleMonster.id),
                                                    "default": currentSelectedMonster.id === battleMonster.id
                                                  };
                                                  filtered.push(someNewValue);
                                                }

                                                return filtered;
                                              }, []);
                                              _context8.t40 = interaction;
                                              _context8.t41 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context8.t42 = [];
                                              _context8.next = 147;
                                              return (0, _battle.renderBattleGif)(initialUserState, userCurrentSelectedSkills, previousBattleState, currentSelectedMonster, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray);

                                            case 147:
                                              _context8.t43 = _context8.sent;
                                              _context8.t44 = {
                                                attachment: _context8.t43,
                                                name: "battle.gif"
                                              };
                                              _context8.t45 = [_context8.t44];
                                              _context8.t46 = _discord.ActionRowBuilder;
                                              _context8.next = 153;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 153:
                                              _context8.t47 = _context8.sent;
                                              _context8.next = 156;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 156:
                                              _context8.t48 = _context8.sent;
                                              _context8.next = 159;
                                              return (0, _buttons.generateHealButton)();

                                            case 159:
                                              _context8.t49 = _context8.sent;
                                              _context8.t50 = [_context8.t47, _context8.t48, _context8.t49];
                                              _context8.t51 = {
                                                components: _context8.t50
                                              };
                                              _context8.t52 = new _context8.t46(_context8.t51);
                                              _context8.t53 = [_context8.t52].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context8.t54 = {
                                                content: _context8.t41,
                                                embeds: _context8.t42,
                                                files: _context8.t45,
                                                components: _context8.t53
                                              };
                                              _context8.next = 167;
                                              return _context8.t40.editReply.call(_context8.t40, _context8.t54);

                                            case 167:
                                              previousBattleState = JSON.parse(JSON.stringify(previousBattleState));

                                              if (userCurrentCharacter.condition.life < 1) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                                                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                                                    while (1) {
                                                      switch (_context6.prev = _context6.next) {
                                                        case 0:
                                                          _context6.t0 = interaction;
                                                          _context6.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                                          _context6.t2 = [];
                                                          _context6.next = 5;
                                                          return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                                        case 5:
                                                          _context6.t3 = _context6.sent;
                                                          _context6.t4 = {
                                                            attachment: _context6.t3,
                                                            name: "userDied.png"
                                                          };
                                                          _context6.t5 = [_context6.t4];
                                                          _context6.t6 = [];
                                                          _context6.t7 = {
                                                            content: _context6.t1,
                                                            embeds: _context6.t2,
                                                            files: _context6.t5,
                                                            components: _context6.t6
                                                          };
                                                          _context6.next = 12;
                                                          return _context6.t0.editReply.call(_context6.t0, _context6.t7);

                                                        case 12:
                                                        case "end":
                                                          return _context6.stop();
                                                      }
                                                    }
                                                  }, _callee6);
                                                })), 5000);
                                              }

                                              if (battle.complete) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                                                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                                                    while (1) {
                                                      switch (_context7.prev = _context7.next) {
                                                        case 0:
                                                          _context7.t0 = interaction;
                                                          _context7.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                                          _context7.next = 4;
                                                          return (0, _embeds.battleCompleteEmbed)(userCurrentCharacter, battle, sumExp, newLoot);

                                                        case 4:
                                                          _context7.t2 = _context7.sent;
                                                          _context7.t3 = [_context7.t2];
                                                          _context7.next = 8;
                                                          return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                                        case 8:
                                                          _context7.t5 = _context7.sent;
                                                          _context7.t6 = {
                                                            attachment: _context7.t5,
                                                            name: "battleComplete.png"
                                                          };
                                                          _context7.t4 = [_context7.t6];
                                                          _context7.t7 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context7.next = 18;
                                                            break;
                                                          }

                                                          _context7.next = 15;
                                                          return generateLootImagesArray(newLoot);

                                                        case 15:
                                                          _context7.t8 = _context7.sent;
                                                          _context7.next = 19;
                                                          break;

                                                        case 18:
                                                          _context7.t8 = [];

                                                        case 19:
                                                          _context7.t9 = _context7.t8;
                                                          _context7.t10 = (0, _context7.t7)(_context7.t9);
                                                          _context7.t11 = _context7.t4.concat.call(_context7.t4, _context7.t10);
                                                          _context7.t12 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context7.next = 33;
                                                            break;
                                                          }

                                                          _context7.t14 = _discord.ActionRowBuilder;
                                                          _context7.next = 27;
                                                          return generateLootItemButtonArray(newLoot);

                                                        case 27:
                                                          _context7.t15 = _context7.sent;
                                                          _context7.t16 = {
                                                            components: _context7.t15
                                                          };
                                                          _context7.t17 = new _context7.t14(_context7.t16);
                                                          _context7.t13 = [_context7.t17];
                                                          _context7.next = 34;
                                                          break;

                                                        case 33:
                                                          _context7.t13 = [];

                                                        case 34:
                                                          _context7.t18 = _context7.t13;
                                                          _context7.t19 = (0, _context7.t12)(_context7.t18);
                                                          _context7.t20 = {
                                                            content: _context7.t1,
                                                            embeds: _context7.t3,
                                                            files: _context7.t11,
                                                            components: _context7.t19
                                                          };
                                                          _context7.next = 39;
                                                          return _context7.t0.editReply.call(_context7.t0, _context7.t20);

                                                        case 39:
                                                        case "end":
                                                          return _context7.stop();
                                                      }
                                                    }
                                                  }, _callee7);
                                                })), 5000);
                                              }

                                              return _context8.abrupt("return");

                                            case 171:
                                              console.log('selecting 1');

                                              if (!interaction.isSelectMenu()) {
                                                _context8.next = 229;
                                                break;
                                              }

                                              if (!(interaction.customId === 'select-mainSkill')) {
                                                _context8.next = 182;
                                                break;
                                              }

                                              _context8.next = 176;
                                              return interaction.deferUpdate();

                                            case 176:
                                              if (!interaction.values[0].startsWith('mainSkill:')) {
                                                _context8.next = 181;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                                              _context8.next = 180;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              skillId, // mainSkill
                                              false, // secondary skill
                                              t // t, transaction
                                              );

                                            case 180:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 181:
                                              console.log('selecting new main skill');

                                            case 182:
                                              console.log('selecting 2');

                                              if (!(interaction.customId === 'select-secondarySkill')) {
                                                _context8.next = 191;
                                                break;
                                              }

                                              _context8.next = 186;
                                              return interaction.deferUpdate();

                                            case 186:
                                              if (!interaction.values[0].startsWith('secondarySkill:')) {
                                                _context8.next = 191;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                                              _context8.next = 190;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              false, // mainSkill
                                              skillId, // secondary skill
                                              t // t, transaction
                                              );

                                            case 190:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 191:
                                              console.log('selecting 3');
                                              mainSkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce(function (filtered, mySkill) {
                                                if (!mySkill.skill.passive) {
                                                  var emoji = _skillEmoji["default"].find(function (a) {
                                                    return a.name === mySkill.skill.name;
                                                  });

                                                  var mapped = _objectSpread({
                                                    placeholder: 'pick a skill',
                                                    label: "Main Skill: ".concat(mySkill.skill.name),
                                                    value: "mainSkill:".concat(mySkill.id),
                                                    "default": mySkill.id === userCurrentSelectedSkills.selectedMainSkillId
                                                  }, emoji ? {
                                                    emoji: emoji.emoji
                                                  } : false);

                                                  filtered.push(mapped);
                                                }

                                                return filtered;
                                              }, []);
                                              console.log('selecting 4');
                                              secondarySkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce(function (filtered, mySkill) {
                                                if (!mySkill.skill.passive) {
                                                  var emoji = _skillEmoji["default"].find(function (a) {
                                                    return a.name === mySkill.skill.name;
                                                  });

                                                  var mapped = _objectSpread({
                                                    placeholder: 'pick a skill',
                                                    label: "Secondary Skill: ".concat(mySkill.skill.name),
                                                    value: "secondarySkill:".concat(mySkill.id),
                                                    "default": mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId
                                                  }, emoji ? {
                                                    emoji: emoji.emoji
                                                  } : false);

                                                  filtered.push(mapped);
                                                }

                                                return filtered;
                                              }, []);
                                              _context8.next = 197;
                                              return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

                                            case 197:
                                              _yield$calculateChara3 = _context8.sent;
                                              _hp = _yield$calculateChara3.hp;
                                              _mp = _yield$calculateChara3.mp;
                                              myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
                                              myInitialUserState.hp = _hp;
                                              myInitialUserState.mp = _mp;
                                              console.log('selecting 5');
                                              _context8.t55 = interaction;
                                              _context8.t56 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context8.t57 = [];
                                              _context8.next = 209;
                                              return (0, _battle.renderBattleGif)(myInitialUserState, userCurrentSelectedSkills, battle, currentSelectedMonster, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, allRoundEffectsInfoArray);

                                            case 209:
                                              _context8.t58 = _context8.sent;
                                              _context8.t59 = {
                                                attachment: _context8.t58,
                                                name: "battle.gif"
                                              };
                                              _context8.t60 = [_context8.t59];
                                              _context8.t61 = _discord.ActionRowBuilder;
                                              _context8.next = 215;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 215:
                                              _context8.t62 = _context8.sent;
                                              _context8.next = 218;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 218:
                                              _context8.t63 = _context8.sent;
                                              _context8.next = 221;
                                              return (0, _buttons.generateHealButton)();

                                            case 221:
                                              _context8.t64 = _context8.sent;
                                              _context8.t65 = [_context8.t62, _context8.t63, _context8.t64];
                                              _context8.t66 = {
                                                components: _context8.t65
                                              };
                                              _context8.t67 = new _context8.t61(_context8.t66);
                                              _context8.t68 = [_context8.t67].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.ActionRowBuilder({
                                                components: [new _discord.SelectMenuBuilder({
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context8.t69 = {
                                                content: _context8.t56,
                                                embeds: _context8.t57,
                                                files: _context8.t60,
                                                components: _context8.t68
                                              };
                                              _context8.next = 229;
                                              return _context8.t55.editReply.call(_context8.t55, _context8.t69);

                                            case 229:
                                            case "end":
                                              return _context8.stop();
                                          }
                                        }
                                      }, _callee8);
                                    }));

                                    return function (_x10) {
                                      return _ref9.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context9.stop();
                              }
                            }
                          }, _callee9);
                        })))["catch"]( /*#__PURE__*/function () {
                          var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(err) {
                            return _regenerator["default"].wrap(function _callee10$(_context10) {
                              while (1) {
                                switch (_context10.prev = _context10.next) {
                                  case 0:
                                    console.log('catch error');
                                    console.log(err);

                                  case 2:
                                  case "end":
                                    return _context10.stop();
                                }
                              }
                            }, _callee10);
                          }));

                          return function (_x11) {
                            return _ref12.apply(this, arguments);
                          };
                        }());

                      case 92:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 130:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function discordBattle(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordBattle = discordBattle;