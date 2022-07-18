"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordShowEquipment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _discord = require("discord.js");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _item = require("../render/item");

var _stats = require("../render/stats/stats");

var _equipment = require("../render/equipment/equipment");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _unEquipItem = require("../helpers/equipment/unEquipItem");

var _embeds = require("../embeds");

var _isUserInRealm = _interopRequireDefault(require("../helpers/realm/isUserInRealm"));

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

var _cancelEquipment = require("../render/equipment/cancelEquipment");

/* eslint-disable import/prefer-default-export */
// const showEquipmentImage = async (
//   userCurrentCharacter,
// ) => {
//   const itemImage = await renderItemImage(
//     userCurrentCharacter.equipment.helm,
//   );
// };
var discordShowEquipment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(discordClient, message, setting, io, queue, isDefered) {
    var activity, userId, discordChannel, userCurrentCharacter, isInRealm, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, cancelEquipmentId, backId, helmId, amuletId, mainHandId, offHandId, armorId, glovesId, beltId, bootsId, ringSlotOneId, ringSlotTwoId, ringSlotOneButton, ringSlotTwoButton, bootsButton, helmButton, amuletutton, weaponSlotOneButton, weaponSlotTwoButton, armorButton, glovesButton, beltButton, backButton, generateCancelEquipmentButton, generateUnEquipItemButton, generateCurrentEquipmentImage, isRowOneActive, isRowTwoActive, embedMessage, collector, currentIndex;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            activity = [];
            _context8.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context8.sent;
            _context8.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context8.sent;
            _context8.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context8.sent;
            _context8.next = 12;
            return (0, _isUserInRealm["default"])(discordClient, userCurrentCharacter);

          case 12:
            isInRealm = _context8.sent;

            if (isInRealm) {
              _context8.next = 24;
              break;
            }

            _context8.t0 = message;
            _context8.t1 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, ").concat(userCurrentCharacter.UserGroup.group.inviteLink);
            _context8.next = 18;
            return (0, _embeds.needToBeInDiscordRealmEmbed)(userCurrentCharacter.UserGroup.group);

          case 18:
            _context8.t2 = _context8.sent;
            _context8.t3 = [_context8.t2];
            _context8.t4 = {
              content: _context8.t1,
              embeds: _context8.t3,
              ephemeral: true
            };
            _context8.next = 23;
            return _context8.t0.reply.call(_context8.t0, _context8.t4);

          case 23:
            return _context8.abrupt("return");

          case 24:
            _context8.next = 26;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 26:
            _yield$testPlayerRead = _context8.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context8.next = 32;
              break;
            }

            return _context8.abrupt("return", usedDeferReply);

          case 32:
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
            ringSlotOneButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped RingSlot One',
              emoji: '💍',
              customId: ringSlotOneId
            });
            ringSlotTwoButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped RingSlot Two',
              emoji: '💍',
              customId: ringSlotTwoId
            });
            bootsButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Boots',
              emoji: '🥾',
              customId: bootsId
            });
            helmButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Helm',
              emoji: '🪖',
              customId: helmId
            });
            amuletutton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Amulet',
              emoji: '🧿',
              customId: amuletId
            });
            weaponSlotOneButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Main Hand',
              emoji: '🗡️',
              customId: mainHandId
            });
            weaponSlotTwoButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Off Hand',
              emoji: '🛡️',
              customId: offHandId
            });
            armorButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Armor',
              emoji: '🦺',
              customId: armorId
            });
            glovesButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Gloves',
              emoji: '🧤',
              customId: glovesId
            });
            beltButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Show Equiped Belt',
              emoji: '〰️',
              customId: beltId
            });
            backButton = new _discord.ButtonBuilder({
              style: _discord.ButtonStyle.Secondary,
              label: 'Back to Equipment',
              emoji: '⬅️',
              customId: backId
            });

            generateCancelEquipmentButton = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", new _discord.ButtonBuilder({
                          style: _discord.ButtonStyle.Secondary,
                          label: "Cancel Equipment",
                          emoji: '❌',
                          customId: cancelEquipmentId
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateCancelEquipmentButton() {
                return _ref2.apply(this, arguments);
              };
            }();

            generateUnEquipItemButton = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(myItem) {
                var unEquipItemId;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        unEquipItemId = "UnEquip:".concat(myItem.id);
                        return _context2.abrupt("return", new _discord.ButtonBuilder({
                          style: _discord.ButtonStyle.Secondary,
                          label: "UnEquip ".concat(myItem.name),
                          emoji: '⛏️',
                          customId: unEquipItemId
                        }));

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateUnEquipItemButton(_x7) {
                return _ref3.apply(this, arguments);
              };
            }();

            generateCurrentEquipmentImage = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userCurrentCharacter) {
                var statsImageBuffer, statsImage, equipmentImageBuffer, equipmentImage, canvas, ctx;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _stats.renderStatsImage)(userCurrentCharacter, false);

                      case 2:
                        statsImageBuffer = _context3.sent;
                        _context3.next = 5;
                        return (0, _canvas.loadImage)(statsImageBuffer);

                      case 5:
                        statsImage = _context3.sent;
                        _context3.next = 8;
                        return (0, _equipment.renderEquipmentImage)(userCurrentCharacter);

                      case 8:
                        equipmentImageBuffer = _context3.sent;
                        _context3.next = 11;
                        return (0, _canvas.loadImage)(equipmentImageBuffer);

                      case 11:
                        equipmentImage = _context3.sent;
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
                        return _context3.abrupt("return", canvas.toBuffer());

                      case 21:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateCurrentEquipmentImage(_x8) {
                return _ref4.apply(this, arguments);
              };
            }();

            isRowOneActive = userCurrentCharacter.equipment.helm || userCurrentCharacter.equipment.amulet || userCurrentCharacter.equipment.mainHand || userCurrentCharacter.equipment.offHand || userCurrentCharacter.equipment.armor;
            isRowTwoActive = userCurrentCharacter.equipment.gloves || userCurrentCharacter.equipment.ringSlotOne || userCurrentCharacter.equipment.ringSlotTwo || userCurrentCharacter.equipment.belt || userCurrentCharacter.equipment.boots;
            _context8.t5 = discordChannel;
            _context8.t6 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context8.next = 64;
            return generateCurrentEquipmentImage(userCurrentCharacter);

          case 64:
            _context8.t7 = _context8.sent;
            _context8.t8 = {
              attachment: _context8.t7,
              name: 'equipment.png'
            };
            _context8.t9 = [_context8.t8];

            if (!(isRowOneActive || isRowTwoActive)) {
              _context8.next = 82;
              break;
            }

            _context8.t11 = [];
            _context8.t12 = (0, _toConsumableArray2["default"])(isRowOneActive ? [new _discord.ActionRowBuilder({
              components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.helm ? [helmButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.amulet ? [amuletutton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.mainHand ? [weaponSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.offHand ? [weaponSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.armor ? [armorButton] : []))
            })] : []);
            _context8.t13 = (0, _toConsumableArray2["default"])(isRowTwoActive ? [new _discord.ActionRowBuilder({
              components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.gloves ? [glovesButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotOne ? [ringSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotTwo ? [ringSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.belt ? [beltButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.boots ? [bootsButton] : []))
            })] : []);
            _context8.t14 = _discord.ActionRowBuilder;
            _context8.next = 74;
            return generateCancelEquipmentButton();

          case 74:
            _context8.t15 = _context8.sent;
            _context8.t16 = [_context8.t15];
            _context8.t17 = {
              components: _context8.t16
            };
            _context8.t18 = new _context8.t14(_context8.t17);
            _context8.t19 = [_context8.t18];
            _context8.t10 = _context8.t11.concat.call(_context8.t11, _context8.t12, _context8.t13, _context8.t19);
            _context8.next = 90;
            break;

          case 82:
            _context8.t20 = _discord.ActionRowBuilder;
            _context8.next = 85;
            return generateCancelEquipmentButton();

          case 85:
            _context8.t21 = _context8.sent;
            _context8.t22 = [_context8.t21];
            _context8.t23 = {
              components: _context8.t22
            };
            _context8.t24 = new _context8.t20(_context8.t23);
            _context8.t10 = [_context8.t24];

          case 90:
            _context8.t25 = _context8.t10;
            _context8.t26 = {
              content: _context8.t6,
              files: _context8.t9,
              components: _context8.t25
            };
            _context8.next = 94;
            return _context8.t5.send.call(_context8.t5, _context8.t26);

          case 94:
            embedMessage = _context8.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref5) {
                var discordUser = _ref5.user;
                return discordUser.id === userCurrentCharacter.UserGroup.user.user_id;
              }
            });
            currentIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(interaction) {
                var equipedItem, cannotUnEquip, cannotUnEquipReason, itemId, _yield$unEquipItem, _yield$unEquipItem2;

                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return interaction.deferUpdate();

                      case 2:
                        cannotUnEquipReason = '';

                        if (!(interaction.customId === helmId || interaction.customId === amuletId || interaction.customId === mainHandId || interaction.customId === offHandId || interaction.customId === armorId || interaction.customId === glovesId || interaction.customId === beltId || interaction.customId === bootsId || interaction.customId === ringSlotOneId || interaction.customId === ringSlotTwoId)) {
                          _context7.next = 7;
                          break;
                        }

                        _context7.next = 6;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                          return _regenerator["default"].wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(t) {
                                      var itemImage, itemToUnEquip, preActivity, finalActivity;
                                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                                        while (1) {
                                          switch (_context4.prev = _context4.next) {
                                            case 0:
                                              _context4.next = 2;
                                              return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                                              false, // Need inventory?
                                              t);

                                            case 2:
                                              userCurrentCharacter = _context4.sent;

                                              if (!(interaction.customId === helmId)) {
                                                _context4.next = 8;
                                                break;
                                              }

                                              _context4.next = 6;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.helm);

                                            case 6:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.helm;

                                            case 8:
                                              if (!(interaction.customId === amuletId)) {
                                                _context4.next = 13;
                                                break;
                                              }

                                              _context4.next = 11;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.amulet);

                                            case 11:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.amulet;

                                            case 13:
                                              if (!(interaction.customId === mainHandId)) {
                                                _context4.next = 18;
                                                break;
                                              }

                                              _context4.next = 16;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.mainHand);

                                            case 16:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.mainHand;

                                            case 18:
                                              if (!(interaction.customId === offHandId)) {
                                                _context4.next = 23;
                                                break;
                                              }

                                              _context4.next = 21;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.offHand);

                                            case 21:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.offHand;

                                            case 23:
                                              if (!(interaction.customId === armorId)) {
                                                _context4.next = 28;
                                                break;
                                              }

                                              _context4.next = 26;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.armor);

                                            case 26:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.armor;

                                            case 28:
                                              if (!(interaction.customId === glovesId)) {
                                                _context4.next = 33;
                                                break;
                                              }

                                              _context4.next = 31;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.gloves);

                                            case 31:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.gloves;

                                            case 33:
                                              if (!(interaction.customId === beltId)) {
                                                _context4.next = 38;
                                                break;
                                              }

                                              _context4.next = 36;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.belt);

                                            case 36:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.belt;

                                            case 38:
                                              if (!(interaction.customId === bootsId)) {
                                                _context4.next = 43;
                                                break;
                                              }

                                              _context4.next = 41;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.boots);

                                            case 41:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.boots;

                                            case 43:
                                              if (!(interaction.customId === ringSlotOneId)) {
                                                _context4.next = 48;
                                                break;
                                              }

                                              _context4.next = 46;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.ringSlotOne);

                                            case 46:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.ringSlotOne;

                                            case 48:
                                              if (!(interaction.customId === ringSlotTwoId)) {
                                                _context4.next = 53;
                                                break;
                                              }

                                              _context4.next = 51;
                                              return (0, _item.renderItemImage)(userCurrentCharacter.equipment.ringSlotTwo);

                                            case 51:
                                              itemImage = _context4.sent;
                                              itemToUnEquip = userCurrentCharacter.equipment.ringSlotTwo;

                                            case 53:
                                              _context4.t0 = interaction;
                                              _context4.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                                              _context4.t2 = [{
                                                attachment: itemImage,
                                                name: 'itemImage.png'
                                              }];
                                              _context4.t3 = _discord.ActionRowBuilder;
                                              _context4.next = 59;
                                              return generateUnEquipItemButton(itemToUnEquip);

                                            case 59:
                                              _context4.t4 = _context4.sent;
                                              _context4.t5 = [_context4.t4];
                                              _context4.t6 = {
                                                components: _context4.t5
                                              };
                                              _context4.t7 = new _context4.t3(_context4.t6);
                                              _context4.t8 = new _discord.ActionRowBuilder({
                                                components: [backButton]
                                              });
                                              _context4.t9 = [_context4.t7, _context4.t8];
                                              _context4.t10 = {
                                                content: _context4.t1,
                                                files: _context4.t2,
                                                components: _context4.t9
                                              };
                                              _context4.next = 68;
                                              return _context4.t0.editReply.call(_context4.t0, _context4.t10);

                                            case 68:
                                              _context4.next = 70;
                                              return _models["default"].activity.create({
                                                type: 'pickClass_s',
                                                earnerId: userCurrentCharacter.user.id
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 70:
                                              preActivity = _context4.sent;
                                              _context4.next = 73;
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

                                            case 73:
                                              finalActivity = _context4.sent;
                                              activity.unshift(finalActivity);

                                            case 75:
                                            case "end":
                                              return _context4.stop();
                                          }
                                        }
                                      }, _callee4);
                                    }));

                                    return function (_x10) {
                                      return _ref8.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err) {
                                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                                        while (1) {
                                          switch (_context5.prev = _context5.next) {
                                            case 0:
                                              console.log(err);
                                              _context5.prev = 1;
                                              _context5.next = 4;
                                              return _models["default"].error.create({
                                                type: 'Equipment',
                                                error: "".concat(err)
                                              });

                                            case 4:
                                              _context5.next = 9;
                                              break;

                                            case 6:
                                              _context5.prev = 6;
                                              _context5.t0 = _context5["catch"](1);

                                              _logger["default"].error("Error Discord: ".concat(_context5.t0));

                                            case 9:
                                            case "end":
                                              return _context5.stop();
                                          }
                                        }
                                      }, _callee5, null, [[1, 6]]);
                                    }));

                                    return function (_x11) {
                                      return _ref9.apply(this, arguments);
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
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        })));

                      case 6:
                        return _context7.abrupt("return");

                      case 7:
                        if (!(interaction.customId === cancelEquipmentId)) {
                          _context7.next = 19;
                          break;
                        }

                        _context7.t0 = interaction;
                        _context7.next = 11;
                        return (0, _cancelEquipment.renderCancelEquipmentImage)(userCurrentCharacter);

                      case 11:
                        _context7.t1 = _context7.sent;
                        _context7.t2 = {
                          attachment: _context7.t1,
                          name: 'equipment.png'
                        };
                        _context7.t3 = [_context7.t2];
                        _context7.t4 = [];
                        _context7.t5 = {
                          files: _context7.t3,
                          components: _context7.t4
                        };
                        _context7.next = 18;
                        return _context7.t0.editReply.call(_context7.t0, _context7.t5);

                      case 18:
                        return _context7.abrupt("return");

                      case 19:
                        if (!interaction.customId.startsWith('UnEquip:')) {
                          _context7.next = 30;
                          break;
                        }

                        console.log('detected unequip click');
                        itemId = Number(interaction.customId.replace("UnEquip:", ""));
                        _context7.next = 24;
                        return (0, _unEquipItem.unEquipItem)(userCurrentCharacter, itemId, discordChannel, io, queue);

                      case 24:
                        _yield$unEquipItem = _context7.sent;
                        _yield$unEquipItem2 = (0, _slicedToArray2["default"])(_yield$unEquipItem, 4);
                        userCurrentCharacter = _yield$unEquipItem2[0];
                        equipedItem = _yield$unEquipItem2[1];
                        cannotUnEquip = _yield$unEquipItem2[2];
                        cannotUnEquipReason = _yield$unEquipItem2[3];

                      case 30:
                        isRowOneActive = userCurrentCharacter.equipment.helm || userCurrentCharacter.equipment.amulet || userCurrentCharacter.equipment.mainHand || userCurrentCharacter.equipment.offHand || userCurrentCharacter.equipment.armor;
                        isRowTwoActive = userCurrentCharacter.equipment.gloves || userCurrentCharacter.equipment.ringSlotOne || userCurrentCharacter.equipment.ringSlotTwo || userCurrentCharacter.equipment.belt || userCurrentCharacter.equipment.boots;
                        console.log('before edit reply'); // Load another character

                        _context7.t6 = interaction;
                        _context7.t7 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context7.next = 37;
                        return generateCurrentEquipmentImage(userCurrentCharacter);

                      case 37:
                        _context7.t8 = _context7.sent;
                        _context7.t9 = {
                          attachment: _context7.t8,
                          name: 'equipment.png'
                        };
                        _context7.t10 = [_context7.t9];

                        if (!(isRowOneActive || isRowTwoActive)) {
                          _context7.next = 55;
                          break;
                        }

                        _context7.t12 = [];
                        _context7.t13 = (0, _toConsumableArray2["default"])(isRowOneActive ? [new _discord.ActionRowBuilder({
                          components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.helm ? [helmButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.amulet ? [amuletutton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.mainHand ? [weaponSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.offHand ? [weaponSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.armor ? [armorButton] : []))
                        })] : []);
                        _context7.t14 = (0, _toConsumableArray2["default"])(isRowTwoActive ? [new _discord.ActionRowBuilder({
                          components: [].concat((0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.gloves ? [glovesButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotOne ? [ringSlotOneButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.ringSlotTwo ? [ringSlotTwoButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.belt ? [beltButton] : []), (0, _toConsumableArray2["default"])(userCurrentCharacter.equipment.boots ? [bootsButton] : []))
                        })] : []);
                        _context7.t15 = _discord.ActionRowBuilder;
                        _context7.next = 47;
                        return generateCancelEquipmentButton();

                      case 47:
                        _context7.t16 = _context7.sent;
                        _context7.t17 = [_context7.t16];
                        _context7.t18 = {
                          components: _context7.t17
                        };
                        _context7.t19 = new _context7.t15(_context7.t18);
                        _context7.t20 = [_context7.t19];
                        _context7.t11 = _context7.t12.concat.call(_context7.t12, _context7.t13, _context7.t14, _context7.t20);
                        _context7.next = 63;
                        break;

                      case 55:
                        _context7.t21 = _discord.ActionRowBuilder;
                        _context7.next = 58;
                        return generateCancelEquipmentButton();

                      case 58:
                        _context7.t22 = _context7.sent;
                        _context7.t23 = [_context7.t22];
                        _context7.t24 = {
                          components: _context7.t23
                        };
                        _context7.t25 = new _context7.t21(_context7.t24);
                        _context7.t11 = [_context7.t25];

                      case 63:
                        _context7.t26 = _context7.t11;
                        _context7.t27 = {
                          content: _context7.t7,
                          files: _context7.t10,
                          components: _context7.t26
                        };
                        _context7.next = 67;
                        return _context7.t6.editReply.call(_context7.t6, _context7.t27);

                      case 67:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x9) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 98:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function discordShowEquipment(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordShowEquipment = discordShowEquipment;