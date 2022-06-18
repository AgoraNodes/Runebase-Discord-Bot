"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipRing = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var equipRing = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipRingSlotOne;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (equipment.ringSlotOneId) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return equipment.update({
              ringSlotOneId: itemToEquip.id
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 3:
            _context.next = 5;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 5:
            _context.next = 25;
            break;

          case 7:
            if (equipment.ringSlotTwoId) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return equipment.update({
              ringSlotTwoId: itemToEquip.id
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 10:
            _context.next = 12;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 12:
            _context.next = 25;
            break;

          case 14:
            if (!(equipment.ringSlotOneId && equipment.ringSlotTwoId)) {
              _context.next = 25;
              break;
            }

            _context.next = 17;
            return _models["default"].item.findOne({
              where: {
                id: equipment.ringSlotOneId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 17:
            unequipRingSlotOne = _context.sent;

            if (!unequipRingSlotOne) {
              _context.next = 25;
              break;
            }

            _context.next = 21;
            return unequipRingSlotOne.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 21:
            _context.next = 23;
            return equipment.update({
              ringSlotOneId: itemToEquip.id
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 23:
            _context.next = 25;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function equipRing(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipRing = equipRing;