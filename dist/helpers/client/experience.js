"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gainExp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _messages = require("../../messages");

var _expierenceMessageHandler = require("./messageHandlers/expierenceMessageHandler");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var gainExp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, userId, amount, gainExpType, t) {
    var userJoined,
        user,
        updatedUser,
        setting,
        discordChannel,
        currentRank,
        allRanks,
        guild,
        member,
        _iterator,
        _step,
        rank,
        userRankRecord,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userJoined = _args.length > 5 && _args[5] !== undefined ? _args[5] : false;
            _context.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: userId
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 3:
            user = _context.sent;
            _context.next = 6;
            return user.update({
              exp: user.exp + amount
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 6:
            updatedUser = _context.sent;
            _context.next = 9;
            return _models["default"].setting.findOne();

          case 9:
            setting = _context.sent;
            _context.next = 12;
            return discordClient.channels.cache.get(setting.expRewardChannelId);

          case 12:
            discordChannel = _context.sent;
            _context.next = 15;
            return (0, _expierenceMessageHandler.handleExperienceMessage)(discordChannel, updatedUser, amount, gainExpType, userJoined);

          case 15:
            _context.next = 17;
            return _models["default"].rank.findOne({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, updatedUser.exp)
              },
              order: [['id', 'DESC']],
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 17:
            currentRank = _context.sent;
            _context.next = 20;
            return _models["default"].rank.findAll({
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 20:
            allRanks = _context.sent;

            if (!currentRank) {
              _context.next = 63;
              break;
            }

            _context.next = 24;
            return discordClient.guilds.cache.get(setting.discordHomeServerGuildId);

          case 24:
            guild = _context.sent;
            _context.next = 27;
            return guild.members.cache.get(updatedUser.user_id);

          case 27:
            member = _context.sent;

            if (member.roles.cache.has(currentRank.discordRankRoleId)) {
              _context.next = 33;
              break;
            }

            _context.next = 31;
            return member.roles.add(currentRank.discordRankRoleId);

          case 31:
            _context.next = 33;
            return discordChannel.send({
              embeds: [(0, _messages.levelUpMessage)(updatedUser.user_id, currentRank)]
            });

          case 33:
            // eslint-disable-next-line no-restricted-syntax
            _iterator = _createForOfIteratorHelper(allRanks);
            _context.prev = 34;

            _iterator.s();

          case 36:
            if ((_step = _iterator.n()).done) {
              _context.next = 44;
              break;
            }

            rank = _step.value;

            if (!(currentRank.id !== rank.id)) {
              _context.next = 42;
              break;
            }

            if (!member.roles.cache.has(rank.discordRankRoleId)) {
              _context.next = 42;
              break;
            }

            _context.next = 42;
            return member.roles.remove(rank.discordRankRoleId);

          case 42:
            _context.next = 36;
            break;

          case 44:
            _context.next = 49;
            break;

          case 46:
            _context.prev = 46;
            _context.t0 = _context["catch"](34);

            _iterator.e(_context.t0);

          case 49:
            _context.prev = 49;

            _iterator.f();

            return _context.finish(49);

          case 52:
            _context.next = 54;
            return _models["default"].UserRank.findOne({
              where: {
                userId: updatedUser.id
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 54:
            userRankRecord = _context.sent;

            if (userRankRecord) {
              _context.next = 60;
              break;
            }

            _context.next = 58;
            return _models["default"].UserRank.create({
              userId: updatedUser.id,
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 58:
            _context.next = 63;
            break;

          case 60:
            if (!(currentRank.id !== userRankRecord.rankId)) {
              _context.next = 63;
              break;
            }

            _context.next = 63;
            return userRankRecord.update({
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[34, 46, 49, 52]]);
  }));

  return function gainExp(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.gainExp = gainExp;