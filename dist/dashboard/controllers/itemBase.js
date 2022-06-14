"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemBase = exports.removeItemBase = exports.fetchItemBases = exports.addItemBase = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var fetchItemBases = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              order: [['id', 'DESC']],
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily'
              }, {
                model: _models["default"].itemDifficulty,
                as: 'itemDifficulty'
              }]
            };
            res.locals.name = 'itemBase';
            _context.next = 4;
            return _models["default"].itemBase.count(options);

          case 4:
            res.locals.count = _context.sent;
            _context.next = 7;
            return _models["default"].itemBase.findAll(options);

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

  return function fetchItemBases(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchItemBases = fetchItemBases;

var addItemBase = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var itemBase, newItemFamily;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);

            if (req.body.name) {
              _context2.next = 3;
              break;
            }

            throw new Error("Name is required");

          case 3:
            if (req.body.itemFamily) {
              _context2.next = 5;
              break;
            }

            throw new Error("itemFamily is required");

          case 5:
            if (req.body.itemDifficulty) {
              _context2.next = 7;
              break;
            }

            throw new Error("itemDifficulty is required");

          case 7:
            _context2.next = 9;
            return _models["default"].itemBase.findOne({
              where: {
                name: req.body.name
              }
            });

          case 9:
            itemBase = _context2.sent;

            if (!itemBase) {
              _context2.next = 12;
              break;
            }

            throw new Error("Already Exists");

          case 12:
            if (!(itemBase && itemBase.itemFamilyId === req.body.itemFamilyId && itemBase && itemBase.itemDifficultyId === req.body.itemDifficultyId)) {
              _context2.next = 14;
              break;
            }

            throw new Error("Already Exists");

          case 14:
            _context2.next = 16;
            return _models["default"].itemBase.create({
              name: req.body.name,
              itemFamilyId: req.body.itemFamily,
              itemDifficultyId: req.body.itemDifficulty,
              levelReq: Number(req.body.levelReq),
              strengthReq: Number(req.body.strengthReq),
              dexterityReq: Number(req.body.dexterityReq),
              levelMonster: Number(req.body.levelMonster),
              durability: Number(req.body.durability),
              sockets: Number(req.body.sockets),
              minDefense: Number(req.body.minDefense),
              maxDefense: Number(req.body.maxDefense),
              minDamage: Number(req.body.minDamage),
              maxDamage: Number(req.body.maxDamage)
            });

          case 16:
            newItemFamily = _context2.sent;
            res.locals.name = 'addItemBase';
            _context2.next = 20;
            return _models["default"].itemBase.findOne({
              where: {
                id: newItemFamily.id
              },
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily'
              }, {
                model: _models["default"].itemDifficulty,
                as: 'itemDifficulty'
              }]
            });

          case 20:
            res.locals.result = _context2.sent;
            next();

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addItemBase(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addItemBase = addItemBase;

var updateItemBase = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var itemBase, updatedRank;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);
            console.log('updateItemBase');

            if (req.body.name) {
              _context3.next = 4;
              break;
            }

            throw new Error("Name is required");

          case 4:
            if (req.body.itemFamilyId) {
              _context3.next = 6;
              break;
            }

            throw new Error("itemFamily is required");

          case 6:
            if (req.body.itemDifficultyId) {
              _context3.next = 8;
              break;
            }

            throw new Error("itemDifficulty is required");

          case 8:
            _context3.next = 10;
            return _models["default"].itemBase.findOne({
              where: {
                id: req.body.id
              }
            });

          case 10:
            itemBase = _context3.sent;
            console.log(itemBase);
            console.log(Number(req.body.levelMonster));
            console.log(Number(req.body.minDefense));
            console.log('req.body.sqdsqd');
            _context3.next = 17;
            return itemBase.update({
              name: req.body.name,
              itemFamilyId: req.body.itemFamilyId,
              itemDifficultyId: req.body.itemDifficultyId,
              levelReq: Number(req.body.levelReq),
              strengthReq: Number(req.body.strengthReq),
              dexterityReq: Number(req.body.dexterityReq),
              levelMonster: Number(req.body.levelMonster),
              durability: Number(req.body.durability),
              sockets: Number(req.body.sockets),
              minDefense: Number(req.body.minDefense),
              maxDefense: Number(req.body.maxDefense),
              minDamage: Number(req.body.minDamage),
              maxDamage: Number(req.body.maxDamage)
            });

          case 17:
            updatedRank = _context3.sent;
            console.log(updatedRank);
            res.locals.name = 'updateItemBase';
            _context3.next = 22;
            return _models["default"].itemBase.findOne({
              where: {
                id: updatedRank.id
              },
              include: [{
                model: _models["default"].itemFamily,
                as: 'itemFamily'
              }, {
                model: _models["default"].itemDifficulty,
                as: 'itemDifficulty'
              }]
            });

          case 22:
            res.locals.result = _context3.sent;
            next();

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateItemBase(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateItemBase = updateItemBase;

var removeItemBase = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var itemBase;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].itemBase.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            itemBase = _context4.sent;
            res.locals.name = 'removeItemBase';
            res.locals.result = itemBase;
            itemBase.destroy();
            next();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removeItemBase(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeItemBase = removeItemBase;