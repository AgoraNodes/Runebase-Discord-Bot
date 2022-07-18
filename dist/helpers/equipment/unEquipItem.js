"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unEquipItem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

var _calcStrengthDexforReq = require("./calcStrengthDexforReq");

var _Helm = require("./unequip/Helm");

var _Armor = require("./unequip/Armor");

var _OffHand = require("./unequip/OffHand");

var _Belt = require("./unequip/Belt");

var _Boots = require("./unequip/Boots");

var _Gloves = require("./unequip/Gloves");

var _Amulet = require("./unequip/Amulet");

var _MainHand = require("./unequip/MainHand");

var _Rings = require("./unequip/Rings");

var _character = require("../character/character");

var unEquipItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userCurrentCharacter, itemId, discordChannel, io, queue) {
    var activity, cannotUnEquip, cannotUnEquipReason, findItemToUnEquip, myUpdatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activity = [];
            cannotUnEquipReason = '';
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
                          var findUserCharacter, preActivity, finalActivity;
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  console.log('uneq 1');
                                  _context.next = 3;
                                  return _models["default"].UserGroupClass.findOne({
                                    where: {
                                      id: userCurrentCharacter.id
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

                                case 3:
                                  findUserCharacter = _context.sent;
                                  console.log('uneq 2');
                                  _context.next = 7;
                                  return _models["default"].item.findOne({
                                    where: {
                                      id: itemId
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

                                case 7:
                                  findItemToUnEquip = _context.sent;
                                  console.log('uneq 3');

                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Helms' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Circlets' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Druid Pelts' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Warrior Helms')) {
                                    _context.next = 12;
                                    break;
                                  }

                                  _context.next = 12;
                                  return (0, _Helm.unEquipHelm)(userCurrentCharacter, t);

                                case 12:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Belts')) {
                                    _context.next = 15;
                                    break;
                                  }

                                  _context.next = 15;
                                  return (0, _Belt.unEquipBelt)(userCurrentCharacter, t);

                                case 15:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Gloves')) {
                                    _context.next = 18;
                                    break;
                                  }

                                  _context.next = 18;
                                  return (0, _Gloves.unEquipGloves)(userCurrentCharacter, t);

                                case 18:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Boots')) {
                                    _context.next = 21;
                                    break;
                                  }

                                  _context.next = 21;
                                  return (0, _Boots.unEquipBoots)(userCurrentCharacter, t);

                                case 21:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Rings')) {
                                    _context.next = 24;
                                    break;
                                  }

                                  _context.next = 24;
                                  return (0, _Rings.unEquipRing)(userCurrentCharacter, findItemToUnEquip, t);

                                case 24:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Amulets')) {
                                    _context.next = 27;
                                    break;
                                  }

                                  _context.next = 27;
                                  return (0, _Amulet.unEquipAmulet)(userCurrentCharacter, t);

                                case 27:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Armors')) {
                                    _context.next = 30;
                                    break;
                                  }

                                  _context.next = 30;
                                  return (0, _Armor.unEquipArmor)(userCurrentCharacter, t);

                                case 30:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Shields' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Sorceress Orbs' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Paladin Shields' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads')) {
                                    _context.next = 33;
                                    break;
                                  }

                                  _context.next = 33;
                                  return (0, _OffHand.unEquipOffHand)(userCurrentCharacter, t);

                                case 33:
                                  if (!(findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Axes' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Bows' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Crossbows' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Daggers' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Javelins' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Maces' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Polearms' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Scepters' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Spears' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Staves' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Swords' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Throwing' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Wands' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Assassin Katars' || findItemToUnEquip.itemBase.itemFamily.itemType.name === 'Amazon Weapons')) {
                                    _context.next = 36;
                                    break;
                                  }

                                  _context.next = 36;
                                  return (0, _MainHand.unEquipMainHand)(userCurrentCharacter, t);

                                case 36:
                                  console.log('uneq 4');
                                  _context.next = 39;
                                  return _models["default"].activity.create({
                                    type: 'equipItem_s',
                                    earnerId: userCurrentCharacter.UserGroup.user.id
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 39:
                                  preActivity = _context.sent;
                                  _context.next = 42;
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

                                case 42:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 44:
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
                                    type: 'unequipItem',
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
            return (0, _character.fetchUserCurrentCharacter)(userCurrentCharacter.UserGroup.user.user_id, // user discord id
            true // Need inventory?
            );

          case 6:
            myUpdatedUser = _context4.sent;
            return _context4.abrupt("return", [myUpdatedUser, findItemToUnEquip, cannotUnEquip, cannotUnEquipReason]);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function unEquipItem(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.unEquipItem = unEquipItem;