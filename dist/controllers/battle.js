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

var _canvas = require("canvas");

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
                var attackId, monsterInfo, userInfo, previousBattleState, previousUserState, skillId;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context8.next = 50;
                          break;
                        }

                        _context8.next = 3;
                        return interaction.deferUpdate();

                      case 3:
                        _context8.next = 5;
                        return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                        false // Need inventory?
                        );

                      case 5:
                        userCurrentCharacter = _context8.sent;
                        _context8.next = 8;
                        return interaction.editReply({
                          embeds: [loadingEmbed],
                          components: []
                        });

                      case 8:
                        if (!(userCurrentCharacter.condition.life < 1)) {
                          _context8.next = 19;
                          break;
                        }

                        _context8.t0 = interaction;
                        _context8.next = 12;
                        return (0, _userDied.renderUserDied)(userCurrentCharacter);

                      case 12:
                        _context8.t1 = _context8.sent;
                        _context8.t2 = [_context8.t1];
                        _context8.t3 = [];
                        _context8.t4 = {
                          files: _context8.t2,
                          components: _context8.t3
                        };
                        _context8.next = 18;
                        return _context8.t0.editReply.call(_context8.t0, _context8.t4);

                      case 18:
                        return _context8.abrupt("return");

                      case 19:
                        if (interaction.customId.startsWith('mainSkill:')) {
                          attackId = Number(interaction.customId.replace("mainSkill:", ""));
                        }

                        if (interaction.customId.startsWith('secondarySkill:')) {
                          attackId = Number(interaction.customId.replace("secondarySkill:", ""));
                        }

                        _context8.next = 23;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(t) {
                                      var _yield$processBattleM, _yield$processBattleM2, newExp;

                                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.next = 2;
                                              return (0, _processBattleMove.processBattleMove)(userCurrentCharacter, battle, attackId, io, queue, t);

                                            case 2:
                                              _yield$processBattleM = _context3.sent;
                                              _yield$processBattleM2 = (0, _slicedToArray2["default"])(_yield$processBattleM, 6);
                                              userCurrentCharacter = _yield$processBattleM2[0];
                                              battle = _yield$processBattleM2[1];
                                              previousBattleState = _yield$processBattleM2[2];
                                              previousUserState = _yield$processBattleM2[3];
                                              userInfo = _yield$processBattleM2[4];
                                              monsterInfo = _yield$processBattleM2[5];

                                              if (!battle.complete) {
                                                _context3.next = 14;
                                                break;
                                              }

                                              _context3.next = 13;
                                              return (0, _experience.gainExp)(discordClient, userCurrentCharacter.user.user_id, battle.monsters[0].exp, 'battle', t);

                                            case 13:
                                              newExp = _context3.sent;

                                            case 14:
                                            case "end":
                                              return _context3.stop();
                                          }
                                        }
                                      }, _callee3);
                                    }));

                                    return function (_x8) {
                                      return _ref7.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                                        while (1) {
                                          switch (_context4.prev = _context4.next) {
                                            case 0:
                                              console.log(err);

                                            case 1:
                                            case "end":
                                              return _context4.stop();
                                          }
                                        }
                                      }, _callee4);
                                    }));

                                    return function (_x9) {
                                      return _ref8.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 23:
                        _context8.t5 = interaction;
                        _context8.t6 = [];
                        _context8.t7 = _discord.MessageAttachment;
                        _context8.next = 28;
                        return (0, _battle.renderBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                      case 28:
                        _context8.t8 = _context8.sent;
                        _context8.t9 = new _context8.t7(_context8.t8, 'battle.gif');
                        _context8.t10 = [_context8.t9];
                        _context8.t11 = _discord.MessageActionRow;
                        _context8.next = 34;
                        return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                      case 34:
                        _context8.t12 = _context8.sent;
                        _context8.next = 37;
                        return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                      case 37:
                        _context8.t13 = _context8.sent;
                        _context8.t14 = [_context8.t12, _context8.t13];
                        _context8.t15 = {
                          components: _context8.t14
                        };
                        _context8.t16 = new _context8.t11(_context8.t15);
                        _context8.t17 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-mainSkill',
                            options: mainSkillMap
                          })]
                        });
                        _context8.t18 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-secondarySkill',
                            options: secondarySkillMap
                          })]
                        });
                        _context8.t19 = [_context8.t16, _context8.t17, _context8.t18];
                        _context8.t20 = {
                          embeds: _context8.t6,
                          files: _context8.t10,
                          components: _context8.t19
                        };
                        _context8.next = 47;
                        return _context8.t5.editReply.call(_context8.t5, _context8.t20);

                      case 47:
                        if (userCurrentCharacter.condition.life < 1) {
                          setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                            return _regenerator["default"].wrap(function _callee6$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    _context6.t0 = interaction;
                                    _context6.next = 3;
                                    return (0, _userDied.renderUserDied)(userCurrentCharacter);

                                  case 3:
                                    _context6.t1 = _context6.sent;
                                    _context6.t2 = [_context6.t1];
                                    _context6.t3 = [];
                                    _context6.t4 = {
                                      files: _context6.t2,
                                      components: _context6.t3
                                    };
                                    _context6.next = 9;
                                    return _context6.t0.editReply.call(_context6.t0, _context6.t4);

                                  case 9:
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
                                    return (0, _battleComplete.renderBattleComplete)(userCurrentCharacter, battle.monsters[0].exp);

                                  case 3:
                                    _context7.t1 = _context7.sent;
                                    _context7.t2 = [_context7.t1];
                                    _context7.t3 = [];
                                    _context7.t4 = {
                                      files: _context7.t2,
                                      components: _context7.t3
                                    };
                                    _context7.next = 9;
                                    return _context7.t0.editReply.call(_context7.t0, _context7.t4);

                                  case 9:
                                  case "end":
                                    return _context7.stop();
                                }
                              }
                            }, _callee7);
                          })), 5000);
                        }

                        return _context8.abrupt("return");

                      case 50:
                        if (!interaction.isSelectMenu()) {
                          _context8.next = 91;
                          break;
                        }

                        if (!(interaction.customId === 'select-mainSkill')) {
                          _context8.next = 59;
                          break;
                        }

                        _context8.next = 54;
                        return interaction.deferUpdate();

                      case 54:
                        if (!interaction.values[0].startsWith('mainSkill:')) {
                          _context8.next = 59;
                          break;
                        }

                        skillId = Number(interaction.values[0].replace('mainSkill:', ''));
                        _context8.next = 58;
                        return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                        skillId, // mainSkill
                        false, // secondary skill
                        false // t, transaction
                        );

                      case 58:
                        userCurrentSelectedSkills = _context8.sent;

                      case 59:
                        if (!(interaction.customId === 'select-secondarySkill')) {
                          _context8.next = 67;
                          break;
                        }

                        _context8.next = 62;
                        return interaction.deferUpdate();

                      case 62:
                        if (!interaction.values[0].startsWith('secondarySkill:')) {
                          _context8.next = 67;
                          break;
                        }

                        skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
                        _context8.next = 66;
                        return (0, _updateSelectedSkills.updateUserCurrentSelectedSkills)(userId, // Discord User id
                        false, // mainSkill
                        skillId, // secondary skill
                        false // t, transaction
                        );

                      case 66:
                        userCurrentSelectedSkills = _context8.sent;

                      case 67:
                        _context8.t21 = interaction;
                        _context8.t22 = [];
                        _context8.t23 = _discord.MessageAttachment;
                        _context8.next = 72;
                        return (0, _initBattle.renderInitBattleGif)(userCurrentCharacter, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, monsterInfo, userInfo);

                      case 72:
                        _context8.t24 = _context8.sent;
                        _context8.t25 = new _context8.t23(_context8.t24, 'battle.gif');
                        _context8.t26 = [_context8.t25];
                        _context8.t27 = _discord.MessageActionRow;
                        _context8.next = 78;
                        return generateMainSkillButton(userCurrentSelectedSkills.selectedMainSkill);

                      case 78:
                        _context8.t28 = _context8.sent;
                        _context8.next = 81;
                        return generateSecondarySkillButton(userCurrentSelectedSkills.selectedSecondarySkill);

                      case 81:
                        _context8.t29 = _context8.sent;
                        _context8.t30 = [_context8.t28, _context8.t29];
                        _context8.t31 = {
                          components: _context8.t30
                        };
                        _context8.t32 = new _context8.t27(_context8.t31);
                        _context8.t33 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-mainSkill',
                            options: mainSkillMap
                          })]
                        });
                        _context8.t34 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-secondarySkill',
                            options: secondarySkillMap
                          })]
                        });
                        _context8.t35 = [_context8.t32, _context8.t33, _context8.t34];
                        _context8.t36 = {
                          embeds: _context8.t22,
                          files: _context8.t26,
                          components: _context8.t35
                        };
                        _context8.next = 91;
                        return _context8.t21.editReply.call(_context8.t21, _context8.t36);

                      case 91:
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