"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipOffHand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var equipOffHand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipMainHand, unequipTwoHander, unequipShieldItem;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            unequipMainHand = false;

            if (!equipment.mainHandId) {
              _context.next = 10;
              break;
            }

            if (!equipment.mainHand.itemBase.itemFamily.twoHanded) {
              _context.next = 10;
              break;
            }

            _context.next = 5;
            return _models["default"].item.findOne({
              where: {
                id: equipment.mainHandId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 5:
            unequipTwoHander = _context.sent;

            if (!unequipTwoHander) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return unequipTwoHander.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 9:
            unequipMainHand = true;

          case 10:
            if (!equipment.offHandId) {
              _context.next = 17;
              break;
            }

            _context.next = 13;
            return _models["default"].item.findOne({
              where: {
                id: equipment.offHandId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 13:
            unequipShieldItem = _context.sent;

            if (!unequipShieldItem) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return unequipShieldItem.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 17:
            _context.next = 19;
            return equipment.update(_objectSpread({
              offHandId: itemToEquip.id
            }, unequipMainHand && {
              mainHandId: null
            }), {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 19:
            _context.next = 21;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function equipOffHand(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipOffHand = equipOffHand;