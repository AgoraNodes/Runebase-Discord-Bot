"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateServer = exports.fetchServers = exports.banServer = exports.activateDeactivateRealm = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var banServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var group;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].group.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            group = _context.sent;
            res.locals.name = 'banServer';
            _context.next = 6;
            return group.update({
              banned: !group.banned,
              banMessage: req.body.banMessage
            });

          case 6:
            res.locals.result = _context.sent;
            next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function banServer(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.banServer = banServer;

var fetchServers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userOptions, options;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userOptions = {};

            if (req.body.platform !== 'all') {
              if (req.body.platform === 'telegram') {
                userOptions.groupId = (0, _defineProperty2["default"])({}, _sequelize.Op.startsWith, 'telegram-');
              }

              if (req.body.platform === 'discord') {
                userOptions.groupId = (0, _defineProperty2["default"])({}, _sequelize.Op.startsWith, 'discord-');
              }
            }

            if (req.body.id !== '') {
              userOptions.id = Number(req.body.id);
            }

            if (req.body.groupId !== '') {
              userOptions.groupId = req.body.groupId;
            }

            options = {
              order: [['id', 'DESC']],
              limit: req.body.limit,
              offset: req.body.offset,
              where: userOptions
            };
            res.locals.name = 'server';
            _context2.next = 8;
            return _models["default"].group.count(options);

          case 8:
            res.locals.count = _context2.sent;
            _context2.next = 11;
            return _models["default"].group.findAll(options);

          case 11:
            res.locals.result = _context2.sent;
            console.log(res.locals.result);
            next();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchServers(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchServers = fetchServers;

var updateServer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var server, updatedGroup;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.body.id) {
              _context3.next = 2;
              break;
            }

            throw new Error("id is required");

          case 2:
            if (req.body.inviteLink) {
              _context3.next = 4;
              break;
            }

            throw new Error("inviteLink is required");

          case 4:
            if (req.body.expRewardChannelId) {
              _context3.next = 6;
              break;
            }

            throw new Error("expRewardChannelId is required");

          case 6:
            _context3.next = 8;
            return _models["default"].group.findOne({
              where: {
                id: req.body.id
              }
            });

          case 8:
            server = _context3.sent;
            _context3.next = 11;
            return server.update({
              name: req.body.name,
              inviteLink: req.body.inviteLink,
              expRewardChannelId: req.body.expRewardChannelId
            });

          case 11:
            updatedGroup = _context3.sent;
            res.locals.name = 'updateRank';
            _context3.next = 15;
            return _models["default"].group.findOne({
              where: {
                id: updatedGroup.id
              }
            });

          case 15:
            res.locals.result = _context3.sent;
            next();

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateServer(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateServer = updateServer;

var activateDeactivateRealm = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var group;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].group.findOne({
              where: {
                id: req.body.id
              }
            });

          case 2:
            group = _context4.sent;
            res.locals.name = 'banServer';
            _context4.next = 6;
            return group.update({
              activeRealm: !group.activeRealm
            });

          case 6:
            res.locals.result = _context4.sent;
            next();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function activateDeactivateRealm(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.activateDeactivateRealm = activateDeactivateRealm;