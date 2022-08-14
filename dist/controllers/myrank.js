"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordMyRank = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _embeds = require("../embeds");

var _myRank = require("../render/myRank/myRank");

/* eslint-disable import/prefer-default-export */
var discordMyRank = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, io) {
    var activity, _yield$userWalletExis, _yield$userWalletExis2, user, userActivity, discordChannel, realms, realmPickId, currentGuildId, currentRealm, setting, defaultRealm, realmMap, embedMessage, collector;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            activity = [];
            _context5.next = 3;
            return (0, _userWalletExist.userWalletExist)(message, 'myrank', false);

          case 3:
            _yield$userWalletExis = _context5.sent;
            _yield$userWalletExis2 = (0, _slicedToArray2["default"])(_yield$userWalletExis, 2);
            user = _yield$userWalletExis2[0];
            userActivity = _yield$userWalletExis2[1];

            if (userActivity) {
              activity.unshift(userActivity);
            }

            if (user) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return");

          case 10:
            _context5.next = 12;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 12:
            discordChannel = _context5.sent;
            _context5.next = 15;
            return _models["default"].group.findAll({
              where: {
                activeRealm: true
              }
            });

          case 15:
            realms = _context5.sent;

            if (!(message.channel.type === _discord.ChannelType.DM && user.currentRealmId)) {
              _context5.next = 20;
              break;
            }

            realmPickId = user.currentRealmId;
            _context5.next = 31;
            break;

          case 20:
            currentGuildId = discordChannel.guild && discordChannel.guild.id;
            currentRealm = realms.find(function (realm) {
              return realm.groupId === currentGuildId;
            });

            if (!currentRealm) {
              _context5.next = 26;
              break;
            }

            realmPickId = currentRealm.id;
            _context5.next = 31;
            break;

          case 26:
            _context5.next = 28;
            return _models["default"].setting.findOne();

          case 28:
            setting = _context5.sent;
            defaultRealm = realms.find(function (realm) {
              return realm.groupId === setting.discordHomeServerGuildId;
            });
            realmPickId = defaultRealm.id;

          case 31:
            realmMap = realms.reduce(function (filtered, realm) {
              var mapped = {
                placeholder: 'pick a skill',
                label: "".concat(realm.groupName),
                value: "realm:".concat(realm.id),
                "default": realm.id === realmPickId
              };
              filtered.push(mapped);
              return filtered;
            }, []);
            _context5.t0 = discordChannel;
            _context5.t1 = "<@".concat(user.user_id, ">, please select the realm you want to see your rank of");
            _context5.t2 = [];
            _context5.t3 = new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-realm',
                options: realmMap
              })]
            });
            _context5.t4 = _discord.ActionRowBuilder;
            _context5.next = 39;
            return (0, _buttons.generateConfirmButton)();

          case 39:
            _context5.t5 = _context5.sent;
            _context5.next = 42;
            return (0, _buttons.generateCancelButton)();

          case 42:
            _context5.t6 = _context5.sent;
            _context5.t7 = [_context5.t5, _context5.t6];
            _context5.t8 = {
              components: _context5.t7
            };
            _context5.t9 = new _context5.t4(_context5.t8);
            _context5.t10 = [_context5.t3, _context5.t9];
            _context5.t11 = {
              content: _context5.t1,
              files: _context5.t2,
              components: _context5.t10
            };
            _context5.next = 50;
            return _context5.t0.send.call(_context5.t0, _context5.t11);

          case 50:
            embedMessage = _context5.sent;
            collector = embedMessage.createMessageComponentCollector({
              time: 86400000
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(interaction) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(interaction.user.id !== user.user_id)) {
                          _context3.next = 4;
                          break;
                        }

                        _context3.next = 3;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 3:
                        return _context3.abrupt("return");

                      case 4:
                        if (!interaction.isSelectMenu()) {
                          _context3.next = 9;
                          break;
                        }

                        if (!(interaction.customId === 'select-realm')) {
                          _context3.next = 9;
                          break;
                        }

                        _context3.next = 8;
                        return interaction.deferUpdate();

                      case 8:
                        if (interaction.values[0].startsWith('realm:')) {
                          realmPickId = Number(interaction.values[0].replace('realm:', ''));
                        }

                      case 9:
                        if (!interaction.isButton()) {
                          _context3.next = 20;
                          break;
                        }

                        _context3.next = 12;
                        return interaction.deferReply();

                      case 12:
                        if (!(interaction.customId === 'confirm')) {
                          _context3.next = 16;
                          break;
                        }

                        _context3.next = 15;
                        return _models["default"].sequelize.transaction({
                          isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                        }, /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                            var totalChatActivity, monthlyChatActivity, findGroupToPost, userWithUserGroup, currentRank, currentRankExp, nextRank, preActivity, finalActivity;
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return _models["default"].activeTalker.findOne({
                                      attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                                      raw: true,
                                      where: {
                                        userId: user.id
                                      }
                                    });

                                  case 2:
                                    totalChatActivity = _context.sent;
                                    _context.next = 5;
                                    return _models["default"].activeTalker.findOne({
                                      attributes: [[_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('count')), 'count']],
                                      raw: true,
                                      where: {
                                        userId: user.id,
                                        createdAt: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                                      }
                                    });

                                  case 5:
                                    monthlyChatActivity = _context.sent;
                                    _context.next = 8;
                                    return _models["default"].group.findOne({
                                      where: {
                                        id: realmPickId
                                      }
                                    });

                                  case 8:
                                    findGroupToPost = _context.sent;
                                    _context.next = 11;
                                    return _models["default"].user.findOne({
                                      include: [{
                                        model: _models["default"].UserGroup,
                                        as: 'UserGroup',
                                        required: true,
                                        where: {
                                          groupId: findGroupToPost.id
                                        }
                                      }],
                                      order: [['exp', 'DESC']],
                                      limit: 10,
                                      lock: t.LOCK.UPDATE,
                                      transaction: t
                                    });

                                  case 11:
                                    userWithUserGroup = _context.sent;
                                    _context.next = 14;
                                    return _models["default"].rank.findOne({
                                      where: {
                                        expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, userWithUserGroup.UserGroup.exp),
                                        groupId: findGroupToPost.id
                                      },
                                      order: [['id', 'DESC']],
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 14:
                                    currentRank = _context.sent;

                                    if (currentRank) {
                                      currentRankExp = currentRank.expNeeded;
                                    } else {
                                      currentRankExp = 0;
                                    }

                                    _context.next = 18;
                                    return _models["default"].rank.findOne({
                                      where: {
                                        expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, user.exp),
                                        groupId: findGroupToPost.id
                                      },
                                      order: [['id', 'ASC']],
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 18:
                                    nextRank = _context.sent;
                                    _context.t0 = interaction;
                                    _context.next = 22;
                                    return (0, _myRank.renderMyRankImage)(message, user, userWithUserGroup, currentRank, monthlyChatActivity, totalChatActivity, currentRankExp, nextRank);

                                  case 22:
                                    _context.t1 = _context.sent;
                                    _context.t2 = {
                                      attachment: _context.t1,
                                      name: 'myRank.png'
                                    };
                                    _context.t3 = [_context.t2];
                                    _context.t4 = {
                                      files: _context.t3
                                    };
                                    _context.next = 28;
                                    return _context.t0.editReply.call(_context.t0, _context.t4);

                                  case 28:
                                    _context.next = 30;
                                    return _models["default"].activity.create({
                                      type: 'myrank_s',
                                      earnerId: user.id
                                    }, {
                                      lock: t.LOCK.UPDATE,
                                      transaction: t
                                    });

                                  case 30:
                                    preActivity = _context.sent;
                                    _context.next = 33;
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

                                  case 33:
                                    finalActivity = _context.sent;
                                    activity.unshift(finalActivity);

                                  case 35:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x5) {
                            return _ref3.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    console.log(err);
                                    _context2.prev = 1;
                                    _context2.next = 4;
                                    return _models["default"].error.create({
                                      type: 'myRank',
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
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, null, [[1, 6]]);
                          }));

                          return function (_x6) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 15:
                        collector.stop();

                      case 16:
                        if (!(interaction.customId === 'cancel')) {
                          _context3.next = 20;
                          break;
                        }

                        _context3.next = 19;
                        return interaction.editReply({
                          embeds: [(0, _embeds.cancelMyRankEmbed)(user.user_id)]
                        });

                      case 19:
                        collector.stop();

                      case 20:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());
            collector.on('end', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(collected) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return embedMessage.edit({
                          content: "\u200B",
                          embeds: [],
                          components: []
                        })["catch"](function (e) {
                          console.log('failed deleting message');
                        });

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }());

            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

          case 55:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordMyRank(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordMyRank = discordMyRank;