"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomLowQualityItem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var generateRandomLowQualityItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(level) {
    var randomBaseItem, itemQualityRecord, levelReq, rndDefense, minDamage, maxDamage, minThrowDamage, maxThrowDamage, createNewItem, newItem;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].itemBase.findOne({
              order: [[_sequelize.Sequelize.literal('RAND()')]],
              where: {
                // '$itemFamily.itemType.name$': 'Throwing',
                levelReq: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [(0, _defineProperty2["default"])({}, _sequelize.Op.lte, level), null])
              },
              // where: { '$itemFamily.name$': 'War Axe' },
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily',
                where: {
                  name: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [(0, _defineProperty2["default"])({}, _sequelize.Op.ne, "Rings"), (0, _defineProperty2["default"])({}, _sequelize.Op.ne, "Amulets")])
                },
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
                name: 'Low Quality'
              }
            });

          case 5:
            itemQualityRecord = _context.sent;

            // Calculate level requirement
            if (randomBaseItem.levelReq) {
              levelReq = randomBaseItem.levelReq;
            } // Calculate Defense


            if (randomBaseItem.minDefense && randomBaseItem.maxDefense) {
              rndDefense = (0, _utils.randomIntFromInterval)(randomBaseItem.minDefense, randomBaseItem.maxDefense);
              rndDefense = Math.round(rndDefense / 100 * 75);
            } // calculate min, max damage
            // Calculate Defense


            if (randomBaseItem.minDamage && randomBaseItem.maxDamage) {
              minDamage = randomBaseItem.minDamage;
              maxDamage = randomBaseItem.maxDamage;
              minDamage = Math.round(minDamage / 100 * 75);
              maxDamage = Math.round(maxDamage / 100 * 75);
            }

            if (randomBaseItem.minThrowDamage && randomBaseItem.maxThrowDamage) {
              minThrowDamage = randomBaseItem.minThrowDamage;
              maxThrowDamage = randomBaseItem.maxThrowDamage;
              minThrowDamage = Math.round(minThrowDamage / 100 * 75);
              maxThrowDamage = Math.round(maxThrowDamage / 100 * 75);
            }

            _context.next = 12;
            return _models["default"].item.create(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
              name: "Low Quality ".concat(randomBaseItem.name),
              itemBaseId: randomBaseItem.id,
              itemQualityId: itemQualityRecord.id,
              durability: randomBaseItem.durability,
              stack: randomBaseItem.maxStack
            }, levelReq && {
              levelReq: levelReq
            }), rndDefense && {
              defense: rndDefense
            }), minDamage && {
              minDamage: minDamage
            }), maxDamage && {
              maxDamage: maxDamage
            }), minThrowDamage && {
              minThrowDamage: minThrowDamage
            }), maxThrowDamage && {
              maxThrowDamage: maxThrowDamage
            }));

          case 12:
            createNewItem = _context.sent;
            _context.next = 15;
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

          case 15:
            newItem = _context.sent;
            return _context.abrupt("return", newItem);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateRandomLowQualityItem(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateRandomLowQualityItem = generateRandomLowQualityItem;