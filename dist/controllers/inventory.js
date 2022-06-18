"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordShowInventory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _models = _interopRequireDefault(require("../models"));

var _generateItemImage = require("../helpers/items/generateItemImage");

var _generateStatsImage = require("../helpers/stats/generateStatsImage");

var _generateEquipmentImage = require("../helpers/equipment/generateEquipmentImage");

var _destroyItem = require("../helpers/items/destroyItem");

var _equipItem = require("../helpers/equipment/equipItem");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

/* eslint-disable import/prefer-default-export */
var discordShowInventory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(discordClient, message, setting, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, exitInventoryId, backId, forwardId, backButton, forwardButton, generateExitInventoryButton, generateConfirmDestroyItemImage, generateInventoryImage, generateClassPicked, generateExitInventoryImage, generateEmptyInventoryImage, generateEquipmentCompareButton, generateEquipItemButton, generateDestroyYesButton, generateDestroyNoButton, generateDestroyItemButton, canFitOnOnePage, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            activity = [];
            _context16.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context16.sent;
            _context16.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context16.sent;
            _context16.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            true // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context16.sent;

            if (userCurrentCharacter) {
              _context16.next = 14;
              break;
            }

            _context16.next = 13;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 13:
            return _context16.abrupt("return");

          case 14:
            exitInventoryId = 'exitInventory';
            backId = 'back';
            forwardId = 'forward';
            backButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Back',
              emoji: '⬅️',
              customId: backId
            });
            forwardButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Next',
              emoji: '➡️',
              customId: forwardId
            });

            generateExitInventoryButton = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Exit Inventory",
                          emoji: '❌',
                          customId: exitInventoryId
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateExitInventoryButton() {
                return _ref2.apply(this, arguments);
              };
            }();

            _context16.next = 22;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 22:
            generateConfirmDestroyItemImage = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(currentUserCharacter, start) {
                var current, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        current = currentUserCharacter.inventory.items.slice(start, start + 1);
                        _context2.next = 3;
                        return (0, _generateItemImage.generateItemImage)(current[0]);

                      case 3:
                        inventoryItemOneBuffer = _context2.sent;
                        _context2.next = 6;
                        return (0, _canvas.loadImage)(inventoryItemOneBuffer);

                      case 6:
                        inventoryItemOne = _context2.sent;
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
                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'destroy.png'));

                      case 25:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateConfirmDestroyItemImage(_x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }();

            generateInventoryImage = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(currentUserCharacter, itemDestroyed, itemEquiped, cannotEquip, cannotEquipReason, start) {
                var current, extraDestroyedHeight, extraEquipedHeight, extraCannotEquipedHeight, inventoryItemOneBuffer, inventoryItemOne, canvas, ctx;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        current = currentUserCharacter.inventory.items.slice(start, start + 1); // console.log(current);
                        // console.log(current[0]);
                        // console.log('after current select');

                        extraDestroyedHeight = itemDestroyed ? 20 : 0;
                        extraEquipedHeight = itemEquiped && !cannotEquip ? 20 : 0;
                        extraCannotEquipedHeight = cannotEquip ? 60 : 0;
                        _context3.next = 6;
                        return (0, _generateItemImage.generateItemImage)(current[0]);

                      case 6:
                        inventoryItemOneBuffer = _context3.sent;
                        _context3.next = 9;
                        return (0, _canvas.loadImage)(inventoryItemOneBuffer);

                      case 9:
                        inventoryItemOne = _context3.sent;
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

                        return _context3.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'inventory.png'));

                      case 24:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateInventoryImage(_x8, _x9, _x10, _x11, _x12, _x13) {
                return _ref4.apply(this, arguments);
              };
            }();

            generateClassPicked = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(start) {
                var current, canvas, ctx;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        ctx.fillText("".concat(userCurrentCharacter.user.username, " picked ").concat(current[0].name, "!"), 250, 40, 500);
                        return _context4.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'picked.png'));

                      case 11:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generateClassPicked(_x14) {
                return _ref5.apply(this, arguments);
              };
            }();

            generateExitInventoryImage = /*#__PURE__*/function () {
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
                        ctx.strokeText("".concat(userCurrentCharacter.user.username, " canceled class selection"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.user.username, " canceled class selection"), 250, 60, 500);
                        return _context5.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function generateExitInventoryImage(_x15) {
                return _ref6.apply(this, arguments);
              };
            }();

            generateEmptyInventoryImage = /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(start) {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.user.username, " Your inventory is empty"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.user.username, " Your inventory is empty"), 250, 60, 500);
                        return _context6.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'emptyInventory.png'));

                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function generateEmptyInventoryImage(_x16) {
                return _ref7.apply(this, arguments);
              };
            }();

            generateEquipmentCompareButton = /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(start) {
                var current, equipItemId;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        equipItemId = "Compare:".concat(current[0].id);
                        return _context7.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Compare ".concat(current[0].name),
                          emoji: '👀',
                          customId: equipItemId
                        }).setDisabled(true));

                      case 3:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function generateEquipmentCompareButton(_x17) {
                return _ref8.apply(this, arguments);
              };
            }();

            generateEquipItemButton = /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(start) {
                var current, equipItemId;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        equipItemId = "Equip:".concat(current[0].id);
                        return _context8.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Equip ".concat(current[0].name),
                          emoji: '⛏️',
                          customId: equipItemId
                        }));

                      case 3:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function generateEquipItemButton(_x18) {
                return _ref9.apply(this, arguments);
              };
            }();

            generateDestroyYesButton = /*#__PURE__*/function () {
              var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(start) {
                var current, destroyYesButtonId;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        destroyYesButtonId = "ConfirmDestroy:".concat(current[0].id);
                        return _context9.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Yes, destroy ".concat(current[0].name),
                          emoji: '🚮',
                          customId: destroyYesButtonId
                        }));

                      case 3:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function generateDestroyYesButton(_x19) {
                return _ref10.apply(this, arguments);
              };
            }();

            generateDestroyNoButton = /*#__PURE__*/function () {
              var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(start) {
                var destroyNoButtonId;
                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        destroyNoButtonId = "cancelDestroy";
                        return _context10.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "No, go back",
                          emoji: '⬅️',
                          customId: destroyNoButtonId
                        }));

                      case 2:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function generateDestroyNoButton(_x20) {
                return _ref11.apply(this, arguments);
              };
            }();

            generateDestroyItemButton = /*#__PURE__*/function () {
              var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(start) {
                var current, destroyItemId;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        current = userCurrentCharacter.inventory.items.slice(start, start + 1);
                        destroyItemId = "Destroy:".concat(current[0].id);
                        return _context11.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Destroy ".concat(current[0].name),
                          emoji: '❌',
                          customId: destroyItemId
                        }));

                      case 3:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function generateDestroyItemButton(_x21) {
                return _ref12.apply(this, arguments);
              };
            }();

            canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;
            _context16.t0 = discordChannel;
            _context16.t1 = _toConsumableArray2["default"];

            if (!(userCurrentCharacter.inventory.items.length > 0)) {
              _context16.next = 42;
              break;
            }

            _context16.next = 38;
            return generateInventoryImage(userCurrentCharacter, false, false, false, false, 0);

          case 38:
            _context16.t3 = _context16.sent;
            _context16.t2 = [_context16.t3];
            _context16.next = 46;
            break;

          case 42:
            _context16.next = 44;
            return generateEmptyInventoryImage();

          case 44:
            _context16.t4 = _context16.sent;
            _context16.t2 = [_context16.t4];

          case 46:
            _context16.t5 = _context16.t2;
            _context16.t6 = (0, _context16.t1)(_context16.t5);
            _context16.t7 = [];
            _context16.t8 = _toConsumableArray2["default"];
            _context16.t9 = userCurrentCharacter.inventory.items.length > 0;

            if (!_context16.t9) {
              _context16.next = 70;
              break;
            }

            _context16.t10 = _discord.MessageActionRow;
            _context16.next = 55;
            return generateEquipmentCompareButton(0);

          case 55:
            _context16.t11 = _context16.sent;
            _context16.t12 = [_context16.t11];
            _context16.t13 = {
              components: _context16.t12
            };
            _context16.t14 = new _context16.t10(_context16.t13);
            _context16.t15 = _discord.MessageActionRow;
            _context16.next = 62;
            return generateEquipItemButton(0);

          case 62:
            _context16.t16 = _context16.sent;
            _context16.next = 65;
            return generateDestroyItemButton(0);

          case 65:
            _context16.t17 = _context16.sent;
            _context16.t18 = [_context16.t16, _context16.t17];
            _context16.t19 = {
              components: _context16.t18
            };
            _context16.t20 = new _context16.t15(_context16.t19);
            _context16.t9 = [_context16.t14, _context16.t20];

          case 70:
            _context16.t21 = _context16.t9;
            _context16.t22 = (0, _context16.t8)(_context16.t21);
            _context16.t23 = (0, _toConsumableArray2["default"])(!canFitOnOnePage ? [new _discord.MessageActionRow({
              components: [forwardButton]
            })] : []);
            _context16.t24 = _toConsumableArray2["default"];
            _context16.t25 = userCurrentCharacter.inventory.items.length > 0;

            if (!_context16.t25) {
              _context16.next = 84;
              break;
            }

            _context16.t26 = _discord.MessageActionRow;
            _context16.next = 79;
            return generateExitInventoryButton();

          case 79:
            _context16.t27 = _context16.sent;
            _context16.t28 = [_context16.t27];
            _context16.t29 = {
              components: _context16.t28
            };
            _context16.t30 = new _context16.t26(_context16.t29);
            _context16.t25 = [_context16.t30];

          case 84:
            _context16.t31 = _context16.t25;
            _context16.t32 = (0, _context16.t24)(_context16.t31);
            _context16.t33 = _context16.t7.concat.call(_context16.t7, _context16.t22, _context16.t23, _context16.t32);
            _context16.t34 = {
              files: _context16.t6,
              components: _context16.t33
            };
            _context16.next = 90;
            return _context16.t0.send.call(_context16.t0, _context16.t34);

          case 90:
            embedMessage = _context16.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref13) {
                var discordUser = _ref13.user;
                return discordUser.id === userCurrentCharacter.user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(interaction) {
                var destroyedItem, equipedItem, cannotEquip, cannotEquipReason, updatedUserCharacter, itemId, _yield$equipItem, _yield$equipItem2, _itemId, _yield$destroyItem, _yield$destroyItem2;

                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return interaction.deferUpdate();

                      case 2:
                        destroyedItem = false;
                        equipedItem = false;
                        cannotEquip = false;
                        cannotEquipReason = '';

                        if (!interaction.customId.startsWith('Compare:')) {
                          _context15.next = 19;
                          break;
                        }

                        _context15.next = 9;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
                          return _regenerator["default"].wrap(function _callee14$(_context14) {
                            while (1) {
                              switch (_context14.prev = _context14.next) {
                                case 0:
                                  _context14.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(t) {
                                      return _regenerator["default"].wrap(function _callee12$(_context12) {
                                        while (1) {
                                          switch (_context12.prev = _context12.next) {
                                            case 0:
                                              console.log('item compare');

                                            case 1:
                                            case "end":
                                              return _context12.stop();
                                          }
                                        }
                                      }, _callee12);
                                    }));

                                    return function (_x23) {
                                      return _ref16.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(err) {
                                      return _regenerator["default"].wrap(function _callee13$(_context13) {
                                        while (1) {
                                          switch (_context13.prev = _context13.next) {
                                            case 0:
                                              console.log(err);

                                            case 1:
                                            case "end":
                                              return _context13.stop();
                                          }
                                        }
                                      }, _callee13);
                                    }));

                                    return function (_x24) {
                                      return _ref17.apply(this, arguments);
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
                                  return _context14.stop();
                              }
                            }
                          }, _callee14);
                        })));

                      case 9:
                        _context15.t0 = interaction;
                        _context15.next = 12;
                        return generateClassPicked(currentIndex);

                      case 12:
                        _context15.t1 = _context15.sent;
                        _context15.t2 = [_context15.t1];
                        _context15.t3 = [];
                        _context15.t4 = {
                          files: _context15.t2,
                          components: _context15.t3
                        };
                        _context15.next = 18;
                        return _context15.t0.update.call(_context15.t0, _context15.t4);

                      case 18:
                        return _context15.abrupt("return");

                      case 19:
                        if (!interaction.customId.startsWith('Equip:')) {
                          _context15.next = 30;
                          break;
                        }

                        itemId = Number(interaction.customId.replace("Equip:", ""));
                        _context15.next = 23;
                        return (0, _equipItem.equipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 23:
                        _yield$equipItem = _context15.sent;
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
                          _context15.next = 65;
                          break;
                        }

                        _context15.t5 = interaction;
                        _context15.t6 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context15.next = 40;
                          break;
                        }

                        _context15.next = 36;
                        return generateConfirmDestroyItemImage(userCurrentCharacter, currentIndex);

                      case 36:
                        _context15.t8 = _context15.sent;
                        _context15.t7 = [_context15.t8];
                        _context15.next = 44;
                        break;

                      case 40:
                        _context15.next = 42;
                        return generateEmptyInventoryImage();

                      case 42:
                        _context15.t9 = _context15.sent;
                        _context15.t7 = [_context15.t9];

                      case 44:
                        _context15.t10 = _context15.t7;
                        _context15.t11 = (0, _context15.t6)(_context15.t10);
                        _context15.t12 = _discord.MessageActionRow;
                        _context15.next = 49;
                        return generateDestroyYesButton(currentIndex);

                      case 49:
                        _context15.t13 = _context15.sent;
                        _context15.t14 = [_context15.t13];
                        _context15.t15 = {
                          components: _context15.t14
                        };
                        _context15.t16 = new _context15.t12(_context15.t15);
                        _context15.t17 = _discord.MessageActionRow;
                        _context15.next = 56;
                        return generateDestroyNoButton();

                      case 56:
                        _context15.t18 = _context15.sent;
                        _context15.t19 = [_context15.t18];
                        _context15.t20 = {
                          components: _context15.t19
                        };
                        _context15.t21 = new _context15.t17(_context15.t20);
                        _context15.t22 = [_context15.t16, _context15.t21];
                        _context15.t23 = {
                          files: _context15.t11,
                          components: _context15.t22
                        };
                        _context15.next = 64;
                        return _context15.t5.editReply.call(_context15.t5, _context15.t23);

                      case 64:
                        return _context15.abrupt("return");

                      case 65:
                        if (!interaction.customId.startsWith('ConfirmDestroy:')) {
                          _context15.next = 74;
                          break;
                        }

                        _itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
                        _context15.next = 69;
                        return (0, _destroyItem.destroyItem)(userCurrentCharacter, _itemId, discordChannel, io, queue);

                      case 69:
                        _yield$destroyItem = _context15.sent;
                        _yield$destroyItem2 = (0, _slicedToArray2["default"])(_yield$destroyItem, 2);
                        userCurrentCharacter = _yield$destroyItem2[0];
                        destroyedItem = _yield$destroyItem2[1];

                        if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
                          currentIndex -= 1;
                        }

                      case 74:
                        if (!(interaction.customId === exitInventoryId)) {
                          _context15.next = 85;
                          break;
                        }

                        _context15.t24 = interaction;
                        _context15.next = 78;
                        return generateExitInventoryImage();

                      case 78:
                        _context15.t25 = _context15.sent;
                        _context15.t26 = [_context15.t25];
                        _context15.t27 = [];
                        _context15.t28 = {
                          files: _context15.t26,
                          components: _context15.t27
                        };
                        _context15.next = 84;
                        return _context15.t24.update.call(_context15.t24, _context15.t28);

                      case 84:
                        return _context15.abrupt("return");

                      case 85:
                        if (interaction.customId === backId || interaction.customId === forwardId) {
                          interaction.customId === backId ? currentIndex -= 1 : currentIndex += 1;
                        }

                        _context15.t29 = interaction;
                        _context15.t30 = _toConsumableArray2["default"];

                        if (!(userCurrentCharacter.inventory.items.length > 0)) {
                          _context15.next = 95;
                          break;
                        }

                        _context15.next = 91;
                        return generateInventoryImage(userCurrentCharacter, destroyedItem, equipedItem, cannotEquip, cannotEquipReason, currentIndex);

                      case 91:
                        _context15.t32 = _context15.sent;
                        _context15.t31 = [_context15.t32];
                        _context15.next = 99;
                        break;

                      case 95:
                        _context15.next = 97;
                        return generateEmptyInventoryImage();

                      case 97:
                        _context15.t33 = _context15.sent;
                        _context15.t31 = [_context15.t33];

                      case 99:
                        _context15.t34 = _context15.t31;
                        _context15.t35 = (0, _context15.t30)(_context15.t34);
                        _context15.t36 = _discord.MessageActionRow;
                        _context15.next = 104;
                        return generateEquipmentCompareButton(currentIndex);

                      case 104:
                        _context15.t37 = _context15.sent;
                        _context15.t38 = [_context15.t37];
                        _context15.t39 = {
                          components: _context15.t38
                        };
                        _context15.t40 = new _context15.t36(_context15.t39);
                        _context15.t41 = _discord.MessageActionRow;
                        _context15.next = 111;
                        return generateEquipItemButton(currentIndex);

                      case 111:
                        _context15.t42 = _context15.sent;
                        _context15.next = 114;
                        return generateDestroyItemButton(currentIndex);

                      case 114:
                        _context15.t43 = _context15.sent;
                        _context15.t44 = [_context15.t42, _context15.t43];
                        _context15.t45 = {
                          components: _context15.t44
                        };
                        _context15.t46 = new _context15.t41(_context15.t45);
                        _context15.t47 = new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(currentIndex ? [backButton] : []), (0, _toConsumableArray2["default"])(currentIndex + 1 < userCurrentCharacter.inventory.items.length ? [forwardButton] : []))
                        });
                        _context15.t48 = _discord.MessageActionRow;
                        _context15.next = 122;
                        return generateExitInventoryButton();

                      case 122:
                        _context15.t49 = _context15.sent;
                        _context15.t50 = [_context15.t49];
                        _context15.t51 = {
                          components: _context15.t50
                        };
                        _context15.t52 = new _context15.t48(_context15.t51);
                        _context15.t53 = [_context15.t40, _context15.t46, _context15.t47, _context15.t52];
                        _context15.t54 = {
                          files: _context15.t35,
                          components: _context15.t53
                        };
                        _context15.next = 130;
                        return _context15.t29.editReply.call(_context15.t29, _context15.t54);

                      case 130:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              }));

              return function (_x22) {
                return _ref14.apply(this, arguments);
              };
            }());

          case 94:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function discordShowInventory(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordShowInventory = discordShowInventory;