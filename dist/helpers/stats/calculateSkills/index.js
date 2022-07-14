"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSkillDamage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _warrior = require("./warrior");

var _amazon = require("./amazon");

var _assasin = require("./assasin");

var _paladin = require("./paladin");

var _druid = require("./druid");

var _necromancer = require("./necromancer");

var _sorceress = require("./sorceress");

var calculateSkillDamage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCharacter, skillToCalculate, attackOne, t) {
    var attack;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(skillToCalculate);
            console.log("userCharacter.class");
            console.log(userCharacter["class"]);

            if (!(userCharacter["class"].name === 'Warrior')) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return (0, _warrior.calculateWarriorSkillDamage)(skillToCalculate, attackOne);

          case 5:
            attack = _context.sent;

          case 6:
            if (!(userCharacter["class"].name === 'Assasin')) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return (0, _assasin.calculateAssaSkillDamage)(skillToCalculate, attackOne);

          case 9:
            attack = _context.sent;

          case 10:
            if (!(userCharacter["class"].name === 'Druid')) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return (0, _druid.calculateDruidSkillDamage)(skillToCalculate, attackOne);

          case 13:
            attack = _context.sent;

          case 14:
            if (!(userCharacter["class"].name === 'Necromancer')) {
              _context.next = 18;
              break;
            }

            _context.next = 17;
            return (0, _necromancer.calculateNecroSkillDamage)(skillToCalculate, attackOne);

          case 17:
            attack = _context.sent;

          case 18:
            if (!(userCharacter["class"].name === 'Sorceress')) {
              _context.next = 22;
              break;
            }

            _context.next = 21;
            return (0, _sorceress.calculateSorcSkillDamage)(skillToCalculate, attackOne);

          case 21:
            attack = _context.sent;

          case 22:
            if (!(userCharacter["class"].name === 'Paladin')) {
              _context.next = 26;
              break;
            }

            _context.next = 25;
            return (0, _paladin.calculatePalaSkillDamage)(skillToCalculate, attackOne);

          case 25:
            attack = _context.sent;

          case 26:
            if (!(userCharacter["class"].name === 'Amazon')) {
              _context.next = 30;
              break;
            }

            _context.next = 29;
            return (0, _amazon.calculateAmaSkillDamage)(skillToCalculate, attackOne);

          case 29:
            attack = _context.sent;

          case 30:
            return _context.abrupt("return", attack);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculateSkillDamage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.calculateSkillDamage = calculateSkillDamage;