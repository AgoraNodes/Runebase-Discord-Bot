"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gainMultiExp = exports.gainExp = void 0;

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

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var gainMultiExp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, users, filteredMessage, amount, t) {
    var userDiscordIdArray, usersLeveledUp, setting, discordChannel, guild, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, user, findUser, updatedUser, currentRank, allRanks, member, _iterator3, _step3, rank, userRankRecord, newStringListUsers, cutStringListUsers, _iterator4, _step4, element, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, userUp;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userDiscordIdArray = [];
            usersLeveledUp = [];
            _context.next = 4;
            return _models["default"].setting.findOne();

          case 4:
            setting = _context.sent;
            _context.next = 7;
            return discordClient.channels.cache.get(setting.expRewardChannelId);

          case 7:
            discordChannel = _context.sent;
            _context.next = 10;
            return discordClient.guilds.cache.get(setting.discordHomeServerGuildId);

          case 10:
            guild = _context.sent;
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 13;
            _iterator = _asyncIterator(users);

          case 15:
            _context.next = 17;
            return _iterator.next();

          case 17:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 73;
              break;
            }

            user = _step.value;
            _context.next = 21;
            return _models["default"].user.findOne({
              where: {
                user_id: user.user_id
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 21:
            findUser = _context.sent;
            _context.next = 24;
            return findUser.update({
              exp: findUser.exp + amount
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 24:
            updatedUser = _context.sent;
            _context.next = 27;
            return _models["default"].rank.findOne({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, updatedUser.exp)
              },
              order: [['id', 'DESC']],
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 27:
            currentRank = _context.sent;
            _context.next = 30;
            return _models["default"].rank.findAll({
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 30:
            allRanks = _context.sent;

            if (!currentRank) {
              _context.next = 69;
              break;
            }

            _context.next = 34;
            return guild.members.cache.get(updatedUser.user_id);

          case 34:
            member = _context.sent;

            if (member.roles.cache.has(currentRank.discordRankRoleId)) {
              _context.next = 39;
              break;
            }

            _context.next = 38;
            return member.roles.add(currentRank.discordRankRoleId);

          case 38:
            usersLeveledUp.push({
              user_id: updatedUser.user_id,
              rank: currentRank
            });

          case 39:
            // eslint-disable-next-line no-restricted-syntax
            _iterator3 = _createForOfIteratorHelper(allRanks);
            _context.prev = 40;

            _iterator3.s();

          case 42:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 50;
              break;
            }

            rank = _step3.value;

            if (!(currentRank.id !== rank.id)) {
              _context.next = 48;
              break;
            }

            if (!member.roles.cache.has(rank.discordRankRoleId)) {
              _context.next = 48;
              break;
            }

            _context.next = 48;
            return member.roles.remove(rank.discordRankRoleId);

          case 48:
            _context.next = 42;
            break;

          case 50:
            _context.next = 55;
            break;

          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](40);

            _iterator3.e(_context.t0);

          case 55:
            _context.prev = 55;

            _iterator3.f();

            return _context.finish(55);

          case 58:
            _context.next = 60;
            return _models["default"].UserRank.findOne({
              where: {
                userId: updatedUser.id
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 60:
            userRankRecord = _context.sent;

            if (userRankRecord) {
              _context.next = 66;
              break;
            }

            _context.next = 64;
            return _models["default"].UserRank.create({
              userId: updatedUser.id,
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 64:
            _context.next = 69;
            break;

          case 66:
            if (!(currentRank.id !== userRankRecord.rankId)) {
              _context.next = 69;
              break;
            }

            _context.next = 69;
            return userRankRecord.update({
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 69:
            userDiscordIdArray.push("<@".concat(updatedUser.user_id, ">"));

          case 70:
            _iteratorAbruptCompletion = false;
            _context.next = 15;
            break;

          case 73:
            _context.next = 79;
            break;

          case 75:
            _context.prev = 75;
            _context.t1 = _context["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 79:
            _context.prev = 79;
            _context.prev = 80;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 84;
              break;
            }

            _context.next = 84;
            return _iterator["return"]();

          case 84:
            _context.prev = 84;

            if (!_didIteratorError) {
              _context.next = 87;
              break;
            }

            throw _iteratorError;

          case 87:
            return _context.finish(84);

          case 88:
            return _context.finish(79);

          case 89:
            if (!(userDiscordIdArray.length > 0)) {
              _context.next = 111;
              break;
            }

            newStringListUsers = userDiscordIdArray.join(", ");
            cutStringListUsers = newStringListUsers.match(/.{1,1999}(\s|$)/g);
            _iterator4 = _createForOfIteratorHelper(cutStringListUsers);
            _context.prev = 93;

            _iterator4.s();

          case 95:
            if ((_step4 = _iterator4.n()).done) {
              _context.next = 101;
              break;
            }

            element = _step4.value;
            _context.next = 99;
            return discordChannel.send({
              content: element
            });

          case 99:
            _context.next = 95;
            break;

          case 101:
            _context.next = 106;
            break;

          case 103:
            _context.prev = 103;
            _context.t2 = _context["catch"](93);

            _iterator4.e(_context.t2);

          case 106:
            _context.prev = 106;

            _iterator4.f();

            return _context.finish(106);

          case 109:
            _context.next = 111;
            return discordChannel.send({
              embeds: [(0, _messages.grantRoleExpMessage)(userDiscordIdArray.length, filteredMessage[3], amount)]
            });

          case 111:
            if (!(usersLeveledUp.length > 0)) {
              _context.next = 141;
              break;
            }

            _iteratorAbruptCompletion2 = false;
            _didIteratorError2 = false;
            _context.prev = 114;
            _iterator2 = _asyncIterator(usersLeveledUp);

          case 116:
            _context.next = 118;
            return _iterator2.next();

          case 118:
            if (!(_iteratorAbruptCompletion2 = !(_step2 = _context.sent).done)) {
              _context.next = 125;
              break;
            }

            userUp = _step2.value;
            _context.next = 122;
            return discordChannel.send({
              embeds: [(0, _messages.levelUpMessage)(userUp.user_id, userUp.rank)]
            });

          case 122:
            _iteratorAbruptCompletion2 = false;
            _context.next = 116;
            break;

          case 125:
            _context.next = 131;
            break;

          case 127:
            _context.prev = 127;
            _context.t3 = _context["catch"](114);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t3;

          case 131:
            _context.prev = 131;
            _context.prev = 132;

            if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
              _context.next = 136;
              break;
            }

            _context.next = 136;
            return _iterator2["return"]();

          case 136:
            _context.prev = 136;

            if (!_didIteratorError2) {
              _context.next = 139;
              break;
            }

            throw _iteratorError2;

          case 139:
            return _context.finish(136);

          case 140:
            return _context.finish(131);

          case 141:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 75, 79, 89], [40, 52, 55, 58], [80,, 84, 88], [93, 103, 106, 109], [114, 127, 131, 141], [132,, 136, 140]]);
  }));

  return function gainMultiExp(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.gainMultiExp = gainMultiExp;

var gainExp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(discordClient, userId, amount, gainExpType, t) {
    var userJoined,
        user,
        updatedUser,
        setting,
        discordChannel,
        currentRank,
        allRanks,
        guild,
        member,
        _iterator5,
        _step5,
        rank,
        userRankRecord,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userJoined = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : false;
            _context2.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: userId
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 3:
            user = _context2.sent;
            _context2.next = 6;
            return user.update({
              exp: user.exp + amount
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 6:
            updatedUser = _context2.sent;
            _context2.next = 9;
            return _models["default"].setting.findOne();

          case 9:
            setting = _context2.sent;
            _context2.next = 12;
            return discordClient.channels.cache.get(setting.expRewardChannelId);

          case 12:
            discordChannel = _context2.sent;
            _context2.next = 15;
            return (0, _expierenceMessageHandler.handleExperienceMessage)(discordChannel, updatedUser, amount, gainExpType, userJoined);

          case 15:
            _context2.next = 17;
            return _models["default"].rank.findOne({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, updatedUser.exp)
              },
              order: [['id', 'DESC']],
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 17:
            currentRank = _context2.sent;
            _context2.next = 20;
            return _models["default"].rank.findAll({
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 20:
            allRanks = _context2.sent;

            if (!currentRank) {
              _context2.next = 63;
              break;
            }

            _context2.next = 24;
            return discordClient.guilds.cache.get(setting.discordHomeServerGuildId);

          case 24:
            guild = _context2.sent;
            _context2.next = 27;
            return guild.members.cache.get(updatedUser.user_id);

          case 27:
            member = _context2.sent;

            if (member.roles.cache.has(currentRank.discordRankRoleId)) {
              _context2.next = 33;
              break;
            }

            _context2.next = 31;
            return member.roles.add(currentRank.discordRankRoleId);

          case 31:
            _context2.next = 33;
            return discordChannel.send({
              embeds: [(0, _messages.levelUpMessage)(updatedUser.user_id, currentRank)]
            });

          case 33:
            // eslint-disable-next-line no-restricted-syntax
            _iterator5 = _createForOfIteratorHelper(allRanks);
            _context2.prev = 34;

            _iterator5.s();

          case 36:
            if ((_step5 = _iterator5.n()).done) {
              _context2.next = 44;
              break;
            }

            rank = _step5.value;

            if (!(currentRank.id !== rank.id)) {
              _context2.next = 42;
              break;
            }

            if (!member.roles.cache.has(rank.discordRankRoleId)) {
              _context2.next = 42;
              break;
            }

            _context2.next = 42;
            return member.roles.remove(rank.discordRankRoleId);

          case 42:
            _context2.next = 36;
            break;

          case 44:
            _context2.next = 49;
            break;

          case 46:
            _context2.prev = 46;
            _context2.t0 = _context2["catch"](34);

            _iterator5.e(_context2.t0);

          case 49:
            _context2.prev = 49;

            _iterator5.f();

            return _context2.finish(49);

          case 52:
            _context2.next = 54;
            return _models["default"].UserRank.findOne({
              where: {
                userId: updatedUser.id
              },
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 54:
            userRankRecord = _context2.sent;

            if (userRankRecord) {
              _context2.next = 60;
              break;
            }

            _context2.next = 58;
            return _models["default"].UserRank.create({
              userId: updatedUser.id,
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 58:
            _context2.next = 63;
            break;

          case 60:
            if (!(currentRank.id !== userRankRecord.rankId)) {
              _context2.next = 63;
              break;
            }

            _context2.next = 63;
            return userRankRecord.update({
              rankId: currentRank.id
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE
            });

          case 63:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[34, 46, 49, 52]]);
  }));

  return function gainExp(_x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

exports.gainExp = gainExp;