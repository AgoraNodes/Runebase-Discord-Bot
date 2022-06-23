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

var _pickClass = require("../render/pickClass");

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(discordClient, message, setting, io, queue) {
    var userId, user, activity, CurrentClassSelectionId, classes, discordChannel, backId, forwardId, pickClassId, cancelPickClassId, backButton, forwardButton, generateClassPicked, generateCancelClassPicked, generatePickClassButton, generateCancelPickClassButton, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context9.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 3:
            user = _context9.sent;

            if (user) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return");

          case 6:
            activity = [];
            _context9.next = 9;
            return _models["default"]["class"].findAll({
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription'
              }]
            });

          case 9:
            classes = _context9.sent;

            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context9.next = 22;
              break;
            }

            if (!message.guildId) {
              _context9.next = 17;
              break;
            }

            _context9.next = 14;
            return discordClient.channels.cache.get(message.channelId);

          case 14:
            discordChannel = _context9.sent;
            _context9.next = 20;
            break;

          case 17:
            _context9.next = 19;
            return discordClient.users.cache.get(message.user.id);

          case 19:
            discordChannel = _context9.sent;

          case 20:
            _context9.next = 30;
            break;

          case 22:
            if (!(message.channel.type === 'DM')) {
              _context9.next = 26;
              break;
            }

            _context9.next = 25;
            return discordClient.channels.cache.get(message.channelId);

          case 25:
            discordChannel = _context9.sent;

          case 26:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context9.next = 30;
              break;
            }

            _context9.next = 29;
            return discordClient.channels.cache.get(message.channelId);

          case 29:
            discordChannel = _context9.sent;

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
            _context9.next = 38;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 38:
            generateClassPicked = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start) {
                var current, canvas, ctx;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        ctx.fillText("".concat(user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'picked.png'));

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateClassPicked(_x6) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateCancelClassPicked = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(start) {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
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
                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateCancelClassPicked(_x7) {
                return _ref3.apply(this, arguments);
              };
            }();

            generatePickClassButton = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(start) {
                var current;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        CurrentClassSelectionId = current[0].id;
                        console.log(current);
                        return _context3.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Pick ".concat(current[0].name),
                          emoji: '⛏️',
                          customId: pickClassId
                        }));

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generatePickClassButton(_x8) {
                return _ref4.apply(this, arguments);
              };
            }();

            generateCancelPickClassButton = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Cancel class selection",
                          emoji: '❌',
                          customId: cancelPickClassId
                        }));

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generateCancelPickClassButton() {
                return _ref5.apply(this, arguments);
              };
            }();

            canFitOnOnePage = classes.length <= 1;
            _context9.t0 = discordChannel;
            _context9.next = 46;
            return (0, _pickClass.renderPickClassImage)(0, classes, user);

          case 46:
            _context9.t1 = _context9.sent;
            _context9.t2 = [_context9.t1];

            if (!canFitOnOnePage) {
              _context9.next = 52;
              break;
            }

            _context9.t3 = [];
            _context9.next = 64;
            break;

          case 52:
            _context9.t4 = _discord.MessageActionRow;
            _context9.next = 55;
            return generatePickClassButton(0);

          case 55:
            _context9.t5 = _context9.sent;
            _context9.next = 58;
            return generateCancelPickClassButton();

          case 58:
            _context9.t6 = _context9.sent;
            _context9.t7 = [_context9.t5, _context9.t6];
            _context9.t8 = {
              components: _context9.t7
            };
            _context9.t9 = new _context9.t4(_context9.t8);
            _context9.t10 = new _discord.MessageActionRow({
              components: [forwardButton]
            });
            _context9.t3 = [_context9.t9, _context9.t10];

          case 64:
            _context9.t11 = _context9.t3;
            _context9.t12 = {
              files: _context9.t2,
              components: _context9.t11
            };
            _context9.next = 68;
            return _context9.t0.send.call(_context9.t0, _context9.t12);

          case 68:
            embedMessage = _context9.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref6) {
                var discordUser = _ref6.user;
                return discordUser.id === user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(interaction) {
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (!(interaction.customId === pickClassId)) {
                          _context8.next = 13;
                          break;
                        }

                        _context8.next = 3;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                          return _regenerator["default"].wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(t) {
                                      var findCurrentUser, selectedClass, userClass, newStats, newCondition, newInventory, newEquipment, _newCondition, _newStats, inventory, equipment, findAttackSkill, userAttackSkill, preActivity, finalActivity;

                                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                                        while (1) {
                                          switch (_context5.prev = _context5.next) {
                                            case 0:
                                              _context5.next = 2;
                                              return _models["default"].user.findOne({
                                                where: {
                                                  id: user.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 2:
                                              findCurrentUser = _context5.sent;
                                              _context5.next = 5;
                                              return _models["default"]["class"].findOne({
                                                where: {
                                                  id: CurrentClassSelectionId
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 5:
                                              selectedClass = _context5.sent;
                                              _context5.next = 8;
                                              return findCurrentUser.update({
                                                currentClassId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 8:
                                              _context5.next = 10;
                                              return _models["default"].UserClass.findOne({
                                                where: {
                                                  userId: findCurrentUser.id,
                                                  classId: CurrentClassSelectionId
                                                }
                                              });

                                            case 10:
                                              userClass = _context5.sent;

                                              if (userClass) {
                                                _context5.next = 29;
                                                break;
                                              }

                                              _context5.next = 14;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 14:
                                              newStats = _context5.sent;
                                              _context5.next = 17;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 17:
                                              newCondition = _context5.sent;
                                              _context5.next = 20;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 20:
                                              newInventory = _context5.sent;
                                              _context5.next = 23;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 23:
                                              newEquipment = _context5.sent;
                                              _context5.next = 26;
                                              return _models["default"].UserClass.create({
                                                userId: user.id,
                                                classId: CurrentClassSelectionId,
                                                statsId: newStats.id,
                                                conditionId: newCondition.id,
                                                inventoryId: newInventory.id,
                                                equipmentId: newEquipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 26:
                                              userClass = _context5.sent;
                                              _context5.next = 30;
                                              break;

                                            case 29:
                                              userClass.update({
                                                classId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 30:
                                              if (userClass.conditionId) {
                                                _context5.next = 35;
                                                break;
                                              }

                                              _context5.next = 33;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 33:
                                              _newCondition = _context5.sent;
                                              userClass.update({
                                                conditionId: _newCondition.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 35:
                                              if (userClass.statsId) {
                                                _context5.next = 40;
                                                break;
                                              }

                                              _context5.next = 38;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 38:
                                              _newStats = _context5.sent;
                                              userClass.update({
                                                statsId: _newStats.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 40:
                                              if (userClass.inventoryId) {
                                                _context5.next = 45;
                                                break;
                                              }

                                              _context5.next = 43;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 43:
                                              inventory = _context5.sent;
                                              userClass.update({
                                                inventoryId: inventory.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 45:
                                              if (userClass.equipmentId) {
                                                _context5.next = 50;
                                                break;
                                              }

                                              _context5.next = 48;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 48:
                                              equipment = _context5.sent;
                                              userClass.update({
                                                equipmentId: equipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 50:
                                              _context5.next = 52;
                                              return _models["default"].skill.findOne({
                                                where: {
                                                  name: 'Attack'
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 52:
                                              findAttackSkill = _context5.sent;
                                              _context5.next = 55;
                                              return _models["default"].UserClassSkill.findOne({
                                                where: {
                                                  UserClassId: userClass.id,
                                                  skillId: findAttackSkill.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 55:
                                              userAttackSkill = _context5.sent;

                                              if (userAttackSkill) {
                                                _context5.next = 60;
                                                break;
                                              }

                                              _context5.next = 59;
                                              return _models["default"].UserClassSkill.create({
                                                UserClassId: userClass.id,
                                                skillId: findAttackSkill.id,
                                                points: 1
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 59:
                                              userAttackSkill = _context5.sent;

                                            case 60:
                                              if (userClass.selectedMainSkillId) {
                                                _context5.next = 64;
                                                break;
                                              }

                                              _context5.next = 63;
                                              return userClass.update({
                                                selectedMainSkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 63:
                                              userClass = _context5.sent;

                                            case 64:
                                              if (userClass.selectedSecondarySkillId) {
                                                _context5.next = 68;
                                                break;
                                              }

                                              _context5.next = 67;
                                              return userClass.update({
                                                selectedSecondarySkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 67:
                                              userClass = _context5.sent;

                                            case 68:
                                              _context5.next = 70;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 70:
                                              preActivity = _context5.sent;
                                              _context5.next = 73;
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

                                            case 73:
                                              finalActivity = _context5.sent;
                                              activity.unshift(finalActivity);

                                            case 75:
                                            case "end":
                                              return _context5.stop();
                                          }
                                        }
                                      }, _callee5);
                                    }));

                                    return function (_x10) {
                                      return _ref9.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err) {
                                      var _discordChannel, _discordChannel2;

                                      return _regenerator["default"].wrap(function _callee6$(_context6) {
                                        while (1) {
                                          switch (_context6.prev = _context6.next) {
                                            case 0:
                                              console.log(err);
                                              _context6.prev = 1;
                                              _context6.next = 4;
                                              return _models["default"].error.create({
                                                type: 'ClassSelection',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context6.next = 9;
                                              break;

                                            case 6:
                                              _context6.prev = 6;
                                              _context6.t0 = _context6["catch"](1);

                                              _logger["default"].error("Error Discord: ".concat(_context6.t0));

                                            case 9:
                                              if (!(err.code && err.code === 50007)) {
                                                _context6.next = 22;
                                                break;
                                              }

                                              if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                                                _context6.next = 18;
                                                break;
                                              }

                                              _context6.next = 13;
                                              return discordClient.channels.cache.get(message.channelId);

                                            case 13:
                                              _discordChannel = _context6.sent;
                                              _context6.next = 16;
                                              return _discordChannel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 16:
                                              _context6.next = 20;
                                              break;

                                            case 18:
                                              _context6.next = 20;
                                              return message.channel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 20:
                                              _context6.next = 32;
                                              break;

                                            case 22:
                                              if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
                                                _context6.next = 30;
                                                break;
                                              }

                                              _context6.next = 25;
                                              return discordClient.channels.cache.get(message.channelId);

                                            case 25:
                                              _discordChannel2 = _context6.sent;
                                              _context6.next = 28;
                                              return _discordChannel2.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 28:
                                              _context6.next = 32;
                                              break;

                                            case 30:
                                              _context6.next = 32;
                                              return message.channel.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 32:
                                            case "end":
                                              return _context6.stop();
                                          }
                                        }
                                      }, _callee6, null, [[1, 6]]);
                                    }));

                                    return function (_x11) {
                                      return _ref10.apply(this, arguments);
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
                                  return _context7.stop();
                              }
                            }
                          }, _callee7);
                        })));

                      case 3:
                        _context8.t0 = interaction;
                        _context8.next = 6;
                        return generateClassPicked(currentIndex);

                      case 6:
                        _context8.t1 = _context8.sent;
                        _context8.t2 = [_context8.t1];
                        _context8.t3 = [];
                        _context8.t4 = {
                          files: _context8.t2,
                          components: _context8.t3
                        };
                        _context8.next = 12;
                        return _context8.t0.update.call(_context8.t0, _context8.t4);

                      case 12:
                        return _context8.abrupt("return");

                      case 13:
                        if (!(interaction.customId === cancelPickClassId)) {
                          _context8.next = 24;
                          break;
                        }

                        _context8.t5 = interaction;
                        _context8.next = 17;
                        return generateCancelClassPicked();

                      case 17:
                        _context8.t6 = _context8.sent;
                        _context8.t7 = [_context8.t6];
                        _context8.t8 = [];
                        _context8.t9 = {
                          files: _context8.t7,
                          components: _context8.t8
                        };
                        _context8.next = 23;
                        return _context8.t5.update.call(_context8.t5, _context8.t9);

                      case 23:
                        return _context8.abrupt("return");

                      case 24:
                        // Increase/decrease index
                        interaction.customId === backId ? currentIndex -= 1 : currentIndex += 1; // Load another character

                        _context8.t10 = interaction;
                        _context8.next = 28;
                        return (0, _pickClass.renderPickClassImage)(currentIndex, classes, user);

                      case 28:
                        _context8.t11 = _context8.sent;
                        _context8.t12 = [_context8.t11];
                        _context8.t13 = _discord.MessageActionRow;
                        _context8.next = 33;
                        return generatePickClassButton(currentIndex);

                      case 33:
                        _context8.t14 = _context8.sent;
                        _context8.next = 36;
                        return generateCancelPickClassButton();

                      case 36:
                        _context8.t15 = _context8.sent;
                        _context8.t16 = [_context8.t14, _context8.t15];
                        _context8.t17 = {
                          components: _context8.t16
                        };
                        _context8.t18 = new _context8.t13(_context8.t17);
                        _context8.t19 = new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [backButton] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < classes.length ? [forwardButton] : []))
                        });
                        _context8.t20 = [_context8.t18, _context8.t19];
                        _context8.t21 = {
                          files: _context8.t12,
                          components: _context8.t20
                        };
                        _context8.next = 45;
                        return _context8.t10.update.call(_context8.t10, _context8.t21);

                      case 45:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x9) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 72:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function discordPickClass(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordPickClass = discordPickClass;