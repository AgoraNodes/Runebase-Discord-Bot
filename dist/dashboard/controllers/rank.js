"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRank = exports.removeRank = exports.fetchRanks = exports.addRank = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var updateRank = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var rank, updatedRank;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.name) {
              _context.next = 2;
              break;
            }

            throw new Error("Name is required");

          case 2:
            if (req.body.expNeeded) {
              _context.next = 4;
              break;
            }

            throw new Error("expNeeded is required");

          case 4:
            if (req.body.roleId) {
              _context.next = 6;
              break;
            }

            throw new Error("roleId is required");

          case 6:
            _context.next = 8;
            return _models["default"].rank.findOne({
              where: {
                id: req.body.id
              }
            });

          case 8:
            rank = _context.sent;
            _context.next = 11;
            return rank.update({
              name: req.body.name,
              expNeeded: req.body.expNeeded,
              discordRankRoleId: req.body.roleId
            });

          case 11:
            updatedRank = _context.sent;
            res.locals.name = 'updateRank';
            _context.next = 15;
            return _models["default"].rank.findOne({
              where: {
                id: updatedRank.id
              }
            });

          case 15:
            res.locals.result = _context.sent;
            next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateRank(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateRank = updateRank;

var removeRank = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var rank;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].rank.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            rank = _context2.sent;
            res.locals.name = 'removeRank';
            res.locals.result = rank;
            rank.destroy();
            next();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function removeRank(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeRank = removeRank;

var fetchRanks = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              order: [['id', 'DESC']]
            };
            res.locals.name = 'fetchRanks';
            _context3.next = 4;
            return _models["default"].rank.count(options);

          case 4:
            res.locals.count = _context3.sent;
            _context3.next = 7;
            return _models["default"].rank.findAll(options);

          case 7:
            res.locals.result = _context3.sent;
            next();

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchRanks(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchRanks = fetchRanks;

var addRank = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var rank;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(req.body);

            if (req.body.name) {
              _context4.next = 3;
              break;
            }

            throw new Error("Name is required");

          case 3:
            if (req.body.expNeeded) {
              _context4.next = 5;
              break;
            }

            throw new Error("ExpNeeded is required");

          case 5:
            if (req.body.roleId) {
              _context4.next = 7;
              break;
            }

            throw new Error("RoleId is required");

          case 7:
            _context4.next = 9;
            return _models["default"].rank.findOne({
              where: {
                name: req.body.name
              }
            });

          case 9:
            rank = _context4.sent;

            if (!rank) {
              _context4.next = 12;
              break;
            }

            throw new Error("Already Exists");

          case 12:
            res.locals.name = 'addRank';
            _context4.next = 15;
            return _models["default"].rank.create({
              name: req.body.name,
              expNeeded: req.body.expNeeded,
              discordRankRoleId: req.body.roleId
            });

          case 15:
            res.locals.result = _context4.sent;
            next();

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addRank(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addRank = addRank;