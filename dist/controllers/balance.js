"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordBalance = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var discordBalance = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, io) {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, priceInfo, discordUser, discordChannel, createActivity, findActivity;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'balance');

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
                        return _models["default"].currency.findOne({
                          where: {
                            iso: 'USD'
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 11:
                        priceInfo = _context.sent;

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context.next = 28;
                          break;
                        }

                        _context.next = 15;
                        return discordClient.users.cache.get(message.user.id);

                      case 15:
                        discordUser = _context.sent;

                        if (!message.guildId) {
                          _context.next = 24;
                          break;
                        }

                        _context.next = 19;
                        return discordClient.channels.cache.get(message.channelId);

                      case 19:
                        discordChannel = _context.sent;
                        _context.next = 22;
                        return discordChannel.send({
                          embeds: [(0, _messages.balanceMessage)(user.user_id, user, priceInfo)]
                        });

                      case 22:
                        _context.next = 26;
                        break;

                      case 24:
                        _context.next = 26;
                        return discordUser.send({
                          embeds: [(0, _messages.balanceMessage)(user.user_id, user, priceInfo)]
                        });

                      case 26:
                        _context.next = 34;
                        break;

                      case 28:
                        if (!(message.channel.type === 'DM')) {
                          _context.next = 31;
                          break;
                        }

                        _context.next = 31;
                        return message.author.send({
                          embeds: [(0, _messages.balanceMessage)(user.user_id, user, priceInfo)]
                        });

                      case 31:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context.next = 34;
                          break;
                        }

                        _context.next = 34;
                        return message.channel.send({
                          embeds: [(0, _messages.balanceMessage)(user.user_id, user, priceInfo)]
                        });

                      case 34:
                        _context.next = 36;
                        return _models["default"].activity.create({
                          type: 'balance_s',
                          earnerId: user.id,
                          earner_balance: user.wallet.available + user.wallet.locked
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 36:
                        createActivity = _context.sent;
                        _context.next = 39;
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

                      case 39:
                        findActivity = _context.sent;
                        activity.unshift(findActivity);
                        t.afterCommit(function () {
                          console.log('done balance request');
                        });

                      case 42:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
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
                          type: 'balance',
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
                        _logger["default"].error("Error Discord Balance Requested by: ".concat(message.author.id, "-").concat(message.author.username, "#").concat(message.author.discriminator, " - ").concat(err));

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
                          embeds: [(0, _messages.cannotSendMessageUser)("Balance", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("Balance", message)]
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
                          embeds: [(0, _messages.discordErrorMessage)("Balance")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("Balance")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 32:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 5]]);
              }));

              return function (_x5) {
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

  return function discordBalance(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordBalance = discordBalance;