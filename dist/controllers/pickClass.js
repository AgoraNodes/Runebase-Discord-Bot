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

var _buttons = require("../buttons");

/* eslint-disable import/prefer-default-export */
var discordPickClass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, setting, io, queue) {
    var userId, user, activity, classes, discordChannel, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context5.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 3:
            user = _context5.sent;

            if (user) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return");

          case 6:
            activity = [];
            _context5.next = 9;
            return _models["default"]["class"].findAll({
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription'
              }]
            });

          case 9:
            classes = _context5.sent;
            _context5.next = 12;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 12:
            discordChannel = _context5.sent;
            canFitOnOnePage = classes.length <= 1;
            _context5.t0 = discordChannel;
            _context5.next = 17;
            return (0, _pickClass.renderPickClassImage)(0, classes, user);

          case 17:
            _context5.t1 = _context5.sent;
            _context5.t2 = [_context5.t1];

            if (!canFitOnOnePage) {
              _context5.next = 23;
              break;
            }

            _context5.t3 = [];
            _context5.next = 35;
            break;

          case 23:
            _context5.t4 = _discord.MessageActionRow;
            _context5.next = 26;
            return (0, _buttons.generatePickClassButton)(0, classes);

          case 26:
            _context5.t5 = _context5.sent;
            _context5.next = 29;
            return (0, _buttons.generateCancelPickClassButton)();

          case 29:
            _context5.t6 = _context5.sent;
            _context5.t7 = [_context5.t5, _context5.t6];
            _context5.t8 = {
              components: _context5.t7
            };
            _context5.t9 = new _context5.t4(_context5.t8);
            _context5.t10 = new _discord.MessageActionRow({
              components: [(0, _buttons.generateForwardButton)()]
            });
            _context5.t3 = [_context5.t9, _context5.t10];

          case 35:
            _context5.t11 = _context5.t3;
            _context5.t12 = {
              files: _context5.t2,
              components: _context5.t11
            };
            _context5.next = 39;
            return _context5.t0.send.call(_context5.t0, _context5.t12);

          case 39:
            embedMessage = _context5.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref2) {
                var discordUser = _ref2.user;
                return discordUser.id === user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(interaction) {
                var CurrentClassSelectionId;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!interaction.customId.startsWith('pickClass:')) {
                          _context4.next = 5;
                          break;
                        }

                        CurrentClassSelectionId = Number(interaction.customId.replace("pickClass:", ""));
                        _context4.next = 4;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                                      var findCurrentUser, selectedClass, UserGroup, userGroupClass, newStats, newCondition, newInventory, newEquipment, _newCondition, _newStats, inventory, equipment, findAttackSkill, userAttackSkill, preActivity, finalActivity;

                                      return _regenerator["default"].wrap(function _callee$(_context) {
                                        while (1) {
                                          switch (_context.prev = _context.next) {
                                            case 0:
                                              _context.next = 2;
                                              return _models["default"].user.findOne({
                                                where: {
                                                  id: user.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 2:
                                              findCurrentUser = _context.sent;
                                              console.log('1');
                                              _context.next = 6;
                                              return _models["default"]["class"].findOne({
                                                where: {
                                                  id: CurrentClassSelectionId
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 6:
                                              selectedClass = _context.sent;
                                              console.log('2');
                                              _context.next = 10;
                                              return findCurrentUser.update({
                                                currentClassId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 10:
                                              console.log('3');
                                              _context.next = 13;
                                              return _models["default"].UserGroup.findOne({
                                                where: {
                                                  userId: findCurrentUser.id,
                                                  groupId: findCurrentUser.currentRealmId
                                                }
                                              });

                                            case 13:
                                              UserGroup = _context.sent;
                                              console.log('4');
                                              _context.next = 17;
                                              return _models["default"].UserGroupClass.findOne({
                                                where: {
                                                  UserGroupId: UserGroup.id,
                                                  classId: CurrentClassSelectionId
                                                }
                                              });

                                            case 17:
                                              userGroupClass = _context.sent;
                                              console.log('5');

                                              if (userGroupClass) {
                                                _context.next = 40;
                                                break;
                                              }

                                              _context.next = 22;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 22:
                                              newStats = _context.sent;
                                              console.log('5-1');
                                              _context.next = 26;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 26:
                                              newCondition = _context.sent;
                                              console.log('5-2');
                                              _context.next = 30;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 30:
                                              newInventory = _context.sent;
                                              console.log('5-3');
                                              _context.next = 34;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 34:
                                              newEquipment = _context.sent;
                                              console.log('5-4');
                                              _context.next = 38;
                                              return _models["default"].UserGroupClass.create({
                                                userId: 1,
                                                // to be removed
                                                UserGroupId: UserGroup.id,
                                                classId: CurrentClassSelectionId,
                                                statsId: newStats.id,
                                                conditionId: newCondition.id,
                                                inventoryId: newInventory.id,
                                                equipmentId: newEquipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 38:
                                              userGroupClass = _context.sent;
                                              console.log('5-5');

                                            case 40:
                                              // else {
                                              //   userClass.update({
                                              //     classId: CurrentClassSelectionId,
                                              //   }, {
                                              //     transaction: t,
                                              //     lock: t.LOCK.UPDATE,
                                              //   });
                                              // }
                                              console.log('7');

                                              if (userGroupClass.conditionId) {
                                                _context.next = 46;
                                                break;
                                              }

                                              _context.next = 44;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 44:
                                              _newCondition = _context.sent;
                                              userGroupClass.update({
                                                conditionId: _newCondition.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 46:
                                              console.log('8');

                                              if (userGroupClass.statsId) {
                                                _context.next = 52;
                                                break;
                                              }

                                              _context.next = 50;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 50:
                                              _newStats = _context.sent;
                                              userGroupClass.update({
                                                statsId: _newStats.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 52:
                                              if (userGroupClass.inventoryId) {
                                                _context.next = 57;
                                                break;
                                              }

                                              _context.next = 55;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 55:
                                              inventory = _context.sent;
                                              userGroupClass.update({
                                                inventoryId: inventory.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 57:
                                              if (userGroupClass.equipmentId) {
                                                _context.next = 62;
                                                break;
                                              }

                                              _context.next = 60;
                                              return _models["default"].equipment.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 60:
                                              equipment = _context.sent;
                                              userGroupClass.update({
                                                equipmentId: equipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 62:
                                              _context.next = 64;
                                              return _models["default"].skill.findOne({
                                                where: {
                                                  name: 'Attack'
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 64:
                                              findAttackSkill = _context.sent;
                                              _context.next = 67;
                                              return _models["default"].UserGroupClassSkill.findOne({
                                                where: {
                                                  UserGroupClassId: userGroupClass.id,
                                                  skillId: findAttackSkill.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 67:
                                              userAttackSkill = _context.sent;

                                              if (userAttackSkill) {
                                                _context.next = 74;
                                                break;
                                              }

                                              console.log('before create UserGroupClassSkill');
                                              _context.next = 72;
                                              return _models["default"].UserGroupClassSkill.create({
                                                UserClassId: 2,
                                                // to be removed
                                                UserGroupClassId: userGroupClass.id,
                                                skillId: findAttackSkill.id,
                                                points: 1
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 72:
                                              userAttackSkill = _context.sent;
                                              console.log('after create UserGroupClassSkill');

                                            case 74:
                                              if (userGroupClass.selectedMainSkillId) {
                                                _context.next = 78;
                                                break;
                                              }

                                              _context.next = 77;
                                              return userGroupClass.update({
                                                selectedMainSkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 77:
                                              userGroupClass = _context.sent;

                                            case 78:
                                              if (userGroupClass.selectedSecondarySkillId) {
                                                _context.next = 82;
                                                break;
                                              }

                                              _context.next = 81;
                                              return userGroupClass.update({
                                                selectedSecondarySkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 81:
                                              userGroupClass = _context.sent;

                                            case 82:
                                              _context.t0 = interaction;
                                              _context.next = 85;
                                              return (0, _classPicked.renderClassPicked)(currentIndex, classes, user);

                                            case 85:
                                              _context.t1 = _context.sent;
                                              _context.t2 = [_context.t1];
                                              _context.t3 = [];
                                              _context.t4 = {
                                                files: _context.t2,
                                                components: _context.t3
                                              };
                                              _context.next = 91;
                                              return _context.t0.update.call(_context.t0, _context.t4);

                                            case 91:
                                              _context.next = 93;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 93:
                                              preActivity = _context.sent;
                                              _context.next = 96;
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

                                            case 96:
                                              finalActivity = _context.sent;
                                              activity.unshift(finalActivity);

                                            case 98:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee);
                                    }));

                                    return function (_x7) {
                                      return _ref5.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                                      var _discordChannel, _discordChannel2;

                                      return _regenerator["default"].wrap(function _callee2$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              console.log(err);
                                              _context2.prev = 1;
                                              _context2.next = 4;
                                              return _models["default"].error.create({
                                                type: 'ClassSelection',
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
                                              _discordChannel = _context2.sent;
                                              _context2.next = 16;
                                              return _discordChannel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 16:
                                              _context2.next = 20;
                                              break;

                                            case 18:
                                              _context2.next = 20;
                                              return message.channel.send({
                                                embeds: [(0, _messages.cannotSendMessageUser)("ClassSelection", message)]
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
                                              _discordChannel2 = _context2.sent;
                                              _context2.next = 28;
                                              return _discordChannel2.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 28:
                                              _context2.next = 32;
                                              break;

                                            case 30:
                                              _context2.next = 32;
                                              return message.channel.send({
                                                embeds: [(0, _messages.discordErrorMessage)("ClassSelection")]
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

                                    return function (_x8) {
                                      return _ref6.apply(this, arguments);
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
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        })));

                      case 4:
                        return _context4.abrupt("return");

                      case 5:
                        if (!(interaction.customId === 'cancelClass')) {
                          _context4.next = 16;
                          break;
                        }

                        _context4.t0 = interaction;
                        _context4.next = 9;
                        return (0, _cancelClassPick.renderCancelClassPicked)(user);

                      case 9:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = [_context4.t1];
                        _context4.t3 = [];
                        _context4.t4 = {
                          files: _context4.t2,
                          components: _context4.t3
                        };
                        _context4.next = 15;
                        return _context4.t0.update.call(_context4.t0, _context4.t4);

                      case 15:
                        return _context4.abrupt("return");

                      case 16:
                        // Increase/decrease index
                        interaction.customId === 'back' ? currentIndex -= 1 : currentIndex += 1; // Load another character

                        _context4.t5 = interaction;
                        _context4.next = 20;
                        return (0, _pickClass.renderPickClassImage)(currentIndex, classes, user);

                      case 20:
                        _context4.t6 = _context4.sent;
                        _context4.t7 = [_context4.t6];
                        _context4.t8 = _discord.MessageActionRow;
                        _context4.next = 25;
                        return (0, _buttons.generatePickClassButton)(currentIndex, classes);

                      case 25:
                        _context4.t9 = _context4.sent;
                        _context4.next = 28;
                        return (0, _buttons.generateCancelPickClassButton)();

                      case 28:
                        _context4.t10 = _context4.sent;
                        _context4.t11 = [_context4.t9, _context4.t10];
                        _context4.t12 = {
                          components: _context4.t11
                        };
                        _context4.t13 = new _context4.t8(_context4.t12);
                        _context4.t14 = new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [(0, _buttons.generateBackButton)()] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < classes.length ? [(0, _buttons.generateForwardButton)()] : []))
                        });
                        _context4.t15 = [_context4.t13, _context4.t14];
                        _context4.t16 = {
                          files: _context4.t7,
                          components: _context4.t15
                        };
                        _context4.next = 37;
                        return _context4.t5.update.call(_context4.t5, _context4.t16);

                      case 37:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 43:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordPickClass(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordPickClass = discordPickClass;