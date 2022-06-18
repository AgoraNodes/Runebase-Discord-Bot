"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipBoots = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var equipBoots = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, equipment, itemToEquip, t) {
    var unequipBoots;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(equipment);

            if (!equipment.bootsId) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return _models["default"].item.findOne({
              where: {
                id: equipment.bootsId
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 4:
            unequipBoots = _context.sent;

            if (!unequipBoots) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return unequipBoots.update({
              inventoryId: userCurrentCharacter.inventoryId
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 8:
            _context.next = 10;
            return equipment.update({
              bootsId: itemToEquip.id
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
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function equipBoots(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipBoots = equipBoots;