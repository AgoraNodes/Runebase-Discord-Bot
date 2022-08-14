"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equipItem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

var _calcStrengthDexforReq = require("./calcStrengthDexforReq");

var _Helm = require("./equip/Helm");

var _Armor = require("./equip/Armor");

var _OffHand = require("./equip/OffHand");

var _Belt = require("./equip/Belt");

var _Boots = require("./equip/Boots");

var _Gloves = require("./equip/Gloves");

var _Amulet = require("./equip/Amulet");

var _MainHand = require("./equip/MainHand");

var _Rings = require("./equip/Rings");

var _character = require("../character/character");

var equipItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userCurrentCharacter, itemId, discordChannel, io, queue) {
    var activity, cannotEquip, cannotEquipReason, findItemToEquip, myUpdatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activity = [];
            cannotEquipReason = '';
            _context4.next = 4;
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
                          var findUserCharacter, _yield$calcStrengthDe, _yield$calcStrengthDe2, userStrength, userDexterity, findItemToEquip, preActivity, finalActivity;

                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  console.log('eq 1'); // const findUserCharacter = await fetchUserCurrentCharacter(
                                  //   userCurrentCharacter.UserGroup.user.user_id, // user discord id
                                  //   false, // Need inventory?
                                  //   t,
                                  // );

                                  _context.next = 3;
                                  return _models["default"].UserGroupClass.findOne({
                                    where: {
                                      id: userCurrentCharacter.id // '$UserGroup.group.id$': userCurrentCharacter.currentRealmId,

                                    },
                                    include: [{
                                      model: _models["default"].UserGroup,
                                      as: 'UserGroup',
                                      include: [{
                                        model: _models["default"].UserGroupRank,
                                        as: 'UserGroupRank',
                                        include: [{
                                          model: _models["default"].rank,
                                          as: 'rank'
                                        }]
                                      }, {
                                        model: _models["default"].group,
                                        as: 'group'
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
                                      model: _models["default"].equipment,
                                      as: 'equipment',
                                      include: [{
                                        model: _models["default"].item,
                                        as: 'helm'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'armor'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'amulet'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'mainHand',
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
                                        }]
                                      }, {
                                        model: _models["default"].item,
                                        as: 'offHand',
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
                                        }]
                                      }, {
                                        model: _models["default"].item,
                                        as: 'gloves'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'belt'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'boots'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'ringSlotOne'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'ringSlotTwo'
                                      }]
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 3:
                                  findUserCharacter = _context.sent;
                                  console.log('eq 2');
                                  _context.next = 7;
                                  return (0, _calcStrengthDexforReq.calcStrengthDexforReq)(findUserCharacter);

                                case 7:
                                  _yield$calcStrengthDe = _context.sent;
                                  _yield$calcStrengthDe2 = (0, _slicedToArray2["default"])(_yield$calcStrengthDe, 2);
                                  userStrength = _yield$calcStrengthDe2[0];
                                  userDexterity = _yield$calcStrengthDe2[1];
                                  console.log('eq 3');
                                  _context.next = 14;
                                  return _models["default"].item.findOne({
                                    where: {
                                      id: itemId,
                                      inventoryId: userCurrentCharacter.inventoryId
                                    },
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
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 14:
                                  findItemToEquip = _context.sent;
                                  console.log('eq 4');

                                  if (!(findItemToEquip.itemBase.strengthReq && userStrength < findItemToEquip.itemBase.strengthReq)) {
                                    _context.next = 20;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low Strength';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 20:
                                  if (!(findItemToEquip.itemBase.dexterityReq && userDexterity < findItemToEquip.itemBase.dexterityReq)) {
                                    _context.next = 24;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low Dexterity';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 24:
                                  if (!(findItemToEquip.levelReq && findUserCharacter.user.UserRank.id < findItemToEquip.levelReq)) {
                                    _context.next = 28;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low level';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 28:
                                  console.log(userCurrentCharacter.UserGroup.user.currentClass.name);

                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Wizard Orbs' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Wizard' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Paladin' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Necromancer' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Amazon' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Assassin Katars' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Assassin' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Druid' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms' && userCurrentCharacter.UserGroup.user.currentClass.name !== 'Warrior')) {
                                    _context.next = 33;
                                    break;
                                  }

                                  cannotEquipReason = 'Cannot Equip with this class';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 33:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Helms' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Circlets' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms')) {
                                    _context.next = 36;
                                    break;
                                  }

                                  _context.next = 36;
                                  return (0, _Helm.equipHelm)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 36:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Belts')) {
                                    _context.next = 39;
                                    break;
                                  }

                                  _context.next = 39;
                                  return (0, _Belt.equipBelt)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 39:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Gloves')) {
                                    _context.next = 42;
                                    break;
                                  }

                                  _context.next = 42;
                                  return (0, _Gloves.equipGloves)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 42:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Boots')) {
                                    _context.next = 45;
                                    break;
                                  }

                                  _context.next = 45;
                                  return (0, _Boots.equipBoots)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 45:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Rings')) {
                                    _context.next = 48;
                                    break;
                                  }

                                  _context.next = 48;
                                  return (0, _Rings.equipRing)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 48:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Amulets')) {
                                    _context.next = 51;
                                    break;
                                  }

                                  _context.next = 51;
                                  return (0, _Amulet.equipAmulet)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 51:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Armors')) {
                                    _context.next = 54;
                                    break;
                                  }

                                  _context.next = 54;
                                  return (0, _Armor.equipArmor)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 54:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Shields' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Wizard Orbs' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads')) {
                                    _context.next = 57;
                                    break;
                                  }

                                  _context.next = 57;
                                  return (0, _OffHand.equipOffHand)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 57:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Axes' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Bows' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Crossbows' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Daggers' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Javelins' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Maces' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Polearms' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Scepters' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Spears' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Staves' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Swords' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Throwing' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Wands' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Assassin Katars' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons')) {
                                    _context.next = 60;
                                    break;
                                  }

                                  _context.next = 60;
                                  return (0, _MainHand.equipMainHand)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 60:
                                  _context.next = 62;
                                  return _models["default"].activity.create({
                                    type: 'equipItem_s',
                                    earnerId: userCurrentCharacter.UserGroup.user.id
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 62:
                                  preActivity = _context.sent;
                                  _context.next = 65;
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

                                case 65:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 67:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x6) {
                          return _ref3.apply(this, arguments);
                        };
                      }())["catch"]( /*#__PURE__*/function () {
                        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  console.log('error during equiping transaction');
                                  console.log(err);
                                  _context2.prev = 2;
                                  _context2.next = 5;
                                  return _models["default"].error.create({
                                    type: 'equipItem',
                                    error: "".concat(err)
                                  });

                                case 5:
                                  _context2.next = 10;
                                  break;

                                case 7:
                                  _context2.prev = 7;
                                  _context2.t0 = _context2["catch"](2);

                                  _logger["default"].error("Error Discord: ".concat(_context2.t0));

                                case 10:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, null, [[2, 7]]);
                        }));

                        return function (_x7) {
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

          case 4:
            _context4.next = 6;
            return _models["default"].UserGroupClass.findOne({
              where: {
                id: userCurrentCharacter.id // classId: userCurrentCharacter.UserGroup.user.currentClassId,
                // '$UserGroup.group.id$': userCurrentCharacter.currentRealmId,

              },
              include: [{
                model: _models["default"].UserGroup,
                as: 'UserGroup',
                include: [{
                  model: _models["default"].UserGroupRank,
                  as: 'UserGroupRank',
                  include: [{
                    model: _models["default"].rank,
                    as: 'rank'
                  }]
                }, {
                  model: _models["default"].group,
                  as: 'group'
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
              }]
            });

          case 6:
            myUpdatedUser = _context4.sent;
            console.log('done equiping');
            return _context4.abrupt("return", [myUpdatedUser, findItemToEquip, cannotEquip, cannotEquipReason]);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function equipItem(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.equipItem = equipItem;