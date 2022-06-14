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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var generateRandomMagicItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var randomBaseItem, itemQualityRecord, randomItemModifiers, prefixModifier, suffixModifier, levelReq, rndDefense, minDamage, maxDamage, addStrength, addDexterity, addVitality, addEnergy, rndStrength, _rndStrength, rndDexterity, _rndDexterity, rndVitality, _rndVitality, rndEnergy, _rndEnergy, itemName, createNewItem, newItem;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].itemBase.findOne({
              order: [[_sequelize.Sequelize.literal('RAND()')]],
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily',
                include: [{
                  model: _models["default"].itemType,
                  as: 'itemType'
                }]
              }]
            });

          case 2:
            randomBaseItem = _context.sent;
            _context.next = 5;
            return _models["default"].itemQuality.findOne({
              where: {
                name: 'Magic'
              }
            });

          case 5:
            itemQualityRecord = _context.sent;
            _context.next = 8;
            return _models["default"].itemModifier.findAll({
              order: [[_sequelize.Sequelize.literal('RAND()')]],
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
            });

          case 8:
            randomItemModifiers = _context.sent;
            randomItemModifiers.forEach(function (modifier) {
              if (modifier.prefix && !prefixModifier) {
                prefixModifier = modifier;
              }

              if (modifier.suffix && !suffixModifier) {
                suffixModifier = modifier;
              }
            });
            console.log(prefixModifier);
            console.log(suffixModifier);
            addStrength = 0;
            addDexterity = 0;
            addVitality = 0;
            addEnergy = 0; // Calculate level requirement

            if (randomBaseItem.levelReq) {
              levelReq = randomBaseItem.levelReq;
            } // Calculate Defense


            if (randomBaseItem.minDefense && randomBaseItem.maxDefense) {
              rndDefense = randomIntFromInterval(randomBaseItem.minDefense, randomBaseItem.maxDefense);
            } // calculate min, max damage
            // Calculate Defense


            if (randomBaseItem.minDamage && randomBaseItem.maxDamage) {
              minDamage = randomBaseItem.minDamage;
              maxDamage = randomBaseItem.maxDamage;
            } // Calculate Strength


            if (prefixModifier && prefixModifier.minStrength && prefixModifier.maxStrength) {
              rndStrength = randomIntFromInterval(prefixModifier.minStrength, prefixModifier.maxStrength);
              addStrength += rndStrength;
            }

            if (suffixModifier && suffixModifier.minStrength && suffixModifier.maxStrength) {
              _rndStrength = randomIntFromInterval(suffixModifier.minStrength, suffixModifier.maxStrength);
              addStrength += _rndStrength;
            } // Calculate Dexterity


            if (prefixModifier && prefixModifier.minDexterity && prefixModifier.maxDexterity) {
              rndDexterity = randomIntFromInterval(prefixModifier.minDexterity, prefixModifier.maxDexterity);
              addDexterity += rndDexterity;
            }

            if (suffixModifier && suffixModifier.minDexterity && suffixModifier.maxDexterity) {
              _rndDexterity = randomIntFromInterval(suffixModifier.minDexterity, suffixModifier.maxDexterity);
              addDexterity += _rndDexterity;
            } // Calculate Vitality


            if (prefixModifier && prefixModifier.minVitality && prefixModifier.maxVitality) {
              rndVitality = randomIntFromInterval(prefixModifier.minVitality, prefixModifier.maxVitality);
              addVitality += rndVitality;
            }

            if (suffixModifier && suffixModifier.minVitality && suffixModifier.maxVitality) {
              _rndVitality = randomIntFromInterval(suffixModifier.minVitality, suffixModifier.maxVitality);
              addVitality += _rndVitality;
            } // Calculate Energy


            if (prefixModifier && prefixModifier.minEnergy && prefixModifier.maxEnergy) {
              rndEnergy = randomIntFromInterval(prefixModifier.minEnergy, prefixModifier.maxEnergy);
              addEnergy += rndEnergy;
            }

            if (suffixModifier && suffixModifier.minEnergy && suffixModifier.maxEnergy) {
              _rndEnergy = randomIntFromInterval(suffixModifier.minEnergy, suffixModifier.maxEnergy);
              addEnergy += _rndEnergy;
            }

            itemName = "".concat(prefixModifier && prefixModifier.prefix ? "".concat(prefixModifier.prefix, " ") : '').concat(randomBaseItem.name).concat(suffixModifier && suffixModifier.suffix ? " ".concat(suffixModifier.suffix) : '');
            _context.next = 30;
            return _models["default"].item.create(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
              name: itemName,
              itemBaseId: randomBaseItem.id,
              itemQualityId: itemQualityRecord.id,
              durability: randomBaseItem.durability
            }, levelReq && {
              levelReq: levelReq
            }), rndDefense && {
              defense: rndDefense
            }), minDamage && {
              minDamage: minDamage
            }), maxDamage && {
              maxDamage: maxDamage
            }), addStrength !== 0 && {
              strength: addStrength
            }), addDexterity !== 0 && {
              dexterity: addDexterity
            }), addVitality !== 0 && {
              vitality: addVitality
            }), addEnergy !== 0 && {
              energy: addEnergy
            }));

          case 30:
            createNewItem = _context.sent;
            _context.next = 33;
            return _models["default"].item.findOne({
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
            });

          case 33:
            newItem = _context.sent;
            return _context.abrupt("return", newItem);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateRandomMagicItem() {
    return _ref.apply(this, arguments);
  };
}();

exports.generateRandomMagicItem = generateRandomMagicItem;