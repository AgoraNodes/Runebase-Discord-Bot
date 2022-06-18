"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipMainHand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var equipMainHand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipOffHand, unequipOffhand, unequipMainHandItem;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            unequipOffHand = false;

            if (!equipment.mainHandId) {
              _context.next = 16;
              break;
            }

            if (!equipment.mainHand.itemBase.itemFamily.twoHanded) {
              _context.next = 10;
              break;
            }

            _context.next = 5;
            return _models["default"].item.findOne({
              where: {
                id: equipment.offHandId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 5:
            unequipOffhand = _context.sent;

            if (!unequipOffhand) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return unequipOffhand.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 9:
            unequipOffHand = true;

          case 10:
            _context.next = 12;
            return _models["default"].item.findOne({
              where: {
                id: equipment.mainHandId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 12:
            unequipMainHandItem = _context.sent;

            if (!unequipMainHandItem) {
              _context.next = 16;
              break;
            }

            _context.next = 16;
            return unequipMainHandItem.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 16:
            _context.next = 18;
            return equipment.update(_objectSpread({
              mainHandId: itemToEquip.id
            }, unequipOffHand && {
              offHandId: null
            }), {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 18:
            _context.next = 20;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function equipMainHand(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipMainHand = equipMainHand;