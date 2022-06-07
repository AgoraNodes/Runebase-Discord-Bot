"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordRanks = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

/* eslint-disable import/prefer-default-export */
var discordRanks = /*#__PURE__*/function () {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, allRanks, canvasAddedRanksHeight, canvas, ctx, attachment, discordChannel, preActivity, finalActivity;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'ranks');

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
                        return _models["default"].rank.findAll({
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 11:
                        allRanks = _context.sent;
                        canvasAddedRanksHeight = allRanks.length * 40 + 36.5;
                        _context.next = 15;
                        return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
                          family: 'HeartWarming'
                        });

                      case 15:
                        canvas = (0, _canvas.createCanvas)(600, canvasAddedRanksHeight);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 20px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3; // Headers

                        ctx.strokeText('Level', 100, 25, 200);
                        ctx.fillText('Level', 100, 25, 200);
                        ctx.strokeText('Rank', 300, 25, 200);
                        ctx.fillText('Rank', 300, 25, 200);
                        ctx.strokeText('Exp needed', 500, 25, 200);
                        ctx.fillText('Exp needed', 500, 25, 200);
                        ctx.strokeStyle = '#ccc';
                        ctx.lineWidth = 1;
                        allRanks.forEach(function (element) {
                          ctx.beginPath();
                          ctx.moveTo(0, element.id * 40 + 35);
                          ctx.lineTo(600, element.id * 40 + 35);
                          ctx.stroke();
                          ctx.strokeText(element.id, 100, element.id * 40 + 25, 200);
                          ctx.fillText(element.id, 100, element.id * 40 + 25, 200);
                          ctx.strokeText(element.name, 300, element.id * 40 + 25, 200);
                          ctx.fillText(element.name, 300, element.id * 40 + 25, 200);
                          ctx.strokeText(element.expNeeded, 500, element.id * 40 + 25, 200);
                          ctx.fillText(element.expNeeded, 500, element.id * 40 + 25, 200);
                        }); // Draw horizontal line

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
                        ctx.moveTo(0, canvasAddedRanksHeight - 1.5);
                        ctx.lineTo(600, canvasAddedRanksHeight - 1.5);
                        ctx.stroke(); // draw vertical lines

                        ctx.beginPath();
                        ctx.moveTo(1.5, 0);
                        ctx.lineTo(1.5, canvasAddedRanksHeight);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(200, 0);
                        ctx.lineTo(200, canvasAddedRanksHeight);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(400, 0);
                        ctx.lineTo(400, canvasAddedRanksHeight);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(598.5, 0);
                        ctx.lineTo(598.5, canvasAddedRanksHeight);
                        ctx.stroke();
                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'ranks.png');

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context.next = 71;
                          break;
                        }

                        if (!message.guildId) {
                          _context.next = 69;
                          break;
                        }

                        _context.next = 66;
                        return discordClient.channels.cache.get(message.channelId);

                      case 66:
                        discordChannel = _context.sent;
                        _context.next = 69;
                        return discordChannel.send({
                          files: [attachment]
                        });

                      case 69:
                        _context.next = 73;
                        break;

                      case 71:
                        _context.next = 73;
                        return message.channel.send({
                          files: [attachment]
                        });

                      case 73:
                        _context.next = 75;
                        return _models["default"].activity.create({
                          type: 'ranks_s',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 75:
                        preActivity = _context.sent;
                        _context.next = 78;
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

                      case 78:
                        finalActivity = _context.sent;
                        activity.unshift(finalActivity);

                      case 80:
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
                          type: 'ranks',
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
                        _logger["default"].error("Error Discord Ranks Requested by: ".concat(message.author.id, "-").concat(message.author.username, "#").concat(message.author.discriminator, " - ").concat(err));

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
                          embeds: [(0, _messages.cannotSendMessageUser)("Ranks", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("Ranks", message)]
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
                          embeds: [(0, _messages.discordErrorMessage)("Ranks")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("Ranks")]
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

  return function discordRanks(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordRanks = discordRanks;