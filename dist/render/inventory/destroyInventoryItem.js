"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDestroyIventoryItemImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _item = require("../item");

var renderDestroyIventoryItemImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start, currentUserCharacter) {
    var current, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current = currentUserCharacter.inventory.items.slice(start, start + 1);
            _context.next = 3;
            return (0, _item.renderItemImage)(current[0]);

          case 3:
            inventoryItemOneBuffer = _context.sent;
            _context.next = 6;
            return (0, _canvas.loadImage)(inventoryItemOneBuffer);

          case 6:
            inventoryItemOne = _context.sent;
            canvas = (0, _canvas.createCanvas)(inventoryItemOne.width, inventoryItemOne.height + 40);
            ctx = canvas.getContext('2d'); // Inventory item one image

            ctx.drawImage(inventoryItemOne, 0, 0, inventoryItemOne.width, inventoryItemOne.height);
            ctx.font = 'bold 15px "HeartWarming"';
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.strokeText("Are you sure you want to destroy", canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
            ctx.fillText("Are you sure you want to destroy", canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
            ctx.font = 'bold 15px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.strokeText("".concat(current[0].name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
            ctx.fillText("".concat(current[0].name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
            _context.next = 26;
            return canvas.toBuffer();

          case 26:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderDestroyIventoryItemImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderDestroyIventoryItemImage = renderDestroyIventoryItemImage;