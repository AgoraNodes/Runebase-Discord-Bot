"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordHeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _embeds = require("../embeds");

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

/* eslint-disable import/prefer-default-export */
var discordHeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, io, queue, isDefered) {
    var activity, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, userWallet, embedMessage, collector;

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
            _context5.next = 12;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 12:
            _yield$testPlayerRead = _context5.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", usedDeferReply);

          case 18:
            _context5.next = 20;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.UserGroup.user.id
              }
            });

          case 20:
            userWallet = _context5.sent;
            _context5.t0 = discordChannel;
            _context5.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context5.next = 25;
            return (0, _embeds.confirmationHealMessage)(userCurrentCharacter.UserGroup.user.user_id, userWallet.available);

          case 25:
            _context5.t2 = _context5.sent;
            _context5.t3 = [_context5.t2];
            _context5.t4 = _discord.MessageActionRow;
            _context5.next = 30;
            return (0, _buttons.generateAcceptButton)();

          case 30:
            _context5.t5 = _context5.sent;
            _context5.next = 33;
            return (0, _buttons.generateDeclineButton)();

          case 33:
            _context5.t6 = _context5.sent;
            _context5.t7 = [_context5.t5, _context5.t6];
            _context5.t8 = {
              components: _context5.t7
            };
            _context5.t9 = new _context5.t4(_context5.t8);
            _context5.t10 = [_context5.t9];
            _context5.t11 = {
              content: _context5.t1,
              embeds: _context5.t3,
              components: _context5.t10
            };
            _context5.next = 41;
            return _context5.t0.send.call(_context5.t0, _context5.t11);

          case 41:
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
                        return (0, _embeds.declineHealMessage)(userCurrentCharacter.UserGroup.user.user_id);

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
                                                _context.next = 15;
                                                break;
                                              }

                                              _context.t0 = interaction;
                                              _context.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context.next = 8;
                                              return (0, _embeds.insufficientBalanceMessage)(userCurrentCharacter.UserGroup.user.user_id, 'Heal');

                                            case 8:
                                              _context.t2 = _context.sent;
                                              _context.t3 = [_context.t2];
                                              _context.t4 = [];
                                              _context.t5 = {
                                                content: _context.t1,
                                                embeds: _context.t3,
                                                components: _context.t4
                                              };
                                              _context.next = 14;
                                              return _context.t0.editReply.call(_context.t0, _context.t5);

                                            case 14:
                                              return _context.abrupt("return");

                                            case 15:
                                              _context.next = 17;
                                              return findWallet.update({
                                                available: findWallet.available - 10000000
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 17:
                                              console.log('fetch usergroupclass');
                                              _context.next = 20;
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

                                            case 20:
                                              userToUpdate = _context.sent;
                                              _context.next = 23;
                                              return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

                                            case 23:
                                              _yield$calculateChara = _context.sent;
                                              hp = _yield$calculateChara.hp;
                                              mp = _yield$calculateChara.mp;
                                              console.log('before condition update');
                                              _context.next = 29;
                                              return userToUpdate.condition.update({
                                                life: hp.max,
                                                mana: mp.max
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 29:
                                              _context.t6 = interaction;
                                              _context.t7 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context.next = 33;
                                              return (0, _embeds.healCompleteMessage)(userCurrentCharacter.UserGroup.user.user_id);

                                            case 33:
                                              _context.t8 = _context.sent;
                                              _context.t9 = [_context.t8];
                                              _context.t10 = [];
                                              _context.t11 = {
                                                content: _context.t7,
                                                embeds: _context.t9,
                                                components: _context.t10
                                              };
                                              _context.next = 39;
                                              return _context.t6.editReply.call(_context.t6, _context.t11);

                                            case 39:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee);
                                    }));

                                    return function (_x7) {
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

                                    return function (_x8) {
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

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 44:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordHeal(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordHeal = discordHeal;