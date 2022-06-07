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

var _expTest = require("../controllers/expTest");

var _rateLimit = require("../helpers/rateLimit");

var _featureSetting = require("../controllers/featureSetting");

var _isMaintenanceOrDisabled = require("../helpers/isMaintenanceOrDisabled");

var _settings = _interopRequireDefault(require("../config/settings"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

(0, _dotenv.config)();

var discordRouter = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(discordClient, queue, io) {
    var userInvites;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
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
              var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(interaction) {
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, maintenance, walletExists, commandName, limited, _limited, _limited2, _limited3, _limited4, _limited5, _limited6, setting, _yield$preWithdraw, _yield$preWithdraw2, success, filteredMessage;

                return _regenerator["default"].wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        if (interaction.isCommand()) {
                          _context17.next = 2;
                          break;
                        }

                        return _context17.abrupt("return");

                      case 2:
                        if (interaction.user.bot) {
                          _context17.next = 124;
                          break;
                        }

                        _context17.next = 5;
                        return (0, _isMaintenanceOrDisabled.isMaintenanceOrDisabled)(interaction, 'discord');

                      case 5:
                        maintenance = _context17.sent;

                        if (!(maintenance.maintenance || !maintenance.enabled)) {
                          _context17.next = 8;
                          break;
                        }

                        return _context17.abrupt("return");

                      case 8:
                        _context17.next = 10;
                        return (0, _user.createUpdateDiscordUser)(discordClient, interaction.user, queue);

                      case 10:
                        walletExists = _context17.sent;
                        _context17.next = 13;
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
                        commandName = interaction.commandName;

                        if (!(commandName === 'help')) {
                          _context17.next = 28;
                          break;
                        }

                        _context17.next = 17;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 17:
                        _context17.next = 19;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Help');

                      case 19:
                        limited = _context17.sent;

                        if (!limited) {
                          _context17.next = 24;
                          break;
                        }

                        _context17.next = 23;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 23:
                        return _context17.abrupt("return");

                      case 24:
                        _context17.next = 26;
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

                      case 26:
                        _context17.next = 28;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 28:
                        if (!(commandName === 'myrank')) {
                          _context17.next = 42;
                          break;
                        }

                        _context17.next = 31;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 31:
                        _context17.next = 33;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Myrank');

                      case 33:
                        _limited = _context17.sent;

                        if (!_limited) {
                          _context17.next = 38;
                          break;
                        }

                        _context17.next = 37;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 37:
                        return _context17.abrupt("return");

                      case 38:
                        _context17.next = 40;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                          var task;
                          return _regenerator["default"].wrap(function _callee11$(_context11) {
                            while (1) {
                              switch (_context11.prev = _context11.next) {
                                case 0:
                                  _context11.next = 2;
                                  return (0, _myrank.discordMyRank)(discordClient, interaction, io);

                                case 2:
                                  task = _context11.sent;

                                case 3:
                                case "end":
                                  return _context11.stop();
                              }
                            }
                          }, _callee11);
                        })));

                      case 40:
                        _context17.next = 42;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 42:
                        if (!(commandName === 'ranks')) {
                          _context17.next = 56;
                          break;
                        }

                        _context17.next = 45;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 45:
                        _context17.next = 47;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Ranks');

                      case 47:
                        _limited2 = _context17.sent;

                        if (!_limited2) {
                          _context17.next = 52;
                          break;
                        }

                        _context17.next = 51;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 51:
                        return _context17.abrupt("return");

                      case 52:
                        _context17.next = 54;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
                          var task;
                          return _regenerator["default"].wrap(function _callee12$(_context12) {
                            while (1) {
                              switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.next = 2;
                                  return (0, _ranks.discordRanks)(discordClient, interaction, io);

                                case 2:
                                  task = _context12.sent;

                                case 3:
                                case "end":
                                  return _context12.stop();
                              }
                            }
                          }, _callee12);
                        })));

                      case 54:
                        _context17.next = 56;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 56:
                        if (!(commandName === 'deposit')) {
                          _context17.next = 70;
                          break;
                        }

                        _context17.next = 59;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 59:
                        _context17.next = 61;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Deposit');

                      case 61:
                        _limited3 = _context17.sent;

                        if (!_limited3) {
                          _context17.next = 66;
                          break;
                        }

                        _context17.next = 65;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 65:
                        return _context17.abrupt("return");

                      case 66:
                        _context17.next = 68;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
                          var task;
                          return _regenerator["default"].wrap(function _callee13$(_context13) {
                            while (1) {
                              switch (_context13.prev = _context13.next) {
                                case 0:
                                  _context13.next = 2;
                                  return (0, _deposit.discordDeposit)(discordClient, interaction, io);

                                case 2:
                                  task = _context13.sent;

                                case 3:
                                case "end":
                                  return _context13.stop();
                              }
                            }
                          }, _callee13);
                        })));

                      case 68:
                        _context17.next = 70;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 70:
                        if (!(commandName === 'price')) {
                          _context17.next = 84;
                          break;
                        }

                        _context17.next = 73;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 73:
                        _context17.next = 75;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Price');

                      case 75:
                        _limited4 = _context17.sent;

                        if (!_limited4) {
                          _context17.next = 80;
                          break;
                        }

                        _context17.next = 79;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 79:
                        return _context17.abrupt("return");

                      case 80:
                        _context17.next = 82;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
                          var task;
                          return _regenerator["default"].wrap(function _callee14$(_context14) {
                            while (1) {
                              switch (_context14.prev = _context14.next) {
                                case 0:
                                  _context14.next = 2;
                                  return (0, _price.discordPrice)(discordClient, interaction, io);

                                case 2:
                                  task = _context14.sent;

                                case 3:
                                case "end":
                                  return _context14.stop();
                              }
                            }
                          }, _callee14);
                        })));

                      case 82:
                        _context17.next = 84;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 84:
                        if (!(commandName === 'balance')) {
                          _context17.next = 98;
                          break;
                        }

                        _context17.next = 87;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 87:
                        _context17.next = 89;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Balance');

                      case 89:
                        _limited5 = _context17.sent;

                        if (!_limited5) {
                          _context17.next = 94;
                          break;
                        }

                        _context17.next = 93;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 93:
                        return _context17.abrupt("return");

                      case 94:
                        _context17.next = 96;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
                          var task;
                          return _regenerator["default"].wrap(function _callee15$(_context15) {
                            while (1) {
                              switch (_context15.prev = _context15.next) {
                                case 0:
                                  _context15.next = 2;
                                  return (0, _balance.discordBalance)(discordClient, interaction, io);

                                case 2:
                                  task = _context15.sent;

                                case 3:
                                case "end":
                                  return _context15.stop();
                              }
                            }
                          }, _callee15);
                        })));

                      case 96:
                        _context17.next = 98;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 98:
                        if (!(commandName === 'withdraw')) {
                          _context17.next = 124;
                          break;
                        }

                        _context17.next = 101;
                        return interaction.deferReply()["catch"](function (e) {
                          console.log(e);
                        });

                      case 101:
                        _context17.next = 103;
                        return (0, _rateLimit.myRateLimiter)(discordClient, interaction, 'Withdraw');

                      case 103:
                        _limited6 = _context17.sent;

                        if (!_limited6) {
                          _context17.next = 108;
                          break;
                        }

                        _context17.next = 107;
                        return interaction.editReply('rate limited')["catch"](function (e) {
                          console.log(e);
                        });

                      case 107:
                        return _context17.abrupt("return");

                      case 108:
                        _context17.next = 110;
                        return (0, _featureSetting.discordFeatureSettings)(interaction, 'withdraw', groupTaskId, channelTaskId);

                      case 110:
                        setting = _context17.sent;

                        if (setting) {
                          _context17.next = 113;
                          break;
                        }

                        return _context17.abrupt("return");

                      case 113:
                        _context17.next = 115;
                        return (0, _preWithdraw.preWithdraw)(discordClient, interaction);

                      case 115:
                        _yield$preWithdraw = _context17.sent;
                        _yield$preWithdraw2 = (0, _slicedToArray2["default"])(_yield$preWithdraw, 2);
                        success = _yield$preWithdraw2[0];
                        filteredMessage = _yield$preWithdraw2[1];

                        if (!success) {
                          _context17.next = 122;
                          break;
                        }

                        _context17.next = 122;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
                          var task;
                          return _regenerator["default"].wrap(function _callee16$(_context16) {
                            while (1) {
                              switch (_context16.prev = _context16.next) {
                                case 0:
                                  _context16.next = 2;
                                  return (0, _withdraw.discordWithdraw)(discordClient, interaction, filteredMessage, setting, io);

                                case 2:
                                  task = _context16.sent;

                                case 3:
                                case "end":
                                  return _context16.stop();
                              }
                            }
                          }, _callee16);
                        })));

                      case 122:
                        _context17.next = 124;
                        return interaction.editReply("\u200B")["catch"](function (e) {
                          console.log(e);
                        });

                      case 124:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17);
              }));

              return function (_x10) {
                return _ref10.apply(this, arguments);
              };
            }());
            discordClient.on("messageCreate", /*#__PURE__*/function () {
              var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(message) {
                var groupTask, groupTaskId, channelTask, channelTaskId, lastSeenDiscordTask, disallow, walletExists, maintenance, messageReplaceBreaksWithSpaces, preFilteredMessageDiscord, filteredMessageDiscord, limited, _limited7, _limited8, _limited9, _limited10, _limited11, _limited12, _limited13, setting, _yield$preWithdraw3, _yield$preWithdraw4, success, filteredMessage;

                return _regenerator["default"].wrap(function _callee27$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        if (message.author.bot) {
                          _context27.next = 8;
                          break;
                        }

                        _context27.next = 3;
                        return (0, _user.createUpdateDiscordUser)(discordClient, message.author, queue);

                      case 3:
                        walletExists = _context27.sent;
                        _context27.next = 6;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
                          return _regenerator["default"].wrap(function _callee18$(_context18) {
                            while (1) {
                              switch (_context18.prev = _context18.next) {
                                case 0:
                                  _context18.next = 2;
                                  return (0, _group.updateDiscordGroup)(discordClient, message);

                                case 2:
                                  groupTask = _context18.sent;
                                  _context18.next = 5;
                                  return (0, _channel.updateDiscordChannel)(message, groupTask);

                                case 5:
                                  channelTask = _context18.sent;
                                  console.log('before last seen');
                                  _context18.next = 9;
                                  return (0, _user.updateDiscordLastSeen)(message, message.author);

                                case 9:
                                  lastSeenDiscordTask = _context18.sent;

                                case 10:
                                case "end":
                                  return _context18.stop();
                              }
                            }
                          }, _callee18);
                        })));

                      case 6:
                        groupTaskId = groupTask && groupTask.id;
                        channelTaskId = channelTask && channelTask.id;

                      case 8:
                        console.log('after last seen');

                        if (!(!message.content.startsWith(_settings["default"].bot.command) || message.author.bot)) {
                          _context27.next = 11;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 11:
                        _context27.next = 13;
                        return (0, _isMaintenanceOrDisabled.isMaintenanceOrDisabled)(message, 'discord');

                      case 13:
                        maintenance = _context27.sent;

                        if (!(maintenance.maintenance || !maintenance.enabled)) {
                          _context27.next = 16;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 16:
                        if (!(groupTask && groupTask.banned)) {
                          _context27.next = 20;
                          break;
                        }

                        _context27.next = 19;
                        return message.channel.send({
                          embeds: [(0, _messages.discordServerBannedMessage)(groupTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 19:
                        return _context27.abrupt("return");

                      case 20:
                        if (!(channelTask && channelTask.banned)) {
                          _context27.next = 24;
                          break;
                        }

                        _context27.next = 23;
                        return message.channel.send({
                          embeds: [(0, _messages.discordChannelBannedMessage)(channelTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 23:
                        return _context27.abrupt("return");

                      case 24:
                        if (!(lastSeenDiscordTask && lastSeenDiscordTask.banned)) {
                          _context27.next = 28;
                          break;
                        }

                        _context27.next = 27;
                        return message.channel.send({
                          embeds: [(0, _messages.discordUserBannedMessage)(lastSeenDiscordTask)]
                        })["catch"](function (e) {
                          console.log(e);
                        });

                      case 27:
                        return _context27.abrupt("return");

                      case 28:
                        messageReplaceBreaksWithSpaces = message.content.replace(/\n/g, " ");
                        preFilteredMessageDiscord = messageReplaceBreaksWithSpaces.split(' ');
                        filteredMessageDiscord = preFilteredMessageDiscord.filter(function (el) {
                          return el !== '';
                        });

                        if (!(filteredMessageDiscord[1] === undefined)) {
                          _context27.next = 39;
                          break;
                        }

                        _context27.next = 34;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 34:
                        limited = _context27.sent;

                        if (!limited) {
                          _context27.next = 37;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 37:
                        _context27.next = 39;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
                          var task;
                          return _regenerator["default"].wrap(function _callee19$(_context19) {
                            while (1) {
                              switch (_context19.prev = _context19.next) {
                                case 0:
                                  _context19.next = 2;
                                  return (0, _help.discordHelp)(discordClient, message, io);

                                case 2:
                                  task = _context19.sent;

                                case 3:
                                case "end":
                                  return _context19.stop();
                              }
                            }
                          }, _callee19);
                        })));

                      case 39:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'help')) {
                          _context27.next = 48;
                          break;
                        }

                        console.log('used help');
                        _context27.next = 43;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Help');

                      case 43:
                        _limited7 = _context27.sent;

                        if (!_limited7) {
                          _context27.next = 46;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 46:
                        _context27.next = 48;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
                          var task;
                          return _regenerator["default"].wrap(function _callee20$(_context20) {
                            while (1) {
                              switch (_context20.prev = _context20.next) {
                                case 0:
                                  _context20.next = 2;
                                  return (0, _help.discordHelp)(discordClient, message, io);

                                case 2:
                                  task = _context20.sent;

                                case 3:
                                case "end":
                                  return _context20.stop();
                              }
                            }
                          }, _callee20);
                        })));

                      case 48:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'myrank')) {
                          _context27.next = 56;
                          break;
                        }

                        _context27.next = 51;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Myrank');

                      case 51:
                        _limited8 = _context27.sent;

                        if (!_limited8) {
                          _context27.next = 54;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 54:
                        _context27.next = 56;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
                          var task;
                          return _regenerator["default"].wrap(function _callee21$(_context21) {
                            while (1) {
                              switch (_context21.prev = _context21.next) {
                                case 0:
                                  _context21.next = 2;
                                  return (0, _myrank.discordMyRank)(discordClient, message, io);

                                case 2:
                                  task = _context21.sent;

                                case 3:
                                case "end":
                                  return _context21.stop();
                              }
                            }
                          }, _callee21);
                        })));

                      case 56:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'ranks')) {
                          _context27.next = 64;
                          break;
                        }

                        _context27.next = 59;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Ranks');

                      case 59:
                        _limited9 = _context27.sent;

                        if (!_limited9) {
                          _context27.next = 62;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 62:
                        _context27.next = 64;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
                          var task;
                          return _regenerator["default"].wrap(function _callee22$(_context22) {
                            while (1) {
                              switch (_context22.prev = _context22.next) {
                                case 0:
                                  _context22.next = 2;
                                  return (0, _ranks.discordRanks)(discordClient, message, io);

                                case 2:
                                  task = _context22.sent;

                                case 3:
                                case "end":
                                  return _context22.stop();
                              }
                            }
                          }, _callee22);
                        })));

                      case 64:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'deposit')) {
                          _context27.next = 72;
                          break;
                        }

                        _context27.next = 67;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Deposit');

                      case 67:
                        _limited10 = _context27.sent;

                        if (!_limited10) {
                          _context27.next = 70;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 70:
                        _context27.next = 72;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
                          var task;
                          return _regenerator["default"].wrap(function _callee23$(_context23) {
                            while (1) {
                              switch (_context23.prev = _context23.next) {
                                case 0:
                                  _context23.next = 2;
                                  return (0, _deposit.discordDeposit)(discordClient, message, io);

                                case 2:
                                  task = _context23.sent;

                                case 3:
                                case "end":
                                  return _context23.stop();
                              }
                            }
                          }, _callee23);
                        })));

                      case 72:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'price')) {
                          _context27.next = 80;
                          break;
                        }

                        _context27.next = 75;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Price');

                      case 75:
                        _limited11 = _context27.sent;

                        if (!_limited11) {
                          _context27.next = 78;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 78:
                        _context27.next = 80;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
                          var task;
                          return _regenerator["default"].wrap(function _callee24$(_context24) {
                            while (1) {
                              switch (_context24.prev = _context24.next) {
                                case 0:
                                  _context24.next = 2;
                                  return (0, _price.discordPrice)(discordClient, message, io);

                                case 2:
                                  task = _context24.sent;

                                case 3:
                                case "end":
                                  return _context24.stop();
                              }
                            }
                          }, _callee24);
                        })));

                      case 80:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'balance')) {
                          _context27.next = 88;
                          break;
                        }

                        _context27.next = 83;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Balance');

                      case 83:
                        _limited12 = _context27.sent;

                        if (!_limited12) {
                          _context27.next = 86;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 86:
                        _context27.next = 88;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
                          var task;
                          return _regenerator["default"].wrap(function _callee25$(_context25) {
                            while (1) {
                              switch (_context25.prev = _context25.next) {
                                case 0:
                                  _context25.next = 2;
                                  return (0, _balance.discordBalance)(discordClient, message, io);

                                case 2:
                                  task = _context25.sent;

                                case 3:
                                case "end":
                                  return _context25.stop();
                              }
                            }
                          }, _callee25);
                        })));

                      case 88:
                        if (!(filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'withdraw')) {
                          _context27.next = 106;
                          break;
                        }

                        _context27.next = 91;
                        return (0, _rateLimit.myRateLimiter)(discordClient, message, 'Withdraw');

                      case 91:
                        _limited13 = _context27.sent;

                        if (!_limited13) {
                          _context27.next = 94;
                          break;
                        }

                        return _context27.abrupt("return");

                      case 94:
                        _context27.next = 96;
                        return (0, _featureSetting.discordFeatureSettings)(message, 'withdraw', groupTaskId, channelTaskId);

                      case 96:
                        setting = _context27.sent;
                        _context27.next = 99;
                        return (0, _preWithdraw.preWithdraw)(discordClient, message);

                      case 99:
                        _yield$preWithdraw3 = _context27.sent;
                        _yield$preWithdraw4 = (0, _slicedToArray2["default"])(_yield$preWithdraw3, 2);
                        success = _yield$preWithdraw4[0];
                        filteredMessage = _yield$preWithdraw4[1];

                        if (!success) {
                          _context27.next = 106;
                          break;
                        }

                        _context27.next = 106;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
                          var task;
                          return _regenerator["default"].wrap(function _callee26$(_context26) {
                            while (1) {
                              switch (_context26.prev = _context26.next) {
                                case 0:
                                  _context26.next = 2;
                                  return (0, _withdraw.discordWithdraw)(discordClient, message, filteredMessage, setting, io);

                                case 2:
                                  task = _context26.sent;

                                case 3:
                                case "end":
                                  return _context26.stop();
                              }
                            }
                          }, _callee26);
                        })));

                      case 106:
                      case "end":
                        return _context27.stop();
                    }
                  }
                }, _callee27);
              }));

              return function (_x11) {
                return _ref19.apply(this, arguments);
              };
            }());

          case 8:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  }));

  return function discordRouter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordRouter = discordRouter;