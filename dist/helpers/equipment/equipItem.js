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
                                  _context.next = 2;
                                  return _models["default"].UserClass.findOne({
                                    where: {
                                      id: userCurrentCharacter.id
                                    },
                                    include: [{
                                      model: _models["default"].user,
                                      as: 'user',
                                      include: [{
                                        model: _models["default"]["class"],
                                        as: 'currentClass'
                                      }, {
                                        model: _models["default"].UserRank,
                                        as: 'UserRank'
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
                                        as: 'mainHand'
                                      }, {
                                        model: _models["default"].item,
                                        as: 'offHand'
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

                                case 2:
                                  findUserCharacter = _context.sent;
                                  _context.next = 5;
                                  return (0, _calcStrengthDexforReq.calcStrengthDexforReq)(findUserCharacter);

                                case 5:
                                  _yield$calcStrengthDe = _context.sent;
                                  _yield$calcStrengthDe2 = (0, _slicedToArray2["default"])(_yield$calcStrengthDe, 2);
                                  userStrength = _yield$calcStrengthDe2[0];
                                  userDexterity = _yield$calcStrengthDe2[1];
                                  _context.next = 11;
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

                                case 11:
                                  findItemToEquip = _context.sent;

                                  if (!(findItemToEquip.itemBase.strengthReq && userStrength < findItemToEquip.itemBase.strengthReq)) {
                                    _context.next = 16;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low Strength';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 16:
                                  if (!(findItemToEquip.itemBase.dexterityReq && userDexterity < findItemToEquip.itemBase.dexterityReq)) {
                                    _context.next = 20;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low Dexterity';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 20:
                                  if (!(findItemToEquip.levelReq && findUserCharacter.user.UserRank.id < findItemToEquip.levelReq)) {
                                    _context.next = 24;
                                    break;
                                  }

                                  cannotEquipReason = 'Too low level';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 24:
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log(userCurrentCharacter.user.currentClass.name);
                                  console.log('userCurrentCharacter.user.currentClass.name');

                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Sorceress Orbs' && userCurrentCharacter.user.currentClass.name !== 'Sorceress' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields' && userCurrentCharacter.user.currentClass.name !== 'Paladin' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads' && userCurrentCharacter.user.currentClass.name !== 'Necromancer' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons' && userCurrentCharacter.user.currentClass.name !== 'Amazon' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Assasin Katars' && userCurrentCharacter.user.currentClass.name !== 'Assasin' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts' && userCurrentCharacter.user.currentClass.name !== 'Druid' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Barbarian Helms' && userCurrentCharacter.user.currentClass.name !== 'Barbarian')) {
                                    _context.next = 49;
                                    break;
                                  }

                                  cannotEquipReason = 'Cannot Equip with this class';
                                  cannotEquip = true;
                                  return _context.abrupt("return");

                                case 49:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Helms' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Circlets' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Barbarian Helms')) {
                                    _context.next = 52;
                                    break;
                                  }

                                  _context.next = 52;
                                  return (0, _Helm.equipHelm)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 52:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Belts')) {
                                    _context.next = 55;
                                    break;
                                  }

                                  _context.next = 55;
                                  return (0, _Belt.equipBelt)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 55:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Gloves')) {
                                    _context.next = 58;
                                    break;
                                  }

                                  _context.next = 58;
                                  return (0, _Gloves.equipGloves)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 58:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Boots')) {
                                    _context.next = 61;
                                    break;
                                  }

                                  _context.next = 61;
                                  return (0, _Boots.equipBoots)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 61:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Rings')) {
                                    _context.next = 64;
                                    break;
                                  }

                                  _context.next = 64;
                                  return (0, _Rings.equipRing)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 64:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Amulets')) {
                                    _context.next = 67;
                                    break;
                                  }

                                  _context.next = 67;
                                  return (0, _Amulet.equipAmulet)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 67:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Armors')) {
                                    _context.next = 70;
                                    break;
                                  }

                                  _context.next = 70;
                                  return (0, _Armor.equipArmor)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 70:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Shields' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Sorceress Orbs' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads')) {
                                    _context.next = 73;
                                    break;
                                  }

                                  _context.next = 73;
                                  return (0, _OffHand.equipOffHand)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 73:
                                  if (!(findItemToEquip.itemBase.itemFamily.itemType.name === 'Axes' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Bows' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Crossbows' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Daggers' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Javelins' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Maces' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Polearms' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Scepters' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Spears' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Staves' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Swords' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Throwing' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Wands' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Assasin Katars' || findItemToEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons')) {
                                    _context.next = 76;
                                    break;
                                  }

                                  _context.next = 76;
                                  return (0, _MainHand.equipMainHand)(userCurrentCharacter, findUserCharacter.equipment, findItemToEquip, t);

                                case 76:
                                  _context.next = 78;
                                  return _models["default"].activity.create({
                                    type: 'equipItem_s',
                                    earnerId: userCurrentCharacter.user.id
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 78:
                                  preActivity = _context.sent;
                                  _context.next = 81;
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

                                case 81:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 83:
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
                                  console.log(err);
                                  _context2.prev = 1;
                                  _context2.next = 4;
                                  return _models["default"].error.create({
                                    type: 'equipItem',
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
            return _models["default"].UserClass.findOne({
              where: {
                classId: userCurrentCharacter.user.currentClassId
              },
              include: [{
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
            return _context4.abrupt("return", [myUpdatedUser, findItemToEquip, cannotEquip, cannotEquipReason]);

          case 8:
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