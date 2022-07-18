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

/* eslint-disable import/prefer-default-export */
var discordShowInventory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(discordClient, message, setting, io, queue, isDefered) {
    var activity, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, row, canFitOnOnePage, embedMessage, collector, currentIndex;

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
            row = new _discord.MessageActionRow();

            if (!(userCurrentCharacter.inventory && userCurrentCharacter.inventory.items && userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 25;
              break;
            }

            _context5.t0 = row;
            _context5.next = 23;
            return (0, _buttons.generateEquipmentCompareButton)(userCurrentCharacter, 0);

          case 23:
            _context5.t1 = _context5.sent;

            _context5.t0.addComponents.call(_context5.t0, _context5.t1);

          case 25:
            canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;
            _context5.t2 = discordChannel;
            _context5.t3 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context5.t4 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 38;
              break;
            }

            _context5.t6 = _discord.MessageAttachment;
            _context5.next = 33;
            return (0, _inventory.renderInventoryImage)(userCurrentCharacter, false, false, false, false, 0);

          case 33:
            _context5.t7 = _context5.sent;
            _context5.t8 = new _context5.t6(_context5.t7, 'inventory.png');
            _context5.t5 = [_context5.t8];
            _context5.next = 44;
            break;

          case 38:
            _context5.t9 = _discord.MessageAttachment;
            _context5.next = 41;
            return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

          case 41:
            _context5.t10 = _context5.sent;
            _context5.t11 = new _context5.t9(_context5.t10, 'emptyInventory.png');
            _context5.t5 = [_context5.t11];

          case 44:
            _context5.t12 = _context5.t5;
            _context5.t13 = (0, _context5.t4)(_context5.t12);
            _context5.t14 = [];
            _context5.t15 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory && userCurrentCharacter.inventory.items && userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 69;
              break;
            }

            _context5.t17 = _discord.MessageActionRow;
            _context5.next = 52;
            return (0, _buttons.generateEquipmentCompareButton)(userCurrentCharacter, 0);

          case 52:
            _context5.t18 = _context5.sent;
            _context5.t19 = [_context5.t18];
            _context5.t20 = {
              components: _context5.t19
            };
            _context5.t21 = new _context5.t17(_context5.t20);
            _context5.t22 = _discord.MessageActionRow;
            _context5.next = 59;
            return (0, _buttons.generateEquipItemButton)(0, userCurrentCharacter);

          case 59:
            _context5.t23 = _context5.sent;
            _context5.next = 62;
            return (0, _buttons.generateDestroyItemButton)(0, userCurrentCharacter);

          case 62:
            _context5.t24 = _context5.sent;
            _context5.t25 = [_context5.t23, _context5.t24];
            _context5.t26 = {
              components: _context5.t25
            };
            _context5.t27 = new _context5.t22(_context5.t26);
            _context5.t16 = [_context5.t21, _context5.t27];
            _context5.next = 70;
            break;

          case 69:
            _context5.t16 = [];

          case 70:
            _context5.t28 = _context5.t16;
            _context5.t29 = (0, _context5.t15)(_context5.t28);
            _context5.t30 = (0, _toConsumableArray2["default"])(!canFitOnOnePage ? [new _discord.MessageActionRow({
              components: [(0, _buttons.generateForwardButton)()]
            })] : []);
            _context5.t31 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context5.next = 85;
              break;
            }

            _context5.t33 = _discord.MessageActionRow;
            _context5.next = 78;
            return (0, _buttons.generateExitInventoryButton)();

          case 78:
            _context5.t34 = _context5.sent;
            _context5.t35 = [_context5.t34];
            _context5.t36 = {
              components: _context5.t35
            };
            _context5.t37 = new _context5.t33(_context5.t36);
            _context5.t32 = [_context5.t37];
            _context5.next = 86;
            break;

          case 85:
            _context5.t32 = [];

          case 86:
            _context5.t38 = _context5.t32;
            _context5.t39 = (0, _context5.t31)(_context5.t38);
            _context5.t40 = _context5.t14.concat.call(_context5.t14, _context5.t29, _context5.t30, _context5.t39);
            _context5.t41 = {
              content: _context5.t3,
              files: _context5.t13,
              components: _context5.t40
            };
            _context5.next = 92;
            return _context5.t2.send.call(_context5.t2, _context5.t41);

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
                          _context4.next = 21;
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
                        _context4.t1 = _discord.MessageAttachment;
                        _context4.next = 13;
                        return (0, _itemCompare.renderItemCompareImage)(currentIndex);

                      case 13:
                        _context4.t2 = _context4.sent;
                        _context4.t3 = new _context4.t1(_context4.t2, 'itemCompare.png');
                        _context4.t4 = [_context4.t3];
                        _context4.t5 = [];
                        _context4.t6 = {
                          files: _context4.t4,
                          components: _context4.t5
                        };
                        _context4.next = 20;
                        return _context4.t0.update.call(_context4.t0, _context4.t6);

                      case 20:
                        return _context4.abrupt("return");

                      case 21:
                        if (!interaction.customId.startsWith('Equip:')) {
                          _context4.next = 32;
                          break;
                        }

                        itemId = Number(interaction.customId.replace("Equip:", ""));
                        _context4.next = 25;
                        return (0, _equipItem.equipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 25:
                        _yield$equipItem = _context4.sent;
                        _yield$equipItem2 = (0, _slicedToArray2["default"])(_yield$equipItem, 4);
                        userCurrentCharacter = _yield$equipItem2[0];
                        equipedItem = _yield$equipItem2[1];
                        cannotEquip = _yield$equipItem2[2];
                        cannotEquipReason = _yield$equipItem2[3];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 32:
                        if (!interaction.customId.startsWith('Destroy:')) {
                          _context4.next = 72;
                          break;
                        }

                        _context4.t7 = interaction;
                        _context4.t8 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.t9 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 45;
                          break;
                        }

                        _context4.t11 = _discord.MessageAttachment;
                        _context4.next = 40;
                        return (0, _destroyInventoryItem.renderDestroyIventoryItemImage)(currentIndex, userCurrentCharacter);

                      case 40:
                        _context4.t12 = _context4.sent;
                        _context4.t13 = new _context4.t11(_context4.t12, 'destroyInventoryItem.png');
                        _context4.t10 = [_context4.t13];
                        _context4.next = 51;
                        break;

                      case 45:
                        _context4.t14 = _discord.MessageAttachment;
                        _context4.next = 48;
                        return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

                      case 48:
                        _context4.t15 = _context4.sent;
                        _context4.t16 = new _context4.t14(_context4.t15, 'emptyInventory.png');
                        _context4.t10 = [_context4.t16];

                      case 51:
                        _context4.t17 = _context4.t10;
                        _context4.t18 = (0, _context4.t9)(_context4.t17);
                        _context4.t19 = _discord.MessageActionRow;
                        _context4.next = 56;
                        return (0, _buttons.generateDestroyYesButton)(currentIndex, userCurrentCharacter);

                      case 56:
                        _context4.t20 = _context4.sent;
                        _context4.t21 = [_context4.t20];
                        _context4.t22 = {
                          components: _context4.t21
                        };
                        _context4.t23 = new _context4.t19(_context4.t22);
                        _context4.t24 = _discord.MessageActionRow;
                        _context4.next = 63;
                        return (0, _buttons.generateDestroyNoButton)();

                      case 63:
                        _context4.t25 = _context4.sent;
                        _context4.t26 = [_context4.t25];
                        _context4.t27 = {
                          components: _context4.t26
                        };
                        _context4.t28 = new _context4.t24(_context4.t27);
                        _context4.t29 = [_context4.t23, _context4.t28];
                        _context4.t30 = {
                          content: _context4.t8,
                          files: _context4.t18,
                          components: _context4.t29
                        };
                        _context4.next = 71;
                        return _context4.t7.editReply.call(_context4.t7, _context4.t30);

                      case 71:
                        return _context4.abrupt("return");

                      case 72:
                        if (!interaction.customId.startsWith('ConfirmDestroy:')) {
                          _context4.next = 81;
                          break;
                        }

                        _itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
                        _context4.next = 76;
                        return (0, _destroyItem.destroyItem)(userCurrentCharacter, _itemId, discordChannel, io, queue);

                      case 76:
                        _yield$destroyItem = _context4.sent;
                        _yield$destroyItem2 = (0, _slicedToArray2["default"])(_yield$destroyItem, 2);
                        userCurrentCharacter = _yield$destroyItem2[0];
                        destroyedItem = _yield$destroyItem2[1];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 81:
                        if (!(interaction.customId === 'exitInventory')) {
                          _context4.next = 95;
                          break;
                        }

                        _context4.t31 = interaction;
                        _context4.t32 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.t33 = _discord.MessageAttachment;
                        _context4.next = 87;
                        return (0, _cancelInventory.renderCancelInventoryImage)(userCurrentCharacter);

                      case 87:
                        _context4.t34 = _context4.sent;
                        _context4.t35 = new _context4.t33(_context4.t34, 'inventory.png');
                        _context4.t36 = [_context4.t35];
                        _context4.t37 = [];
                        _context4.t38 = {
                          content: _context4.t32,
                          files: _context4.t36,
                          components: _context4.t37
                        };
                        _context4.next = 94;
                        return _context4.t31.editReply.call(_context4.t31, _context4.t38);

                      case 94:
                        return _context4.abrupt("return");

                      case 95:
                        if (interaction.customId === 'back') {
                          currentIndex -= 1;
                        }

                        if (interaction.customId === 'forward') {
                          currentIndex += 1;
                        }

                        _context4.t39 = interaction;
                        _context4.t40 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context4.t41 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 109;
                          break;
                        }

                        _context4.t43 = _discord.MessageAttachment;
                        _context4.next = 104;
                        return (0, _inventory.renderInventoryImage)(userCurrentCharacter, destroyedItem, equipedItem, cannotEquip, cannotEquipReason, currentIndex);

                      case 104:
                        _context4.t44 = _context4.sent;
                        _context4.t45 = new _context4.t43(_context4.t44, 'inventory.png');
                        _context4.t42 = [_context4.t45];
                        _context4.next = 115;
                        break;

                      case 109:
                        _context4.t46 = _discord.MessageAttachment;
                        _context4.next = 112;
                        return (0, _emptyInventory.renderEmptyInventoryImage)(userCurrentCharacter);

                      case 112:
                        _context4.t47 = _context4.sent;
                        _context4.t48 = new _context4.t46(_context4.t47, 'emptyInventory.png');
                        _context4.t42 = [_context4.t48];

                      case 115:
                        _context4.t49 = _context4.t42;
                        _context4.t50 = (0, _context4.t41)(_context4.t49);
                        _context4.t51 = [];
                        _context4.t52 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 130;
                          break;
                        }

                        _context4.t54 = _discord.MessageActionRow;
                        _context4.next = 123;
                        return (0, _buttons.generateEquipmentCompareButton)(userCurrentCharacter, currentIndex);

                      case 123:
                        _context4.t55 = _context4.sent;
                        _context4.t56 = [_context4.t55];
                        _context4.t57 = {
                          components: _context4.t56
                        };
                        _context4.t58 = new _context4.t54(_context4.t57);
                        _context4.t53 = [_context4.t58];
                        _context4.next = 131;
                        break;

                      case 130:
                        _context4.t53 = [];

                      case 131:
                        _context4.t59 = _context4.t53;
                        _context4.t60 = (0, _context4.t52)(_context4.t59);
                        _context4.t61 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context4.next = 148;
                          break;
                        }

                        _context4.t63 = _discord.MessageActionRow;
                        _context4.next = 138;
                        return (0, _buttons.generateEquipItemButton)(currentIndex, userCurrentCharacter);

                      case 138:
                        _context4.t64 = _context4.sent;
                        _context4.next = 141;
                        return (0, _buttons.generateDestroyItemButton)(currentIndex, userCurrentCharacter);

                      case 141:
                        _context4.t65 = _context4.sent;
                        _context4.t66 = [_context4.t64, _context4.t65];
                        _context4.t67 = {
                          components: _context4.t66
                        };
                        _context4.t68 = new _context4.t63(_context4.t67);
                        _context4.t62 = [_context4.t68];
                        _context4.next = 149;
                        break;

                      case 148:
                        _context4.t62 = [];

                      case 149:
                        _context4.t69 = _context4.t62;
                        _context4.t70 = (0, _context4.t61)(_context4.t69);
                        _context4.t71 = (0, _toConsumableArray2["default"])(userCurrentCharacter.inventory.items.length > 1 ? [new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [(0, _buttons.generateBackButton)()] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < userCurrentCharacter.inventory.items.length ? [(0, _buttons.generateForwardButton)()] : []))
                        })] : []);
                        _context4.t72 = _discord.MessageActionRow;
                        _context4.next = 155;
                        return (0, _buttons.generateExitInventoryButton)();

                      case 155:
                        _context4.t73 = _context4.sent;
                        _context4.t74 = [_context4.t73];
                        _context4.t75 = {
                          components: _context4.t74
                        };
                        _context4.t76 = new _context4.t72(_context4.t75);
                        _context4.t77 = [_context4.t76];
                        _context4.t78 = _context4.t51.concat.call(_context4.t51, _context4.t60, _context4.t70, _context4.t71, _context4.t77);
                        _context4.t79 = {
                          content: _context4.t40,
                          files: _context4.t50,
                          components: _context4.t78
                        };
                        _context4.next = 164;
                        return _context4.t39.editReply.call(_context4.t39, _context4.t79);

                      case 164:
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