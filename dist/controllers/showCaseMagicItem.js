"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordShowCaseMagicItem = void 0;

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

var _generateRandomMagicItem = require("../helpers/items/generateRandomMagicItem");

var _generateModifierStringArray = require("../helpers/items/generateModifierStringArray");

/* eslint-disable import/prefer-default-export */
var discordShowCaseMagicItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, io) {
    var activity, newItem, modifierStringArray;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activity = [];
            _context3.next = 3;
            return (0, _generateRandomMagicItem.generateRandomMagicItem)();

          case 3:
            newItem = _context3.sent;
            _context3.next = 6;
            return (0, _generateModifierStringArray.generateModifierStringArray)(newItem.dataValues);

          case 6:
            modifierStringArray = _context3.sent;
            console.log('modifierString');
            console.log(modifierStringArray);
            _context3.next = 11;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, levelReqHeight, itemImage, canvas, ctx, i, attachment, discordUser, discordChannel, preActivity, finalActivity;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'myrank');

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
                        levelReqHeight = newItem.levelReq ? 25 : 0;
                        _context.next = 12;
                        return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
                          family: 'HeartWarming'
                        });

                      case 12:
                        _context.next = 14;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/items/".concat(newItem.itemBase.itemFamily.itemType.name, "/").concat(newItem.itemBase.itemFamily.name), "".concat(newItem.itemBase.name, ".png")));

                      case 14:
                        itemImage = _context.sent;
                        canvas = (0, _canvas.createCanvas)(200, itemImage.height + 95 + modifierStringArray.length * 25 + levelReqHeight);
                        ctx = canvas.getContext('2d');
                        console.log(newItem.itemBase.name);
                        console.log(newItem.itemBase.itemFamily.name);
                        console.log(newItem.itemBase.itemFamily.itemType.name);
                        ctx.lineWidth = 1;
                        ctx.fillStyle = "#3F3F3F";
                        ctx.strokeStyle = "#164179";
                        ctx.textAlign = "center";
                        ctx.drawImage(itemImage, canvas.width / 2 - itemImage.width / 2, 0); // item name

                        ctx.font = 'bold 15px "HeartWarming"';
                        ctx.fillStyle = newItem.itemQuality.color;
                        ctx.strokeStyle = "#164179";
                        ctx.strokeText(newItem.name, 100, itemImage.height + 20, 200);
                        ctx.fillText(newItem.name, 100, itemImage.height + 20, 200);
                        ctx.strokeStyle = 'black';
                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 15px "HeartWarming"'; // Level Req

                        if (newItem.levelReq) {
                          ctx.strokeText("Lvl Requirement: ".concat(newItem.levelReq), 100, itemImage.height + 45, 200);
                          ctx.fillText("Lvl Requirement: ".concat(newItem.levelReq), 100, itemImage.height + 45, 200);
                        } // item defense


                        ctx.strokeText("Defense: ".concat(newItem.defense), 100, itemImage.height + 45 + levelReqHeight, 200);
                        ctx.fillText("Defense: ".concat(newItem.defense), 100, itemImage.height + 45 + levelReqHeight, 200); // item durability

                        ctx.strokeText("Durability: ".concat(newItem.durability, " of ").concat(newItem.itemBase.durability), 100, itemImage.height + 70 + levelReqHeight, 200);
                        ctx.fillText("Durability: ".concat(newItem.durability, " of ").concat(newItem.itemBase.durability), 100, itemImage.height + 70 + levelReqHeight, 200); // item modifiers

                        ctx.font = 'bold 15px "HeartWarming"';
                        ctx.fillStyle = newItem.itemQuality.color;
                        ctx.strokeStyle = "#164179";

                        for (i = 0; i < modifierStringArray.length; i++) {
                          ctx.strokeText(modifierStringArray[i], 100, itemImage.height + 95 + i * 25 + levelReqHeight, 200);
                          ctx.fillText(modifierStringArray[i], 100, itemImage.height + 95 + i * 25 + levelReqHeight, 200);
                        }

                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'item.png');
                        console.log('before send');

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context.next = 60;
                          break;
                        }

                        _context.next = 47;
                        return discordClient.users.cache.get(message.user.id);

                      case 47:
                        discordUser = _context.sent;

                        if (!message.guildId) {
                          _context.next = 56;
                          break;
                        }

                        _context.next = 51;
                        return discordClient.channels.cache.get(message.channelId);

                      case 51:
                        discordChannel = _context.sent;
                        _context.next = 54;
                        return discordChannel.send({
                          files: [attachment]
                        });

                      case 54:
                        _context.next = 58;
                        break;

                      case 56:
                        _context.next = 58;
                        return discordUser.send({
                          files: [attachment]
                        });

                      case 58:
                        _context.next = 66;
                        break;

                      case 60:
                        if (!(message.channel.type === 'DM')) {
                          _context.next = 63;
                          break;
                        }

                        _context.next = 63;
                        return message.author.send({
                          files: [attachment]
                        });

                      case 63:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context.next = 66;
                          break;
                        }

                        _context.next = 66;
                        return message.channel.send({
                          files: [attachment]
                        });

                      case 66:
                        _context.next = 68;
                        return _models["default"].activity.create({
                          type: 'myrank_s',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 68:
                        preActivity = _context.sent;
                        _context.next = 71;
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

                      case 71:
                        finalActivity = _context.sent;
                        activity.unshift(finalActivity);

                      case 73:
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
                        console.log(err);
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _models["default"].error.create({
                          type: 'MyRank',
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
                          embeds: [(0, _messages.cannotSendMessageUser)("MyRank", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context2.next = 20;
                        break;

                      case 18:
                        _context2.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("MyRank", message)]
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
                          embeds: [(0, _messages.discordErrorMessage)("MyRank")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context2.next = 32;
                        break;

                      case 30:
                        _context2.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("MyRank")]
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

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 11:
            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function discordShowCaseMagicItem(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordShowCaseMagicItem = discordShowCaseMagicItem;