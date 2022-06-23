"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordBattle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

var _experience = require("../helpers/client/experience");

/* eslint-disable import/prefer-default-export */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var discordBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(discordClient, message, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, userCurrentSelectedSkills, battle, monster, newBattle, randomMonsterHp, mainSkillMap, secondarySkillMap, generateMainSkillButton, generateSecondarySkillButton, embedMessage, loadingEmbed, collector;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            activity = [];
            _context9.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context9.sent;
            _context9.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context9.sent;
            _context9.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context9.sent;
            _context9.next = 12;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 12:
            userCurrentSelectedSkills = _context9.sent;

            if (userCurrentCharacter) {
              _context9.next = 17;
              break;
            }

            _context9.next = 16;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 16:
            return _context9.abrupt("return");

          case 17:
            if (!(userCurrentCharacter.condition.stamina < 10)) {
              _context9.next = 28;
              break;
            }

            _context9.t0 = discordChannel;
            _context9.next = 21;
            return (0, _outOfStamina.renderOutOfStamina)(userCurrentCharacter);

          case 21:
            _context9.t1 = _context9.sent;
            _context9.t2 = [_context9.t1];
            _context9.t3 = [];
            _context9.t4 = {
              files: _context9.t2,
              components: _context9.t3
            };
            _context9.next = 27;
            return _context9.t0.send.call(_context9.t0, _context9.t4);

          case 27:
            return _context9.abrupt("return");

          case 28:
            if (!(userCurrentCharacter.condition.life < 1)) {
              _context9.next = 39;
              break;
            }

            _context9.t5 = discordChannel;
            _context9.next = 32;
            return (0, _userDied.renderUserDied)(userCurrentCharacter);

          case 32:
            _context9.t6 = _context9.sent;
            _context9.t7 = [_context9.t6];
            _context9.t8 = [];
            _context9.t9 = {
              files: _context9.t7,
              components: _context9.t8
            };
            _context9.next = 38;
            return _context9.t5.send.call(_context9.t5, _context9.t9);

          case 38:
            return _context9.abrupt("return");

          case 39:
            _context9.next = 41;
            return userCurrentCharacter.condition.update({
              stamina: userCurrentCharacter.condition.stamina - 10
            });

          case 41:
            _context9.next = 43;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 43:
            userCurrentCharacter = _context9.sent;
            _context9.next = 46;
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
            battle = _context9.sent;

            if (battle) {
              _context9.next = 60;
              break;
            }

            _context9.next = 50;
            return _models["default"].monster.findOne({
              where: {
                name: 'Zombie'
              }
            });

          case 50:
            monster = _context9.sent;
            _context9.next = 53;
            return _models["default"].battle.create({
              complete: false,
              UserClassId: userCurrentCharacter.id
            });

          case 53:
            newBattle = _context9.sent;
            randomMonsterHp = randomIntFromInterval(monster.minHp, monster.maxHp);
            _context9.next = 57;
            return _models["default"].BattleMonster.create({
              battleId: newBattle.id,
              monsterId: monster.id,
              currentHp: randomMonsterHp,
              maxHp: randomMonsterHp
            });

          case 57:
            _context9.next = 59;
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
            battle = _context9.sent;

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

            _context9.t10 = discordChannel;
            _context9.t11 = _discord.MessageAttachment;
            _context9.next = 68;
            return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, battle, userCurrentCharacter);

          case 68:
            _context9.t12 = _context9.sent;
            _context9.t13 = new _context9.t11(_context9.t12, 'battle.gif');
            _context9.t14 = [_context9.t13];
            _context9.t15 = _discord.MessageActionRow;
            _context9.next = 74;
            return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

          case 74:
            _context9.t16 = _context9.sent;
            _context9.next = 77;
            return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

          case 77:
            _context9.t17 = _context9.sent;
            _context9.t18 = [_context9.t16, _context9.t17];
            _context9.t19 = {
              components: _context9.t18
            };
            _context9.t20 = new _context9.t15(_context9.t19);
            _context9.t21 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-mainSkill',
                options: mainSkillMap
              })]
            });
            _context9.t22 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-secondarySkill',
                options: secondarySkillMap
              })]
            });
            _context9.t23 = [_context9.t20, _context9.t21, _context9.t22];
            _context9.t24 = {
              files: _context9.t14,
              components: _context9.t23
            };
            _context9.next = 87;
            return _context9.t10.send.call(_context9.t10, _context9.t24);

          case 87:
            embedMessage = _context9.sent;
            loadingEmbed = new _discord.MessageEmbed().setTitle('Battle').setDescription("".concat(userCurrentCharacter.user.username, ", Your next move is calculating.."));
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref4) {
                var discordUser = _ref4.user;
                return discordUser.id === userCurrentCharacter.user.user_id;
              }
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(interaction) {
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                          return _regenerator["default"].wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(t) {
                                      var attackId, monsterInfo, userInfo, previousBattleState, previousUserState, _yield$processBattleM, _yield$processBattleM2, newExp, skillId;

                                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                                        while (1) {
                                          switch (_context5.prev = _context5.next) {
                                            case 0:
                                              previousBattleState = battle;
                                              previousBattleState = JSON.stringify(previousBattleState);
                                              previousBattleState = JSON.parse(previousBattleState);
                                              previousUserState = userCurrentCharacter;
                                              previousUserState = JSON.stringify(previousUserState);
                                              previousUserState = JSON.parse(previousUserState);

                                              if (!interaction.isButton()) {
                                                _context5.next = 88;
                                                break;
                                              }

                                              _context5.next = 9;
                                              return interaction.deferUpdate();

                                            case 9:
                                              _context5.next = 11;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 11:
                                              userCurrentCharacter = _context5.sent;
                                              _context5.next = 14;
                                              return interaction.editReply({
                                                embeds: [loadingEmbed],
                                                components: []
                                              });

                                            case 14:
                                              if (!(userCurrentCharacter.condition.life < 1)) {
                                                _context5.next = 25;
                                                break;
                                              }

                                              _context5.t0 = interaction;
                                              _context5.next = 18;
                                              return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                            case 18:
                                              _context5.t1 = _context5.sent;
                                              _context5.t2 = [_context5.t1];
                                              _context5.t3 = [];
                                              _context5.t4 = {
                                                files: _context5.t2,
                                                components: _context5.t3
                                              };
                                              _context5.next = 24;
                                              return _context5.t0.editReply.call(_context5.t0, _context5.t4);

                                            case 24:
                                              return _context5.abrupt("return");

                                            case 25:
                                              if (interaction.customId.startsWith('mainSkill:')) {
                                                attackId = Number(interaction.customId.replace("mainSkill:", ""));
                                              }

                                              if (interaction.customId.startsWith('secondarySkill:')) {
                                                attackId = Number(interaction.customId.replace("secondarySkill:", ""));
                                              }

                                              if (battle.complete) {
                                                _context5.next = 42;
                                                break;
                                              }

                                              _context5.next = 30;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, attackId, io, queue, t);

                                            case 30:
                                              _yield$processBattleM = _context5.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 4);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              battle = _yield$processBattleM2[1];
                                              userInfo = _yield$processBattleM2[2];
                                              monsterInfo = _yield$processBattleM2[3];

                                              if (!battle.complete) {
                                                _context5.next = 42;
                                                break;
                                              }

                                              console.log('jajaja');
                                              console.log(battle.monsters[0].exp);
                                              _context5.next = 41;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.user.user_id, battle.monsters[0].exp, 'battle', t);

                                            case 41:
                                              newExp = _context5.sent;

                                            case 42:
                                              console.log('before render gif');

                                              if (!battle.complete) {
                                                _context5.next = 60;
                                                break;
                                              }

                                              console.log('complete battle');
                                              _context5.t5 = interaction;
                                              _context5.t6 = [];
                                              _context5.t7 = _discord.MessageAttachment;
                                              _context5.next = 50;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 50:
                                              _context5.t8 = _context5.sent;
                                              _context5.t9 = new _context5.t7(_context5.t8, 'battle.gif');
                                              _context5.t10 = [_context5.t9];
                                              _context5.t11 = [];
                                              _context5.t12 = {
                                                embeds: _context5.t6,
                                                files: _context5.t10,
                                                components: _context5.t11
                                              };
                                              _context5.next = 57;
                                              return _context5.t5.editReply.call(_context5.t5, _context5.t12);

                                            case 57:
                                              console.log('after complete battle');
                                              _context5.next = 85;
                                              break;

                                            case 60:
                                              console.log('uncomplete battle');
                                              _context5.t13 = interaction;
                                              _context5.t14 = [];
                                              _context5.t15 = _discord.MessageAttachment;
                                              _context5.next = 66;
                                              return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 66:
                                              _context5.t16 = _context5.sent;
                                              _context5.t17 = new _context5.t15(_context5.t16, 'battle.gif');
                                              _context5.t18 = [_context5.t17];
                                              _context5.t19 = _discord.MessageActionRow;
                                              _context5.next = 72;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 72:
                                              _context5.t20 = _context5.sent;
                                              _context5.next = 75;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 75:
                                              _context5.t21 = _context5.sent;
                                              _context5.t22 = [_context5.t20, _context5.t21];
                                              _context5.t23 = {
                                                components: _context5.t22
                                              };
                                              _context5.t24 = new _context5.t19(_context5.t23);
                                              _context5.t25 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              });
                                              _context5.t26 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              });
                                              _context5.t27 = [_context5.t24, _context5.t25, _context5.t26];
                                              _context5.t28 = {
                                                embeds: _context5.t14,
                                                files: _context5.t18,
                                                components: _context5.t27
                                              };
                                              _context5.next = 85;
                                              return _context5.t13.editReply.call(_context5.t13, _context5.t28);

                                            case 85:
                                              if (userCurrentCharacter.condition.life < 1) {
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                                                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                                                    while (1) {
                                                      switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                          _context3.t0 = interaction;
                                                          _context3.next = 3;
                                                          return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                                        case 3:
                                                          _context3.t1 = _context3.sent;
                                                          _context3.t2 = [_context3.t1];
                                                          _context3.t3 = [];
                                                          _context3.t4 = {
                                                            files: _context3.t2,
                                                            components: _context3.t3
                                                          };
                                                          _context3.next = 9;
                                                          return _context3.t0.editReply.call(_context3.t0, _context3.t4);

                                                        case 9:
                                                        case "end":
                                                          return _context3.stop();
                                                      }
                                                    }
                                                  }, _callee3);
                                                })), 5000);
                                              }

                                              if (battle.complete) {
                                                console.log(battle.monsters[0].exp);
                                                console.log('nenenen');
                                                setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                                                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                                                    while (1) {
                                                      switch (_context4.prev = _context4.next) {
                                                        case 0:
                                                          _context4.t0 = interaction;
                                                          _context4.next = 3;
                                                          return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle.monsters[0].exp);

                                                        case 3:
                                                          _context4.t1 = _context4.sent;
                                                          _context4.t2 = [_context4.t1];
                                                          _context4.t3 = [];
                                                          _context4.t4 = {
                                                            files: _context4.t2,
                                                            components: _context4.t3
                                                          };
                                                          _context4.next = 9;
                                                          return _context4.t0.editReply.call(_context4.t0, _context4.t4);

                                                        case 9:
                                                        case "end":
                                                          return _context4.stop();
                                                      }
                                                    }
                                                  }, _callee4);
                                                })), 5000);
                                              }

                                              return _context5.abrupt("return");

                                            case 88:
                                              if (!interaction.isSelectMenu()) {
                                                _context5.next = 129;
                                                break;
                                              }

                                              if (!(interaction.customId === 'select-mainSkill')) {
                                                _context5.next = 97;
                                                break;
                                              }

                                              _context5.next = 92;
                                              return interaction.deferUpdate();

                                            case 92:
                                              if (!interaction.values[0].startsWith('mainSkill:')) {
                                                _context5.next = 97;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                                              _context5.next = 96;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              skillId, // mainSkill
                                              false, // secondary skill
                                              t // t, transaction
                                              );

                                            case 96:
                                              userCurrentSelectedSkills = _context5.sent;

                                            case 97:
                                              if (!(interaction.customId === 'select-secondarySkill')) {
                                                _context5.next = 105;
                                                break;
                                              }

                                              _context5.next = 100;
                                              return interaction.deferUpdate();

                                            case 100:
                                              if (!interaction.values[0].startsWith('secondarySkill:')) {
                                                _context5.next = 105;
                                                break;
                                              }

                                              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                                              _context5.next = 104;
                                              return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                                              false, // mainSkill
                                              skillId, // secondary skill
                                              t // t, transaction
                                              );

                                            case 104:
                                              userCurrentSelectedSkills = _context5.sent;

                                            case 105:
                                              _context5.t29 = interaction;
                                              _context5.t30 = [];
                                              _context5.t31 = _discord.MessageAttachment;
                                              _context5.next = 110;
                                              return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                                            case 110:
                                              _context5.t32 = _context5.sent;
                                              _context5.t33 = new _context5.t31(_context5.t32, 'battle.gif');
                                              _context5.t34 = [_context5.t33];
                                              _context5.t35 = _discord.MessageActionRow;
                                              _context5.next = 116;
                                              return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                                            case 116:
                                              _context5.t36 = _context5.sent;
                                              _context5.next = 119;
                                              return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                                            case 119:
                                              _context5.t37 = _context5.sent;
                                              _context5.t38 = [_context5.t36, _context5.t37];
                                              _context5.t39 = {
                                                components: _context5.t38
                                              };
                                              _context5.t40 = new _context5.t35(_context5.t39);
                                              _context5.t41 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-mainSkill',
                                                  options: mainSkillMap
                                                })]
                                              });
                                              _context5.t42 = new _discord.MessageActionRow({
                                                components: [new _discord.MessageSelectMenu({
                                                  type: 'SELECT_MENU',
                                                  customId: 'select-secondarySkill',
                                                  options: secondarySkillMap
                                                })]
                                              });
                                              _context5.t43 = [_context5.t40, _context5.t41, _context5.t42];
                                              _context5.t44 = {
                                                embeds: _context5.t30,
                                                files: _context5.t34,
                                                components: _context5.t43
                                              };
                                              _context5.next = 129;
                                              return _context5.t29.editReply.call(_context5.t29, _context5.t44);

                                            case 129:
                                            case "end":
                                              return _context5.stop();
                                          }
                                        }
                                      }, _callee5);
                                    }));

                                    return function (_x8) {
                                      return _ref7.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        })))["catch"]( /*#__PURE__*/function () {
                          var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
                            return _regenerator["default"].wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    console.log(err);

                                  case 1:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7);
                          }));

                          return function (_x9) {
                            return _ref10.apply(this, arguments);
                          };
                        }());

                      case 2:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 91:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function discordBattle(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordBattle = discordBattle;