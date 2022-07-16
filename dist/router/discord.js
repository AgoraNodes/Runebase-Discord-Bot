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

var _featureSetting = require("../controllers/featureSetting");

var _user = require("../controllers/user");

var _help = require("../controllers/help");

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

var _grantExp = require("../controllers/grantExp");

var _generateStartDagger = require("../controllers/generateStartDagger");

var _resetStats = require("../controllers/resetStats");

var _resetSkills = require("../controllers/resetSkills");

var _skill = require("../controllers/skill");

var _userGroup = require("../controllers/userGroup");

var _account = require("../controllers/account");

var _changeRealm = require("../controllers/changeRealm");

var _rateLimit = require("../helpers/rateLimit");

var _preWithdraw = require("../helpers/withdraw/preWithdraw");

var _isMaintenanceOrDisabled = require("../helpers/isMaintenanceOrDisabled");

var _onUserJoinRealm = _interopRequireDefault(require("../helpers/realm/onUserJoinRealm"));

var _settings = _interopRequireDefault(require("../config/settings"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

(0, _dotenv.config)();

var discordRouter = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee48(discordClient, queue, io) {
    var userInvites;
    return _regenerator["default"].wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
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
                        _context4.next = 5;
                        return (0, _user.createUpdateDiscordUser)(discordClient, member.user, queue);

                      case 5:
                        newUser = _context4.sent;

                        if (member.guild.id === setting.discordHomeServerGuildId) {
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
                        } // Test for Level and give user a rank if needed


                        (0, _onUserJoinRealm["default"])(discordClient, member);

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
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, maintenance, walletExists, commandName, limited, _limited, _limited2, _limited3, _limited4, _limited5, _limited6, _limited7, _limited8, setting, _limited9, _setting, task, _limited10, _setting2, _limited11, _setting3, _limited12, _setting4, _limited13, _setting5, _limited14, _setting6, _setting7, _limited15, _limited16, _setting8, _yield$preWithdraw, _yield$preWithdraw2, success, filteredMessage, _setting9, discordChannel, _limited17;

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
                          _context27.next = 331;
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
                          _context27.next = 308;
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
                        if (!(commandName === 'resetstats')) {
                          _context27.next = 57;
                          break;
                        }

                        _context27.next = 46;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 46:
                        _context27.next = 48;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'ResetStats');

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
                        return (0, _resetStats.discordResetStats)(discordClient, interaction, io, queue);

                      case 55:
                        _context27.next = 57;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 57:
                        if (!(commandName === 'resetskills')) {
                          _context27.next = 71;
                          break;
                        }

                        _context27.next = 60;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 60:
                        _context27.next = 62;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'ResetSkills');

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
                        return (0, _resetSkills.discordResetSkills)(discordClient, interaction, io, queue);

                      case 69:
                        _context27.next = 71;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 71:
                        if (!(commandName === 'myrank')) {
                          _context27.next = 85;
                          break;
                        }

                        _context27.next = 74;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 74:
                        _context27.next = 76;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Myrank');

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

                      case 83:
                        _context27.next = 85;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 85:
                        if (!(commandName === 'ranks')) {
                          _context27.next = 99;
                          break;
                        }

                        _context27.next = 88;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 88:
                        _context27.next = 90;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Ranks');

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

                      case 97:
                        _context27.next = 99;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 99:
                        if (!(commandName === 'deposit')) {
                          _context27.next = 113;
                          break;
                        }

                        _context27.next = 102;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 102:
                        _context27.next = 104;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Deposit');

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

                      case 111:
                        _context27.next = 113;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 113:
                        if (!(commandName === 'price')) {
                          _context27.next = 127;
                          break;
                        }

                        _context27.next = 116;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 116:
                        _context27.next = 118;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Price');

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

                      case 125:
                        _context27.next = 127;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 127:
                        if (!(commandName === 'balance')) {
                          _context27.next = 141;
                          break;
                        }

                        _context27.next = 130;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 130:
                        _context27.next = 132;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Balance');

                      case 132:
                        _limited7 = _context27.sent;

                        if (!_limited7) {
                          _context27.next = 137;
                          break;
                        }

                        _context27.next = 136;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 136:
                        return _context27.abrupt("return");

                      case 137:
                        _context27.next = 139;
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

                      case 139:
                        _context27.next = 141;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 141:
                        if (!(commandName === 'leaderboard')) {
                          _context27.next = 158;
                          break;
                        }

                        _context27.next = 144;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 144:
                        _context27.next = 146;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Leaderboard');

                      case 146:
                        _limited8 = _context27.sent;

                        if (!_limited8) {
                          _context27.next = 151;
                          break;
                        }

                        _context27.next = 150;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 150:
                        return _context27.abrupt("return");

                      case 151:
                        _context27.next = 153;
                        return _models["default"].setting.findOne();

                      case 153:
                        setting = _context27.sent;
                        _context27.next = 156;
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

                      case 156:
                        _context27.next = 158;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 158:
                        if (!(commandName === 'pickclass')) {
                          _context27.next = 176;
                          break;
                        }

                        _context27.next = 161;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 161:
                        _context27.next = 163;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'PickClass');

                      case 163:
                        _limited9 = _context27.sent;

                        if (!_limited9) {
                          _context27.next = 168;
                          break;
                        }

                        _context27.next = 167;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 167:
                        return _context27.abrupt("return");

                      case 168:
                        _context27.next = 170;
                        return _models["default"].setting.findOne();

                      case 170:
                        _setting = _context27.sent;
                        _context27.next = 173;
                        return (0, _pickClass.discordPickClass)(discordClient, interaction, _setting, io, queue);

                      case 173:
                        task = _context27.sent;
                        _context27.next = 176;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 176:
                        if (!(commandName === 'mostactive')) {
                          _context27.next = 193;
                          break;
                        }

                        _context27.next = 179;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 179:
                        _context27.next = 181;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'MostActive');

                      case 181:
                        _limited10 = _context27.sent;

                        if (!_limited10) {
                          _context27.next = 186;
                          break;
                        }

                        _context27.next = 185;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 185:
                        return _context27.abrupt("return");

                      case 186:
                        _context27.next = 188;
                        return _models["default"].setting.findOne();

                      case 188:
                        _setting2 = _context27.sent;
                        _context27.next = 191;
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

                      case 191:
                        _context27.next = 193;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 193:
                        if (!(commandName === 'stats')) {
                          _context27.next = 210;
                          break;
                        }

                        _context27.next = 196;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 196:
                        _context27.next = 198;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Stats');

                      case 198:
                        _limited11 = _context27.sent;

                        if (!_limited11) {
                          _context27.next = 203;
                          break;
                        }

                        _context27.next = 202;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 202:
                        return _context27.abrupt("return");

                      case 203:
                        _context27.next = 205;
                        return _models["default"].setting.findOne();

                      case 205:
                        _setting3 = _context27.sent;
                        _context27.next = 208;
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

                      case 208:
                        _context27.next = 210;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 210:
                        if (!(commandName === 'inventory')) {
                          _context27.next = 227;
                          break;
                        }

                        _context27.next = 213;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 213:
                        _context27.next = 215;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Inventory');

                      case 215:
                        _limited12 = _context27.sent;

                        if (!_limited12) {
                          _context27.next = 220;
                          break;
                        }

                        _context27.next = 219;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 219:
                        return _context27.abrupt("return");

                      case 220:
                        _context27.next = 222;
                        return _models["default"].setting.findOne();

                      case 222:
                        _setting4 = _context27.sent;
                        _context27.next = 225;
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

                      case 225:
                        _context27.next = 227;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 227:
                        if (!(commandName === 'skills')) {
                          _context27.next = 244;
                          break;
                        }

                        _context27.next = 230;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 230:
                        _context27.next = 232;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Skills');

                      case 232:
                        _limited13 = _context27.sent;

                        if (!_limited13) {
                          _context27.next = 237;
                          break;
                        }

                        _context27.next = 236;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 236:
                        return _context27.abrupt("return");

                      case 237:
                        _context27.next = 239;
                        return _models["default"].setting.findOne();

                      case 239:
                        _setting5 = _context27.sent;
                        _context27.next = 242;
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

                      case 242:
                        _context27.next = 244;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 244:
                        if (!(commandName === 'equipment')) {
                          _context27.next = 261;
                          break;
                        }

                        _context27.next = 247;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 247:
                        _context27.next = 249;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Equipment');

                      case 249:
                        _limited14 = _context27.sent;

                        if (!_limited14) {
                          _context27.next = 254;
                          break;
                        }

                        _context27.next = 253;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 253:
                        return _context27.abrupt("return");

                      case 254:
                        _context27.next = 256;
                        return _models["default"].setting.findOne();

                      case 256:
                        _setting6 = _context27.sent;
                        _context27.next = 259;
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

                      case 259:
                        _context27.next = 261;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 261:
                        if (!(commandName === 'roll')) {
                          _context27.next = 282;
                          break;
                        }

                        _context27.next = 264;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 264:
                        _context27.next = 266;
                        return _models["default"].setting.findOne();

                      case 266:
                        _setting7 = _context27.sent;

                        if (!(_setting7.roleDiceChannelId !== interaction.channelId)) {
                          _context27.next = 270;
                          break;
                        }

                        _context27.next = 270;
                        return interaction.editReply("please use <#".concat(_setting7.roleDiceChannelId, "> for rolling dice"))["catch"](function (e) {
                          console.log(e);
                        });

                      case 270:
                        if (!(_setting7.roleDiceChannelId === interaction.channelId)) {
                          _context27.next = 282;
                          break;
                        }

                        _context27.next = 273;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'RollDice');

                      case 273:
                        _limited15 = _context27.sent;

                        if (!_limited15) {
                          _context27.next = 278;
                          break;
                        }

                        _context27.next = 277;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 277:
                        return _context27.abrupt("return");

                      case 278:
                        _context27.next = 280;
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

                      case 280:
                        _context27.next = 282;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 282:
                        if (!(commandName === 'withdraw')) {
                          _context27.next = 308;
                          break;
                        }

                        _context27.next = 285;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 285:
                        _context27.next = 287;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Withdraw');

                      case 287:
                        _limited16 = _context27.sent;

                        if (!_limited16) {
                          _context27.next = 292;
                          break;
                        }

                        _context27.next = 291;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 291:
                        return _context27.abrupt("return");

                      case 292:
                        _context27.next = 294;
                        return (0, _featureSetting.discordFeatureSettings)(interaction, 'withdraw', groupTaskId, channelTaskId);

                      case 294:
                        _setting8 = _context27.sent;

                        if (_setting8) {
                          _context27.next = 297;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 297:
                        _context27.next = 299;
                        return (0, _preWithdraw.preWithdraw)(discordClient, interaction);

                      case 299:
                        _yield$preWithdraw = _context27.sent;
                        _yield$preWithdraw2 = (0, _slicedToArray2["default"])(_yield$preWithdraw, 2);
                        success = _yield$preWithdraw2[0];
                        filteredMessage = _yield$preWithdraw2[1];

                        if (!success) {
                          _context27.next = 306;
                          break;
                        }

                        _context27.next = 306;
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

                      case 306:
                        _context27.next = 308;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 308:
                        if (!interaction.isButton()) {
                          _context27.next = 331;
                          break;
                        }

                        if (!(interaction.customId === 'roll')) {
                          _context27.next = 331;
                          break;
                        }

                        _context27.next = 312;
                        return _models["default"].setting.findOne();

                      case 312:
                        _setting9 = _context27.sent;

                        if (!(_setting9.roleDiceChannelId !== interaction.channelId)) {
                          _context27.next = 321;
                          break;
                        }

                        _context27.next = 316;
                        return discordClient.channels.cache.get(_setting9.roleDiceChannelId);

                      case 316:
                        discordChannel = _context27.sent;
                        _context27.next = 319;
                        return discordChannel.send("please use <#".concat(_setting9.roleDiceChannelId, "> for rolling dice"));

                      case 319:
                        _context27.next = 321;
                        return interaction.editReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 321:
                        if (!(_setting9.roleDiceChannelId === interaction.channelId)) {
                          _context27.next = 329;
                          break;
                        }

                        _context27.next = 324;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'RollDice');

                      case 324:
                        _limited17 = _context27.sent;

                        if (!_limited17) {
                          _context27.next = 327;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 327:
                        _context27.next = 329;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
                          var task;
                          return _regenerator["default"].wrap(function _callee26$(_context26) {
                            while (1) {
                              switch (_context26.prev = _context26.next) {
                                case 0:
                                  _context26.next = 2;
                                  return (0, _rollDice.discordRollDice)(discordClient, interaction, _setting9, io);

                                case 2:
                                  task = _context26.sent;

                                case 3:
                                case "end":
                                  return _context26.stop();
                              }
                            }
                          }, _callee26);
                        })));

                      case 329:
                        _context27.next = 331;
                        return interaction.deferUpdate()["catch"](function (e) {
                          console.log(e);
                        });

                      case 331:
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
              var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee47(message) {
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, user, messageReplaceBreaksWithSpaces, preFilteredMessageDiscord, filteredMessageDiscord, setting, maintenance, limited, _limited18, _limited19, _limited20, _limited21, _limited22, _limited23, _limited24, _limited25, _setting10, _limited26, _setting11, _limited27, _setting12, _limited28, _setting13, task, _limited29, _setting14, _task, _limited30, _setting15, _task2, _limited31, _setting16, _task3, _limited32, _setting17, _task4, _limited33, _setting18, _yield$preWithdraw3, _yield$preWithdraw4, success, filteredMessage, _limited34, _limited35, _limited36, _setting19;

                return _regenerator["default"].wrap(function _callee47$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        if (message.author.bot) {
                          _context47.next = 13;
                          break;
                        }

                        _context47.next = 3;
                        return (0, _user.createUpdateDiscordUser)(discordClient, message.author, queue);

                      case 3:
                        user = _context47.sent;
                        _context47.next = 6;
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
                        console.log(user);
                        console.log(user.id);
                        console.log(groupTaskId);
                        _context47.next = 13;
                        return (0, _userGroup.findOrCreateUserGroupRecord)(user.id, groupTaskId);

                      case 13:
                        messageReplaceBreaksWithSpaces = message.content.replace(/\n/g, " ");
                        preFilteredMessageDiscord = messageReplaceBreaksWithSpaces.split(' ');
                        filteredMessageDiscord = preFilteredMessageDiscord.filter(function (el) {
                          return el !== '';
                        });
                        console.log('1-1');

                        if (message.author.bot) {
                          _context47.next = 23;
                          break;
                        }

                        _context47.next = 20;
                        return _models["default"].setting.findOne();

                      case 20:
                        setting = _context47.sent;
                        _context47.next = 23;
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

                      case 23:
                        console.log('1-2');

                        if (!(!message.content.startsWith(_settings["default"].bot.command) || message.author.bot)) {
                          _context47.next = 26;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 26:
                        _context47.next = 28;
                        return (0, _isMaintenanceOrDisabled.isMaintenanceOrDisabled)(message, 'discord');

                      case 28:
                        maintenance = _context47.sent;

                        if (!(maintenance.maintenance || !maintenance.enabled)) {
                          _context47.next = 31;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 31:
                        if (!(groupTask && groupTask.banned)) {
                          _context47.next = 35;
                          break;
                        }

                        _context47.next = 34;
                        return message.channel.send({
                          embeds: [(0, _messages.discordServerBannedMessage)(groupTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 34:
                        return _context47.abrupt("return");

                      case 35:
                        console.log('1-3');

                        if (!(channelTask && channelTask.banned)) {
                          _context47.next = 40;
                          break;
                        }

                        _context47.next = 39;
                        return message.channel.send({
                          embeds: [(0, _messages.discordChannelBannedMessage)(channelTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 39:
                        return _context47.abrupt("return");

                      case 40:
                        console.log('1-4');

                        if (!(lastSeenDiscordTask && lastSeenDiscordTask.banned)) {
                          _context47.next = 45;
                          break;
                        }

                        _context47.next = 44;
                        return message.channel.send({
                          embeds: [(0, _messages.discordUserBannedMessage)(lastSeenDiscordTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 44:
                        return _context47.abrupt("return");

                      case 45:
                        console.log('1-5');

                        if (!(filteredMessageDiscord[1] === undefined)) {
                          _context47.next = 54;
                          break;
                        }

                        _context47.next = 49;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 49:
                        limited = _context47.sent;

                        if (!limited) {
                          _context47.next = 52;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 52:
                        _context47.next = 54;
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

                      case 54:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'help')) {
                          _context47.next = 63;
                          break;
                        }

                        console.log('used help');
                        _context47.next = 58;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 58:
                        _limited18 = _context47.sent;

                        if (!_limited18) {
                          _context47.next = 61;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 61:
                        _context47.next = 63;
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

                      case 63:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'changerealm')) {
                          _context47.next = 72;
                          break;
                        }

                        console.log('used help');
                        _context47.next = 67;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 67:
                        _limited19 = _context47.sent;

                        if (!_limited19) {
                          _context47.next = 70;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 70:
                        _context47.next = 72;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
                          var task;
                          return _regenerator["default"].wrap(function _callee32$(_context32) {
                            while (1) {
                              switch (_context32.prev = _context32.next) {
                                case 0:
                                  _context32.next = 2;
                                  return (0, _changeRealm.discordChangeRealm)(discordClient, message, io);

                                case 2:
                                  task = _context32.sent;

                                case 3:
                                case "end":
                                  return _context32.stop();
                              }
                            }
                          }, _callee32);
                        })));

                      case 72:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'myrank')) {
                          _context47.next = 80;
                          break;
                        }

                        _context47.next = 75;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Myrank');

                      case 75:
                        _limited20 = _context47.sent;

                        if (!_limited20) {
                          _context47.next = 78;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 78:
                        _context47.next = 80;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
                          var task;
                          return _regenerator["default"].wrap(function _callee33$(_context33) {
                            while (1) {
                              switch (_context33.prev = _context33.next) {
                                case 0:
                                  _context33.next = 2;
                                  return (0, _myrank.discordMyRank)(discordClient, message, io);

                                case 2:
                                  task = _context33.sent;

                                case 3:
                                case "end":
                                  return _context33.stop();
                              }
                            }
                          }, _callee33);
                        })));

                      case 80:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'ranks')) {
                          _context47.next = 88;
                          break;
                        }

                        _context47.next = 83;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Ranks');

                      case 83:
                        _limited21 = _context47.sent;

                        if (!_limited21) {
                          _context47.next = 86;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 86:
                        _context47.next = 88;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
                          var task;
                          return _regenerator["default"].wrap(function _callee34$(_context34) {
                            while (1) {
                              switch (_context34.prev = _context34.next) {
                                case 0:
                                  _context34.next = 2;
                                  return (0, _ranks.discordRanks)(discordClient, message, io);

                                case 2:
                                  task = _context34.sent;

                                case 3:
                                case "end":
                                  return _context34.stop();
                              }
                            }
                          }, _callee34);
                        })));

                      case 88:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'deposit')) {
                          _context47.next = 96;
                          break;
                        }

                        _context47.next = 91;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Deposit');

                      case 91:
                        _limited22 = _context47.sent;

                        if (!_limited22) {
                          _context47.next = 94;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 94:
                        _context47.next = 96;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
                          var task;
                          return _regenerator["default"].wrap(function _callee35$(_context35) {
                            while (1) {
                              switch (_context35.prev = _context35.next) {
                                case 0:
                                  _context35.next = 2;
                                  return (0, _deposit.discordDeposit)(discordClient, message, io);

                                case 2:
                                  task = _context35.sent;

                                case 3:
                                case "end":
                                  return _context35.stop();
                              }
                            }
                          }, _callee35);
                        })));

                      case 96:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'price')) {
                          _context47.next = 104;
                          break;
                        }

                        _context47.next = 99;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Price');

                      case 99:
                        _limited23 = _context47.sent;

                        if (!_limited23) {
                          _context47.next = 102;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 102:
                        _context47.next = 104;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
                          var task;
                          return _regenerator["default"].wrap(function _callee36$(_context36) {
                            while (1) {
                              switch (_context36.prev = _context36.next) {
                                case 0:
                                  _context36.next = 2;
                                  return (0, _price.discordPrice)(discordClient, message, io);

                                case 2:
                                  task = _context36.sent;

                                case 3:
                                case "end":
                                  return _context36.stop();
                              }
                            }
                          }, _callee36);
                        })));

                      case 104:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'balance')) {
                          _context47.next = 112;
                          break;
                        }

                        _context47.next = 107;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Balance');

                      case 107:
                        _limited24 = _context47.sent;

                        if (!_limited24) {
                          _context47.next = 110;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 110:
                        _context47.next = 112;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
                          var task;
                          return _regenerator["default"].wrap(function _callee37$(_context37) {
                            while (1) {
                              switch (_context37.prev = _context37.next) {
                                case 0:
                                  _context37.next = 2;
                                  return (0, _balance.discordBalance)(discordClient, message, io);

                                case 2:
                                  task = _context37.sent;

                                case 3:
                                case "end":
                                  return _context37.stop();
                              }
                            }
                          }, _callee37);
                        })));

                      case 112:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'roll')) {
                          _context47.next = 127;
                          break;
                        }

                        _context47.next = 115;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'RollDice');

                      case 115:
                        _limited25 = _context47.sent;

                        if (!_limited25) {
                          _context47.next = 118;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 118:
                        _context47.next = 120;
                        return _models["default"].setting.findOne();

                      case 120:
                        _setting10 = _context47.sent;

                        if (!(message.channelId !== _setting10.roleDiceChannelId)) {
                          _context47.next = 124;
                          break;
                        }

                        _context47.next = 124;
                        return message.reply("please use <#".concat(_setting10.roleDiceChannelId, "> for rolling dice"))["catch"](function (e) {
                          console.log(e);
                        });

                      case 124:
                        if (!(message.channelId === _setting10.roleDiceChannelId)) {
                          _context47.next = 127;
                          break;
                        }

                        _context47.next = 127;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
                          var task;
                          return _regenerator["default"].wrap(function _callee38$(_context38) {
                            while (1) {
                              switch (_context38.prev = _context38.next) {
                                case 0:
                                  _context38.next = 2;
                                  return (0, _rollDice.discordRollDice)(discordClient, message, _setting10, io);

                                case 2:
                                  task = _context38.sent;

                                case 3:
                                case "end":
                                  return _context38.stop();
                              }
                            }
                          }, _callee38);
                        })));

                      case 127:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'leaderboard')) {
                          _context47.next = 138;
                          break;
                        }

                        _context47.next = 130;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Leaderboard');

                      case 130:
                        _limited26 = _context47.sent;

                        if (!_limited26) {
                          _context47.next = 133;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 133:
                        _context47.next = 135;
                        return _models["default"].setting.findOne();

                      case 135:
                        _setting11 = _context47.sent;
                        _context47.next = 138;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
                          var task;
                          return _regenerator["default"].wrap(function _callee39$(_context39) {
                            while (1) {
                              switch (_context39.prev = _context39.next) {
                                case 0:
                                  _context39.next = 2;
                                  return (0, _leaderboard.discordLeaderboard)(discordClient, message, _setting11, io);

                                case 2:
                                  task = _context39.sent;

                                case 3:
                                case "end":
                                  return _context39.stop();
                              }
                            }
                          }, _callee39);
                        })));

                      case 138:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'mostactive')) {
                          _context47.next = 149;
                          break;
                        }

                        _context47.next = 141;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'MostActive');

                      case 141:
                        _limited27 = _context47.sent;

                        if (!_limited27) {
                          _context47.next = 144;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 144:
                        _context47.next = 146;
                        return _models["default"].setting.findOne();

                      case 146:
                        _setting12 = _context47.sent;
                        _context47.next = 149;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
                          var task;
                          return _regenerator["default"].wrap(function _callee40$(_context40) {
                            while (1) {
                              switch (_context40.prev = _context40.next) {
                                case 0:
                                  _context40.next = 2;
                                  return (0, _mostActive.discordMostActive)(discordClient, message, _setting12, io);

                                case 2:
                                  task = _context40.sent;

                                case 3:
                                case "end":
                                  return _context40.stop();
                              }
                            }
                          }, _callee40);
                        })));

                      case 149:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'pickclass')) {
                          _context47.next = 161;
                          break;
                        }

                        _context47.next = 152;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'PickClass');

                      case 152:
                        _limited28 = _context47.sent;

                        if (!_limited28) {
                          _context47.next = 155;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 155:
                        _context47.next = 157;
                        return _models["default"].setting.findOne();

                      case 157:
                        _setting13 = _context47.sent;
                        _context47.next = 160;
                        return (0, _pickClass.discordPickClass)(discordClient, message, _setting13, io, queue);

                      case 160:
                        task = _context47.sent;

                      case 161:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'skills')) {
                          _context47.next = 173;
                          break;
                        }

                        _context47.next = 164;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Skills');

                      case 164:
                        _limited29 = _context47.sent;

                        if (!_limited29) {
                          _context47.next = 167;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 167:
                        _context47.next = 169;
                        return _models["default"].setting.findOne();

                      case 169:
                        _setting14 = _context47.sent;
                        _context47.next = 172;
                        return (0, _skill.discordSkills)(discordClient, message, _setting14, io, queue);

                      case 172:
                        _task = _context47.sent;

                      case 173:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'inventory')) {
                          _context47.next = 185;
                          break;
                        }

                        _context47.next = 176;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Inventory');

                      case 176:
                        _limited30 = _context47.sent;

                        if (!_limited30) {
                          _context47.next = 179;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 179:
                        _context47.next = 181;
                        return _models["default"].setting.findOne();

                      case 181:
                        _setting15 = _context47.sent;
                        _context47.next = 184;
                        return (0, _inventory.discordShowInventory)(discordClient, message, _setting15, io, queue);

                      case 184:
                        _task2 = _context47.sent;

                      case 185:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'equipment')) {
                          _context47.next = 197;
                          break;
                        }

                        _context47.next = 188;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Equipment');

                      case 188:
                        _limited31 = _context47.sent;

                        if (!_limited31) {
                          _context47.next = 191;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 191:
                        _context47.next = 193;
                        return _models["default"].setting.findOne();

                      case 193:
                        _setting16 = _context47.sent;
                        _context47.next = 196;
                        return (0, _equipment.discordShowEquipment)(discordClient, message, _setting16, io, queue);

                      case 196:
                        _task3 = _context47.sent;

                      case 197:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'stats')) {
                          _context47.next = 209;
                          break;
                        }

                        _context47.next = 200;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Stats');

                      case 200:
                        _limited32 = _context47.sent;

                        if (!_limited32) {
                          _context47.next = 203;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 203:
                        _context47.next = 205;
                        return _models["default"].setting.findOne();

                      case 205:
                        _setting17 = _context47.sent;
                        _context47.next = 208;
                        return (0, _stats.discordStats)(discordClient, message, _setting17, io, queue);

                      case 208:
                        _task4 = _context47.sent;

                      case 209:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'withdraw')) {
                          _context47.next = 227;
                          break;
                        }

                        _context47.next = 212;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Withdraw');

                      case 212:
                        _limited33 = _context47.sent;

                        if (!_limited33) {
                          _context47.next = 215;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 215:
                        _context47.next = 217;
                        return (0, _featureSetting.discordFeatureSettings)(message, 'withdraw', groupTaskId, channelTaskId);

                      case 217:
                        _setting18 = _context47.sent;
                        _context47.next = 220;
                        return (0, _preWithdraw.preWithdraw)(discordClient, message);

                      case 220:
                        _yield$preWithdraw3 = _context47.sent;
                        _yield$preWithdraw4 = (0, _slicedToArray2["default"])(_yield$preWithdraw3, 2);
                        success = _yield$preWithdraw4[0];
                        filteredMessage = _yield$preWithdraw4[1];

                        if (!success) {
                          _context47.next = 227;
                          break;
                        }

                        _context47.next = 227;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
                          var task;
                          return _regenerator["default"].wrap(function _callee41$(_context41) {
                            while (1) {
                              switch (_context41.prev = _context41.next) {
                                case 0:
                                  _context41.next = 2;
                                  return (0, _withdraw.discordWithdraw)(discordClient, message, filteredMessage, _setting18, io);

                                case 2:
                                  task = _context41.sent;

                                case 3:
                                case "end":
                                  return _context41.stop();
                              }
                            }
                          }, _callee41);
                        })));

                      case 227:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'generatemagicitem')) {
                          _context47.next = 232;
                          break;
                        }

                        console.log(message);

                        if (!(message && message.author && message.author.id === '217379915803131906')) {
                          _context47.next = 232;
                          break;
                        }

                        _context47.next = 232;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
                          var task;
                          return _regenerator["default"].wrap(function _callee42$(_context42) {
                            while (1) {
                              switch (_context42.prev = _context42.next) {
                                case 0:
                                  _context42.next = 2;
                                  return (0, _showCaseMagicItem.discordShowCaseMagicItem)(discordClient, message, Number(filteredMessageDiscord[2]), queue, io);

                                case 2:
                                  task = _context42.sent;

                                case 3:
                                case "end":
                                  return _context42.stop();
                              }
                            }
                          }, _callee42);
                        })));

                      case 232:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'generatestartdagger')) {
                          _context47.next = 240;
                          break;
                        }

                        _context47.next = 235;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'GenerateStartDagger');

                      case 235:
                        _limited34 = _context47.sent;

                        if (!_limited34) {
                          _context47.next = 238;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 238:
                        _context47.next = 240;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
                          var task;
                          return _regenerator["default"].wrap(function _callee43$(_context43) {
                            while (1) {
                              switch (_context43.prev = _context43.next) {
                                case 0:
                                  _context43.next = 2;
                                  return (0, _generateStartDagger.discordStartDagger)(discordClient, message, queue, io);

                                case 2:
                                  task = _context43.sent;

                                case 3:
                                case "end":
                                  return _context43.stop();
                              }
                            }
                          }, _callee43);
                        })));

                      case 240:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'battle')) {
                          _context47.next = 243;
                          break;
                        }

                        _context47.next = 243;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
                          var task;
                          return _regenerator["default"].wrap(function _callee44$(_context44) {
                            while (1) {
                              switch (_context44.prev = _context44.next) {
                                case 0:
                                  _context44.next = 2;
                                  return (0, _battle.discordBattle)(discordClient, message, io, queue);

                                case 2:
                                  task = _context44.sent;

                                case 3:
                                case "end":
                                  return _context44.stop();
                              }
                            }
                          }, _callee44);
                        })));

                      case 243:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'heal')) {
                          _context47.next = 246;
                          break;
                        }

                        _context47.next = 246;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
                          var task;
                          return _regenerator["default"].wrap(function _callee45$(_context45) {
                            while (1) {
                              switch (_context45.prev = _context45.next) {
                                case 0:
                                  _context45.next = 2;
                                  return (0, _heal.discordHeal)(discordClient, message, io, queue);

                                case 2:
                                  task = _context45.sent;

                                case 3:
                                case "end":
                                  return _context45.stop();
                              }
                            }
                          }, _callee45);
                        })));

                      case 246:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'resetstats')) {
                          _context47.next = 254;
                          break;
                        }

                        _context47.next = 249;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'ResetStats');

                      case 249:
                        _limited35 = _context47.sent;

                        if (!_limited35) {
                          _context47.next = 252;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 252:
                        _context47.next = 254;
                        return (0, _resetStats.discordResetStats)(discordClient, message, io, queue);

                      case 254:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'resetskills')) {
                          _context47.next = 262;
                          break;
                        }

                        _context47.next = 257;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'ResetSkills');

                      case 257:
                        _limited36 = _context47.sent;

                        if (!_limited36) {
                          _context47.next = 260;
                          break;
                        }

                        return _context47.abrupt("return");

                      case 260:
                        _context47.next = 262;
                        return (0, _resetSkills.discordResetSkills)(discordClient, message, io, queue);

                      case 262:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'grantexp')) {
                          _context47.next = 270;
                          break;
                        }

                        console.log(message);

                        if (!(message && message.author && message.author.id === '217379915803131906')) {
                          _context47.next = 270;
                          break;
                        }

                        _context47.next = 267;
                        return _models["default"].setting.findOne();

                      case 267:
                        _setting19 = _context47.sent;
                        _context47.next = 270;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
                          var task;
                          return _regenerator["default"].wrap(function _callee46$(_context46) {
                            while (1) {
                              switch (_context46.prev = _context46.next) {
                                case 0:
                                  _context46.next = 2;
                                  return (0, _grantExp.discordGrantExp)(discordClient, message, filteredMessageDiscord, _setting19, queue, io);

                                case 2:
                                  task = _context46.sent;

                                case 3:
                                case "end":
                                  return _context46.stop();
                              }
                            }
                          }, _callee46);
                        })));

                      case 270:
                      case "end":
                        return _context47.stop();
                    }
                  }
                }, _callee47);
              }));

              return function (_x11) {
                return _ref29.apply(this, arguments);
              };
            }());

          case 8:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee48);
  }));

  return function discordRouter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordRouter = discordRouter;