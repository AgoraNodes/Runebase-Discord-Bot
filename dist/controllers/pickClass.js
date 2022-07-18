"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordPickClass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _embeds = require("../embeds");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _pickClass = require("../render/pickClass/pickClass");

var _classPicked = require("../render/pickClass/classPicked");

var _cancelClassPick = require("../render/pickClass/cancelClassPick");

var _generateStartingGear = require("../helpers/items/generateStartingGear");

var _buttons = require("../buttons");

var _messages = require("../messages");

/* eslint-disable import/prefer-default-export */
var discordPickClass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, setting, io, queue, isDefered) {
    var usedDeferReply, userId, user, activity, classes, discordChannel, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            usedDeferReply = false;

            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context5.next = 4;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              },
              include: [{
                model: _models["default"].UserGroup,
                as: 'UserGroup',
                include: [{
                  model: _models["default"].user,
                  as: 'user'
                }, {
                  model: _models["default"].group,
                  as: 'group'
                }]
              }]
            });

          case 4:
            user = _context5.sent;

            if (user) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return");

          case 7:
            if (user.currentRealmId) {
              _context5.next = 16;
              break;
            }

            if (isDefered) {
              _context5.next = 12;
              break;
            }

            _context5.next = 11;
            return message.reply({
              content: (0, _messages.notSelectedRealmYetMessage)(),
              ephemeral: true
            });

          case 11:
            return _context5.abrupt("return", usedDeferReply);

          case 12:
            _context5.next = 14;
            return message.editReply({
              content: (0, _messages.notSelectedRealmYetMessage)(),
              ephemeral: true
            });

          case 14:
            usedDeferReply = true;
            return _context5.abrupt("return", usedDeferReply);

          case 16:
            activity = [];
            _context5.next = 19;
            return _models["default"]["class"].findAll({
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription'
              }]
            });

          case 19:
            classes = _context5.sent;
            _context5.next = 22;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 22:
            discordChannel = _context5.sent;
            canFitOnOnePage = classes.length <= 1;
            _context5.t0 = discordChannel;
            _context5.t1 = (0, _messages.playingOnRealmMessage)(user);
            _context5.next = 28;
            return (0, _pickClass.renderPickClassImage)(0, classes, user);

          case 28:
            _context5.t2 = _context5.sent;
            _context5.t3 = {
              attachment: _context5.t2,
              name: 'pickClass.png'
            };
            _context5.t4 = [_context5.t3];

            if (!canFitOnOnePage) {
              _context5.next = 35;
              break;
            }

            _context5.t5 = [];
            _context5.next = 47;
            break;

          case 35:
            _context5.t6 = _discord.ActionRowBuilder;
            _context5.next = 38;
            return (0, _buttons.generatePickClassButton)(0, classes);

          case 38:
            _context5.t7 = _context5.sent;
            _context5.next = 41;
            return (0, _buttons.generateCancelPickClassButton)();

          case 41:
            _context5.t8 = _context5.sent;
            _context5.t9 = [_context5.t7, _context5.t8];
            _context5.t10 = {
              components: _context5.t9
            };
            _context5.t11 = new _context5.t6(_context5.t10);
            _context5.t12 = new _discord.ActionRowBuilder({
              components: [(0, _buttons.generateForwardButton)()]
            });
            _context5.t5 = [_context5.t11, _context5.t12];

          case 47:
            _context5.t13 = _context5.t5;
            _context5.t14 = {
              content: _context5.t1,
              files: _context5.t4,
              components: _context5.t13
            };
            _context5.next = 51;
            return _context5.t0.send.call(_context5.t0, _context5.t14);

          case 51:
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
                                      var findCurrentUser, selectedClass, UserGroup, userGroupClass, newCondition, newStats, inventory, _yield$generateStartG, _yield$generateStartG2, mainHand, offHand, equipment, findAttackSkill, userAttackSkill, preActivity, finalActivity;

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
                                              console.log('1'); // Find the Class The User is trying to pick

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
                                              console.log('2'); // Update What Class The user Currently has Selected

                                              _context.next = 10;
                                              return findCurrentUser.update({
                                                currentClassId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 10:
                                              console.log('3'); // Find the UserGroup Record (Realm related, user's experience is stored in this record)

                                              _context.next = 13;
                                              return _models["default"].UserGroup.findOne({
                                                where: {
                                                  userId: findCurrentUser.id,
                                                  groupId: findCurrentUser.currentRealmId
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 13:
                                              UserGroup = _context.sent;
                                              console.log('4'); // Find The userGroupClass (Does User already have class record for the realm he is trying to join?)

                                              _context.next = 17;
                                              return _models["default"].UserGroupClass.findOne({
                                                where: {
                                                  UserGroupId: UserGroup.id,
                                                  classId: CurrentClassSelectionId
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 17:
                                              userGroupClass = _context.sent;
                                              console.log('5'); // If the user has no class record for this realm yet

                                              if (userGroupClass) {
                                                _context.next = 24;
                                                break;
                                              }

                                              _context.next = 22;
                                              return _models["default"].UserGroupClass.create({
                                                UserGroupId: UserGroup.id,
                                                classId: CurrentClassSelectionId
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 22:
                                              userGroupClass = _context.sent;
                                              console.log('5-5');

                                            case 24:
                                              if (userGroupClass.conditionId) {
                                                _context.next = 29;
                                                break;
                                              }

                                              _context.next = 27;
                                              return _models["default"].condition.create({
                                                life: selectedClass.life,
                                                mana: selectedClass.mana,
                                                stamina: selectedClass.stamina
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 27:
                                              newCondition = _context.sent;
                                              userGroupClass.update({
                                                conditionId: newCondition.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 29:
                                              console.log('8'); // If User Has No Stats Record Yet;

                                              if (userGroupClass.statsId) {
                                                _context.next = 35;
                                                break;
                                              }

                                              _context.next = 33;
                                              return _models["default"].stats.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 33:
                                              newStats = _context.sent;
                                              userGroupClass.update({
                                                statsId: newStats.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 35:
                                              if (userGroupClass.inventoryId) {
                                                _context.next = 40;
                                                break;
                                              }

                                              _context.next = 38;
                                              return _models["default"].inventory.create({}, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 38:
                                              inventory = _context.sent;
                                              userGroupClass.update({
                                                inventoryId: inventory.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 40:
                                              if (userGroupClass.equipmentId) {
                                                _context.next = 51;
                                                break;
                                              }

                                              _context.next = 43;
                                              return (0, _generateStartingGear.generateStartGear)(selectedClass.name);

                                            case 43:
                                              _yield$generateStartG = _context.sent;
                                              _yield$generateStartG2 = (0, _slicedToArray2["default"])(_yield$generateStartG, 2);
                                              mainHand = _yield$generateStartG2[0];
                                              offHand = _yield$generateStartG2[1];
                                              _context.next = 49;
                                              return _models["default"].equipment.create({
                                                mainHandId: mainHand ? mainHand.id : null,
                                                offHandId: offHand ? offHand.id : null
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 49:
                                              equipment = _context.sent;
                                              userGroupClass.update({
                                                equipmentId: equipment.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 51:
                                              _context.next = 53;
                                              return _models["default"].skill.findOne({
                                                where: {
                                                  name: 'Attack'
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 53:
                                              findAttackSkill = _context.sent;
                                              _context.next = 56;
                                              return _models["default"].UserGroupClassSkill.findOne({
                                                where: {
                                                  UserGroupClassId: userGroupClass.id,
                                                  skillId: findAttackSkill.id
                                                },
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 56:
                                              userAttackSkill = _context.sent;

                                              if (userAttackSkill) {
                                                _context.next = 63;
                                                break;
                                              }

                                              console.log('before create UserGroupClassSkill');
                                              _context.next = 61;
                                              return _models["default"].UserGroupClassSkill.create({
                                                UserGroupClassId: userGroupClass.id,
                                                skillId: findAttackSkill.id,
                                                points: 1
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 61:
                                              userAttackSkill = _context.sent;
                                              console.log('after create UserGroupClassSkill');

                                            case 63:
                                              if (userGroupClass.selectedMainSkillId) {
                                                _context.next = 67;
                                                break;
                                              }

                                              _context.next = 66;
                                              return userGroupClass.update({
                                                selectedMainSkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 66:
                                              userGroupClass = _context.sent;

                                            case 67:
                                              if (userGroupClass.selectedSecondarySkillId) {
                                                _context.next = 71;
                                                break;
                                              }

                                              _context.next = 70;
                                              return userGroupClass.update({
                                                selectedSecondarySkillId: userAttackSkill.id
                                              }, {
                                                transaction: t,
                                                lock: t.LOCK.UPDATE
                                              });

                                            case 70:
                                              userGroupClass = _context.sent;

                                            case 71:
                                              _context.t0 = interaction;
                                              _context.next = 74;
                                              return (0, _classPicked.renderClassPicked)(currentIndex, classes, user);

                                            case 74:
                                              _context.t1 = _context.sent;
                                              _context.t2 = {
                                                attachment: _context.t1,
                                                name: 'classPicked.png'
                                              };
                                              _context.t3 = [_context.t2];
                                              _context.t4 = [];
                                              _context.t5 = {
                                                files: _context.t3,
                                                components: _context.t4
                                              };
                                              _context.next = 81;
                                              return _context.t0.update.call(_context.t0, _context.t5);

                                            case 81:
                                              _context.next = 83;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 83:
                                              preActivity = _context.sent;
                                              _context.next = 86;
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

                                            case 86:
                                              finalActivity = _context.sent;
                                              activity.unshift(finalActivity);

                                            case 88:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee);
                                    }));

                                    return function (_x8) {
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
                                                embeds: [(0, _embeds.cannotSendMessageUser)("ClassSelection", message)]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 16:
                                              _context2.next = 20;
                                              break;

                                            case 18:
                                              _context2.next = 20;
                                              return message.channel.send({
                                                embeds: [(0, _embeds.cannotSendMessageUser)("ClassSelection", message)]
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
                                                embeds: [(0, _embeds.discordErrorMessage)("ClassSelection")]
                                              })["catch"](function (e) {
                                                console.log(e);
                                              });

                                            case 28:
                                              _context2.next = 32;
                                              break;

                                            case 30:
                                              _context2.next = 32;
                                              return message.channel.send({
                                                embeds: [(0, _embeds.discordErrorMessage)("ClassSelection")]
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

                                    return function (_x9) {
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
                          _context4.next = 17;
                          break;
                        }

                        _context4.t0 = interaction;
                        _context4.next = 9;
                        return (0, _cancelClassPick.renderCancelClassPicked)(user);

                      case 9:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = {
                          attachment: _context4.t1,
                          name: 'cancelPickClass.png'
                        };
                        _context4.t3 = [_context4.t2];
                        _context4.t4 = [];
                        _context4.t5 = {
                          files: _context4.t3,
                          components: _context4.t4
                        };
                        _context4.next = 16;
                        return _context4.t0.update.call(_context4.t0, _context4.t5);

                      case 16:
                        return _context4.abrupt("return");

                      case 17:
                        // Increase/decrease index
                        interaction.customId === 'back' ? currentIndex -= 1 : currentIndex += 1; // Load another character

                        _context4.t6 = interaction;
                        _context4.next = 21;
                        return (0, _pickClass.renderPickClassImage)(currentIndex, classes, user);

                      case 21:
                        _context4.t7 = _context4.sent;
                        _context4.t8 = {
                          attachment: _context4.t7,
                          name: 'pickClass.png'
                        };
                        _context4.t9 = [_context4.t8];
                        _context4.t10 = _discord.ActionRowBuilder;
                        _context4.next = 27;
                        return (0, _buttons.generatePickClassButton)(currentIndex, classes);

                      case 27:
                        _context4.t11 = _context4.sent;
                        _context4.next = 30;
                        return (0, _buttons.generateCancelPickClassButton)();

                      case 30:
                        _context4.t12 = _context4.sent;
                        _context4.t13 = [_context4.t11, _context4.t12];
                        _context4.t14 = {
                          components: _context4.t13
                        };
                        _context4.t15 = new _context4.t10(_context4.t14);
                        _context4.t16 = new _discord.ActionRowBuilder({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [(0, _buttons.generateBackButton)()] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < classes.length ? [(0, _buttons.generateForwardButton)()] : []))
                        });
                        _context4.t17 = [_context4.t15, _context4.t16];
                        _context4.t18 = {
                          files: _context4.t9,
                          components: _context4.t17
                        };
                        _context4.next = 39;
                        return _context4.t6.update.call(_context4.t6, _context4.t18);

                      case 39:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 55:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordPickClass(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordPickClass = discordPickClass;