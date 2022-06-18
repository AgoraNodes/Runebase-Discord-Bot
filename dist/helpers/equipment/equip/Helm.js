"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipHelm = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var equipHelm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipHelmItem;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!equipment.helmId) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return _models["default"].item.findOne({
              where: {
                id: equipment.helmId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 3:
            unequipHelmItem = _context.sent;

            if (!unequipHelmItem) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return unequipHelmItem.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 7:
            _context.next = 9;
            return equipment.update({
              helmId: itemToEquip.id
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

  return function equipHelm(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipHelm = equipHelm;