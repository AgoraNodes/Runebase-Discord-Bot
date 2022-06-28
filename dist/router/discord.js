"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordRouter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = require("dotenv");

var _channel = require("../controllers/channel");

var _group = require("../controllers/group");

var _help = require("../controllers/help");

var _account = require("../controllers/account");

var _user = require("../controllers/user");

var _preWithdraw = require("../helpers/withdraw/preWithdraw");

var _myrank = require("../controllers/myrank");

var _ranks = require("../controllers/ranks");

var _deposit = require("../controllers/deposit");

var _price = require("../controllers/price");

var _balance = require("../controllers/balance");

var _withdraw = require("../controllers/withdraw");

var _userJoined = require("../controllers/userJoined");

var _activeTalker = require("../controllers/activeTalker");

var _rollDice = require("../controllers/rollDice");

var _leaderboard = require("../controllers/leaderboard");

var _mostActive = require("../controllers/mostActive");

var _pickClass = require("../controllers/pickClass");

var _stats = require("../controllers/stats");

var _showCaseMagicItem = require("../controllers/showCaseMagicItem");

var _inventory = require("../controllers/inventory");

var _equipment = require("../controllers/equipment");

var _battle = require("../controllers/battle");

var _heal = require("../controllers/heal");

var _expTest = require("../controllers/expTest");

var _rateLimit = require("../helpers/rateLimit");

var _featureSetting = require("../controllers/featureSetting");

var _isMaintenanceOrDisabled = require("../helpers/isMaintenanceOrDisabled");

var _skill = require("../controllers/skill");

