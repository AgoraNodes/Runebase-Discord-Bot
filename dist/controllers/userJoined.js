"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordUserJoined = void 0;

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
var discordUserJoined = /*#__PURE__*/function () {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, userJoinedRecord, invitedBy, updatedInvitedBy, updatedUserJoinedRecord, newExp, preActivity, finalActivity;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, 'userJoined', t);

                      case 2:
                        _yield$userWalletExis = _context.sent;
                        _yield$userWalletExis2 = (0, _slicedToArray2["default"])(_yield$userWalletExis, 2);
                        user = _yield$userWalletExis2[0];
                        userActivity = _yield$userWalletExis2[1];

                        if (userActivity) {
                          console.log('user not found');
                          activity.unshift(userActivity);
                        }

                        if (user) {
                          _context.next = 9;
                          break;
                        }

                        return _context.abrupt("return");

                      case 9:
                        _context.next = 11;
                        return _models["default"].userJoined.findOne({
                          where: {
                            userJoinedId: user.id,
                            rewarded: false
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 11:
                        userJoinedRecord = _context.sent;

                        if (!userJoinedRecord) {
                          _context.next = 33;
                          break;
                        }

                        _context.next = 15;
                        return _models["default"].user.findOne({
                          where: {
                            id: userJoinedRecord.userInvitedById
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 15:
                        invitedBy = _context.sent;

                        if (!invitedBy) {
                          _context.next = 26;
                          break;
                        }

                        _context.next = 19;
                        return invitedBy.update({
                          totalInvitedUsersCount: invitedBy.totalInvitedUsersCount + 1
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 19:
                        updatedInvitedBy = _context.sent;
                        _context.next = 22;
                        return userJoinedRecord.update({
                          rewarded: true
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 22:
                        updatedUserJoinedRecord = _context.sent;
                        _context.next = 25;
                        return (0, _experience.gainExp)(discordClient, invitedBy.user_id, 25, 'userJoined', t, user.user_id);

                      case 25:
                        newExp = _context.sent;

                      case 26:
                        _context.next = 28;
                        return _models["default"].activity.create({
                          type: 'userJoined_s',
                          earnerId: invitedBy.id,
                          spenderId: user.id,
                          userJoinedId: userJoinedRecord.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 28:
                        preActivity = _context.sent;
                        _context.next = 31;
                        return _models["default"].activity.findOne({
                          where: {
                            id: preActivity.id
                          },
                          include: [{
                            model: _models["default"].user,
                            as: 'earner'
                          }],
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 31:
                        finalActivity = _context.sent;
                        activity.unshift(finalActivity);

                      case 33:
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
                          type: 'userJoined',
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
                          embeds: [(0, _embeds.cannotSendMessageUser)("userJoined", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 15:
                        _context2.next = 19;
                        break;

                      case 17:
                        _context2.next = 19;
                        return message.channel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("userJoined", message)]
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
                          embeds: [(0, _embeds.discordErrorMessage)("userJoined")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 27:
                        _context2.next = 31;
                        break;

                      case 29:
                        _context2.next = 31;
                        return message.channel.send({
                          embeds: [(0, _embeds.discordErrorMessage)("userJoined")]
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

  return function discordUserJoined(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordUserJoined = discordUserJoined;