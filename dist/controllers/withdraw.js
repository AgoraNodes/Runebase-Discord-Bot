"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordWithdraw = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _embeds = require("../embeds");

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _validateAmount = require("../helpers/client/validateAmount");

var _userWalletExist = require("../helpers/client/userWalletExist");

var _validateWithdrawalAddress = require("../helpers/blockchain/validateWithdrawalAddress");

var _disallowWithdrawToSelf = require("../helpers/withdraw/disallowWithdrawToSelf");

var _createOrUseExternalWithdrawAddress = require("../helpers/withdraw/createOrUseExternalWithdrawAddress");

/* eslint-disable import/prefer-default-export */
var discordWithdraw = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, filteredMessage, setting, io) {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, _yield$validateAmount, _yield$validateAmount2, validAmount, activityValiateAmount, amount, _yield$validateWithdr, _yield$validateWithdr2, isInvalidAddress, isNodeOffline, failWithdrawalActivity, isMyAddressActivity, addressExternal, wallet, fee, transaction, activityCreate, discordUser, discordChannel;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'withdraw');

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
                        return (0, _validateAmount.validateAmount)(discordClient, message, t, filteredMessage[3], user, setting, 'withdraw');

                      case 11:
                        _yield$validateAmount = _context.sent;
                        _yield$validateAmount2 = (0, _slicedToArray2["default"])(_yield$validateAmount, 3);
                        validAmount = _yield$validateAmount2[0];
                        activityValiateAmount = _yield$validateAmount2[1];
                        amount = _yield$validateAmount2[2];

                        if (validAmount) {
                          _context.next = 19;
                          break;
                        }

                        activity.unshift(activityValiateAmount);
                        return _context.abrupt("return");

                      case 19:
                        _context.next = 21;
                        return (0, _validateWithdrawalAddress.validateWithdrawalAddress)(filteredMessage[2], user, t);

                      case 21:
                        _yield$validateWithdr = _context.sent;
                        _yield$validateWithdr2 = (0, _slicedToArray2["default"])(_yield$validateWithdr, 3);
                        isInvalidAddress = _yield$validateWithdr2[0];
                        isNodeOffline = _yield$validateWithdr2[1];
                        failWithdrawalActivity = _yield$validateWithdr2[2];

                        if (!isNodeOffline) {
                          _context.next = 29;
                          break;
                        }

                        _context.next = 29;
                        return message.author.send('Runebase node offline');

                      case 29:
                        if (!isInvalidAddress) {
                          _context.next = 32;
                          break;
                        }

                        _context.next = 32;
                        return message.author.send({
                          embeds: [(0, _embeds.invalidAddressMessage)(message)]
                        });

                      case 32:
                        if (!(isInvalidAddress || isNodeOffline)) {
                          _context.next = 36;
                          break;
                        }

                        if (!(message.channel.type !== _discord.ChannelType.DM)) {
                          _context.next = 36;
                          break;
                        }

                        _context.next = 36;
                        return message.channel.send({
                          embeds: [(0, _embeds.warnDirectMessage)(user.user_id, 'Withdraw')]
                        });

                      case 36:
                        if (!failWithdrawalActivity) {
                          _context.next = 39;
                          break;
                        }

                        activity.unshift(failWithdrawalActivity);
                        return _context.abrupt("return");

                      case 39:
                        _context.next = 41;
                        return (0, _disallowWithdrawToSelf.disallowWithdrawToSelf)(filteredMessage[2], user, t);

                      case 41:
                        isMyAddressActivity = _context.sent;

                        if (!isMyAddressActivity) {
                          _context.next = 50;
                          break;
                        }

                        _context.next = 45;
                        return message.author.send({
                          embeds: [(0, _embeds.unableToWithdrawToSelfMessage)(message)]
                        });

                      case 45:
                        if (!(message.channel && message.channel.type !== _discord.ChannelType.DM)) {
                          _context.next = 48;
                          break;
                        }

                        _context.next = 48;
                        return message.channel.send({
                          embeds: [(0, _embeds.warnDirectMessage)(user.user_id, 'Withdraw')]
                        });

                      case 48:
                        activity.unshift(isMyAddressActivity);
                        return _context.abrupt("return");

                      case 50:
                        _context.next = 52;
                        return (0, _createOrUseExternalWithdrawAddress.createOrUseExternalWithdrawAddress)(filteredMessage[2], user, t);

                      case 52:
                        addressExternal = _context.sent;
                        _context.next = 55;
                        return user.wallet.update({
                          available: user.wallet.available - amount,
                          locked: user.wallet.locked + amount
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 55:
                        wallet = _context.sent;
                        fee = (amount / 100 * (setting.fee / 1e2)).toFixed(0);
                        _context.next = 59;
                        return _models["default"].transaction.create({
                          addressId: wallet.address.id,
                          addressExternalId: addressExternal.id,
                          phase: 'review',
                          type: 'send',
                          to_from: filteredMessage[2],
                          amount: amount,
                          feeAmount: Number(fee),
                          userId: user.id
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 59:
                        transaction = _context.sent;
                        _context.next = 62;
                        return _models["default"].activity.create({
                          spenderId: user.id,
                          type: 'withdrawRequested',
                          amount: amount,
                          transactionId: transaction.id
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 62:
                        activityCreate = _context.sent;
                        activity.unshift(activityCreate);

                        if (!(message.type && message.type === _discord.InteractionType.ApplicationCommand)) {
                          _context.next = 80;
                          break;
                        }

                        _context.next = 67;
                        return discordClient.users.cache.get(message.user.id);

                      case 67:
                        discordUser = _context.sent;

                        if (!message.guildId) {
                          _context.next = 76;
                          break;
                        }

                        _context.next = 71;
                        return discordClient.channels.cache.get(message.channelId);

                      case 71:
                        discordChannel = _context.sent;
                        _context.next = 74;
                        return discordChannel.send({
                          embeds: [(0, _embeds.reviewMessage)(message.user.id, transaction)]
                        });

                      case 74:
                        _context.next = 78;
                        break;

                      case 76:
                        _context.next = 78;
                        return discordUser.send({
                          embeds: [(0, _embeds.reviewMessage)(message.user.id, transaction)]
                        });

                      case 78:
                        _context.next = 86;
                        break;

                      case 80:
                        if (!(message.channel.type === _discord.ChannelType.DM)) {
                          _context.next = 83;
                          break;
                        }

                        _context.next = 83;
                        return message.author.send({
                          embeds: [(0, _embeds.reviewMessage)(message.author.id, transaction)]
                        });

                      case 83:
                        if (!(message.channel && message.channel.type === _discord.ChannelType.GuildText)) {
                          _context.next = 86;
                          break;
                        }

                        _context.next = 86;
                        return message.channel.send({
                          embeds: [(0, _embeds.reviewMessage)(message.author.id, transaction)]
                        });

                      case 86:
                        t.afterCommit(function () {
                          console.log('done');
                        });

                      case 87:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
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
                          type: 'withdraw',
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
                        _logger["default"].error("Error Discord Withdraw Requested by: ".concat(message.author.id, "-").concat(message.author.username, "#").concat(message.author.discriminator, " - ").concat(err));

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
                          embeds: [(0, _embeds.cannotSendMessageUser)("Withdraw", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _embeds.cannotSendMessageUser)("Withdraw", message)]
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
                          embeds: [(0, _embeds.discordErrorMessage)("Withdraw")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _embeds.discordErrorMessage)("Withdraw")]
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

              return function (_x7) {
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

  return function discordWithdraw(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordWithdraw = discordWithdraw;