var _settings = _interopRequireDefault(require("../config/settings"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

(0, _dotenv.config)();

var discordRouter = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45(discordClient, queue, io) {
    var userInvites;
    return _regenerator["default"].wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            userInvites = {};
            discordClient.on('ready', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var setting;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _models["default"].setting.findOne();

                    case 2:
                      setting = _context.sent;
                      discordClient.guilds.cache.each(function (guild) {
                        if (guild.id === setting.discordHomeServerGuildId) {
                          guild.invites.fetch().then(function (guildInvites) {
                            guildInvites.each(function (guildInvite) {
                              userInvites[guildInvite.code] = guildInvite.uses;
                            });
                          });
                        }
                      });

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            discordClient.on('inviteCreate', function (invite) {
              userInvites[invite.code] = invite.uses;
            });
            discordClient.on('guildMemberAdd', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(member) {
                var setting, newUser;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _models["default"].setting.findOne();

                      case 2:
                        setting = _context4.sent;

                        if (!(member.guild.id === setting.discordHomeServerGuildId)) {
                          _context4.next = 8;
                          break;
                        }

                        _context4.next = 6;
                        return (0, _user.createUpdateDiscordUser)(discordClient, member.user, queue);

                      case 6:
                        newUser = _context4.sent;
                        member.guild.invites.fetch().then(function (guildInvites) {
                          // get all guild invites
                          guildInvites.each( /*#__PURE__*/function () {
                            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(invite) {
                              return _regenerator["default"].wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      if (!(invite.uses !== userInvites[invite.code])) {
                                        _context3.next = 3;
                                        break;
                                      }

                                      _context3.next = 3;
                                      return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                                        var findUserJoinedRecord, inviter, newUserJoinedRecord;
                                        return _regenerator["default"].wrap(function _callee2$(_context2) {
                                          while (1) {
                                            switch (_context2.prev = _context2.next) {
                                              case 0:
                                                _context2.next = 2;
                                                return _models["default"].userJoined.findOne({
                                                  where: {
                                                    userJoinedId: newUser.id
                                                  }
                                                });

                                              case 2:
                                                findUserJoinedRecord = _context2.sent;

                                                if (findUserJoinedRecord) {
                                                  _context2.next = 11;
                                                  break;
                                                }

                                                _context2.next = 6;
                                                return _models["default"].user.findOne({
                                                  where: {
                                                    user_id: invite.inviter.id
                                                  }
                                                });

                                              case 6:
                                                inviter = _context2.sent;

                                                if (!inviter) {
                                                  _context2.next = 11;
                                                  break;
                                                }

                                                _context2.next = 10;
                                                return _models["default"].userJoined.create({
                                                  userJoinedId: newUser.id,
                                                  userInvitedById: inviter.id
                                                });

                                              case 10:
                                                newUserJoinedRecord = _context2.sent;

                                              case 11:
                                              case "end":
                                                return _context2.stop();
                                            }
                                          }
                                        }, _callee2);
                                      })));

                                    case 3:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            return function (_x5) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                        });

                      case 8:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());
            discordClient.on('guildMemberUpdate', /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(oldMember, newMember) {
                var setting, newHas;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _models["default"].setting.findOne();

                      case 2:
                        setting = _context6.sent;
                        newHas = newMember.roles.cache.has(setting.joinedRoleId);

                        if (!newHas) {
                          _context6.next = 7;
                          break;
                        }

                        _context6.next = 7;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                          var task;
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return (0, _userJoined.discordUserJoined)(discordClient, newMember, io);

                                case 2:
                                  task = _context5.sent;

                                case 3:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 7:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x6, _x7) {
                return _ref6.apply(this, arguments);
              };
            }());
            discordClient.on('voiceStateUpdate', /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(oldMember, newMember) {
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                          var groupTask, channelTask;
                          return _regenerator["default"].wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return (0, _group.updateDiscordGroup)(discordClient, newMember);

                                case 2:
                                  groupTask = _context7.sent;
                                  _context7.next = 5;
                                  return (0, _channel.updateDiscordChannel)(newMember, groupTask);

                                case 5:
                                  channelTask = _context7.sent;

                                case 6:
                                case "end":
                                  return _context7.stop();
                              }
                            }
                          }, _callee7);
                        })));

                      case 2:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x8, _x9) {
                return _ref8.apply(this, arguments);
              };
            }());
            discordClient.on('interactionCreate', /*#__PURE__*/function () {
              var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(interaction) {
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, maintenance, walletExists, commandName, limited, _limited, _limited2, _limited3, _limited4, _limited5, _limited6, setting, _limited7, _setting, task, _limited8, _setting2, _limited9, _setting3, _limited10, _setting4, _limited11, _setting5, _limited12, _setting6, _setting7, _limited13, _limited14, _setting8, _yield$preWithdraw, _yield$preWithdraw2, success, filteredMessage, _setting9, discordChannel, _limited15;

                return _regenerator["default"].wrap(function _callee27$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        if (!(!interaction.isCommand() && !interaction.isButton())) {
                          _context27.next = 2;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 2:
                        if (interaction.user.bot) {
                          _context27.next = 304;
                          break;
                        }

                        _context27.next = 5;
                        return (0, _isMaintenanceOrDisabled.isMaintenanceOrDisabled)(interaction, 'discord');

                      case 5:
                        maintenance = _context27.sent;

                        if (!(maintenance.maintenance || !maintenance.enabled)) {
                          _context27.next = 8;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 8:
                        _context27.next = 10;
                        return (0, _user.createUpdateDiscordUser)(discordClient, interaction.user, queue);

                      case 10:
                        walletExists = _context27.sent;
                        _context27.next = 13;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                          return _regenerator["default"].wrap(function _callee9$(_context9) {
                            while (1) {
                              switch (_context9.prev = _context9.next) {
                                case 0:
                                  _context9.next = 2;
                                  return (0, _group.updateDiscordGroup)(discordClient, interaction);

                                case 2:
                                  groupTask = _context9.sent;
                                  _context9.next = 5;
                                  return (0, _channel.updateDiscordChannel)(interaction, groupTask);

                                case 5:
                                  channelTask = _context9.sent;
                                  _context9.next = 8;
                                  return (0, _user.updateDiscordLastSeen)(interaction, interaction.user);

                                case 8:
                                  lastSeenDiscordTask = _context9.sent;
                                  groupTaskId = groupTask && groupTask.id;
                                  channelTaskId = channelTask && channelTask.id;

                                case 11:
                                case "end":
                                  return _context9.stop();
                              }
                            }
                          }, _callee9);
                        })));

                      case 13:
                        if (!interaction.isCommand()) {
                          _context27.next = 280;
                          break;
                        }

                        commandName = interaction.commandName;

                        if (!(commandName === 'help')) {
                          _context27.next = 29;
                          break;
                        }

                        _context27.next = 18;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 18:
                        _context27.next = 20;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Help');

                      case 20:
                        limited = _context27.sent;

                        if (!limited) {
                          _context27.next = 25;
                          break;
                        }

                        _context27.next = 24;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 24:
                        return _context27.abrupt("return");

                      case 25:
                        _context27.next = 27;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
                          var task;
                          return _regenerator["default"].wrap(function _callee10$(_context10) {
                            while (1) {
                              switch (_context10.prev = _context10.next) {
                                case 0:
                                  console.log(interaction);
                                  _context10.next = 3;
                                  return (0, _help.discordHelp)(discordClient, interaction, io);

                                case 3:
                                  task = _context10.sent;

                                case 4:
                                case "end":
                                  return _context10.stop();
                              }
                            }
                          }, _callee10);
                        })));

                      case 27:
                        _context27.next = 29;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 29:
                        if (!(commandName === 'battle')) {
                          _context27.next = 36;
                          break;
                        }

                        _context27.next = 32;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 32:
                        _context27.next = 34;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                          var task;
                          return _regenerator["default"].wrap(function _callee11$(_context11) {
                            while (1) {
                              switch (_context11.prev = _context11.next) {
                                case 0:
                                  _context11.next = 2;
                                  return (0, _battle.discordBattle)(discordClient, interaction, io, queue);

                                case 2:
                                  task = _context11.sent;

                                case 3:
                                case "end":
                                  return _context11.stop();
                              }
                            }
                          }, _callee11);
                        })));

                      case 34:
                        _context27.next = 36;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 36:
                        if (!(commandName === 'heal')) {
                          _context27.next = 43;
                          break;
                        }

                        _context27.next = 39;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 39:
                        _context27.next = 41;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
                          var task;
                          return _regenerator["default"].wrap(function _callee12$(_context12) {
                            while (1) {
                              switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.next = 2;
                                  return (0, _heal.discordHeal)(discordClient, interaction, io, queue);

                                case 2:
                                  task = _context12.sent;

                                case 3:
                                case "end":
                                  return _context12.stop();
                              }
                            }
                          }, _callee12);
                        })));

                      case 41:
                        _context27.next = 43;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 43:
                        if (!(commandName === 'myrank')) {
                          _context27.next = 57;
                          break;
                        }

                        _context27.next = 46;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 46:
                        _context27.next = 48;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Myrank');

                      case 48:
                        _limited = _context27.sent;

                        if (!_limited) {
                          _context27.next = 53;
                          break;
                        }

                        _context27.next = 52;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 52:
                        return _context27.abrupt("return");

                      case 53:
                        _context27.next = 55;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
                          var task;
                          return _regenerator["default"].wrap(function _callee13$(_context13) {
                            while (1) {
                              switch (_context13.prev = _context13.next) {
                                case 0:
                                  _context13.next = 2;
                                  return (0, _myrank.discordMyRank)(discordClient, interaction, io);

                                case 2:
                                  task = _context13.sent;

                                case 3:
                                case "end":
                                  return _context13.stop();
                              }
                            }
                          }, _callee13);
                        })));

                      case 55:
                        _context27.next = 57;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 57:
                        if (!(commandName === 'ranks')) {
                          _context27.next = 71;
                          break;
                        }

                        _context27.next = 60;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 60:
                        _context27.next = 62;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Ranks');

                      case 62:
                        _limited2 = _context27.sent;

                        if (!_limited2) {
                          _context27.next = 67;
                          break;
                        }

                        _context27.next = 66;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 66:
                        return _context27.abrupt("return");

                      case 67:
                        _context27.next = 69;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
                          var task;
                          return _regenerator["default"].wrap(function _callee14$(_context14) {
                            while (1) {
                              switch (_context14.prev = _context14.next) {
                                case 0:
                                  _context14.next = 2;
                                  return (0, _ranks.discordRanks)(discordClient, interaction, io);

                                case 2:
                                  task = _context14.sent;

                                case 3:
                                case "end":
                                  return _context14.stop();
                              }
                            }
                          }, _callee14);
                        })));

                      case 69:
                        _context27.next = 71;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 71:
                        if (!(commandName === 'deposit')) {
                          _context27.next = 85;
                          break;
                        }

                        _context27.next = 74;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 74:
                        _context27.next = 76;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Deposit');

                      case 76:
                        _limited3 = _context27.sent;

                        if (!_limited3) {
                          _context27.next = 81;
                          break;
                        }

                        _context27.next = 80;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 80:
                        return _context27.abrupt("return");

                      case 81:
                        _context27.next = 83;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
                          var task;
                          return _regenerator["default"].wrap(function _callee15$(_context15) {
                            while (1) {
                              switch (_context15.prev = _context15.next) {
                                case 0:
                                  _context15.next = 2;
                                  return (0, _deposit.discordDeposit)(discordClient, interaction, io);

                                case 2:
                                  task = _context15.sent;

                                case 3:
                                case "end":
                                  return _context15.stop();
                              }
                            }
                          }, _callee15);
                        })));

                      case 83:
                        _context27.next = 85;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 85:
                        if (!(commandName === 'price')) {
                          _context27.next = 99;
                          break;
                        }

                        _context27.next = 88;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 88:
                        _context27.next = 90;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Price');

                      case 90:
                        _limited4 = _context27.sent;

                        if (!_limited4) {
                          _context27.next = 95;
                          break;
                        }

                        _context27.next = 94;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 94:
                        return _context27.abrupt("return");

                      case 95:
                        _context27.next = 97;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
                          var task;
                          return _regenerator["default"].wrap(function _callee16$(_context16) {
                            while (1) {
                              switch (_context16.prev = _context16.next) {
                                case 0:
                                  _context16.next = 2;
                                  return (0, _price.discordPrice)(discordClient, interaction, io);

                                case 2:
                                  task = _context16.sent;

                                case 3:
                                case "end":
                                  return _context16.stop();
                              }
                            }
                          }, _callee16);
                        })));

                      case 97:
                        _context27.next = 99;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 99:
                        if (!(commandName === 'balance')) {
                          _context27.next = 113;
                          break;
                        }

                        _context27.next = 102;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 102:
                        _context27.next = 104;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Balance');

                      case 104:
                        _limited5 = _context27.sent;

                        if (!_limited5) {
                          _context27.next = 109;
                          break;
                        }

                        _context27.next = 108;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 108:
                        return _context27.abrupt("return");

                      case 109:
                        _context27.next = 111;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
                          var task;
                          return _regenerator["default"].wrap(function _callee17$(_context17) {
                            while (1) {
                              switch (_context17.prev = _context17.next) {
                                case 0:
                                  _context17.next = 2;
                                  return (0, _balance.discordBalance)(discordClient, interaction, io);

                                case 2:
                                  task = _context17.sent;

                                case 3:
                                case "end":
                                  return _context17.stop();
                              }
                            }
                          }, _callee17);
                        })));

                      case 111:
                        _context27.next = 113;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 113:
                        if (!(commandName === 'leaderboard')) {
                          _context27.next = 130;
                          break;
                        }

                        _context27.next = 116;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 116:
                        _context27.next = 118;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Leaderboard');

                      case 118:
                        _limited6 = _context27.sent;

                        if (!_limited6) {
                          _context27.next = 123;
                          break;
                        }

                        _context27.next = 122;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 122:
                        return _context27.abrupt("return");

                      case 123:
                        _context27.next = 125;
                        return _models["default"].setting.findOne();

                      case 125:
                        setting = _context27.sent;
                        _context27.next = 128;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
                          var task;
                          return _regenerator["default"].wrap(function _callee18$(_context18) {
                            while (1) {
                              switch (_context18.prev = _context18.next) {
                                case 0:
                                  _context18.next = 2;
                                  return (0, _leaderboard.discordLeaderboard)(discordClient, interaction, setting, io);

                                case 2:
                                  task = _context18.sent;

                                case 3:
                                case "end":
                                  return _context18.stop();
                              }
                            }
                          }, _callee18);
                        })));

                      case 128:
                        _context27.next = 130;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 130:
                        if (!(commandName === 'pickclass')) {
                          _context27.next = 148;
                          break;
                        }

                        _context27.next = 133;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 133:
                        _context27.next = 135;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'PickClass');

                      case 135:
                        _limited7 = _context27.sent;

                        if (!_limited7) {
                          _context27.next = 140;
                          break;
                        }

                        _context27.next = 139;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 139:
                        return _context27.abrupt("return");

                      case 140:
                        _context27.next = 142;
                        return _models["default"].setting.findOne();

                      case 142:
                        _setting = _context27.sent;
                        _context27.next = 145;
                        return (0, _pickClass.discordPickClass)(discordClient, interaction, _setting, io, queue);

                      case 145:
                        task = _context27.sent;
                        _context27.next = 148;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 148:
                        if (!(commandName === 'mostactive')) {
                          _context27.next = 165;
                          break;
                        }

                        _context27.next = 151;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 151:
                        _context27.next = 153;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'MostActive');

                      case 153:
                        _limited8 = _context27.sent;

                        if (!_limited8) {
                          _context27.next = 158;
                          break;
                        }

                        _context27.next = 157;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 157:
                        return _context27.abrupt("return");

                      case 158:
                        _context27.next = 160;
                        return _models["default"].setting.findOne();

                      case 160:
                        _setting2 = _context27.sent;
                        _context27.next = 163;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
                          var task;
                          return _regenerator["default"].wrap(function _callee19$(_context19) {
                            while (1) {
                              switch (_context19.prev = _context19.next) {
                                case 0:
                                  _context19.next = 2;
                                  return (0, _mostActive.discordMostActive)(discordClient, interaction, _setting2, io);

                                case 2:
                                  task = _context19.sent;

                                case 3:
                                case "end":
                                  return _context19.stop();
                              }
                            }
                          }, _callee19);
                        })));

                      case 163:
                        _context27.next = 165;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 165:
                        if (!(commandName === 'stats')) {
                          _context27.next = 182;
                          break;
                        }

                        _context27.next = 168;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 168:
                        _context27.next = 170;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Stats');

                      case 170:
                        _limited9 = _context27.sent;

                        if (!_limited9) {
                          _context27.next = 175;
                          break;
                        }

                        _context27.next = 174;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 174:
                        return _context27.abrupt("return");

                      case 175:
                        _context27.next = 177;
                        return _models["default"].setting.findOne();

                      case 177:
                        _setting3 = _context27.sent;
                        _context27.next = 180;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
                          var task;
                          return _regenerator["default"].wrap(function _callee20$(_context20) {
                            while (1) {
                              switch (_context20.prev = _context20.next) {
                                case 0:
                                  _context20.next = 2;
                                  return (0, _stats.discordStats)(discordClient, interaction, _setting3, io, queue);

                                case 2:
                                  task = _context20.sent;

                                case 3:
                                case "end":
                                  return _context20.stop();
                              }
                            }
                          }, _callee20);
                        })));

                      case 180:
                        _context27.next = 182;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 182:
                        if (!(commandName === 'inventory')) {
                          _context27.next = 199;
                          break;
                        }

                        _context27.next = 185;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 185:
                        _context27.next = 187;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Inventory');

                      case 187:
                        _limited10 = _context27.sent;

                        if (!_limited10) {
                          _context27.next = 192;
                          break;
                        }

                        _context27.next = 191;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 191:
                        return _context27.abrupt("return");

                      case 192:
                        _context27.next = 194;
                        return _models["default"].setting.findOne();

                      case 194:
                        _setting4 = _context27.sent;
                        _context27.next = 197;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
                          var task;
                          return _regenerator["default"].wrap(function _callee21$(_context21) {
                            while (1) {
                              switch (_context21.prev = _context21.next) {
                                case 0:
                                  _context21.next = 2;
                                  return (0, _inventory.discordShowInventory)(discordClient, interaction, _setting4, io, queue);

                                case 2:
                                  task = _context21.sent;

                                case 3:
                                case "end":
                                  return _context21.stop();
                              }
                            }
                          }, _callee21);
                        })));

                      case 197:
                        _context27.next = 199;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 199:
                        if (!(commandName === 'skills')) {
                          _context27.next = 216;
                          break;
                        }

                        _context27.next = 202;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 202:
                        _context27.next = 204;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Skills');

                      case 204:
                        _limited11 = _context27.sent;

                        if (!_limited11) {
                          _context27.next = 209;
                          break;
                        }

                        _context27.next = 208;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 208:
                        return _context27.abrupt("return");

                      case 209:
                        _context27.next = 211;
                        return _models["default"].setting.findOne();

                      case 211:
                        _setting5 = _context27.sent;
                        _context27.next = 214;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
                          var task;
                          return _regenerator["default"].wrap(function _callee22$(_context22) {
                            while (1) {
                              switch (_context22.prev = _context22.next) {
                                case 0:
                                  _context22.next = 2;
                                  return (0, _skill.discordSkills)(discordClient, interaction, _setting5, io, queue);

                                case 2:
                                  task = _context22.sent;

                                case 3:
                                case "end":
                                  return _context22.stop();
                              }
                            }
                          }, _callee22);
                        })));

                      case 214:
                        _context27.next = 216;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 216:
                        if (!(commandName === 'equipment')) {
                          _context27.next = 233;
                          break;
                        }

                        _context27.next = 219;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 219:
                        _context27.next = 221;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Equipment');

                      case 221:
                        _limited12 = _context27.sent;

                        if (!_limited12) {
                          _context27.next = 226;
                          break;
                        }

                        _context27.next = 225;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 225:
                        return _context27.abrupt("return");

                      case 226:
                        _context27.next = 228;
                        return _models["default"].setting.findOne();

                      case 228:
                        _setting6 = _context27.sent;
                        _context27.next = 231;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
                          var task;
                          return _regenerator["default"].wrap(function _callee23$(_context23) {
                            while (1) {
                              switch (_context23.prev = _context23.next) {
                                case 0:
                                  _context23.next = 2;
                                  return (0, _equipment.discordShowEquipment)(discordClient, interaction, _setting6, io, queue);

                                case 2:
                                  task = _context23.sent;

                                case 3:
                                case "end":
                                  return _context23.stop();
                              }
                            }
                          }, _callee23);
                        })));

                      case 231:
                        _context27.next = 233;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 233:
                        if (!(commandName === 'roll')) {
                          _context27.next = 254;
                          break;
                        }

                        _context27.next = 236;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 236:
                        _context27.next = 238;
                        return _models["default"].setting.findOne();

                      case 238:
                        _setting7 = _context27.sent;

                        if (!(_setting7.roleDiceChannelId !== interaction.channelId)) {
                          _context27.next = 242;
                          break;
                        }

                        _context27.next = 242;
                        return interaction.editReply("please use <#".concat(_setting7.roleDiceChannelId, "> for rolling dice"))["catch"](function (e) {
                          console.log(e);
                        });

                      case 242:
                        if (!(_setting7.roleDiceChannelId === interaction.channelId)) {
                          _context27.next = 254;
                          break;
                        }

                        _context27.next = 245;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'RollDice');

                      case 245:
                        _limited13 = _context27.sent;

                        if (!_limited13) {
                          _context27.next = 250;
                          break;
                        }

                        _context27.next = 249;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 249:
                        return _context27.abrupt("return");

                      case 250:
                        _context27.next = 252;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
                          var task;
                          return _regenerator["default"].wrap(function _callee24$(_context24) {
                            while (1) {
                              switch (_context24.prev = _context24.next) {
                                case 0:
                                  _context24.next = 2;
                                  return (0, _rollDice.discordRollDice)(discordClient, interaction, _setting7, io);

                                case 2:
                                  task = _context24.sent;

                                case 3:
                                case "end":
                                  return _context24.stop();
                              }
                            }
                          }, _callee24);
                        })));

                      case 252:
                        _context27.next = 254;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 254:
                        if (!(commandName === 'withdraw')) {
                          _context27.next = 280;
                          break;
                        }

                        _context27.next = 257;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 257:
                        _context27.next = 259;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Withdraw');

                      case 259:
                        _limited14 = _context27.sent;

                        if (!_limited14) {
                          _context27.next = 264;
                          break;
                        }

                        _context27.next = 263;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 263:
                        return _context27.abrupt("return");

                      case 264:
                        _context27.next = 266;
                        return (0, _featureSetting.discordFeatureSettings)(interaction, 'withdraw', groupTaskId, channelTaskId);

                      case 266:
                        _setting8 = _context27.sent;

                        if (_setting8) {
                          _context27.next = 269;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 269:
                        _context27.next = 271;
                        return (0, _preWithdraw.preWithdraw)(discordClient, interaction);

                      case 271:
                        _yield$preWithdraw = _context27.sent;
                        _yield$preWithdraw2 = (0, _slicedToArray2["default"])(_yield$preWithdraw, 2);
                        success = _yield$preWithdraw2[0];
                        filteredMessage = _yield$preWithdraw2[1];

                        if (!success) {
                          _context27.next = 278;
                          break;
                        }

                        _context27.next = 278;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
                          var task;
                          return _regenerator["default"].wrap(function _callee25$(_context25) {
                            while (1) {
                              switch (_context25.prev = _context25.next) {
                                case 0:
                                  _context25.next = 2;
                                  return (0, _withdraw.discordWithdraw)(discordClient, interaction, filteredMessage, _setting8, io);

                                case 2:
                                  task = _context25.sent;

                                case 3:
                                case "end":
                                  return _context25.stop();
                              }
                            }
                          }, _callee25);
                        })));

                      case 278:
                        _context27.next = 280;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 280:
                        if (!interaction.isButton()) {
                          _context27.next = 304;
                          break;
                        }

                        if (!(interaction.customId === 'roll')) {
                          _context27.next = 304;
                          break;
                        }

                        _context27.next = 284;
                        return _models["default"].setting.findOne();

                      case 284:
                        _setting9 = _context27.sent;

                        if (!(_setting9.roleDiceChannelId !== interaction.channelId)) {
                          _context27.next = 293;
                          break;
                        }

                        _context27.next = 288;
                        return discordClient.channels.cache.get(_setting9.roleDiceChannelId);

                      case 288:
                        discordChannel = _context27.sent;
                        _context27.next = 291;
                        return discordChannel.send("please use <#".concat(_setting9.roleDiceChannelId, "> for rolling dice"));

                      case 291:
                        _context27.next = 293;
                        return interaction.editReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 293:
                        if (!(_setting9.roleDiceChannelId === interaction.channelId)) {
                          _context27.next = 302;
                          break;
                        }

                        console.log('found channel');
                        _context27.next = 297;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'RollDice');

                      case 297:
                        _limited15 = _context27.sent;

                        if (!_limited15) {
                          _context27.next = 300;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 300:
                        _context27.next = 302;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
                          var task;
                          return _regenerator["default"].wrap(function _callee26$(_context26) {
                            while (1) {
                              switch (_context26.prev = _context26.next) {
                                case 0:
                                  console.log('start_task');
                                  _context26.next = 3;
                                  return (0, _rollDice.discordRollDice)(discordClient, interaction, _setting9, io);

                                case 3:
                                  task = _context26.sent;

                                case 4:
                                case "end":
                                  return _context26.stop();
                              }
                            }
                          }, _callee26);
                        })));

                      case 302:
                        _context27.next = 304;
                        return interaction.deferUpdate()["catch"](function (e) {
                          console.log(e);
                        });

                      case 304:
                      case "end":
                        return _context27.stop();
                    }
                  }
                }, _callee27);
              }));

              return function (_x10) {
                return _ref10.apply(this, arguments);
              };
            }());
            discordClient.on("messageCreate", /*#__PURE__*/function () {
              var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44(message) {
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, disallow, walletExists, messageReplaceBreaksWithSpaces, preFilteredMessageDiscord, filteredMessageDiscord, setting, maintenance, limited, _limited16, _limited17, _limited18, _limited19, _limited20, _limited21, _limited22, _setting10, _limited23, _setting11, _limited24, _setting12, _limited25, _setting13, task, _limited26, _setting14, _task, _limited27, _setting15, _task2, _limited28, _setting16, _task3, _limited29, _setting17, _task4, _limited30, _setting18, _yield$preWithdraw3, _yield$preWithdraw4, success, filteredMessage;

                return _regenerator["default"].wrap(function _callee44$(_context44) {
                  while (1) {
                    switch (_context44.prev = _context44.next) {
                      case 0:
                        if (message.author.bot) {
                          _context44.next = 8;
                          break;
                        }

                        _context44.next = 3;
                        return (0, _user.createUpdateDiscordUser)(discordClient, message.author, queue);

                      case 3:
                        walletExists = _context44.sent;
                        _context44.next = 6;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
                          return _regenerator["default"].wrap(function _callee28$(_context28) {
                            while (1) {
                              switch (_context28.prev = _context28.next) {
                                case 0:
                                  _context28.next = 2;
                                  return (0, _group.updateDiscordGroup)(discordClient, message);

                                case 2:
                                  groupTask = _context28.sent;
                                  _context28.next = 5;
                                  return (0, _channel.updateDiscordChannel)(message, groupTask);

                                case 5:
                                  channelTask = _context28.sent;
                                  _context28.next = 8;
                                  return (0, _user.updateDiscordLastSeen)(message, message.author);

                                case 8:
                                  lastSeenDiscordTask = _context28.sent;

                                case 9:
                                case "end":
                                  return _context28.stop();
                              }
                            }
                          }, _callee28);
                        })));

                      case 6:
                        groupTaskId = groupTask && groupTask.id;
                        channelTaskId = channelTask && channelTask.id;

                      case 8:
                        messageReplaceBreaksWithSpaces = message.content.replace(/\n/g, " ");
                        preFilteredMessageDiscord = messageReplaceBreaksWithSpaces.split(' ');
                        filteredMessageDiscord = preFilteredMessageDiscord.filter(function (el) {
                          return el !== '';
                        });

                        if (message.author.bot) {
                          _context44.next = 17;
                          break;
                        }

                        _context44.next = 14;
                        return _models["default"].setting.findOne();

                      case 14:
                        setting = _context44.sent;
                        _context44.next = 17;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
                          var task;
                          return _regenerator["default"].wrap(function _callee29$(_context29) {
                            while (1) {
                              switch (_context29.prev = _context29.next) {
                                case 0:
                                  if (!(message.guildId === setting.discordHomeServerGuildId)) {
                                    _context29.next = 4;
                                    break;
                                  }

                                  _context29.next = 3;
                                  return (0, _activeTalker.discordActiveTalker)(discordClient, message, filteredMessageDiscord, io);

                                case 3:
                                  task = _context29.sent;

                                case 4:
                                case "end":
                                  return _context29.stop();
                              }
                            }
                          }, _callee29);
                        })));

                      case 17:
                        if (!(!message.content.startsWith(_settings["default"].bot.command) || message.author.bot)) {
                          _context44.next = 19;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 19:
                        _context44.next = 21;
                        return (0, _isMaintenanceOrDisabled.isMaintenanceOrDisabled)(message, 'discord');

                      case 21:
                        maintenance = _context44.sent;

                        if (!(maintenance.maintenance || !maintenance.enabled)) {
                          _context44.next = 24;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 24:
                        if (!(groupTask && groupTask.banned)) {
                          _context44.next = 28;
                          break;
                        }

                        _context44.next = 27;
                        return message.channel.send({
                          embeds: [(0, _messages.discordServerBannedMessage)(groupTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 27:
                        return _context44.abrupt("return");

                      case 28:
                        if (!(channelTask && channelTask.banned)) {
                          _context44.next = 32;
                          break;
                        }

                        _context44.next = 31;
                        return message.channel.send({
                          embeds: [(0, _messages.discordChannelBannedMessage)(channelTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 31:
                        return _context44.abrupt("return");

                      case 32:
                        if (!(lastSeenDiscordTask && lastSeenDiscordTask.banned)) {
                          _context44.next = 36;
                          break;
                        }

                        _context44.next = 35;
                        return message.channel.send({
                          embeds: [(0, _messages.discordUserBannedMessage)(lastSeenDiscordTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 35:
                        return _context44.abrupt("return");

                      case 36:
                        if (!(filteredMessageDiscord[1] === undefined)) {
                          _context44.next = 44;
                          break;
                        }

                        _context44.next = 39;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 39:
                        limited = _context44.sent;

                        if (!limited) {
                          _context44.next = 42;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 42:
                        _context44.next = 44;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
                          var task;
                          return _regenerator["default"].wrap(function _callee30$(_context30) {
                            while (1) {
                              switch (_context30.prev = _context30.next) {
                                case 0:
                                  _context30.next = 2;
                                  return (0, _help.discordHelp)(discordClient, message, io);

                                case 2:
                                  task = _context30.sent;

                                case 3:
                                case "end":
                                  return _context30.stop();
                              }
                            }
                          }, _callee30);
                        })));

                      case 44:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'help')) {
                          _context44.next = 53;
                          break;
                        }

                        console.log('used help');
                        _context44.next = 48;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 48:
                        _limited16 = _context44.sent;

                        if (!_limited16) {
                          _context44.next = 51;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 51:
                        _context44.next = 53;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
                          var task;
                          return _regenerator["default"].wrap(function _callee31$(_context31) {
                            while (1) {
                              switch (_context31.prev = _context31.next) {
                                case 0:
                                  _context31.next = 2;
                                  return (0, _help.discordHelp)(discordClient, message, io);

                                case 2:
                                  task = _context31.sent;

                                case 3:
                                case "end":
                                  return _context31.stop();
                              }
                            }
                          }, _callee31);
                        })));

                      case 53:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'myrank')) {
                          _context44.next = 61;
                          break;
                        }

                        _context44.next = 56;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Myrank');

                      case 56:
                        _limited17 = _context44.sent;

                        if (!_limited17) {
                          _context44.next = 59;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 59:
                        _context44.next = 61;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
                          var task;
                          return _regenerator["default"].wrap(function _callee32$(_context32) {
                            while (1) {
                              switch (_context32.prev = _context32.next) {
                                case 0:
                                  _context32.next = 2;
                                  return (0, _myrank.discordMyRank)(discordClient, message, io);

                                case 2:
                                  task = _context32.sent;

                                case 3:
                                case "end":
                                  return _context32.stop();
                              }
                            }
                          }, _callee32);
                        })));

                      case 61:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'ranks')) {
                          _context44.next = 69;
                          break;
                        }

                        _context44.next = 64;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Ranks');

                      case 64:
                        _limited18 = _context44.sent;

                        if (!_limited18) {
                          _context44.next = 67;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 67:
                        _context44.next = 69;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
                          var task;
                          return _regenerator["default"].wrap(function _callee33$(_context33) {
                            while (1) {
                              switch (_context33.prev = _context33.next) {
                                case 0:
                                  _context33.next = 2;
                                  return (0, _ranks.discordRanks)(discordClient, message, io);

                                case 2:
                                  task = _context33.sent;

                                case 3:
                                case "end":
                                  return _context33.stop();
                              }
                            }
                          }, _callee33);
                        })));

                      case 69:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'deposit')) {
                          _context44.next = 77;
                          break;
                        }

                        _context44.next = 72;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Deposit');

                      case 72:
                        _limited19 = _context44.sent;

                        if (!_limited19) {
                          _context44.next = 75;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 75:
                        _context44.next = 77;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
                          var task;
                          return _regenerator["default"].wrap(function _callee34$(_context34) {
                            while (1) {
                              switch (_context34.prev = _context34.next) {
                                case 0:
                                  _context34.next = 2;
                                  return (0, _deposit.discordDeposit)(discordClient, message, io);

                                case 2:
                                  task = _context34.sent;

                                case 3:
                                case "end":
                                  return _context34.stop();
                              }
                            }
                          }, _callee34);
                        })));

                      case 77:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'price')) {
                          _context44.next = 85;
                          break;
                        }

                        _context44.next = 80;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Price');

                      case 80:
                        _limited20 = _context44.sent;

                        if (!_limited20) {
                          _context44.next = 83;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 83:
                        _context44.next = 85;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
                          var task;
                          return _regenerator["default"].wrap(function _callee35$(_context35) {
                            while (1) {
                              switch (_context35.prev = _context35.next) {
                                case 0:
                                  _context35.next = 2;
                                  return (0, _price.discordPrice)(discordClient, message, io);

                                case 2:
                                  task = _context35.sent;

                                case 3:
                                case "end":
                                  return _context35.stop();
                              }
                            }
                          }, _callee35);
                        })));

                      case 85:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'balance')) {
                          _context44.next = 93;
                          break;
                        }

                        _context44.next = 88;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Balance');

                      case 88:
                        _limited21 = _context44.sent;

                        if (!_limited21) {
                          _context44.next = 91;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 91:
                        _context44.next = 93;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
                          var task;
                          return _regenerator["default"].wrap(function _callee36$(_context36) {
                            while (1) {
                              switch (_context36.prev = _context36.next) {
                                case 0:
                                  _context36.next = 2;
                                  return (0, _balance.discordBalance)(discordClient, message, io);

                                case 2:
                                  task = _context36.sent;

                                case 3:
                                case "end":
                                  return _context36.stop();
                              }
                            }
                          }, _callee36);
                        })));

                      case 93:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'roll')) {
                          _context44.next = 108;
                          break;
                        }

                        _context44.next = 96;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'RollDice');

                      case 96:
                        _limited22 = _context44.sent;

                        if (!_limited22) {
                          _context44.next = 99;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 99:
                        _context44.next = 101;
                        return _models["default"].setting.findOne();

                      case 101:
                        _setting10 = _context44.sent;

                        if (!(message.channelId !== _setting10.roleDiceChannelId)) {
                          _context44.next = 105;
                          break;
                        }

                        _context44.next = 105;
                        return message.reply("please use <#".concat(_setting10.roleDiceChannelId, "> for rolling dice"))["catch"](function (e) {
                          console.log(e);
                        });

                      case 105:
                        if (!(message.channelId === _setting10.roleDiceChannelId)) {
                          _context44.next = 108;
                          break;
                        }

                        _context44.next = 108;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
                          var task;
                          return _regenerator["default"].wrap(function _callee37$(_context37) {
                            while (1) {
                              switch (_context37.prev = _context37.next) {
                                case 0:
                                  _context37.next = 2;
                                  return (0, _rollDice.discordRollDice)(discordClient, message, _setting10, io);

                                case 2:
                                  task = _context37.sent;

                                case 3:
                                case "end":
                                  return _context37.stop();
                              }
                            }
                          }, _callee37);
                        })));

                      case 108:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'leaderboard')) {
                          _context44.next = 119;
                          break;
                        }

                        _context44.next = 111;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Leaderboard');

                      case 111:
                        _limited23 = _context44.sent;

                        if (!_limited23) {
                          _context44.next = 114;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 114:
                        _context44.next = 116;
                        return _models["default"].setting.findOne();

                      case 116:
                        _setting11 = _context44.sent;
                        _context44.next = 119;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
                          var task;
                          return _regenerator["default"].wrap(function _callee38$(_context38) {
                            while (1) {
                              switch (_context38.prev = _context38.next) {
                                case 0:
                                  _context38.next = 2;
                                  return (0, _leaderboard.discordLeaderboard)(discordClient, message, _setting11, io);

                                case 2:
                                  task = _context38.sent;

                                case 3:
                                case "end":
                                  return _context38.stop();
                              }
                            }
                          }, _callee38);
                        })));

                      case 119:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'mostactive')) {
                          _context44.next = 130;
                          break;
                        }

                        _context44.next = 122;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'MostActive');

                      case 122:
                        _limited24 = _context44.sent;

                        if (!_limited24) {
                          _context44.next = 125;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 125:
                        _context44.next = 127;
                        return _models["default"].setting.findOne();

                      case 127:
                        _setting12 = _context44.sent;
                        _context44.next = 130;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
                          var task;
                          return _regenerator["default"].wrap(function _callee39$(_context39) {
                            while (1) {
                              switch (_context39.prev = _context39.next) {
                                case 0:
                                  _context39.next = 2;
                                  return (0, _mostActive.discordMostActive)(discordClient, message, _setting12, io);

                                case 2:
                                  task = _context39.sent;

                                case 3:
                                case "end":
                                  return _context39.stop();
                              }
                            }
                          }, _callee39);
                        })));

                      case 130:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'pickclass')) {
                          _context44.next = 142;
                          break;
                        }

                        _context44.next = 133;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'PickClass');

                      case 133:
                        _limited25 = _context44.sent;

                        if (!_limited25) {
                          _context44.next = 136;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 136:
                        _context44.next = 138;
                        return _models["default"].setting.findOne();

                      case 138:
                        _setting13 = _context44.sent;
                        _context44.next = 141;
                        return (0, _pickClass.discordPickClass)(discordClient, message, _setting13, io, queue);

                      case 141:
                        task = _context44.sent;

                      case 142:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'skills')) {
                          _context44.next = 154;
                          break;
                        }

                        _context44.next = 145;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Skills');

                      case 145:
                        _limited26 = _context44.sent;

                        if (!_limited26) {
                          _context44.next = 148;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 148:
                        _context44.next = 150;
                        return _models["default"].setting.findOne();

                      case 150:
                        _setting14 = _context44.sent;
                        _context44.next = 153;
                        return (0, _skill.discordSkills)(discordClient, message, _setting14, io, queue);

                      case 153:
                        _task = _context44.sent;

                      case 154:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'inventory')) {
                          _context44.next = 166;
                          break;
                        }

                        _context44.next = 157;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Inventory');

                      case 157:
                        _limited27 = _context44.sent;

                        if (!_limited27) {
                          _context44.next = 160;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 160:
                        _context44.next = 162;
                        return _models["default"].setting.findOne();

                      case 162:
                        _setting15 = _context44.sent;
                        _context44.next = 165;
                        return (0, _inventory.discordShowInventory)(discordClient, message, _setting15, io, queue);

                      case 165:
                        _task2 = _context44.sent;

                      case 166:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'equipment')) {
                          _context44.next = 178;
                          break;
                        }

                        _context44.next = 169;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Equipment');

                      case 169:
                        _limited28 = _context44.sent;

                        if (!_limited28) {
                          _context44.next = 172;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 172:
                        _context44.next = 174;
                        return _models["default"].setting.findOne();

                      case 174:
                        _setting16 = _context44.sent;
                        _context44.next = 177;
                        return (0, _equipment.discordShowEquipment)(discordClient, message, _setting16, io, queue);

                      case 177:
                        _task3 = _context44.sent;

                      case 178:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'stats')) {
                          _context44.next = 190;
                          break;
                        }

                        _context44.next = 181;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Stats');

                      case 181:
                        _limited29 = _context44.sent;

                        if (!_limited29) {
                          _context44.next = 184;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 184:
                        _context44.next = 186;
                        return _models["default"].setting.findOne();

                      case 186:
                        _setting17 = _context44.sent;
                        _context44.next = 189;
                        return (0, _stats.discordStats)(discordClient, message, _setting17, io, queue);

                      case 189:
                        _task4 = _context44.sent;

                      case 190:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'withdraw')) {
                          _context44.next = 208;
                          break;
                        }

                        _context44.next = 193;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Withdraw');

                      case 193:
                        _limited30 = _context44.sent;

                        if (!_limited30) {
                          _context44.next = 196;
                          break;
                        }

                        return _context44.abrupt("return");

                      case 196:
                        _context44.next = 198;
                        return (0, _featureSetting.discordFeatureSettings)(message, 'withdraw', groupTaskId, channelTaskId);

                      case 198:
                        _setting18 = _context44.sent;
                        _context44.next = 201;
                        return (0, _preWithdraw.preWithdraw)(discordClient, message);

                      case 201:
                        _yield$preWithdraw3 = _context44.sent;
                        _yield$preWithdraw4 = (0, _slicedToArray2["default"])(_yield$preWithdraw3, 2);
                        success = _yield$preWithdraw4[0];
                        filteredMessage = _yield$preWithdraw4[1];

                        if (!success) {
                          _context44.next = 208;
                          break;
                        }

                        _context44.next = 208;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
                          var task;
                          return _regenerator["default"].wrap(function _callee40$(_context40) {
                            while (1) {
                              switch (_context40.prev = _context40.next) {
                                case 0:
                                  _context40.next = 2;
                                  return (0, _withdraw.discordWithdraw)(discordClient, message, filteredMessage, _setting18, io);

                                case 2:
                                  task = _context40.sent;

                                case 3:
                                case "end":
                                  return _context40.stop();
                              }
                            }
                          }, _callee40);
                        })));

                      case 208:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'generatemagicitem')) {
                          _context44.next = 213;
                          break;
                        }

                        console.log(message);

                        if (!(message && message.author && message.author.id === '217379915803131906')) {
                          _context44.next = 213;
                          break;
                        }

                        _context44.next = 213;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
                          var task;
                          return _regenerator["default"].wrap(function _callee41$(_context41) {
                            while (1) {
                              switch (_context41.prev = _context41.next) {
                                case 0:
                                  _context41.next = 2;
                                  return (0, _showCaseMagicItem.discordShowCaseMagicItem)(discordClient, message, Number(filteredMessageDiscord[2]), queue, io);

                                case 2:
                                  task = _context41.sent;

                                case 3:
                                case "end":
                                  return _context41.stop();
                              }
                            }
                          }, _callee41);
                        })));

                      case 213:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'battle')) {
                          _context44.next = 216;
                          break;
                        }

                        _context44.next = 216;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
                          var task;
                          return _regenerator["default"].wrap(function _callee42$(_context42) {
                            while (1) {
                              switch (_context42.prev = _context42.next) {
                                case 0:
                                  _context42.next = 2;
                                  return (0, _battle.discordBattle)(discordClient, message, io, queue);

                                case 2:
                                  task = _context42.sent;

                                case 3:
                                case "end":
                                  return _context42.stop();
                              }
                            }
                          }, _callee42);
                        })));

                      case 216:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'heal')) {
                          _context44.next = 219;
                          break;
                        }

                        _context44.next = 219;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
                          var task;
                          return _regenerator["default"].wrap(function _callee43$(_context43) {
                            while (1) {
                              switch (_context43.prev = _context43.next) {
                                case 0:
                                  _context43.next = 2;
                                  return (0, _heal.discordHeal)(discordClient, message, io, queue);

                                case 2:
                                  task = _context43.sent;

                                case 3:
                                case "end":
                                  return _context43.stop();
                              }
                            }
                          }, _callee43);
                        })));

                      case 219:
                      case "end":
                        return _context44.stop();
                    }
                  }
                }, _callee44);
              }));

              return function (_x11) {
                return _ref29.apply(this, arguments);
              };
            }());

          case 8:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee45);
  }));

  return function discordRouter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordRouter = discordRouter;