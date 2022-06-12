"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordPickClass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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
function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }

  var words = text.split(' ');
  var currentLine = 0;
  var idx = 1;

  while (words.length > 0 && idx <= words.length) {
    var str = words.slice(0, idx).join(' ');
    var w = context.measureText(str).width;

    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }

      context.fillText(words.slice(0, idx - 1).join(' '), x, y + lineHeight * currentLine);
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else {
      idx++;
    }
  }

  if (idx > 0) {
    context.fillText(words.join(' '), x, y + lineHeight * currentLine);
  }
}

var discordPickClass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(discordClient, message, setting, io, queue) {
    var userId, user, activity, CurrentClassSelectionId, classes, discordChannel, backId, forwardId, pickClassId, cancelPickClassId, backButton, forwardButton, generateClassImage, generateClassPicked, generateCancelClassPicked, generatePickClassButton, generateCancelPickClassButton, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context10.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 3:
            user = _context10.sent;

            if (user) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return");

          case 6:
            activity = [];
            _context10.next = 9;
            return _models["default"]["class"].findAll({
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription'
              }]
            });

          case 9:
            classes = _context10.sent;

            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context10.next = 22;
              break;
            }

            if (!message.guildId) {
              _context10.next = 17;
              break;
            }

            _context10.next = 14;
            return discordClient.channels.cache.get(message.channelId);

          case 14:
            discordChannel = _context10.sent;
            _context10.next = 20;
            break;

          case 17:
            _context10.next = 19;
            return discordClient.users.cache.get(message.user.id);

          case 19:
            discordChannel = _context10.sent;

          case 20:
            _context10.next = 30;
            break;

          case 22:
            if (!(message.channel.type === 'DM')) {
              _context10.next = 26;
              break;
            }

            _context10.next = 25;
            return discordClient.channels.cache.get(message.channelId);

          case 25:
            discordChannel = _context10.sent;

          case 26:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context10.next = 30;
              break;
            }

            _context10.next = 29;
            return discordClient.channels.cache.get(message.channelId);

          case 29:
            discordChannel = _context10.sent;

          case 30:
            backId = 'back';
            forwardId = 'forward';
            pickClassId = 'pickClass';
            cancelPickClassId = 'cancelClass';
            backButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Back',
              emoji: '⬅️',
              customId: backId
            });
            forwardButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Forward',
              emoji: '➡️',
              customId: forwardId
            });
            _context10.next = 38;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 38:
            generateClassImage = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start) {
                var current, canvas, ctx, newClassImage;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        canvas = (0, _canvas.createCanvas)(1400, 1050);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc"; // ctx.textAlign = "center";

                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        _context.next = 9;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images/classes', "".concat(current[0].classDescription.image, ".png")));

                      case 9:
                        newClassImage = _context.sent;
                        ctx.drawImage(newClassImage, 0, 0, 500, 800);
                        printAtWordWrap(ctx, current[0].classDescription.description, 500, 100, 35, 500);
                        ctx.textAlign = "center";
                        ctx.font = 'bold 50px "HeartWarming"';
                        ctx.strokeText(current[0].name, 250, 880, 500);
                        ctx.fillText(current[0].name, 250, 880, 500); // print default stats

                        ctx.strokeText("Base Stats", 1200, 50, 200);
                        ctx.fillText("Base stats", 1200, 50, 200);
                        ctx.font = 'bold 35px "HeartWarming"'; // Strength

                        ctx.strokeText("Strength: ".concat(current[0].strength), 1200, 150, 200);
                        ctx.fillText("Strength: ".concat(current[0].strength), 1200, 150, 200); // Dexterity

                        ctx.strokeText("Dexterity: ".concat(current[0].dexterity), 1200, 250, 200);
                        ctx.fillText("Dexterity: ".concat(current[0].dexterity), 1200, 250, 200); // Vitality

                        ctx.strokeText("Vitality: ".concat(current[0].vitality), 1200, 350, 200);
                        ctx.fillText("Vitality: ".concat(current[0].vitality), 1200, 350, 200); // Energy

                        ctx.strokeText("Energy: ".concat(current[0].energy), 1200, 450, 200);
                        ctx.fillText("Energy: ".concat(current[0].energy), 1200, 450, 200); // Life

                        ctx.strokeText("Life: ".concat(current[0].life), 1200, 550, 200);
                        ctx.fillText("Life: ".concat(current[0].life), 1200, 550, 200); // Mana

                        ctx.strokeText("Mana: ".concat(current[0].mana), 1200, 650, 200);
                        ctx.fillText("Mana: ".concat(current[0].mana), 1200, 650, 200); // Stamina

                        ctx.strokeText("Stamina: ".concat(current[0].stamina), 1200, 750, 200);
                        ctx.fillText("Stamina: ".concat(current[0].stamina), 1200, 750, 200); // Picking a class

                        ctx.fillStyle = "#fe5701";
                        ctx.font = 'bold 70px "HeartWarming"';
                        ctx.strokeText("".concat(user.username, " is picking a class"), 700, 1000, 1400);
                        ctx.fillText("".concat(user.username, " is picking a class"), 700, 1000, 1400);
                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'class.png'));

                      case 38:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateClassImage(_x6) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateClassPicked = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(start) {
                var current, canvas, ctx;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        console.log(current);
                        console.log(current.classDescription);
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        ctx.fillText("".concat(user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        ctx.strokeText("".concat(user.username, "'s stats have been reset"), 250, 80, 500);
                        ctx.fillText("".concat(user.username, "'s stats have been reset"), 250, 80, 500);
                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'picked.png'));

                      case 15:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateClassPicked(_x7) {
                return _ref3.apply(this, arguments);
              };
            }();

            generateCancelClassPicked = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(start) {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(user.username, " canceled class selection"), 250, 60, 500);
                        ctx.fillText("".concat(user.username, " canceled class selection"), 250, 60, 500);
                        return _context3.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateCancelClassPicked(_x8) {
                return _ref4.apply(this, arguments);
              };
            }();

            generatePickClassButton = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(start) {
                var current;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        CurrentClassSelectionId = current[0].id;
                        console.log(current);
                        return _context4.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Pick ".concat(current[0].name),
                          emoji: '⛏️',
                          customId: pickClassId
                        }));

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generatePickClassButton(_x9) {
                return _ref5.apply(this, arguments);
              };
            }();

            generateCancelPickClassButton = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Cancel class selection",
                          emoji: '❌',
                          customId: cancelPickClassId
                        }));

                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function generateCancelPickClassButton() {
                return _ref6.apply(this, arguments);
              };
            }();

            canFitOnOnePage = classes.length <= 1;
            _context10.t0 = discordChannel;
            _context10.next = 47;
            return generateClassImage(0);

          case 47:
            _context10.t1 = _context10.sent;
            _context10.t2 = [_context10.t1];

            if (!canFitOnOnePage) {
              _context10.next = 53;
              break;
            }

            _context10.t3 = [];
            _context10.next = 65;
            break;

          case 53:
            _context10.t4 = _discord.MessageActionRow;
            _context10.next = 56;
            return generatePickClassButton(0);

          case 56:
            _context10.t5 = _context10.sent;
            _context10.next = 59;
            return generateCancelPickClassButton();

          case 59:
            _context10.t6 = _context10.sent;
            _context10.t7 = [_context10.t5, _context10.t6];
            _context10.t8 = {
              components: _context10.t7
            };
            _context10.t9 = new _context10.t4(_context10.t8);
            _context10.t10 = new _discord.MessageActionRow({
              components: [forwardButton]
            });
            _context10.t3 = [_context10.t9, _context10.t10];

          case 65:
            _context10.t11 = _context10.t3;
            _context10.t12 = {
              files: _context10.t2,
              components: _context10.t11
            };
            _context10.next = 69;
            return _context10.t0.send.call(_context10.t0, _context10.t12);

          case 69:
            embedMessage = _context10.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref7) {
                var discordUser = _ref7.user;
                return discordUser.id === user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(interaction) {
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!(interaction.customId === pickClassId)) {
                          _context9.next = 13;
                          break;
                        }

                        _context9.next = 3;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                          return _regenerator["default"].wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(t) {
                                      var stats, userClass, preActivity, finalActivity;
                                      return _regenerator["default"].wrap(function _callee6$(_context6) {
                                        while (1) {
                                          switch (_context6.prev = _context6.next) {
                                            case 0:
                                              _context6.next = 2;
                                              return _models["default"].stats.findOne({
                                                where: {
                                                  userId: user.id
                                                }
                                              });

                                            case 2:
                                              stats = _context6.sent;

                                              if (stats) {
                                                _context6.next = 8;
                                                break;
                                              }

                                              _context6.next = 6;
                                              return _models["default"].stats.create({
                                                userId: user.id
                                              });

                                            case 6:
                                              _context6.next = 10;
                                              break;

                                            case 8:
                                              _context6.next = 10;
                                              return stats.update({
                                                strength: 0,
                                                dexterity: 0,
                                                vitality: 0,
                                                energy: 0,
                                                life: 0,
                                                mana: 0,
                                                stamina: 0
                                              });

                                            case 10:
                                              _context6.next = 12;
                                              return _models["default"].UserClass.findOne({
                                                where: {
                                                  userId: user.id
                                                }
                                              });

                                            case 12:
                                              userClass = _context6.sent;

                                              if (userClass) {
                                                _context6.next = 18;
                                                break;
                                              }

                                              _context6.next = 16;
                                              return _models["default"].UserClass.create({
                                                userId: user.id,
                                                classId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 16:
                                              _context6.next = 19;
                                              break;

                                            case 18:
                                              userClass.update({
                                                classId: CurrentClassSelectionId
                                              });

                                            case 19:
                                              _context6.next = 21;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 21:
                                              preActivity = _context6.sent;
                                              _context6.next = 24;
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

                                            case 24:
                                              finalActivity = _context6.sent;
                                              activity.unshift(finalActivity);

                                            case 26:
                                            case "end":
                                              return _context6.stop();
                                          }
                                        }
                                      }, _callee6);
                                    }));

                                    return function (_x11) {
                                      return _ref10.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
                                      var _discordChannel, _discordChannel2;

                                      return _regenerator["default"].wrap(function _callee7$(_context7) {
                                        while (1) {
                                          switch (_context7.prev = _context7.next) {
                                            case 0:
                                              console.log(err);
                                              _context7.prev = 1;
                                              _context7.next = 4;
                                              return _models["default"].error.create({
                                                type: 'ClassSelection',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context7.next = 9;
                                              break;

                                            case 6:
                                              _context7.prev = 6;
                                              _context7.t0 = _context7["catch"](1);

                                              _logger["default"].error("Error Discord: ".concat(_context7.t0));

                                            case 9:
                                              if (!(err.code && err.code === 50007)) {
                                                _context7.next = 22;
                                                break;
                                              }

                                              if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                                                _context7.next = 18;
                                                break;
                                              }

                                              _context7.next = 13;
                                              return discordClient.channels.cache.get(message.channelId);

                                            case 13:
                                              _discordChannel = _context7.sent;
                                              _context7.next = 16;
                                              return _discordChannel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 16:
                                              _context7.next = 20;
                                              break;

                                            case 18:
                                              _context7.next = 20;
                                              return message.channel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 20:
                                              _context7.next = 32;
                                              break;

                                            case 22:
                                              if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                                                _context7.next = 30;
                                                break;
                                              }

                                              _context7.next = 25;
                                              return discordClient.channels.cache.get(message.channelId);

                                            case 25:
                                              _discordChannel2 = _context7.sent;
                                              _context7.next = 28;
                                              return _discordChannel2.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 28:
                                              _context7.next = 32;
                                              break;

                                            case 30:
                                              _context7.next = 32;
                                              return message.channel.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 32:
                                            case "end":
                                              return _context7.stop();
                                          }
                                        }
                                      }, _callee7, null, [[1, 6]]);
                                    }));

                                    return function (_x12) {
                                      return _ref11.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                  if (activity.length > 0) {
                                    io.to('admin').emit('updateActivity', {
                                      activity: activity
                                    });
                                  }

                                case 3:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          }, _callee8);
                        })));

                      case 3:
                        _context9.t0 = interaction;
                        _context9.next = 6;
                        return generateClassPicked(currentIndex);

                      case 6:
                        _context9.t1 = _context9.sent;
                        _context9.t2 = [_context9.t1];
                        _context9.t3 = [];
                        _context9.t4 = {
                          files: _context9.t2,
                          components: _context9.t3
                        };
                        _context9.next = 12;
                        return _context9.t0.update.call(_context9.t0, _context9.t4);

                      case 12:
                        return _context9.abrupt("return");

                      case 13:
                        if (!(interaction.customId === cancelPickClassId)) {
                          _context9.next = 24;
                          break;
                        }

                        _context9.t5 = interaction;
                        _context9.next = 17;
                        return generateCancelClassPicked();

                      case 17:
                        _context9.t6 = _context9.sent;
                        _context9.t7 = [_context9.t6];
                        _context9.t8 = [];
                        _context9.t9 = {
                          files: _context9.t7,
                          components: _context9.t8
                        };
                        _context9.next = 23;
                        return _context9.t5.update.call(_context9.t5, _context9.t9);

                      case 23:
                        return _context9.abrupt("return");

                      case 24:
                        // Increase/decrease index
                        interaction.customId === backId ? currentIndex -= 1 : currentIndex += 1; // Load another character

                        _context9.t10 = interaction;
                        _context9.next = 28;
                        return generateClassImage(currentIndex);

                      case 28:
                        _context9.t11 = _context9.sent;
                        _context9.t12 = [_context9.t11];
                        _context9.t13 = _discord.MessageActionRow;
                        _context9.next = 33;
                        return generatePickClassButton(currentIndex);

                      case 33:
                        _context9.t14 = _context9.sent;
                        _context9.next = 36;
                        return generateCancelPickClassButton();

                      case 36:
                        _context9.t15 = _context9.sent;
                        _context9.t16 = [_context9.t14, _context9.t15];
                        _context9.t17 = {
                          components: _context9.t16
                        };
                        _context9.t18 = new _context9.t13(_context9.t17);
                        _context9.t19 = new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [backButton] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < classes.length ? [forwardButton] : []))
                        });
                        _context9.t20 = [_context9.t18, _context9.t19];
                        _context9.t21 = {
                          files: _context9.t12,
                          components: _context9.t20
                        };
                        _context9.next = 45;
                        return _context9.t10.update.call(_context9.t10, _context9.t21);

                      case 45:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x10) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 73:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function discordPickClass(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordPickClass = discordPickClass;