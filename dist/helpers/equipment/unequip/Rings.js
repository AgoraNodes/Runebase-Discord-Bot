"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unEquipRing = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var unEquipRing = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, itemToUnequip, t) {
    var _unEquipRing;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(userCurrentCharacter.equipment.ringSlotOneId || userCurrentCharacter.equipment.ringSlotTwoId)) {
              _context.next = 16;
              break;
            }

            _context.next = 3;
            return _models["default"].item.findOne({
              where: {
                id: itemToUnequip.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 3:
            _unEquipRing = _context.sent;
            console.log(_unEquipRing);

            if (!_unEquipRing) {
              _context.next = 16;
              break;
            }

            if (!(userCurrentCharacter.equipment.ringSlotOneId === _unEquipRing.id)) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return userCurrentCharacter.equipment.update({
              ringSlotOneId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 9:
            _context.next = 11;
            return _unEquipRing.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 11:
            if (!(userCurrentCharacter.equipment.ringSlotTwoId === _unEquipRing.id)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return userCurrentCharacter.equipment.update({
              ringSlotTwoId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 14:
            _context.next = 16;
            return _unEquipRing.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function unEquipRing(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.unEquipRing = unEquipRing;