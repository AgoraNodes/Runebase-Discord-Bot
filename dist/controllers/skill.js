"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordSkills = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _character = require("../helpers/character/character");

var _fetchDiscordUserIdFromMessageOrInteraction = require("../helpers/client/fetchDiscordUserIdFromMessageOrInteraction");

var _fetchDiscordChannel = require("../helpers/client/fetchDiscordChannel");

var _addSkillPoint = require("../helpers/skills/addSkillPoint");

var _skills = require("../render/skills");

var _cancelSkillPick = require("../render/skills/cancelSkillPick");

var _buttons = require("../buttons");

var _skillInfo = _interopRequireDefault(require("../render/skills/skillInfo"));

var _messages = require("../messages");

var _skillEmoji = _interopRequireDefault(require("../config/skillEmoji"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var discordSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(discordClient, message, setting, io, queue) {
    var userId, discordChannel, userCurrentCharacter, skillTreeMap, skillMap, embedMessage, collector, skillTreeIndex, skillIndex, selectedSkill;
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
              content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
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
              var emoji = _skillEmoji["default"].find(function (a) {
                return a.name === mySkill.name;
              });

              return _objectSpread({
                placeholder: 'pick a skill',
                label: "".concat((mySkill.column + 9).toString(36).toUpperCase()).concat(mySkill.row, ": ").concat(mySkill.name),
                value: "skill-".concat(index)
              }, emoji ? {
                emoji: emoji.emoji
              } : false);
            });
            _context2.t0 = discordChannel;
            _context2.t1 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">");
            _context2.next = 19;
            return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[0], 0, // skillTreeIndex
            false, // selected skill
            false, // Skill Info Json
            false // add skill failReason String
            );

          case 19:
            _context2.t2 = _context2.sent;
            _context2.t3 = [_context2.t2];
            _context2.t4 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skilltree',
                options: skillTreeMap
              })]
            });
            _context2.t5 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skill',
                options: skillMap
              })]
            });
            _context2.t6 = _discord.MessageActionRow;
            _context2.next = 26;
            return (0, _buttons.generateCancelSkillButton)();

          case 26:
            _context2.t7 = _context2.sent;
            _context2.t8 = [_context2.t7];
            _context2.t9 = {
              components: _context2.t8
            };
            _context2.t10 = new _context2.t6(_context2.t9);
            _context2.t11 = [_context2.t4, _context2.t5, _context2.t10];
            _context2.t12 = {
              content: _context2.t1,
              files: _context2.t3,
              components: _context2.t11
            };
            _context2.next = 34;
            return _context2.t0.send.call(_context2.t0, _context2.t12);

          case 34:
            embedMessage = _context2.sent;
            console.log('after init embed message');
            collector = embedMessage.createMessageComponentCollector({});
            skillTreeIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(interaction) {
                var failAddSkillReason, skillToAddId, _yield$addSkillPoint, _yield$addSkillPoint2, jsonSkillInfo, skillTreeMapEdit, skillMapEdit;

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
                        if (!interaction.isButton()) {
                          _context.next = 36;
                          break;
                        }

                        if (!interaction.customId.startsWith('addSkill:')) {
                          _context.next = 24;
                          break;
                        }

                        _context.t0 = interaction;
                        _context.t1 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">");
                        _context.next = 12;
                        return (0, _messages.loadingSkillAddEmbed)(userCurrentCharacter.UserGroup.user.username);

                      case 12:
                        _context.t2 = _context.sent;
                        _context.t3 = [_context.t2];
                        _context.t4 = {
                          content: _context.t1,
                          embeds: _context.t3
                        };
                        _context.next = 17;
                        return _context.t0.editReply.call(_context.t0, _context.t4);

                      case 17:
                        skillToAddId = Number(interaction.customId.replace("addSkill:", ""));
                        _context.next = 20;
                        return (0, _addSkillPoint.addSkillPoint)(userCurrentCharacter, skillToAddId, io, queue);

                      case 20:
                        _yield$addSkillPoint = _context.sent;
                        _yield$addSkillPoint2 = (0, _slicedToArray2["default"])(_yield$addSkillPoint, 2);
                        userCurrentCharacter = _yield$addSkillPoint2[0];
                        failAddSkillReason = _yield$addSkillPoint2[1];

                      case 24:
                        if (!(interaction.customId === 'cancelSkillPick')) {
                          _context.next = 36;
                          break;
                        }

                        _context.t5 = interaction;
                        _context.t6 = [];
                        _context.next = 29;
                        return (0, _cancelSkillPick.renderCancelSkillPick)(userCurrentCharacter);

                      case 29:
                        _context.t7 = _context.sent;
                        _context.t8 = [_context.t7];
                        _context.t9 = [];
                        _context.t10 = {
                          embeds: _context.t6,
                          files: _context.t8,
                          components: _context.t9
                        };
                        _context.next = 35;
                        return _context.t5.editReply.call(_context.t5, _context.t10);

                      case 35:
                        return _context.abrupt("return");

                      case 36:
                        if (!interaction.isSelectMenu()) {
                          _context.next = 47;
                          break;
                        }

                        _context.t11 = interaction;
                        _context.next = 40;
                        return (0, _messages.loadingSkillSelectEmbed)(userCurrentCharacter.UserGroup.user.username);

                      case 40:
                        _context.t12 = _context.sent;
                        _context.t13 = [_context.t12];
                        _context.t14 = {
                          embeds: _context.t13
                        };
                        _context.next = 45;
                        return _context.t11.editReply.call(_context.t11, _context.t14);

                      case 45:
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

                      case 47:
                        console.log(_skillInfo["default"]);
                        console.log('skills');
                        jsonSkillInfo = _skillInfo["default"].find(function (x) {
                          return x.name === selectedSkill.name;
                        });
                        skillTreeMapEdit = userCurrentCharacter["class"].skillTrees.map(function (skilltree, index) {
                          return {
                            label: skilltree.name,
                            value: "skilltree-".concat(index),
                            "default": index === skillTreeIndex
                          };
                        });
                        skillMapEdit = userCurrentCharacter["class"].skillTrees[skillTreeIndex].skills.map(function (mySkill, index) {
                          var emoji = _skillEmoji["default"].find(function (a) {
                            return a.name === mySkill.name;
                          });

                          return _objectSpread({
                            placeholder: 'pick a skill',
                            label: "".concat((mySkill.column + 9).toString(36).toUpperCase()).concat(mySkill.row, ": ").concat(mySkill.name),
                            value: "skill-".concat(index),
                            "default": index === skillIndex
                          }, emoji ? {
                            emoji: emoji.emoji
                          } : false);
                        });
                        _context.t15 = interaction;
                        _context.t16 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">");
                        _context.t17 = (0, _toConsumableArray2["default"])(jsonSkillInfo ? [(0, _messages.skillInfoMessage)(jsonSkillInfo && jsonSkillInfo.name, jsonSkillInfo && jsonSkillInfo.description)] : []);
                        _context.next = 57;
                        return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[skillTreeIndex], skillTreeIndex, selectedSkill, jsonSkillInfo, failAddSkillReason);

                      case 57:
                        _context.t18 = _context.sent;
                        _context.t19 = [_context.t18];
                        _context.t20 = [];
                        _context.t21 = _toConsumableArray2["default"];

                        if (!selectedSkill) {
                          _context.next = 72;
                          break;
                        }

                        _context.t23 = _discord.MessageActionRow;
                        _context.next = 65;
                        return (0, _buttons.generateAddSkillButton)(selectedSkill);

                      case 65:
                        _context.t24 = _context.sent;
                        _context.t25 = [_context.t24];
                        _context.t26 = {
                          components: _context.t25
                        };
                        _context.t27 = new _context.t23(_context.t26);
                        _context.t22 = [_context.t27];
                        _context.next = 73;
                        break;

                      case 72:
                        _context.t22 = [];

                      case 73:
                        _context.t28 = _context.t22;
                        _context.t29 = (0, _context.t21)(_context.t28);
                        _context.t30 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skilltree',
                            options: skillTreeMapEdit
                          })]
                        });
                        _context.t31 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skill',
                            options: skillMapEdit
                          })]
                        });
                        _context.t32 = _discord.MessageActionRow;
                        _context.next = 80;
                        return (0, _buttons.generateCancelSkillButton)();

                      case 80:
                        _context.t33 = _context.sent;
                        _context.t34 = [_context.t33];
                        _context.t35 = {
                          components: _context.t34
                        };
                        _context.t36 = new _context.t32(_context.t35);
                        _context.t37 = [_context.t30, _context.t31, _context.t36];
                        _context.t38 = _context.t20.concat.call(_context.t20, _context.t29, _context.t37);
                        _context.t39 = {
                          content: _context.t16,
                          embeds: _context.t17,
                          files: _context.t19,
                          components: _context.t38
                        };
                        _context.next = 89;
                        return _context.t15.editReply.call(_context.t15, _context.t39);

                      case 89:
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