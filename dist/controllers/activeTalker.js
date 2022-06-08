"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordActiveTalker = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _settings = _interopRequireDefault(require("../config/settings"));

var _experience = require("../helpers/client/experience");

var discordActiveTalker = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, filteredMessage, io) {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, activeTalkerRecord, validWordCount, lastSentenceArray, updatedActiveTalkerRecord, createActivity, findActivity, newExp;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'activeTalker');

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
                        return _models["default"].activeTalker.findOne({
                          where: {
                            userId: user.id,
                            createdAt: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, new Date(Date.now() - 24 * 60 * 60 * 1000))
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 11:
                        activeTalkerRecord = _context.sent;

                        if (activeTalkerRecord) {
                          _context.next = 16;
                          break;
                        }

                        _context.next = 15;
                        return _models["default"].activeTalker.create({
                          userId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 15:
                        activeTalkerRecord = _context.sent;

                      case 16:
                        validWordCount = 0;

                        if (filteredMessage.length > 0 && filteredMessage[0] && filteredMessage[0] !== _settings["default"].bot.command) {
                          lastSentenceArray = activeTalkerRecord.lastSentence ? activeTalkerRecord.lastSentence.split(' ') : [''];
                          filteredMessage.forEach(function (word) {
                            if (word.length >= 4) {
                              var findWord = lastSentenceArray.includes(word);
                              console.log(word);
                              console.log(findWord);

                              if (!findWord) {
                                validWordCount += 1;
                              }
                            }
                          });
                        }

                        console.log(validWordCount);

                        if (!(validWordCount >= 4)) {
                          _context.next = 37;
                          break;
                        }

                        console.log(filteredMessage.join(' '));
                        _context.next = 23;
                        return activeTalkerRecord.update({
                          count: activeTalkerRecord.count + 1,
                          lastSentence: filteredMessage.join(' ')
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 23:
                        updatedActiveTalkerRecord = _context.sent;

                        if (!(updatedActiveTalkerRecord.rewarded === false && updatedActiveTalkerRecord.count >= 4)) {
                          _context.next = 37;
                          break;
                        }

                        _context.next = 27;
                        return updatedActiveTalkerRecord.update({
                          rewarded: true
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 27:
                        _context.next = 29;
                        return _models["default"].activity.create({
                          type: 'activeTalker_s',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 29:
                        createActivity = _context.sent;
                        _context.next = 32;
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

                      case 32:
                        findActivity = _context.sent;
                        activity.unshift(findActivity);
                        _context.next = 36;
                        return (0, _experience.gainExp)(discordClient, user.user_id, 12, 'activeTalker', t);

                      case 36:
                        newExp = _context.sent;

                      case 37:
                        t.afterCommit(function () {
                          console.log('done activeTalker request');
                        });

                      case 38:
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
                        console.log(err);
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _models["default"].error.create({
                          type: 'activeTalker',
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
                        if (!(err.code && err.code === 50007)) {
                          _context2.next = 22;
                          break;
                        }

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context2.next = 18;
                          break;
                        }

                        _context2.next = 13;
                        return discordClient.channels.cache.get(message.channelId);

                      case 13:
                        discordChannel = _context2.sent;
                        _context2.next = 16;
                        return discordChannel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("ActiveTalker", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("ActiveTalker", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 20:
                        _context2.next = 32;
                        break;

                      case 22:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context2.next = 30;
                          break;
                        }

                        _context2.next = 25;
                        return discordClient.channels.cache.get(message.channelId);

                      case 25:
                        _discordChannel = _context2.sent;
                        _context2.next = 28;
                        return _discordChannel.send({
                          embeds: [(0, _messages.discordErrorMessage)("ActiveTalker")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("ActiveTalker")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 32:
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

  return function discordActiveTalker(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordActiveTalker = discordActiveTalker;