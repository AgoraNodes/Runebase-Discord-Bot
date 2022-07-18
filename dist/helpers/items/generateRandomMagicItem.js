"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomMagicItem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var generateRandomMagicItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(level) {
    var t,
        randomBaseItem,
        itemQualityRecord,
        randomItemModifiers,
        prefixModifier,
        suffixModifier,
        levelReq,
        rndDefense,
        minDamage,
        maxDamage,
        minThrowDamage,
        maxThrowDamage,
        addStrength,
        addDexterity,
        addVitality,
        addEnergy,
        addEdefense,
        addEdamage,
        rndStrength,
        _rndStrength,
        rndDexterity,
        _rndDexterity,
        rndVitality,
        _rndVitality,
        rndEnergy,
        _rndEnergy,
        rndEdefense,
        _rndEdefense,
        rndEdamage,
        _rndEdamage,
        baseItemName,
        itemName,
        createNewItem,
        newItem,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            _context.next = 3;
            return _models["default"].itemBase.findOne(_objectSpread({
              order: [[_sequelize.Sequelize.literal('RAND()')]],
              where: {
                // '$itemFamily.itemType.name$': 'Assassin Katars',
                levelReq: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [(0, _defineProperty2["default"])({}, _sequelize.Op.lte, level), null])
              },
              // where: { '$itemFamily.name$': 'War Axe' },
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily',
                include: [{
                  model: _models["default"].itemType,
                  as: 'itemType'
                }]
              }]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 3:
            randomBaseItem = _context.sent;
            _context.next = 6;
            return _models["default"].itemQuality.findOne(_objectSpread({
              where: {
                name: 'Magic'
              }
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 6:
            itemQualityRecord = _context.sent;
            _context.next = 9;
            return _models["default"].itemModifier.findAll(_objectSpread({
              order: [[_sequelize.Sequelize.literal('RAND()')]],
              where: {
                levelReq: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [(0, _defineProperty2["default"])({}, _sequelize.Op.lte, level), null])
              },
              limit: 2,
              include: [{
                model: _models["default"].itemQuality,
                as: 'itemQuality',
                required: true,
                where: {
                  name: 'Magic'
                }
              }, {
                model: _models["default"].ItemModifierItemType,
                as: 'ItemModifierItemTypes',
                required: true,
                where: {
                  itemTypeId: randomBaseItem.itemFamily.itemType.id
                }
              }]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 9:
            randomItemModifiers = _context.sent;
            randomItemModifiers.forEach(function (modifier) {
              if (modifier.prefix && !prefixModifier) {
                prefixModifier = modifier;
              }

              if (modifier.suffix && !suffixModifier) {
                suffixModifier = modifier;
              }
            }); // console.log(prefixModifier);
            // console.log(suffixModifier);

            addStrength = 0;
            addDexterity = 0;
            addVitality = 0;
            addEnergy = 0;
            addEdefense = 0;
            addEdamage = 0; // Calculate level requirement

            if (randomBaseItem.levelReq) {
              levelReq = randomBaseItem.levelReq;
            } // Calculate Defense


            if (randomBaseItem.minDefense && randomBaseItem.maxDefense) {
              rndDefense = (0, _utils.randomIntFromInterval)(randomBaseItem.minDefense, randomBaseItem.maxDefense);
            } // calculate min, max damage
            // Calculate Defense


            if (randomBaseItem.minDamage && randomBaseItem.maxDamage) {
              minDamage = randomBaseItem.minDamage;
              maxDamage = randomBaseItem.maxDamage;
            }

            if (randomBaseItem.minThrowDamage && randomBaseItem.maxThrowDamage) {
              minThrowDamage = randomBaseItem.minThrowDamage;
              maxThrowDamage = randomBaseItem.maxThrowDamage;
            } // Calculate Strength


            if (prefixModifier && prefixModifier.minStrength && prefixModifier.maxStrength) {
              rndStrength = (0, _utils.randomIntFromInterval)(prefixModifier.minStrength, prefixModifier.maxStrength);
              addStrength += rndStrength;
            }

            if (suffixModifier && suffixModifier.minStrength && suffixModifier.maxStrength) {
              _rndStrength = (0, _utils.randomIntFromInterval)(suffixModifier.minStrength, suffixModifier.maxStrength);
              addStrength += _rndStrength;
            } // Calculate Dexterity


            if (prefixModifier && prefixModifier.minDexterity && prefixModifier.maxDexterity) {
              rndDexterity = (0, _utils.randomIntFromInterval)(prefixModifier.minDexterity, prefixModifier.maxDexterity);
              addDexterity += rndDexterity;
            }

            if (suffixModifier && suffixModifier.minDexterity && suffixModifier.maxDexterity) {
              _rndDexterity = (0, _utils.randomIntFromInterval)(suffixModifier.minDexterity, suffixModifier.maxDexterity);
              addDexterity += _rndDexterity;
            } // Calculate Vitality


            if (prefixModifier && prefixModifier.minVitality && prefixModifier.maxVitality) {
              rndVitality = (0, _utils.randomIntFromInterval)(prefixModifier.minVitality, prefixModifier.maxVitality);
              addVitality += rndVitality;
            }

            if (suffixModifier && suffixModifier.minVitality && suffixModifier.maxVitality) {
              _rndVitality = (0, _utils.randomIntFromInterval)(suffixModifier.minVitality, suffixModifier.maxVitality);
              addVitality += _rndVitality;
            } // Calculate Energy


            if (prefixModifier && prefixModifier.minEnergy && prefixModifier.maxEnergy) {
              rndEnergy = (0, _utils.randomIntFromInterval)(prefixModifier.minEnergy, prefixModifier.maxEnergy);
              addEnergy += rndEnergy;
            }

            if (suffixModifier && suffixModifier.minEnergy && suffixModifier.maxEnergy) {
              _rndEnergy = (0, _utils.randomIntFromInterval)(suffixModifier.minEnergy, suffixModifier.maxEnergy);
              addEnergy += _rndEnergy;
            } // Calculate ED (enhanced damage/defense)


            if (prefixModifier && prefixModifier.minEdefense && prefixModifier.maxEdefense) {
              rndEdefense = (0, _utils.randomIntFromInterval)(prefixModifier.minEdefense, prefixModifier.maxEdefense);
              addEdefense += rndEdefense;
            }

            if (suffixModifier && suffixModifier.minEdefense && suffixModifier.maxEdefense) {
              _rndEdefense = (0, _utils.randomIntFromInterval)(suffixModifier.minEdefense, suffixModifier.maxEdefense);
              addEdefense += _rndEdefense;
            } // Calculate ED (enhanced damage/defense)


            if (prefixModifier && prefixModifier.minEdamage && prefixModifier.maxEdamage) {
              rndEdamage = (0, _utils.randomIntFromInterval)(prefixModifier.minEdamage, prefixModifier.maxEdamage);
              addEdamage += rndEdamage;
            }

            if (suffixModifier && suffixModifier.minEdamage && suffixModifier.maxEdamage) {
              _rndEdamage = (0, _utils.randomIntFromInterval)(suffixModifier.minEdamage, suffixModifier.maxEdamage);
              addEdamage += _rndEdamage;
            }

            if (randomBaseItem.itemFamily.name === 'Rings') {
              baseItemName = 'ring';
            } else if (randomBaseItem.itemFamily.name === 'Amulets') {
              baseItemName = 'amulet';
            } else {
              baseItemName = randomBaseItem.name;
            }

            itemName = "".concat(prefixModifier && prefixModifier.prefix ? "".concat(prefixModifier.prefix, " ") : '').concat(baseItemName).concat(suffixModifier && suffixModifier.suffix ? " ".concat(suffixModifier.suffix) : '');
            _context.next = 37;
            return _models["default"].item.create(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
              name: itemName,
              itemBaseId: randomBaseItem.id,
              itemQualityId: itemQualityRecord.id,
              durability: randomBaseItem.durability,
              stack: randomBaseItem.maxStack
            }, levelReq && {
              levelReq: levelReq
            }), rndDefense && {
              defense: rndDefense
            }), addEdefense !== 0 && {
              eDefense: addEdefense
            }), addEdamage !== 0 && {
              eDamage: addEdamage
            }), minDamage && {
              minDamage: minDamage
            }), maxDamage && {
              maxDamage: maxDamage
            }), minThrowDamage && {
              minThrowDamage: minThrowDamage
            }), maxThrowDamage && {
              maxThrowDamage: maxThrowDamage
            }), addStrength !== 0 && {
              strength: addStrength
            }), addDexterity !== 0 && {
              dexterity: addDexterity
            }), addVitality !== 0 && {
              vitality: addVitality
            }), addEnergy !== 0 && {
              energy: addEnergy
            }), _objectSpread({}, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 37:
            createNewItem = _context.sent;
            _context.next = 40;
            return _models["default"].item.findOne(_objectSpread({
              where: {
                id: createNewItem.id
              },
              include: [{
                model: _models["default"].itemQuality,
                as: 'itemQuality',
                required: true
              }, {
                model: _models["default"].itemBase,
                as: 'itemBase',
                required: true,
                include: [{
                  model: _models["default"].itemFamily,
                  as: 'itemFamily',
                  required: true,
                  include: [{
                    model: _models["default"].itemType,
                    as: 'itemType',
                    required: true
                  }]
                }]
              }]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 40:
            newItem = _context.sent;
            return _context.abrupt("return", newItem);

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateRandomMagicItem(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateRandomMagicItem = generateRandomMagicItem;