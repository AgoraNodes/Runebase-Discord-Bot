"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordMyRank = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
var discordMyRank = /*#__PURE__*/function () {
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
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, totalChatActivity, monthlyChatActivity, currentRank, currentRankExp, nextRank, nextRankExp, currentExp, canvas, ctx, expBarWidth, avatar, reqExp, calculatedCurrentExp, percentage, attachment, discordUser, discordChannel, preActivity, finalActivity;

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
                        _context.next = 11;
                        return _models["default"].activeTalker.findOne({
                          attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                          raw: true,
                          where: {
                            userId: user.id
                          }
                        });

                      case 11:
                        totalChatActivity = _context.sent;
                        _context.next = 14;
                        return _models["default"].activeTalker.findOne({
                          attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                          raw: true,
                          where: {
                            userId: user.id,
                            createdAt: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                          }
                        });

                      case 14:
                        monthlyChatActivity = _context.sent;
                        _context.next = 17;
                        return _models["default"].rank.findOne({
                          where: {
                            expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, user.exp)
                          },
                          order: [['id', 'DESC']],
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 17:
                        currentRank = _context.sent;

                        if (currentRank) {
                          currentRankExp = currentRank.expNeeded;
                        } else {
                          currentRankExp = 0;
                        }

                        _context.next = 21;
                        return _models["default"].rank.findOne({
                          where: {
                            expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, user.exp)
                          },
                          order: [['id', 'ASC']],
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 21:
                        nextRank = _context.sent;
                        nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
                        currentExp = user.exp;
                        _context.next = 26;
                        return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
                          family: 'HeartWarming'
                        });

                      case 26:
                        canvas = (0, _canvas.createCanvas)(1000, 300);
                        ctx = canvas.getContext('2d');
                        expBarWidth = 600; // const background = await loadImage(path.join(__dirname, '../assets/images/', 'myrank_background_two.png'));

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context.next = 35;
                          break;
                        }

                        _context.next = 32;
                        return (0, _canvas.loadImage)("https://cdn.discordapp.com/avatars/".concat(message.user.id, "/").concat(message.user.avatar, ".png?size=256"));

                      case 32:
                        avatar = _context.sent;
                        _context.next = 38;
                        break;

                      case 35:
                        _context.next = 37;
                        return (0, _canvas.loadImage)("https://cdn.discordapp.com/avatars/".concat(message.author.id, "/").concat(message.author.avatar, ".png?size=256"));

                      case 37:
                        avatar = _context.sent;

                      case 38:
                        // background
                        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        // circle for avatar
                        ctx.beginPath();
                        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
                        ctx.lineWidth = 2;
                        ctx.fillStyle = "#3F3F3F";
                        ctx.strokeStyle = "#164179";
                        ctx.fill();
                        ctx.closePath(); // XP Bar

                        ctx.lineJoin = 'round';
                        ctx.lineWidth = 69;
                        ctx.strokeStyle = "#164179"; // shadow of xp bar

                        ctx.strokeRect(323, 239, expBarWidth, 2); // empty bar

                        ctx.strokeStyle = 'black';
                        ctx.strokeRect(325, 240, expBarWidth, 0); // filled bar

                        reqExp = nextRankExp - currentRankExp;
                        calculatedCurrentExp = currentExp - currentRankExp;
                        percentage = calculatedCurrentExp / reqExp * 100;

                        if (percentage === Infinity) {
                          percentage = currentExp / nextRankExp * 100;
                        }

                        ctx.strokeStyle = '#348128';
                        ctx.strokeRect(323, 240, percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth, 0); // Adding text

                        ctx.font = 'bold 40px "HeartWarming"';
                        ctx.fillStyle = "#fe5701";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 4;
                        ctx.strokeText(user.username, 120, 275, 200);
                        ctx.fillText(user.username, 120, 275, 200);
                        ctx.strokeText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
                        ctx.fillText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
                        ctx.strokeText("".concat(currentRank ? currentRank.id : 0), 900, 90, 80);
                        ctx.fillText("".concat(currentRank ? currentRank.id : 0), 900, 90, 80);
                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 25px "HeartWarming"';
                        ctx.strokeText("Chat Activity Score", 450, 40, 300);
                        ctx.fillText("Chat Activity Score", 450, 40, 300);
                        ctx.strokeText("Rank", 720, 50, 200);
                        ctx.fillText("Rank", 720, 50, 200);
                        ctx.strokeText("Level", 900, 50, 200);
                        ctx.fillText("Level", 900, 50, 200);
                        ctx.strokeText("Current exp", 635, 160, 200);
                        ctx.fillText("Current exp", 635, 160, 200);
                        ctx.strokeText("prev", 345, 160, 200);
                        ctx.fillText("prev", 345, 160, 200);
                        ctx.strokeText("next", 905, 160, 200);
                        ctx.fillText("next", 905, 160, 200);
                        ctx.font = 'bold 25px "HeartWarming"';
                        ctx.fillStyle = "#fe5701";
                        ctx.strokeText(currentRankExp, 345, 190, 200);
                        ctx.fillText(currentRankExp, 345, 190, 200);
                        ctx.strokeText(nextRankExp, 905, 190, 200);
                        ctx.fillText(nextRankExp, 905, 190, 200);
                        ctx.strokeText(currentExp, 635, 190, 200);
                        ctx.fillText(currentExp, 635, 190, 200); // chat scores

                        ctx.strokeText(monthlyChatActivity ? monthlyChatActivity.count : 0, 350, 100, 200);
                        ctx.fillText(monthlyChatActivity ? monthlyChatActivity.count : 0, 350, 100, 200);
                        ctx.strokeText(totalChatActivity ? totalChatActivity.count : 0, 550, 100, 200);
                        ctx.fillText(totalChatActivity ? totalChatActivity.count : 0, 550, 100, 200);
                        ctx.fillStyle = 'white';
                        ctx.strokeText('30 day', 350, 70, 200);
                        ctx.fillText('30 day', 350, 70, 200);
                        ctx.strokeText('Total', 550, 70, 200);
                        ctx.fillText('Total', 550, 70, 200);
                        ctx.font = 'bold 50px "HeartWarming"';
                        ctx.fillStyle = "#fe5701";
                        ctx.strokeText("".concat(percentage.toFixed(0), "%"), 640, 260, 200);
                        ctx.fillText("".concat(percentage.toFixed(0), "%"), 640, 260, 200); // remove corners

                        ctx.beginPath();
                        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
                        ctx.closePath();
                        ctx.clip(); // Add the avatar

                        ctx.drawImage(avatar, 10, 10, 220, 220);
                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'rank.png');
                        console.log('before send');

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context.next = 126;
                          break;
                        }

                        _context.next = 113;
                        return discordClient.users.cache.get(message.user.id);

                      case 113:
                        discordUser = _context.sent;

                        if (!message.guildId) {
                          _context.next = 122;
                          break;
                        }

                        _context.next = 117;
                        return discordClient.channels.cache.get(message.channelId);

                      case 117:
                        discordChannel = _context.sent;
                        _context.next = 120;
                        return discordChannel.send({
                          files: [attachment]
                        });

                      case 120:
                        _context.next = 124;
                        break;

                      case 122:
                        _context.next = 124;
                        return discordUser.send({
                          files: [attachment]
                        });

                      case 124:
                        _context.next = 132;
                        break;

                      case 126:
                        if (!(message.channel.type === 'DM')) {
                          _context.next = 129;
                          break;
                        }

                        _context.next = 129;
                        return message.author.send({
                          files: [attachment]
                        });

                      case 129:
                        if (!(message.channel.type === 'GUILD_TEXT')) {
                          _context.next = 132;
                          break;
                        }

                        _context.next = 132;
                        return message.channel.send({
                          files: [attachment]
                        });

                      case 132:
                        _context.next = 134;
                        return _models["default"].activity.create({
                          type: 'myrank_s',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 134:
                        preActivity = _context.sent;
                        _context.next = 137;
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

                      case 137:
                        finalActivity = _context.sent;
                        activity.unshift(finalActivity);

                      case 139:
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
                          type: 'MyRank',
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
                          embeds: [(0, _messages.cannotSendMessageUser)("MyRank", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 15:
                        _context2.next = 19;
                        break;

                      case 17:
                        _context2.next = 19;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("MyRank", message)]
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
                          embeds: [(0, _messages.discordErrorMessage)("MyRank")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 27:
                        _context2.next = 31;
                        break;

                      case 29:
                        _context2.next = 31;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("MyRank")]
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

  return function discordMyRank(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordMyRank = discordMyRank;