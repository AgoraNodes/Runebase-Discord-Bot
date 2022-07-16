"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

/* eslint-disable no-restricted-syntax */
module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var transaction, discordHomeServerGuildId, group, users, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, user;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.sequelize.transaction();

            case 2:
              transaction = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return queryInterface.rawSelect('setting', {
                transaction: transaction
              }, ['discordHomeServerGuildId']);

            case 6:
              discordHomeServerGuildId = _context.sent;
              _context.next = 9;
              return queryInterface.rawSelect('group', {
                where: {
                  groupId: discordHomeServerGuildId
                },
                transaction: transaction
              }, ['id']);

            case 9:
              group = _context.sent;

              if (!group) {
                _context.next = 43;
                break;
              }

              _context.next = 13;
              return queryInterface.sequelize.query('SELECT * FROM user', {
                type: queryInterface.sequelize.QueryTypes.SELECT,
                transaction: transaction
              });

            case 13:
              users = _context.sent;
              _iteratorAbruptCompletion = false;
              _didIteratorError = false;
              _context.prev = 16;
              _iterator = _asyncIterator(users);

            case 18:
              _context.next = 20;
              return _iterator.next();

            case 20:
              if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                _context.next = 27;
                break;
              }

              user = _step.value;
              _context.next = 24;
              return queryInterface.bulkInsert('UserGroup', [{
                exp: user.exp,
                userId: user.id,
                groupId: group,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _iteratorAbruptCompletion = false;
              _context.next = 18;
              break;

            case 27:
              _context.next = 33;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](16);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 33:
              _context.prev = 33;
              _context.prev = 34;

              if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                _context.next = 38;
                break;
              }

              _context.next = 38;
              return _iterator["return"]();

            case 38:
              _context.prev = 38;

              if (!_didIteratorError) {
                _context.next = 41;
                break;
              }

              throw _iteratorError;

            case 41:
              return _context.finish(38);

            case 42:
              return _context.finish(33);

            case 43:
              _context.next = 45;
              return transaction.commit();

            case 45:
              _context.next = 52;
              break;

            case 47:
              _context.prev = 47;
              _context.t1 = _context["catch"](3);
              _context.next = 51;
              return transaction.rollback();

            case 51:
              throw _context.t1;

            case 52:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 47], [16, 29, 33, 43], [34,, 38, 42]]);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('we are not providing a way back from this');

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};