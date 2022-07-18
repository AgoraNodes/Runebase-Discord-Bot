"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordResetStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _embeds = require("../embeds");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

var _isUserInRealm = _interopRequireDefault(require("../helpers/realm/isUserInRealm"));

/* eslint-disable import/prefer-default-export */
var discordResetStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, io, queue, isDefered) {
    var activity, failed, usedDeferReply, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, _yield$isUserInRealm, _yield$isUserInRealm2, userWallet, totalStatsCost, embedMessage, collector;

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
            return (0, _isUserInRealm["default"])(userCurrentCharacter, discordClient, message, isDefered);

          case 20:
            _yield$isUserInRealm = _context5.sent;
            _yield$isUserInRealm2 = (0, _slicedToArray2["default"])(_yield$isUserInRealm, 2);
            failed = _yield$isUserInRealm2[0];
            usedDeferReply = _yield$isUserInRealm2[1];

            if (!failed) {
              _context5.next = 26;
              break;
            }

            return _context5.abrupt("return", usedDeferReply);

          case 26:
            _context5.next = 28;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.UserGroup.user.id
              }
            });

          case 28:
            userWallet = _context5.sent;
            totalStatsCost = new _bignumber["default"](userCurrentCharacter.stats.strength).plus(userCurrentCharacter.stats.dexterity).plus(userCurrentCharacter.stats.vitality).plus(userCurrentCharacter.stats.energy).multipliedBy(0.1);
            _context5.t0 = discordChannel;
            _context5.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context5.next = 34;
            return (0, _embeds.resetStatsConfirmationMessage)(userCurrentCharacter.UserGroup.user.user_id, userWallet.available, totalStatsCost);

          case 34:
            _context5.t2 = _context5.sent;
            _context5.t3 = [_context5.t2];
            _context5.t4 = _discord.ActionRowBuilder;
            _context5.next = 39;
            return (0, _buttons.generateAcceptButton)();

          case 39:
            _context5.t5 = _context5.sent;
            _context5.next = 42;
            return (0, _buttons.generateDeclineButton)();

          case 42:
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
            _context5.next = 50;
            return _context5.t0.send.call(_context5.t0, _context5.t11);

          case 50:
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
                        return (0, _embeds.resetStatsDeclinedMessage)(userCurrentCharacter.UserGroup.user.user_id, 'Reset Stats');

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
                                      var findWallet, userCharacterToReset, totalStatsCostUser, updatedCharacterStats, maxStamina, maxHp, maxMp;
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
                                              _context.next = 5;
                                              return (0, _character.fetchUserCurrentCharacter)(userCurrentCharacter.UserGroup.user.user_id, // user discord id
                                              false // Need inventory?
                                              );

                                            case 5:
                                              userCharacterToReset = _context.sent;
                                              totalStatsCostUser = new _bignumber["default"](userCharacterToReset.stats.strength).plus(userCharacterToReset.stats.dexterity).plus(userCharacterToReset.stats.vitality).plus(userCharacterToReset.stats.energy).multipliedBy(0.1).multipliedBy(1e8).dp(0).toNumber();
                                              console.log(totalStatsCostUser);
                                              console.log('totalCostNumber');

                                              if (!(findWallet.available < totalStatsCostUser)) {
                                                _context.next = 21;
                                                break;
                                              }

                                              _context.t0 = interaction;
                                              _context.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context.next = 14;
                                              return (0, _embeds.insufficientBalanceMessage)(userCharacterToReset.UserGroup.user.user_id, 'Reset Stats');

                                            case 14:
                                              _context.t2 = _context.sent;
                                              _context.t3 = [_context.t2];
                                              _context.t4 = [];
                                              _context.t5 = {
                                                content: _context.t1,
                                                embeds: _context.t3,
                                                components: _context.t4
                                              };
                                              _context.next = 20;
                                              return _context.t0.editReply.call(_context.t0, _context.t5);

                                            case 20:
                                              return _context.abrupt("return");

                                            case 21:
                                              _context.next = 23;
                                              return userCharacterToReset.stats.update({
                                                strength: 0,
                                                dexterity: 0,
                                                vitality: 0,
                                                energy: 0,
                                                life: 0,
                                                mana: 0,
                                                stamina: 0
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 23:
                                              updatedCharacterStats = _context.sent;
                                              console.log(userCharacterToReset);
                                              console.log(updatedCharacterStats);
                                              console.log('updatedCharacterStats');
                                              _context.next = 29;
                                              return findWallet.update({
                                                available: findWallet.available - totalStatsCostUser
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 29:
                                              maxStamina = userCharacterToReset.UserGroup.user.currentClass.stamina + userCharacterToReset.stats.stamina;
                                              maxHp = userCharacterToReset.UserGroup.user.currentClass.life + userCharacterToReset.stats.life;
                                              maxMp = userCharacterToReset.UserGroup.user.currentClass.mana + userCharacterToReset.stats.mana;

                                              if (!(userCharacterToReset.condition.mana > maxMp)) {
                                                _context.next = 35;
                                                break;
                                              }

                                              _context.next = 35;
                                              return userCharacterToReset.condition.update({
                                                mana: maxMp
                                              });

                                            case 35:
                                              if (!(userCharacterToReset.condition.life > maxHp)) {
                                                _context.next = 38;
                                                break;
                                              }

                                              _context.next = 38;
                                              return userCharacterToReset.condition.update({
                                                life: maxHp
                                              });

                                            case 38:
                                              if (!(userCharacterToReset.condition.stamina > maxStamina)) {
                                                _context.next = 41;
                                                break;
                                              }

                                              _context.next = 41;
                                              return userCharacterToReset.condition.update({
                                                stamina: maxStamina
                                              });

                                            case 41:
                                              _context.next = 43;
                                              return interaction.editReply({
                                                content: (0, _messages.playingOnRealmMessage)(userCurrentCharacter),
                                                embeds: [(0, _embeds.resetStatsCompletemessage)(userCurrentCharacter.UserGroup.user.user_id)],
                                                components: []
                                              });

                                            case 43:
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
                                                type: 'ClassSelection',
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

          case 53:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordResetStats(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordResetStats = discordResetStats;