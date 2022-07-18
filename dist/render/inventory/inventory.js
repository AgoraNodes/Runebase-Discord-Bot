"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderInventoryImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _item = require("../item");

var renderInventoryImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUserCharacter, itemDestroyed, itemEquiped, cannotEquip, cannotEquipReason, start) {
    var current, extraDestroyedHeight, extraEquipedHeight, extraCannotEquipedHeight, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current = currentUserCharacter.inventory.items.slice(start, start + 1); // console.log(current);
            // console.log(current[0]);
            // console.log('after current select');

            extraDestroyedHeight = itemDestroyed ? 20 : 0;
            extraEquipedHeight = itemEquiped && !cannotEquip ? 20 : 0;
            extraCannotEquipedHeight = cannotEquip ? 60 : 0;
            _context.next = 6;
            return (0, _item.renderItemImage)(current[0]);

          case 6:
            inventoryItemOneBuffer = _context.sent;
            _context.next = 9;
            return (0, _canvas.loadImage)(inventoryItemOneBuffer);

          case 9:
            inventoryItemOne = _context.sent;
            canvas = (0, _canvas.createCanvas)(inventoryItemOne.width, inventoryItemOne.height + 20 + extraDestroyedHeight + extraCannotEquipedHeight + extraEquipedHeight);
            ctx = canvas.getContext('2d'); // Inventory item one image

            ctx.drawImage(inventoryItemOne, 0, 0, inventoryItemOne.width, inventoryItemOne.height);
            ctx.font = 'bold 10px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.strokeText("Showing items ".concat(start + 1, " out of ").concat(currentUserCharacter.inventory.items.length), canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
            ctx.fillText("Showing items ".concat(start + 1, " out of ").concat(currentUserCharacter.inventory.items.length), canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);

            if (itemDestroyed) {
              ctx.strokeText("destroyed ".concat(itemDestroyed.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
              ctx.fillText("destroyed ".concat(itemDestroyed.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
            }

            if (cannotEquip) {
              ctx.font = 'bold 15px "HeartWarming"';
              ctx.fillStyle = "red";
              ctx.lineWidth = 3;
              ctx.strokeText("Unable to Equip", canvas.width / 2, inventoryItemOne.height + 30, inventoryItemOne.width);
              ctx.fillText("Unable to Equip", canvas.width / 2, inventoryItemOne.height + 30, inventoryItemOne.width);
              ctx.strokeText("".concat(cannotEquipReason), canvas.width / 2, inventoryItemOne.height + 50, inventoryItemOne.width);
              ctx.fillText("".concat(cannotEquipReason), canvas.width / 2, inventoryItemOne.height + 50, inventoryItemOne.width);
            }

            if (itemEquiped && !cannotEquip) {
              ctx.strokeText("equiped ".concat(itemEquiped.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
              ctx.fillText("equiped ".concat(itemEquiped.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
            }

            _context.next = 25;
            return canvas.toBuffer();

          case 25:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderInventoryImage(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderInventoryImage = renderInventoryImage;