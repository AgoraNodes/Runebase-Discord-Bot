"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserCurrentCharacter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// ARGUMENTS //
// userId: discord user id,
// needInventory: true || false
var fetchUserCurrentCharacter = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, needInventory) {
    var t,
        user,
        userCurrentCharacter,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            _context.next = 3;
            return _models["default"].user.findOne(_objectSpread({
              where: {
                user_id: userId
              }
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 3:
            user = _context.sent;
            _context.next = 6;
            return _models["default"].UserClass.findOne(_objectSpread(_objectSpread({
              where: {
                // classId: { [Op.col]: 'user.currentClassId' },
                classId: user.currentClassId
              }
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]), {}, {
              include: [{
                model: _models["default"].user,
                as: 'user',
                where: {
                  user_id: "".concat(userId)
                },
                include: [{
                  model: _models["default"]["class"],
                  as: 'currentClass'
                }, {
                  model: _models["default"].rank,
                  as: 'ranks'
                }]
              }, {
                model: _models["default"].stats,
                as: 'stats'
              }, {
                model: _models["default"].condition,
                as: 'condition'
              }, {
                model: _models["default"].equipment,
                as: 'equipment',
                include: [{
                  model: _models["default"].item,
                  as: 'helm',
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
                }, {
                  model: _models["default"].item,
                  as: 'amulet',
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
                }, {
                  model: _models["default"].item,
                  as: 'mainHand',
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
                }, {
                  model: _models["default"].item,
                  as: 'offHand',
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
                }, {
                  model: _models["default"].item,
                  as: 'armor',
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
                }, {
                  model: _models["default"].item,
                  as: 'gloves',
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
                }, {
                  model: _models["default"].item,
                  as: 'boots',
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
                }, {
                  model: _models["default"].item,
                  as: 'belt',
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
                }, {
                  model: _models["default"].item,
                  as: 'ringSlotOne',
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
                }, {
                  model: _models["default"].item,
                  as: 'ringSlotTwo',
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
              }].concat((0, _toConsumableArray2["default"])(needInventory ? [{
                model: _models["default"].inventory,
                as: 'inventory',
                include: [{
                  model: _models["default"].item,
                  as: 'items',
                  required: false,
                  separate: true,
                  order: [['updatedAt', 'DESC']],
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
              }] : []))
            }));

          case 6:
            userCurrentCharacter = _context.sent;
            return _context.abrupt("return", userCurrentCharacter);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchUserCurrentCharacter(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchUserCurrentCharacter = fetchUserCurrentCharacter;