"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemModifier = exports.removeItemModifier = exports.fetchItemModifiers = exports.addItemModifier = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var fetchItemModifiers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              order: [['id', 'DESC']],
              include: [{
                model: _models["default"].itemQuality,
                as: 'itemQuality'
              }]
            };
            res.locals.name = 'itemModifiers';
            _context.next = 4;
            return _models["default"].itemModifier.count(options);

          case 4:
            res.locals.count = _context.sent;
            _context.next = 7;
            return _models["default"].itemModifier.findAll(options);

          case 7:
            res.locals.result = _context.sent;
            console.log(res.locals.result);
            next();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchItemModifiers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchItemModifiers = fetchItemModifiers;

var addItemModifier = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var newItemModifier;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);

            if (req.body.itemQuality) {
              _context2.next = 3;
              break;
            }

            throw new Error("itemQuality is required");

          case 3:
            _context2.next = 5;
            return _models["default"].itemModifier.create({
              itemQualityId: req.body.itemQuality,
              levelReq: req.body.levelReq,
              levelMonster: req.body.levelMonster,
              prefix: req.body.prefix,
              suffix: req.body.suffix,
              minStrength: req.body.minStrength,
              maxStrength: req.body.maxStrength,
              minDexterity: req.body.minDexterity,
              maxDexterity: req.body.maxDexterity,
              minVitality: req.body.minVitality,
              maxVitality: req.body.maxVitality,
              minEnergy: req.body.minEnergy,
              maxEnergy: req.body.maxEnergy
            });

          case 5:
            newItemModifier = _context2.sent;
            res.locals.name = 'addItemFamily';
            _context2.next = 9;
            return _models["default"].itemModifier.findOne({
              where: {
                id: newItemModifier.id
              },
              include: [{
                model: _models["default"].itemQuality,
                as: 'itemQuality'
              }]
            });

          case 9:
            res.locals.result = _context2.sent;
            next();

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addItemModifier(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addItemModifier = addItemModifier;

var updateItemModifier = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var classDescription, updatedRank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);

            if (req.body.itemModifier) {
              _context3.next = 3;
              break;
            }

            throw new Error("description is required");

          case 3:
            _context3.next = 5;
            return _models["default"].itemModifier.findOne({
              where: {
                id: req.body.id
              }
            });

          case 5:
            classDescription = _context3.sent;
            _context3.next = 8;
            return classDescription.update({
              itemQualityId: req.body.itemQuality,
              levelReq: req.body.levelReq,
              levelMonster: req.body.levelMonster,
              prefix: req.body.prefix,
              suffix: req.body.suffix,
              minStrength: req.body.minStrength,
              maxStrength: req.body.maxStrength,
              minDexterity: req.body.minDexterity,
              maxDexterity: req.body.maxDexterity,
              minVitality: req.body.minVitality,
              maxVitality: req.body.maxVitality,
              minEnergy: req.body.minEnergy,
              maxEnergy: req.body.maxEnergy
            });

          case 8:
            updatedRank = _context3.sent;
            res.locals.name = 'updateClassDescription';
            _context3.next = 12;
            return _models["default"].itemModifier.findOne({
              where: {
                id: updatedRank.id
              },
              include: [{
                model: _models["default"].itemModifier,
                as: 'itemModifier'
              }]
            });

          case 12:
            res.locals.result = _context3.sent;
            next();

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateItemModifier(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateItemModifier = updateItemModifier;

var removeItemModifier = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var classDescription;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].itemModifier.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            classDescription = _context4.sent;
            res.locals.name = 'removeClassDescription';
            res.locals.result = classDescription;
            classDescription.destroy();
            next();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removeItemModifier(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeItemModifier = removeItemModifier;