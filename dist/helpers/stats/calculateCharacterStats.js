"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateCharacterStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var calculateCharacterStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter) {
    var nextRank, nextRankExp, countedSpendAttributes, AttributesToSpend, strength, dexterity, vitality, energy, attackOneMin, attackOnemax, attackOneAr, attackTwoAr, block, defense, maxHp, currentHp, maxStamina, currentStaminaPoints, currentMp, maxMp;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].rank.findOne({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, currentCharacter.user.exp)
              },
              order: [['id', 'ASC']]
            });

          case 2:
            nextRank = _context.sent;
            nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentCharacter.user.ranks[0].expNeeded;
            countedSpendAttributes = currentCharacter.stats.strength + currentCharacter.stats.dexterity + currentCharacter.stats.vitality + currentCharacter.stats.energy;
            AttributesToSpend = currentCharacter.user.ranks[0].id * 5 - countedSpendAttributes;
            strength = currentCharacter.user.currentClass.strength + currentCharacter.stats.strength;
            dexterity = currentCharacter.user.currentClass.dexterity + currentCharacter.stats.dexterity;
            vitality = currentCharacter.user.currentClass.vitality + currentCharacter.stats.vitality;
            energy = currentCharacter.user.currentClass.energy + currentCharacter.stats.energy; // Calculate by skill in later version, instead of just weapon damage

            attackOneMin = currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.minDamage : 1;
            attackOnemax = currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.maxDamage : 2;
            attackOneAr = currentCharacter.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5;
            attackTwoAr = currentCharacter.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5;
            block = 0;
            defense = 0;
            maxHp = currentCharacter.user.currentClass.life + currentCharacter.stats.life;
            currentHp = currentCharacter.condition.life;
            maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
            currentStaminaPoints = currentCharacter.condition.stamina;
            currentMp = currentCharacter.user.currentClass.mana + currentCharacter.stats.mana;
            maxMp = currentCharacter.condition.mana;
            defense += currentCharacter.user.currentClass.defense;
            Object.keys(currentCharacter.equipment).forEach(function (key) {
              if ((key === 'helm' || key === 'belt' || key === 'boots' || key === 'gloves' || key === 'armor' || key === 'offHand' || key === 'amulet' || key === 'ringSlotTwo' || key === 'ringSlotOne') && currentCharacter.equipment[key] && currentCharacter.equipment[key].defense) {
                var realDefenseValue = Math.round(currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0)));
                defense += realDefenseValue;
              }
            });
            return _context.abrupt("return", {
              username: currentCharacter.user.username,
              currentClass: currentCharacter.user.currentClass.name,
              lvl: currentCharacter.user.ranks[0].id,
              exp: currentCharacter.user.exp,
              expNext: nextRankExp,
              unspedAttributes: AttributesToSpend,
              strength: strength,
              dexterity: dexterity,
              vitality: vitality,
              energy: energy,
              stamina: {
                current: currentStaminaPoints,
                max: maxStamina
              },
              defense: defense,
              block: 0,
              hp: {
                current: currentHp,
                max: maxHp
              },
              mp: {
                current: currentMp,
                max: maxMp
              },
              FR: 0,
              PR: 0,
              LR: 0,
              CR: 0,
              attackOne: {
                name: 'Attack Damage',
                min: attackOneMin,
                max: attackOnemax,
                ar: attackOneAr
              },
              attackTwo: {
                name: 'Attack Damage',
                min: 1,
                max: 2,
                ar: attackTwoAr
              }
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function calculateCharacterStats(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.calculateCharacterStats = calculateCharacterStats;