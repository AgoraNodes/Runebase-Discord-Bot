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

var _character = require("../character/character");

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
                                  return _models["default"].UserGroupRank.findOne({
                                    where: {
                                      // userId: userCurrentCharacter.UserGroup.user.id,
                                      UserGroupId: userCurrentCharacter.UserGroup.id
                                    },
                                    include: [{
                                      model: _models["default"].rank,
                                      as: 'rank'
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 2:
                                  findUserRank = _context.sent;

                                  if (findUserRank) {
                                    _context.next = 6;
                                    break;
                                  }

                                  failAddSkillReason = 'Unable to add skills, user has no rank!';
                                  return _context.abrupt("return");

                                case 6:
                                  // console.log(userCurrentCharacter);
                                  console.log('before user groupclasskillss');
                                  _context.next = 9;
                                  return _models["default"].UserGroupClassSkill.findAll({
                                    attributes: ['UserGroupClassId', [_sequelize.Sequelize.fn('sum', _sequelize.Sequelize.col('points')), 'totalSpendPoints']],
                                    where: {
                                      UserGroupClassId: userCurrentCharacter.id
                                    },
                                    group: ['UserGroupClassId'],
                                    raw: true,
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 9:
                                  sumOfSkills = _context.sent;
                                  console.log(userCurrentCharacter.id);
                                  console.log(sumOfSkills);
                                  console.log('sumOfSkills');

                                  if (!(findUserRank.rank.level <= Number(sumOfSkills[0].totalSpendPoints) - 1 && Number(sumOfSkills[0].totalSpendPoints) !== 0)) {
                                    _context.next = 16;
                                    break;
                                  }

                                  failAddSkillReason = 'User already spend all of the skillpoints!';
                                  return _context.abrupt("return");

                                case 16:
                                  _context.next = 18;
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

                                case 18:
                                  findSkillToAdd = _context.sent;

                                  if (!(findUserRank.rank.level < findSkillToAdd.level)) {
                                    _context.next = 22;
                                    break;
                                  }

                                  failAddSkillReason = 'Unable to add, user has insuffiecent level!';
                                  return _context.abrupt("return");

                                case 22:
                                  console.log(userCurrentCharacter.UserGroup);
                                  console.log('before adding the skill');
                                  _context.next = 26;
                                  return _models["default"].UserGroupClassSkill.findOne({
                                    where: {
                                      userGroupClassId: userCurrentCharacter.id,
                                      skillId: skillToAddId
                                    },
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 26:
                                  findUserSkillToAdd = _context.sent;

                                  if (!(findUserSkillToAdd && findUserSkillToAdd.points >= 20)) {
                                    _context.next = 30;
                                    break;
                                  }

                                  failAddSkillReason = 'skill already maxed out!';
                                  return _context.abrupt("return");

                                case 30:
                                  _context.next = 32;
                                  return _models["default"].UserGroupClassSkill.findAll({
                                    where: {
                                      UserGroupClassId: userCurrentCharacter.id
                                    },
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 32:
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
                                    _context.next = 39;
                                    break;
                                  }

                                  failAddSkillReason = 'user doesnt have the prerequisite skills!';
                                  return _context.abrupt("return");

                                case 39:
                                  if (findUserSkillToAdd) {
                                    _context.next = 44;
                                    break;
                                  }

                                  _context.next = 42;
                                  return _models["default"].UserGroupClassSkill.create({
                                    UserClassId: 1,
                                    // This needs to be removed after successful migrations to new realm based setup
                                    UserGroupClassId: userCurrentCharacter.id,
                                    skillId: skillToAddId,
                                    points: 1
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 42:
                                  _context.next = 46;
                                  break;

                                case 44:
                                  _context.next = 46;
                                  return findUserSkillToAdd.update({
                                    points: findUserSkillToAdd.points + 1
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 46:
                                  _context.next = 48;
                                  return _models["default"].activity.create({
                                    type: 'destroyItem_s',
                                    earnerId: userCurrentCharacter.UserGroup.user.id
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 48:
                                  preActivity = _context.sent;
                                  _context.next = 51;
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

                                case 51:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 53:
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
            return (0, _character.fetchUserCurrentCharacter)(userCurrentCharacter.UserGroup.user.user_id, // user discord id
            false // Need inventory?
            );

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