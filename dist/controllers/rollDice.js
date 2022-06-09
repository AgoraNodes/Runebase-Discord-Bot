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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, row, rollDiceRecord, dateFuture, dateNow, distance, activityTpre, activityT, randomNumberOne, randomNumberTwo, totalResult, firstDiceImage, secondDiceImage, canvas, ctx, attachment, expRewarded, rewardAmount, createNewDiceRecord, updateWallet, createActivity, findActivity, newExp, discordChannel;

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
                        dateFuture = rollDiceRecord && rollDiceRecord.createdAt.getTime() + 3 * 60 * 60 * 1000; // (3 * 60 * 60 * 1000)

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
                        totalResult = randomNumberOne + randomNumberTwo;
                        _context.next = 32;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/dice', "dice-".concat(randomNumberOne, ".svg")));

                      case 32:
                        firstDiceImage = _context.sent;
                        _context.next = 35;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/dice', "dice-".concat(randomNumberTwo, ".svg")));

                      case 35:
                        secondDiceImage = _context.sent;
                        canvas = (0, _canvas.createCanvas)(300 + 300, 680);
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(firstDiceImage, 100, 480, 200, 200);
                        ctx.drawImage(secondDiceImage, 300, 480, 200, 200); // Content text & lines

                        ctx.fillStyle = "rgba(16, 12, 131, 0.3)";

                        if (totalResult === 2) {
                          ctx.fillRect(0, 35, 600, 40);
                        }

                        if (totalResult === 12) {
                          ctx.fillRect(0, 75, 600, 40);
                        }

                        if (totalResult === 11) {
                          ctx.fillRect(0, 115, 600, 40);
                        }

                        if (totalResult === 10) {
                          ctx.fillRect(0, 155, 600, 40);
                        }

                        if (totalResult === 9) {
                          ctx.fillRect(0, 195, 600, 40);
                        }

                        if (totalResult === 8) {
                          ctx.fillRect(0, 235, 600, 40);
                        }

                        if (totalResult === 7) {
                          ctx.fillRect(0, 275, 600, 40);
                        }

                        if (totalResult === 6) {
                          ctx.fillRect(0, 315, 600, 40);
                        }

                        if (totalResult === 5) {
                          ctx.fillRect(0, 355, 600, 40);
                        }

                        if (totalResult === 4) {
                          ctx.fillRect(0, 395, 600, 40);
                        }

                        if (totalResult === 3) {
                          ctx.fillRect(0, 435, 600, 40);
                        }

                        ctx.font = 'bold 20px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.strokeText('Result', 100, 25, 200);
                        ctx.fillText('Result', 100, 25, 200);
                        ctx.strokeText('RUNES', 300, 25, 200);
                        ctx.fillText('RUNES', 300, 25, 200);
                        ctx.strokeText('Exp', 500, 25, 200);
                        ctx.fillText('Exp', 500, 25, 200); // Draw horizontal line

                        ctx.strokeStyle = '#ccc';
                        ctx.lineWidth = 1; // 1 + 1

                        ctx.beginPath();
                        ctx.moveTo(0, 1 * 40 + 35);
                        ctx.lineTo(600, 1 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(2, 100, 1 * 40 + 25, 200);
                        ctx.fillText(2, 100, 1 * 40 + 25, 200);
                        ctx.strokeText(0.5, 300, 1 * 40 + 25, 200);
                        ctx.fillText(0.5, 300, 1 * 40 + 25, 200);
                        ctx.strokeText(20, 500, 1 * 40 + 25, 200);
                        ctx.fillText(20, 500, 1 * 40 + 25, 200); // 12

                        ctx.beginPath();
                        ctx.moveTo(0, 2 * 40 + 35);
                        ctx.lineTo(600, 2 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(12, 100, 2 * 40 + 25, 200);
                        ctx.fillText(12, 100, 2 * 40 + 25, 200);
                        ctx.strokeText(0.24, 300, 2 * 40 + 25, 200);
                        ctx.fillText(0.24, 300, 2 * 40 + 25, 200);
                        ctx.strokeText(6, 500, 2 * 40 + 25, 200);
                        ctx.fillText(6, 500, 2 * 40 + 25, 200); // 11

                        ctx.beginPath();
                        ctx.moveTo(0, 3 * 40 + 35);
                        ctx.lineTo(600, 3 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(11, 100, 3 * 40 + 25, 200);
                        ctx.fillText(11, 100, 3 * 40 + 25, 200);
                        ctx.strokeText(0.22, 300, 3 * 40 + 25, 200);
                        ctx.fillText(0.22, 300, 3 * 40 + 25, 200);
                        ctx.strokeText(6, 500, 3 * 40 + 25, 200);
                        ctx.fillText(6, 500, 3 * 40 + 25, 200); // 10

                        ctx.beginPath();
                        ctx.moveTo(0, 4 * 40 + 35);
                        ctx.lineTo(600, 4 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(10, 100, 4 * 40 + 25, 200);
                        ctx.fillText(10, 100, 4 * 40 + 25, 200);
                        ctx.strokeText(0.2, 300, 4 * 40 + 25, 200);
                        ctx.fillText(0.2, 300, 4 * 40 + 25, 200);
                        ctx.strokeText(5, 500, 4 * 40 + 25, 200);
                        ctx.fillText(5, 500, 4 * 40 + 25, 200); // 9

                        ctx.beginPath();
                        ctx.moveTo(0, 5 * 40 + 35);
                        ctx.lineTo(600, 5 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(9, 100, 5 * 40 + 25, 200);
                        ctx.fillText(9, 100, 5 * 40 + 25, 200);
                        ctx.strokeText(0.18, 300, 5 * 40 + 25, 200);
                        ctx.fillText(0.18, 300, 5 * 40 + 25, 200);
                        ctx.strokeText(5, 500, 5 * 40 + 25, 200);
                        ctx.fillText(5, 500, 5 * 40 + 25, 200); // 8

                        ctx.beginPath();
                        ctx.moveTo(0, 6 * 40 + 35);
                        ctx.lineTo(600, 6 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(8, 100, 6 * 40 + 25, 200);
                        ctx.fillText(8, 100, 6 * 40 + 25, 200);
                        ctx.strokeText(0.16, 300, 6 * 40 + 25, 200);
                        ctx.fillText(0.16, 300, 6 * 40 + 25, 200);
                        ctx.strokeText(4, 500, 6 * 40 + 25, 200);
                        ctx.fillText(4, 500, 6 * 40 + 25, 200); // 7

                        ctx.beginPath();
                        ctx.moveTo(0, 7 * 40 + 35);
                        ctx.lineTo(600, 7 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(7, 100, 7 * 40 + 25, 200);
                        ctx.fillText(7, 100, 7 * 40 + 25, 200);
                        ctx.strokeText(0.14, 300, 7 * 40 + 25, 200);
                        ctx.fillText(0.14, 300, 7 * 40 + 25, 200);
                        ctx.strokeText(4, 500, 7 * 40 + 25, 200);
                        ctx.fillText(4, 500, 7 * 40 + 25, 200); // 6

                        ctx.beginPath();
                        ctx.moveTo(0, 8 * 40 + 35);
                        ctx.lineTo(600, 8 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(6, 100, 8 * 40 + 25, 200);
                        ctx.fillText(6, 100, 8 * 40 + 25, 200);
                        ctx.strokeText(0.12, 300, 8 * 40 + 25, 200);
                        ctx.fillText(0.12, 300, 8 * 40 + 25, 200);
                        ctx.strokeText(3, 500, 8 * 40 + 25, 200);
                        ctx.fillText(3, 500, 8 * 40 + 25, 200); // 5

                        ctx.beginPath();
                        ctx.moveTo(0, 9 * 40 + 35);
                        ctx.lineTo(600, 9 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(5, 100, 9 * 40 + 25, 200);
                        ctx.fillText(5, 100, 9 * 40 + 25, 200);
                        ctx.strokeText(0.1, 300, 9 * 40 + 25, 200);
                        ctx.fillText(0.1, 300, 9 * 40 + 25, 200);
                        ctx.strokeText(3, 500, 9 * 40 + 25, 200);
                        ctx.fillText(3, 500, 9 * 40 + 25, 200); // 4

                        ctx.beginPath();
                        ctx.moveTo(0, 10 * 40 + 35);
                        ctx.lineTo(600, 10 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(4, 100, 10 * 40 + 25, 200);
                        ctx.fillText(4, 100, 10 * 40 + 25, 200);
                        ctx.strokeText(0.08, 300, 10 * 40 + 25, 200);
                        ctx.fillText(0.08, 300, 10 * 40 + 25, 200);
                        ctx.strokeText(2, 500, 10 * 40 + 25, 200);
                        ctx.fillText(2, 500, 10 * 40 + 25, 200); // 3

                        ctx.beginPath();
                        ctx.moveTo(0, 11 * 40 + 35);
                        ctx.lineTo(600, 11 * 40 + 35);
                        ctx.stroke();
                        ctx.strokeText(3, 100, 11 * 40 + 25, 200);
                        ctx.fillText(3, 100, 11 * 40 + 25, 200);
                        ctx.strokeText(0.06, 300, 11 * 40 + 25, 200);
                        ctx.fillText(0.06, 300, 11 * 40 + 25, 200);
                        ctx.strokeText(2, 500, 11 * 40 + 25, 200);
                        ctx.fillText(2, 500, 11 * 40 + 25, 200); // draw horizonal lines

                        ctx.strokeStyle = '#ccc';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(0, 1.5);
                        ctx.lineTo(600, 1.5);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(0, 35);
                        ctx.lineTo(600, 35);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(0, 480 - 1.5);
                        ctx.lineTo(600, 480 - 1.5);
                        ctx.stroke(); // draw vertical lines

                        ctx.beginPath();
                        ctx.moveTo(1.5, 0);
                        ctx.lineTo(1.5, 480);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(200, 0);
                        ctx.lineTo(200, 480);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(400, 0);
                        ctx.lineTo(400, 480);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(598.5, 0);
                        ctx.lineTo(598.5, 480);
                        ctx.stroke();
                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'rollDice.png');
                        expRewarded = 0;
                        rewardAmount = 0;

                        if (randomNumberOne === 1 && randomNumberTwo === 1) {
                          rewardAmount = 50000000;
                          expRewarded = 20;
                        } else if (randomNumberOne >= 1 && randomNumberTwo >= 1 && randomNumberOne <= 6 && randomNumberTwo <= 6) {
                          rewardAmount = 2000000 * (randomNumberOne + randomNumberTwo);
                          expRewarded = Number((0.5 * (randomNumberOne + randomNumberTwo)).toFixed(0));
                        }

                        _context.next = 211;
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

                      case 211:
                        createNewDiceRecord = _context.sent;
                        _context.next = 214;
                        return user.wallet.update({
                          available: Number(user.wallet.available) + rewardAmount
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 214:
                        updateWallet = _context.sent;
                        _context.next = 217;
                        return _models["default"].activity.create({
                          type: 'rollDice_s',
                          earnerId: user.id,
                          earner_balance: user.wallet.available + user.wallet.locked
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 217:
                        createActivity = _context.sent;
                        _context.next = 220;
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

                      case 220:
                        findActivity = _context.sent;
                        activity.unshift(findActivity);
                        _context.next = 224;
                        return (0, _experience.gainExp)(discordClient, user.user_id, expRewarded, 'rollDice', t);

                      case 224:
                        newExp = _context.sent;
                        _context.next = 227;
                        return discordClient.channels.cache.get(setting.roleDiceChannelId);

                      case 227:
                        discordChannel = _context.sent;
                        _context.next = 230;
                        return discordChannel.send({
                          files: [attachment],
                          embeds: [(0, _messages.rolledDiceMessage)(user.user_id, expRewarded, randomNumberOne, randomNumberTwo, rewardAmount)],
                          components: [row]
                        });

                      case 230:
                        t.afterCommit(function () {
                          console.log('done rollDice request');
                        });

                      case 231:
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