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

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

/* eslint-disable import/prefer-default-export */
var discordChangeRealm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(discordClient, message, io) {
    var activity, userId, discordChannel, user, realms, realmMap, alreadyInRealmEmbed, realmNotFoundEmbed, embedMessage, collector;
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
              // if (true) {
              var mapped = {
                placeholder: 'pick a skill',
                label: "".concat(realm.groupName),
                value: "realm:".concat(realm.id),
                "default": realm.id === user.currentRealmId
              };
              filtered.push(mapped); // }

              return filtered;
            }, []);
            console.log(realmMap);
            console.log('123');
            alreadyInRealmEmbed = new _discord.MessageEmbed().setTitle('Change Realm').setDescription("".concat(user.username, ", You are already in this realm currently."));
            realmNotFoundEmbed = new _discord.MessageEmbed().setTitle('Change Realm').setDescription("".concat(user.username, ", We can't find the realm you are trying to join"));
            _context4.next = 26;
            return discordChannel.send({
              content: "<@".concat(user.user_id, ">, please select your realm"),
              files: [],
              components: [// new MessageActionRow({
              //  components: [
              // await generateHealButton(),
              //  ],
              // }),
              new _discord.MessageActionRow({
                components: [new _discord.MessageSelectMenu({
                  type: 'SELECT_MENU',
                  customId: 'select-realm',
                  options: realmMap
                })]
              })]
            });

          case 26:
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
                                      _context.next = 9;
                                      break;
                                    }

                                    console.log('You are already in this realm');
                                    _context.next = 8;
                                    return interaction.editReply({
                                      content: "<@".concat(user.user_id, ">"),
                                      embeds: [alreadyInRealmEmbed],
                                      components: [new _discord.MessageActionRow({
                                        components: [new _discord.MessageSelectMenu({
                                          type: 'SELECT_MENU',
                                          customId: 'select-realm',
                                          options: realmMap
                                        })]
                                      })]
                                    });

                                  case 8:
                                    return _context.abrupt("return");

                                  case 9:
                                    console.log('after Realm ID check');
                                    _context.next = 12;
                                    return _models["default"].group.findOne({
                                      where: {
                                        id: newSelectedId,
                                        activeRealm: true
                                      },
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 12:
                                    realm = _context.sent;
                                    console.log(realm);

                                    if (realm) {
                                      _context.next = 18;
                                      break;
                                    }

                                    _context.next = 17;
                                    return interaction.editReply({
                                      content: "<@".concat(user.user_id, ">"),
                                      embeds: [realmNotFoundEmbed],
                                      components: [new _discord.MessageActionRow({
                                        components: [new _discord.MessageSelectMenu({
                                          type: 'SELECT_MENU',
                                          customId: 'select-realm',
                                          options: realmMap
                                        })]
                                      })]
                                    });

                                  case 17:
                                    return _context.abrupt("return");

                                  case 18:
                                    console.log('before discord check');
                                    server = discordClient.guilds.cache.get(realm.groupId);

                                    if (server.members.cache.get(user.user_id)) {
                                      _context.next = 32;
                                      break;
                                    }

                                    _context.t0 = interaction;
                                    _context.t1 = "<@".concat(user.user_id, ">, ").concat(realm.inviteLink);
                                    _context.next = 25;
                                    return (0, _messages.needToBeInDiscordRealmEmbed)(realm);

                                  case 25:
                                    _context.t2 = _context.sent;
                                    _context.t3 = [_context.t2];
                                    _context.t4 = [new _discord.MessageActionRow({
                                      components: [new _discord.MessageSelectMenu({
                                        type: 'SELECT_MENU',
                                        customId: 'select-realm',
                                        options: realmMap
                                      })]
                                    })];
                                    _context.t5 = {
                                      content: _context.t1,
                                      embeds: _context.t3,
                                      components: _context.t4
                                    };
                                    _context.next = 31;
                                    return _context.t0.editReply.call(_context.t0, _context.t5);

                                  case 31:
                                    return _context.abrupt("return");

                                  case 32:
                                    _context.next = 34;
                                    return _models["default"].UserGroup.findOne({
                                      where: {
                                        userId: user.id,
                                        groupId: newSelectedId
                                      },
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 34:
                                    UserGroup = _context.sent;

                                    if (UserGroup) {
                                      _context.next = 39;
                                      break;
                                    }

                                    _context.next = 38;
                                    return _models["default"].UserGroup.create({
                                      userId: user.id,
                                      groupId: newSelectedId
                                    }, {
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 38:
                                    UserGroup = _context.sent;

                                  case 39:
                                    console.log('joining realm');
                                    _context.next = 42;
                                    return myUser.update({
                                      currentRealmId: newSelectedId,
                                      currentClassId: null
                                    }, {
                                      transaction: t,
                                      lock: t.LOCK.UPDATE
                                    });

                                  case 42:
                                    _context.t6 = interaction;
                                    _context.t7 = "<@".concat(user.user_id, ">");
                                    _context.next = 46;
                                    return (0, _messages.realmChangeSuccessEmbed)(realm);

                                  case 46:
                                    _context.t8 = _context.sent;
                                    _context.t9 = [_context.t8];
                                    _context.t10 = [];
                                    _context.t11 = {
                                      content: _context.t7,
                                      embeds: _context.t9,
                                      components: _context.t10
                                    };
                                    _context.next = 52;
                                    return _context.t6.editReply.call(_context.t6, _context.t11);

                                  case 52:
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

                          return function (_x6) {
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

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function discordChangeRealm(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordChangeRealm = discordChangeRealm;