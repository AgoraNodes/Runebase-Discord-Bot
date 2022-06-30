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

var _noLootFound = require("../render/battle/noLootFound");

var _experience = require("../helpers/client/experience");

var _generateLoot = require("../helpers/items/generateLoot");

var _item = require("../render/item");

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var discordBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(discordClient, message, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, userCurrentSelectedSkills, battle, monster, newBattle, randomMonsterHp, mainSkillMap, secondarySkillMap, generateMainSkillButton, generateSecondarySkillButton, embedMessage, generateLootImagesArray, generateLootItemButtonArray, loadingEmbed, battleCompleteEmbed, collector, newLoot;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            activity = [];
            _context12.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context12.sent;
            _context12.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context12.sent;
            _context12.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context12.sent;
            _context12.next = 12;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 12:
            userCurrentSelectedSkills = _context12.sent;

            if (userCurrentCharacter) {
              _context12.next = 17;
              break;
            }

            _context12.next = 16;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 16:
            return _context12.abrupt("return");

          case 17:
            if (!(userCurrentCharacter.condition.stamina < 10)) {
              _context12.next = 28;
              break;
            }

            _context12.t0 = discordChannel;
            _context12.next = 21;
            return (0, _outOfStamina.renderOutOfStamina)(userCurrentCharacter);

          case 21:
            _context12.t1 = _context12.sent;
            _context12.t2 = [_context12.t1];
            _context12.t3 = [];
            _context12.t4 = {
              files: _context12.t2,
              components: _context12.t3
            };
            _context12.next = 27;
            return _context12.t0.send.call(_context12.t0, _context12.t4);

          case 27:
            return _context12.abrupt("return");

          case 28:
            if (!(userCurrentCharacter.condition.life < 1)) {
              _context12.next = 39;
              break;
            }

            _context12.t5 = discordChannel;
            _context12.next = 32;
            return (0, _userDied.renderUserDied)(userCurrentCharacter);

          case 32:
            _context12.t6 = _context12.sent;
            _context12.t7 = [_context12.t6];
            _context12.t8 = [];
            _context12.t9 = {
              files: _context12.t7,
              components: _context12.t8
            };
            _context12.next = 38;
            return _context12.t5.send.call(_context12.t5, _context12.t9);

          case 38:
            return _context12.abrupt("return");

          case 39:
            _context12.next = 41;
            return userCurrentCharacter.condition.update({
              stamina: userCurrentCharacter.condition.stamina - 10
            });

          case 41:
            _context12.next = 43;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 43:
            userCurrentCharacter = _context12.sent;
            _context12.next = 46;
            return _models["default"].battle.findOne({
              where: {
                complete: false,
                UserClassId: userCurrentCharacter.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].monster,
                as: 'monsters'
              }]
            });

          case 46:
            battle = _context12.sent;

            if (battle) {
              _context12.next = 60;
              break;
            }

            _context12.next = 50;
            return _models["default"].monster.findOne({
              where: {
                name: 'Zombie'
              }
            });

          case 50:
            monster = _context12.sent;
            _context12.next = 53;
            return _models["default"].battle.create({
              complete: false,
              UserClassId: userCurrentCharacter.id
            });

          case 53:
            newBattle = _context12.sent;
            randomMonsterHp = randomIntFromInterval(monster.minHp, monster.maxHp);
            _context12.next = 57;
            return _models["default"].BattleMonster.create({
              battleId: newBattle.id,
              monsterId: monster.id,
              currentHp: randomMonsterHp,
              maxHp: randomMonsterHp
            });

          case 57:
            _context12.next = 59;
            return _models["default"].battle.findOne({
              where: {
                id: newBattle.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].monster,
                as: 'monsters'
              }]
            });

          case 59:
            battle = _context12.sent;

          case 60:
            // console.log(battle.monsters);
            // console.log(battle.monsters[0].BattleMonster);
            // console.log('monsters');
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
            _context12.next = 68;
            return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, battle, userCurrentCharacter);

          case 68:
            _context12.t12 = _context12.sent;
            _context12.t13 = new _context12.t11(_context12.t12, 'battle.gif');
            _context12.t14 = [_context12.t13];
            _context12.t15 = _discord.MessageActionRow;
            _context12.next = 74;
            return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

          case 74:
            _context12.t16 = _context12.sent;
            _context12.next = 77;
            return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

          case 77:
            _context12.t17 = _context12.sent;
            _context12.t18 = [_context12.t16, _context12.t17];
            _context12.t19 = {
              components: _context12.t18
            };
            _context12.t20 = new _context12.t15(_context12.t19);
            _context12.t21 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-mainSkill',
                options: mainSkillMap
              })]
            });
            _context12.t22 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-secondarySkill',
                options: secondarySkillMap
              })]
            });
            _context12.t23 = [_context12.t20, _context12.t21, _context12.t22];
            _context12.t24 = {
              files: _context12.t14,
              components: _context12.t23
            };
            _context12.next = 87;
            return _context12.t10.send.call(_context12.t10, _context12.t24);

          case 87:
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

            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            newLoot = [];
            collector.on('collect', /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(interaction) {
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
                        _context11.next = 12;
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
                                      var attackUsed, monsterInfo, userInfo, previousBattleState, previousUserState, itemId, findItemToLoot, findItemInDB, _yield$processBattleM, _yield$processBattleM2, newExp, foundLoot, foundLootTwo, skillId;

                                      return _regenerator["default"].wrap(function _callee8$(_context8) {
                                        while (1) {
                                          switch (_context8.prev = _context8.next) {
                                            case 0:
                                              previousBattleState = battle;
                                              previousBattleState = JSON.stringify(previousBattleState);
                                              previousBattleState = JSON.parse(previousBattleState);
                                              previousUserState = userCurrentCharacter;
                                              previousUserState = JSON.stringify(previousUserState);
                                              previousUserState = JSON.parse(previousUserState);

                                              if (!interaction.isButton()) {
                                                _context8.next = 144;
                                                break;
                                              }

                                              _context8.next = 9;
                                              return interaction.deferUpdate();

                                            case 9:
                                              if (!interaction.customId.startsWith('lootItem:')) {
                                                _context8.next = 62;
                                                break;
                                              }

                                              itemId = Number(interaction.customId.replace("lootItem:", ""));
                                              findItemToLoot = newLoot.find(function (x) {
                                                return x.id === itemId;
                                              });

                                              if (findItemToLoot) {
                                                _context8.next = 16;
                                                break;
                                              }

                                              _context8.next = 15;
                                              return interaction.reply({
                                                content: "<@".concat(interaction.user.id, ">, We didn't find this item for you to loot!"),
                                                ephemeral: true
                                              });

                                            case 15:
                                              return _context8.abrupt("return");

                                            case 16:
                                              _context8.next = 18;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: findItemToLoot.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 18:
                                              findItemInDB = _context8.sent;
                                              console.log(findItemInDB);
                                              console.log('findItemInDB');

                                              if (!findItemInDB.inventoryId) {
                                                _context8.next = 25;
                                                break;
                                              }

                                              _context8.next = 24;
                                              return interaction.followUp({
                                                content: "<@".concat(interaction.user.id, ">, Item was already looted!"),
                                                ephemeral: true
                                              });

                                            case 24:
                                              return _context8.abrupt("return");

                                            case 25:
                                              _context8.next = 27;
                                              return findItemInDB.update({
                                                inventoryId: userCurrentCharacter.inventoryId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 27:
                                              newLoot = newLoot.filter(function (data) {
                                                return data.id !== itemId;
                                              });
                                              _context8.t0 = interaction;
                                              _context8.next = 31;
                                              return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle);

                                            case 31:
                                              _context8.t2 = _context8.sent;
                                              _context8.t1 = [_context8.t2];
                                              _context8.t3 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 40;
                                                break;
                                              }

                                              _context8.next = 37;
                                              return generateLootImagesArray(newLoot);

                                            case 37:
                                              _context8.t4 = _context8.sent;
                                              _context8.next = 41;
                                              break;

                                            case 40:
                                              _context8.t4 = [];

                                            case 41:
                                              _context8.t5 = _context8.t4;
                                              _context8.t6 = (0, _context8.t3)(_context8.t5);
                                              _context8.t7 = _context8.t1.concat.call(_context8.t1, _context8.t6);
                                              _context8.t8 = _toConsumableArray2["default"];

                                              if (!(newLoot.length > 0)) {
                                                _context8.next = 55;
                                                break;
                                              }

                                              _context8.t10 = _discord.MessageActionRow;
                                              _context8.next = 49;
                                              return generateLootItemButtonArray(newLoot);

                                            case 49:
                                              _context8.t11 = _context8.sent;
                                              _context8.t12 = {
                                                components: _context8.t11
                                              };
                                              _context8.t13 = new _context8.t10(_context8.t12);
                                              _context8.t9 = [_context8.t13];
                                              _context8.next = 56;
                                              break;

                                            case 55:
                                              _context8.t9 = [];

                                            case 56:
                                              _context8.t14 = _context8.t9;
                                              _context8.t15 = (0, _context8.t8)(_context8.t14);
                                              _context8.t16 = {
                                                files: _context8.t7,
                                                components: _context8.t15
                                              };
                                              _context8.next = 61;
                                              return _context8.t0.editReply.call(_context8.t0, _context8.t16);

                                            case 61:
                                              return _context8.abrupt("return");

                                            case 62:
                                              _context8.next = 64;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 64:
                                              userCurrentCharacter = _context8.sent;
                                              _context8.next = 67;
                                              return interaction.editReply({
                                                embeds: [loadingEmbed],
                                                components: []
                                              });

                                            case 67:
                                              if (!(userCurrentCharacter.condition.life < 1)) {
                                                _context8.next = 79;
                                                break;
                                              }

                                              _context8.t17 = interaction;
                                              _context8.t18 = [];
                                              _context8.next = 72;
                                              return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                            case 72:
                                              _context8.t19 = _context8.sent;
                                              _context8.t20 = [_context8.t19];
                                              _context8.t21 = [];
                                              _context8.t22 = {
                                                embeds: _context8.t18,
                                                files: _context8.t20,
                                                components: _context8.t21
                                              };
                                              _context8.next = 78;
                                              return _context8.t17.editReply.call(_context8.t17, _context8.t22);

                                            case 78:
                                              return _context8.abrupt("return");

                                            case 79:
                                              // console.log(interaction.customId);
                                              // console.log('interaction.customId');
                                              if (interaction.customId.startsWith('attackMain:')) {
                                                attackUsed = 'main';
                                              }

                                              if (interaction.customId.startsWith('attackSecondary:')) {
                                                attackUsed = 'secondary';
                                              }

                                              if (battle.complete) {
                                                _context8.next = 102;
                                                break;
                                              }

                                              _context8.next = 84;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, attackUsed, io, queue, t);

                                            case 84:
                                              _yield$processBattleM = _context8.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 4);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              battle = _yield$processBattleM2[1];
                                              userInfo = _yield$processBattleM2[2];
                                              monsterInfo = _yield$processBattleM2[3];

                                              if (!battle.complete) {
                                                _context8.next = 102;
                                                break;
                                              }

                                              _context8.next = 93;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.user.user_id, battle.monsters[0].exp, 'battle', t);

                                            case 93:
                                              newExp = _context8.sent;
                                              _context8.next = 96;
                                              return (0, _generateLoot.generateLoot)(battle.monsters[0].level);

                                            case 96:
                                              foundLoot = _context8.sent;

                                              if (foundLoot) {
                                                newLoot.push(foundLoot);
                                              }

                                              _context8.next = 100;
                                              return (0, _generateLoot.generateLoot)(battle.monsters[0].level);

                                            case 100:
                                              foundLootTwo = _context8.sent;

                                              if (foundLootTwo) {
                                                newLoot.push(foundLootTwo);
                                              }

                                            case 102:
                                              if (!battle.complete) {
                                                _context8.next = 117;
                                                break;
                                              }

                                              _context8.t23 = interaction;
                                              _context8.t24 = [];
                                              _context8.t25 = _discord.MessageAttachment;
                                              _context8.next = 108;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 108:
                                              _context8.t26 = _context8.sent;
                                              _context8.t27 = new _context8.t25(_context8.t26, 'battle.gif');
                                              _context8.t28 = [_context8.t27];
                                              _context8.t29 = [];
                                              _context8.t30 = {
                                                embeds: _context8.t24,
                                                files: _context8.t28,
                                                components: _context8.t29
                                              };
                                              _context8.next = 115;
                                              return _context8.t23.editReply.call(_context8.t23, _context8.t30);

                                            case 115:
                                              _context8.next = 141;
                                              break;

                                            case 117:
                                              _context8.t31 = interaction;
                                              _context8.t32 = [];
                                              _context8.t33 = _discord.MessageAttachment;
                                              _context8.next = 122;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 122:
                                              _context8.t34 = _context8.sent;
                                              _context8.t35 = new _context8.t33(_context8.t34, 'battle.gif');
                                              _context8.t36 = [_context8.t35];
                                              _context8.t37 = _discord.MessageActionRow;
                                              _context8.next = 128;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 128:
                                              _context8.t38 = _context8.sent;
                                              _context8.next = 131;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 131:
                                              _context8.t39 = _context8.sent;
                                              _context8.t40 = [_context8.t38, _context8.t39];
                                              _context8.t41 = {
                                                components: _context8.t40
                                              };
                                              _context8.t42 = new _context8.t37(_context8.t41);
                                              _context8.t43 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              });
                                              _context8.t44 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              });
                                              _context8.t45 = [_context8.t42, _context8.t43, _context8.t44];
                                              _context8.t46 = {
                                                embeds: _context8.t32,
                                                files: _context8.t36,
                                                components: _context8.t45
                                              };
                                              _context8.next = 141;
                                              return _context8.t31.editReply.call(_context8.t31, _context8.t46);

                                            case 141:
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
                                                          return battleCompleteEmbed(userCurrentCharacter, battle.monsters[0].exp, newLoot);

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

                                            case 144:
                                              if (!interaction.isSelectMenu()) {
                                                _context8.next = 185;
                                                break;
                                              }

                                              if (!(interaction.customId === 'select-mainSkill')) {
                                                _context8.next = 153;
                                                break;
                                              }

                                              _context8.next = 148;
                                              return interaction.deferUpdate();

                                            case 148:
                                              if (!interaction.values[0].startsWith('mainSkill:')) {
                                                _context8.next = 153;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                                              _context8.next = 152;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              skillId, // mainSkill
                                              false, // secondary skill
                                              t // t, transaction
                                              );

                                            case 152:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 153:
                                              if (!(interaction.customId === 'select-secondarySkill')) {
                                                _context8.next = 161;
                                                break;
                                              }

                                              _context8.next = 156;
                                              return interaction.deferUpdate();

                                            case 156:
                                              if (!interaction.values[0].startsWith('secondarySkill:')) {
                                                _context8.next = 161;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                                              _context8.next = 160;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              false, // mainSkill
                                              skillId, // secondary skill
                                              t // t, transaction
                                              );

                                            case 160:
                                              userCurrentSelectedSkills = _context8.sent;

                                            case 161:
                                              _context8.t47 = interaction;
                                              _context8.t48 = [];
                                              _context8.t49 = _discord.MessageAttachment;
                                              _context8.next = 166;
                                              return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 166:
                                              _context8.t50 = _context8.sent;
                                              _context8.t51 = new _context8.t49(_context8.t50, 'battle.gif');
                                              _context8.t52 = [_context8.t51];
                                              _context8.t53 = _discord.MessageActionRow;
                                              _context8.next = 172;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 172:
                                              _context8.t54 = _context8.sent;
                                              _context8.next = 175;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 175:
                                              _context8.t55 = _context8.sent;
                                              _context8.t56 = [_context8.t54, _context8.t55];
                                              _context8.t57 = {
                                                components: _context8.t56
                                              };
                                              _context8.t58 = new _context8.t53(_context8.t57);
                                              _context8.t59 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              });
                                              _context8.t60 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              });
                                              _context8.t61 = [_context8.t58, _context8.t59, _context8.t60];
                                              _context8.t62 = {
                                                embeds: _context8.t48,
                                                files: _context8.t52,
                                                components: _context8.t61
                                              };
                                              _context8.next = 185;
                                              return _context8.t47.editReply.call(_context8.t47, _context8.t62);

                                            case 185:
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

                      case 12:
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

          case 95:
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