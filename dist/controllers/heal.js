"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordHeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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

/* eslint-disable import/prefer-default-export */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var discordHeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(discordClient, message, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, userCurrentSelectedSkills, generateAcceptHealButton, generateDeclineHealButton, confirmationEmbed, declineHealEmbed, notEnoughBalance, healCompleteEmebed, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            activity = [];
            _context7.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context7.sent;
            _context7.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context7.sent;
            _context7.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context7.sent;
            _context7.next = 12;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(userId);

          case 12:
            userCurrentSelectedSkills = _context7.sent;

            generateAcceptHealButton = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(mySelectedSkill) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Accept",
                          // emoji: '➕',
                          customId: 'accept'
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateAcceptHealButton(_x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateDeclineHealButton = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(mySelectedSkill) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Decline",
                          // emoji: '➕',
                          customId: 'decline'
                        }));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateDeclineHealButton(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            confirmationEmbed = new _discord.MessageEmbed().setTitle('Heal').setDescription('Healing costs 0.1 RUNES, Are you sure you want to heal?');
            declineHealEmbed = new _discord.MessageEmbed().setTitle('Heal').setDescription("".concat(userCurrentCharacter.user.username, " declined heal"));
            notEnoughBalance = new _discord.MessageEmbed().setTitle('Heal').setDescription("".concat(userCurrentCharacter.user.username, ", insufficient balance"));
            healCompleteEmebed = new _discord.MessageEmbed().setTitle('Heal').setDescription("\uD83D\uDC8B Freyja has kissed <@".concat(userCurrentCharacter.user.user_id, ">. \uD83D\uDC8B\n<@").concat(userCurrentCharacter.user.user_id, "> is now Healed!"));
            _context7.t0 = discordChannel;
            _context7.t1 = [confirmationEmbed];
            _context7.t2 = _discord.MessageActionRow;
            _context7.next = 24;
            return generateAcceptHealButton();

          case 24:
            _context7.t3 = _context7.sent;
            _context7.next = 27;
            return generateDeclineHealButton();

          case 27:
            _context7.t4 = _context7.sent;
            _context7.t5 = [_context7.t3, _context7.t4];
            _context7.t6 = {
              components: _context7.t5
            };
            _context7.t7 = new _context7.t2(_context7.t6);
            _context7.t8 = [_context7.t7];
            _context7.t9 = {
              embeds: _context7.t1,
              components: _context7.t8
            };
            _context7.next = 35;
            return _context7.t0.send.call(_context7.t0, _context7.t9);

          case 35:
            embedMessage = _context7.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref4) {
                var discordUser = _ref4.user;
                return discordUser.id === userCurrentCharacter.user.user_id;
              }
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(interaction) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context6.next = 10;
                          break;
                        }

                        _context6.next = 3;
                        return interaction.deferUpdate();

                      case 3:
                        if (!(interaction.customId === 'decline')) {
                          _context6.next = 7;
                          break;
                        }

                        _context6.next = 6;
                        return interaction.editReply({
                          embeds: [declineHealEmbed],
                          components: []
                        });

                      case 6:
                        return _context6.abrupt("return");

                      case 7:
                        if (!(interaction.customId === 'accept')) {
                          _context6.next = 10;
                          break;
                        }

                        _context6.next = 10;
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
                                      var findWallet, userToUpdate;
                                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.next = 2;
                                              return _models["default"].wallet.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.user.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 2:
                                              findWallet = _context3.sent;

                                              if (!(findWallet.available < 10000000)) {
                                                _context3.next = 7;
                                                break;
                                              }

                                              _context3.next = 6;
                                              return interaction.editReply({
                                                embeds: [notEnoughBalance],
                                                components: []
                                              });

                                            case 6:
                                              return _context3.abrupt("return");

                                            case 7:
                                              _context3.next = 9;
                                              return findWallet.update({
                                                available: findWallet.available - 10000000
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 9:
                                              _context3.next = 11;
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

                                            case 11:
                                              userToUpdate = _context3.sent;
                                              _context3.next = 14;
                                              return userToUpdate.condition.update({
                                                life: userToUpdate["class"].life + userToUpdate.stats.life,
                                                mana: userToUpdate["class"].mana + userToUpdate.stats.mana
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 14:
                                              _context3.next = 16;
                                              return interaction.editReply({
                                                content: "<@".concat(userCurrentCharacter.user.user_id, ">"),
                                                embeds: [healCompleteEmebed],
                                                components: []
                                              });

                                            case 16:
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
                                              _context4.prev = 1;
                                              _context4.next = 4;
                                              return _models["default"].error.create({
                                                type: 'ClassSelection',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context4.next = 9;
                                              break;

                                            case 6:
                                              _context4.prev = 6;
                                              _context4.t0 = _context4["catch"](1);
                                              console.log(_context4.t0); // logger.error(`Error Discord: ${e}`);

                                            case 9:
                                            case "end":
                                              return _context4.stop();
                                          }
                                        }
                                      }, _callee4, null, [[1, 6]]);
                                    }));

                                    return function (_x9) {
                                      return _ref8.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                  if (activity.length > 0) {
                                    io.to('admin').emit('updateActivity', {
                                      activity: activity
                                    });
                                  }

                                case 3:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 38:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function discordHeal(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordHeal = discordHeal;