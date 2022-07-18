"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _addStrength = require("../helpers/stats/addStrength");

var _addDexterity = require("../helpers/stats/addDexterity");

var _addVitality = require("../helpers/stats/addVitality");

var _addEnergy = require("../helpers/stats/addEnergy");

var _stats = require("../render/stats/stats");

var _cancelStats = require("../render/stats/cancelStats");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

var _buttons = require("../buttons");

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

var _embeds = require("../embeds");

/* eslint-disable import/prefer-default-export */
// import {
//   Sequelize,
//   Transaction,
//   Op,
// } from "sequelize";
// import db from '../models';
// import logger from "../helpers/logger";
var discordStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(discordClient, message, setting, io, queue, isDefered) {
    var activity, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, failed, usedDeferReply, _yield$calculateChara, unspendAttributes, calc, embedMessage, collector;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            activity = [];
            _context2.next = 3;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 3:
            userId = _context2.sent;
            _context2.next = 6;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 6:
            discordChannel = _context2.sent;
            _context2.next = 9;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 9:
            userCurrentCharacter = _context2.sent;
            _context2.next = 12;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 12:
            _yield$testPlayerRead = _context2.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", usedDeferReply);

          case 18:
            _context2.next = 20;
            return (0, _calculateCharacterStats.calculateCharacterStats)(userCurrentCharacter);

          case 20:
            _yield$calculateChara = _context2.sent;
            unspendAttributes = _yield$calculateChara.unspendAttributes;
            // const calc = (
            //   userCurrentCharacter.stats.strength
            //   + userCurrentCharacter.stats.dexterity
            //   + userCurrentCharacter.stats.vitality
            //   + userCurrentCharacter.stats.energy
            // ) < (userCurrentCharacter.user.ranks[0].id * 5);
            calc = unspendAttributes > 0;
            _context2.t0 = discordChannel;
            _context2.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context2.next = 27;
            return (0, _stats.renderStatsImage)(userCurrentCharacter, false);

          case 27:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              attachment: _context2.t2,
              name: 'stats.png'
            };
            _context2.t4 = [_context2.t3];
            _context2.t5 = [].concat((0, _toConsumableArray2["default"])(calc ? [new _discord.ActionRowBuilder({
              components: [(0, _buttons.generateAddStrengthButton)(), (0, _buttons.generateAddDexterityButton)()]
            })] : []), (0, _toConsumableArray2["default"])(calc ? [new _discord.ActionRowBuilder({
              components: [(0, _buttons.generateAddVitalityButton)(), (0, _buttons.generateAddEnergyButton)()]
            })] : []), [new _discord.ActionRowBuilder({
              components: [(0, _buttons.generateCancelStatsPickButton)()]
            })]);
            _context2.t6 = {
              content: _context2.t1,
              files: _context2.t4,
              components: _context2.t5
            };
            _context2.next = 34;
            return _context2.t0.send.call(_context2.t0, _context2.t6);

          case 34:
            embedMessage = _context2.sent;
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(interaction) {
                var updatedUser, cannotSpend, _yield$addStrength, _yield$addStrength2, _yield$addDexterity, _yield$addDexterity2, _yield$addVitality, _yield$addVitality2, _yield$addEnergy, _yield$addEnergy2, newCalc;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id)) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 3;
                        return interaction.reply({
                          content: "<@".concat(interaction.user.id, ">, These buttons aren't for you!"),
                          ephemeral: true
                        });

                      case 3:
                        return _context.abrupt("return");

                      case 4:
                        _context.next = 6;
                        return interaction.deferUpdate();

                      case 6:
                        _context.t0 = interaction;
                        _context.next = 9;
                        return (0, _embeds.addingAttributeEmbed)(userCurrentCharacter);

                      case 9:
                        _context.t1 = _context.sent;
                        _context.t2 = [_context.t1];
                        _context.t3 = [];
                        _context.t4 = {
                          embeds: _context.t2,
                          components: _context.t3
                        };
                        _context.next = 15;
                        return _context.t0.editReply.call(_context.t0, _context.t4);

                      case 15:
                        if (!(interaction.customId === 'strength')) {
                          _context.next = 22;
                          break;
                        }

                        _context.next = 18;
                        return (0, _addStrength.addStrength)(userCurrentCharacter, io, queue);

                      case 18:
                        _yield$addStrength = _context.sent;
                        _yield$addStrength2 = (0, _slicedToArray2["default"])(_yield$addStrength, 2);
                        updatedUser = _yield$addStrength2[0];
                        cannotSpend = _yield$addStrength2[1];

                      case 22:
                        if (!(interaction.customId === 'dexterity')) {
                          _context.next = 29;
                          break;
                        }

                        _context.next = 25;
                        return (0, _addDexterity.addDexterity)(userCurrentCharacter, io, queue);

                      case 25:
                        _yield$addDexterity = _context.sent;
                        _yield$addDexterity2 = (0, _slicedToArray2["default"])(_yield$addDexterity, 2);
                        updatedUser = _yield$addDexterity2[0];
                        cannotSpend = _yield$addDexterity2[1];

                      case 29:
                        if (!(interaction.customId === 'vitality')) {
                          _context.next = 36;
                          break;
                        }

                        _context.next = 32;
                        return (0, _addVitality.addVitality)(userCurrentCharacter, io, queue);

                      case 32:
                        _yield$addVitality = _context.sent;
                        _yield$addVitality2 = (0, _slicedToArray2["default"])(_yield$addVitality, 2);
                        updatedUser = _yield$addVitality2[0];
                        cannotSpend = _yield$addVitality2[1];

                      case 36:
                        if (!(interaction.customId === 'energy')) {
                          _context.next = 43;
                          break;
                        }

                        _context.next = 39;
                        return (0, _addEnergy.addEnergy)(userCurrentCharacter, io, queue);

                      case 39:
                        _yield$addEnergy = _context.sent;
                        _yield$addEnergy2 = (0, _slicedToArray2["default"])(_yield$addEnergy, 2);
                        updatedUser = _yield$addEnergy2[0];
                        cannotSpend = _yield$addEnergy2[1];

                      case 43:
                        if (!(interaction.customId === 'strength' || interaction.customId === 'dexterity' || interaction.customId === 'vitality' || interaction.customId === 'energy')) {
                          _context.next = 57;
                          break;
                        }

                        newCalc = updatedUser.stats.strength + updatedUser.stats.dexterity + updatedUser.stats.vitality + updatedUser.stats.energy < updatedUser.UserGroup.UserGroupRank.rank.level * 5;
                        _context.t5 = interaction;
                        _context.t6 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.t7 = [];
                        _context.next = 50;
                        return (0, _stats.renderStatsImage)(updatedUser, false);

                      case 50:
                        _context.t8 = _context.sent;
                        _context.t9 = {
                          attachment: _context.t8,
                          name: 'stats.png'
                        };
                        _context.t10 = [_context.t9];
                        _context.t11 = [].concat((0, _toConsumableArray2["default"])(newCalc ? [new _discord.ActionRowBuilder({
                          components: [(0, _buttons.generateAddStrengthButton)(), (0, _buttons.generateAddDexterityButton)()]
                        })] : []), (0, _toConsumableArray2["default"])(newCalc ? [new _discord.ActionRowBuilder({
                          components: [(0, _buttons.generateAddVitalityButton)(), (0, _buttons.generateAddEnergyButton)()]
                        })] : []), [new _discord.ActionRowBuilder({
                          components: [(0, _buttons.generateCancelStatsPickButton)()]
                        })]);
                        _context.t12 = {
                          content: _context.t6,
                          embeds: _context.t7,
                          files: _context.t10,
                          components: _context.t11
                        };
                        _context.next = 57;
                        return _context.t5.editReply.call(_context.t5, _context.t12);

                      case 57:
                        if (!(interaction.customId === 'cancelStatsPick')) {
                          _context.next = 70;
                          break;
                        }

                        _context.t13 = interaction;
                        _context.t14 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.next = 62;
                        return (0, _cancelStats.renderCancelStatsImage)(userCurrentCharacter);

                      case 62:
                        _context.t15 = _context.sent;
                        _context.t16 = {
                          attachment: _context.t15,
                          name: 'stats.png'
                        };
                        _context.t17 = [_context.t16];
                        _context.t18 = [];
                        _context.t19 = [];
                        _context.t20 = {
                          content: _context.t14,
                          files: _context.t17,
                          components: _context.t18,
                          embeds: _context.t19
                        };
                        _context.next = 70;
                        return _context.t13.editReply.call(_context.t13, _context.t20);

                      case 70:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x7) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function discordStats(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordStats = discordStats;