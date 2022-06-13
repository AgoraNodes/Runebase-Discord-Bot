"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordStats = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

/* eslint-disable import/prefer-default-export */
var discordStats = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(discordClient, message, setting, io, queue) {
    var userId, user, nextRank, nextRankExp, activity, CurrentClassSelectionId, discordChannel, strengthButtonId, dexterityButtonId, vitalityButtonId, energyButtonId, cancelStatsPickId, strengthButton, dexterityButton, vitalityButton, energyButton, cancelStatsPickButton, generateStatsImage, generateCancelClassPicked, calc, embedMessage, collector;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context4.next = 3;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(userId)
              },
              include: [{
                model: _models["default"]["class"],
                as: 'currentClass'
              }, {
                model: _models["default"].rank,
                as: 'ranks'
              }, {
                model: _models["default"].UserClass,
                as: 'UserClass',
                where: {
                  classId: (0, _defineProperty2["default"])({}, _sequelize.Op.col, 'user.currentClassId')
                },
                include: [{
                  model: _models["default"].stats,
                  as: 'stats'
                }, {
                  model: _models["default"].condition,
                  as: 'condition'
                }]
              }]
            });

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return");

          case 6:
            if (user.UserClass) {
              _context4.next = 9;
              break;
            }

            console.log('user has not selected a class yet'); // Add notice message here to warn user to select a class

            return _context4.abrupt("return");

          case 9:
            _context4.next = 11;
            return _models["default"].rank.findOne({
              where: {
                expNeeded: (0, _defineProperty2["default"])({}, _sequelize.Op.gt, user.exp)
              },
              order: [['id', 'ASC']]
            });

          case 11:
            nextRank = _context4.sent;
            nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : user.ranks[0].expNeeded;
            console.log(user);
            console.log(user.ranks[0]);
            console.log(user.UserClass);
            console.log(user.UserClass.stats);
            activity = [];
            strengthButtonId = 'strength';
            dexterityButtonId = 'dexterity';
            vitalityButtonId = 'vitality';
            energyButtonId = 'energy';
            cancelStatsPickId = 'cancelStatsPick';

            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context4.next = 35;
              break;
            }

            if (!message.guildId) {
              _context4.next = 30;
              break;
            }

            _context4.next = 27;
            return discordClient.channels.cache.get(message.channelId);

          case 27:
            discordChannel = _context4.sent;
            _context4.next = 33;
            break;

          case 30:
            _context4.next = 32;
            return discordClient.users.cache.get(message.user.id);

          case 32:
            discordChannel = _context4.sent;

          case 33:
            _context4.next = 43;
            break;

          case 35:
            if (!(message.channel.type === 'DM')) {
              _context4.next = 39;
              break;
            }

            _context4.next = 38;
            return discordClient.channels.cache.get(message.channelId);

          case 38:
            discordChannel = _context4.sent;

          case 39:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context4.next = 43;
              break;
            }

            _context4.next = 42;
            return discordClient.channels.cache.get(message.channelId);

          case 42:
            discordChannel = _context4.sent;

          case 43:
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
            _context4.next = 50;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 50:
            generateStatsImage = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUser, nextRankExp, cannotSpendWarning) {
                var countedSpendAttributes, canSpendAttributes, AttributesToSpend, canvas, ctx, BackgroundImageStats, unspendAttributesBoxImage, strengthPoints, dexterityPoints, vitalityPoints, energyPoints, attackRatingOne, attackRatingTwo, defense, staminaPoints, currentStaminaPoints, lifePoints, currentLifePoints, manaPoints, currentManaPoints;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        countedSpendAttributes = currentUser.UserClass.stats.strength + currentUser.UserClass.stats.dexterity + currentUser.UserClass.stats.vitality + currentUser.UserClass.stats.energy;
                        canSpendAttributes = countedSpendAttributes < currentUser.ranks[0].id * 5;
                        AttributesToSpend = currentUser.ranks[0].id * 5 - countedSpendAttributes;
                        canvas = (0, _canvas.createCanvas)(960, 1400);
                        ctx = canvas.getContext('2d');
                        _context.next = 7;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images', "stats_background.png"));

                      case 7:
                        BackgroundImageStats = _context.sent;
                        _context.next = 10;
                        return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../assets/images', "unspendAttributesBox.png"));

                      case 10:
                        unspendAttributesBoxImage = _context.sent;
                        ctx.drawImage(BackgroundImageStats, 0, 0, 960, 1300);

                        if (canSpendAttributes) {
                          ctx.drawImage(unspendAttributesBoxImage, 10, 1070, 495, 82);
                          ctx.fillStyle = "red";
                          ctx.strokeStyle = 'black';
                          ctx.lineWidth = 3;
                          ctx.textAlign = "center";
                          ctx.font = 'bold 25px "HeartWarming"';
                          ctx.strokeText('Stats Points', 155, 1105, 540);
                          ctx.fillText('Stats Points', 155, 1105, 540);
                          ctx.strokeText('Remaining', 155, 1130, 540);
                          ctx.fillText('Remaining', 155, 1130, 540);
                          ctx.fillStyle = "#ccc";
                          ctx.font = 'bold 45px "HeartWarming"';
                          ctx.strokeText(AttributesToSpend, 410, 1125, 540);
                          ctx.fillText(AttributesToSpend, 410, 1125, 540);
                        }

                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.font = 'bold 35px "HeartWarming"'; // username

                        ctx.strokeText(currentUser.username, 290, 70, 540);
                        ctx.fillText(currentUser.username, 290, 70, 540); // character classname

                        ctx.strokeText(currentUser.currentClass.name, 760, 70, 240);
                        ctx.fillText(currentUser.currentClass.name, 760, 70, 240); // level

                        ctx.strokeText('Level', 100, 135, 240);
                        ctx.fillText('level', 100, 135, 240);
                        ctx.strokeText(currentUser.ranks[0].id, 100, 175, 240);
                        ctx.fillText(currentUser.ranks[0].id, 100, 175, 240); // Experience

                        ctx.strokeText('Experience', 375, 135, 240);
                        ctx.fillText('Experience', 375, 135, 240);
                        ctx.strokeText(currentUser.exp, 375, 175, 240);
                        ctx.fillText(currentUser.exp, 375, 175, 240); // Next level

                        ctx.strokeText('Next level', 760, 135, 240);
                        ctx.fillText('Next level', 760, 135, 240);
                        ctx.strokeText(nextRankExp, 760, 175, 240); // Change this to next level exp

                        ctx.fillText(nextRankExp, 760, 175, 240);
                        ctx.font = 'bold 30px "HeartWarming"'; // Strength

                        strengthPoints = currentUser.currentClass.strength + currentUser.UserClass.stats.strength;
                        ctx.strokeText("Strength", 125, 290, 200);
                        ctx.fillText("Strength", 125, 290, 200);
                        ctx.strokeText(strengthPoints, 288, 290, 200);
                        ctx.fillText(strengthPoints, 288, 290, 200); // Dexterity

                        dexterityPoints = currentUser.currentClass.dexterity + currentUser.UserClass.stats.dexterity;
                        ctx.strokeText("Dexterity", 125, 475, 200);
                        ctx.fillText("Dexterity", 125, 475, 200);
                        ctx.strokeText(dexterityPoints, 288, 475, 200);
                        ctx.fillText(dexterityPoints, 288, 475, 200); // Vitality

                        vitalityPoints = currentUser.currentClass.vitality + currentUser.UserClass.stats.vitality;
                        ctx.strokeText("Vitality", 125, 735, 200);
                        ctx.fillText("Vitality", 125, 735, 200);
                        ctx.strokeText(vitalityPoints, 288, 735, 200);
                        ctx.fillText(vitalityPoints, 288, 735, 200); // Energy

                        energyPoints = currentUser.currentClass.energy + currentUser.UserClass.stats.energy;
                        ctx.strokeText("Energy", 125, 920, 200);
                        ctx.fillText("Energy", 125, 920, 200);
                        ctx.strokeText(energyPoints, 288, 920, 200);
                        ctx.fillText(energyPoints, 288, 920, 200); // attack 1

                        ctx.strokeText("Attack Damage", 635, 290, 200);
                        ctx.fillText("Attack Damage", 635, 290, 200);
                        ctx.strokeText("1-2", 855, 290, 200);
                        ctx.fillText("1-2", 855, 290, 200); // attack 2

                        ctx.strokeText("Attack Damage", 635, 360, 200);
                        ctx.fillText("Attack Damage", 635, 360, 200);
                        ctx.strokeText("1-2", 855, 360, 200);
                        ctx.fillText("1-2", 855, 360, 200); // attack rating 1

                        attackRatingOne = currentUser.currentClass.attackRating + currentUser.UserClass.stats.dexterity * 5;
                        ctx.strokeText("Attack Rating", 645, 475, 200);
                        ctx.fillText("Attack Rating", 645, 475, 200);
                        ctx.strokeText(attackRatingOne, 875, 475, 200);
                        ctx.fillText(attackRatingOne, 875, 475, 200); // attack rating 2

                        attackRatingTwo = currentUser.currentClass.attackRating + currentUser.UserClass.stats.dexterity * 5;
                        console.log(currentUser.UserClass.stats.dexterity * 5);
                        console.log(attackRatingTwo);
                        console.log('attackRating2');
                        ctx.strokeText("Attack Rating", 645, 545, 200);
                        ctx.fillText("Attack Rating", 645, 545, 200);
                        ctx.strokeText(attackRatingTwo, 875, 545, 200);
                        ctx.fillText(attackRatingTwo, 875, 545, 200); // Defense

                        defense = currentUser.currentClass.defense;
                        ctx.strokeText("Defense", 645, 620, 200);
                        ctx.fillText("Defense", 645, 620, 200);
                        ctx.strokeText(defense, 875, 620, 200);
                        ctx.fillText(defense, 875, 620, 200); // Stamina

                        staminaPoints = currentUser.currentClass.stamina + currentUser.UserClass.stats.stamina;
                        currentStaminaPoints = currentUser.UserClass.condition.stamina;
                        ctx.strokeText("Stamina", 585, 735, 200);
                        ctx.fillText("Stamina", 585, 735, 200);
                        ctx.strokeText(currentStaminaPoints, 755, 735, 200);
                        ctx.fillText(currentStaminaPoints, 755, 735, 200);
                        ctx.strokeText(staminaPoints, 875, 735, 200);
                        ctx.fillText(staminaPoints, 875, 735, 200); // Life

                        lifePoints = currentUser.currentClass.life + currentUser.UserClass.stats.life;
                        currentLifePoints = currentUser.UserClass.condition.life;
                        ctx.strokeText("Life", 585, 805, 200);
                        ctx.fillText("Life", 585, 805, 200);
                        ctx.strokeText(currentLifePoints, 755, 805, 200);
                        ctx.fillText(currentLifePoints, 755, 805, 200);
                        ctx.strokeText(lifePoints, 875, 805, 200);
                        ctx.fillText(lifePoints, 875, 805, 200); // Mana

                        manaPoints = currentUser.currentClass.mana + currentUser.UserClass.stats.mana;
                        currentManaPoints = currentUser.UserClass.condition.mana;
                        ctx.strokeText("Mana", 585, 920, 200);
                        ctx.fillText("Mana", 585, 920, 200);
                        ctx.strokeText(currentManaPoints, 755, 920, 200);
                        ctx.fillText(currentManaPoints, 755, 920, 200);
                        ctx.strokeText(manaPoints, 875, 920, 200);
                        ctx.fillText(manaPoints, 875, 920, 200); // Fire resistance

                        ctx.strokeText("Fire resistance", 665, 1038, 240);
                        ctx.fillText("Fire resistance", 665, 1038, 240);
                        ctx.strokeText("0", 875, 1038, 240);
                        ctx.fillText("0", 875, 1038, 240); // Cold resistance

                        ctx.strokeText("Cold resistance", 665, 1110, 240);
                        ctx.fillText("Cold resistance", 665, 1110, 240);
                        ctx.strokeText("0", 875, 1110, 240);
                        ctx.fillText("0", 875, 1110, 240); // Lightning resistance

                        ctx.strokeText("Lightning resistance", 665, 1182, 240);
                        ctx.fillText("Lightning resistance", 665, 1182, 240);
                        ctx.strokeText("0", 875, 1182, 240);
                        ctx.fillText("0", 875, 1182, 240); // Poision resistance

                        ctx.strokeText("Poision resistance", 665, 1254, 240);
                        ctx.fillText("Poision resistance", 665, 1254, 240);
                        ctx.strokeText("0", 875, 1254, 240);
                        ctx.fillText("0", 875, 1254, 240);

                        if (cannotSpendWarning) {
                          ctx.fillStyle = "red";
                          ctx.font = 'bold 35px "HeartWarming"';
                          ctx.strokeText('Warning', 245, 1190, 540);
                          ctx.fillText('Warning', 245, 1190, 540);
                          ctx.strokeText('Unable to spend stats', 245, 1230, 540);
                          ctx.fillText('Unable to spend stats', 245, 1230, 540);
                        } // bottom stats message


                        ctx.fillStyle = "#fe5701";
                        ctx.font = 'bold 70px "HeartWarming"';
                        ctx.strokeText("".concat(currentUser.username, "'s ").concat(currentUser.currentClass.name, " stats"), 480, 1380, 960);
                        ctx.fillText("".concat(currentUser.username, "'s ").concat(currentUser.currentClass.name, " stats"), 480, 1380, 960);
                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'class.png'));

                      case 127:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateStatsImage(_x6, _x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }();

            generateCancelClassPicked = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                var canvas, ctx;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        canvas = (0, _canvas.createCanvas)(500, 100);
                        ctx = canvas.getContext('2d');
                        ctx.font = 'bold 30px "HeartWarming"';
                        ctx.fillStyle = "#ccc";
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 3;
                        ctx.textAlign = "center";
                        ctx.strokeText("".concat(user.username, " canceled stats selection"), 250, 60, 500);
                        ctx.fillText("".concat(user.username, " canceled stats selection"), 250, 60, 500);
                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generateCancelClassPicked() {
                return _ref3.apply(this, arguments);
              };
            }();

            calc = user.UserClass.stats.strength + user.UserClass.stats.dexterity + user.UserClass.stats.vitality + user.UserClass.stats.energy < user.ranks[0].id * 5;
            _context4.t0 = discordChannel;
            _context4.next = 56;
            return generateStatsImage(user, nextRankExp, false);

          case 56:
            _context4.t1 = _context4.sent;
            _context4.t2 = [_context4.t1];
            _context4.t3 = [].concat((0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [strengthButton, dexterityButton]
            })] : []), (0, _toConsumableArray2["default"])(calc ? [new _discord.MessageActionRow({
              components: [vitalityButton, energyButton]
            })] : []), [new _discord.MessageActionRow({
              components: [cancelStatsPickButton]
            })]);
            _context4.t4 = {
              files: _context4.t2,
              components: _context4.t3
            };
            _context4.next = 62;
            return _context4.t0.send.call(_context4.t0, _context4.t4);

          case 62:
            embedMessage = _context4.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref4) {
                var discordUser = _ref4.user;
                return discordUser.id === user.user_id;
              }
            });
            collector.on('collect', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(interaction) {
                var updatedUser, cannotSpend, _yield$addStrength, _yield$addStrength2, _yield$addDexterity, _yield$addDexterity2, _yield$addVitality, _yield$addVitality2, _yield$addEnergy, _yield$addEnergy2, newCalc;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(interaction.customId === strengthButtonId)) {
                          _context3.next = 7;
                          break;
                        }

                        _context3.next = 3;
                        return (0, _addStrength.addStrength)(user.id, discordChannel, io, queue);

                      case 3:
                        _yield$addStrength = _context3.sent;
                        _yield$addStrength2 = (0, _slicedToArray2["default"])(_yield$addStrength, 2);
                        updatedUser = _yield$addStrength2[0];
                        cannotSpend = _yield$addStrength2[1];

                      case 7:
                        if (!(interaction.customId === dexterityButtonId)) {
                          _context3.next = 14;
                          break;
                        }

                        _context3.next = 10;
                        return (0, _addDexterity.addDexterity)(user.id, discordChannel, io, queue);

                      case 10:
                        _yield$addDexterity = _context3.sent;
                        _yield$addDexterity2 = (0, _slicedToArray2["default"])(_yield$addDexterity, 2);
                        updatedUser = _yield$addDexterity2[0];
                        cannotSpend = _yield$addDexterity2[1];

                      case 14:
                        if (!(interaction.customId === vitalityButtonId)) {
                          _context3.next = 21;
                          break;
                        }

                        _context3.next = 17;
                        return (0, _addVitality.addVitality)(user.id, discordChannel, io, queue);

                      case 17:
                        _yield$addVitality = _context3.sent;
                        _yield$addVitality2 = (0, _slicedToArray2["default"])(_yield$addVitality, 2);
                        updatedUser = _yield$addVitality2[0];
                        cannotSpend = _yield$addVitality2[1];

                      case 21:
                        if (!(interaction.customId === energyButtonId)) {
                          _context3.next = 28;
                          break;
                        }

                        _context3.next = 24;
                        return (0, _addEnergy.addEnergy)(user.id, discordChannel, io, queue);

                      case 24:
                        _yield$addEnergy = _context3.sent;
                        _yield$addEnergy2 = (0, _slicedToArray2["default"])(_yield$addEnergy, 2);
                        updatedUser = _yield$addEnergy2[0];
                        cannotSpend = _yield$addEnergy2[1];

                      case 28:
                        if (!(interaction.customId === strengthButtonId || interaction.customId === dexterityButtonId || interaction.customId === vitalityButtonId || interaction.customId === energyButtonId)) {
                          _context3.next = 39;
                          break;
                        }

                        newCalc = updatedUser.UserClass.stats.strength + updatedUser.UserClass.stats.dexterity + updatedUser.UserClass.stats.vitality + updatedUser.UserClass.stats.energy < updatedUser.ranks[0].id * 5;
                        _context3.t0 = interaction;
                        _context3.next = 33;
                        return generateStatsImage(updatedUser, nextRankExp, cannotSpend);

                      case 33:
                        _context3.t1 = _context3.sent;
                        _context3.t2 = [_context3.t1];
                        _context3.t3 = [].concat((0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [strengthButton, dexterityButton]
                        })] : []), (0, _toConsumableArray2["default"])(newCalc ? [new _discord.MessageActionRow({
                          components: [vitalityButton, energyButton]
                        })] : []), [new _discord.MessageActionRow({
                          components: [cancelStatsPickButton]
                        })]);
                        _context3.t4 = {
                          files: _context3.t2,
                          components: _context3.t3
                        };
                        _context3.next = 39;
                        return _context3.t0.update.call(_context3.t0, _context3.t4);

                      case 39:
                        if (!(interaction.customId === cancelStatsPickId)) {
                          _context3.next = 49;
                          break;
                        }

                        _context3.t5 = interaction;
                        _context3.next = 43;
                        return generateCancelClassPicked();

                      case 43:
                        _context3.t6 = _context3.sent;
                        _context3.t7 = [_context3.t6];
                        _context3.t8 = [];
                        _context3.t9 = {
                          files: _context3.t7,
                          components: _context3.t8
                        };
                        _context3.next = 49;
                        return _context3.t5.update.call(_context3.t5, _context3.t9);

                      case 49:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x9) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 65:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function discordStats(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordStats = discordStats;