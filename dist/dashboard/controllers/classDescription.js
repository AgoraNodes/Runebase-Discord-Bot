"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClassDescription = exports.removeClassDescription = exports.fetchClassDescriptions = exports.addClassDescription = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var updateClassDescription = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var classDescription, updatedRank;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);

            if (req.body.name) {
              _context.next = 3;
              break;
            }

            throw new Error("Name is required");

          case 3:
            if (req.body.description) {
              _context.next = 5;
              break;
            }

            throw new Error("description is required");

          case 5:
            _context.next = 7;
            return _models["default"].classDescription.findOne({
              where: {
                id: req.body.id
              }
            });

          case 7:
            classDescription = _context.sent;
            _context.next = 10;
            return classDescription.update({
              name: req.body.name,
              description: req.body.description,
              image: req.body.image
            });

          case 10:
            updatedRank = _context.sent;
            res.locals.name = 'updateClassDescription';
            _context.next = 14;
            return _models["default"].classDescription.findOne({
              where: {
                id: updatedRank.id
              }
            });

          case 14:
            res.locals.result = _context.sent;
            next();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateClassDescription(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateClassDescription = updateClassDescription;

var removeClassDescription = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var classDescription;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].classDescription.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            classDescription = _context2.sent;
            res.locals.name = 'removeClassDescription';
            res.locals.result = classDescription;
            classDescription.destroy();
            next();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function removeClassDescription(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeClassDescription = removeClassDescription;

var fetchClassDescriptions = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              order: [['id', 'DESC']]
            };
            res.locals.name = 'fetchClassDescriptions';
            _context3.next = 4;
            return _models["default"].classDescription.count(options);

          case 4:
            res.locals.count = _context3.sent;
            _context3.next = 7;
            return _models["default"].classDescription.findAll(options);

          case 7:
            res.locals.result = _context3.sent;
            console.log(res.locals.result);
            next();

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchClassDescriptions(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchClassDescriptions = fetchClassDescriptions;

var addClassDescription = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var classDescription;
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
            if (req.body.description) {
              _context4.next = 5;
              break;
            }

            throw new Error("description is required");

          case 5:
            _context4.next = 7;
            return _models["default"].classDescription.findOne({
              where: {
                name: req.body.name
              }
            });

          case 7:
            classDescription = _context4.sent;

            if (!classDescription) {
              _context4.next = 10;
              break;
            }

            throw new Error("Already Exists");

          case 10:
            res.locals.name = 'addClassDescription';
            _context4.next = 13;
            return _models["default"].classDescription.create({
              name: req.body.name,
              description: req.body.description,
              image: req.body.image
            });

          case 13:
            res.locals.result = _context4.sent;
            next();

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addClassDescription(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addClassDescription = addClassDescription;