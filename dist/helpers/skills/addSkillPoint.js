"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSkillPoint = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

var _messages = require("../../messages");

var addSkillPoint = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userCurrentCharacter, skillToAddId, io, queue) {
    var activity, failAddSkillReason, myUpdatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activity = [];
            _context4.next = 3;
            return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _models["default"].sequelize.transaction({
                        isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                      }, /*#__PURE__*/function () {
                        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                          var findUserRank, sumOfSkills, findSkillToAdd, findUserSkillToAdd, findAllUserSkills, userHasPreviousSkills, userHasSkillOne, _userHasSkillOne, userHasSkillTwo, preActivity, finalActivity;

                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _models["default"].UserRank.findOne({
                                    where: {
                                      userId: userCurrentCharacter.user.id
                                    },
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 2:
                                  findUserRank = _context.sent;
                                  _context.next = 5;
                                  return _models["default"].UserClassSkill.findAll({
                                    attributes: ['userClassId', [_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('points')), 'totalSpendPoints']],
                                    where: {
                                      userClassId: userCurrentCharacter.id
                                    },
                                    group: ['userClassId'],
                                    raw: true,
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 5:
                                  sumOfSkills = _context.sent;

                                  if (findUserRank) {
                                    _context.next = 9;
                                    break;
                                  }

                                  failAddSkillReason = 'Unable to add skills, user has no rank!';
                                  return _context.abrupt("return");

                                case 9:
                                  if (!(findUserRank.id >= sumOfSkills && sumOfSkills.length !== 0)) {
                                    _context.next = 12;
                                    break;
                                  }

                                  failAddSkillReason = 'User already spend all of the skillpoints!';
                                  return _context.abrupt("return");

                                case 12:
                                  _context.next = 14;
                                  return _models["default"].skill.findOne({
                                    where: {
                                      id: skillToAddId
                                    },
                                    include: [{
                                      model: _models["default"].skill,
                                      as: 'PreviousSkill'
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 14:
                                  findSkillToAdd = _context.sent;

                                  if (!(findUserRank.rankId < findSkillToAdd.level)) {
                                    _context.next = 18;
                                    break;
                                  }

                                  failAddSkillReason = 'Unable to add, user has insuffiecent level!';
                                  return _context.abrupt("return");

                                case 18:
                                  _context.next = 20;
                                  return _models["default"].UserClassSkill.findOne({
                                    where: {
                                      userClassId: userCurrentCharacter.id,
                                      skillId: skillToAddId
                                    },
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 20:
                                  findUserSkillToAdd = _context.sent;

                                  if (!(findUserSkillToAdd && findUserSkillToAdd.points >= 20)) {
                                    _context.next = 24;
                                    break;
                                  }

                                  failAddSkillReason = 'skill already maxed out!';
                                  return _context.abrupt("return");

                                case 24:
                                  _context.next = 26;
                                  return _models["default"].UserClassSkill.findAll({
                                    where: {
                                      userClassId: userCurrentCharacter.id
                                    },
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 26:
                                  findAllUserSkills = _context.sent;
                                  userHasPreviousSkills = true; // check if user has the previous skills

                                  if (findSkillToAdd.PreviousSkill.length === 1) {
                                    userHasSkillOne = findAllUserSkills.find(function (o) {
                                      return o.skillId === findSkillToAdd.PreviousSkill[0].id;
                                    });

                                    if (!userHasSkillOne) {
                                      userHasPreviousSkills = false;
                                    }
                                  }

                                  if (findSkillToAdd.PreviousSkill.length === 2) {
                                    _userHasSkillOne = findAllUserSkills.find(function (o) {
                                      return o.skillId === findSkillToAdd.PreviousSkill[0].id;
                                    });
                                    userHasSkillTwo = findAllUserSkills.find(function (o) {
                                      return o.skillId === findSkillToAdd.PreviousSkill[1].id;
                                    });

                                    if (!_userHasSkillOne || !userHasSkillTwo) {
                                      userHasPreviousSkills = false;
                                    }
                                  }

                                  if (userHasPreviousSkills) {
                                    _context.next = 33;
                                    break;
                                  }

                                  failAddSkillReason = 'user doesnt have the prerequisite skills!';
                                  return _context.abrupt("return");

                                case 33:
                                  if (findUserSkillToAdd) {
                                    _context.next = 38;
                                    break;
                                  }

                                  _context.next = 36;
                                  return _models["default"].UserClassSkill.create({
                                    UserClassId: userCurrentCharacter.id,
                                    skillId: skillToAddId,
                                    points: 1
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 36:
                                  _context.next = 40;
                                  break;

                                case 38:
                                  _context.next = 40;
                                  return findUserSkillToAdd.update({
                                    points: findUserSkillToAdd.points + 1
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 40:
                                  _context.next = 42;
                                  return _models["default"].activity.create({
                                    type: 'destroyItem_s',
                                    earnerId: userCurrentCharacter.user.id
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 42:
                                  preActivity = _context.sent;
                                  _context.next = 45;
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

                                case 45:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 47:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x5) {
                          return _ref3.apply(this, arguments);
                        };
                      }())["catch"]( /*#__PURE__*/function () {
                        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  console.log(err);
                                  _context2.prev = 1;
                                  _context2.next = 4;
                                  return _models["default"].error.create({
                                    type: 'addSkillPoint',
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

                        return function (_x6) {
                          return _ref4.apply(this, arguments);
                        };
                      }());

                    case 2:
                      if (activity.length > 0) {
                        io.to('admin').emit('updateActivity', {
                          activity: activity
                        });
                      }

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));

          case 3:
            _context4.next = 5;
            return _models["default"].UserClass.findOne({
              where: {
                classId: userCurrentCharacter.user.currentClassId
              },
              include: [{
                model: _models["default"].UserClassSkill,
                as: 'UserClassSkills',
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
                model: _models["default"].user,
                as: 'user',
                where: {
                  id: "".concat(userCurrentCharacter.user.id)
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

          case 5:
            myUpdatedUser = _context4.sent;
            return _context4.abrupt("return", [myUpdatedUser, failAddSkillReason]);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addSkillPoint(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.addSkillPoint = addSkillPoint;