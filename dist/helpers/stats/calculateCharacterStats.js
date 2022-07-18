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

var _calculateItemStats = _interopRequireDefault(require("./calculateItemStats"));

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
        totalManaBonus,
        lifeSteal,
        manaSteal,
        initialStrength,
        initialDexterity,
        initialVitality,
        initialEnergy,
        strength,
        dexterity,
        vitality,
        energy,
        maxStamina,
        currentStaminaPoints,
        currentHp,
        maxHp,
        currentMp,
        maxMp,
        canWearHelm,
        canWearMainHand,
        canWearOffHand,
        canWearArmor,
        canWearGloves,
        canWearBelt,
        canWearBoots,
        _yield$calculateItemS,
        _yield$calculateItemS2,
        addedLifeByItemVitality,
        addedManaByItemEnergy,
        addedStrengthDamagePercentage,
        kick,
        regularAttack,
        _yield$calculatePassi,
        _yield$calculatePassi2,
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
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, currentCharacter.UserGroup.exp),
                groupId: currentCharacter.UserGroup.user.currentRealmId
              },
              order: [['id', 'ASC']]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 3:
            nextRank = _context.sent;
            console.log(currentCharacter.UserGroup.exp);
            console.log(currentCharacter.UserGroup.user.currentRealmId);
            console.log('calcstats 1');
            console.log(currentCharacter.UserGroup);
            console.log(nextRank);
            userCurrentRank = currentCharacter.UserGroup.UserGroupRank && currentCharacter.UserGroup.UserGroupRank.rank ? currentCharacter.UserGroup.UserGroupRank.rank : {
              level: 0,
              expNeeded: nextRank.expNeeded
            };
            console.log('before next rank calc');
            nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : userCurrentRank.expNeeded;
            countedSpendAttributes = currentCharacter.stats.strength + currentCharacter.stats.dexterity + currentCharacter.stats.vitality + currentCharacter.stats.energy;
            unspendAttributes = userCurrentRank.level * 5 - countedSpendAttributes;
            FR = 0;
            PR = 0;
            LR = 0;
            CR = 0;
            block = 0;
            defense = 0;
            totalLifeBonus = 0;
            totalManaBonus = 0;
            lifeSteal = 0;
            manaSteal = 0;
            console.log('calcstats 2');
            initialStrength = currentCharacter.UserGroup.user.currentClass.strength + currentCharacter.stats.strength;
            initialDexterity = currentCharacter.UserGroup.user.currentClass.dexterity + currentCharacter.stats.dexterity;
            initialVitality = currentCharacter.UserGroup.user.currentClass.vitality + currentCharacter.stats.vitality;
            initialEnergy = currentCharacter.UserGroup.user.currentClass.energy + currentCharacter.stats.energy;
            strength = initialStrength;
            dexterity = initialDexterity;
            vitality = initialVitality;
            energy = initialEnergy;
            console.log('calcstats 3');
            maxStamina = currentCharacter.UserGroup.user.currentClass.stamina + currentCharacter.stats.stamina;
            currentStaminaPoints = currentCharacter.condition.stamina;
            currentHp = currentCharacter.condition.life;
            maxHp = currentCharacter.UserGroup.user.currentClass.life + currentCharacter.stats.life;
            currentMp = currentCharacter.condition.mana;
            maxMp = currentCharacter.UserGroup.user.currentClass.mana + currentCharacter.stats.mana;
            defense += currentCharacter.UserGroup.user.currentClass.defense;
            console.log('calcstats 4');
            canWearHelm = false;
            canWearMainHand = false;
            canWearOffHand = false;
            canWearArmor = false;
            canWearGloves = false;
            canWearBelt = false;
            canWearBoots = false;
            console.log('calcstats 4-1');
            _context.next = 52;
            return (0, _calculateItemStats["default"])(currentCharacter, userCurrentRank, strength, dexterity, vitality, energy, defense, block);

          case 52:
            _yield$calculateItemS = _context.sent;
            _yield$calculateItemS2 = (0, _slicedToArray2["default"])(_yield$calculateItemS, 13);
            strength = _yield$calculateItemS2[0];
            dexterity = _yield$calculateItemS2[1];
            vitality = _yield$calculateItemS2[2];
            energy = _yield$calculateItemS2[3];
            defense = _yield$calculateItemS2[4];
            block = _yield$calculateItemS2[5];
            canWearHelm = _yield$calculateItemS2[6];
            canWearMainHand = _yield$calculateItemS2[7];
            canWearOffHand = _yield$calculateItemS2[8];
            canWearArmor = _yield$calculateItemS2[9];
            canWearGloves = _yield$calculateItemS2[10];
            canWearBelt = _yield$calculateItemS2[11];
            canWearBoots = _yield$calculateItemS2[12];
            console.log('calcstats 5');
            addedLifeByItemVitality = 0;
            addedManaByItemEnergy = 0;

            if (currentCharacter["class"].name === 'Warrior') {
              // const totalLoops = (vitality - initialVitality);
              // Consider looping over points to calculate for example: +1.5 value
              // EXAMPLE GIVEN: if loopcount % 2 === 0 then life 2 else 1
              // FOR NOW WE USE Math.round.. perhaps we keep it this way
              addedLifeByItemVitality = (vitality - initialVitality) * 4;
              addedManaByItemEnergy = (energy - initialEnergy) * 1;
            }

            if (currentCharacter["class"].name === 'Amazon') {
              addedLifeByItemVitality = (vitality - initialVitality) * 3;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.5);
            }

            if (currentCharacter["class"].name === 'Assassin') {
              addedLifeByItemVitality = (vitality - initialVitality) * 3;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.75);
            }

            if (currentCharacter["class"].name === 'Paladin') {
              addedLifeByItemVitality = (vitality - initialVitality) * 3;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 1.5);
            }

            if (currentCharacter["class"].name === 'Druid') {
              addedLifeByItemVitality = (vitality - initialVitality) * 2;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
            }

            if (currentCharacter["class"].name === 'Necromancer') {
              addedLifeByItemVitality = (vitality - initialVitality) * 2;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
            }

            if (currentCharacter["class"].name === 'Sorceress') {
              addedLifeByItemVitality = (vitality - initialVitality) * 2;
              addedManaByItemEnergy = Math.round((energy - initialEnergy) * 2);
            }

            maxHp += addedLifeByItemVitality;
            maxMp += addedManaByItemEnergy; // Added Damage % by Strength

            addedStrengthDamagePercentage = 1 + strength / 100; // Should we substract starting strength from this? (YES/NO)

            console.log('after addsss'); // Kick Attack

            kick = {
              name: 'Kick',
              attackType: 'Physical',
              min: canWearBoots && currentCharacter.equipment.boots ? Math.round(currentCharacter.equipment.boots.minDamage * addedStrengthDamagePercentage) : Math.round(1 * addedStrengthDamagePercentage),
              max: canWearBoots && currentCharacter.equipment.boots ? Math.round(currentCharacter.equipment.boots.maxDamage * addedStrengthDamagePercentage) : Math.round(2 * addedStrengthDamagePercentage),
              ar: currentCharacter.UserGroup.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5,
              crit: 0,
              lifeSteal: lifeSteal,
              manaSteal: manaSteal,
              cost: 0
            }; // Regular Weapon Attack

            regularAttack = {
              name: 'Attack',
              attackType: 'Physical',
              min: canWearMainHand && currentCharacter.equipment.mainHand ? Math.round(currentCharacter.equipment.mainHand.minDamage * addedStrengthDamagePercentage) : Math.round(1 * addedStrengthDamagePercentage),
              max: canWearMainHand && currentCharacter.equipment.mainHand ? Math.round(currentCharacter.equipment.mainHand.maxDamage * addedStrengthDamagePercentage) : Math.round(2 * addedStrengthDamagePercentage),
              minThrow: canWearMainHand && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.minThrowDamage ? Math.round(currentCharacter.equipment.mainHand.minThrowDamage * addedStrengthDamagePercentage) : Math.round(0 * addedStrengthDamagePercentage),
              maxThrow: canWearMainHand && currentCharacter.equipment.mainHand && currentCharacter.equipment.mainHand.maxThrowDamage ? Math.round(currentCharacter.equipment.mainHand.maxThrowDamage * addedStrengthDamagePercentage) : Math.round(0 * addedStrengthDamagePercentage),
              ar: currentCharacter.UserGroup.user.currentClass.attackRating + currentCharacter.stats.dexterity * 5,
              crit: 0,
              stun: 0,
              parry: 0,
              lifeSteal: lifeSteal,
              manaSteal: manaSteal,
              cost: 0
            };
            console.log('beore passives calc'); // Add Passive Skill stats

            _context.next = 86;
            return (0, _calculatePassives["default"])(currentCharacter, defense, regularAttack, kick, FR, PR, LR, CR);

          case 86:
            _yield$calculatePassi = _context.sent;
            _yield$calculatePassi2 = (0, _slicedToArray2["default"])(_yield$calculatePassi, 7);
            defense = _yield$calculatePassi2[0];
            regularAttack = _yield$calculatePassi2[1];
            kick = _yield$calculatePassi2[2];
            FR = _yield$calculatePassi2[3];
            PR = _yield$calculatePassi2[4];
            LR = _yield$calculatePassi2[5];
            CR = _yield$calculatePassi2[6];
            console.log('before calculating buffs'); // Calculate Buffs

            _context.next = 98;
            return (0, _calculateBuffs["default"])(currentCharacter, defense, regularAttack, currentHp, maxHp);

          case 98:
            _yield$calculateBuffs = _context.sent;
            _yield$calculateBuffs2 = (0, _slicedToArray2["default"])(_yield$calculateBuffs, 5);
            defense = _yield$calculateBuffs2[0];
            regularAttack = _yield$calculateBuffs2[1];
            currentHp = _yield$calculateBuffs2[2];
            maxHp = _yield$calculateBuffs2[3];
            totalLifeBonus = _yield$calculateBuffs2[4];
            console.log('after calculating buffs'); // Fetch Selected Skills

            _context.next = 108;
            return (0, _selectedSkills.fetchUserCurrentSelectedSkills)(currentCharacter.UserGroup.user.user_id, t);

          case 108:
            selectedSkills = _context.sent;
            console.log('after skill selection'); // calculate Skill damage

            _context.next = 112;
            return (0, _calculateSkills.calculateSkillDamage)(currentCharacter, selectedSkills.selectedMainSkill, regularAttack, t);

          case 112:
            attackOne = _context.sent;
            console.log('after main skill damage'); // calculate Skill damage

            _context.next = 116;
            return (0, _calculateSkills.calculateSkillDamage)(currentCharacter, selectedSkills.selectedSecondarySkill, regularAttack, t);

          case 116:
            attackTwo = _context.sent;
            console.log(userCurrentRank);
            console.log(userCurrentRank.level);
            console.log(regularAttack);
            console.log('done calculating character stats'); // TODO: APPLY CAPS BEFORE APPLYING THEM TO FINAL RETURN

            return _context.abrupt("return", {
              username: currentCharacter.UserGroup.user.username,
              currentClass: currentCharacter.UserGroup.user.currentClass.name,
              lvl: userCurrentRank.level,
              exp: currentCharacter.UserGroup.exp,
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
                current: currentHp > maxHp ? maxHp : currentHp,
                max: maxHp,
                totalLifeBonus: totalLifeBonus
              },
              mp: {
                current: currentMp > maxMp ? maxMp : currentMp,
                max: maxMp,
                totalManaBonus: totalManaBonus
              },
              FR: FR,
              PR: PR,
              LR: LR,
              CR: CR,
              attackOne: attackOne,
              attackTwo: attackTwo,
              regularAttack: regularAttack,
              kick: kick,
              equipment: {
                canWearHelm: canWearHelm,
                canWearMainHand: canWearMainHand,
                canWearOffHand: canWearOffHand,
                canWearArmor: canWearArmor,
                canWearGloves: canWearGloves,
                canWearBelt: canWearBelt,
                canWearBoots: canWearBoots
              }
            });

          case 122:
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