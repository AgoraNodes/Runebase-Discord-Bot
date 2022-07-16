"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordHeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

/* eslint-disable import/prefer-default-export */
var discordHeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, userWallet, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            activity = [];
            _context5.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context5.sent;
            _context5.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context5.sent;
            _context5.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context5.sent;

            if (userCurrentCharacter) {
              _context5.next = 14;
              break;
            }

            _context5.next = 13;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
              ephemeral: true
            });

          case 13:
            return _context5.abrupt("return");

          case 14:
            _context5.next = 16;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.UserGroup.user.id
              }
            });

          case 16:
            userWallet = _context5.sent;
            _context5.t0 = discordChannel;
            _context5.next = 20;
            return (0, _messages.confirmationHealMessage)(userCurrentCharacter.UserGroup.user.user_id, userWallet.available);

          case 20:
            _context5.t1 = _context5.sent;
            _context5.t2 = [_context5.t1];
            _context5.t3 = _discord.MessageActionRow;
            _context5.next = 25;
            return (0, _buttons.generateAcceptButton)();

          case 25:
            _context5.t4 = _context5.sent;
            _context5.next = 28;
            return (0, _buttons.generateDeclineButton)();

          case 28:
            _context5.t5 = _context5.sent;
            _context5.t6 = [_context5.t4, _context5.t5];
            _context5.t7 = {
              components: _context5.t6
            };
            _context5.t8 = new _context5.t3(_context5.t7);
            _context5.t9 = [_context5.t8];
            _context5.t10 = {
              embeds: _context5.t2,
              components: _context5.t9
            };
            _context5.next = 36;
            return _context5.t0.send.call(_context5.t0, _context5.t10);

          case 36:
            embedMessage = _context5.sent;
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(interaction) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context4.next = 21;
                          break;
                        }

                        if (!(interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id)) {
                          _context4.next = 5;
                          break;
                        }

                        _context4.next = 4;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 4:
                        return _context4.abrupt("return");

                      case 5:
                        _context4.next = 7;
                        return interaction.deferUpdate();

                      case 7:
                        if (!(interaction.customId === 'decline')) {
                          _context4.next = 18;
                          break;
                        }

                        _context4.t0 = interaction;
                        _context4.next = 11;
                        return (0, _messages.declineHealMessage)(userCurrentCharacter.UserGroup.user.user_id);

                      case 11:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = [_context4.t1];
                        _context4.t3 = [];
                        _context4.t4 = {
                          embeds: _context4.t2,
                          components: _context4.t3
                        };
                        _context4.next = 17;
                        return _context4.t0.editReply.call(_context4.t0, _context4.t4);

                      case 17:
                        return _context4.abrupt("return");

                      case 18:
                        if (!(interaction.customId === 'accept')) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 21;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                                      var findWallet, userToUpdate, _yield$calculateChara, hp, mp;

                                      return _regenerator["default"].wrap(function _callee$(_context) {
                                        while (1) {
                                          switch (_context.prev = _context.next) {
                                            case 0:
                                              _context.next = 2;
                                              return _models["default"].wallet.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.UserGroup.user.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 2:
                                              findWallet = _context.sent;

                                              if (!(findWallet.available < 10000000)) {
                                                _context.next = 14;
                                                break;
                                              }

                                              _context.t0 = interaction;
                                              _context.next = 7;
                                              return (0, _messages.insufficientBalanceMessage)(userCurrentCharacter.UserGroup.user.user_id, 'Heal');

                                            case 7:
                                              _context.t1 = _context.sent;
                                              _context.t2 = [_context.t1];
                                              _context.t3 = [];
                                              _context.t4 = {
                                                embeds: _context.t2,
                                                components: _context.t3
                                              };
                                              _context.next = 13;
                                              return _context.t0.editReply.call(_context.t0, _context.t4);

                                            case 13:
                                              return _context.abrupt("return");

                                            case 14:
                                              _context.next = 16;
                                              return findWallet.update({
                                                available: findWallet.available - 10000000
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 16:
                                              console.log('fetch usergroupclass');
                                              _context.next = 19;
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

                                            case 19:
                                              userToUpdate = _context.sent;
                                              _context.next = 22;
                                              return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

                                            case 22:
                                              _yield$calculateChara = _context.sent;
                                              hp = _yield$calculateChara.hp;
                                              mp = _yield$calculateChara.mp;
                                              console.log('before condition update');
                                              _context.next = 28;
                                              return userToUpdate.condition.update({
                                                life: hp.max,
                                                mana: mp.max
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 28:
                                              _context.t5 = interaction;
                                              _context.t6 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">");
                                              _context.next = 32;
                                              return (0, _messages.healCompleteMessage)(userCurrentCharacter.UserGroup.user.user_id);

                                            case 32:
                                              _context.t7 = _context.sent;
                                              _context.t8 = [_context.t7];
                                              _context.t9 = [];
                                              _context.t10 = {
                                                content: _context.t6,
                                                embeds: _context.t8,
                                                components: _context.t9
                                              };
                                              _context.next = 38;
                                              return _context.t5.editReply.call(_context.t5, _context.t10);

                                            case 38:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee);
                                    }));

                                    return function (_x6) {
                                      return _ref4.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                                      return _regenerator["default"].wrap(function _callee2$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              console.log(err);
                                              _context2.prev = 1;
                                              _context2.next = 4;
                                              return _models["default"].error.create({
                                                type: 'Heal',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context2.next = 9;
                                              break;

                                            case 6:
                                              _context2.prev = 6;
                                              _context2.t0 = _context2["catch"](1);
                                              console.log(_context2.t0); // logger.error(`Error Discord: ${e}`);

                                            case 9:
                                            case "end":
                                              return _context2.stop();
                                          }
                                        }
                                      }, _callee2, null, [[1, 6]]);
                                    }));

                                    return function (_x7) {
                                      return _ref5.apply(this, arguments);
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
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        })));

                      case 21:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 39:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordHeal(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordHeal = discordHeal;