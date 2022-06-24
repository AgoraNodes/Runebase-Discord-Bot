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

var _discord = require("discord.js");

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _pickClass = require("../render/pickClass/pickClass");

var _classPicked = require("../render/pickClass/classPicked");

var _cancelClassPick = require("../render/pickClass/cancelClassPick");

/* eslint-disable import/prefer-default-export */
var discordPickClass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(discordClient, message, setting, io, queue) {
    var userId, user, activity, CurrentClassSelectionId, classes, discordChannel, backId, forwardId, pickClassId, cancelPickClassId, backButton, forwardButton, generatePickClassButton, generateCancelPickClassButton, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context7.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 3:
            user = _context7.sent;

            if (user) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return");

          case 6:
            activity = [];
            _context7.next = 9;
            return _models["default"]["class"].findAll({
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription'
              }]
            });

          case 9:
            classes = _context7.sent;
            _context7.next = 12;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 12:
            discordChannel = _context7.sent;
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

            generatePickClassButton = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start) {
                var current;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        current = classes.slice(start, start + 1);
                        CurrentClassSelectionId = current[0].id;
                        console.log(current);
                        return _context.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Pick ".concat(current[0].name),
                          emoji: '⛏️',
                          customId: pickClassId
                        }));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generatePickClassButton(_x6) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateCancelPickClassButton = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Cancel class selection",
                          emoji: '❌',
                          customId: cancelPickClassId
                        }));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateCancelPickClassButton() {
                return _ref3.apply(this, arguments);
              };
            }();

            canFitOnOnePage = classes.length <= 1;
            _context7.t0 = discordChannel;
            _context7.next = 25;
            return (0, _pickClass.renderPickClassImage)(0, classes, user);

          case 25:
            _context7.t1 = _context7.sent;
            _context7.t2 = [_context7.t1];

            if (!canFitOnOnePage) {
              _context7.next = 31;
              break;
            }

            _context7.t3 = [];
            _context7.next = 43;
            break;

          case 31:
            _context7.t4 = _discord.MessageActionRow;
            _context7.next = 34;
            return generatePickClassButton(0);

          case 34:
            _context7.t5 = _context7.sent;
            _context7.next = 37;
            return generateCancelPickClassButton();

          case 37:
            _context7.t6 = _context7.sent;
            _context7.t7 = [_context7.t5, _context7.t6];
            _context7.t8 = {
              components: _context7.t7
            };
            _context7.t9 = new _context7.t4(_context7.t8);
            _context7.t10 = new _discord.MessageActionRow({
              components: [forwardButton]
            });
            _context7.t3 = [_context7.t9, _context7.t10];

          case 43:
            _context7.t11 = _context7.t3;
            _context7.t12 = {
              files: _context7.t2,
              components: _context7.t11
            };
            _context7.next = 47;
            return _context7.t0.send.call(_context7.t0, _context7.t12);

          case 47:
            embedMessage = _context7.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref4) {
                var discordUser = _ref4.user;
                return discordUser.id === user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(interaction) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!(interaction.customId === pickClassId)) {
                          _context6.next = 13;
                          break;
                        }

                        _context6.next = 3;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(t) {
                                      var findCurrentUser, selectedClass, userClass, newStats, newCondition, newInventory, newEquipment, _newCondition, _newStats, inventory, equipment, findAttackSkill, userAttackSkill, preActivity, finalActivity;

                                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.next = 2;
                                              return _models["default"].user.findOne({
                                                where: {
                                                  id: user.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 2:
                                              findCurrentUser = _context3.sent;
                                              _context3.next = 5;
                                              return _models["default"]["class"].findOne({
                                                where: {
                                                  id: CurrentClassSelectionId
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 5:
                                              selectedClass = _context3.sent;
                                              _context3.next = 8;
                                              return findCurrentUser.update({
                                                currentClassId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 8:
                                              _context3.next = 10;
                                              return _models["default"].UserClass.findOne({
                                                where: {
                                                  userId: findCurrentUser.id,
                                                  classId: CurrentClassSelectionId
                                                }
                                              });

                                            case 10:
                                              userClass = _context3.sent;

                                              if (userClass) {
                                                _context3.next = 29;
                                                break;
                                              }

                                              _context3.next = 14;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 14:
                                              newStats = _context3.sent;
                                              _context3.next = 17;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 17:
                                              newCondition = _context3.sent;
                                              _context3.next = 20;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 20:
                                              newInventory = _context3.sent;
                                              _context3.next = 23;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 23:
                                              newEquipment = _context3.sent;
                                              _context3.next = 26;
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
                                              userClass = _context3.sent;
                                              _context3.next = 30;
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
                                                _context3.next = 35;
                                                break;
                                              }

                                              _context3.next = 33;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 33:
                                              _newCondition = _context3.sent;
                                              userClass.update({
                                                conditionId: _newCondition.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 35:
                                              if (userClass.statsId) {
                                                _context3.next = 40;
                                                break;
                                              }

                                              _context3.next = 38;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 38:
                                              _newStats = _context3.sent;
                                              userClass.update({
                                                statsId: _newStats.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 40:
                                              if (userClass.inventoryId) {
                                                _context3.next = 45;
                                                break;
                                              }

                                              _context3.next = 43;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 43:
                                              inventory = _context3.sent;
                                              userClass.update({
                                                inventoryId: inventory.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 45:
                                              if (userClass.equipmentId) {
                                                _context3.next = 50;
                                                break;
                                              }

                                              _context3.next = 48;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 48:
                                              equipment = _context3.sent;
                                              userClass.update({
                                                equipmentId: equipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 50:
                                              _context3.next = 52;
                                              return _models["default"].skill.findOne({
                                                where: {
                                                  name: 'Attack'
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 52:
                                              findAttackSkill = _context3.sent;
                                              _context3.next = 55;
                                              return _models["default"].UserClassSkill.findOne({
                                                where: {
                                                  UserClassId: userClass.id,
                                                  skillId: findAttackSkill.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 55:
                                              userAttackSkill = _context3.sent;

                                              if (userAttackSkill) {
                                                _context3.next = 60;
                                                break;
                                              }

                                              _context3.next = 59;
                                              return _models["default"].UserClassSkill.create({
                                                UserClassId: userClass.id,
                                                skillId: findAttackSkill.id,
                                                points: 1
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 59:
                                              userAttackSkill = _context3.sent;

                                            case 60:
                                              if (userClass.selectedMainSkillId) {
                                                _context3.next = 64;
                                                break;
                                              }

                                              _context3.next = 63;
                                              return userClass.update({
                                                selectedMainSkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 63:
                                              userClass = _context3.sent;

                                            case 64:
                                              if (userClass.selectedSecondarySkillId) {
                                                _context3.next = 68;
                                                break;
                                              }

                                              _context3.next = 67;
                                              return userClass.update({
                                                selectedSecondarySkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 67:
                                              userClass = _context3.sent;

                                            case 68:
                                              _context3.next = 70;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 70:
                                              preActivity = _context3.sent;
                                              _context3.next = 73;
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
                                              finalActivity = _context3.sent;
                                              activity.unshift(finalActivity);

                                            case 75:
                                            case "end":
                                              return _context3.stop();
                                          }
                                        }
                                      }, _callee3);
                                    }));

                                    return function (_x8) {
                                      return _ref7.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                                      var _discordChannel, _discordChannel2;

                                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                                        while (1) {
                                          switch (_context4.prev = _context4.next) {
                                            case 0:
                                              console.log(err);
                                              _context4.prev = 1;
                                              _context4.next = 4;
                                              return _models["default"].error.create({
                                                type: 'ClassSelection',
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
                                              _discordChannel = _context4.sent;
                                              _context4.next = 16;
                                              return _discordChannel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 16:
                                              _context4.next = 20;
                                              break;

                                            case 18:
                                              _context4.next = 20;
                                              return message.channel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
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
                                              _discordChannel2 = _context4.sent;
                                              _context4.next = 28;
                                              return _discordChannel2.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 28:
                                              _context4.next = 32;
                                              break;

                                            case 30:
                                              _context4.next = 32;
                                              return message.channel.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
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
                                      return _ref8.apply(this, arguments);
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
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 3:
                        _context6.t0 = interaction;
                        _context6.next = 6;
                        return (0, _classPicked.renderClassPicked)(currentIndex, classes, user);

                      case 6:
                        _context6.t1 = _context6.sent;
                        _context6.t2 = [_context6.t1];
                        _context6.t3 = [];
                        _context6.t4 = {
                          files: _context6.t2,
                          components: _context6.t3
                        };
                        _context6.next = 12;
                        return _context6.t0.update.call(_context6.t0, _context6.t4);

                      case 12:
                        return _context6.abrupt("return");

                      case 13:
                        if (!(interaction.customId === cancelPickClassId)) {
                          _context6.next = 24;
                          break;
                        }

                        _context6.t5 = interaction;
                        _context6.next = 17;
                        return (0, _cancelClassPick.renderCancelClassPicked)(user);

                      case 17:
                        _context6.t6 = _context6.sent;
                        _context6.t7 = [_context6.t6];
                        _context6.t8 = [];
                        _context6.t9 = {
                          files: _context6.t7,
                          components: _context6.t8
                        };
                        _context6.next = 23;
                        return _context6.t5.update.call(_context6.t5, _context6.t9);

                      case 23:
                        return _context6.abrupt("return");

                      case 24:
                        // Increase/decrease index
                        interaction.customId === backId ? currentIndex -= 1 : currentIndex += 1; // Load another character

                        _context6.t10 = interaction;
                        _context6.next = 28;
                        return (0, _pickClass.renderPickClassImage)(currentIndex, classes, user);

                      case 28:
                        _context6.t11 = _context6.sent;
                        _context6.t12 = [_context6.t11];
                        _context6.t13 = _discord.MessageActionRow;
                        _context6.next = 33;
                        return generatePickClassButton(currentIndex);

                      case 33:
                        _context6.t14 = _context6.sent;
                        _context6.next = 36;
                        return generateCancelPickClassButton();

                      case 36:
                        _context6.t15 = _context6.sent;
                        _context6.t16 = [_context6.t14, _context6.t15];
                        _context6.t17 = {
                          components: _context6.t16
                        };
                        _context6.t18 = new _context6.t13(_context6.t17);
                        _context6.t19 = new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [backButton] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < classes.length ? [forwardButton] : []))
                        });
                        _context6.t20 = [_context6.t18, _context6.t19];
                        _context6.t21 = {
                          files: _context6.t12,
                          components: _context6.t20
                        };
                        _context6.next = 45;
                        return _context6.t10.update.call(_context6.t10, _context6.t21);

                      case 45:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 51:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function discordPickClass(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordPickClass = discordPickClass;