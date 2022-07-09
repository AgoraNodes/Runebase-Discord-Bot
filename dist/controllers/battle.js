"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordBattle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _battle = require("../render/battle/battle");

var _initBattle = require("../render/battle/initBattle");

var _userDied = require("../render/battle/userDied");

var _outOfStamina = require("../render/battle/outOfStamina");

var _character = require("../helpers/character/character");

var _selectedSkills = require("../helpers/character/selectedSkills");

var _updateSelectedSkills = require("../helpers/character/updateSelectedSkills");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _processBattleMove = require("../helpers/battle/processBattleMove");

var _battleComplete = require("../render/battle/battleComplete");

var _utils = require("../helpers/utils");

var _experience = require("../helpers/client/experience");

var _generateLoot = require("../helpers/items/generateLoot");

var _item = require("../render/item");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _skillEmoji = _interopRequireDefault(require("../config/skillEmoji"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var currentSelectedMonster;

var discordBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(discordClient, message, io, queue) {
    var userId, discordChannel, userCurrentCharacter, userCurrentSelectedSkills, userWallet, battle, newBattle, monster, randomAmountOfMobs, mobPromises, i, randomMonsterHp, newMobPromise, mainSkillMap, secondarySkillMap, selectMonsterMap, embedMessage, generateLootImagesArray, generateLootItemButtonArray, loadingBattleMoveEmbed, battleCompleteEmbed, collector, newLoot;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 2:
            userId = _context13.sent;
            _context13.next = 5;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 5:
            discordChannel = _context13.sent;
            _context13.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context13.sent;
            _context13.next = 11;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 11:
            userCurrentSelectedSkills = _context13.sent;

            if (userCurrentCharacter) {
              _context13.next = 16;
              break;
            }

            _context13.next = 15;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 15:
            return _context13.abrupt("return");

          case 16:
            if (!(userCurrentCharacter.condition.stamina < 20)) {
              _context13.next = 27;
              break;
            }

            _context13.t0 = discordChannel;
            _context13.next = 20;
            return (0, _outOfStamina.renderOutOfStamina)(userCurrentCharacter);

          case 20:
            _context13.t1 = _context13.sent;
            _context13.t2 = [_context13.t1];
            _context13.t3 = [];
            _context13.t4 = {
              files: _context13.t2,
              components: _context13.t3
            };
            _context13.next = 26;
            return _context13.t0.send.call(_context13.t0, _context13.t4);

          case 26:
            return _context13.abrupt("return");

          case 27:
            if (!(userCurrentCharacter.condition.life < 1)) {
              _context13.next = 38;
              break;
            }

            _context13.t5 = discordChannel;
            _context13.next = 31;
            return (0, _userDied.renderUserDied)(userCurrentCharacter);

          case 31:
            _context13.t6 = _context13.sent;
            _context13.t7 = [_context13.t6];
            _context13.t8 = [];
            _context13.t9 = {
              files: _context13.t7,
              components: _context13.t8
            };
            _context13.next = 37;
            return _context13.t5.send.call(_context13.t5, _context13.t9);

          case 37:
            return _context13.abrupt("return");

          case 38:
            _context13.next = 40;
            return userCurrentCharacter.condition.update({
              stamina: userCurrentCharacter.condition.stamina - 20
            });

          case 40:
            _context13.next = 42;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 42:
            userCurrentCharacter = _context13.sent;
            _context13.next = 45;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.user.id
              }
            });

          case 45:
            userWallet = _context13.sent;
            _context13.next = 48;
            return _models["default"].battle.findOne({
              where: {
                complete: false,
                UserClassId: userCurrentCharacter.id
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
                  model: _models["default"].monster,
                  as: 'monster'
                }]
              }]
            });

          case 48:
            battle = _context13.sent;

            if (battle) {
              _context13.next = 64;
              break;
            }

            _context13.next = 52;
            return _models["default"].battle.create({
              complete: false,
              UserClassId: userCurrentCharacter.id
            });

          case 52:
            newBattle = _context13.sent;
            _context13.next = 55;
            return _models["default"].monster.findOne({
              where: {
                name: 'Zombie'
              }
            });

          case 55:
            monster = _context13.sent;
            randomAmountOfMobs = (0, _utils.randomIntFromInterval)(1, 4);
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

            _context13.next = 61;
            return Promise.all(mobPromises);

          case 61:
            _context13.next = 63;
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
                  model: _models["default"].monster,
                  as: 'monster'
                }]
              }]
            });

          case 63:
            battle = _context13.sent;

          case 64:
            mainSkillMap = userCurrentSelectedSkills.UserClassSkills.reduce(function (filtered, mySkill) {
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
            secondarySkillMap = userCurrentSelectedSkills.UserClassSkills.reduce(function (filtered, mySkill) {
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
            _context13.t10 = discordChannel;
            _context13.t11 = "<@".concat(userCurrentCharacter.user.user_id, ">");
            _context13.t12 = _discord.MessageAttachment;
            _context13.next = 73;
            return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, battle, userCurrentCharacter, currentSelectedMonster);

          case 73:
            _context13.t13 = _context13.sent;
            _context13.t14 = new _context13.t12(_context13.t13, 'battle.gif');
            _context13.t15 = [_context13.t14];
            _context13.t16 = _discord.MessageActionRow;
            _context13.next = 79;
            return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

          case 79:
            _context13.t17 = _context13.sent;
            _context13.next = 82;
            return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

          case 82:
            _context13.t18 = _context13.sent;
            _context13.next = 85;
            return (0, _buttons.generateHealButton)();

          case 85:
            _context13.t19 = _context13.sent;
            _context13.t20 = [_context13.t17, _context13.t18, _context13.t19];
            _context13.t21 = {
              components: _context13.t20
            };
            _context13.t22 = new _context13.t16(_context13.t21);
            _context13.t23 = [_context13.t22].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-mob',
                options: selectMonsterMap
              })]
            })] : []), [new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-mainSkill',
                options: mainSkillMap
              })]
            }), new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-secondarySkill',
                options: secondarySkillMap
              })]
            })]);
            _context13.t24 = {
              content: _context13.t11,
              files: _context13.t15,
              components: _context13.t23
            };
            _context13.next = 93;
            return _context13.t10.send.call(_context13.t10, _context13.t24);

          case 93:
            embedMessage = _context13.sent;

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
                          _context.next = 20;
                          break;
                        }

                        looot = _step.value;
                        _context.t0 = lootArray;
                        _context.t1 = _discord.MessageAttachment;
                        _context.next = 13;
                        return (0, _item.renderItemImage)(looot);

                      case 13:
                        _context.t2 = _context.sent;
                        _context.t3 = "".concat(looot.id, ".png");
                        _context.t4 = new _context.t1(_context.t2, _context.t3);

                        _context.t0.push.call(_context.t0, _context.t4);

                      case 17:
                        _iteratorAbruptCompletion = false;
                        _context.next = 5;
                        break;

                      case 20:
                        _context.next = 26;
                        break;

                      case 22:
                        _context.prev = 22;
                        _context.t5 = _context["catch"](3);
                        _didIteratorError = true;
                        _iteratorError = _context.t5;

                      case 26:
                        _context.prev = 26;
                        _context.prev = 27;

                        if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                          _context.next = 31;
                          break;
                        }

                        _context.next = 31;
                        return _iterator["return"]();

                      case 31:
                        _context.prev = 31;

                        if (!_didIteratorError) {
                          _context.next = 34;
                          break;
                        }

                        throw _iteratorError;

                      case 34:
                        return _context.finish(31);

                      case 35:
                        return _context.finish(26);

                      case 36:
                        return _context.abrupt("return", lootArray);

                      case 37:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 22, 26, 36], [27,, 31, 35]]);
              }));

              return function generateLootImagesArray(_x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateLootItemButtonArray = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(theLoot) {
                var lootButtonArray, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, looot, addLootId;

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
                          _context2.next = 15;
                          break;
                        }

                        looot = _step2.value;
                        console.log(looot);
                        addLootId = "lootItem:".concat(looot.id);
                        lootButtonArray.push(new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Loot ".concat(looot.name),
                          emoji: '🤏',
                          customId: addLootId
                        }));

                      case 12:
                        _iteratorAbruptCompletion2 = false;
                        _context2.next = 5;
                        break;

                      case 15:
                        _context2.next = 21;
                        break;

                      case 17:
                        _context2.prev = 17;
                        _context2.t0 = _context2["catch"](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t0;

                      case 21:
                        _context2.prev = 21;
                        _context2.prev = 22;

                        if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
                          _context2.next = 26;
                          break;
                        }

                        _context2.next = 26;
                        return _iterator2["return"]();

                      case 26:
                        _context2.prev = 26;

                        if (!_didIteratorError2) {
                          _context2.next = 29;
                          break;
                        }

                        throw _iteratorError2;

                      case 29:
                        return _context2.finish(26);

                      case 30:
                        return _context2.finish(21);

                      case 31:
                        return _context2.abrupt("return", lootButtonArray);

                      case 32:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[3, 17, 21, 31], [22,, 26, 30]]);
              }));

              return function generateLootItemButtonArray(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            loadingBattleMoveEmbed = new _discord.MessageEmbed().setTitle('Battle').setDescription("".concat(userCurrentCharacter.user.username, ", Your next move is calculating.."));

            battleCompleteEmbed = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userCurrentCharacter, expEarned, newLootC) {
                var itemString, _iteratorAbruptCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, looot;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        itemString = '';
                        _iteratorAbruptCompletion3 = false;
                        _didIteratorError3 = false;
                        _context3.prev = 3;
                        _iterator3 = _asyncIterator(newLootC);

                      case 5:
                        _context3.next = 7;
                        return _iterator3.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion3 = !(_step3 = _context3.sent).done)) {
                          _context3.next = 13;
                          break;
                        }

                        looot = _step3.value;
                        itemString += "\n- **".concat(looot.name, "** [").concat(looot.itemQuality.name, "]");

                      case 10:
                        _iteratorAbruptCompletion3 = false;
                        _context3.next = 5;
                        break;

                      case 13:
                        _context3.next = 19;
                        break;

                      case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3["catch"](3);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context3.t0;

                      case 19:
                        _context3.prev = 19;
                        _context3.prev = 20;

                        if (!(_iteratorAbruptCompletion3 && _iterator3["return"] != null)) {
                          _context3.next = 24;
                          break;
                        }

                        _context3.next = 24;
                        return _iterator3["return"]();

                      case 24:
                        _context3.prev = 24;

                        if (!_didIteratorError3) {
                          _context3.next = 27;
                          break;
                        }

                        throw _iteratorError3;

                      case 27:
                        return _context3.finish(24);

                      case 28:
                        return _context3.finish(19);

                      case 29:
                        return _context3.abrupt("return", new _discord.MessageEmbed().setTitle("".concat(userCurrentCharacter.user.username, " battle#").concat(battle.id, " results")).setDescription("Exp earned: **".concat(expEarned, "**\n\n").concat(newLootC.length > 0 ? "__found ".concat(newLootC.length, " ").concat(newLootC.length === 1 ? "item" : "items", "__") : "").concat(itemString)));

                      case 30:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[3, 15, 19, 29], [20,, 24, 28]]);
              }));

              return function battleCompleteEmbed(_x7, _x8, _x9) {
                return _ref4.apply(this, arguments);
              };
            }();

            collector = embedMessage.createMessageComponentCollector({});
            newLoot = [];
            collector.on('collect', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(interaction) {
                var newSelectedId;
                return _regenerator["default"].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context12.next = 6;
                          break;
                        }

                        if (!interaction.customId.startsWith('lootItem:')) {
                          _context12.next = 6;
                          break;
                        }

                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
                          _context12.next = 6;
                          break;
                        }

                        _context12.next = 5;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, This loot isn't ment for you!"),
                          ephemeral: true
                        });

                      case 5:
                        return _context12.abrupt("return");

                      case 6:
                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
                          _context12.next = 10;
                          break;
                        }

                        _context12.next = 9;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 9:
                        return _context12.abrupt("return");

                      case 10:
                        console.log(battle.UserClassId);
                        console.log(userCurrentCharacter.id);
                        console.log('123');

                        if (!(battle.UserClassId !== userCurrentCharacter.id)) {
                          _context12.next = 17;
                          break;
                        }

                        _context12.next = 16;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, This battle belongs to a different character!"),
                          ephemeral: true
                        });

                      case 16:
                        return _context12.abrupt("return");

                      case 17:
                        if (!(interaction.isButton() && !interaction.customId.startsWith('lootItem:') && interaction.customId !== 'Heal')) {
                          _context12.next = 22;
                          break;
                        }

                        if (currentSelectedMonster) {
                          _context12.next = 22;
                          break;
                        }

                        _context12.next = 21;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, You need to select a monster to attack!"),
                          ephemeral: true
                        });

                      case 21:
                        return _context12.abrupt("return");

                      case 22:
                        if (!(interaction.isButton() && interaction.customId === 'Heal')) {
                          _context12.next = 47;
                          break;
                        }

                        _context12.next = 25;
                        return interaction.deferUpdate();

                      case 25:
                        console.log(userWallet);
                        _context12.t0 = interaction;
                        _context12.t1 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                        _context12.next = 30;
                        return (0, _messages.confirmationHealMessage)(userCurrentCharacter.user.user_id, userWallet.available);

                      case 30:
                        _context12.t2 = _context12.sent;
                        _context12.t3 = [_context12.t2];
                        _context12.t4 = _discord.MessageActionRow;
                        _context12.next = 35;
                        return (0, _buttons.generateAcceptButton)();

                      case 35:
                        _context12.t5 = _context12.sent;
                        _context12.next = 38;
                        return (0, _buttons.generateDeclineButton)();

                      case 38:
                        _context12.t6 = _context12.sent;
                        _context12.t7 = [_context12.t5, _context12.t6];
                        _context12.t8 = {
                          components: _context12.t7
                        };
                        _context12.t9 = new _context12.t4(_context12.t8);
                        _context12.t10 = [_context12.t9];
                        _context12.t11 = {
                          content: _context12.t1,
                          embeds: _context12.t3,
                          components: _context12.t10
                        };
                        _context12.next = 46;
                        return _context12.t0.editReply.call(_context12.t0, _context12.t11);

                      case 46:
                        return _context12.abrupt("return");

                      case 47:
                        if (!(interaction.isButton() && interaction.customId === 'decline')) {
                          _context12.next = 71;
                          break;
                        }

                        _context12.next = 50;
                        return interaction.deferUpdate();

                      case 50:
                        _context12.t12 = interaction;
                        _context12.t13 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                        _context12.t14 = [];
                        _context12.t15 = _discord.MessageActionRow;
                        _context12.next = 56;
                        return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                      case 56:
                        _context12.t16 = _context12.sent;
                        _context12.next = 59;
                        return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                      case 59:
                        _context12.t17 = _context12.sent;
                        _context12.next = 62;
                        return (0, _buttons.generateHealButton)();

                      case 62:
                        _context12.t18 = _context12.sent;
                        _context12.t19 = [_context12.t16, _context12.t17, _context12.t18];
                        _context12.t20 = {
                          components: _context12.t19
                        };
                        _context12.t21 = new _context12.t15(_context12.t20);
                        _context12.t22 = [_context12.t21].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-mob',
                            options: selectMonsterMap
                          })]
                        })] : []), [new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-mainSkill',
                            options: mainSkillMap
                          })]
                        }), new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-secondarySkill',
                            options: secondarySkillMap
                          })]
                        })]);
                        _context12.t23 = {
                          content: _context12.t13,
                          embeds: _context12.t14,
                          components: _context12.t22
                        };
                        _context12.next = 70;
                        return _context12.t12.editReply.call(_context12.t12, _context12.t23);

                      case 70:
                        return _context12.abrupt("return");

                      case 71:
                        if (!(interaction.isButton() && interaction.customId === 'accept')) {
                          _context12.next = 77;
                          break;
                        }

                        _context12.next = 74;
                        return interaction.deferUpdate();

                      case 74:
                        _context12.next = 76;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                          return _regenerator["default"].wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(t) {
                                      var findWallet, userToUpdate;
                                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                                        while (1) {
                                          switch (_context4.prev = _context4.next) {
                                            case 0:
                                              _context4.next = 2;
                                              return _models["default"].wallet.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.user.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 2:
                                              findWallet = _context4.sent;

                                              if (!(findWallet.available < 10000000)) {
                                                _context4.next = 28;
                                                break;
                                              }

                                              _context4.t0 = interaction;
                                              _context4.t1 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context4.next = 8;
                                              return (0, _messages.insufficientBalanceMessage)(userCurrentCharacter.user.user_id, 'Heal');

                                            case 8:
                                              _context4.t2 = _context4.sent;
                                              _context4.t3 = [_context4.t2];
                                              _context4.t4 = _discord.MessageActionRow;
                                              _context4.next = 13;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 13:
                                              _context4.t5 = _context4.sent;
                                              _context4.next = 16;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 16:
                                              _context4.t6 = _context4.sent;
                                              _context4.next = 19;
                                              return (0, _buttons.generateHealButton)();

                                            case 19:
                                              _context4.t7 = _context4.sent;
                                              _context4.t8 = [_context4.t5, _context4.t6, _context4.t7];
                                              _context4.t9 = {
                                                components: _context4.t8
                                              };
                                              _context4.t10 = new _context4.t4(_context4.t9);
                                              _context4.t11 = [_context4.t10].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context4.t12 = {
                                                content: _context4.t1,
                                                embeds: _context4.t3,
                                                components: _context4.t11
                                              };
                                              _context4.next = 27;
                                              return _context4.t0.editReply.call(_context4.t0, _context4.t12);

                                            case 27:
                                              return _context4.abrupt("return");

                                            case 28:
                                              _context4.next = 30;
                                              return userWallet.update({
                                                available: findWallet.available - 10000000
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 30:
                                              _context4.next = 32;
                                              return _models["default"].UserClass.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.user.id,
                                                  classId: userCurrentCharacter.user.currentClassId
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
                                              userToUpdate = _context4.sent;
                                              _context4.next = 35;
                                              return userCurrentCharacter.condition.update({
                                                life: userToUpdate["class"].life + userToUpdate.stats.life,
                                                mana: userToUpdate["class"].mana + userToUpdate.stats.mana
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 35:
                                              _context4.t13 = interaction;
                                              _context4.t14 = _discord.MessageAttachment;
                                              _context4.next = 39;
                                              return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, battle, userCurrentCharacter, currentSelectedMonster);

                                            case 39:
                                              _context4.t15 = _context4.sent;
                                              _context4.t16 = new _context4.t14(_context4.t15, 'battle.gif');
                                              _context4.t17 = [_context4.t16];
                                              _context4.t18 = _discord.MessageActionRow;
                                              _context4.next = 45;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 45:
                                              _context4.t19 = _context4.sent;
                                              _context4.next = 48;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 48:
                                              _context4.t20 = _context4.sent;
                                              _context4.next = 51;
                                              return (0, _buttons.generateHealButton)();

                                            case 51:
                                              _context4.t21 = _context4.sent;
                                              _context4.t22 = [_context4.t19, _context4.t20, _context4.t21];
                                              _context4.t23 = {
                                                components: _context4.t22
                                              };
                                              _context4.t24 = new _context4.t18(_context4.t23);
                                              _context4.t25 = [_context4.t24].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context4.t26 = [];
                                              _context4.t27 = "<@".concat(userCurrentCharacter.user.user_id, ">, you are now healed!");
                                              _context4.t28 = {
                                                files: _context4.t17,
                                                components: _context4.t25,
                                                embeds: _context4.t26,
                                                content: _context4.t27
                                              };
                                              _context4.next = 61;
                                              return _context4.t13.editReply.call(_context4.t13, _context4.t28);

                                            case 61:
                                            case "end":
                                              return _context4.stop();
                                          }
                                        }
                                      }, _callee4);
                                    }));

                                    return function (_x11) {
                                      return _ref7.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err) {
                                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                                        while (1) {
                                          switch (_context5.prev = _context5.next) {
                                            case 0:
                                              console.log(err);
                                              _context5.prev = 1;
                                              _context5.next = 4;
                                              return _models["default"].error.create({
                                                type: 'Heal',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context5.next = 9;
                                              break;

                                            case 6:
                                              _context5.prev = 6;
                                              _context5.t0 = _context5["catch"](1);
                                              console.log(_context5.t0);

                                            case 9:
                                            case "end":
                                              return _context5.stop();
                                          }
                                        }
                                      }, _callee5, null, [[1, 6]]);
                                    }));

                                    return function (_x12) {
                                      return _ref8.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        })));

                      case 76:
                        return _context12.abrupt("return");

                      case 77:
                        if (!interaction.isSelectMenu()) {
                          _context12.next = 82;
                          break;
                        }

                        if (!(interaction.customId === 'select-mob')) {
                          _context12.next = 82;
                          break;
                        }

                        _context12.next = 81;
                        return interaction.deferUpdate();

                      case 81:
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

                      case 82:
                        _context12.next = 84;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
                          return _regenerator["default"].wrap(function _callee10$(_context10) {
                            while (1) {
                              switch (_context10.prev = _context10.next) {
                                case 0:
                                  _context10.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(t) {
                                      var attackUsed, battleInfoArray, monsterInfo, userInfo, sumExp, previousBattleState, previousUserState, itemId, findItemToLoot, findItemInDB, _yield$processBattleM, _yield$processBattleM2, newExp, highestLevelMob, foundLoot, foundLootTwo, checkCurrentSelected, skillId;

                                      return _regenerator["default"].wrap(function _callee9$(_context9) {
                                        while (1) {
                                          switch (_context9.prev = _context9.next) {
                                            case 0:
                                              sumExp = 0;
                                              previousBattleState = battle;
                                              previousBattleState = JSON.stringify(previousBattleState);
                                              previousBattleState = JSON.parse(previousBattleState);
                                              previousUserState = userCurrentCharacter;
                                              previousUserState = JSON.stringify(previousUserState);
                                              previousUserState = JSON.parse(previousUserState);

                                              if (!interaction.isButton()) {
                                                _context9.next = 153;
                                                break;
                                              }

                                              _context9.next = 10;
                                              return interaction.deferUpdate();

                                            case 10:
                                              if (!interaction.customId.startsWith('lootItem:')) {
                                                _context9.next = 62;
                                                break;
                                              }

                                              itemId = Number(interaction.customId.replace("lootItem:", ""));
                                              findItemToLoot = newLoot.find(function (x) {
                                                return x.id === itemId;
                                              });

                                              if (findItemToLoot) {
                                                _context9.next = 17;
                                                break;
                                              }

                                              _context9.next = 16;
                                              return interaction.reply({
                                                content: "<@".concat(interaction.user.id, ">, We didn't find this item for you to loot!"),
                                                ephemeral: true
                                              });

                                            case 16:
                                              return _context9.abrupt("return");

                                            case 17:
                                              _context9.next = 19;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: findItemToLoot.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 19:
                                              findItemInDB = _context9.sent;

                                              if (!findItemInDB.inventoryId) {
                                                _context9.next = 24;
                                                break;
                                              }

                                              _context9.next = 23;
                                              return interaction.followUp({
                                                content: "<@".concat(interaction.user.id, ">, Item was already looted!"),
                                                ephemeral: true
                                              });

                                            case 23:
                                              return _context9.abrupt("return");

                                            case 24:
                                              _context9.next = 26;
                                              return findItemInDB.update({
                                                inventoryId: userCurrentCharacter.inventoryId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 26:
                                              newLoot = newLoot.filter(function (data) {
                                                return data.id !== itemId;
                                              });
                                              _context9.t0 = interaction;
                                              _context9.t1 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context9.next = 31;
                                              return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                            case 31:
                                              _context9.t3 = _context9.sent;
                                              _context9.t2 = [_context9.t3];
                                              _context9.t4 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context9.next = 40;
                                                break;
                                              }

                                              _context9.next = 37;
                                              return generateLootImagesArray(newLoot);

                                            case 37:
                                              _context9.t5 = _context9.sent;
                                              _context9.next = 41;
                                              break;

                                            case 40:
                                              _context9.t5 = [];

                                            case 41:
                                              _context9.t6 = _context9.t5;
                                              _context9.t7 = (0, _context9.t4)(_context9.t6);
                                              _context9.t8 = _context9.t2.concat.call(_context9.t2, _context9.t7);
                                              _context9.t9 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context9.next = 55;
                                                break;
                                              }

                                              _context9.t11 = _discord.MessageActionRow;
                                              _context9.next = 49;
                                              return generateLootItemButtonArray(newLoot);

                                            case 49:
                                              _context9.t12 = _context9.sent;
                                              _context9.t13 = {
                                                components: _context9.t12
                                              };
                                              _context9.t14 = new _context9.t11(_context9.t13);
                                              _context9.t10 = [_context9.t14];
                                              _context9.next = 56;
                                              break;

                                            case 55:
                                              _context9.t10 = [];

                                            case 56:
                                              _context9.t15 = _context9.t10;
                                              _context9.t16 = (0, _context9.t9)(_context9.t15);
                                              _context9.t17 = {
                                                content: _context9.t1,
                                                files: _context9.t8,
                                                components: _context9.t16
                                              };
                                              _context9.next = 61;
                                              return _context9.t0.editReply.call(_context9.t0, _context9.t17);

                                            case 61:
                                              return _context9.abrupt("return");

                                            case 62:
                                              _context9.next = 64;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 64:
                                              userCurrentCharacter = _context9.sent;
                                              _context9.next = 67;
                                              return interaction.editReply({
                                                content: "<@".concat(userCurrentCharacter.user.user_id, ">"),
                                                embeds: [loadingBattleMoveEmbed],
                                                components: []
                                              });

                                            case 67:
                                              if (!(userCurrentCharacter.condition.life < 1)) {
                                                _context9.next = 79;
                                                break;
                                              }

                                              _context9.t18 = interaction;
                                              _context9.t19 = [];
                                              _context9.next = 72;
                                              return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                            case 72:
                                              _context9.t20 = _context9.sent;
                                              _context9.t21 = [_context9.t20];
                                              _context9.t22 = [];
                                              _context9.t23 = {
                                                embeds: _context9.t19,
                                                files: _context9.t21,
                                                components: _context9.t22
                                              };
                                              _context9.next = 78;
                                              return _context9.t18.editReply.call(_context9.t18, _context9.t23);

                                            case 78:
                                              return _context9.abrupt("return");

                                            case 79:
                                              if (interaction.customId.startsWith('attackMain:')) {
                                                attackUsed = 'main';
                                              }

                                              if (interaction.customId.startsWith('attackSecondary:')) {
                                                attackUsed = 'secondary';
                                              }

                                              if (battle.complete) {
                                                _context9.next = 105;
                                                break;
                                              }

                                              _context9.next = 84;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, currentSelectedMonster, attackUsed, io, queue, t);

                                            case 84:
                                              _yield$processBattleM = _context9.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 5);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              battle = _yield$processBattleM2[1];
                                              battleInfoArray = _yield$processBattleM2[2];
                                              monsterInfo = _yield$processBattleM2[3];
                                              sumExp = _yield$processBattleM2[4];

                                              if (!battle.complete) {
                                                _context9.next = 105;
                                                break;
                                              }

                                              currentSelectedMonster = null;
                                              _context9.next = 95;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.user.user_id, sumExp, 'battle', t);

                                            case 95:
                                              newExp = _context9.sent;
                                              highestLevelMob = Math.max.apply(Math, (0, _toConsumableArray2["default"])(battle.BattleMonsters.map(function (o) {
                                                return o.monster.level;
                                              })));
                                              _context9.next = 99;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 99:
                                              foundLoot = _context9.sent;

                                              if (foundLoot) {
                                                newLoot.push(foundLoot);
                                              }

                                              _context9.next = 103;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 103:
                                              foundLootTwo = _context9.sent;

                                              if (foundLootTwo) {
                                                newLoot.push(foundLootTwo);
                                              }

                                            case 105:
                                              if (!battle.complete) {
                                                _context9.next = 121;
                                                break;
                                              }

                                              _context9.t24 = interaction;
                                              _context9.t25 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context9.t26 = [];
                                              _context9.t27 = _discord.MessageAttachment;
                                              _context9.next = 112;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, battleInfoArray, monsterInfo);

                                            case 112:
                                              _context9.t28 = _context9.sent;
                                              _context9.t29 = new _context9.t27(_context9.t28, 'battle.gif');
                                              _context9.t30 = [_context9.t29];
                                              _context9.t31 = [];
                                              _context9.t32 = {
                                                content: _context9.t25,
                                                embeds: _context9.t26,
                                                files: _context9.t30,
                                                components: _context9.t31
                                              };
                                              _context9.next = 119;
                                              return _context9.t24.editReply.call(_context9.t24, _context9.t32);

                                            case 119:
                                              _context9.next = 150;
                                              break;

                                            case 121:
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
                                              _context9.t33 = interaction;
                                              _context9.t34 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context9.t35 = [];
                                              _context9.t36 = _discord.MessageAttachment;
                                              _context9.next = 130;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, battleInfoArray, monsterInfo);

                                            case 130:
                                              _context9.t37 = _context9.sent;
                                              _context9.t38 = new _context9.t36(_context9.t37, 'battle.gif');
                                              _context9.t39 = [_context9.t38];
                                              _context9.t40 = _discord.MessageActionRow;
                                              _context9.next = 136;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 136:
                                              _context9.t41 = _context9.sent;
                                              _context9.next = 139;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 139:
                                              _context9.t42 = _context9.sent;
                                              _context9.next = 142;
                                              return (0, _buttons.generateHealButton)();

                                            case 142:
                                              _context9.t43 = _context9.sent;
                                              _context9.t44 = [_context9.t41, _context9.t42, _context9.t43];
                                              _context9.t45 = {
                                                components: _context9.t44
                                              };
                                              _context9.t46 = new _context9.t40(_context9.t45);
                                              _context9.t47 = [_context9.t46].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context9.t48 = {
                                                content: _context9.t34,
                                                embeds: _context9.t35,
                                                files: _context9.t39,
                                                components: _context9.t47
                                              };
                                              _context9.next = 150;
                                              return _context9.t33.editReply.call(_context9.t33, _context9.t48);

                                            case 150:
                                              if (userCurrentCharacter.condition.life < 1) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                                                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                                                    while (1) {
                                                      switch (_context7.prev = _context7.next) {
                                                        case 0:
                                                          _context7.t0 = interaction;
                                                          _context7.t1 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                                          _context7.t2 = [];
                                                          _context7.next = 5;
                                                          return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                                        case 5:
                                                          _context7.t3 = _context7.sent;
                                                          _context7.t4 = [_context7.t3];
                                                          _context7.t5 = [];
                                                          _context7.t6 = {
                                                            content: _context7.t1,
                                                            embeds: _context7.t2,
                                                            files: _context7.t4,
                                                            components: _context7.t5
                                                          };
                                                          _context7.next = 11;
                                                          return _context7.t0.editReply.call(_context7.t0, _context7.t6);

                                                        case 11:
                                                        case "end":
                                                          return _context7.stop();
                                                      }
                                                    }
                                                  }, _callee7);
                                                })), 5000);
                                              }

                                              if (battle.complete) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                                                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                                                    while (1) {
                                                      switch (_context8.prev = _context8.next) {
                                                        case 0:
                                                          _context8.t0 = interaction;
                                                          _context8.t1 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                                          _context8.next = 4;
                                                          return battleCompleteEmbed(userCurrentCharacter, sumExp, newLoot);

                                                        case 4:
                                                          _context8.t2 = _context8.sent;
                                                          _context8.t3 = [_context8.t2];
                                                          _context8.next = 8;
                                                          return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                                        case 8:
                                                          _context8.t5 = _context8.sent;
                                                          _context8.t4 = [_context8.t5];
                                                          _context8.t6 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context8.next = 17;
                                                            break;
                                                          }

                                                          _context8.next = 14;
                                                          return generateLootImagesArray(newLoot);

                                                        case 14:
                                                          _context8.t7 = _context8.sent;
                                                          _context8.next = 18;
                                                          break;

                                                        case 17:
                                                          _context8.t7 = [];

                                                        case 18:
                                                          _context8.t8 = _context8.t7;
                                                          _context8.t9 = (0, _context8.t6)(_context8.t8);
                                                          _context8.t10 = _context8.t4.concat.call(_context8.t4, _context8.t9);
                                                          _context8.t11 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context8.next = 32;
                                                            break;
                                                          }

                                                          _context8.t13 = _discord.MessageActionRow;
                                                          _context8.next = 26;
                                                          return generateLootItemButtonArray(newLoot);

                                                        case 26:
                                                          _context8.t14 = _context8.sent;
                                                          _context8.t15 = {
                                                            components: _context8.t14
                                                          };
                                                          _context8.t16 = new _context8.t13(_context8.t15);
                                                          _context8.t12 = [_context8.t16];
                                                          _context8.next = 33;
                                                          break;

                                                        case 32:
                                                          _context8.t12 = [];

                                                        case 33:
                                                          _context8.t17 = _context8.t12;
                                                          _context8.t18 = (0, _context8.t11)(_context8.t17);
                                                          _context8.t19 = {
                                                            content: _context8.t1,
                                                            embeds: _context8.t3,
                                                            files: _context8.t10,
                                                            components: _context8.t18
                                                          };
                                                          _context8.next = 38;
                                                          return _context8.t0.editReply.call(_context8.t0, _context8.t19);

                                                        case 38:
                                                        case "end":
                                                          return _context8.stop();
                                                      }
                                                    }
                                                  }, _callee8);
                                                })), 5000);
                                              }

                                              return _context9.abrupt("return");

                                            case 153:
                                              if (!interaction.isSelectMenu()) {
                                                _context9.next = 199;
                                                break;
                                              }

                                              if (!(interaction.customId === 'select-mainSkill')) {
                                                _context9.next = 163;
                                                break;
                                              }

                                              _context9.next = 157;
                                              return interaction.deferUpdate();

                                            case 157:
                                              if (!interaction.values[0].startsWith('mainSkill:')) {
                                                _context9.next = 162;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                                              _context9.next = 161;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              skillId, // mainSkill
                                              false, // secondary skill
                                              t // t, transaction
                                              );

                                            case 161:
                                              userCurrentSelectedSkills = _context9.sent;

                                            case 162:
                                              console.log('selecting new main skill');

                                            case 163:
                                              if (!(interaction.customId === 'select-secondarySkill')) {
                                                _context9.next = 171;
                                                break;
                                              }

                                              _context9.next = 166;
                                              return interaction.deferUpdate();

                                            case 166:
                                              if (!interaction.values[0].startsWith('secondarySkill:')) {
                                                _context9.next = 171;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                                              _context9.next = 170;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              false, // mainSkill
                                              skillId, // secondary skill
                                              t // t, transaction
                                              );

                                            case 170:
                                              userCurrentSelectedSkills = _context9.sent;

                                            case 171:
                                              mainSkillMap = userCurrentSelectedSkills.UserClassSkills.reduce(function (filtered, mySkill) {
                                                if (!mySkill.skill.passive) {
                                                  var mapped = {
                                                    placeholder: 'pick a skill',
                                                    label: "Main Skill: ".concat(mySkill.skill.name),
                                                    value: "mainSkill:".concat(mySkill.id),
                                                    "default": mySkill.id === userCurrentSelectedSkills.selectedMainSkillId
                                                  };
                                                  filtered.push(mapped);
                                                }

                                                return filtered;
                                              }, []);
                                              secondarySkillMap = userCurrentSelectedSkills.UserClassSkills.reduce(function (filtered, mySkill) {
                                                if (!mySkill.skill.passive) {
                                                  var mapped = {
                                                    placeholder: 'pick a skill',
                                                    label: "Secondary Skill: ".concat(mySkill.skill.name),
                                                    value: "secondarySkill:".concat(mySkill.id),
                                                    "default": mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId
                                                  };
                                                  filtered.push(mapped);
                                                }

                                                return filtered;
                                              }, []);
                                              _context9.t49 = interaction;
                                              _context9.t50 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context9.t51 = [];
                                              _context9.t52 = _discord.MessageAttachment;
                                              _context9.next = 179;
                                              return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, monsterInfo, userInfo);

                                            case 179:
                                              _context9.t53 = _context9.sent;
                                              _context9.t54 = new _context9.t52(_context9.t53, 'battle.gif');
                                              _context9.t55 = [_context9.t54];
                                              _context9.t56 = _discord.MessageActionRow;
                                              _context9.next = 185;
                                              return (0, _buttons.generateMainSkillButton)(userCurrentSelectedSkills.selectedMainSkill);

                                            case 185:
                                              _context9.t57 = _context9.sent;
                                              _context9.next = 188;
                                              return (0, _buttons.generateSecondarySkillButton)(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 188:
                                              _context9.t58 = _context9.sent;
                                              _context9.next = 191;
                                              return (0, _buttons.generateHealButton)();

                                            case 191:
                                              _context9.t59 = _context9.sent;
                                              _context9.t60 = [_context9.t57, _context9.t58, _context9.t59];
                                              _context9.t61 = {
                                                components: _context9.t60
                                              };
                                              _context9.t62 = new _context9.t56(_context9.t61);
                                              _context9.t63 = [_context9.t62].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mob',
                                                  options: selectMonsterMap
                                                })]
                                              })] : []), [new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              }), new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              })]);
                                              _context9.t64 = {
                                                content: _context9.t50,
                                                embeds: _context9.t51,
                                                files: _context9.t55,
                                                components: _context9.t63
                                              };
                                              _context9.next = 199;
                                              return _context9.t49.editReply.call(_context9.t49, _context9.t64);

                                            case 199:
                                            case "end":
                                              return _context9.stop();
                                          }
                                        }
                                      }, _callee9);
                                    }));

                                    return function (_x13) {
                                      return _ref10.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context10.stop();
                              }
                            }
                          }, _callee10);
                        })))["catch"]( /*#__PURE__*/function () {
                          var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(err) {
                            return _regenerator["default"].wrap(function _callee11$(_context11) {
                              while (1) {
                                switch (_context11.prev = _context11.next) {
                                  case 0:
                                    console.log(err);

                                  case 1:
                                  case "end":
                                    return _context11.stop();
                                }
                              }
                            }, _callee11);
                          }));

                          return function (_x14) {
                            return _ref13.apply(this, arguments);
                          };
                        }());

                      case 84:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x10) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 101:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function discordBattle(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordBattle = discordBattle;