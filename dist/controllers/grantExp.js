"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordGrantExp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _experience = require("../helpers/client/experience");

var _mapMembers = require("../helpers/client/mapMembers");

/* eslint-disable import/prefer-default-export */
var discordGrantExp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, filteredMessage, setting, queue, io) {
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
                var roleRequiredEmbed, notEnoughUsersEmbed, invalidAmountEmbed, greaterThenZeroEmbed, lessThenTwentyEmbed, members, onlineMembers, withoutBots, newExp;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        roleRequiredEmbed = new _discord.MessageEmbed().setTitle('Grant Exp').setDescription("Role is required!");
                        notEnoughUsersEmbed = new _discord.MessageEmbed().setTitle('Grant Exp').setDescription("Not Enough users found!");
                        invalidAmountEmbed = new _discord.MessageEmbed().setTitle('Grant Exp').setDescription("Invalid amount!");
                        greaterThenZeroEmbed = new _discord.MessageEmbed().setTitle('Grant Exp').setDescription("Amount must be greater then 0!");
                        lessThenTwentyEmbed = new _discord.MessageEmbed().setTitle('Grant Exp').setDescription("Amount must less then 20!");
                        _context.next = 7;
                        return discordClient.guilds.cache.get(setting.discordHomeServerGuildId).members.fetch({
                          withPresences: true
                        });

                      case 7:
                        members = _context.sent;
                        onlineMembers = members.filter(function (member) {
                          return member;
                        });

                        if (filteredMessage[2]) {
                          _context.next = 13;
                          break;
                        }

                        _context.next = 12;
                        return message.reply({
                          embeds: [roleRequiredEmbed]
                        });

                      case 12:
                        return _context.abrupt("return");

                      case 13:
                        if (!(Number(filteredMessage[2]) % 1 !== 0)) {
                          _context.next = 17;
                          break;
                        }

                        _context.next = 16;
                        return message.reply({
                          embeds: [invalidAmountEmbed]
                        });

                      case 16:
                        return _context.abrupt("return");

                      case 17:
                        console.log(Number(filteredMessage[2]));

                        if (!(Number(filteredMessage[2]) < 1)) {
                          _context.next = 22;
                          break;
                        }

                        _context.next = 21;
                        return message.reply({
                          embeds: [greaterThenZeroEmbed]
                        });

                      case 21:
                        return _context.abrupt("return");

                      case 22:
                        if (!(Number(filteredMessage[2]) > 20)) {
                          _context.next = 26;
                          break;
                        }

                        _context.next = 25;
                        return message.reply({
                          embeds: [lessThenTwentyEmbed]
                        });

                      case 25:
                        return _context.abrupt("return");

                      case 26:
                        if (filteredMessage[3]) {
                          _context.next = 31;
                          break;
                        }

                        console.log('role required');
                        _context.next = 30;
                        return message.reply({
                          embeds: [roleRequiredEmbed]
                        });

                      case 30:
                        return _context.abrupt("return");

                      case 31:
                        _context.next = 33;
                        return (0, _mapMembers.mapMembers)(message, t, filteredMessage[3], onlineMembers);

                      case 33:
                        withoutBots = _context.sent;

                        if (!(withoutBots.length < 1)) {
                          _context.next = 38;
                          break;
                        }

                        _context.next = 37;
                        return message.reply({
                          embeds: [notEnoughUsersEmbed]
                        });

                      case 37:
                        return _context.abrupt("return");

                      case 38:
                        console.log(withoutBots);
                        console.log('withoutBots');
                        _context.next = 42;
                        return (0, _experience.gainMultiExp)(discordClient, withoutBots, filteredMessage, Number(filteredMessage[2]), t);

                      case 42:
                        newExp = _context.sent;
                        console.log('after exp test');

                      case 44:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x7) {
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
                          type: 'grantExp',
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
                          embeds: [(0, _messages.cannotSendMessageUser)("grantExp", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("grantExp", message)]
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
                          embeds: [(0, _messages.discordErrorMessage)("grantExp")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("grantExp")]
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

              return function (_x8) {
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

  return function discordGrantExp(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordGrantExp = discordGrantExp;