"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOrbs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _hp = require("../../orbs/hp");

var _mp = require("../../orbs/mp");

var _calculateCharacterStats = require("../../../helpers/stats/calculateCharacterStats");

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var loadOrbs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(previousUserState, battleInfoArray, monsterInfo) {
    var hpOrbsBuffer, mpOrbsBuffer, hpOrbs, mpOrbs, _yield$calculateChara, hp, mp, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, index, info, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, _index, _info, _iteratorAbruptCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, _index2, buffer, _iteratorAbruptCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _index3, _buffer;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hpOrbsBuffer = [];
            mpOrbsBuffer = [];
            hpOrbs = [];
            mpOrbs = [];
            _context.next = 6;
            return (0, _calculateCharacterStats.calculateCharacterStats)(previousUserState);

          case 6:
            _yield$calculateChara = _context.sent;
            hp = _yield$calculateChara.hp;
            mp = _yield$calculateChara.mp;
            _context.next = 11;
            return (0, _hp.renderHpOrb)(hp.current, hp.max);

          case 11:
            hpOrbsBuffer[0] = _context.sent;
            _context.next = 14;
            return (0, _mp.renderMpOrb)(mp.current, mp.max);

          case 14:
            mpOrbsBuffer[0] = _context.sent;

            if (!battleInfoArray) {
              _context.next = 46;
              break;
            }

            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 18;
            _iterator = _asyncIterator(battleInfoArray.entries());

          case 20:
            _context.next = 22;
            return _iterator.next();

          case 22:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 30;
              break;
            }

            _step$value = (0, _slicedToArray2["default"])(_step.value, 2), index = _step$value[0], info = _step$value[1];
            _context.next = 26;
            return (0, _hp.renderHpOrb)(info.currentHp, hp.max);

          case 26:
            hpOrbsBuffer[index + 1] = _context.sent;

          case 27:
            _iteratorAbruptCompletion = false;
            _context.next = 20;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](18);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 36:
            _context.prev = 36;
            _context.prev = 37;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return _iterator["return"]();

          case 41:
            _context.prev = 41;

            if (!_didIteratorError) {
              _context.next = 44;
              break;
            }

            throw _iteratorError;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(36);

          case 46:
            if (!monsterInfo) {
              _context.next = 77;
              break;
            }

            _iteratorAbruptCompletion2 = false;
            _didIteratorError2 = false;
            _context.prev = 49;
            _iterator2 = _asyncIterator(monsterInfo.entries());

          case 51:
            _context.next = 53;
            return _iterator2.next();

          case 53:
            if (!(_iteratorAbruptCompletion2 = !(_step2 = _context.sent).done)) {
              _context.next = 61;
              break;
            }

            _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), _index = _step2$value[0], _info = _step2$value[1];
            _context.next = 57;
            return (0, _mp.renderMpOrb)(_info.currentUserMp, mp.max);

          case 57:
            mpOrbsBuffer[_index + 1] = _context.sent;

          case 58:
            _iteratorAbruptCompletion2 = false;
            _context.next = 51;
            break;

          case 61:
            _context.next = 67;
            break;

          case 63:
            _context.prev = 63;
            _context.t1 = _context["catch"](49);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 67:
            _context.prev = 67;
            _context.prev = 68;

            if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
              _context.next = 72;
              break;
            }

            _context.next = 72;
            return _iterator2["return"]();

          case 72:
            _context.prev = 72;

            if (!_didIteratorError2) {
              _context.next = 75;
              break;
            }

            throw _iteratorError2;

          case 75:
            return _context.finish(72);

          case 76:
            return _context.finish(67);

          case 77:
            _iteratorAbruptCompletion3 = false;
            _didIteratorError3 = false;
            _context.prev = 79;
            _iterator3 = _asyncIterator(hpOrbsBuffer.entries());

          case 81:
            _context.next = 83;
            return _iterator3.next();

          case 83:
            if (!(_iteratorAbruptCompletion3 = !(_step3 = _context.sent).done)) {
              _context.next = 91;
              break;
            }

            _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), _index2 = _step3$value[0], buffer = _step3$value[1];
            _context.next = 87;
            return (0, _canvas.loadImage)(buffer);

          case 87:
            hpOrbs[_index2] = _context.sent;

          case 88:
            _iteratorAbruptCompletion3 = false;
            _context.next = 81;
            break;

          case 91:
            _context.next = 97;
            break;

          case 93:
            _context.prev = 93;
            _context.t2 = _context["catch"](79);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t2;

          case 97:
            _context.prev = 97;
            _context.prev = 98;

            if (!(_iteratorAbruptCompletion3 && _iterator3["return"] != null)) {
              _context.next = 102;
              break;
            }

            _context.next = 102;
            return _iterator3["return"]();

          case 102:
            _context.prev = 102;

            if (!_didIteratorError3) {
              _context.next = 105;
              break;
            }

            throw _iteratorError3;

          case 105:
            return _context.finish(102);

          case 106:
            return _context.finish(97);

          case 107:
            _iteratorAbruptCompletion4 = false;
            _didIteratorError4 = false;
            _context.prev = 109;
            _iterator4 = _asyncIterator(mpOrbsBuffer.entries());

          case 111:
            _context.next = 113;
            return _iterator4.next();

          case 113:
            if (!(_iteratorAbruptCompletion4 = !(_step4 = _context.sent).done)) {
              _context.next = 121;
              break;
            }

            _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2), _index3 = _step4$value[0], _buffer = _step4$value[1];
            _context.next = 117;
            return (0, _canvas.loadImage)(_buffer);

          case 117:
            mpOrbs[_index3] = _context.sent;

          case 118:
            _iteratorAbruptCompletion4 = false;
            _context.next = 111;
            break;

          case 121:
            _context.next = 127;
            break;

          case 123:
            _context.prev = 123;
            _context.t3 = _context["catch"](109);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t3;

          case 127:
            _context.prev = 127;
            _context.prev = 128;

            if (!(_iteratorAbruptCompletion4 && _iterator4["return"] != null)) {
              _context.next = 132;
              break;
            }

            _context.next = 132;
            return _iterator4["return"]();

          case 132:
            _context.prev = 132;

            if (!_didIteratorError4) {
              _context.next = 135;
              break;
            }

            throw _iteratorError4;

          case 135:
            return _context.finish(132);

          case 136:
            return _context.finish(127);

          case 137:
            return _context.abrupt("return", [hpOrbs, mpOrbs]);

          case 138:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[18, 32, 36, 46], [37,, 41, 45], [49, 63, 67, 77], [68,, 72, 76], [79, 93, 97, 107], [98,, 102, 106], [109, 123, 127, 137], [128,, 132, 136]]);
  }));

  return function loadOrbs(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadOrbs = loadOrbs;