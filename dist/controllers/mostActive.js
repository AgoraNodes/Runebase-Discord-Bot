"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordMostActive = void 0;

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
var discordMostActive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, setting, io) {
    var activity;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            activity = [];
            _context5.next = 3;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(t) {
                var _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, allRanks, olderThenDate, topUsers, promises, newTopUsers, canvasAddedRanksHeight, canvas, ctx, expBarWidth, attachment, discordChannel, preActivity, finalActivity;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _userWalletExist.userWalletExist)(message, t, 'mostActive');

                      case 2:
                        _yield$userWalletExis = _context3.sent;
                        _yield$userWalletExis2 = (0, _slicedToArray2["default"])(_yield$userWalletExis, 2);
                        user = _yield$userWalletExis2[0];
                        userActivity = _yield$userWalletExis2[1];

                        if (userActivity) {
                          activity.unshift(userActivity);
                        }

                        if (user) {
                          _context3.next = 9;
                          break;
                        }

                        return _context3.abrupt("return");

                      case 9:
                        _context3.next = 11;
                        return _models["default"].rank.findAll({
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 11:
                        allRanks = _context3.sent;
                        olderThenDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                        _context3.next = 15;
                        return _models["default"].user.findAll({
                          order: [[_sequelize.Sequelize.literal('(SELECT SUM(count) FROM activeTalker where activeTalker.userId = user.id AND activeTalker.createdAt > date_sub(now(), interval 1 month))'), 'DESC']],
                          limit: 10,
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 15:
                        topUsers = _context3.sent;
                        promises = topUsers.map( /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(topUser, index) {
                            var discordUser, totalChatActivity, monthlyChatActivity, loadedAvatar, canvas, ctx, clippedAvatar, currentRank, currentRankExp, nextRank, nextRankExp, currentExp;
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    console.log(index);
                                    console.log(topUser.activeTalkers);
                                    _context.next = 4;
                                    return discordClient.users.cache.get(topUser.user_id);

                                  case 4:
                                    discordUser = _context.sent;

                                    if (discordUser) {
                                      _context.next = 9;
                                      break;
                                    }

                                    _context.next = 8;
                                    return discordClient.users.fetch(topUser.user_id);

                                  case 8:
                                    discordUser = _context.sent;

                                  case 9:
                                    _context.next = 11;
                                    return _models["default"].activeTalker.findOne({
                                      attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                                      raw: true,
                                      where: {
                                        userId: topUser.id
                                      }
                                    });

                                  case 11:
                                    totalChatActivity = _context.sent;
                                    _context.next = 14;
                                    return _models["default"].activeTalker.findOne({
                                      attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                                      raw: true,
                                      where: {
                                        userId: topUser.id,
                                        createdAt: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                                      }
                                    });

                                  case 14:
                                    monthlyChatActivity = _context.sent;
                                    _context.next = 17;
                                    return (0, _canvas.loadImage)("https://cdn.discordapp.com/avatars/".concat(topUser.user_id, "/").concat(discordUser.avatar, ".png?size=256"));

                                  case 17:
                                    loadedAvatar = _context.sent;
                                    canvas = (0, _canvas.createCanvas)(256, 256);
                                    ctx = canvas.getContext('2d');
                                    ctx.beginPath();
                                    ctx.arc(128, 128, 128, 0, 2 * Math.PI);
                                    ctx.closePath();
                                    ctx.clip();
                                    ctx.drawImage(loadedAvatar, 0, 0, 256, 256);
                                    clippedAvatar = canvas.toBuffer(); // get rank info

                                    _context.next = 28;
                                    return _models["default"].rank.findOne({
                                      where: {
                                        expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, topUser.exp)
                                      },
                                      order: [['id', 'DESC']],
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 28:
                                    currentRank = _context.sent;

                                    if (currentRank) {
                                      currentRankExp = currentRank.expNeeded;
                                    } else {
                                      currentRankExp = 0;
                                    }

                                    _context.next = 32;
                                    return _models["default"].rank.findOne({
                                      where: {
                                        expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, topUser.exp)
                                      },
                                      order: [['id', 'ASC']],
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 32:
                                    nextRank = _context.sent;
                                    nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
                                    currentExp = topUser.exp;
                                    _context.t0 = index + 1;
                                    _context.t1 = topUser.username;
                                    _context.t2 = monthlyChatActivity && monthlyChatActivity.count ? monthlyChatActivity.count : 0;
                                    _context.t3 = totalChatActivity && totalChatActivity.count ? totalChatActivity.count : 0;
                                    _context.t4 = topUser.exp;
                                    _context.t5 = topUser.totalInvitedUsersCount;
                                    _context.next = 43;
                                    return (0, _canvas.loadImage)(clippedAvatar);

                                  case 43:
                                    _context.t6 = _context.sent;
                                    _context.t7 = currentRankExp;
                                    _context.t8 = currentExp;
                                    _context.t9 = nextRankExp;
                                    _context.t10 = currentRank ? currentRank.name : 'Unranked';
                                    _context.t11 = currentRank ? currentRank.id : 0;
                                    return _context.abrupt("return", {
                                      position: _context.t0,
                                      username: _context.t1,
                                      monthlyChatActivity: _context.t2,
                                      totalChatActivity: _context.t3,
                                      exp: _context.t4,
                                      invitedUsers: _context.t5,
                                      avatar: _context.t6,
                                      currentRankExp: _context.t7,
                                      currentExp: _context.t8,
                                      nextRankExp: _context.t9,
                                      currentRankName: _context.t10,
                                      currentRankId: _context.t11
                                    });

                                  case 50:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x6, _x7) {
                            return _ref3.apply(this, arguments);
                          };
                        }());
                        _context3.next = 19;
                        return Promise.all(promises);

                      case 19:
                        newTopUsers = _context3.sent;
                        console.log(newTopUsers);
                        canvasAddedRanksHeight = newTopUsers.length * 300 + 36.5;
                        _context3.next = 24;
                        return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
                          family: 'HeartWarming'
                        });

                      case 24:
                        canvas = (0, _canvas.createCanvas)(1040, canvasAddedRanksHeight);
                        ctx = canvas.getContext('2d');
                        expBarWidth = 600;
                        ctx.font = 'bold 20px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3; // Headers

                        ctx.strokeText('#', 20, 25, 40);
                        ctx.fillText('#', 20, 25, 40);
                        ctx.strokeText('User', 520, 25, 1000);
                        ctx.fillText('User', 520, 25, 1000);
                        newTopUsers.forEach( /*#__PURE__*/function () {
                          var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
                            var addedCirclePositionVertical, reqExp, calculatedCurrentExp, percentage;
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    /// Position Text
                                    ctx.font = 'bold 20px "HeartWarming"';
                                    ctx.fillStyle = "#ccc";
                                    ctx.textAlign = "center";
                                    ctx.strokeStyle = 'black';
                                    ctx.lineWidth = 3;
                                    ctx.strokeText(element.position, 20, element.position * 300 - 100, 40);
                                    ctx.fillText(element.position, 20, element.position * 300 - 100, 40); /// Horizontal lines

                                    ctx.strokeStyle = '#ccc';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(0, element.position * 300 + 35);
                                    ctx.lineTo(1040, element.position * 300 + 35);
                                    ctx.stroke(); // Circle for avatar

                                    addedCirclePositionVertical = element.position > 1 ? element.position * 300 - 300 : 0;
                                    ctx.beginPath();
                                    ctx.arc(120 + 40, 120 + 36.5 + addedCirclePositionVertical, 110, 0, 2 * Math.PI);
                                    ctx.lineWidth = 2;
                                    ctx.fillStyle = "#3F3F3F";
                                    ctx.strokeStyle = "#164179";
                                    ctx.fill();
                                    ctx.closePath(); // XP Bar

                                    ctx.lineJoin = 'round';
                                    ctx.lineWidth = 69;
                                    ctx.strokeStyle = "#164179"; // shadow of XP BAR

                                    ctx.strokeRect(323 + 40, 239 + 36.5 + addedCirclePositionVertical, expBarWidth, 2); // empty XP BAR

                                    ctx.strokeStyle = 'black';
                                    ctx.strokeRect(325 + 40, 240 + 36.5 + addedCirclePositionVertical, expBarWidth, 0); // filled XP BAR

                                    reqExp = element.nextRankExp - element.currentRankExp;
                                    calculatedCurrentExp = element.currentExp - element.currentRankExp;
                                    percentage = calculatedCurrentExp / reqExp * 100;

                                    if (percentage === Infinity) {
                                      percentage = element.currentExp / element.nextRankExp * 100;
                                    }

                                    ctx.strokeStyle = '#348128';
                                    ctx.strokeRect(323 + 40, 240 + 36.5 + addedCirclePositionVertical, percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth, 0); /// Username

                                    ctx.font = 'bold 40px "HeartWarming"';
                                    ctx.fillStyle = "#fe5701";
                                    ctx.textAlign = "center";
                                    ctx.strokeStyle = 'black';
                                    ctx.lineWidth = 4;
                                    ctx.strokeText(element.username, 120 + 40, 275 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.username, 120 + 40, 275 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText(element.currentRankName, 722 + 40, 90 + 36.5 + addedCirclePositionVertical, 100);
                                    ctx.fillText(element.currentRankName, 722 + 40, 90 + 36.5 + addedCirclePositionVertical, 100);
                                    ctx.strokeText(element.currentRankId, 900 + 40, 90 + 36.5 + addedCirclePositionVertical, 80);
                                    ctx.fillText(element.currentRankId, 900 + 40, 90 + 36.5 + addedCirclePositionVertical, 80);
                                    ctx.fillStyle = 'white';
                                    ctx.font = 'bold 25px "HeartWarming"';
                                    ctx.strokeText("Chat Activity Score", 450 + 40, 40 + 36.5 + addedCirclePositionVertical, 300);
                                    ctx.fillText("Chat Activity Score", 450 + 40, 40 + 36.5 + addedCirclePositionVertical, 300);
                                    ctx.strokeText("Rank", 720 + 40, 50 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("Rank", 720 + 40, 50 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText("Level", 900 + 40, 50 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("Level", 900 + 40, 50 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText("Current exp", 635 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("Current exp", 635 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText("prev", 345 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("prev", 345 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText("next", 905 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("next", 905 + 40, 160 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.font = 'bold 25px "HeartWarming"';
                                    ctx.fillStyle = "#fe5701";
                                    ctx.strokeText(element.currentRankExp, 345 + 40, 190 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.currentRankExp, 345 + 40, 190 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText(element.nextRankExp, 905 + 40, 190 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.nextRankExp, 905 + 40, 190 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText(element.currentExp, 635 + 40, 190 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.currentExp, 635 + 40, 190 + 36.5 + addedCirclePositionVertical, 200); // chat scores

                                    ctx.strokeText(element.monthlyChatActivity, 350 + 40, 100 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.monthlyChatActivity, 350 + 40, 100 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText(element.totalChatActivity, 550 + 40, 100 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText(element.totalChatActivity, 550 + 40, 100 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillStyle = 'white';
                                    ctx.strokeText('30 day', 350 + 40, 70 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText('30 day', 350 + 40, 70 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.strokeText('Total', 550 + 40, 70 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText('Total', 550 + 40, 70 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.font = 'bold 50px "HeartWarming"';
                                    ctx.fillStyle = "#fe5701";
                                    ctx.strokeText("".concat(percentage.toFixed(0), "%"), 640 + 40, 260 + 36.5 + addedCirclePositionVertical, 200);
                                    ctx.fillText("".concat(percentage.toFixed(0), "%"), 640 + 40, 260 + 36.5 + addedCirclePositionVertical, 200); // Add avatar

                                    ctx.drawImage(element.avatar, 10 + 40, 10 + 36.5 + addedCirclePositionVertical, 220, 220);

                                  case 80:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x8) {
                            return _ref4.apply(this, arguments);
                          };
                        }()); // Draw horizontal line

                        ctx.strokeStyle = '#ccc';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(0, 1.5);
                        ctx.lineTo(1040, 1.5);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(0, 35);
                        ctx.lineTo(1040, 35);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(0, canvasAddedRanksHeight - 1.5);
                        ctx.lineTo(1040, canvasAddedRanksHeight - 1.5);
                        ctx.stroke(); // draw vertical lines

                        ctx.beginPath();
                        ctx.moveTo(1.5, 0);
                        ctx.lineTo(1.5, canvasAddedRanksHeight);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(40, 0);
                        ctx.lineTo(40, canvasAddedRanksHeight);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(1038.5, 0);
                        ctx.lineTo(1038.5, canvasAddedRanksHeight);
                        ctx.stroke();
                        attachment = new _discord.MessageAttachment(canvas.toBuffer(), 'mostActive.png');

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context3.next = 73;
                          break;
                        }

                        if (!message.guildId) {
                          _context3.next = 71;
                          break;
                        }

                        _context3.next = 68;
                        return discordClient.channels.cache.get(message.channelId);

                      case 68:
                        discordChannel = _context3.sent;
                        _context3.next = 71;
                        return discordChannel.send({
                          files: [attachment]
                        });

                      case 71:
                        _context3.next = 75;
                        break;

                      case 73:
                        _context3.next = 75;
                        return message.channel.send({
                          files: [attachment]
                        });

                      case 75:
                        _context3.next = 77;
                        return _models["default"].activity.create({
                          type: 'mostActive_s',
                          earnerId: user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 77:
                        preActivity = _context3.sent;
                        _context3.next = 80;
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

                      case 80:
                        finalActivity = _context3.sent;
                        activity.unshift(finalActivity);

                      case 82:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                var discordChannel, _discordChannel;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        console.log(err);
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _models["default"].error.create({
                          type: 'MostActive',
                          error: "".concat(err)
                        });

                      case 4:
                        _context4.next = 9;
                        break;

                      case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4["catch"](1);

                        _logger["default"].error("Error Discord: ".concat(_context4.t0));

                      case 9:
                        if (!(err.code && err.code === 50007)) {
                          _context4.next = 22;
                          break;
                        }

                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context4.next = 18;
                          break;
                        }

                        _context4.next = 13;
                        return discordClient.channels.cache.get(message.channelId);

                      case 13:
                        discordChannel = _context4.sent;
                        _context4.next = 16;
                        return discordChannel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("MostActive", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 16:
                        _context4.next = 20;
                        break;

                      case 18:
                        _context4.next = 20;
                        return message.channel.send({
                          embeds: [(0, _messages.cannotSendMessageUser)("MostActive", message)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 20:
                        _context4.next = 32;
                        break;

                      case 22:
                        if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                          _context4.next = 30;
                          break;
                        }

                        _context4.next = 25;
                        return discordClient.channels.cache.get(message.channelId);

                      case 25:
                        _discordChannel = _context4.sent;
                        _context4.next = 28;
                        return _discordChannel.send({
                          embeds: [(0, _messages.discordErrorMessage)("MostActive")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        _context4.next = 32;
                        break;

                      case 30:
                        _context4.next = 32;
                        return message.channel.send({
                          embeds: [(0, _messages.discordErrorMessage)("MostActive")]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 32:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[1, 6]]);
              }));

              return function (_x9) {
                return _ref5.apply(this, arguments);
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
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordMostActive(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordMostActive = discordMostActive;