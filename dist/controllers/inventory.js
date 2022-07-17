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

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _models = _interopRequireDefault(require("../models"));

var _item = require("../render/item");

var _destroyItem = require("../helpers/items/destroyItem");

var _equipItem = require("../helpers/equipment/equipItem");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

/* eslint-disable import/prefer-default-export */
// import { generateStatsImage } from "../helpers/stats/generateStatsImage";
// import { generateEquipmentImage } from '../helpers/equipment/generateEquipmentImage';
var discordShowInventory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(discordClient, message, setting, io, queue, isDefered) {
    var activity, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, generateConfirmDestroyItemImage, generateInventoryImage, generateClassPicked, generateExitInventoryImage, generateEmptyInventoryImage, generateEquipmentCompareButton, row, canFitOnOnePage, embedMessage, collector, currentIndex;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            activity = [];
            _context11.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context11.sent;
            _context11.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context11.sent;
            _context11.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            true // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context11.sent;
            _context11.next = 12;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 12:
            _yield$testPlayerRead = _context11.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context11.next = 18;
              break;
            }

            return _context11.abrupt("return", usedDeferReply);

          case 18:
            // await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
            generateConfirmDestroyItemImage = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start, currentUserCharacter) {
                var current, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        current = currentUserCharacter.inventory.items.slice(start, start + 1);
                        _context.next = 3;
                        return (0, _item.renderItemImage)(current[0]);

                      case 3:
                        inventoryItemOneBuffer = _context.sent;
                        _context.next = 6;
                        return (0, _canvas.loadImage)(inventoryItemOneBuffer);

                      case 6:
                        inventoryItemOne = _context.sent;
                        canvas = (0, _canvas.createCanvas)(inventoryItemOne.width, inventoryItemOne.height + 40);
                        ctx = canvas.getContext('2d'); // Inventory item one image

                        ctx.drawImage(inventoryItemOne, 0, 0, inventoryItemOne.width, inventoryItemOne.height);
                        ctx.font = 'bold 15px "HeartWarming"';
                        ctx.fillStyle = "red";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.strokeText("Are you sure you want to destroy", canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
                        ctx.fillText("Are you sure you want to destroy", canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
                        ctx.font = 'bold 15px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.strokeText("".concat(current[0].name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                        ctx.fillText("".concat(current[0].name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'destroy.png'));

                      case 25:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateConfirmDestroyItemImage(_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateInventoryImage = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(currentUserCharacter, itemDestroyed, itemEquiped, cannotEquip, cannotEquipReason, start) {
                var current, extraDestroyedHeight, extraEquipedHeight, extraCannotEquipedHeight, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        current = currentUserCharacter.inventory.items.slice(start, start + 1); // console.log(current);
                        // console.log(current[0]);
                        // console.log('after current select');

                        extraDestroyedHeight = itemDestroyed ? 20 : 0;
                        extraEquipedHeight = itemEquiped && !cannotEquip ? 20 : 0;
                        extraCannotEquipedHeight = cannotEquip ? 60 : 0;
                        _context2.next = 6;
                        return (0, _item.renderItemImage)(current[0]);

                      case 6:
                        inventoryItemOneBuffer = _context2.sent;
                        _context2.next = 9;
                        return (0, _canvas.loadImage)(inventoryItemOneBuffer);

                      case 9:
                        inventoryItemOne = _context2.sent;
                        canvas = (0, _canvas.createCanvas)(inventoryItemOne.width, inventoryItemOne.height + 20 + extraDestroyedHeight + extraCannotEquipedHeight + extraEquipedHeight);
                        ctx = canvas.getContext('2d'); // Inventory item one image

                        ctx.drawImage(inventoryItemOne, 0, 0, inventoryItemOne.width, inventoryItemOne.height);
                        ctx.font = 'bold 10px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.strokeText("Showing items ".concat(start + 1, " out of ").concat(currentUserCharacter.inventory.items.length), canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);
                        ctx.fillText("Showing items ".concat(start + 1, " out of ").concat(currentUserCharacter.inventory.items.length), canvas.width / 2, inventoryItemOne.height, inventoryItemOne.width);

                        if (itemDestroyed) {
                          ctx.strokeText("destroyed ".concat(itemDestroyed.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                          ctx.fillText("destroyed ".concat(itemDestroyed.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                        }

                        if (cannotEquip) {
                          ctx.font = 'bold 15px "HeartWarming"';
                          ctx.fillStyle = "red";
                          ctx.lineWidth = 3;
                          ctx.strokeText("Unable to Equip", canvas.width / 2, inventoryItemOne.height + 30, inventoryItemOne.width);
                          ctx.fillText("Unable to Equip", canvas.width / 2, inventoryItemOne.height + 30, inventoryItemOne.width);
                          ctx.strokeText("".concat(cannotEquipReason), canvas.width / 2, inventoryItemOne.height + 50, inventoryItemOne.width);
                          ctx.fillText("".concat(cannotEquipReason), canvas.width / 2, inventoryItemOne.height + 50, inventoryItemOne.width);
                        }

                        if (itemEquiped && !cannotEquip) {
                          ctx.strokeText("equiped ".concat(itemEquiped.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                          ctx.fillText("equiped ".concat(itemEquiped.name), canvas.width / 2, inventoryItemOne.height + 20, inventoryItemOne.width);
                        }

                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'inventory.png'));

                      case 24:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateInventoryImage(_x9, _x10, _x11, _x12, _x13, _x14) {
                return _ref3.apply(this, arguments);
              };
            }();

            generateClassPicked = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(start) {
                var current, canvas, ctx;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.UserGroup.user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        ctx.fillText("".concat(userCurrentCharacter.UserGroup.user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        return _context3.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'picked.png'));

                      case 11:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateClassPicked(_x15) {
                return _ref4.apply(this, arguments);
              };
            }();

            generateExitInventoryImage = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(start) {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.UserGroup.user.username, " canceled inventory"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.UserGroup.user.username, " canceled inventory"), 250, 60, 500);
                        return _context4.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generateExitInventoryImage(_x16) {
                return _ref5.apply(this, arguments);
              };
            }();

            generateEmptyInventoryImage = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(start) {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.UserGroup.user.username, " Your inventory is empty"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.UserGroup.user.username, " Your inventory is empty"), 250, 60, 500);
                        return _context5.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'emptyInventory.png'));

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function generateEmptyInventoryImage(_x17) {
                return _ref6.apply(this, arguments);
              };
            }();

            generateEquipmentCompareButton = /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(start) {
                var current, equipItemId;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        equipItemId = "Compare:".concat(current[0].id);
                        return _context6.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Compare ".concat(current[0].name),
                          emoji: '👀',
                          customId: equipItemId
                        }).setDisabled(true));

                      case 3:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function generateEquipmentCompareButton(_x18) {
                return _ref7.apply(this, arguments);
              };
            }();

            row = new _discord.MessageActionRow();

            if (!(userCurrentCharacter.inventory && userCurrentCharacter.inventory.items && userCurrentCharacter.inventory.items.length > 0)) {
              _context11.next = 31;
              break;
            }

            _context11.t0 = row;
            _context11.next = 29;
            return generateEquipmentCompareButton(0);

          case 29:
            _context11.t1 = _context11.sent;

            _context11.t0.addComponents.call(_context11.t0, _context11.t1);

          case 31:
            canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;
            _context11.t2 = discordChannel;
            _context11.t3 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context11.t4 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context11.next = 42;
              break;
            }

            _context11.next = 38;
            return generateInventoryImage(userCurrentCharacter, false, false, false, false, 0);

          case 38:
            _context11.t6 = _context11.sent;
            _context11.t5 = [_context11.t6];
            _context11.next = 46;
            break;

          case 42:
            _context11.next = 44;
            return generateEmptyInventoryImage();

          case 44:
            _context11.t7 = _context11.sent;
            _context11.t5 = [_context11.t7];

          case 46:
            _context11.t8 = _context11.t5;
            _context11.t9 = (0, _context11.t4)(_context11.t8);
            _context11.t10 = [];
            _context11.t11 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory && userCurrentCharacter.inventory.items && userCurrentCharacter.inventory.items.length > 0)) {
              _context11.next = 71;
              break;
            }

            _context11.t13 = _discord.MessageActionRow;
            _context11.next = 54;
            return generateEquipmentCompareButton(0);

          case 54:
            _context11.t14 = _context11.sent;
            _context11.t15 = [_context11.t14];
            _context11.t16 = {
              components: _context11.t15
            };
            _context11.t17 = new _context11.t13(_context11.t16);
            _context11.t18 = _discord.MessageActionRow;
            _context11.next = 61;
            return (0, _buttons.generateEquipItemButton)(0, userCurrentCharacter);

          case 61:
            _context11.t19 = _context11.sent;
            _context11.next = 64;
            return (0, _buttons.generateDestroyItemButton)(0, userCurrentCharacter);

          case 64:
            _context11.t20 = _context11.sent;
            _context11.t21 = [_context11.t19, _context11.t20];
            _context11.t22 = {
              components: _context11.t21
            };
            _context11.t23 = new _context11.t18(_context11.t22);
            _context11.t12 = [_context11.t17, _context11.t23];
            _context11.next = 72;
            break;

          case 71:
            _context11.t12 = [];

          case 72:
            _context11.t24 = _context11.t12;
            _context11.t25 = (0, _context11.t11)(_context11.t24);
            _context11.t26 = (0, _toConsumableArray2["default"])(!canFitOnOnePage ? [new _discord.MessageActionRow({
              components: [(0, _buttons.generateForwardButton)()]
            })] : []);
            _context11.t27 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context11.next = 87;
              break;
            }

            _context11.t29 = _discord.MessageActionRow;
            _context11.next = 80;
            return (0, _buttons.generateExitInventoryButton)();

          case 80:
            _context11.t30 = _context11.sent;
            _context11.t31 = [_context11.t30];
            _context11.t32 = {
              components: _context11.t31
            };
            _context11.t33 = new _context11.t29(_context11.t32);
            _context11.t28 = [_context11.t33];
            _context11.next = 88;
            break;

          case 87:
            _context11.t28 = [];

          case 88:
            _context11.t34 = _context11.t28;
            _context11.t35 = (0, _context11.t27)(_context11.t34);
            _context11.t36 = _context11.t10.concat.call(_context11.t10, _context11.t25, _context11.t26, _context11.t35);
            _context11.t37 = {
              content: _context11.t3,
              files: _context11.t9,
              components: _context11.t36
            };
            _context11.next = 94;
            return _context11.t2.send.call(_context11.t2, _context11.t37);

          case 94:
            embedMessage = _context11.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref8) {
                var discordUser = _ref8.user;
                return discordUser.id === userCurrentCharacter.UserGroup.user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(interaction) {
                var destroyedItem, equipedItem, cannotEquip, cannotEquipReason, updatedUserCharacter, itemId, _yield$equipItem, _yield$equipItem2, _itemId, _yield$destroyItem, _yield$destroyItem2;

                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return interaction.deferUpdate();

                      case 2:
                        destroyedItem = false;
                        equipedItem = false;
                        cannotEquip = false;
                        cannotEquipReason = '';

                        if (!interaction.customId.startsWith('Compare:')) {
                          _context10.next = 19;
                          break;
                        }

                        _context10.next = 9;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                          return _regenerator["default"].wrap(function _callee9$(_context9) {
                            while (1) {
                              switch (_context9.prev = _context9.next) {
                                case 0:
                                  _context9.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(t) {
                                      return _regenerator["default"].wrap(function _callee7$(_context7) {
                                        while (1) {
                                          switch (_context7.prev = _context7.next) {
                                            case 0:
                                              console.log('item compare');

                                            case 1:
                                            case "end":
                                              return _context7.stop();
                                          }
                                        }
                                      }, _callee7);
                                    }));

                                    return function (_x20) {
                                      return _ref11.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(err) {
                                      return _regenerator["default"].wrap(function _callee8$(_context8) {
                                        while (1) {
                                          switch (_context8.prev = _context8.next) {
                                            case 0:
                                              console.log(err);

                                            case 1:
                                            case "end":
                                              return _context8.stop();
                                          }
                                        }
                                      }, _callee8);
                                    }));

                                    return function (_x21) {
                                      return _ref12.apply(this, arguments);
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
                                  return _context9.stop();
                              }
                            }
                          }, _callee9);
                        })));

                      case 9:
                        _context10.t0 = interaction;
                        _context10.next = 12;
                        return generateClassPicked(currentIndex);

                      case 12:
                        _context10.t1 = _context10.sent;
                        _context10.t2 = [_context10.t1];
                        _context10.t3 = [];
                        _context10.t4 = {
                          files: _context10.t2,
                          components: _context10.t3
                        };
                        _context10.next = 18;
                        return _context10.t0.update.call(_context10.t0, _context10.t4);

                      case 18:
                        return _context10.abrupt("return");

                      case 19:
                        if (!interaction.customId.startsWith('Equip:')) {
                          _context10.next = 30;
                          break;
                        }

                        itemId = Number(interaction.customId.replace("Equip:", ""));
                        _context10.next = 23;
                        return (0, _equipItem.equipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 23:
                        _yield$equipItem = _context10.sent;
                        _yield$equipItem2 = (0, _slicedToArray2["default"])(_yield$equipItem, 4);
                        userCurrentCharacter = _yield$equipItem2[0];
                        equipedItem = _yield$equipItem2[1];
                        cannotEquip = _yield$equipItem2[2];
                        cannotEquipReason = _yield$equipItem2[3];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 30:
                        if (!interaction.customId.startsWith('Destroy:')) {
                          _context10.next = 66;
                          break;
                        }

                        _context10.t5 = interaction;
                        _context10.t6 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context10.t7 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context10.next = 41;
                          break;
                        }

                        _context10.next = 37;
                        return generateConfirmDestroyItemImage(currentIndex, userCurrentCharacter);

                      case 37:
                        _context10.t9 = _context10.sent;
                        _context10.t8 = [_context10.t9];
                        _context10.next = 45;
                        break;

                      case 41:
                        _context10.next = 43;
                        return generateEmptyInventoryImage();

                      case 43:
                        _context10.t10 = _context10.sent;
                        _context10.t8 = [_context10.t10];

                      case 45:
                        _context10.t11 = _context10.t8;
                        _context10.t12 = (0, _context10.t7)(_context10.t11);
                        _context10.t13 = _discord.MessageActionRow;
                        _context10.next = 50;
                        return (0, _buttons.generateDestroyYesButton)(currentIndex, userCurrentCharacter);

                      case 50:
                        _context10.t14 = _context10.sent;
                        _context10.t15 = [_context10.t14];
                        _context10.t16 = {
                          components: _context10.t15
                        };
                        _context10.t17 = new _context10.t13(_context10.t16);
                        _context10.t18 = _discord.MessageActionRow;
                        _context10.next = 57;
                        return (0, _buttons.generateDestroyNoButton)();

                      case 57:
                        _context10.t19 = _context10.sent;
                        _context10.t20 = [_context10.t19];
                        _context10.t21 = {
                          components: _context10.t20
                        };
                        _context10.t22 = new _context10.t18(_context10.t21);
                        _context10.t23 = [_context10.t17, _context10.t22];
                        _context10.t24 = {
                          content: _context10.t6,
                          files: _context10.t12,
                          components: _context10.t23
                        };
                        _context10.next = 65;
                        return _context10.t5.editReply.call(_context10.t5, _context10.t24);

                      case 65:
                        return _context10.abrupt("return");

                      case 66:
                        if (!interaction.customId.startsWith('ConfirmDestroy:')) {
                          _context10.next = 75;
                          break;
                        }

                        _itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
                        _context10.next = 70;
                        return (0, _destroyItem.destroyItem)(userCurrentCharacter, _itemId, discordChannel, io, queue);

                      case 70:
                        _yield$destroyItem = _context10.sent;
                        _yield$destroyItem2 = (0, _slicedToArray2["default"])(_yield$destroyItem, 2);
                        userCurrentCharacter = _yield$destroyItem2[0];
                        destroyedItem = _yield$destroyItem2[1];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 75:
                        if (!(interaction.customId === 'exitInventory')) {
                          _context10.next = 87;
                          break;
                        }

                        _context10.t25 = interaction;
                        _context10.t26 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context10.next = 80;
                        return generateExitInventoryImage();

                      case 80:
                        _context10.t27 = _context10.sent;
                        _context10.t28 = [_context10.t27];
                        _context10.t29 = [];
                        _context10.t30 = {
                          content: _context10.t26,
                          files: _context10.t28,
                          components: _context10.t29
                        };
                        _context10.next = 86;
                        return _context10.t25.editReply.call(_context10.t25, _context10.t30);

                      case 86:
                        return _context10.abrupt("return");

                      case 87:
                        if (interaction.customId === 'back' || interaction.customId === 'forward') {
                          interaction.customId === 'back' ? currentIndex -= 1 : currentIndex += 1;
                        }

                        _context10.t31 = interaction;
                        _context10.t32 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context10.t33 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context10.next = 98;
                          break;
                        }

                        _context10.next = 94;
                        return generateInventoryImage(userCurrentCharacter, destroyedItem, equipedItem, cannotEquip, cannotEquipReason, currentIndex);

                      case 94:
                        _context10.t35 = _context10.sent;
                        _context10.t34 = [_context10.t35];
                        _context10.next = 102;
                        break;

                      case 98:
                        _context10.next = 100;
                        return generateEmptyInventoryImage();

                      case 100:
                        _context10.t36 = _context10.sent;
                        _context10.t34 = [_context10.t36];

                      case 102:
                        _context10.t37 = _context10.t34;
                        _context10.t38 = (0, _context10.t33)(_context10.t37);
                        _context10.t39 = [];
                        _context10.t40 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context10.next = 117;
                          break;
                        }

                        _context10.t42 = _discord.MessageActionRow;
                        _context10.next = 110;
                        return generateEquipmentCompareButton(currentIndex);

                      case 110:
                        _context10.t43 = _context10.sent;
                        _context10.t44 = [_context10.t43];
                        _context10.t45 = {
                          components: _context10.t44
                        };
                        _context10.t46 = new _context10.t42(_context10.t45);
                        _context10.t41 = [_context10.t46];
                        _context10.next = 118;
                        break;

                      case 117:
                        _context10.t41 = [];

                      case 118:
                        _context10.t47 = _context10.t41;
                        _context10.t48 = (0, _context10.t40)(_context10.t47);
                        _context10.t49 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context10.next = 135;
                          break;
                        }

                        _context10.t51 = _discord.MessageActionRow;
                        _context10.next = 125;
                        return (0, _buttons.generateEquipItemButton)(currentIndex, userCurrentCharacter);

                      case 125:
                        _context10.t52 = _context10.sent;
                        _context10.next = 128;
                        return (0, _buttons.generateDestroyItemButton)(currentIndex, userCurrentCharacter);

                      case 128:
                        _context10.t53 = _context10.sent;
                        _context10.t54 = [_context10.t52, _context10.t53];
                        _context10.t55 = {
                          components: _context10.t54
                        };
                        _context10.t56 = new _context10.t51(_context10.t55);
                        _context10.t50 = [_context10.t56];
                        _context10.next = 136;
                        break;

                      case 135:
                        _context10.t50 = [];

                      case 136:
                        _context10.t57 = _context10.t50;
                        _context10.t58 = (0, _context10.t49)(_context10.t57);
                        _context10.t59 = (0, _toConsumableArray2["default"])(userCurrentCharacter.inventory.items.length > 1 ? [new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [(0, _buttons.generateBackButton)()] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < userCurrentCharacter.inventory.items.length ? [(0, _buttons.generateForwardButton)()] : []))
                        })] : []);
                        _context10.t60 = _discord.MessageActionRow;
                        _context10.next = 142;
                        return (0, _buttons.generateExitInventoryButton)();

                      case 142:
                        _context10.t61 = _context10.sent;
                        _context10.t62 = [_context10.t61];
                        _context10.t63 = {
                          components: _context10.t62
                        };
                        _context10.t64 = new _context10.t60(_context10.t63);
                        _context10.t65 = [_context10.t64];
                        _context10.t66 = _context10.t39.concat.call(_context10.t39, _context10.t48, _context10.t58, _context10.t59, _context10.t65);
                        _context10.t67 = {
                          content: _context10.t32,
                          files: _context10.t38,
                          components: _context10.t66
                        };
                        _context10.next = 151;
                        return _context10.t31.editReply.call(_context10.t31, _context10.t67);

                      case 151:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x19) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 98:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function discordShowInventory(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordShowInventory = discordShowInventory;