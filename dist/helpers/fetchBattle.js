"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var reFetchBattle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(battle, t) {
    var updatedBattle;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].battle.findOne(_objectSpread({
              where: {
                id: battle.id
              },
              order: [[_models["default"].battleLog, 'id', 'DESC'], [_models["default"].BattleMonster, 'id', 'DESC']],
              include: [{
                model: _models["default"].battleLog,
                as: 'battleLogs',
                required: false
              }, {
                model: _models["default"].BattleMonster,
                as: 'BattleMonsters',
                include: [{
                  model: _models["default"].buff,
                  as: 'buffs'
                }, {
                  model: _models["default"].debuff,
                  as: 'debuffs'
                }, {
                  model: _models["default"].monster,
                  as: 'monster',
                  include: [{
                    model: _models["default"].monsterAttack,
                    as: 'monsterAttacks',
                    include: [{
                      model: _models["default"].damageType,
                      as: 'damageType'
                    }]
                  }]
                }]
              }]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 2:
            updatedBattle = _context.sent;
            return _context.abrupt("return", updatedBattle);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function reFetchBattle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = reFetchBattle;
exports["default"] = _default;