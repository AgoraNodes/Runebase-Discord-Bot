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

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _experience = require("../helpers/client/experience");

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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, row, rollDiceRecord, dateFuture, dateNow, distance, activityTpre, activityT, randomNumberOne, randomNumberTwo, firstDiceImage, secondDiceImage, canvas, ctx, attachment, expRewarded, rewardAmount, createNewDiceRecord, updateWallet, createActivity, findActivity, newExp, discordChannel;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'rollDice');

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
                        row = new _discord.MessageActionRow().addComponents(new _discord.MessageButton().setCustomId('roll').setLabel('Roll Dice').setStyle('PRIMARY'));
                        _context.next = 12;
                        return _models["default"].rollDice.findOne({
                          where: {
                            userId: user.id
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t,
                          order: [['id', 'DESC']]
                        });

                      case 12:
                        rollDiceRecord = _context.sent;
                        dateFuture = rollDiceRecord && rollDiceRecord.createdAt.getTime() + 3 * 60 * 60 * 1000; // (12 * 60 * 60 * 1000)

                        dateNow = new Date().getTime();
                        distance = dateFuture && dateFuture - dateNow;

                        if (!(distance && distance > 0)) {
                          _context.next = 27;
                          break;
                        }

                        _context.next = 19;
                        return _models["default"].activity.create({
                          type: 'rollDice_t',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 19:
                        activityTpre = _context.sent;
                        _context.next = 22;
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

                      case 22:
                        activityT = _context.sent;
                        activity.push(activityT);
                        _context.next = 26;
                        return message.channel.send({
                          embeds: [(0, _messages.rollDiceTooFastMessage)(user.user_id, distance)],
                          components: [row]
                        });

                      case 26:
                        return _context.abrupt("return");

                      case 27:
                        randomNumberOne = Math.floor(Math.random() * 6) + 1;
                        randomNumberTwo = Math.floor(Math.random() * 6) + 1;
                        _context.next = 31;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/dice', "dice-".concat(randomNumberOne, ".png")));

                      case 31:
                        firstDiceImage = _context.sent;
                        _context.next = 34;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/dice', "dice-".concat(randomNumberTwo, ".png")));

                      case 34:
                        secondDiceImage = _context.sent;
                        canvas = (0, _canvas.createCanvas)(512 + 512, 512);
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(firstDiceImage, 0, 0, 512, 512);
                        ctx.drawImage(secondDiceImage, 512, 0, 512, 512);
                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'rank.png');
                        expRewarded = 0;
                        rewardAmount = 0;

                        if (randomNumberOne === 1 && randomNumberTwo === 1) {
                          rewardAmount = 50000000;
                          expRewarded = 20;
                        } else if (randomNumberOne >= 1 && randomNumberTwo >= 1 && randomNumberOne <= 6 && randomNumberTwo <= 6) {
                          rewardAmount = 2000000 * (randomNumberOne + randomNumberTwo);
                          expRewarded = Number((0.5 * (randomNumberOne + randomNumberTwo)).toFixed(0));
                        }

                        _context.next = 45;
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

                      case 45:
                        createNewDiceRecord = _context.sent;
                        _context.next = 48;
                        return user.wallet.update({
                          available: Number(user.wallet.available) + rewardAmount
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 48:
                        updateWallet = _context.sent;
                        _context.next = 51;
                        return _models["default"].activity.create({
                          type: 'rollDice_s',
                          earnerId: user.id,
                          earner_balance: user.wallet.available + user.wallet.locked
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 51:
                        createActivity = _context.sent;
                        _context.next = 54;
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

                      case 54:
                        findActivity = _context.sent;
                        activity.unshift(findActivity);
                        _context.next = 58;
                        return (0, _experience.gainExp)(discordClient, user.user_id, expRewarded, 'rollDice', t);

                      case 58:
                        newExp = _context.sent;
                        _context.next = 61;
                        return discordClient.channels.cache.get(setting.roleDiceChannelId);

                      case 61:
                        discordChannel = _context.sent;
                        _context.next = 64;
                        return discordChannel.send({
                          files: [attachment],
                          embeds: [(0, _messages.rolledDiceMessage)(user.user_id, expRewarded, randomNumberOne, randomNumberTwo, rewardAmount)],
                          components: [row]
                        });

                      case 64:
                        t.afterCommit(function () {
                          console.log('done rollDice request');
                        });

                      case 65:
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
                var discordChannel, _discordChannel;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _models["default"].error.create({
                          type: 'rollDice',
                          error: "".concat(err)
                        });

                      case 3:
                        _context2.next = 8;
                        break;

                      case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);

                        _logger["default"].error("Error Discord: ".concat(_context2.t0));

                      case 8:
                        if (!(err.code && err.code === 50007)) {
                          _context2.next = 21;
                          break;
                        }

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context2.next = 17;
                          break;
                        }

                        _context2.next = 12;
                        return discordClient.channels.cache.get(message.channelId);

                      case 12:
                        discordChannel = _context2.sent;
                        _context2.next = 15;
                        return discordChannel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("RollDice", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 15:
                        _context2.next = 19;
                        break;

                      case 17:
                        _context2.next = 19;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("RollDice", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 19:
                        _context2.next = 31;
                        break;

                      case 21:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context2.next = 29;
                          break;
                        }

                        _context2.next = 24;
                        return discordClient.channels.cache.get(message.channelId);

                      case 24:
                        _discordChannel = _context2.sent;
                        _context2.next = 27;
                        return _discordChannel.send({
                          embeds: [(0, _messages.discordErrorMessage)("RollDice")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 27:
                        _context2.next = 31;
                        break;

                      case 29:
                        _context2.next = 31;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("RollDice")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 31:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 5]]);
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