"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSkillTree = exports.fetchSkillTrees = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var fetchSkillTrees = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              order: [['classId', 'DESC']],
              include: [{
                model: _models["default"]["class"],
                as: 'class'
              }]
            };
            console.log('skillTree');
            res.locals.name = 'skilltree';
            _context.next = 5;
            return _models["default"].skillTree.count(options);

          case 5:
            res.locals.count = _context.sent;
            _context.next = 8;
            return _models["default"].skillTree.findAll(options);

          case 8:
            res.locals.result = _context.sent;
            console.log(res.locals.result);
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchSkillTrees(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchSkillTrees = fetchSkillTrees;

var updateSkillTree = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var itemBase, updatedRank;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            console.log('updateItemBase');

            if (req.body.name) {
              _context2.next = 4;
              break;
            }

            throw new Error("Name is required");

          case 4:
            if (req.body.itemFamilyId) {
              _context2.next = 6;
              break;
            }

            throw new Error("itemFamily is required");

          case 6:
            if (req.body.itemDifficultyId) {
              _context2.next = 8;
              break;
            }

            throw new Error("itemDifficulty is required");

          case 8:
            _context2.next = 10;
            return _models["default"].itemBase.findOne({
              where: {
                id: req.body.id
              }
            });

          case 10:
            itemBase = _context2.sent;
            console.log(itemBase);
            console.log(Number(req.body.levelMonster));
            console.log(Number(req.body.minDefense));
            console.log('req.body.sqdsqd');
            _context2.next = 17;
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
            updatedRank = _context2.sent;
            console.log(updatedRank);
            res.locals.name = 'updateItemBase';
            _context2.next = 22;
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
            res.locals.result = _context2.sent;
            next();

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateSkillTree(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateSkillTree = updateSkillTree;