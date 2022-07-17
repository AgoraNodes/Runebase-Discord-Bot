"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserCurrentSelectedSkills = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// ARGUMENTS //
// userId: discord user id,
// needInventory: true || false
var fetchUserCurrentSelectedSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var t,
        user,
        userCurrentSelectedSkill,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
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
            return _models["default"].UserGroupClass.findOne(_objectSpread(_objectSpread({
              where: {
                // classId: { [Op.col]: 'user.currentClassId' },
                classId: user.currentClassId,
                '$UserGroup.groupId$': user.currentRealmId // userId: user.id,

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
                }
              }, {
                model: _models["default"].UserGroupClassSkill,
                as: 'UserGroupClassSkills',
                include: [{
                  model: _models["default"].skill,
                  as: 'skill'
                }]
              }, {
                model: _models["default"].UserGroupClassSkill,
                as: 'selectedMainSkill',
                include: [{
                  model: _models["default"].skill,
                  as: 'skill',
                  include: [{
                    model: _models["default"].skillTree,
                    as: 'skillTree',
                    include: [{
                      model: _models["default"]["class"],
                      as: 'class'
                    }]
                  }]
                }]
              }, {
                model: _models["default"].UserGroupClassSkill,
                as: 'selectedSecondarySkill',
                include: [{
                  model: _models["default"].skill,
                  as: 'skill',
                  include: [{
                    model: _models["default"].skillTree,
                    as: 'skillTree',
                    include: [{
                      model: _models["default"]["class"],
                      as: 'class'
                    }]
                  }]
                }]
              }]
            }));

          case 6:
            userCurrentSelectedSkill = _context.sent;
            console.log(userCurrentSelectedSkill);
            return _context.abrupt("return", userCurrentSelectedSkill);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchUserCurrentSelectedSkills(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchUserCurrentSelectedSkills = fetchUserCurrentSelectedSkills;