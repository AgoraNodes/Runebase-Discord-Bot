"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordBattle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var currentSelectedMonster;

var discordBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(discordClient, message, io, queue) {
    var userId, discordChannel, userCurrentCharacter, userCurrentSelectedSkills, battle, newBattle, monster, randomAmountOfMobs, mobPromises, i, randomMonsterHp, newMobPromise, mainSkillMap, secondarySkillMap, selectMonsterMap, generateMainSkillButton, generateSecondarySkillButton, embedMessage, generateLootImagesArray, generateLootItemButtonArray, loadingEmbed, battleCompleteEmbed, collector, newLoot;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 2:
            userId = _context12.sent;
            _context12.next = 5;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 5:
            discordChannel = _context12.sent;
            _context12.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context12.sent;
            _context12.next = 11;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 11:
            userCurrentSelectedSkills = _context12.sent;

            if (userCurrentCharacter) {
              _context12.next = 16;
              break;
            }

            _context12.next = 15;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 15:
            return _context12.abrupt("return");

          case 16:
            if (!(userCurrentCharacter.condition.stamina < 20)) {
              _context12.next = 27;
              break;
            }

            _context12.t0 = discordChannel;
            _context12.next = 20;
            return (0, _outOfStamina.renderOutOfStamina)(userCurrentCharacter);

          case 20:
            _context12.t1 = _context12.sent;
            _context12.t2 = [_context12.t1];
            _context12.t3 = [];
            _context12.t4 = {
              files: _context12.t2,
              components: _context12.t3
            };
            _context12.next = 26;
            return _context12.t0.send.call(_context12.t0, _context12.t4);

          case 26:
            return _context12.abrupt("return");

          case 27:
            if (!(userCurrentCharacter.condition.life < 1)) {
              _context12.next = 38;
              break;
            }

            _context12.t5 = discordChannel;
            _context12.next = 31;
            return (0, _userDied.renderUserDied)(userCurrentCharacter);

          case 31:
            _context12.t6 = _context12.sent;
            _context12.t7 = [_context12.t6];
            _context12.t8 = [];
            _context12.t9 = {
              files: _context12.t7,
              components: _context12.t8
            };
            _context12.next = 37;
            return _context12.t5.send.call(_context12.t5, _context12.t9);

          case 37:
            return _context12.abrupt("return");

          case 38:
            _context12.next = 40;
            return userCurrentCharacter.condition.update({
              stamina: userCurrentCharacter.condition.stamina - 20
            });

          case 40:
            _context12.next = 42;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 42:
            userCurrentCharacter = _context12.sent;
            _context12.next = 45;
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

          case 45:
            battle = _context12.sent;

            if (battle) {
              _context12.next = 61;
              break;
            }

            _context12.next = 49;
            return _models["default"].battle.create({
              complete: false,
              UserClassId: userCurrentCharacter.id
            });

          case 49:
            newBattle = _context12.sent;
            _context12.next = 52;
            return _models["default"].monster.findOne({
              where: {
                name: 'Zombie'
              }
            });

          case 52:
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

            _context12.next = 58;
            return Promise.all(mobPromises);

          case 58:
            _context12.next = 60;
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

          case 60:
            battle = _context12.sent;

          case 61:
            mainSkillMap = userCurrentSelectedSkills.UserClassSkills.map(function (mySkill, index) {
              return {
                placeholder: 'pick a skill',
                label: "Main Skill: ".concat(mySkill.skill.name),
                value: "mainSkill:".concat(mySkill.id),
                "default": mySkill.id === userCurrentSelectedSkills.selectedMainSkillId
              };
            });
            secondarySkillMap = userCurrentSelectedSkills.UserClassSkills.map(function (mySkill, index) {
              return {
                placeholder: 'pick a skill',
                label: "Secondary Skill: ".concat(mySkill.skill.name),
                value: "secondarySkill:".concat(mySkill.id),
                "default": mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId
              };
            });

            if (!currentSelectedMonster || currentSelectedMonster && currentSelectedMonster.currentHp < 1) {
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

            generateMainSkillButton = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(mySelectedSkill) {
                var addSkillId;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        addSkillId = "attackMain:".concat(mySelectedSkill.id);
                        return _context.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "".concat(mySelectedSkill.skill.name),
                          // emoji: '➕',
                          customId: addSkillId
                        }));

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateMainSkillButton(_x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateSecondarySkillButton = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(mySelectedSkill) {
                var addSkillId;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        addSkillId = "attackSecondary:".concat(mySelectedSkill.id);
                        return _context2.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "".concat(mySelectedSkill.skill.name),
                          // emoji: '➕',
                          customId: addSkillId
                        }));

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateSecondarySkillButton(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            _context12.t10 = discordChannel;
            _context12.t11 = _discord.MessageAttachment;
            _context12.next = 71;
            return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, battle, userCurrentCharacter, currentSelectedMonster);

          case 71:
            _context12.t12 = _context12.sent;
            _context12.t13 = new _context12.t11(_context12.t12, 'battle.gif');
            _context12.t14 = [_context12.t13];
            _context12.t15 = _discord.MessageActionRow;
            _context12.next = 77;
            return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

          case 77:
            _context12.t16 = _context12.sent;
            _context12.next = 80;
            return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

          case 80:
            _context12.t17 = _context12.sent;
            _context12.t18 = [_context12.t16, _context12.t17];
            _context12.t19 = {
              components: _context12.t18
            };
            _context12.t20 = new _context12.t15(_context12.t19);
            _context12.t21 = [_context12.t20].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
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
            _context12.t22 = {
              files: _context12.t14,
              components: _context12.t21
            };
            _context12.next = 88;
            return _context12.t10.send.call(_context12.t10, _context12.t22);

          case 88:
            embedMessage = _context12.sent;

            generateLootImagesArray = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(theLoot) {
                var lootArray, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, looot;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        lootArray = []; // eslint-disable-next-line no-restricted-syntax

                        _iteratorAbruptCompletion = false;
                        _didIteratorError = false;
                        _context3.prev = 3;
                        _iterator = _asyncIterator(theLoot);

                      case 5:
                        _context3.next = 7;
                        return _iterator.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion = !(_step = _context3.sent).done)) {
                          _context3.next = 20;
                          break;
                        }

                        looot = _step.value;
                        _context3.t0 = lootArray;
                        _context3.t1 = _discord.MessageAttachment;
                        _context3.next = 13;
                        return (0, _item.renderItemImage)(looot);

                      case 13:
                        _context3.t2 = _context3.sent;
                        _context3.t3 = "".concat(looot.id, ".png");
                        _context3.t4 = new _context3.t1(_context3.t2, _context3.t3);

                        _context3.t0.push.call(_context3.t0, _context3.t4);

                      case 17:
                        _iteratorAbruptCompletion = false;
                        _context3.next = 5;
                        break;

                      case 20:
                        _context3.next = 26;
                        break;

                      case 22:
                        _context3.prev = 22;
                        _context3.t5 = _context3["catch"](3);
                        _didIteratorError = true;
                        _iteratorError = _context3.t5;

                      case 26:
                        _context3.prev = 26;
                        _context3.prev = 27;

                        if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                          _context3.next = 31;
                          break;
                        }

                        _context3.next = 31;
                        return _iterator["return"]();

                      case 31:
                        _context3.prev = 31;

                        if (!_didIteratorError) {
                          _context3.next = 34;
                          break;
                        }

                        throw _iteratorError;

                      case 34:
                        return _context3.finish(31);

                      case 35:
                        return _context3.finish(26);

                      case 36:
                        return _context3.abrupt("return", lootArray);

                      case 37:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[3, 22, 26, 36], [27,, 31, 35]]);
              }));

              return function generateLootImagesArray(_x7) {
                return _ref4.apply(this, arguments);
              };
            }();

            generateLootItemButtonArray = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(theLoot) {
                var lootButtonArray, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, looot, addLootId;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        lootButtonArray = []; // eslint-disable-next-line no-restricted-syntax

                        _iteratorAbruptCompletion2 = false;
                        _didIteratorError2 = false;
                        _context4.prev = 3;
                        _iterator2 = _asyncIterator(theLoot);

                      case 5:
                        _context4.next = 7;
                        return _iterator2.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion2 = !(_step2 = _context4.sent).done)) {
                          _context4.next = 15;
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
                        _context4.next = 5;
                        break;

                      case 15:
                        _context4.next = 21;
                        break;

                      case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4["catch"](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context4.t0;

                      case 21:
                        _context4.prev = 21;
                        _context4.prev = 22;

                        if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
                          _context4.next = 26;
                          break;
                        }

                        _context4.next = 26;
                        return _iterator2["return"]();

                      case 26:
                        _context4.prev = 26;

                        if (!_didIteratorError2) {
                          _context4.next = 29;
                          break;
                        }

                        throw _iteratorError2;

                      case 29:
                        return _context4.finish(26);

                      case 30:
                        return _context4.finish(21);

                      case 31:
                        return _context4.abrupt("return", lootButtonArray);

                      case 32:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[3, 17, 21, 31], [22,, 26, 30]]);
              }));

              return function generateLootItemButtonArray(_x8) {
                return _ref5.apply(this, arguments);
              };
            }();

            loadingEmbed = new _discord.MessageEmbed().setTitle('Battle').setDescription("".concat(userCurrentCharacter.user.username, ", Your next move is calculating.."));

            battleCompleteEmbed = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userCurrentCharacter, expEarned, newLootC) {
                var itemString, _iteratorAbruptCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, looot;

                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        itemString = ''; // eslint-disable-next-line no-restricted-syntax

                        _iteratorAbruptCompletion3 = false;
                        _didIteratorError3 = false;
                        _context5.prev = 3;
                        _iterator3 = _asyncIterator(newLootC);

                      case 5:
                        _context5.next = 7;
                        return _iterator3.next();

                      case 7:
                        if (!(_iteratorAbruptCompletion3 = !(_step3 = _context5.sent).done)) {
                          _context5.next = 13;
                          break;
                        }

                        looot = _step3.value;
                        itemString += "\n- **".concat(looot.name, "** [").concat(looot.itemQuality.name, "]");

                      case 10:
                        _iteratorAbruptCompletion3 = false;
                        _context5.next = 5;
                        break;

                      case 13:
                        _context5.next = 19;
                        break;

                      case 15:
                        _context5.prev = 15;
                        _context5.t0 = _context5["catch"](3);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context5.t0;

                      case 19:
                        _context5.prev = 19;
                        _context5.prev = 20;

                        if (!(_iteratorAbruptCompletion3 && _iterator3["return"] != null)) {
                          _context5.next = 24;
                          break;
                        }

                        _context5.next = 24;
                        return _iterator3["return"]();

                      case 24:
                        _context5.prev = 24;

                        if (!_didIteratorError3) {
                          _context5.next = 27;
                          break;
                        }

                        throw _iteratorError3;

                      case 27:
                        return _context5.finish(24);

                      case 28:
                        return _context5.finish(19);

                      case 29:
                        return _context5.abrupt("return", new _discord.MessageEmbed().setTitle("".concat(userCurrentCharacter.user.username, " battle#").concat(battle.id, " results")).setDescription("Exp earned: **".concat(expEarned, "**\n\n").concat(newLootC.length > 0 ? "__found ".concat(newLootC.length, " ").concat(newLootC.length === 1 ? "item" : "items", "__") : "").concat(itemString)));

                      case 30:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[3, 15, 19, 29], [20,, 24, 28]]);
              }));

              return function battleCompleteEmbed(_x9, _x10, _x11) {
                return _ref6.apply(this, arguments);
              };
            }();

            collector = embedMessage.createMessageComponentCollector({});
            newLoot = [];
            collector.on('collect', /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(interaction) {
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

                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
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
                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
                          _context11.next = 10;
                          break;
                        }

                        _context11.next = 9;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 9:
                        return _context11.abrupt("return");

                      case 10:
                        if (!(interaction.isButton() && !interaction.customId.startsWith('lootItem:'))) {
                          _context11.next = 15;
                          break;
                        }

                        if (currentSelectedMonster) {
                          _context11.next = 15;
                          break;
                        }

                        _context11.next = 14;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, You need to select a monster to attack!"),
                          ephemeral: true
                        });

                      case 14:
                        return _context11.abrupt("return");

                      case 15:
                        if (!interaction.isSelectMenu()) {
                          _context11.next = 20;
                          break;
                        }

                        if (!(interaction.customId === 'select-mob')) {
                          _context11.next = 20;
                          break;
                        }

                        _context11.next = 19;
                        return interaction.deferUpdate();

                      case 19:
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

                      case 20:
                        _context11.next = 22;
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
                                      var attackUsed, battleInfoArray, monsterInfo, userInfo, sumExp, previousBattleState, previousUserState, itemId, findItemToLoot, findItemInDB, _yield$processBattleM, _yield$processBattleM2, newExp, highestLevelMob, foundLoot, foundLootTwo, checkCurrentSelected, skillId;

                                      return _regenerator["default"].wrap(function _callee8$(_context8) {
                                        while (1) {
                                          switch (_context8.prev = _context8.next) {
                                            case 0:
                                              sumExp = 0;
                                              previousBattleState = battle;
                                              previousBattleState = JSON.stringify(previousBattleState);
                                              previousBattleState = JSON.parse(previousBattleState);
                                              previousUserState = userCurrentCharacter;
                                              previousUserState = JSON.stringify(previousUserState);
                                              previousUserState = JSON.parse(previousUserState);

                                              if (!interaction.isButton()) {
                                                _context8.next = 147;
                                                break;
                                              }

                                              _context8.next = 10;
                                              return interaction.deferUpdate();

                                            case 10:
                                              if (!interaction.customId.startsWith('lootItem:')) {
                                                _context8.next = 61;
                                                break;
                                              }

                                              itemId = Number(interaction.customId.replace("lootItem:", ""));
                                              findItemToLoot = newLoot.find(function (x) {
                                                return x.id === itemId;
                                              });

                                              if (findItemToLoot) {
                                                _context8.next = 17;
                                                break;
                                              }

                                              _context8.next = 16;
                                              return interaction.reply({
                                                content: "<@".concat(interaction.user.id, ">, We didn't find this item for you to loot!"),
                                                ephemeral: true
                                              });

                                            case 16:
                                              return _context8.abrupt("return");

                                            case 17:
                                              _context8.next = 19;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: findItemToLoot.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 19:
                                              findItemInDB = _context8.sent;

                                              if (!findItemInDB.inventoryId) {
                                                _context8.next = 24;
                                                break;
                                              }

                                              _context8.next = 23;
                                              return interaction.followUp({
                                                content: "<@".concat(interaction.user.id, ">, Item was already looted!"),
                                                ephemeral: true
                                              });

                                            case 23:
                                              return _context8.abrupt("return");

                                            case 24:
                                              _context8.next = 26;
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
                                              _context8.t0 = interaction;
                                              _context8.next = 30;
                                              return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                            case 30:
                                              _context8.t2 = _context8.sent;
                                              _context8.t1 = [_context8.t2];
                                              _context8.t3 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 39;
                                                break;
                                              }

                                              _context8.next = 36;
                                              return generateLootImagesArray(newLoot);

                                            case 36:
                                              _context8.t4 = _context8.sent;
                                              _context8.next = 40;
                                              break;

                                            case 39:
                                              _context8.t4 = [];

                                            case 40:
                                              _context8.t5 = _context8.t4;
                                              _context8.t6 = (0, _context8.t3)(_context8.t5);
                                              _context8.t7 = _context8.t1.concat.call(_context8.t1, _context8.t6);
                                              _context8.t8 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 54;
                                                break;
                                              }

                                              _context8.t10 = _discord.MessageActionRow;
                                              _context8.next = 48;
                                              return generateLootItemButtonArray(newLoot);

                                            case 48:
                                              _context8.t11 = _context8.sent;
                                              _context8.t12 = {
                                                components: _context8.t11
                                              };
                                              _context8.t13 = new _context8.t10(_context8.t12);
                                              _context8.t9 = [_context8.t13];
                                              _context8.next = 55;
                                              break;

                                            case 54:
                                              _context8.t9 = [];

                                            case 55:
                                              _context8.t14 = _context8.t9;
                                              _context8.t15 = (0, _context8.t8)(_context8.t14);
                                              _context8.t16 = {
                                                files: _context8.t7,
                                                components: _context8.t15
                                              };
                                              _context8.next = 60;
                                              return _context8.t0.editReply.call(_context8.t0, _context8.t16);

                                            case 60:
                                              return _context8.abrupt("return");

                                            case 61:
                                              _context8.next = 63;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 63:
                                              userCurrentCharacter = _context8.sent;
                                              _context8.next = 66;
                                              return interaction.editReply({
                                                embeds: [loadingEmbed],
                                                components: []
                                              });

                                            case 66:
                                              if (!(userCurrentCharacter.condition.life < 1)) {
                                                _context8.next = 78;
                                                break;
                                              }

                                              _context8.t17 = interaction;
                                              _context8.t18 = [];
                                              _context8.next = 71;
                                              return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                            case 71:
                                              _context8.t19 = _context8.sent;
                                              _context8.t20 = [_context8.t19];
                                              _context8.t21 = [];
                                              _context8.t22 = {
                                                embeds: _context8.t18,
                                                files: _context8.t20,
                                                components: _context8.t21
                                              };
                                              _context8.next = 77;
                                              return _context8.t17.editReply.call(_context8.t17, _context8.t22);

                                            case 77:
                                              return _context8.abrupt("return");

                                            case 78:
                                              if (interaction.customId.startsWith('attackMain:')) {
                                                attackUsed = 'main';
                                              }

                                              if (interaction.customId.startsWith('attackSecondary:')) {
                                                attackUsed = 'secondary';
                                              }

                                              if (battle.complete) {
                                                _context8.next = 104;
                                                break;
                                              }

                                              _context8.next = 83;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, currentSelectedMonster, attackUsed, io, queue, t);

                                            case 83:
                                              _yield$processBattleM = _context8.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 5);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              battle = _yield$processBattleM2[1];
                                              battleInfoArray = _yield$processBattleM2[2];
                                              monsterInfo = _yield$processBattleM2[3];
                                              sumExp = _yield$processBattleM2[4];

                                              if (!battle.complete) {
                                                _context8.next = 104;
                                                break;
                                              }

                                              currentSelectedMonster = null;
                                              _context8.next = 94;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.user.user_id, sumExp, 'battle', t);

                                            case 94:
                                              newExp = _context8.sent;
                                              highestLevelMob = Math.max.apply(Math, (0, _toConsumableArray2["default"])(battle.BattleMonsters.map(function (o) {
                                                return o.monster.level;
                                              })));
                                              _context8.next = 98;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 98:
                                              foundLoot = _context8.sent;

                                              if (foundLoot) {
                                                newLoot.push(foundLoot);
                                              }

                                              _context8.next = 102;
                                              return (0, _generateLoot.generateLoot)(highestLevelMob);

                                            case 102:
                                              foundLootTwo = _context8.sent;

                                              if (foundLootTwo) {
                                                newLoot.push(foundLootTwo);
                                              }

                                            case 104:
                                              if (!battle.complete) {
                                                _context8.next = 119;
                                                break;
                                              }

                                              _context8.t23 = interaction;
                                              _context8.t24 = [];
                                              _context8.t25 = _discord.MessageAttachment;
                                              _context8.next = 110;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, battleInfoArray, monsterInfo);

                                            case 110:
                                              _context8.t26 = _context8.sent;
                                              _context8.t27 = new _context8.t25(_context8.t26, 'battle.gif');
                                              _context8.t28 = [_context8.t27];
                                              _context8.t29 = [];
                                              _context8.t30 = {
                                                embeds: _context8.t24,
                                                files: _context8.t28,
                                                components: _context8.t29
                                              };
                                              _context8.next = 117;
                                              return _context8.t23.editReply.call(_context8.t23, _context8.t30);

                                            case 117:
                                              _context8.next = 144;
                                              break;

                                            case 119:
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
                                              _context8.t31 = interaction;
                                              _context8.t32 = [];
                                              _context8.t33 = _discord.MessageAttachment;
                                              _context8.next = 127;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, battleInfoArray, monsterInfo);

                                            case 127:
                                              _context8.t34 = _context8.sent;
                                              _context8.t35 = new _context8.t33(_context8.t34, 'battle.gif');
                                              _context8.t36 = [_context8.t35];
                                              _context8.t37 = _discord.MessageActionRow;
                                              _context8.next = 133;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 133:
                                              _context8.t38 = _context8.sent;
                                              _context8.next = 136;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 136:
                                              _context8.t39 = _context8.sent;
                                              _context8.t40 = [_context8.t38, _context8.t39];
                                              _context8.t41 = {
                                                components: _context8.t40
                                              };
                                              _context8.t42 = new _context8.t37(_context8.t41);
                                              _context8.t43 = [_context8.t42].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
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
                                              _context8.t44 = {
                                                embeds: _context8.t32,
                                                files: _context8.t36,
                                                components: _context8.t43
                                              };
                                              _context8.next = 144;
                                              return _context8.t31.editReply.call(_context8.t31, _context8.t44);

                                            case 144:
                                              if (userCurrentCharacter.condition.life < 1) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                                                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                                                    while (1) {
                                                      switch (_context6.prev = _context6.next) {
                                                        case 0:
                                                          _context6.t0 = interaction;
                                                          _context6.t1 = [];
                                                          _context6.next = 4;
                                                          return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                                        case 4:
                                                          _context6.t2 = _context6.sent;
                                                          _context6.t3 = [_context6.t2];
                                                          _context6.t4 = [];
                                                          _context6.t5 = {
                                                            embeds: _context6.t1,
                                                            files: _context6.t3,
                                                            components: _context6.t4
                                                          };
                                                          _context6.next = 10;
                                                          return _context6.t0.editReply.call(_context6.t0, _context6.t5);

                                                        case 10:
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
                                                          _context7.next = 3;
                                                          return battleCompleteEmbed(userCurrentCharacter, sumExp, newLoot);

                                                        case 3:
                                                          _context7.t1 = _context7.sent;
                                                          _context7.t2 = [_context7.t1];
                                                          _context7.next = 7;
                                                          return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                                        case 7:
                                                          _context7.t4 = _context7.sent;
                                                          _context7.t3 = [_context7.t4];
                                                          _context7.t5 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context7.next = 16;
                                                            break;
                                                          }

                                                          _context7.next = 13;
                                                          return generateLootImagesArray(newLoot);

                                                        case 13:
                                                          _context7.t6 = _context7.sent;
                                                          _context7.next = 17;
                                                          break;

                                                        case 16:
                                                          _context7.t6 = [];

                                                        case 17:
                                                          _context7.t7 = _context7.t6;
                                                          _context7.t8 = (0, _context7.t5)(_context7.t7);
                                                          _context7.t9 = _context7.t3.concat.call(_context7.t3, _context7.t8);
                                                          _context7.t10 = _toConsumableArray2["default"];

                                                          if (!(newLoot.length > 0)) {
                                                            _context7.next = 31;
                                                            break;
                                                          }

                                                          _context7.t12 = _discord.MessageActionRow;
                                                          _context7.next = 25;
                                                          return generateLootItemButtonArray(newLoot);

                                                        case 25:
                                                          _context7.t13 = _context7.sent;
                                                          _context7.t14 = {
                                                            components: _context7.t13
                                                          };
                                                          _context7.t15 = new _context7.t12(_context7.t14);
                                                          _context7.t11 = [_context7.t15];
                                                          _context7.next = 32;
                                                          break;

                                                        case 31:
                                                          _context7.t11 = [];

                                                        case 32:
                                                          _context7.t16 = _context7.t11;
                                                          _context7.t17 = (0, _context7.t10)(_context7.t16);
                                                          _context7.t18 = {
                                                            embeds: _context7.t2,
                                                            files: _context7.t9,
                                                            components: _context7.t17
                                                          };
                                                          _context7.next = 37;
                                                          return _context7.t0.editReply.call(_context7.t0, _context7.t18);

                                                        case 37:
                                                        case "end":
                                                          return _context7.stop();
                                                      }
                                                    }
                                                  }, _callee7);
                                                })), 5000);
                                              }

                                              return _context8.abrupt("return");

                                            case 147:
                                              if (!interaction.isSelectMenu()) {
                                                _context8.next = 186;
                                                break;
                                              }

                                              if (!(interaction.customId === 'select-mainSkill')) {
                                                _context8.next = 156;
                                                break;
                                              }

                                              _context8.next = 151;
                                              return interaction.deferUpdate();

                                            case 151:
                                              if (!interaction.values[0].startsWith('mainSkill:')) {
                                                _context8.next = 156;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                                              _context8.next = 155;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              skillId, // mainSkill
                                              false, // secondary skill
                                              t // t, transaction
                                              );

                                            case 155:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 156:
                                              if (!(interaction.customId === 'select-secondarySkill')) {
                                                _context8.next = 164;
                                                break;
                                              }

                                              _context8.next = 159;
                                              return interaction.deferUpdate();

                                            case 159:
                                              if (!interaction.values[0].startsWith('secondarySkill:')) {
                                                _context8.next = 164;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                                              _context8.next = 163;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              false, // mainSkill
                                              skillId, // secondary skill
                                              t // t, transaction
                                              );

                                            case 163:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 164:
                                              _context8.t45 = interaction;
                                              _context8.t46 = [];
                                              _context8.t47 = _discord.MessageAttachment;
                                              _context8.next = 169;
                                              return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster, monsterInfo, userInfo);

                                            case 169:
                                              _context8.t48 = _context8.sent;
                                              _context8.t49 = new _context8.t47(_context8.t48, 'battle.gif');
                                              _context8.t50 = [_context8.t49];
                                              _context8.t51 = _discord.MessageActionRow;
                                              _context8.next = 175;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 175:
                                              _context8.t52 = _context8.sent;
                                              _context8.next = 178;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 178:
                                              _context8.t53 = _context8.sent;
                                              _context8.t54 = [_context8.t52, _context8.t53];
                                              _context8.t55 = {
                                                components: _context8.t54
                                              };
                                              _context8.t56 = new _context8.t51(_context8.t55);
                                              _context8.t57 = [_context8.t56].concat((0, _toConsumableArray2["default"])(selectMonsterMap && selectMonsterMap.length > 0 ? [new _discord.MessageActionRow({
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
                                              _context8.t58 = {
                                                embeds: _context8.t46,
                                                files: _context8.t50,
                                                components: _context8.t57
                                              };
                                              _context8.next = 186;
                                              return _context8.t45.editReply.call(_context8.t45, _context8.t58);

                                            case 186:
                                            case "end":
                                              return _context8.stop();
                                          }
                                        }
                                      }, _callee8);
                                    }));

                                    return function (_x13) {
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
                                    console.log(err);

                                  case 1:
                                  case "end":
                                    return _context10.stop();
                                }
                              }
                            }, _callee10);
                          }));

                          return function (_x14) {
                            return _ref12.apply(this, arguments);
                          };
                        }());

                      case 22:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x12) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 96:
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