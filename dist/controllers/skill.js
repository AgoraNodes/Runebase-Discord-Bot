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

var _discord = require("discord.js");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _addSkillPoint = require("../helpers/skills/addSkillPoint");

var _skills = require("../render/skills");

var _cancelSkillPick = require("../render/skills/cancelSkillPick");

var _buttons = require("../buttons");

/* eslint-disable import/prefer-default-export */
var discordSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(discordClient, message, setting, io, queue) {
    var userId, discordChannel, userCurrentCharacter, skillTreeMap, skillMap, embedMessage, loadingSkillAddEmbed, loadingSkillSelectEmbed, collector, skillTreeIndex, skillIndex, selectedSkill;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 2:
            userId = _context2.sent;
            _context2.next = 5;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 5:
            discordChannel = _context2.sent;
            _context2.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context2.sent;

            if (userCurrentCharacter) {
              _context2.next = 13;
              break;
            }

            _context2.next = 12;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 12:
            return _context2.abrupt("return");

          case 13:
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
            _context2.t0 = discordChannel;
            _context2.next = 18;
            return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[0], 0, // skillTreeIndex
            false, // selected skill
            false // add skill failReason String
            );

          case 18:
            _context2.t1 = _context2.sent;
            _context2.t2 = [_context2.t1];
            _context2.t3 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skilltree',
                options: skillTreeMap
              })]
            });
            _context2.t4 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skill',
                options: skillMap
              })]
            });
            _context2.t5 = _discord.MessageActionRow;
            _context2.next = 25;
            return (0, _buttons.generateCancelSkillButton)();

          case 25:
            _context2.t6 = _context2.sent;
            _context2.t7 = [_context2.t6];
            _context2.t8 = {
              components: _context2.t7
            };
            _context2.t9 = new _context2.t5(_context2.t8);
            _context2.t10 = [_context2.t3, _context2.t4, _context2.t9];
            _context2.t11 = {
              files: _context2.t2,
              components: _context2.t10
            };
            _context2.next = 33;
            return _context2.t0.send.call(_context2.t0, _context2.t11);

          case 33:
            embedMessage = _context2.sent;
            loadingSkillAddEmbed = new _discord.MessageEmbed().setTitle('Adding Skill Point').setDescription("".concat(userCurrentCharacter.user.username, ", Loading.."));
            loadingSkillSelectEmbed = new _discord.MessageEmbed().setTitle('Selecting Skill').setDescription("".concat(userCurrentCharacter.user.username, ", Loading.."));
            collector = embedMessage.createMessageComponentCollector({// filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
            });
            skillTreeIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(interaction) {
                var failAddSkillReason, skillToAddId, _yield$addSkillPoint, _yield$addSkillPoint2, skillTreeMapEdit, skillMapEdit;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(interaction.user.id !== userCurrentCharacter.user.user_id)) {
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
                        if (!interaction.isButton()) {
                          _context.next = 28;
                          break;
                        }

                        if (!interaction.customId.startsWith('addSkill:')) {
                          _context.next = 17;
                          break;
                        }

                        _context.next = 10;
                        return interaction.editReply({
                          embeds: [loadingSkillAddEmbed]
                        });

                      case 10:
                        skillToAddId = Number(interaction.customId.replace("addSkill:", ""));
                        _context.next = 13;
                        return (0, _addSkillPoint.addSkillPoint)(userCurrentCharacter, skillToAddId, io, queue);

                      case 13:
                        _yield$addSkillPoint = _context.sent;
                        _yield$addSkillPoint2 = (0, _slicedToArray2["default"])(_yield$addSkillPoint, 2);
                        userCurrentCharacter = _yield$addSkillPoint2[0];
                        failAddSkillReason = _yield$addSkillPoint2[1];

                      case 17:
                        if (!(interaction.customId === 'cancelSkillPick')) {
                          _context.next = 28;
                          break;
                        }

                        _context.t0 = interaction;
                        _context.next = 21;
                        return (0, _cancelSkillPick.renderCancelSkillPick)(userCurrentCharacter);

                      case 21:
                        _context.t1 = _context.sent;
                        _context.t2 = [_context.t1];
                        _context.t3 = [];
                        _context.t4 = {
                          files: _context.t2,
                          components: _context.t3
                        };
                        _context.next = 27;
                        return _context.t0.editReply.call(_context.t0, _context.t4);

                      case 27:
                        return _context.abrupt("return");

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
                        _context.t5 = interaction;
                        _context.t6 = [];
                        _context.next = 35;
                        return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[skillTreeIndex], skillTreeIndex, selectedSkill, failAddSkillReason);

                      case 35:
                        _context.t7 = _context.sent;
                        _context.t8 = [_context.t7];
                        _context.t9 = [];
                        _context.t10 = _toConsumableArray2["default"];

                        if (!selectedSkill) {
                          _context.next = 50;
                          break;
                        }

                        _context.t12 = _discord.MessageActionRow;
                        _context.next = 43;
                        return (0, _buttons.generateAddSkillButton)(selectedSkill);

                      case 43:
                        _context.t13 = _context.sent;
                        _context.t14 = [_context.t13];
                        _context.t15 = {
                          components: _context.t14
                        };
                        _context.t16 = new _context.t12(_context.t15);
                        _context.t11 = [_context.t16];
                        _context.next = 51;
                        break;

                      case 50:
                        _context.t11 = [];

                      case 51:
                        _context.t17 = _context.t11;
                        _context.t18 = (0, _context.t10)(_context.t17);
                        _context.t19 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skilltree',
                            options: skillTreeMapEdit
                          })]
                        });
                        _context.t20 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skill',
                            options: skillMapEdit
                          })]
                        });
                        _context.t21 = _discord.MessageActionRow;
                        _context.next = 58;
                        return (0, _buttons.generateCancelSkillButton)();

                      case 58:
                        _context.t22 = _context.sent;
                        _context.t23 = [_context.t22];
                        _context.t24 = {
                          components: _context.t23
                        };
                        _context.t25 = new _context.t21(_context.t24);
                        _context.t26 = [_context.t19, _context.t20, _context.t25];
                        _context.t27 = _context.t9.concat.call(_context.t9, _context.t18, _context.t26);
                        _context.t28 = {
                          embeds: _context.t6,
                          files: _context.t8,
                          components: _context.t27
                        };
                        _context.next = 67;
                        return _context.t5.editReply.call(_context.t5, _context.t28);

                      case 67:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function discordSkills(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordSkills = discordSkills;