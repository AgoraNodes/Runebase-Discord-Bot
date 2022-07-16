"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _messages = require("../../messages");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var onUserJoinRealm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, member) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('onUserJoinRealm 1');
            _context3.next = 3;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                var myUser, findRealmRecord, findUserGroup, currentRank, allRanks, discordChannel, guild, _member, _iterator, _step, rank, userGroupRankRecord;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        console.log(member);
                        _context.next = 3;
                        return _models["default"].user.findOne({
                          where: {
                            user_id: member.user.id
                          },
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 3:
                        myUser = _context.sent;
                        console.log('onUserJoinRealm 2');
                        _context.next = 7;
                        return _models["default"].group.findOne({
                          where: {
                            groupId: member.guild.id
                          },
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 7:
                        findRealmRecord = _context.sent;

                        if (!(findRealmRecord && myUser)) {
                          _context.next = 79;
                          break;
                        }

                        _context.next = 11;
                        return _models["default"].UserGroup.findOne({
                          where: {
                            groupId: findRealmRecord.id,
                            userId: myUser.id
                          },
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 11:
                        findUserGroup = _context.sent;

                        if (findUserGroup) {
                          _context.next = 16;
                          break;
                        }

                        _context.next = 15;
                        return _models["default"].UserGroup.create({
                          groupId: findRealmRecord.id,
                          userId: myUser.id
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 15:
                        findUserGroup = _context.sent;

                      case 16:
                        console.log('onUserJoinRealm 4');
                        _context.next = 19;
                        return _models["default"].rank.findOne({
                          where: {
                            expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, findUserGroup.exp),
                            groupId: findRealmRecord.id
                          },
                          order: [['id', 'DESC']],
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 19:
                        currentRank = _context.sent;
                        _context.next = 22;
                        return _models["default"].rank.findAll({
                          where: {
                            groupId: findRealmRecord.id
                          },
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 22:
                        allRanks = _context.sent;
                        console.log('onUserJoinRealm 6');

                        if (!currentRank) {
                          _context.next = 79;
                          break;
                        }

                        console.log('onUserJoinRealm 7');
                        console.log(currentRank);
                        console.log(myUser);
                        console.log(findRealmRecord);
                        _context.next = 31;
                        return discordClient.channels.cache.get(findRealmRecord.expRewardChannelId);

                      case 31:
                        discordChannel = _context.sent;
                        _context.next = 34;
                        return discordClient.guilds.cache.get(findRealmRecord.groupId);

                      case 34:
                        guild = _context.sent;
                        _context.next = 37;
                        return guild.members.cache.get(myUser.user_id);

                      case 37:
                        _member = _context.sent;
                        console.log(_member);
                        console.log('888');
                        console.log(currentRank.discordRankRoleId);

                        if (_member.roles.cache.has(currentRank.discordRankRoleId)) {
                          _context.next = 48;
                          break;
                        }

                        console.log('huh');
                        _context.next = 45;
                        return _member.roles.add(currentRank.discordRankRoleId);

                      case 45:
                        console.log('hah');
                        _context.next = 48;
                        return discordChannel.send({
                          embeds: [(0, _messages.levelUpMessage)(myUser.user_id, currentRank)]
                        });

                      case 48:
                        console.log('onUserJoinRealm 10'); // eslint-disable-next-line no-restricted-syntax

                        _iterator = _createForOfIteratorHelper(allRanks);
                        _context.prev = 50;

                        _iterator.s();

                      case 52:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 60;
                          break;
                        }

                        rank = _step.value;

                        if (!(currentRank.id !== rank.id)) {
                          _context.next = 58;
                          break;
                        }

                        if (!_member.roles.cache.has(rank.discordRankRoleId)) {
                          _context.next = 58;
                          break;
                        }

                        _context.next = 58;
                        return _member.roles.remove(rank.discordRankRoleId);

                      case 58:
                        _context.next = 52;
                        break;

                      case 60:
                        _context.next = 65;
                        break;

                      case 62:
                        _context.prev = 62;
                        _context.t0 = _context["catch"](50);

                        _iterator.e(_context.t0);

                      case 65:
                        _context.prev = 65;

                        _iterator.f();

                        return _context.finish(65);

                      case 68:
                        _context.next = 70;
                        return _models["default"].UserGroupRank.findOne({
                          where: {
                            UserGroupId: findUserGroup.id
                          },
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 70:
                        userGroupRankRecord = _context.sent;

                        if (userGroupRankRecord) {
                          _context.next = 76;
                          break;
                        }

                        _context.next = 74;
                        return _models["default"].UserGroupRank.create({
                          UserGroupId: findUserGroup.id,
                          rankId: currentRank.id
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 74:
                        _context.next = 79;
                        break;

                      case 76:
                        if (!(currentRank.id !== userGroupRankRecord.rankId)) {
                          _context.next = 79;
                          break;
                        }

                        _context.next = 79;
                        return userGroupRankRecord.update({
                          rankId: currentRank.id
                        }, {
                          transaction: t,
                          lock: t.LOCK.UPDATE
                        });

                      case 79:
                        console.log('done onUserJoinRealm');

                      case 80:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[50, 62, 65, 68]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
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

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function onUserJoinRealm(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = onUserJoinRealm;
exports["default"] = _default;