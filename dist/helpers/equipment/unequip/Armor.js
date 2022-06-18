"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unEquipArmor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var unEquipArmor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, t) {
    var unequipArmor;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!userCurrentCharacter.equipment.armorId) {
              _context.next = 9;
              break;
            }

            _context.next = 3;
            return _models["default"].item.findOne({
              where: {
                id: userCurrentCharacter.equipment.armorId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 3:
            unequipArmor = _context.sent;

            if (!unequipArmor) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return userCurrentCharacter.equipment.update({
              armorId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 7:
            _context.next = 9;
            return unequipArmor.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function unEquipArmor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.unEquipArmor = unEquipArmor;