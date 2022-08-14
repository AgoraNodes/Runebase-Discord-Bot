"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordRollDice = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _embeds = require("../embeds");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _experience = require("../helpers/client/experience");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _diceResults = require("../render/dice/diceResults");

var discordRollDice = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, setting, io) {
    var activity;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activity = [];
            _context3.next = 3;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, rollDiceRecord, dateFuture, dateNow, distance, activityTpre, activityT, randomNumberOne, randomNumberTwo, totalResult, finalImage, expRewarded, rewardAmount, createNewDiceRecord, updateWallet, createActivity, findActivity, newExp, discordChannel;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, 'rollDice', t);

                      case 2:
                        _yield$userWalletExis = _context.sent;
                        _yield$userWalletExis2 = (0, _slicedToArray2["default"])(_yield$userWalletExis, 2);
                        user = _yield$userWalletExis2[0];
                        userActivity = _yield$userWalletExis2[1];

                        if (userActivity) {
                          activity.unshift(userActivity);
                        }

                        if (user) {
                          _context.next = 9;
                          break;
                        }

                        return _context.abrupt("return");

                      case 9:
                        _context.next = 11;
                        return _models["default"].rollDice.findOne({
                          where: {
                            userId: user.id
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t,
                          order: [['id', 'DESC']]
                        });

                      case 11:
                        rollDiceRecord = _context.sent;
                        dateFuture = rollDiceRecord && rollDiceRecord.createdAt.getTime() + 3 * 60 * 60 * 1000; // (3 * 60 * 60 * 1000)

                        dateNow = new Date().getTime();
                        distance = dateFuture && dateFuture - dateNow;

                        if (!(distance && distance > 0)) {
                          _context.next = 37;
                          break;
                        }

                        _context.next = 18;
                        return _models["default"].activity.create({
                          type: 'rollDice_t',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 18:
                        activityTpre = _context.sent;
                        _context.next = 21;
                        return _models["default"].activity.findOne({
                          where: {
                            id: activityTpre.id
                          },
                          include: [{
                            model: _models["default"].user,
                            as: 'earner'
                          }],
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 21:
                        activityT = _context.sent;
                        activity.push(activityT);
                        _context.t0 = message.channel;
                        _context.t1 = [(0, _embeds.rollDiceTooFastMessage)(user.user_id, distance)];
                        _context.t2 = _discord.ActionRowBuilder;
                        _context.next = 28;
                        return (0, _buttons.generateRollDiceButton)();

                      case 28:
                        _context.t3 = _context.sent;
                        _context.t4 = [_context.t3];
                        _context.t5 = {
                          components: _context.t4
                        };
                        _context.t6 = new _context.t2(_context.t5);
                        _context.t7 = [_context.t6];
                        _context.t8 = {
                          embeds: _context.t1,
                          components: _context.t7
                        };
                        _context.next = 36;
                        return _context.t0.send.call(_context.t0, _context.t8);

                      case 36:
                        return _context.abrupt("return");

                      case 37:
                        randomNumberOne = Math.floor(Math.random() * 6) + 1;
                        randomNumberTwo = Math.floor(Math.random() * 6) + 1;
                        totalResult = randomNumberOne + randomNumberTwo;
                        _context.next = 42;
                        return (0, _diceResults.renderDiceResultsImage)(randomNumberOne, randomNumberTwo, totalResult);

                      case 42:
                        finalImage = _context.sent;
                        expRewarded = 0;
                        rewardAmount = 0;

                        if (randomNumberOne === 1 && randomNumberTwo === 1) {
                          rewardAmount = 50000000;
                          expRewarded = 20;
                        } else if (randomNumberOne >= 1 && randomNumberTwo >= 1 && randomNumberOne <= 6 && randomNumberTwo <= 6) {
                          rewardAmount = 2000000 * (randomNumberOne + randomNumberTwo);
                          expRewarded = Number((0.5 * (randomNumberOne + randomNumberTwo)).toFixed(0));
                        }

                        _context.next = 48;
                        return _models["default"].rollDice.create({
                          userId: user.id,
                          diceOne: randomNumberOne,
                          diceTwo: randomNumberTwo,
                          payout: rewardAmount,
                          expRewarded: Number(expRewarded)
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 48:
                        createNewDiceRecord = _context.sent;
                        _context.next = 51;
                        return user.wallet.update({
                          available: Number(user.wallet.available) + rewardAmount
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 51:
                        updateWallet = _context.sent;
                        _context.next = 54;
                        return _models["default"].activity.create({
                          type: 'rollDice_s',
                          earnerId: user.id,
                          earner_balance: user.wallet.available + user.wallet.locked
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 54:
                        createActivity = _context.sent;
                        _context.next = 57;
                        return _models["default"].activity.findOne({
                          where: {
                            id: createActivity.id
                          },
                          include: [{
                            model: _models["default"].user,
                            as: 'earner'
                          }],
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 57:
                        findActivity = _context.sent;
                        activity.unshift(findActivity);
                        _context.next = 61;
                        return (0, _experience.gainExp)(discordClient, user.user_id, expRewarded, 'rollDice', t);

                      case 61:
                        newExp = _context.sent;
                        _context.next = 64;
                        return discordClient.channels.cache.get(setting.roleDiceChannelId);

                      case 64:
                        discordChannel = _context.sent;
                        _context.t9 = discordChannel;
                        _context.t10 = [{
                          attachment: finalImage,
                          name: 'rollDice.png'
                        }];
                        _context.t11 = [(0, _embeds.rolledDiceMessage)(user.user_id, expRewarded, randomNumberOne, randomNumberTwo, rewardAmount)];
                        _context.t12 = _discord.ActionRowBuilder;
                        _context.next = 71;
                        return (0, _buttons.generateRollDiceButton)();

                      case 71:
                        _context.t13 = _context.sent;
                        _context.t14 = [_context.t13];
                        _context.t15 = {
                          components: _context.t14
                        };
                        _context.t16 = new _context.t12(_context.t15);
                        _context.t17 = [_context.t16];
                        _context.t18 = {
                          files: _context.t10,
                          embeds: _context.t11,
                          components: _context.t17
                        };
                        _context.next = 79;
                        return _context.t9.send.call(_context.t9, _context.t18);

                      case 79:
                        t.afterCommit(function () {
                          console.log('done rollDice request');
                        });

                      case 80:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                var discordChannel;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        console.log(err);
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _models["default"].error.create({
                          type: 'rollDice',
                          error: "".concat(err)
                        });

                      case 4:
                        _context2.next = 9;
                        break;

                      case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2["catch"](1);

                        _logger["default"].error("Error Discord: ".concat(_context2.t0));

                      case 9:
                        _context2.next = 11;
                        return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

                      case 11:
                        discordChannel = _context2.sent;

                        if (!(err.code && err.code === 50007)) {
                          _context2.next = 17;
                          break;
                        }

                        _context2.next = 15;
                        return discordChannel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("RollDice", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 15:
                        _context2.next = 19;
                        break;

                      case 17:
                        _context2.next = 19;
                        return discordChannel.send({
                          embeds: [(0, _embeds.discordErrorMessage)("RollDice")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 19:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[1, 6]]);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function discordRollDice(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordRollDice = discordRollDice;