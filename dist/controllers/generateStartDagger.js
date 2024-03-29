"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordStartDagger = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _discord = require("discord.js");

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _generateStartingDagger = require("../helpers/items/generateStartingDagger");

var _item = require("../render/item");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

/* eslint-disable import/prefer-default-export */
var generateLootImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(lootItem, distance) {
    var trueEnd,
        days,
        hours,
        minutes,
        seconds,
        ended,
        itemImage,
        backgroundItemImage,
        canvas,
        ctx,
        finalImage,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            trueEnd = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            days = Math.floor(distance % (1000 * 60 * 60 * 24 * 60) / (1000 * 60 * 60 * 24));
            hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            seconds = Math.floor(distance % (1000 * 60) / 1000);
            ended = days < 1 && hours < 1 && minutes < 1 && seconds < 1 || lootItem.inventoryId || trueEnd;
            _context.next = 8;
            return (0, _item.renderItemImage)(lootItem);

          case 8:
            itemImage = _context.sent;
            _context.next = 11;
            return (0, _canvas.loadImage)(itemImage);

          case 11:
            backgroundItemImage = _context.sent;
            canvas = (0, _canvas.createCanvas)(backgroundItemImage.width, backgroundItemImage.height + 20);
            ctx = canvas.getContext('2d');
            ctx.drawImage(backgroundItemImage, 0, // x position
            0, // y position
            backgroundItemImage.width, backgroundItemImage.height);
            ctx.fillStyle = "#ccc";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            ctx.font = 'bold 15px "HeartWarming"';

            if (!lootItem.inventoryId && distance < 0) {
              ctx.strokeText("Nobody Looted", backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
              ctx.fillText("Nobody Looted", backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
            } else if (lootItem.inventoryId) {
              ctx.strokeText("Looted by ".concat(lootItem.inventory.UserGroupClass.UserGroup.user.username), backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
              ctx.fillText("Looted by ".concat(lootItem.inventory.UserGroupClass.UserGroup.user.username), backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
            } else if (!lootItem.inventoryId) {
              ctx.strokeText("".concat(!ended ? "Time remaining ".concat(days > 0 ? "".concat(days, " days") : '', "  ").concat(hours > 0 ? "".concat(hours, " hours") : '', " ").concat(minutes > 0 ? "".concat(minutes, " minutes") : '', " ").concat(seconds > 0 ? "".concat(seconds, " seconds") : '') : "Ended"), backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
              ctx.fillText("".concat(!ended ? "Time remaining ".concat(days > 0 ? "".concat(days, " days") : '', "  ").concat(hours > 0 ? "".concat(hours, " hours") : '', " ").concat(minutes > 0 ? "".concat(minutes, " minutes") : '', " ").concat(seconds > 0 ? "".concat(seconds, " seconds") : '') : "Ended"), backgroundItemImage.width / 2, backgroundItemImage.height + 10, backgroundItemImage.width);
            }

            _context.next = 23;
            return canvas.toBuffer();

          case 23:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateLootImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var listenLoot = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(messageDropLoot, io, queue, newItem, distance, updateMessage) {
    var collector;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            console.log(messageDropLoot);
            console.log(distance);
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            console.log('creating collector...');
            collector = messageDropLoot.createMessageComponentCollector({
              // componentType: 'BUTTON',
              // componentType: 'BUTTON',
              time: Number(distance)
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(button) {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        console.log('collection');
                        console.log(button);
                        console.log('collecting');

                        if (button.user.bot) {
                          _context5.next = 6;
                          break;
                        }

                        _context5.next = 6;
                        return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                          return _regenerator["default"].wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _models["default"].sequelize.transaction({
                                    isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                  }, /*#__PURE__*/function () {
                                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(t) {
                                      var userCurrentCharacterCollecting, findItem, waitForUpdateItem, itemLootedFinal;
                                      return _regenerator["default"].wrap(function _callee2$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              _context2.next = 2;
                                              return (0, _character.fetchUserCurrentCharacter)(button.user.id, // user discord id
                                              true, // Need inventory?
                                              t);

                                            case 2:
                                              userCurrentCharacterCollecting = _context2.sent;

                                              if (userCurrentCharacterCollecting) {
                                                _context2.next = 8;
                                                break;
                                              }

                                              _context2.next = 6;
                                              return button.reply({
                                                content: 'You have not selected a class yet\n!runebase pickclass\n/pickclass',
                                                ephemeral: true
                                              });

                                            case 6:
                                              console.log('user has not selected a class yet'); // Add notice message here to warn user to select a class

                                              return _context2.abrupt("return");

                                            case 8:
                                              _context2.next = 10;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: newItem.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 10:
                                              findItem = _context2.sent;

                                              if (findItem.inventoryId) {
                                                _context2.next = 31;
                                                break;
                                              }

                                              _context2.next = 14;
                                              return findItem.update({
                                                inventoryId: userCurrentCharacterCollecting.inventoryId
                                              }, {
                                                lock: t.LOCK.UPDATE,
                                                transaction: t
                                              });

                                            case 14:
                                              waitForUpdateItem = _context2.sent;
                                              _context2.next = 17;
                                              return _models["default"].item.findOne({
                                                where: {
                                                  id: waitForUpdateItem.id
                                                },
                                                lock: t.LOCK.UPDATE,
                                                transaction: t,
                                                include: [{
                                                  model: _models["default"].inventory,
                                                  as: 'inventory',
                                                  include: [{
                                                    model: _models["default"].UserGroupClass,
                                                    as: 'UserGroupClass',
                                                    include: [{
                                                      model: _models["default"].UserGroup,
                                                      as: 'UserGroup',
                                                      include: [{
                                                        model: _models["default"].user,
                                                        as: 'user'
                                                      }]
                                                    }]
                                                  }]
                                                }, {
                                                  model: _models["default"].itemQuality,
                                                  as: 'itemQuality',
                                                  required: true
                                                }, {
                                                  model: _models["default"].itemBase,
                                                  as: 'itemBase',
                                                  required: true,
                                                  include: [{
                                                    model: _models["default"].itemFamily,
                                                    as: 'itemFamily',
                                                    required: true,
                                                    include: [{
                                                      model: _models["default"].itemType,
                                                      as: 'itemType',
                                                      required: true
                                                    }]
                                                  }]
                                                }]
                                              });

                                            case 17:
                                              itemLootedFinal = _context2.sent;
                                              _context2.t0 = messageDropLoot;
                                              _context2.next = 21;
                                              return generateLootImage(itemLootedFinal, distance, true);

                                            case 21:
                                              _context2.t1 = _context2.sent;
                                              _context2.t2 = {
                                                attachment: _context2.t1,
                                                name: 'lootItem.png'
                                              };
                                              _context2.t3 = [_context2.t2];
                                              _context2.t4 = [];
                                              _context2.t5 = {
                                                files: _context2.t3,
                                                components: _context2.t4
                                              };
                                              _context2.next = 28;
                                              return _context2.t0.edit.call(_context2.t0, _context2.t5);

                                            case 28:
                                              clearInterval(updateMessage);
                                              _context2.next = 33;
                                              break;

                                            case 31:
                                              _context2.next = 33;
                                              return button.reply({
                                                content: 'Somebody else already looted',
                                                ephemeral: true
                                              });

                                            case 33:
                                            case "end":
                                              return _context2.stop();
                                          }
                                        }
                                      }, _callee2);
                                    }));

                                    return function (_x10) {
                                      return _ref5.apply(this, arguments);
                                    };
                                  }())["catch"]( /*#__PURE__*/function () {
                                    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err) {
                                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                                        while (1) {
                                          switch (_context3.prev = _context3.next) {
                                            case 0:
                                              _context3.prev = 0;
                                              _context3.next = 3;
                                              return _models["default"].error.create({
                                                type: 'randomChannelLoot',
                                                error: "".concat(err)
                                              });

                                            case 3:
                                              _context3.next = 8;
                                              break;

                                            case 5:
                                              _context3.prev = 5;
                                              _context3.t0 = _context3["catch"](0);

                                              _logger["default"].error("Error Discord: ".concat(_context3.t0));

                                            case 8:
                                              console.log(err);

                                              _logger["default"].error("PickUp Loot error: ".concat(err));

                                            case 10:
                                            case "end":
                                              return _context3.stop();
                                          }
                                        }
                                      }, _callee3, null, [[0, 5]]);
                                    }));

                                    return function (_x11) {
                                      return _ref6.apply(this, arguments);
                                    };
                                  }());

                                case 2:
                                case "end":
                                  return _context4.stop();
                              }
                            }
                          }, _callee4);
                        })));

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x9) {
                return _ref3.apply(this, arguments);
              };
            }());
            collector.on('end', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
              var activity;
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      activity = [];
                      _context9.next = 3;
                      return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                        return _regenerator["default"].wrap(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                clearInterval(updateMessage);
                                _context8.next = 3;
                                return _models["default"].sequelize.transaction({
                                  isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                }, /*#__PURE__*/function () {
                                  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(t) {
                                    var itemLootedFinal;
                                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                                      while (1) {
                                        switch (_context6.prev = _context6.next) {
                                          case 0:
                                            _context6.next = 2;
                                            return _models["default"].item.findOne({
                                              where: {
                                                id: newItem.id
                                              },
                                              include: [{
                                                model: _models["default"].inventory,
                                                as: 'inventory',
                                                include: [{
                                                  model: _models["default"].UserGroupClass,
                                                  as: 'UserGroupClass',
                                                  include: [{
                                                    model: _models["default"].UserGroup,
                                                    as: 'UserGroup',
                                                    include: [{
                                                      model: _models["default"].user,
                                                      as: 'user'
                                                    }]
                                                  }]
                                                }]
                                              }, {
                                                model: _models["default"].itemQuality,
                                                as: 'itemQuality',
                                                required: true
                                              }, {
                                                model: _models["default"].itemBase,
                                                as: 'itemBase',
                                                required: true,
                                                include: [{
                                                  model: _models["default"].itemFamily,
                                                  as: 'itemFamily',
                                                  required: true,
                                                  include: [{
                                                    model: _models["default"].itemType,
                                                    as: 'itemType',
                                                    required: true
                                                  }]
                                                }]
                                              }]
                                            });

                                          case 2:
                                            itemLootedFinal = _context6.sent;
                                            _context6.t0 = messageDropLoot;
                                            _context6.next = 6;
                                            return generateLootImage(itemLootedFinal, distance);

                                          case 6:
                                            _context6.t1 = _context6.sent;
                                            _context6.t2 = {
                                              attachment: _context6.t1,
                                              name: 'lootItem.png'
                                            };
                                            _context6.t3 = [_context6.t2];
                                            _context6.t4 = [];
                                            _context6.t5 = {
                                              files: _context6.t3,
                                              components: _context6.t4
                                            };
                                            _context6.next = 13;
                                            return _context6.t0.edit.call(_context6.t0, _context6.t5);

                                          case 13:
                                            clearInterval(updateMessage);

                                          case 14:
                                          case "end":
                                            return _context6.stop();
                                        }
                                      }
                                    }, _callee6);
                                  }));

                                  return function (_x12) {
                                    return _ref9.apply(this, arguments);
                                  };
                                }())["catch"]( /*#__PURE__*/function () {
                                  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
                                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                                      while (1) {
                                        switch (_context7.prev = _context7.next) {
                                          case 0:
                                            _context7.prev = 0;
                                            _context7.next = 3;
                                            return _models["default"].error.create({
                                              type: 'endTrivia',
                                              error: "".concat(err)
                                            });

                                          case 3:
                                            _context7.next = 8;
                                            break;

                                          case 5:
                                            _context7.prev = 5;
                                            _context7.t0 = _context7["catch"](0);

                                            _logger["default"].error("Error Discord: ".concat(_context7.t0));

                                          case 8:
                                            console.log(err);

                                            _logger["default"].error("trivia error: ".concat(err));

                                          case 10:
                                          case "end":
                                            return _context7.stop();
                                        }
                                      }
                                    }, _callee7, null, [[0, 5]]);
                                  }));

                                  return function (_x13) {
                                    return _ref10.apply(this, arguments);
                                  };
                                }());

                              case 3:
                                if (activity.length > 0) {
                                  io.to('admin').emit('updateActivity', {
                                    activity: activity
                                  });
                                }

                              case 4:
                              case "end":
                                return _context8.stop();
                            }
                          }
                        }, _callee8);
                      })));

                    case 3:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9);
            })));

          case 28:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function listenLoot(_x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var discordStartDagger = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(discordClient, message, queue, io) {
    var activity;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            activity = [];
            _context15.next = 3;
            return _models["default"].sequelize.transaction({
              isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, /*#__PURE__*/function () {
              var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(t) {
                var userId, discordChannel, userCurrentCharacter, newItem, generateLootButton, countDownDate, now, distance, messageDropLoot, updateMessage, preActivity, finalActivity;
                return _regenerator["default"].wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

                      case 2:
                        userId = _context13.sent;
                        _context13.next = 5;
                        return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

                      case 5:
                        discordChannel = _context13.sent;
                        _context13.next = 8;
                        return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
                        false, // Need inventory?
                        t);

                      case 8:
                        userCurrentCharacter = _context13.sent;

                        if (userCurrentCharacter) {
                          _context13.next = 13;
                          break;
                        }

                        _context13.next = 12;
                        return message.reply({
                          content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
                          ephemeral: true
                        });

                      case 12:
                        return _context13.abrupt("return");

                      case 13:
                        _context13.next = 15;
                        return (0, _generateStartingDagger.generateRandomStartDagger)(1);

                      case 15:
                        newItem = _context13.sent;

                        // const itemImage = await renderItemImage(newItem);
                        generateLootButton = /*#__PURE__*/function () {
                          var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                            return _regenerator["default"].wrap(function _callee11$(_context11) {
                              while (1) {
                                switch (_context11.prev = _context11.next) {
                                  case 0:
                                    return _context11.abrupt("return", new _discord.ButtonBuilder({
                                      style: _discord.ButtonStyle.Secondary,
                                      label: "Loot Item",
                                      emoji: '🤏',
                                      customId: 'lootItem'
                                    }));

                                  case 1:
                                  case "end":
                                    return _context11.stop();
                                }
                              }
                            }, _callee11);
                          }));

                          return function generateLootButton() {
                            return _ref13.apply(this, arguments);
                          };
                        }();

                        _context13.t0 = Date;
                        _context13.next = 20;
                        return new Date().getTime();

                      case 20:
                        _context13.t1 = _context13.sent;
                        _context13.t2 = _context13.t1 + 120000;
                        _context13.next = 24;
                        return new _context13.t0(_context13.t2);

                      case 24:
                        countDownDate = _context13.sent;
                        _context13.next = 27;
                        return new Date().getTime();

                      case 27:
                        now = _context13.sent;
                        distance = countDownDate - now;
                        _context13.t3 = discordChannel;
                        _context13.next = 32;
                        return generateLootImage(newItem, distance);

                      case 32:
                        _context13.t4 = _context13.sent;
                        _context13.t5 = {
                          attachment: _context13.t4,
                          name: 'lootItem.png'
                        };
                        _context13.t6 = [_context13.t5];
                        _context13.t7 = _discord.ActionRowBuilder;
                        _context13.next = 38;
                        return generateLootButton();

                      case 38:
                        _context13.t8 = _context13.sent;
                        _context13.t9 = [_context13.t8];
                        _context13.t10 = {
                          components: _context13.t9
                        };
                        _context13.t11 = new _context13.t7(_context13.t10);
                        _context13.t12 = [_context13.t11];
                        _context13.t13 = {
                          files: _context13.t6,
                          components: _context13.t12
                        };
                        _context13.next = 46;
                        return _context13.t3.send.call(_context13.t3, _context13.t13);

                      case 46:
                        messageDropLoot = _context13.sent;
                        updateMessage = setInterval( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
                          var findItem;
                          return _regenerator["default"].wrap(function _callee12$(_context12) {
                            while (1) {
                              switch (_context12.prev = _context12.next) {
                                case 0:
                                  now = new Date().getTime();
                                  distance = countDownDate - now;
                                  _context12.next = 4;
                                  return _models["default"].item.findOne({
                                    where: {
                                      id: newItem.id
                                    },
                                    include: [{
                                      model: _models["default"].inventory,
                                      as: 'inventory',
                                      include: [{
                                        model: _models["default"].UserGroupClass,
                                        as: 'UserGroupClass',
                                        include: [{
                                          model: _models["default"].UserGroup,
                                          as: 'UserGroup',
                                          include: [{
                                            model: _models["default"].user,
                                            as: 'user'
                                          }]
                                        }]
                                      }]
                                    }, {
                                      model: _models["default"].itemQuality,
                                      as: 'itemQuality',
                                      required: true
                                    }, {
                                      model: _models["default"].itemBase,
                                      as: 'itemBase',
                                      required: true,
                                      include: [{
                                        model: _models["default"].itemFamily,
                                        as: 'itemFamily',
                                        required: true,
                                        include: [{
                                          model: _models["default"].itemType,
                                          as: 'itemType',
                                          required: true
                                        }]
                                      }]
                                    }]
                                  });

                                case 4:
                                  findItem = _context12.sent;

                                  if (findItem.inventoryId) {
                                    _context12.next = 23;
                                    break;
                                  }

                                  _context12.t0 = messageDropLoot;
                                  _context12.next = 9;
                                  return generateLootImage(newItem, distance);

                                case 9:
                                  _context12.t1 = _context12.sent;
                                  _context12.t2 = {
                                    attachment: _context12.t1,
                                    name: 'lootItem.png'
                                  };
                                  _context12.t3 = [_context12.t2];
                                  _context12.t4 = _discord.ActionRowBuilder;
                                  _context12.next = 15;
                                  return generateLootButton();

                                case 15:
                                  _context12.t5 = _context12.sent;
                                  _context12.t6 = [_context12.t5];
                                  _context12.t7 = {
                                    components: _context12.t6
                                  };
                                  _context12.t8 = new _context12.t4(_context12.t7);
                                  _context12.t9 = [_context12.t8];
                                  _context12.t10 = {
                                    files: _context12.t3,
                                    components: _context12.t9
                                  };
                                  _context12.next = 23;
                                  return _context12.t0.edit.call(_context12.t0, _context12.t10);

                                case 23:
                                  if (!findItem.inventoryId) {
                                    _context12.next = 35;
                                    break;
                                  }

                                  _context12.t11 = messageDropLoot;
                                  _context12.next = 27;
                                  return generateLootImage(newItem, distance);

                                case 27:
                                  _context12.t12 = _context12.sent;
                                  _context12.t13 = {
                                    attachment: _context12.t12,
                                    name: 'lootItem.png'
                                  };
                                  _context12.t14 = [_context12.t13];
                                  _context12.t15 = [];
                                  _context12.t16 = {
                                    files: _context12.t14,
                                    components: _context12.t15
                                  };
                                  _context12.next = 34;
                                  return _context12.t11.edit.call(_context12.t11, _context12.t16);

                                case 34:
                                  clearInterval(updateMessage);

                                case 35:
                                  if (distance < 0) {
                                    clearInterval(updateMessage);
                                  }

                                case 36:
                                case "end":
                                  return _context12.stop();
                              }
                            }
                          }, _callee12);
                        })), 10000);
                        _context13.next = 50;
                        return listenLoot(messageDropLoot, io, queue, newItem, distance, updateMessage);

                      case 50:
                        _context13.next = 52;
                        return _models["default"].activity.create({
                          type: 'myrank_s',
                          earnerId: userCurrentCharacter.UserGroup.user.id
                        }, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        });

                      case 52:
                        preActivity = _context13.sent;
                        _context13.next = 55;
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

                      case 55:
                        finalActivity = _context13.sent;
                        activity.unshift(finalActivity);

                      case 57:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));

              return function (_x18) {
                return _ref12.apply(this, arguments);
              };
            }())["catch"]( /*#__PURE__*/function () {
              var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(err) {
                return _regenerator["default"].wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        console.log(err);
                        _context14.prev = 1;
                        _context14.next = 4;
                        return _models["default"].error.create({
                          type: 'GenerateStartDagger',
                          error: "".concat(err)
                        });

                      case 4:
                        _context14.next = 9;
                        break;

                      case 6:
                        _context14.prev = 6;
                        _context14.t0 = _context14["catch"](1);

                        _logger["default"].error("Error Discord: ".concat(_context14.t0));

                      case 9:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14, null, [[1, 6]]);
              }));

              return function (_x19) {
                return _ref15.apply(this, arguments);
              };
            }());

          case 3:
            if (activity.length > 0) {
              io.to('admin').emit('updateActivity', {
                activity: activity
              });
            }

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function discordStartDagger(_x14, _x15, _x16, _x17) {
    return _ref11.apply(this, arguments);
  };
}();

exports.discordStartDagger = discordStartDagger;