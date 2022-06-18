"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipGloves = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var equipGloves = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipGloves;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!equipment.glovesId) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return _models["default"].item.findOne({
              where: {
                id: equipment.glovesId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 3:
            unequipGloves = _context.sent;

            if (!unequipGloves) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return unequipGloves.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 7:
            _context.next = 9;
            return equipment.update({
              glovesId: itemToEquip.id
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 9:
            _context.next = 11;
            return itemToEquip.update({
              inventoryId: null
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function equipGloves(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipGloves = equipGloves;