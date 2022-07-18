"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordShowInventory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _destroyItem = require("../helpers/items/destroyItem");

var _equipItem = require("../helpers/equipment/equipItem");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

var _cancelInventory = require("../render/inventory/cancelInventory");

var _emptyInventory = require("../render/inventory/emptyInventory");

var _inventory = require("../render/inventory/inventory");

var _destroyInventoryItem = require("../render/inventory/destroyInventoryItem");

var _itemCompare = require("../render/inventory/itemCompare");

var _isUserInRealm = _interopRequireDefault(require("../helpers/realm/isUserInRealm"));

/* eslint-disable import/prefer-default-export */
var discordShowInventory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, setting, io, queue, isDefered) {
    var activity, failed, usedDeferReply, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, _yield$isUserInRealm, _yield$isUserInRealm2, canFitOnOnePage, embedMessage, collector, currentIndex;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            activity = [];
            _context5.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context5.sent;
            _context5.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context5.sent;
            _context5.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            true // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context5.sent;
            _context5.next = 12;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 12:
            _yield$testPlayerRead = _context5.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", usedDeferReply);

          case 18:
            _context5.next = 20;
            return (0, _isUserInRealm["default"])(userCurrentCharacter, discordClient, message, isDefered);

          case 20:
            _yield$isUserInRealm = _context5.sent;
            _yield$isUserInRealm2 = (0, _slicedToArray2["default"])(_yield$isUserInRealm, 2);
            failed = _yield$isUserInRealm2[0];
            usedDeferReply = _yield$isUserInRealm2[1];

            if (!failed) {
              _context5.next = 26;
              break;
            }

            return _context5.abrupt("return", usedDeferReply);

          case 26:
            canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;
            console.log('before send message');
            _context5.t0 = discordChannel;
            _context5.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context5.t2 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 39;
              break;
            }

            _context5.next = 34;
            return (0, _inventory.renderInventoryImage)(userCurrentCharacter, false, false, false, false, 0);

          case 34:
            _context5.t4 = _context5.sent;
            _context5.t5 = {
              attachment: _context5.t4,
              name: 'inventory.png'
            };
            _context5.t3 = [_context5.t5];
            _context5.next = 44;
            break;

          case 39:
            _context5.next = 41;
            return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

          case 41:
            _context5.t6 = _context5.sent;
            _context5.t7 = {
              attachment: _context5.t6,
              name: 'emptyInventory.png'
            };
            _context5.t3 = [_context5.t7];

          case 44:
            _context5.t8 = _context5.t3;
            _context5.t9 = (0, _context5.t2)(_context5.t8);
            _context5.t10 = [];
            _context5.t11 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory && userCurrentCharacter.inventory.items && userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 69;
              break;
            }

            _context5.t13 = _discord.ActionRowBuilder;
            _context5.next = 52;
            return (0, _buttons.generateEquipmentCompareButton)(userCurrentCharacter, 0);

          case 52:
            _context5.t14 = _context5.sent;
            _context5.t15 = [_context5.t14];
            _context5.t16 = {
              components: _context5.t15
            };
            _context5.t17 = new _context5.t13(_context5.t16);
            _context5.t18 = _discord.ActionRowBuilder;
            _context5.next = 59;
            return (0, _buttons.generateEquipItemButton)(0, userCurrentCharacter);

          case 59:
            _context5.t19 = _context5.sent;
            _context5.next = 62;
            return (0, _buttons.generateDestroyItemButton)(0, userCurrentCharacter);

          case 62:
            _context5.t20 = _context5.sent;
            _context5.t21 = [_context5.t19, _context5.t20];
            _context5.t22 = {
              components: _context5.t21
            };
            _context5.t23 = new _context5.t18(_context5.t22);
            _context5.t12 = [_context5.t17, _context5.t23];
            _context5.next = 70;
            break;

          case 69:
            _context5.t12 = [];

          case 70:
            _context5.t24 = _context5.t12;
            _context5.t25 = (0, _context5.t11)(_context5.t24);
            _context5.t26 = (0, _toConsumableArray2["default"])(!canFitOnOnePage ? [new _discord.ActionRowBuilder({
              components: [(0, _buttons.generateForwardButton)()]
            })] : []);
            _context5.t27 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 85;
              break;
            }

            _context5.t29 = _discord.ActionRowBuilder;
            _context5.next = 78;
            return (0, _buttons.generateExitInventoryButton)();

          case 78:
            _context5.t30 = _context5.sent;
            _context5.t31 = [_context5.t30];
            _context5.t32 = {
              components: _context5.t31
            };
            _context5.t33 = new _context5.t29(_context5.t32);
            _context5.t28 = [_context5.t33];
            _context5.next = 86;
            break;

          case 85:
            _context5.t28 = [];

          case 86:
            _context5.t34 = _context5.t28;
            _context5.t35 = (0, _context5.t27)(_context5.t34);
            _context5.t36 = _context5.t10.concat.call(_context5.t10, _context5.t25, _context5.t26, _context5.t35);
            _context5.t37 = {
              content: _context5.t1,
              files: _context5.t9,
              components: _context5.t36
            };
            _context5.next = 92;
            return _context5.t0.send.call(_context5.t0, _context5.t37);

          case 92:
            embedMessage = _context5.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref2) {
                var discordUser = _ref2.user;
                return discordUser.id === userCurrentCharacter.UserGroup.user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(interaction) {
                var destroyedItem, equipedItem, cannotEquip, cannotEquipReason, updatedUserCharacter, itemId, _yield$equipItem, _yield$equipItem2, _itemId, _yield$destroyItem, _yield$destroyItem2;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return interaction.deferUpdate();

                      case 2:
                        destroyedItem = false;
                        equipedItem = false;
                        cannotEquip = false;
                        cannotEquipReason = '';

                        if (!interaction.customId.startsWith('Compare:')) {
                          _context4.next = 20;
                          break;
                        }

                        _context4.next = 9;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                                      return _regenerator["default"].wrap(function _callee$(_context) {
                                        while (1) {
                                          switch (_context.prev = _context.next) {
                                            case 0:
                                              console.log('item compare');

                                            case 1:
                                            case "end":
                                              return _context.stop();
                                          }
                                        }
                                      }, _callee);
                                    }));

                                    return function (_x8) {
                                      return _ref5.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                                      return _regenerator["default"].wrap(function _callee2$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              console.log(err);

                                            case 1:
                                            case "end":
                                              return _context2.stop();
                                          }
                                        }
                                      }, _callee2);
                                    }));

                                    return function (_x9) {
                                      return _ref6.apply(this, arguments);
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

                      case 9:
                        _context4.t0 = interaction;
                        _context4.next = 12;
                        return (0, _itemCompare.renderItemCompareImage)(currentIndex);

                      case 12:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = {
                          attachment: _context4.t1,
                          name: 'itemCompare.png'
                        };
                        _context4.t3 = [_context4.t2];
                        _context4.t4 = [];
                        _context4.t5 = {
                          files: _context4.t3,
                          components: _context4.t4
                        };
                        _context4.next = 19;
                        return _context4.t0.update.call(_context4.t0, _context4.t5);

                      case 19:
                        return _context4.abrupt("return");

                      case 20:
                        if (!interaction.customId.startsWith('Equip:')) {
                          _context4.next = 31;
                          break;
                        }

                        itemId = Number(interaction.customId.replace("Equip:", ""));
                        _context4.next = 24;
                        return (0, _equipItem.equipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 24:
                        _yield$equipItem = _context4.sent;
                        _yield$equipItem2 = (0, _slicedToArray2["default"])(_yield$equipItem, 4);
                        userCurrentCharacter = _yield$equipItem2[0];
                        equipedItem = _yield$equipItem2[1];
                        cannotEquip = _yield$equipItem2[2];
                        cannotEquipReason = _yield$equipItem2[3];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 31:
                        if (!interaction.customId.startsWith('Destroy:')) {
                          _context4.next = 69;
                          break;
                        }

                        _context4.t6 = interaction;
                        _context4.t7 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.t8 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 43;
                          break;
                        }

                        _context4.next = 38;
                        return (0, _destroyInventoryItem.renderDestroyIventoryItemImage)(currentIndex, userCurrentCharacter);

                      case 38:
                        _context4.t10 = _context4.sent;
                        _context4.t11 = {
                          attachment: _context4.t10,
                          name: 'destroyInventoryItem.png'
                        };
                        _context4.t9 = [_context4.t11];
                        _context4.next = 48;
                        break;

                      case 43:
                        _context4.next = 45;
                        return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

                      case 45:
                        _context4.t12 = _context4.sent;
                        _context4.t13 = {
                          attachment: _context4.t12,
                          name: 'emptyInventory.png'
                        };
                        _context4.t9 = [_context4.t13];

                      case 48:
                        _context4.t14 = _context4.t9;
                        _context4.t15 = (0, _context4.t8)(_context4.t14);
                        _context4.t16 = _discord.ActionRowBuilder;
                        _context4.next = 53;
                        return (0, _buttons.generateDestroyYesButton)(currentIndex, userCurrentCharacter);

                      case 53:
                        _context4.t17 = _context4.sent;
                        _context4.t18 = [_context4.t17];
                        _context4.t19 = {
                          components: _context4.t18
                        };
                        _context4.t20 = new _context4.t16(_context4.t19);
                        _context4.t21 = _discord.ActionRowBuilder;
                        _context4.next = 60;
                        return (0, _buttons.generateDestroyNoButton)();

                      case 60:
                        _context4.t22 = _context4.sent;
                        _context4.t23 = [_context4.t22];
                        _context4.t24 = {
                          components: _context4.t23
                        };
                        _context4.t25 = new _context4.t21(_context4.t24);
                        _context4.t26 = [_context4.t20, _context4.t25];
                        _context4.t27 = {
                          content: _context4.t7,
                          files: _context4.t15,
                          components: _context4.t26
                        };
                        _context4.next = 68;
                        return _context4.t6.editReply.call(_context4.t6, _context4.t27);

                      case 68:
                        return _context4.abrupt("return");

                      case 69:
                        if (!interaction.customId.startsWith('ConfirmDestroy:')) {
                          _context4.next = 79;
                          break;
                        }

                        _itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
                        console.log('before item destroy');
                        _context4.next = 74;
                        return (0, _destroyItem.destroyItem)(userCurrentCharacter, _itemId, discordChannel, io, queue);

                      case 74:
                        _yield$destroyItem = _context4.sent;
                        _yield$destroyItem2 = (0, _slicedToArray2["default"])(_yield$destroyItem, 2);
                        userCurrentCharacter = _yield$destroyItem2[0];
                        destroyedItem = _yield$destroyItem2[1];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 79:
                        if (!(interaction.customId === 'exitInventory')) {
                          _context4.next = 92;
                          break;
                        }

                        _context4.t28 = interaction;
                        _context4.t29 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.next = 84;
                        return (0, _cancelInventory.renderCancelInventoryImage)(userCurrentCharacter);

                      case 84:
                        _context4.t30 = _context4.sent;
                        _context4.t31 = {
                          attachment: _context4.t30,
                          name: 'inventory.png'
                        };
                        _context4.t32 = [_context4.t31];
                        _context4.t33 = [];
                        _context4.t34 = {
                          content: _context4.t29,
                          files: _context4.t32,
                          components: _context4.t33
                        };
                        _context4.next = 91;
                        return _context4.t28.editReply.call(_context4.t28, _context4.t34);

                      case 91:
                        return _context4.abrupt("return");

                      case 92:
                        if (interaction.customId === 'back') {
                          currentIndex -= 1;
                        }

                        if (interaction.customId === 'forward') {
                          currentIndex += 1;
                        }

                        _context4.t35 = interaction;
                        _context4.t36 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.t37 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 105;
                          break;
                        }

                        _context4.next = 100;
                        return (0, _inventory.renderInventoryImage)(userCurrentCharacter, destroyedItem, equipedItem, cannotEquip, cannotEquipReason, currentIndex);

                      case 100:
                        _context4.t39 = _context4.sent;
                        _context4.t40 = {
                          attachment: _context4.t39,
                          name: 'inventory.png'
                        };
                        _context4.t38 = [_context4.t40];
                        _context4.next = 110;
                        break;

                      case 105:
                        _context4.next = 107;
                        return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

                      case 107:
                        _context4.t41 = _context4.sent;
                        _context4.t42 = {
                          attachment: _context4.t41,
                          name: 'emptyInventory.png'
                        };
                        _context4.t38 = [_context4.t42];

                      case 110:
                        _context4.t43 = _context4.t38;
                        _context4.t44 = (0, _context4.t37)(_context4.t43);
                        _context4.t45 = [];
                        _context4.t46 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 125;
                          break;
                        }

                        _context4.t48 = _discord.ActionRowBuilder;
                        _context4.next = 118;
                        return (0, _buttons.generateEquipmentCompareButton)(userCurrentCharacter, currentIndex);

                      case 118:
                        _context4.t49 = _context4.sent;
                        _context4.t50 = [_context4.t49];
                        _context4.t51 = {
                          components: _context4.t50
                        };
                        _context4.t52 = new _context4.t48(_context4.t51);
                        _context4.t47 = [_context4.t52];
                        _context4.next = 126;
                        break;

                      case 125:
                        _context4.t47 = [];

                      case 126:
                        _context4.t53 = _context4.t47;
                        _context4.t54 = (0, _context4.t46)(_context4.t53);
                        _context4.t55 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 143;
                          break;
                        }

                        _context4.t57 = _discord.ActionRowBuilder;
                        _context4.next = 133;
                        return (0, _buttons.generateEquipItemButton)(currentIndex, userCurrentCharacter);

                      case 133:
                        _context4.t58 = _context4.sent;
                        _context4.next = 136;
                        return (0, _buttons.generateDestroyItemButton)(currentIndex, userCurrentCharacter);

                      case 136:
                        _context4.t59 = _context4.sent;
                        _context4.t60 = [_context4.t58, _context4.t59];
                        _context4.t61 = {
                          components: _context4.t60
                        };
                        _context4.t62 = new _context4.t57(_context4.t61);
                        _context4.t56 = [_context4.t62];
                        _context4.next = 144;
                        break;

                      case 143:
                        _context4.t56 = [];

                      case 144:
                        _context4.t63 = _context4.t56;
                        _context4.t64 = (0, _context4.t55)(_context4.t63);
                        _context4.t65 = (0, _toConsumableArray2["default"])(userCurrentCharacter.inventory.items.length > 1 ? [new _discord.ActionRowBuilder({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [(0, _buttons.generateBackButton)()] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < userCurrentCharacter.inventory.items.length ? [(0, _buttons.generateForwardButton)()] : []))
                        })] : []);
                        _context4.t66 = _discord.ActionRowBuilder;
                        _context4.next = 150;
                        return (0, _buttons.generateExitInventoryButton)();

                      case 150:
                        _context4.t67 = _context4.sent;
                        _context4.t68 = [_context4.t67];
                        _context4.t69 = {
                          components: _context4.t68
                        };
                        _context4.t70 = new _context4.t66(_context4.t69);
                        _context4.t71 = [_context4.t70];
                        _context4.t72 = _context4.t45.concat.call(_context4.t45, _context4.t54, _context4.t64, _context4.t65, _context4.t71);
                        _context4.t73 = {
                          content: _context4.t36,
                          files: _context4.t44,
                          components: _context4.t72
                        };
                        _context4.next = 159;
                        return _context4.t35.editReply.call(_context4.t35, _context4.t73);

                      case 159:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 96:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function discordShowInventory(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordShowInventory = discordShowInventory;