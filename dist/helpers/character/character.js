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
            console.log(user.currentRealmId);
            console.log(user.currentClassId);
            console.log('user current ids');
            _context.next = 9;
            return _models["default"].UserGroupClass.findOne(_objectSpread(_objectSpread({
              where: {
                // classId: { [Op.col]: 'user.currentClassId' },
                classId: user.currentClassId,
                '$UserGroup.groupId$': user.currentRealmId // groupId: user.currentRealmId,

              }
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]), {}, {
              include: [{
                model: _models["default"].UserGroup,
                as: 'UserGroup',
                required: true,
                where: {
                  groupId: user.currentRealmId
                },
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
                  where: {
                    user_id: "".concat(userId)
                  },
                  include: [{
                    model: _models["default"]["class"],
                    as: 'currentClass'
                  }]
                }]
              }, {
                model: _models["default"].buff,
                as: 'buffs',
                separate: true
              }, {
                model: _models["default"].debuff,
                as: 'debuffs',
                separate: true
              }, {
                model: _models["default"].UserGroupClassSkill,
                as: 'UserGroupClassSkills',
                include: [{
                  model: _models["default"].skill,
                  as: 'skill'
                }],
                separate: true
              }, {
                model: _models["default"]["class"],
                as: 'class',
                include: [{
                  model: _models["default"].skillTree,
                  as: 'skillTrees',
                  separate: true,
                  include: [{
                    model: _models["default"].skill,
                    as: 'skills',
                    include: [{
                      model: _models["default"].skill,
                      as: 'PreviousSkill'
                    }]
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

          case 9:
            userCurrentCharacter = _context.sent;
            console.log(userCurrentCharacter); // console.log(userCurrentCharacter.UserGroup);

            return _context.abrupt("return", userCurrentCharacter);

          case 12:
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