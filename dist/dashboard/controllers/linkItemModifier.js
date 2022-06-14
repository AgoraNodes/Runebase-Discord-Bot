"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemModifierLink = exports.removeItemModifierLink = exports.fetchItemModifierLinks = exports.addItemModifierLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var fetchItemModifierLinks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              order: [['id', 'DESC']],
              include: [{
                model: _models["default"].itemModifier,
                as: 'itemModifier'
              }, {
                model: _models["default"].itemType,
                as: 'itemType'
              }]
            };
            res.locals.name = 'priceCurrencies';
            _context.next = 4;
            return _models["default"].ItemModifierItemType.count(options);

          case 4:
            res.locals.count = _context.sent;
            _context.next = 7;
            return _models["default"].ItemModifierItemType.findAll(options);

          case 7:
            res.locals.result = _context.sent;
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchItemModifierLinks(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchItemModifierLinks = fetchItemModifierLinks;

var addItemModifierLink = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var itemFamily, newItemFamily;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);

            if (req.body.itemModifier) {
              _context2.next = 3;
              break;
            }

            throw new Error("itemModifier is required");

          case 3:
            if (req.body.itemType) {
              _context2.next = 5;
              break;
            }

            throw new Error("itemType is required");

          case 5:
            _context2.next = 7;
            return _models["default"].ItemModifierItemType.findOne({
              where: {
                itemModifierId: req.body.itemModifier,
                itemTypeId: req.body.itemType
              }
            });

          case 7:
            itemFamily = _context2.sent;

            if (!itemFamily) {
              _context2.next = 10;
              break;
            }

            throw new Error("Already Exists");

          case 10:
            _context2.next = 12;
            return _models["default"].ItemModifierItemType.create({
              itemModifierId: req.body.itemModifier,
              itemTypeId: req.body.itemType
            });

          case 12:
            newItemFamily = _context2.sent;
            res.locals.name = 'addItemFamily';
            _context2.next = 16;
            return _models["default"].ItemModifierItemType.findOne({
              where: {
                id: newItemFamily.id
              },
              include: [{
                model: _models["default"].itemModifier,
                as: 'itemModifier'
              }, {
                model: _models["default"].itemType,
                as: 'itemType'
              }]
            });

          case 16:
            res.locals.result = _context2.sent;
            next();

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addItemModifierLink(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addItemModifierLink = addItemModifierLink;

var updateItemModifierLink = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var classDescription, updatedRank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);

            if (req.body.name) {
              _context3.next = 3;
              break;
            }

            throw new Error("Name is required");

          case 3:
            if (req.body.itemType) {
              _context3.next = 5;
              break;
            }

            throw new Error("itemType is required");

          case 5:
            _context3.next = 7;
            return _models["default"].ItemModifierItemType.findOne({
              where: {
                id: req.body.id
              }
            });

          case 7:
            classDescription = _context3.sent;
            _context3.next = 10;
            return classDescription.update({
              itemModifierId: req.body.itemModifier,
              itemTypeId: req.body.itemTypeId
            });

          case 10:
            updatedRank = _context3.sent;
            res.locals.name = 'updateClassDescription';
            _context3.next = 14;
            return _models["default"].ItemModifierItemType.findOne({
              where: {
                id: updatedRank.id
              },
              include: [{
                model: _models["default"].itemModifier,
                as: 'itemModifier'
              }, {
                model: _models["default"].itemType,
                as: 'itemType'
              }]
            });

          case 14:
            res.locals.result = _context3.sent;
            next();

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateItemModifierLink(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateItemModifierLink = updateItemModifierLink;

var removeItemModifierLink = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var classDescription;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].ItemModifierItemType.findOne({
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

  return function removeItemModifierLink(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeItemModifierLink = removeItemModifierLink;