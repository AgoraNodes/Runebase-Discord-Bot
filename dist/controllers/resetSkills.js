"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordResetSkills = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _messages = require("../messages");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var discordResetSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, userWallet, userSkills, sumSkillPoints, totalSkillsCost, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            activity = [];
            _context5.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context5.sent;
            _context5.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context5.sent;
            _context5.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context5.sent;

            if (userCurrentCharacter) {
              _context5.next = 14;
              break;
            }

            _context5.next = 13;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
              ephemeral: true
            });

          case 13:
            return _context5.abrupt("return");

          case 14:
            _context5.next = 16;
            return _models["default"].wallet.findOne({
              where: {
                userId: userCurrentCharacter.user.id
              }
            });

          case 16:
            userWallet = _context5.sent;
            _context5.next = 19;
            return _models["default"].UserClassSkill.findAll({
              where: {
                UserClassId: userCurrentCharacter.id
              },
              include: [{
                model: _models["default"].skill,
                as: 'skill',
                where: {
                  name: (0, _defineProperty2["default"])({}, _sequelize.Op.not, 'Attack')
                }
              }]
            });

          case 19:
            userSkills = _context5.sent;
            sumSkillPoints = userSkills.reduce(function (accumulator, object) {
              return accumulator + object.points;
            }, 0);
            totalSkillsCost = sumSkillPoints * 1;
            _context5.t0 = discordChannel;
            _context5.next = 25;
            return (0, _messages.skillConfirmationMessage)(userId, userWallet.available, totalSkillsCost);

          case 25:
            _context5.t1 = _context5.sent;
            _context5.t2 = [_context5.t1];
            _context5.t3 = _discord.MessageActionRow;
            _context5.next = 30;
            return (0, _buttons.generateAcceptButton)();

          case 30:
            _context5.t4 = _context5.sent;
            _context5.next = 33;
            return (0, _buttons.generateDeclineButton)();

          case 33:
            _context5.t5 = _context5.sent;
            _context5.t6 = [_context5.t4, _context5.t5];
            _context5.t7 = {
              components: _context5.t6
            };
            _context5.t8 = new _context5.t3(_context5.t7);
            _context5.t9 = [_context5.t8];
            _context5.t10 = {
              embeds: _context5.t2,
              components: _context5.t9
            };
            _context5.next = 41;
            return _context5.t0.send.call(_context5.t0, _context5.t10);

          case 41:
            embedMessage = _context5.sent;
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(interaction) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context4.next = 21;
                          break;
                        }

                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
                          _context4.next = 5;
                          break;
                        }

                        _context4.next = 4;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 4:
                        return _context4.abrupt("return");

                      case 5:
                        _context4.next = 7;
                        return interaction.deferUpdate();

                      case 7:
                        if (!(interaction.customId === 'decline')) {
                          _context4.next = 18;
                          break;
                        }

                        _context4.t0 = interaction;
                        _context4.next = 11;
                        return (0, _messages.declineResetSkillsMessage)(userCurrentCharacter.user.user_id);

                      case 11:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = [_context4.t1];
                        _context4.t3 = [];
                        _context4.t4 = {
                          embeds: _context4.t2,
                          components: _context4.t3
                        };
                        _context4.next = 17;
                        return _context4.t0.editReply.call(_context4.t0, _context4.t4);

                      case 17:
                        return _context4.abrupt("return");

                      case 18:
                        if (!(interaction.customId === 'accept')) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 21;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                                      var findWallet, userSkills, attackSkill, sumResetSkillPoints, resetCost, _iterator, _step, userSkill;

                                      return _regenerator["default"].wrap(function _callee$(_context) {
                                        while (1) {
                                          switch (_context.prev = _context.next) {
                                            case 0:
                                              _context.next = 2;
                                              return _models["default"].wallet.findOne({
                                                where: {
                                                  userId: userCurrentCharacter.user.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 2:
                                              findWallet = _context.sent;
                                              _context.next = 5;
                                              return _models["default"].UserClassSkill.findAll({
                                                where: {
                                                  UserClassId: userCurrentCharacter.id
                                                },
                                                include: [{
                                                  model: _models["default"].skill,
                                                  as: 'skill',
                                                  where: {
                                                    name: (0, _defineProperty2["default"])({}, _sequelize.Op.not, 'Attack')
                                                  }
                                                }],
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 5:
                                              userSkills = _context.sent;
                                              console.log(userSkills);
                                              _context.next = 9;
                                              return _models["default"].UserClassSkill.findOne({
                                                where: {
                                                  UserClassId: userCurrentCharacter.id
                                                },
                                                include: [{
                                                  model: _models["default"].skill,
                                                  as: 'skill',
                                                  where: {
                                                    name: 'Attack'
                                                  }
                                                }],
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 9:
                                              attackSkill = _context.sent;
                                              _context.next = 12;
                                              return userCurrentCharacter.update({
                                                selectedMainSkillId: attackSkill.id,
                                                selectedSecondarySkillId: attackSkill.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 12:
                                              sumResetSkillPoints = userSkills.reduce(function (accumulator, object) {
                                                return accumulator + object.points;
                                              }, 0);
                                              resetCost = sumResetSkillPoints * 1 * 1e8;

                                              if (!(userSkills.length > 0)) {
                                                _context.next = 45;
                                                break;
                                              }

                                              if (!(findWallet.available < resetCost)) {
                                                _context.next = 26;
                                                break;
                                              }

                                              _context.t0 = interaction;
                                              _context.next = 19;
                                              return (0, _messages.insufficientBalanceMessage)(userCurrentCharacter.user.user_id, 'Reset Skills');

                                            case 19:
                                              _context.t1 = _context.sent;
                                              _context.t2 = [_context.t1];
                                              _context.t3 = [];
                                              _context.t4 = {
                                                embeds: _context.t2,
                                                components: _context.t3
                                              };
                                              _context.next = 25;
                                              return _context.t0.editReply.call(_context.t0, _context.t4);

                                            case 25:
                                              return _context.abrupt("return");

                                            case 26:
                                              _context.next = 28;
                                              return findWallet.update({
                                                available: findWallet.available - resetCost
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 28:
                                              // eslint-disable-next-line no-restricted-syntax
                                              _iterator = _createForOfIteratorHelper(userSkills);
                                              _context.prev = 29;

                                              _iterator.s();

                                            case 31:
                                              if ((_step = _iterator.n()).done) {
                                                _context.next = 37;
                                                break;
                                              }

                                              userSkill = _step.value;
                                              _context.next = 35;
                                              return userSkill.destroy({
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 35:
                                              _context.next = 31;
                                              break;

                                            case 37:
                                              _context.next = 42;
                                              break;

                                            case 39:
                                              _context.prev = 39;
                                              _context.t5 = _context["catch"](29);

                                              _iterator.e(_context.t5);

                                            case 42:
                                              _context.prev = 42;

                                              _iterator.f();

                                              return _context.finish(42);

                                            case 45:
                                              _context.t6 = interaction;
                                              _context.t7 = "<@".concat(userCurrentCharacter.user.user_id, ">");
                                              _context.next = 49;
                                              return (0, _messages.resetSkillCompleteMessage)(userCurrentCharacter.user.user_id);

                                            case 49:
                                              _context.t8 = _context.sent;
                                              _context.t9 = [_context.t8];
                                              _context.t10 = [];
                                              _context.t11 = {
                                                content: _context.t7,
                                                embeds: _context.t9,
                                                components: _context.t10
                                              };
                                              _context.next = 55;
                                              return _context.t6.editReply.call(_context.t6, _context.t11);

                                            case 55:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee, null, [[29, 39, 42, 45]]);
                                    }));

                                    return function (_x6) {
                                      return _ref4.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
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
                                              console.log(_context2.t0); // logger.error(`Error Discord: ${e}`);

                                            case 9:
                                            case "end":
                                              return _context2.stop();
                                          }
                                        }
                                      }, _callee2, null, [[1, 6]]);
                                    }));

                                    return function (_x7) {
                                      return _ref5.apply(this, arguments);
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

                      case 21:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 44:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordResetSkills(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordResetSkills = discordResetSkills;