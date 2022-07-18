"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyItem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

// import {
//   cannotSendMessageUser,
//   discordErrorMessage,
// } from '../../embeds';
var destroyItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userCurrentCharacter, itemId, discordChannel, io, queue) {
    var activity, findItemToDestroy, myUpdatedUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activity = [];
            _context3.next = 3;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                var unlinkItemFromUser, preActivity, finalActivity;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _models["default"].item.findOne({
                          where: {
                            id: itemId,
                            inventoryId: userCurrentCharacter.inventoryId
                          },
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 2:
                        findItemToDestroy = _context.sent;
                        unlinkItemFromUser = findItemToDestroy.update({
                          inventoryId: null
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });
                        _context.next = 6;
                        return _models["default"].activity.create({
                          type: 'destroyItem_s',
                          earnerId: userCurrentCharacter.UserGroup.user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 6:
                        preActivity = _context.sent;
                        _context.next = 9;
                        return _models["default"].activity.findOne({
                          where: {
                            id: preActivity.id
                          },
                          include: [{
                            model: _models["default"].user,
                            as: 'earner'
                          }],
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 9:
                        finalActivity = _context.sent;
                        activity.unshift(finalActivity);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        console.log(err);
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _models["default"].error.create({
                          type: 'destroyItem',
                          error: "".concat(err)
                        });

                      case 4:
                        _context2.next = 9;
                        break;

                      case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2["catch"](1);

                        _logger["default"].error("Error Discord: ".concat(_context2.t0));

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[1, 6]]);
              }));

              return function (_x7) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

            _context3.next = 6;
            return _models["default"].UserGroupClass.findOne({
              where: {
                id: userCurrentCharacter.id
              },
              include: [{
                model: _models["default"].UserGroup,
                as: 'UserGroup',
                required: true,
                include: [{
                  model: _models["default"].group,
                  as: 'group'
                }, {
                  model: _models["default"].UserGroupRank,
                  as: 'UserGroupRank',
                  include: [{
                    model: _models["default"].rank,
                    as: 'rank'
                  }]
                }, {
                  model: _models["default"].user,
                  as: 'user',
                  include: [{
                    model: _models["default"]["class"],
                    as: 'currentClass'
                  }]
                }]
              }, {
                model: _models["default"].stats,
                as: 'stats'
              }, {
                model: _models["default"].condition,
                as: 'condition'
              }, {
                model: _models["default"].equipment,
                as: 'equipment'
              }, {
                model: _models["default"].inventory,
                as: 'inventory',
                include: [{
                  model: _models["default"].item,
                  as: 'items',
                  required: false,
                  include: [{
                    model: _models["default"].itemBase,
                    as: 'itemBase',
                    include: [{
                      model: _models["default"].itemFamily,
                      as: 'itemFamily',
                      include: [{
                        model: _models["default"].itemType,
                        as: 'itemType'
                      }]
                    }]
                  }, {
                    model: _models["default"].itemQuality,
                    as: 'itemQuality'
                  }]
                }]
              }]
            });

          case 6:
            myUpdatedUser = _context3.sent;
            return _context3.abrupt("return", [myUpdatedUser, findItemToDestroy]);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function destroyItem(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.destroyItem = destroyItem;