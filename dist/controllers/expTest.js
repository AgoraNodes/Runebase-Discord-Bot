"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordExpTest = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _embeds = require("../embeds");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _experience = require("../helpers/client/experience");

/* eslint-disable import/prefer-default-export */
var discordExpTest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, io) {
    var activity;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('start exp test');
            activity = [];
            _context3.next = 4;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, newExp;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'expTest');

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
                        return (0, _experience.gainExp)(discordClient, message.author.id, 10, 'testExp', t);

                      case 11:
                        newExp = _context.sent;
                        console.log('after exp test');

                      case 13:
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
                          type: 'expTest',
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
                        _logger["default"].error("Error Discord Help Requested by: ".concat(message.author.id, "-").concat(message.author.username, "#").concat(message.author.discriminator, " - ").concat(err));

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
                          embeds: [(0, _embeds.cannotSendMessageUser)("expTest", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("expTest", message)]
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
                          embeds: [(0, _embeds.discordErrorMessage)("expTest")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _embeds.discordErrorMessage)("expTest")]
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

          case 4:
            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function discordExpTest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordExpTest = discordExpTest;