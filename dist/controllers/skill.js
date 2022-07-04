"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordSkills = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _discord = require("discord.js");

var _path = _interopRequireDefault(require("path"));

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _addSkillPoint = require("../helpers/skills/addSkillPoint");

var _skillTree = require("../render/skills/skillTree");

var _skillDescription = require("../render/skills/skillDescription");

var _cancelSkillPick = require("../render/skills/cancelSkillPick");

var _buttons = require("../buttons");

/* eslint-disable import/prefer-default-export */
var discordSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(discordClient, message, setting, io, queue) {
    var userId, discordChannel, userCurrentCharacter, generateSkillTreeImage, skillTreeMap, skillMap, embedMessage, loadingSkillAddEmbed, loadingSkillSelectEmbed, collector, skillTreeIndex, skillIndex, selectedSkill;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 2:
            userId = _context3.sent;
            _context3.next = 5;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 5:
            discordChannel = _context3.sent;
            _context3.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context3.sent;

            if (userCurrentCharacter) {
              _context3.next = 13;
              break;
            }

            _context3.next = 12;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 12:
            return _context3.abrupt("return");

          case 13:
            _context3.next = 15;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 15:
            generateSkillTreeImage = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCharacter, skillTree, skillTreeIndex, selectedSkill, failReason) {
                var skillTreeImageBuffer, skillTreeImage, skillDescriptionImageBuffer, skillDescriptionImage, failReasonHeight, canvas, ctx;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _skillTree.renderSkillTreeImage)(userCharacter, skillTree, skillTreeIndex, selectedSkill);

                      case 2:
                        skillTreeImageBuffer = _context.sent;
                        _context.next = 5;
                        return (0, _canvas.loadImage)(skillTreeImageBuffer);

                      case 5:
                        skillTreeImage = _context.sent;
                        _context.next = 8;
                        return (0, _skillDescription.renderSkillDescriptionImage)(userCharacter, skillTree, skillTreeIndex, selectedSkill);

                      case 8:
                        skillDescriptionImageBuffer = _context.sent;
                        _context.next = 11;
                        return (0, _canvas.loadImage)(skillDescriptionImageBuffer);

                      case 11:
                        skillDescriptionImage = _context.sent;
                        failReasonHeight = failReason ? 25 : 0;
                        canvas = (0, _canvas.createCanvas)(skillTreeImage.width + skillDescriptionImage.width, skillTreeImage.height + failReasonHeight);
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(skillTreeImage, 0, 0, skillTreeImage.width, skillTreeImage.height);

                        if (selectedSkill) {
                          ctx.drawImage(skillDescriptionImage, skillTreeImage.width, 0, skillDescriptionImage.width, skillDescriptionImage.height);
                        }

                        if (failReason) {
                          ctx.font = 'bold 15px "HeartWarming"';
                          ctx.fillStyle = "red";
                          ctx.strokeStyle = 'black';
                          ctx.lineWidth = 3;
                          ctx.textAlign = "center";
                          ctx.strokeText(failReason, skillTreeImage.width / 2, skillTreeImage.height + 15, skillTreeImage.width);
                          ctx.fillText(failReason, skillTreeImage.width / 2, skillTreeImage.height + 15, skillTreeImage.width);
                        }

                        return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'skillTree.png'));

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function generateSkillTreeImage(_x6, _x7, _x8, _x9, _x10) {
                return _ref2.apply(this, arguments);
              };
            }();

            skillTreeMap = userCurrentCharacter["class"].skillTrees.map(function (skilltree, index) {
              console.log(index);
              console.log('index');
              return {
                label: skilltree.name,
                value: "skilltree-".concat(index),
                "default": index === 0
              };
            });
            skillMap = userCurrentCharacter["class"].skillTrees[0].skills.map(function (mySkill, index) {
              return {
                placeholder: 'pick a skill',
                label: "".concat((mySkill.column + 9).toString(36).toUpperCase()).concat(mySkill.row, ": ").concat(mySkill.name),
                value: "skill-".concat(index)
              };
            });
            _context3.t0 = discordChannel;
            _context3.next = 21;
            return generateSkillTreeImage(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[0], 0, // skillTreeIndex
            false, // selected skill
            false // add skill failReason String
            );

          case 21:
            _context3.t1 = _context3.sent;
            _context3.t2 = [_context3.t1];
            _context3.t3 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skilltree',
                options: skillTreeMap
              })]
            });
            _context3.t4 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skill',
                options: skillMap
              })]
            });
            _context3.t5 = _discord.MessageActionRow;
            _context3.next = 28;
            return (0, _buttons.generateCancelSkillButton)();

          case 28:
            _context3.t6 = _context3.sent;
            _context3.t7 = [_context3.t6];
            _context3.t8 = {
              components: _context3.t7
            };
            _context3.t9 = new _context3.t5(_context3.t8);
            _context3.t10 = [_context3.t3, _context3.t4, _context3.t9];
            _context3.t11 = {
              files: _context3.t2,
              components: _context3.t10
            };
            _context3.next = 36;
            return _context3.t0.send.call(_context3.t0, _context3.t11);

          case 36:
            embedMessage = _context3.sent;
            loadingSkillAddEmbed = new _discord.MessageEmbed().setTitle('Adding Skill Point').setDescription("".concat(userCurrentCharacter.user.username, ", Loading.."));
            loadingSkillSelectEmbed = new _discord.MessageEmbed().setTitle('Selecting Skill').setDescription("".concat(userCurrentCharacter.user.username, ", Loading.."));
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            skillTreeIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(interaction) {
                var failAddSkillReason, skillToAddId, _yield$addSkillPoint, _yield$addSkillPoint2, skillTreeMapEdit, skillMapEdit;

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
                        if (!interaction.isButton()) {
                          _context2.next = 28;
                          break;
                        }

                        if (!interaction.customId.startsWith('addSkill:')) {
                          _context2.next = 17;
                          break;
                        }

                        _context2.next = 10;
                        return interaction.editReply({
                          embeds: [loadingSkillAddEmbed]
                        });

                      case 10:
                        skillToAddId = Number(interaction.customId.replace("addSkill:", ""));
                        _context2.next = 13;
                        return (0, _addSkillPoint.addSkillPoint)(userCurrentCharacter, skillToAddId, io, queue);

                      case 13:
                        _yield$addSkillPoint = _context2.sent;
                        _yield$addSkillPoint2 = (0, _slicedToArray2["default"])(_yield$addSkillPoint, 2);
                        userCurrentCharacter = _yield$addSkillPoint2[0];
                        failAddSkillReason = _yield$addSkillPoint2[1];

                      case 17:
                        if (!(interaction.customId === 'cancelSkillPick')) {
                          _context2.next = 28;
                          break;
                        }

                        _context2.t0 = interaction;
                        _context2.next = 21;
                        return (0, _cancelSkillPick.renderCancelSkillPick)(userCurrentCharacter);

                      case 21:
                        _context2.t1 = _context2.sent;
                        _context2.t2 = [_context2.t1];
                        _context2.t3 = [];
                        _context2.t4 = {
                          files: _context2.t2,
                          components: _context2.t3
                        };
                        _context2.next = 27;
                        return _context2.t0.editReply.call(_context2.t0, _context2.t4);

                      case 27:
                        return _context2.abrupt("return");

                      case 28:
                        if (interaction.isSelectMenu()) {
                          // await interaction.editReply({
                          //   embeds: [
                          //     loadingSkillSelectEmbed,
                          //   ],
                          // });
                          if (interaction.customId === 'select-skilltree') {
                            if (interaction.values[0].startsWith('skilltree-')) {
                              skillTreeIndex = Number(interaction.values[0].replace('skilltree-', ''));
                              selectedSkill = false;
                              skillIndex = false;
                            }
                          }

                          if (interaction.customId === 'select-skill') {
                            if (interaction.values[0].startsWith('skill-')) {
                              skillIndex = Number(interaction.values[0].replace('skill-', ''));
                              selectedSkill = userCurrentCharacter["class"].skillTrees[Number(skillTreeIndex)].skills[Number(skillIndex)];
                            }
                          }
                        }

                        skillTreeMapEdit = userCurrentCharacter["class"].skillTrees.map(function (skilltree, index) {
                          return {
                            label: skilltree.name,
                            value: "skilltree-".concat(index),
                            "default": index === skillTreeIndex
                          };
                        });
                        skillMapEdit = userCurrentCharacter["class"].skillTrees[skillTreeIndex].skills.map(function (mySkill, index) {
                          return {
                            placeholder: 'pick a skill',
                            label: "".concat((mySkill.column + 9).toString(36).toUpperCase()).concat(mySkill.row, ": ").concat(mySkill.name),
                            value: "skill-".concat(index),
                            "default": index === skillIndex
                          };
                        });
                        _context2.t5 = interaction;
                        _context2.t6 = [];
                        _context2.next = 35;
                        return generateSkillTreeImage(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[skillTreeIndex], skillTreeIndex, selectedSkill, failAddSkillReason);

                      case 35:
                        _context2.t7 = _context2.sent;
                        _context2.t8 = [_context2.t7];
                        _context2.t9 = [];
                        _context2.t10 = _toConsumableArray2["default"];

                        if (!selectedSkill) {
                          _context2.next = 50;
                          break;
                        }

                        _context2.t12 = _discord.MessageActionRow;
                        _context2.next = 43;
                        return (0, _buttons.generateAddSkillButton)(selectedSkill);

                      case 43:
                        _context2.t13 = _context2.sent;
                        _context2.t14 = [_context2.t13];
                        _context2.t15 = {
                          components: _context2.t14
                        };
                        _context2.t16 = new _context2.t12(_context2.t15);
                        _context2.t11 = [_context2.t16];
                        _context2.next = 51;
                        break;

                      case 50:
                        _context2.t11 = [];

                      case 51:
                        _context2.t17 = _context2.t11;
                        _context2.t18 = (0, _context2.t10)(_context2.t17);
                        _context2.t19 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skilltree',
                            options: skillTreeMapEdit
                          })]
                        });
                        _context2.t20 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skill',
                            options: skillMapEdit
                          })]
                        });
                        _context2.t21 = _discord.MessageActionRow;
                        _context2.next = 58;
                        return (0, _buttons.generateCancelSkillButton)();

                      case 58:
                        _context2.t22 = _context2.sent;
                        _context2.t23 = [_context2.t22];
                        _context2.t24 = {
                          components: _context2.t23
                        };
                        _context2.t25 = new _context2.t21(_context2.t24);
                        _context2.t26 = [_context2.t19, _context2.t20, _context2.t25];
                        _context2.t27 = _context2.t9.concat.call(_context2.t9, _context2.t18, _context2.t26);
                        _context2.t28 = {
                          embeds: _context2.t6,
                          files: _context2.t8,
                          components: _context2.t27
                        };
                        _context2.next = 67;
                        return _context2.t5.editReply.call(_context2.t5, _context2.t28);

                      case 67:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x11) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 42:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function discordSkills(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordSkills = discordSkills;