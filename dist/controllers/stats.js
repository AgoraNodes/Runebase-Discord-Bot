"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _messages = require("../messages");

var _models = _interopRequireDefault(require("../models"));

var _logger = _interopRequireDefault(require("../helpers/logger"));

var _userWalletExist = require("../helpers/client/userWalletExist");

var _addStrength = require("../helpers/stats/addStrength");

var _addDexterity = require("../helpers/stats/addDexterity");

var _addVitality = require("../helpers/stats/addVitality");

var _addEnergy = require("../helpers/stats/addEnergy");

var _generateStatsImage = require("../helpers/stats/generateStatsImage");

var _character = require("../helpers/character/character");

/* eslint-disable import/prefer-default-export */
var discordStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, setting, io, queue) {
    var userId, user, userCurrentCharacter, activity, CurrentClassSelectionId, discordChannel, strengthButtonId, dexterityButtonId, vitalityButtonId, energyButtonId, cancelStatsPickId, strengthButton, dexterityButton, vitalityButton, energyButton, cancelStatsPickButton, generateCancelClassPicked, calc, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context3.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              }
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return");

          case 6:
            _context3.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(user, // user Object
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context3.sent;

            if (userCurrentCharacter) {
              _context3.next = 12;
              break;
            }

            console.log('user has not selected a class yet'); // Add notice message here to warn user to select a class

            return _context3.abrupt("return");

          case 12:
            console.log('currentUser');
            console.log(userCurrentCharacter.user);
            console.log('currentUser2');
            console.log(userCurrentCharacter.user.ranks[0]);
            console.log('currentUser3');
            console.log(userCurrentCharacter);
            console.log('currentUser4');
            console.log(userCurrentCharacter.stats);
            activity = [];
            strengthButtonId = 'strength';
            dexterityButtonId = 'dexterity';
            vitalityButtonId = 'vitality';
            energyButtonId = 'energy';
            cancelStatsPickId = 'cancelStatsPick';

            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context3.next = 38;
              break;
            }

            if (!message.guildId) {
              _context3.next = 33;
              break;
            }

            _context3.next = 30;
            return discordClient.channels.cache.get(message.channelId);

          case 30:
            discordChannel = _context3.sent;
            _context3.next = 36;
            break;

          case 33:
            _context3.next = 35;
            return discordClient.users.cache.get(message.user.id);

          case 35:
            discordChannel = _context3.sent;

          case 36:
            _context3.next = 46;
            break;

          case 38:
            if (!(message.channel.type === 'DM')) {
              _context3.next = 42;
              break;
            }

            _context3.next = 41;
            return discordClient.channels.cache.get(message.channelId);

          case 41:
            discordChannel = _context3.sent;

          case 42:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context3.next = 46;
              break;
            }

            _context3.next = 45;
            return discordClient.channels.cache.get(message.channelId);

          case 45:
            discordChannel = _context3.sent;

          case 46:
            strengthButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Strength ➕',
              emoji: '💪',
              customId: strengthButtonId
            });
            dexterityButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Dexterity ➕',
              emoji: '🏃‍♂️',
              customId: dexterityButtonId
            });
            vitalityButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Vitality ➕',
              emoji: '❤️',
              customId: vitalityButtonId
            });
            energyButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Energy ➕',
              emoji: '🧙',
              customId: energyButtonId
            });
            cancelStatsPickButton = new _discord.MessageButton({
              style: 'SECONDARY',
              label: 'Cancel Stats Selection',
              emoji: '❌',
              customId: cancelStatsPickId
            });

            generateCancelClassPicked = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(userCurrentCharacter.user.username, " canceled stats selection"), 250, 60, 500);
                        ctx.fillText("".concat(userCurrentCharacter.user.username, " canceled stats selection"), 250, 60, 500);
                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateCancelClassPicked() {
                return _ref2.apply(this, arguments);
              };
            }();

            calc = userCurrentCharacter.stats.strength + userCurrentCharacter.stats.dexterity + userCurrentCharacter.stats.vitality + userCurrentCharacter.stats.energy < userCurrentCharacter.user.ranks[0].id * 5;
            _context3.t0 = discordChannel;
            _context3.t1 = _discord.MessageAttachment;
            _context3.next = 57;
            return (0, _generateStatsImage.generateStatsImage)(userCurrentCharacter, false);

          case 57:
            _context3.t2 = _context3.sent;
            _context3.t3 = new _context3.t1(_context3.t2, 'class.png');
            _context3.t4 = [_context3.t3];
            _context3.t5 = [].concat((0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [strengthButton, dexterityButton]
            })] : []), (0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [vitalityButton, energyButton]
            })] : []), [new _discord.MessageActionRow({
              components: [cancelStatsPickButton]
            })]);
            _context3.t6 = {
              files: _context3.t4,
              components: _context3.t5
            };
            _context3.next = 64;
            return _context3.t0.send.call(_context3.t0, _context3.t6);

          case 64:
            embedMessage = _context3.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref3) {
                var discordUser = _ref3.user;
                return discordUser.id === userCurrentCharacter.user.user_id;
              }
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(interaction) {
                var updatedUser, cannotSpend, _yield$addStrength, _yield$addStrength2, _yield$addDexterity, _yield$addDexterity2, _yield$addVitality, _yield$addVitality2, _yield$addEnergy, _yield$addEnergy2, newCalc;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(interaction.customId === strengthButtonId)) {
                          _context2.next = 7;
                          break;
                        }

                        _context2.next = 3;
                        return (0, _addStrength.addStrength)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 3:
                        _yield$addStrength = _context2.sent;
                        _yield$addStrength2 = (0, _slicedToArray2["default"])(_yield$addStrength, 2);
                        updatedUser = _yield$addStrength2[0];
                        cannotSpend = _yield$addStrength2[1];

                      case 7:
                        if (!(interaction.customId === dexterityButtonId)) {
                          _context2.next = 14;
                          break;
                        }

                        _context2.next = 10;
                        return (0, _addDexterity.addDexterity)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 10:
                        _yield$addDexterity = _context2.sent;
                        _yield$addDexterity2 = (0, _slicedToArray2["default"])(_yield$addDexterity, 2);
                        updatedUser = _yield$addDexterity2[0];
                        cannotSpend = _yield$addDexterity2[1];

                      case 14:
                        if (!(interaction.customId === vitalityButtonId)) {
                          _context2.next = 21;
                          break;
                        }

                        _context2.next = 17;
                        return (0, _addVitality.addVitality)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 17:
                        _yield$addVitality = _context2.sent;
                        _yield$addVitality2 = (0, _slicedToArray2["default"])(_yield$addVitality, 2);
                        updatedUser = _yield$addVitality2[0];
                        cannotSpend = _yield$addVitality2[1];

                      case 21:
                        if (!(interaction.customId === energyButtonId)) {
                          _context2.next = 28;
                          break;
                        }

                        _context2.next = 24;
                        return (0, _addEnergy.addEnergy)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 24:
                        _yield$addEnergy = _context2.sent;
                        _yield$addEnergy2 = (0, _slicedToArray2["default"])(_yield$addEnergy, 2);
                        updatedUser = _yield$addEnergy2[0];
                        cannotSpend = _yield$addEnergy2[1];

                      case 28:
                        if (!(interaction.customId === strengthButtonId || interaction.customId === dexterityButtonId || interaction.customId === vitalityButtonId || interaction.customId === energyButtonId)) {
                          _context2.next = 41;
                          break;
                        }

                        newCalc = updatedUser.stats.strength + updatedUser.stats.dexterity + updatedUser.stats.vitality + updatedUser.stats.energy < updatedUser.user.ranks[0].id * 5;
                        _context2.t0 = interaction;
                        _context2.t1 = _discord.MessageAttachment;
                        _context2.next = 34;
                        return (0, _generateStatsImage.generateStatsImage)(updatedUser, false);

                      case 34:
                        _context2.t2 = _context2.sent;
                        _context2.t3 = new _context2.t1(_context2.t2, 'class.png');
                        _context2.t4 = [_context2.t3];
                        _context2.t5 = [].concat((0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [strengthButton, dexterityButton]
                        })] : []), (0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [vitalityButton, energyButton]
                        })] : []), [new _discord.MessageActionRow({
                          components: [cancelStatsPickButton]
                        })]);
                        _context2.t6 = {
                          files: _context2.t4,
                          components: _context2.t5
                        };
                        _context2.next = 41;
                        return _context2.t0.update.call(_context2.t0, _context2.t6);

                      case 41:
                        if (!(interaction.customId === cancelStatsPickId)) {
                          _context2.next = 51;
                          break;
                        }

                        _context2.t7 = interaction;
                        _context2.next = 45;
                        return generateCancelClassPicked();

                      case 45:
                        _context2.t8 = _context2.sent;
                        _context2.t9 = [_context2.t8];
                        _context2.t10 = [];
                        _context2.t11 = {
                          files: _context2.t9,
                          components: _context2.t10
                        };
                        _context2.next = 51;
                        return _context2.t7.update.call(_context2.t7, _context2.t11);

                      case 51:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 67:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function discordStats(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordStats = discordStats;