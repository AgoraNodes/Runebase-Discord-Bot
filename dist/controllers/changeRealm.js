"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordChangeRealm = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _embeds = require("../embeds");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

/* eslint-disable import/prefer-default-export */
// import { userWalletExist } from "../helpers/client/userWalletExist";
var discordChangeRealm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(discordClient, message, io, isDefered) {
    var activity, userId, discordChannel, user, realms, realmMap, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activity = [];
            _context4.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context4.sent;

            if (userId) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return");

          case 6:
            _context4.next = 8;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 8:
            discordChannel = _context4.sent;

            if (discordChannel) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return");

          case 11:
            _context4.next = 13;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 13:
            user = _context4.sent;

            if (user) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return");

          case 16:
            _context4.next = 18;
            return _models["default"].group.findAll({
              where: {
                activeRealm: true
              }
            });

          case 18:
            realms = _context4.sent;
            realmMap = realms.reduce(function (filtered, realm) {
              var mapped = {
                placeholder: 'pick a skill',
                label: "".concat(realm.groupName),
                value: "realm:".concat(realm.id),
                "default": realm.id === user.currentRealmId
              };
              filtered.push(mapped);
              return filtered;
            }, []);
            _context4.next = 22;
            return discordChannel.send({
              content: "<@".concat(user.user_id, ">, please select your realm"),
              files: [],
              components: [new _discord.ActionRowBuilder({
                components: [new _discord.SelectMenuBuilder({
                  customId: 'select-realm',
                  options: realmMap
                })]
              })]
            });

          case 22:
            embedMessage = _context4.sent;
            collector = embedMessage.createMessageComponentCollector({});
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(interaction) {
                var newSelectedId;
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
                          _context3.next = 13;
                          break;
                        }

                        if (!(interaction.customId === 'select-realm')) {
                          _context3.next = 13;
                          break;
                        }

                        _context3.next = 8;
                        return interaction.deferUpdate();

                      case 8:
                        if (!interaction.values[0].startsWith('realm:')) {
                          _context3.next = 13;
                          break;
                        }

                        newSelectedId = Number(interaction.values[0].replace('realm:', ''));
                        console.log(newSelectedId);
                        _context3.next = 13;
                        return _models["default"].sequelize.transaction({
                          isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                        }, /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                            var myUser, realm, server, UserGroup;
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
                                    myUser = _context.sent;
                                    console.log(myUser);

                                    if (!(myUser.currentRealmId === newSelectedId)) {
                                      _context.next = 17;
                                      break;
                                    }

                                    console.log('You are already in this realm');
                                    _context.t0 = interaction;
                                    _context.t1 = "<@".concat(user.user_id, ">");
                                    _context.next = 10;
                                    return (0, _embeds.alreadyInRealmEmbed)(user);

                                  case 10:
                                    _context.t2 = _context.sent;
                                    _context.t3 = [_context.t2];
                                    _context.t4 = [new _discord.ActionRowBuilder({
                                      components: [new _discord.SelectMenuBuilder({
                                        customId: 'select-realm',
                                        options: realmMap
                                      })]
                                    })];
                                    _context.t5 = {
                                      content: _context.t1,
                                      embeds: _context.t3,
                                      components: _context.t4
                                    };
                                    _context.next = 16;
                                    return _context.t0.editReply.call(_context.t0, _context.t5);

                                  case 16:
                                    return _context.abrupt("return");

                                  case 17:
                                    console.log('after Realm ID check');
                                    _context.next = 20;
                                    return _models["default"].group.findOne({
                                      where: {
                                        id: newSelectedId,
                                        activeRealm: true
                                      },
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 20:
                                    realm = _context.sent;
                                    console.log(realm);

                                    if (realm) {
                                      _context.next = 34;
                                      break;
                                    }

                                    _context.t6 = interaction;
                                    _context.t7 = "<@".concat(user.user_id, ">");
                                    _context.next = 27;
                                    return (0, _embeds.realmNotFoundEmbed)(user);

                                  case 27:
                                    _context.t8 = _context.sent;
                                    _context.t9 = [_context.t8];
                                    _context.t10 = [new _discord.ActionRowBuilder({
                                      components: [new _discord.SelectMenuBuilder({
                                        customId: 'select-realm',
                                        options: realmMap
                                      })]
                                    })];
                                    _context.t11 = {
                                      content: _context.t7,
                                      embeds: _context.t9,
                                      components: _context.t10
                                    };
                                    _context.next = 33;
                                    return _context.t6.editReply.call(_context.t6, _context.t11);

                                  case 33:
                                    return _context.abrupt("return");

                                  case 34:
                                    console.log('before discord check');
                                    server = discordClient.guilds.cache.get(realm.groupId);

                                    if (server.members.cache.get(user.user_id)) {
                                      _context.next = 48;
                                      break;
                                    }

                                    _context.t12 = interaction;
                                    _context.t13 = "<@".concat(user.user_id, ">, ").concat(realm.inviteLink);
                                    _context.next = 41;
                                    return (0, _embeds.needToBeInDiscordRealmEmbed)(realm);

                                  case 41:
                                    _context.t14 = _context.sent;
                                    _context.t15 = [_context.t14];
                                    _context.t16 = [new _discord.ActionRowBuilder({
                                      components: [new _discord.SelectMenuBuilder({
                                        customId: 'select-realm',
                                        options: realmMap
                                      })]
                                    })];
                                    _context.t17 = {
                                      content: _context.t13,
                                      embeds: _context.t15,
                                      components: _context.t16
                                    };
                                    _context.next = 47;
                                    return _context.t12.editReply.call(_context.t12, _context.t17);

                                  case 47:
                                    return _context.abrupt("return");

                                  case 48:
                                    _context.next = 50;
                                    return _models["default"].UserGroup.findOne({
                                      where: {
                                        userId: user.id,
                                        groupId: newSelectedId
                                      },
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 50:
                                    UserGroup = _context.sent;

                                    if (UserGroup) {
                                      _context.next = 55;
                                      break;
                                    }

                                    _context.next = 54;
                                    return _models["default"].UserGroup.create({
                                      userId: user.id,
                                      groupId: newSelectedId
                                    }, {
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 54:
                                    UserGroup = _context.sent;

                                  case 55:
                                    _context.next = 57;
                                    return myUser.update({
                                      currentRealmId: newSelectedId,
                                      currentClassId: null
                                    }, {
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 57:
                                    _context.t18 = interaction;
                                    _context.t19 = "<@".concat(user.user_id, ">");
                                    _context.next = 61;
                                    return (0, _embeds.realmChangeSuccessEmbed)(realm);

                                  case 61:
                                    _context.t20 = _context.sent;
                                    _context.t21 = [_context.t20];
                                    _context.t22 = [];
                                    _context.t23 = {
                                      content: _context.t19,
                                      embeds: _context.t21,
                                      components: _context.t22
                                    };
                                    _context.next = 67;
                                    return _context.t18.editReply.call(_context.t18, _context.t23);

                                  case 67:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x6) {
                            return _ref3.apply(this, arguments);
                          };
                        }())["catch"]( /*#__PURE__*/function () {
                          var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return _models["default"].error.create({
                                      type: 'help',
                                      error: "".concat(err)
                                    });

                                  case 3:
                                    _context2.next = 8;
                                    break;

                                  case 5:
                                    _context2.prev = 5;
                                    _context2.t0 = _context2["catch"](0);

                                    _logger["default"].error("Error Discord: ".concat(_context2.t0));

                                  case 8:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, null, [[0, 5]]);
                          }));

                          return function (_x7) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function discordChangeRealm(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordChangeRealm = discordChangeRealm;