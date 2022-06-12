"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClass = exports.removeClass = exports.fetchClasses = exports.addClass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var updateClass = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var classChar, updatedRank;
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
            if (req.body.description) {
              _context.next = 4;
              break;
            }

            throw new Error("description is required");

          case 4:
            if (req.body.strength) {
              _context.next = 6;
              break;
            }

            throw new Error("strength is required");

          case 6:
            if (req.body.dexterity) {
              _context.next = 8;
              break;
            }

            throw new Error("dexterity is required");

          case 8:
            if (req.body.vitality) {
              _context.next = 10;
              break;
            }

            throw new Error("vitality is required");

          case 10:
            if (req.body.energy) {
              _context.next = 12;
              break;
            }

            throw new Error("energy is required");

          case 12:
            if (req.body.life) {
              _context.next = 14;
              break;
            }

            throw new Error("energy is required");

          case 14:
            if (req.body.mana) {
              _context.next = 16;
              break;
            }

            throw new Error("energy is required");

          case 16:
            if (req.body.stamina) {
              _context.next = 18;
              break;
            }

            throw new Error("energy is required");

          case 18:
            if (req.body.description) {
              _context.next = 20;
              break;
            }

            throw new Error("energy is required");

          case 20:
            _context.next = 22;
            return _models["default"]["class"].findOne({
              where: {
                id: req.body.id
              }
            });

          case 22:
            classChar = _context.sent;
            _context.next = 25;
            return classChar.update({
              name: req.body.name,
              strength: req.body.strength,
              dexterity: req.body.dexterity,
              vitality: req.body.vitality,
              energy: req.body.energy,
              life: req.body.life,
              mana: req.body.mana,
              stamina: req.body.stamina,
              classDescriptionId: req.body.description
            });

          case 25:
            updatedRank = _context.sent;
            res.locals.name = 'updateChar';
            _context.next = 29;
            return _models["default"]["class"].findOne({
              where: {
                id: updatedRank.id
              },
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription',
                required: false
              }]
            });

          case 29:
            res.locals.result = _context.sent;
            next();

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateClass(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateClass = updateClass;

var removeClass = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var classChar;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"]["class"].findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            classChar = _context2.sent;
            res.locals.name = 'removeClass';
            res.locals.result = classChar;
            classChar.destroy();
            next();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function removeClass(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeClass = removeClass;

var fetchClasses = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              order: [['id', 'DESC']],
              include: [{
                model: _models["default"].classDescription,
                as: 'classDescription',
                required: false
              }]
            };
            res.locals.name = 'fetchClass';
            _context3.next = 4;
            return _models["default"]["class"].count(options);

          case 4:
            res.locals.count = _context3.sent;
            _context3.next = 7;
            return _models["default"]["class"].findAll(options);

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

  return function fetchClasses(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchClasses = fetchClasses;

var addClass = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var classChar;
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
            if (req.body.strength) {
              _context4.next = 5;
              break;
            }

            throw new Error("strength is required");

          case 5:
            if (req.body.dexterity) {
              _context4.next = 7;
              break;
            }

            throw new Error("dexterity is required");

          case 7:
            if (req.body.vitality) {
              _context4.next = 9;
              break;
            }

            throw new Error("vitality is required");

          case 9:
            if (req.body.energy) {
              _context4.next = 11;
              break;
            }

            throw new Error("energy is required");

          case 11:
            if (req.body.life) {
              _context4.next = 13;
              break;
            }

            throw new Error("life is required");

          case 13:
            if (req.body.mana) {
              _context4.next = 15;
              break;
            }

            throw new Error("mana is required");

          case 15:
            if (req.body.stamina) {
              _context4.next = 17;
              break;
            }

            throw new Error("stamina is required");

          case 17:
            if (req.body.description) {
              _context4.next = 19;
              break;
            }

            throw new Error("description is required");

          case 19:
            _context4.next = 21;
            return _models["default"]["class"].findOne({
              where: {
                name: req.body.name
              }
            });

          case 21:
            classChar = _context4.sent;

            if (!classChar) {
              _context4.next = 24;
              break;
            }

            throw new Error("Already Exists");

          case 24:
            res.locals.name = 'addClass';
            _context4.next = 27;
            return _models["default"]["class"].create({
              name: req.body.name,
              strength: Number(req.body.strength),
              dexterity: Number(req.body.dexterity),
              vitality: Number(req.body.vitality),
              energy: Number(req.body.energy),
              life: Number(req.body.life),
              mana: Number(req.body.mana),
              stamina: Number(req.body.stamina),
              classDescriptionId: req.body.description
            });

          case 27:
            res.locals.result = _context4.sent;
            next();

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addClass(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addClass = addClass;