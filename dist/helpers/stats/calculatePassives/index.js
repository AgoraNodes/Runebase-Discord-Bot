"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _barb = _interopRequireDefault(require("./barb"));

var calculatePassives = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter, defense, regularAttack, kick, FR, PR, LR, CR) {
    var newDefense, newRegularAttack, newKick, newFR, newPR, newLR, newCR, _yield$calculatePassi, _yield$calculatePassi2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newDefense = defense;
            newRegularAttack = regularAttack;
            newKick = kick;
            newFR = FR;
            newPR = PR;
            newLR = LR;
            newCR = CR;

            if (!(currentCharacter["class"].name === 'Barbarian')) {
              _context.next = 19;
              break;
            }

            _context.next = 10;
            return (0, _barb["default"])(currentCharacter, newDefense, newRegularAttack, newKick, newFR, // Fire resistance
            newPR, // Poison Resistance
            newLR, // Lightning Resitance
            newCR // Cold Resistance
            );

          case 10:
            _yield$calculatePassi = _context.sent;
            _yield$calculatePassi2 = (0, _slicedToArray2["default"])(_yield$calculatePassi, 7);
            newDefense = _yield$calculatePassi2[0];
            // Defense
            newRegularAttack = _yield$calculatePassi2[1];
            newKick = _yield$calculatePassi2[2];
            newFR = _yield$calculatePassi2[3];
            // Fire resistance
            newPR = _yield$calculatePassi2[4];
            // Poison Resistance
            newLR = _yield$calculatePassi2[5];
            // Lightning Resitance
            newCR // Cold Resistance
            = _yield$calculatePassi2[6];

          case 19:
            return _context.abrupt("return", [newDefense, // Defense
            newRegularAttack, // Regular Attack
            newKick, // Kick
            newFR, // Fire resistance
            newPR, // Poison Resistance
            newLR, // Lightning Resitance
            newCR // Cold Resistance
            ]);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculatePassives(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = calculatePassives;
exports["default"] = _default;