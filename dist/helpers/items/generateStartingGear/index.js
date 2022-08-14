"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateStartGear = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _warrior = require("./warrior");

var _paladin = require("./paladin");

var _wizard = require("./wizard");

var _druid = require("./druid");

var _assassin = require("./assassin");

var _necromancer = require("./necromancer");

var _amazon = require("./amazon");

var generateStartGear = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(className, t) {
    var mainHand, offHand, _yield$generateWarrio, _yield$generateWarrio2, _yield$generatePaladi, _yield$generatePaladi2, _yield$generateNecrom, _yield$generateNecrom2, _yield$generateWizard, _yield$generateWizard2, _yield$generateDruidS, _yield$generateDruidS2, _yield$generateAssass, _yield$generateAssass2, _yield$generateAmazon, _yield$generateAmazon2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(className === 'Warrior')) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return (0, _warrior.generateWarriorStartGear)(t);

          case 3:
            _yield$generateWarrio = _context.sent;
            _yield$generateWarrio2 = (0, _slicedToArray2["default"])(_yield$generateWarrio, 2);
            mainHand = _yield$generateWarrio2[0];
            offHand = _yield$generateWarrio2[1];

          case 7:
            if (!(className === 'Paladin')) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return (0, _paladin.generatePaladinStartGear)(t);

          case 10:
            _yield$generatePaladi = _context.sent;
            _yield$generatePaladi2 = (0, _slicedToArray2["default"])(_yield$generatePaladi, 2);
            mainHand = _yield$generatePaladi2[0];
            offHand = _yield$generatePaladi2[1];

          case 14:
            if (!(className === 'Necromancer')) {
              _context.next = 21;
              break;
            }

            _context.next = 17;
            return (0, _necromancer.generateNecromancerStartGear)(t);

          case 17:
            _yield$generateNecrom = _context.sent;
            _yield$generateNecrom2 = (0, _slicedToArray2["default"])(_yield$generateNecrom, 2);
            mainHand = _yield$generateNecrom2[0];
            offHand = _yield$generateNecrom2[1];

          case 21:
            if (!(className === 'Wizard')) {
              _context.next = 28;
              break;
            }

            _context.next = 24;
            return (0, _wizard.generateWizardStartGear)(t);

          case 24:
            _yield$generateWizard = _context.sent;
            _yield$generateWizard2 = (0, _slicedToArray2["default"])(_yield$generateWizard, 2);
            mainHand = _yield$generateWizard2[0];
            offHand = _yield$generateWizard2[1];

          case 28:
            if (!(className === 'Druid')) {
              _context.next = 35;
              break;
            }

            _context.next = 31;
            return (0, _druid.generateDruidStartGear)(t);

          case 31:
            _yield$generateDruidS = _context.sent;
            _yield$generateDruidS2 = (0, _slicedToArray2["default"])(_yield$generateDruidS, 2);
            mainHand = _yield$generateDruidS2[0];
            offHand = _yield$generateDruidS2[1];

          case 35:
            if (!(className === 'Assassin')) {
              _context.next = 42;
              break;
            }

            _context.next = 38;
            return (0, _assassin.generateAssassinStartGear)(t);

          case 38:
            _yield$generateAssass = _context.sent;
            _yield$generateAssass2 = (0, _slicedToArray2["default"])(_yield$generateAssass, 2);
            mainHand = _yield$generateAssass2[0];
            offHand = _yield$generateAssass2[1];

          case 42:
            if (!(className === 'Amazon')) {
              _context.next = 49;
              break;
            }

            _context.next = 45;
            return (0, _amazon.generateAmazonStartGear)(t);

          case 45:
            _yield$generateAmazon = _context.sent;
            _yield$generateAmazon2 = (0, _slicedToArray2["default"])(_yield$generateAmazon, 2);
            mainHand = _yield$generateAmazon2[0];
            offHand = _yield$generateAmazon2[1];

          case 49:
            return _context.abrupt("return", [mainHand, offHand]);

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateStartGear(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateStartGear = generateStartGear;