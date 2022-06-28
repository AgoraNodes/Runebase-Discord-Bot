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

var _calculateSkillDamage = require("../skills/calculateSkillDamage");

var _selectedSkills = require("../character/selectedSkills");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var calculateCharacterStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter) {
    var t,
        nextRank,
        nextRankExp,
        countedSpendAttributes,
        AttributesToSpend,
        strength,
        dexterity,
        vitality,
        energy,
        attackOneMin,
        attackOnemax,
        attackOneAr,
        attackTwoAr,
        block,
        defense,
        shieldBlock,
        blocking,
        maxHp,
        currentHp,
        maxStamina,
        currentStaminaPoints,
        maxMp,
        currentMp,
        selectedSkills,
        skillOne,
        skillTwo,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            _context.next = 3;
            return _models["default"].rank.findOne(_objectSpread({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, currentCharacter.user.exp)
              },
              order: [['id', 'ASC']]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 3:
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

            if (currentCharacter.equipment.offHand && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields') {
              shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
              blocking = shieldBlock * (dexterity - 15) / (currentCharacter.user.ranks[0].id * 2);
              block = blocking > 50 ? 50 : blocking;
            }

            maxHp = currentCharacter.user.currentClass.life + currentCharacter.stats.life;
            currentHp = currentCharacter.condition.life;
            maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
            currentStaminaPoints = currentCharacter.condition.stamina;
            maxMp = currentCharacter.user.currentClass.mana + currentCharacter.stats.mana;
            currentMp = currentCharacter.condition.mana;
            defense += currentCharacter.user.currentClass.defense;
            Object.keys(currentCharacter.equipment).forEach(function (key) {
              if ((key === 'helm' || key === 'belt' || key === 'boots' || key === 'gloves' || key === 'armor' || key === 'offHand' || key === 'amulet' || key === 'ringSlotTwo' || key === 'ringSlotOne') && currentCharacter.equipment[key] && currentCharacter.equipment[key].defense) {
                var realDefenseValue = Math.round(currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0)));
                defense += realDefenseValue;
              }
            });
            _context.next = 28;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(currentCharacter.user.user_id, t);

          case 28:
            selectedSkills = _context.sent;
            _context.next = 31;
            return (0, _calculateSkillDamage.calculateSkillDamage)(currentCharacter, selectedSkills.selectedMainSkill, {
              min: attackOneMin,
              max: attackOnemax,
              ar: attackOneAr
            }, t);

          case 31:
            skillOne = _context.sent;
            _context.next = 34;
            return (0, _calculateSkillDamage.calculateSkillDamage)(currentCharacter, selectedSkills.selectedSecondarySkill, {
              min: attackOneMin,
              max: attackOnemax,
              ar: attackOneAr
            }, t);

          case 34:
            skillTwo = _context.sent;
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
              block: block,
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
                name: skillOne.name,
                min: skillOne.min,
                max: skillOne.max,
                ar: skillOne.ar,
                cost: skillOne.cost
              },
              attackTwo: {
                name: skillTwo.name,
                min: skillTwo.min,
                max: skillTwo.max,
                ar: skillTwo.ar,
                cost: skillTwo.cost
              },
              regularAttack: {
                name: 'Attack',
                min: attackOneMin,
                max: attackOnemax,
                ar: attackOneAr,
                cost: 0
              }
            });

          case 36:
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