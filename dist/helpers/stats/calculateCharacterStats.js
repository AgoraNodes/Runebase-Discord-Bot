"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateCharacterStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _calculateSkills = require("./calculateSkills");

var _selectedSkills = require("../character/selectedSkills");

var _calculatePassives = _interopRequireDefault(require("./calculatePassives"));

var _calculateBuffs = _interopRequireDefault(require("./calculateBuffs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var calculateCharacterStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter) {
    var t,
        nextRank,
        userCurrentRank,
        nextRankExp,
        countedSpendAttributes,
        unspendAttributes,
        FR,
        PR,
        LR,
        CR,
        block,
        defense,
        totalLifeBonus,
        strength,
        dexterity,
        vitality,
        energy,
        shieldBlock,
        blocking,
        maxStamina,
        currentStaminaPoints,
        kick,
        regularAttack,
        _yield$calculatePassi,
        _yield$calculatePassi2,
        currentHp,
        maxHp,
        currentMp,
        maxMp,
        _yield$calculateBuffs,
        _yield$calculateBuffs2,
        selectedSkills,
        attackOne,
        attackTwo,
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
            userCurrentRank = currentCharacter.user.ranks[0] ? currentCharacter.user.ranks[0] : {
              id: 0,
              expNeeded: nextRank.expNeeded
            };
            nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : userCurrentRank.expNeeded;
            countedSpendAttributes = currentCharacter.stats.strength + currentCharacter.stats.dexterity + currentCharacter.stats.vitality + currentCharacter.stats.energy;
            unspendAttributes = userCurrentRank.id * 5 - countedSpendAttributes;
            FR = 0;
            PR = 0;
            LR = 0;
            CR = 0;
            block = 0;
            defense = 0;
            totalLifeBonus = 0;
            strength = currentCharacter.user.currentClass.strength + currentCharacter.stats.strength;
            dexterity = currentCharacter.user.currentClass.dexterity + currentCharacter.stats.dexterity;
            vitality = currentCharacter.user.currentClass.vitality + currentCharacter.stats.vitality;
            energy = currentCharacter.user.currentClass.energy + currentCharacter.stats.energy;

            if (currentCharacter.equipment.offHand && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields') {
              shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
              blocking = shieldBlock * (dexterity - 15) / (userCurrentRank.id * 2);
              block = blocking > 50 ? 50 : blocking;
            }

            maxStamina = currentCharacter.user.currentClass.stamina + currentCharacter.stats.stamina;
            currentStaminaPoints = currentCharacter.condition.stamina;
            defense += currentCharacter.user.currentClass.defense;
            Object.keys(currentCharacter.equipment).forEach(function (key) {
              if ((key === 'helm' || key === 'belt' || key === 'boots' || key === 'gloves' || key === 'armor' || key === 'offHand' || key === 'amulet' || key === 'ringSlotTwo' || key === 'ringSlotOne') && currentCharacter.equipment[key] && currentCharacter.equipment[key].defense) {
                var realDefenseValue = Math.round(currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0)));
                defense += realDefenseValue;
              }
            });
            kick = currentCharacter.equipment.boots ? {
              name: 'Kick',
              attackType: 'Physical',
              min: currentCharacter.equipment.boots.minDamage,
              max: currentCharacter.equipment.boots.maxDamage,
              ar: currentCharacter.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5,
              crit: 0,
              lifeSteal: 0,
              manaSteal: 0,
              cost: 0
            } : {
              name: 'Kick',
              attackType: 'Physical',
              min: 1,
              max: 2,
              ar: currentCharacter.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5,
              crit: 0,
              lifeSteal: 0,
              manaSteal: 0,
              cost: 0
            };
            regularAttack = {
              name: 'Attack',
              attackType: 'Physical',
              min: currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.minDamage : 1,
              max: currentCharacter.equipment.mainHand ? currentCharacter.equipment.mainHand.maxDamage : 2,
              minThrow: currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.minThrowDamage ? currentCharacter.equipment.mainHand.minThrowDamage : 0,
              maxThrow: currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.maxThrowDamage ? currentCharacter.equipment.mainHand.maxThrowDamage : 0,
              ar: currentCharacter.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5,
              crit: 0,
              stun: 0,
              parry: 0,
              lifeSteal: 0,
              manaSteal: 0,
              cost: 0
            }; // Add Passive Skill stats

            _context.next = 28;
            return (0, _calculatePassives["default"])(currentCharacter, defense, regularAttack, kick, FR, PR, LR, CR);

          case 28:
            _yield$calculatePassi = _context.sent;
            _yield$calculatePassi2 = (0, _slicedToArray2["default"])(_yield$calculatePassi, 7);
            defense = _yield$calculatePassi2[0];
            regularAttack = _yield$calculatePassi2[1];
            kick = _yield$calculatePassi2[2];
            FR = _yield$calculatePassi2[3];
            PR = _yield$calculatePassi2[4];
            LR = _yield$calculatePassi2[5];
            CR = _yield$calculatePassi2[6];
            currentHp = currentCharacter.condition.life;
            maxHp = currentCharacter.user.currentClass.life + currentCharacter.stats.life;
            currentMp = currentCharacter.condition.mana;
            maxMp = currentCharacter.user.currentClass.mana + currentCharacter.stats.mana;
            console.log('before calculating buffs'); // Calculate Buffs

            _context.next = 44;
            return (0, _calculateBuffs["default"])(currentCharacter, defense, regularAttack, currentHp, maxHp);

          case 44:
            _yield$calculateBuffs = _context.sent;
            _yield$calculateBuffs2 = (0, _slicedToArray2["default"])(_yield$calculateBuffs, 5);
            defense = _yield$calculateBuffs2[0];
            regularAttack = _yield$calculateBuffs2[1];
            currentHp = _yield$calculateBuffs2[2];
            maxHp = _yield$calculateBuffs2[3];
            totalLifeBonus = _yield$calculateBuffs2[4];
            console.log('after calculating buffs'); // Fetch Selected Skills

            _context.next = 54;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(currentCharacter.user.user_id, t);

          case 54:
            selectedSkills = _context.sent;
            console.log('after skill selection'); // calculate Skill damage

            _context.next = 58;
            return (0, _calculateSkills.calculateSkillDamage)(currentCharacter, selectedSkills.selectedMainSkill, regularAttack, t);

          case 58:
            attackOne = _context.sent;
            console.log('after main skill damage'); // calculate Skill damage

            _context.next = 62;
            return (0, _calculateSkills.calculateSkillDamage)(currentCharacter, selectedSkills.selectedSecondarySkill, regularAttack, t);

          case 62:
            attackTwo = _context.sent;
            console.log('done calculating character stats'); // TODO: APPLY CAPS BEFORE APPLYING THEM TO FINAL RETURN

            return _context.abrupt("return", {
              username: currentCharacter.user.username,
              currentClass: currentCharacter.user.currentClass.name,
              lvl: userCurrentRank.id,
              exp: currentCharacter.user.exp,
              expNext: nextRankExp,
              unspendAttributes: unspendAttributes,
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
                max: maxHp,
                totalLifeBonus: totalLifeBonus
              },
              mp: {
                current: currentMp,
                max: maxMp
              },
              FR: FR,
              PR: PR,
              LR: LR,
              CR: CR,
              attackOne: attackOne,
              attackTwo: attackTwo,
              regularAttack: regularAttack,
              kick: kick
            });

          case 65:
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