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
      var transaction, UserGroupClassSkills, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, UserGroupClassSkill;

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
              return queryInterface.sequelize.query('SELECT * FROM UserGroupClassSkill', {
                type: queryInterface.sequelize.QueryTypes.SELECT,
                transaction: transaction
              });

            case 6:
              UserGroupClassSkills = _context.sent;

              if (!UserGroupClassSkills) {
                _context.next = 37;
                break;
              }

              _iteratorAbruptCompletion = false;
              _didIteratorError = false;
              _context.prev = 10;
              _iterator = _asyncIterator(UserGroupClassSkills);

            case 12:
              _context.next = 14;
              return _iterator.next();

            case 14:
              if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
                _context.next = 21;
                break;
              }

              UserGroupClassSkill = _step.value;
              _context.next = 18;
              return queryInterface.bulkUpdate('UserGroupClassSkill', {
                UserGroupClassId: UserGroupClassSkill.UserClassId
              }, {
                id: UserGroupClassSkill.id
              }, {
                transaction: transaction
              });

            case 18:
              _iteratorAbruptCompletion = false;
              _context.next = 12;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](10);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return _iterator["return"]();

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(27);

            case 37:
              _context.next = 39;
              return transaction.commit();

            case 39:
              _context.next = 46;
              break;

            case 41:
              _context.prev = 41;
              _context.t1 = _context["catch"](3);
              _context.next = 45;
              return transaction.rollback();

            case 45:
              throw _context.t1;

            case 46:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 41], [10, 23, 27, 37], [28,, 32, 36]]);
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