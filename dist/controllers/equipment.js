"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordShowEquipment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _item = require("../render/item");

var _stats = require("../render/stats");

var _equipment = require("../render/equipment");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _unEquipItem = require("../helpers/equipment/unEquipItem");

var _messages = require("../messages");

var _isUserInRealm = _interopRequireDefault(require("../helpers/realm/isUserInRealm"));

/* eslint-disable import/prefer-default-export */
var showEquipmentImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter) {
    var itemImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _item.renderItemImage)(userCurrentCharacter.equipment.helm);

          case 2:
            itemImage = _context.sent;
            console.log(showEquipmentImage);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function showEquipmentImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var discordShowEquipment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(discordClient, message, setting, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, isInRealm, cancelEquipmentId, backId, helmId, amuletId, mainHandId, offHandId, armorId, glovesId, beltId, bootsId, ringSlotOneId, ringSlotTwoId, ringSlotOneButton, ringSlotTwoButton, bootsButton, helmButton, amuletutton, weaponSlotOneButton, weaponSlotTwoButton, armorButton, glovesButton, beltButton, backButton, generateCancelEquipmentButton, generateUnEquipItemButton, generateCurrentEquipmentImage, generateCancelEquipmentImage, isRowOneActive, isRowTwoActive, embedMessage, collector, currentIndex;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            activity = [];
            _context10.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context10.sent;
            _context10.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context10.sent;
            _context10.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context10.sent;
            _context10.next = 12;
            return (0, _isUserInRealm["default"])(discordClient, userCurrentCharacter);

          case 12:
            isInRealm = _context10.sent;

            if (isInRealm) {
              _context10.next = 24;
              break;
            }

            _context10.t0 = message;
            _context10.t1 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, ").concat(userCurrentCharacter.UserGroup.group.inviteLink);
            _context10.next = 18;
            return (0, _messages.needToBeInDiscordRealmEmbed)(userCurrentCharacter.UserGroup.group);

          case 18:
            _context10.t2 = _context10.sent;
            _context10.t3 = [_context10.t2];
            _context10.t4 = {
              content: _context10.t1,
              embeds: _context10.t3,
              ephemeral: true
            };
            _context10.next = 23;
            return _context10.t0.reply.call(_context10.t0, _context10.t4);

          case 23:
            return _context10.abrupt("return");

          case 24:
            if (userCurrentCharacter) {
              _context10.next = 28;
              break;
            }

            _context10.next = 27;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
              ephemeral: true
            });

          case 27:
            return _context10.abrupt("return");

          case 28:
            cancelEquipmentId = 'cancelEquipment';
            backId = 'back';
            helmId = 'helm';
            amuletId = 'amulet';
            mainHandId = 'weaponSlotOne';
            offHandId = 'weaponSlotTwo';
            armorId = 'armor';
            glovesId = 'gloves';
            beltId = 'belt';
            bootsId = 'boots';
            ringSlotOneId = 'ringSlotOne';
            ringSlotTwoId = 'ringSlotTwo';
            ringSlotOneButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped RingSlot One',
              emoji: '💍',
              customId: ringSlotOneId
            });
            ringSlotTwoButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped RingSlot Two',
              emoji: '💍',
              customId: ringSlotTwoId
            });
            bootsButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Boots',
              emoji: '🥾',
              customId: bootsId
            });
            helmButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Helm',
              emoji: '🪖',
              customId: helmId
            });
            amuletutton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Amulet',
              emoji: '🧿',
              customId: amuletId
            });
            weaponSlotOneButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Main Hand',
              emoji: '🗡️',
              customId: mainHandId
            });
            weaponSlotTwoButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Off Hand',
              emoji: '🛡️',
              customId: offHandId
            });
            armorButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Armor',
              emoji: '🦺',
              customId: armorId
            });
            glovesButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Gloves',
              emoji: '🧤',
              customId: glovesId
            });
            beltButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Show Equiped Belt',
              emoji: '〰️',
              customId: beltId
            });
            backButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Back to Equipment',
              emoji: '⬅️',
              customId: backId
            });

            generateCancelEquipmentButton = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Cancel Equipment",
                          emoji: '❌',
                          customId: cancelEquipmentId
                        }));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateCancelEquipmentButton() {
                return _ref3.apply(this, arguments);
              };
            }();

            generateUnEquipItemButton = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(myItem) {
                var unEquipItemId;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        unEquipItemId = "UnEquip:".concat(myItem.id);
                        return _context3.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "UnEquip ".concat(myItem.name),
                          emoji: '⛏️',
                          customId: unEquipItemId
                        }));

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateUnEquipItemButton(_x7) {
                return _ref4.apply(this, arguments);
              };
            }();

            _context10.next = 55;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 55:
            generateCurrentEquipmentImage = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userCurrentCharacter) {
                var statsImageBuffer, statsImage, equipmentImageBuffer, equipmentImage, canvas, ctx;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return (0, _stats.renderStatsImage)(userCurrentCharacter, false);

                      case 2:
                        statsImageBuffer = _context4.sent;
                        _context4.next = 5;
                        return (0, _canvas.loadImage)(statsImageBuffer);

                      case 5:
                        statsImage = _context4.sent;
                        _context4.next = 8;
                        return (0, _equipment.renderEquipmentImage)(userCurrentCharacter);

                      case 8:
                        equipmentImageBuffer = _context4.sent;
                        _context4.next = 11;
                        return (0, _canvas.loadImage)(equipmentImageBuffer);

                      case 11:
                        equipmentImage = _context4.sent;
                        canvas = (0, _canvas.createCanvas)(2420, 1300);
                        ctx = canvas.getContext('2d'); // Stats image

                        ctx.drawImage(statsImage, 0, // x position
                        0, // y position
                        960, // width
                        1300 // height
                        ); // Equipment Image

                        ctx.drawImage(equipmentImage, 960, 0, 1460, 1300);
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc"; // ctx.textAlign = "center";

                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        return _context4.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'inventory.png'));

                      case 21:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generateCurrentEquipmentImage(_x8) {
                return _ref5.apply(this, arguments);
              };
            }();

            generateCancelEquipmentImage = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
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
                        ctx.strokeText("".concat(userCurrentCharacter.UserGroup.user.username, " canceled equipment screen"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.UserGroup.user.username, " canceled equipment screen"), 250, 60, 500);
                        return _context5.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelEquipment.png'));

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function generateCancelEquipmentImage() {
                return _ref6.apply(this, arguments);
              };
            }();

            isRowOneActive = userCurrentCharacter.equipment.helm || userCurrentCharacter.equipment.amulet || userCurrentCharacter.equipment.mainHand || userCurrentCharacter.equipment.offHand || userCurrentCharacter.equipment.armor;
            isRowTwoActive = userCurrentCharacter.equipment.gloves || userCurrentCharacter.equipment.ringSlotOne || userCurrentCharacter.equipment.ringSlotTwo || userCurrentCharacter.equipment.belt || userCurrentCharacter.equipment.boots;
            _context10.t5 = discordChannel;
            _context10.next = 62;
            return generateCurrentEquipmentImage(userCurrentCharacter);

          case 62:
            _context10.t6 = _context10.sent;
            _context10.t7 = [_context10.t6];

            if (!(isRowOneActive || isRowTwoActive)) {
              _context10.next = 79;
              break;
            }

            _context10.t9 = [];
            _context10.t10 = (0, _toConsumableArray2["default"])(isRowOneActive ? [new _discord.MessageActionRow({
              components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.helm ? [helmButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.amulet ? [amuletutton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.mainHand ? [weaponSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.offHand ? [weaponSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.armor ? [armorButton] : []))
            })] : []);
            _context10.t11 = (0, _toConsumableArray2["default"])(isRowTwoActive ? [new _discord.MessageActionRow({
              components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.gloves ? [glovesButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotOne ? [ringSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotTwo ? [ringSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.belt ? [beltButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.boots ? [bootsButton] : []))
            })] : []);
            _context10.t12 = _discord.MessageActionRow;
            _context10.next = 71;
            return generateCancelEquipmentButton();

          case 71:
            _context10.t13 = _context10.sent;
            _context10.t14 = [_context10.t13];
            _context10.t15 = {
              components: _context10.t14
            };
            _context10.t16 = new _context10.t12(_context10.t15);
            _context10.t17 = [_context10.t16];
            _context10.t8 = _context10.t9.concat.call(_context10.t9, _context10.t10, _context10.t11, _context10.t17);
            _context10.next = 87;
            break;

          case 79:
            _context10.t18 = _discord.MessageActionRow;
            _context10.next = 82;
            return generateCancelEquipmentButton();

          case 82:
            _context10.t19 = _context10.sent;
            _context10.t20 = [_context10.t19];
            _context10.t21 = {
              components: _context10.t20
            };
            _context10.t22 = new _context10.t18(_context10.t21);
            _context10.t8 = [_context10.t22];

          case 87:
            _context10.t23 = _context10.t8;
            _context10.t24 = {
              files: _context10.t7,
              components: _context10.t23
            };
            _context10.next = 91;
            return _context10.t5.send.call(_context10.t5, _context10.t24);

          case 91:
            embedMessage = _context10.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref7) {
                var discordUser = _ref7.user;
                return discordUser.id === userCurrentCharacter.UserGroup.user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(interaction) {
                var equipedItem, cannotUnEquip, cannotUnEquipReason, itemId, _yield$unEquipItem, _yield$unEquipItem2;

                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return interaction.deferUpdate();

                      case 2:
                        cannotUnEquipReason = '';

                        if (!(interaction.customId === helmId || interaction.customId === amuletId || interaction.customId === mainHandId || interaction.customId === offHandId || interaction.customId === armorId || interaction.customId === glovesId || interaction.customId === beltId || interaction.customId === bootsId || interaction.customId === ringSlotOneId || interaction.customId === ringSlotTwoId)) {
                          _context9.next = 7;
                          break;
                        }

                        _context9.next = 6;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                          return _regenerator["default"].wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(t) {
                                      var itemImage, itemToUnEquip, preActivity, finalActivity;
                                      return _regenerator["default"].wrap(function _callee6$(_context6) {
                                        while (1) {
                                          switch (_context6.prev = _context6.next) {
                                            case 0:
                                              _context6.next = 2;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 2:
                                              userCurrentCharacter = _context6.sent;

                                              if (!(interaction.customId === helmId)) {
                                                _context6.next = 8;
                                                break;
                                              }

                                              _context6.next = 6;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.helm);

                                            case 6:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.helm;

                                            case 8:
                                              if (!(interaction.customId === amuletId)) {
                                                _context6.next = 13;
                                                break;
                                              }

                                              _context6.next = 11;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.amulet);

                                            case 11:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.amulet;

                                            case 13:
                                              if (!(interaction.customId === mainHandId)) {
                                                _context6.next = 18;
                                                break;
                                              }

                                              _context6.next = 16;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.mainHand);

                                            case 16:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.mainHand;

                                            case 18:
                                              if (!(interaction.customId === offHandId)) {
                                                _context6.next = 23;
                                                break;
                                              }

                                              _context6.next = 21;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.offHand);

                                            case 21:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.offHand;

                                            case 23:
                                              if (!(interaction.customId === armorId)) {
                                                _context6.next = 28;
                                                break;
                                              }

                                              _context6.next = 26;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.armor);

                                            case 26:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.armor;

                                            case 28:
                                              if (!(interaction.customId === glovesId)) {
                                                _context6.next = 33;
                                                break;
                                              }

                                              _context6.next = 31;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.gloves);

                                            case 31:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.gloves;

                                            case 33:
                                              if (!(interaction.customId === beltId)) {
                                                _context6.next = 38;
                                                break;
                                              }

                                              _context6.next = 36;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.belt);

                                            case 36:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.belt;

                                            case 38:
                                              if (!(interaction.customId === bootsId)) {
                                                _context6.next = 43;
                                                break;
                                              }

                                              _context6.next = 41;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.boots);

                                            case 41:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.boots;

                                            case 43:
                                              if (!(interaction.customId === ringSlotOneId)) {
                                                _context6.next = 48;
                                                break;
                                              }

                                              _context6.next = 46;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.ringSlotOne);

                                            case 46:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.ringSlotOne;

                                            case 48:
                                              if (!(interaction.customId === ringSlotTwoId)) {
                                                _context6.next = 53;
                                                break;
                                              }

                                              _context6.next = 51;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.ringSlotTwo);

                                            case 51:
                                              itemImage = _context6.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.ringSlotTwo;

                                            case 53:
                                              _context6.t0 = interaction;
                                              _context6.t1 = [itemImage];
                                              _context6.t2 = _discord.MessageActionRow;
                                              _context6.next = 58;
                                              return generateUnEquipItemButton(itemToUnEquip);

                                            case 58:
                                              _context6.t3 = _context6.sent;
                                              _context6.t4 = [_context6.t3];
                                              _context6.t5 = {
                                                components: _context6.t4
                                              };
                                              _context6.t6 = new _context6.t2(_context6.t5);
                                              _context6.t7 = new _discord.MessageActionRow({
                                                components: [backButton]
                                              });
                                              _context6.t8 = [_context6.t6, _context6.t7];
                                              _context6.t9 = {
                                                files: _context6.t1,
                                                components: _context6.t8
                                              };
                                              _context6.next = 67;
                                              return _context6.t0.editReply.call(_context6.t0, _context6.t9);

                                            case 67:
                                              _context6.next = 69;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: userCurrentCharacter.user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 69:
                                              preActivity = _context6.sent;
                                              _context6.next = 72;
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

                                            case 72:
                                              finalActivity = _context6.sent;
                                              activity.unshift(finalActivity);

                                            case 74:
                                            case "end":
                                              return _context6.stop();
                                          }
                                        }
                                      }, _callee6);
                                    }));

                                    return function (_x10) {
                                      return _ref10.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
                                      return _regenerator["default"].wrap(function _callee7$(_context7) {
                                        while (1) {
                                          switch (_context7.prev = _context7.next) {
                                            case 0:
                                              console.log(err);
                                              _context7.prev = 1;
                                              _context7.next = 4;
                                              return _models["default"].error.create({
                                                type: 'Equipment',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context7.next = 9;
                                              break;

                                            case 6:
                                              _context7.prev = 6;
                                              _context7.t0 = _context7["catch"](1);

                                              _logger["default"].error("Error Discord: ".concat(_context7.t0));

                                            case 9:
                                            case "end":
                                              return _context7.stop();
                                          }
                                        }
                                      }, _callee7, null, [[1, 6]]);
                                    }));

                                    return function (_x11) {
                                      return _ref11.apply(this, arguments);
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
                                  return _context8.stop();
                              }
                            }
                          }, _callee8);
                        })));

                      case 6:
                        return _context9.abrupt("return");

                      case 7:
                        if (!(interaction.customId === cancelEquipmentId)) {
                          _context9.next = 18;
                          break;
                        }

                        _context9.t0 = interaction;
                        _context9.next = 11;
                        return generateCancelEquipmentImage();

                      case 11:
                        _context9.t1 = _context9.sent;
                        _context9.t2 = [_context9.t1];
                        _context9.t3 = [];
                        _context9.t4 = {
                          files: _context9.t2,
                          components: _context9.t3
                        };
                        _context9.next = 17;
                        return _context9.t0.editReply.call(_context9.t0, _context9.t4);

                      case 17:
                        return _context9.abrupt("return");

                      case 18:
                        if (!interaction.customId.startsWith('UnEquip:')) {
                          _context9.next = 29;
                          break;
                        }

                        console.log('detected unequip click');
                        itemId = Number(interaction.customId.replace("UnEquip:", ""));
                        _context9.next = 23;
                        return (0, _unEquipItem.unEquipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 23:
                        _yield$unEquipItem = _context9.sent;
                        _yield$unEquipItem2 = (0, _slicedToArray2["default"])(_yield$unEquipItem, 4);
                        userCurrentCharacter = _yield$unEquipItem2[0];
                        equipedItem = _yield$unEquipItem2[1];
                        cannotUnEquip = _yield$unEquipItem2[2];
                        cannotUnEquipReason = _yield$unEquipItem2[3];

                      case 29:
                        isRowOneActive = userCurrentCharacter.equipment.helm || userCurrentCharacter.equipment.amulet || userCurrentCharacter.equipment.mainHand || userCurrentCharacter.equipment.offHand || userCurrentCharacter.equipment.armor;
                        isRowTwoActive = userCurrentCharacter.equipment.gloves || userCurrentCharacter.equipment.ringSlotOne || userCurrentCharacter.equipment.ringSlotTwo || userCurrentCharacter.equipment.belt || userCurrentCharacter.equipment.boots;
                        console.log('before edit reply'); // Load another character

                        _context9.t5 = interaction;
                        _context9.next = 35;
                        return generateCurrentEquipmentImage(userCurrentCharacter);

                      case 35:
                        _context9.t6 = _context9.sent;
                        _context9.t7 = [_context9.t6];

                        if (!(isRowOneActive || isRowTwoActive)) {
                          _context9.next = 52;
                          break;
                        }

                        _context9.t9 = [];
                        _context9.t10 = (0, _toConsumableArray2["default"])(isRowOneActive ? [new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.helm ? [helmButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.amulet ? [amuletutton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.mainHand ? [weaponSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.offHand ? [weaponSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.armor ? [armorButton] : []))
                        })] : []);
                        _context9.t11 = (0, _toConsumableArray2["default"])(isRowTwoActive ? [new _discord.MessageActionRow({
                          components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.gloves ? [glovesButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotOne ? [ringSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotTwo ? [ringSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.belt ? [beltButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.boots ? [bootsButton] : []))
                        })] : []);
                        _context9.t12 = _discord.MessageActionRow;
                        _context9.next = 44;
                        return generateCancelEquipmentButton();

                      case 44:
                        _context9.t13 = _context9.sent;
                        _context9.t14 = [_context9.t13];
                        _context9.t15 = {
                          components: _context9.t14
                        };
                        _context9.t16 = new _context9.t12(_context9.t15);
                        _context9.t17 = [_context9.t16];
                        _context9.t8 = _context9.t9.concat.call(_context9.t9, _context9.t10, _context9.t11, _context9.t17);
                        _context9.next = 60;
                        break;

                      case 52:
                        _context9.t18 = _discord.MessageActionRow;
                        _context9.next = 55;
                        return generateCancelEquipmentButton();

                      case 55:
                        _context9.t19 = _context9.sent;
                        _context9.t20 = [_context9.t19];
                        _context9.t21 = {
                          components: _context9.t20
                        };
                        _context9.t22 = new _context9.t18(_context9.t21);
                        _context9.t8 = [_context9.t22];

                      case 60:
                        _context9.t23 = _context9.t8;
                        _context9.t24 = {
                          files: _context9.t7,
                          components: _context9.t23
                        };
                        _context9.next = 64;
                        return _context9.t5.editReply.call(_context9.t5, _context9.t24);

                      case 64:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x9) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 95:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function discordShowEquipment(_x2, _x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.discordShowEquipment = discordShowEquipment;