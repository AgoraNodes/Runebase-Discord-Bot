"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLoot = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _generateRandomMagicItem = require("./generateRandomMagicItem");

var _generateRandomNormalItem = require("./generateRandomNormalItem");

var _generateRandomLowQualityItem = require("./generateRandomLowQualityItem");

var _generateRandomSuperiorItem = require("./generateRandomSuperiorItem");

var lootQualityTable = [{
  id: 'Low Quality',
  chance: 0.02 // 2%

}, {
  id: 'Superior',
  chance: 0.02 // 2%

}, {
  id: 'Normal',
  chance: 0.4 // 40%

}, {
  id: 'Magic',
  chance: 0.15 // 15%

}];

var generateLoot = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var level,
        roll,
        pickedQuality,
        item,
        i,
        len,
        loot,
        chance,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            level = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
            roll = Math.random();
            console.log(roll);
            pickedQuality = null;
            item = false;
            i = 0, len = lootQualityTable.length;

          case 6:
            if (!(i < len)) {
              _context.next = 16;
              break;
            }

            loot = lootQualityTable[i];
            chance = loot.chance;

            if (!(roll < chance)) {
              _context.next = 12;
              break;
            }

            pickedQuality = loot;
            return _context.abrupt("break", 16);

          case 12:
            roll -= chance;

          case 13:
            ++i;
            _context.next = 6;
            break;

          case 16:
            if (!pickedQuality) {
              _context.next = 33;
              break;
            }

            if (!(pickedQuality.id === 'Low Quality')) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return (0, _generateRandomLowQualityItem.generateRandomLowQualityItem)(level);

          case 20:
            item = _context.sent;

          case 21:
            if (!(pickedQuality.id === 'Normal')) {
              _context.next = 25;
              break;
            }

            _context.next = 24;
            return (0, _generateRandomNormalItem.generateRandomNormalItem)(level);

          case 24:
            item = _context.sent;

          case 25:
            if (!(pickedQuality.id === 'Superior')) {
              _context.next = 29;
              break;
            }

            _context.next = 28;
            return (0, _generateRandomSuperiorItem.generateRandomSuperiorItem)(level);

          case 28:
            item = _context.sent;

          case 29:
            if (!(pickedQuality.id === 'Magic')) {
              _context.next = 33;
              break;
            }

            _context.next = 32;
            return (0, _generateRandomMagicItem.generateRandomMagicItem)(level);

          case 32:
            item = _context.sent;

          case 33:
            return _context.abrupt("return", item);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateLoot() {
    return _ref.apply(this, arguments);
  };
}();

exports.generateLoot = generateLoot;