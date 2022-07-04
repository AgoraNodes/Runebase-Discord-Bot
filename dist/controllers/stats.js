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

var _addStrength = require("../helpers/stats/addStrength");

var _addDexterity = require("../helpers/stats/addDexterity");

var _addVitality = require("../helpers/stats/addVitality");

var _addEnergy = require("../helpers/stats/addEnergy");

var _stats = require("../render/stats");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

var _buttons = require("../buttons");

/* eslint-disable import/prefer-default-export */
var discordStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, setting, io, queue) {
    var activity, userId, discordChannel, userCurrentCharacter, _yield$calculateChara, unspedAttributes, generateCancelClassPicked, loadingEmbed, calc, embedMessage, collector;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activity = [];
            _context3.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context3.sent;
            _context3.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context3.sent;
            _context3.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            true // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context3.sent;

            if (userCurrentCharacter) {
              _context3.next = 14;
              break;
            }

            _context3.next = 13;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 13:
            return _context3.abrupt("return");

          case 14:
            _context3.next = 16;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 16:
            _yield$calculateChara = _context3.sent;
            unspedAttributes = _yield$calculateChara.unspedAttributes;

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

            loadingEmbed = new _discord.MessageEmbed().setTitle('Adding Attribute').setDescription("".concat(userCurrentCharacter.user.username, ", Loading..")); // const calc = (
            //   userCurrentCharacter.stats.strength
            //   + userCurrentCharacter.stats.dexterity
            //   + userCurrentCharacter.stats.vitality
            //   + userCurrentCharacter.stats.energy
            // ) < (userCurrentCharacter.user.ranks[0].id * 5);

            calc = unspedAttributes > 0;
            _context3.t0 = discordChannel;
            _context3.t1 = _discord.MessageAttachment;
            _context3.next = 25;
            return (0, _stats.renderStatsImage)(userCurrentCharacter, false);

          case 25:
            _context3.t2 = _context3.sent;
            _context3.t3 = new _context3.t1(_context3.t2, 'class.png');
            _context3.t4 = [_context3.t3];
            _context3.t5 = [].concat((0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [(0, _buttons.generateAddStrengthButton)(), (0, _buttons.generateAddDexterityButton)()]
            })] : []), (0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [(0, _buttons.generateAddVitalityButton)(), (0, _buttons.generateAddEnergyButton)()]
            })] : []), [new _discord.MessageActionRow({
              components: [(0, _buttons.generateCancelStatsPickButton)()]
            })]);
            _context3.t6 = {
              files: _context3.t4,
              components: _context3.t5
            };
            _context3.next = 32;
            return _context3.t0.send.call(_context3.t0, _context3.t6);

          case 32:
            embedMessage = _context3.sent;
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(interaction) {
                var updatedUser, cannotSpend, _yield$addStrength, _yield$addStrength2, _yield$addDexterity, _yield$addDexterity2, _yield$addVitality, _yield$addVitality2, _yield$addEnergy, _yield$addEnergy2, newCalc;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
                          _context2.next = 4;
                          break;
                        }

                        _context2.next = 3;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 3:
                        return _context2.abrupt("return");

                      case 4:
                        _context2.next = 6;
                        return interaction.deferUpdate();

                      case 6:
                        _context2.next = 8;
                        return interaction.editReply({
                          embeds: [loadingEmbed],
                          components: []
                        });

                      case 8:
                        if (!(interaction.customId === 'strength')) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 11;
                        return (0, _addStrength.addStrength)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 11:
                        _yield$addStrength = _context2.sent;
                        _yield$addStrength2 = (0, _slicedToArray2["default"])(_yield$addStrength, 2);
                        updatedUser = _yield$addStrength2[0];
                        cannotSpend = _yield$addStrength2[1];

                      case 15:
                        if (!(interaction.customId === 'dexterity')) {
                          _context2.next = 22;
                          break;
                        }

                        _context2.next = 18;
                        return (0, _addDexterity.addDexterity)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 18:
                        _yield$addDexterity = _context2.sent;
                        _yield$addDexterity2 = (0, _slicedToArray2["default"])(_yield$addDexterity, 2);
                        updatedUser = _yield$addDexterity2[0];
                        cannotSpend = _yield$addDexterity2[1];

                      case 22:
                        if (!(interaction.customId === 'vitality')) {
                          _context2.next = 29;
                          break;
                        }

                        _context2.next = 25;
                        return (0, _addVitality.addVitality)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 25:
                        _yield$addVitality = _context2.sent;
                        _yield$addVitality2 = (0, _slicedToArray2["default"])(_yield$addVitality, 2);
                        updatedUser = _yield$addVitality2[0];
                        cannotSpend = _yield$addVitality2[1];

                      case 29:
                        if (!(interaction.customId === 'energy')) {
                          _context2.next = 36;
                          break;
                        }

                        _context2.next = 32;
                        return (0, _addEnergy.addEnergy)(userCurrentCharacter.user.id, discordChannel, io, queue);

                      case 32:
                        _yield$addEnergy = _context2.sent;
                        _yield$addEnergy2 = (0, _slicedToArray2["default"])(_yield$addEnergy, 2);
                        updatedUser = _yield$addEnergy2[0];
                        cannotSpend = _yield$addEnergy2[1];

                      case 36:
                        if (!(interaction.customId === 'strength' || interaction.customId === 'dexterity' || interaction.customId === 'vitality' || interaction.customId === 'energy')) {
                          _context2.next = 50;
                          break;
                        }

                        newCalc = updatedUser.stats.strength + updatedUser.stats.dexterity + updatedUser.stats.vitality + updatedUser.stats.energy < updatedUser.user.ranks[0].id * 5;
                        _context2.t0 = interaction;
                        _context2.t1 = [];
                        _context2.t2 = _discord.MessageAttachment;
                        _context2.next = 43;
                        return (0, _stats.renderStatsImage)(updatedUser, false);

                      case 43:
                        _context2.t3 = _context2.sent;
                        _context2.t4 = new _context2.t2(_context2.t3, 'class.png');
                        _context2.t5 = [_context2.t4];
                        _context2.t6 = [].concat((0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [(0, _buttons.generateAddStrengthButton)(), (0, _buttons.generateAddDexterityButton)()]
                        })] : []), (0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [(0, _buttons.generateAddVitalityButton)(), (0, _buttons.generateAddEnergyButton)()]
                        })] : []), [new _discord.MessageActionRow({
                          components: [(0, _buttons.generateCancelStatsPickButton)()]
                        })]);
                        _context2.t7 = {
                          embeds: _context2.t1,
                          files: _context2.t5,
                          components: _context2.t6
                        };
                        _context2.next = 50;
                        return _context2.t0.editReply.call(_context2.t0, _context2.t7);

                      case 50:
                        if (!(interaction.customId === 'cancelStatsPick')) {
                          _context2.next = 61;
                          break;
                        }

                        _context2.t8 = interaction;
                        _context2.next = 54;
                        return generateCancelClassPicked();

                      case 54:
                        _context2.t9 = _context2.sent;
                        _context2.t10 = [_context2.t9];
                        _context2.t11 = [];
                        _context2.t12 = [];
                        _context2.t13 = {
                          files: _context2.t10,
                          components: _context2.t11,
                          embeds: _context2.t12
                        };
                        _context2.next = 61;
                        return _context2.t8.editReply.call(_context2.t8, _context2.t13);

                      case 61:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 35:
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