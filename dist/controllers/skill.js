"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordSkills = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

var _skillInfo = _interopRequireDefault(require("../render/skills/skillInfo"));

var _embeds = require("../embeds");

var _skillEmoji = _interopRequireDefault(require("../config/skillEmoji"));

var _messages = require("../messages");

var _testPlayerReadyness = _interopRequireDefault(require("../helpers/testPlayerReadyness"));

var _isUserInRealm = _interopRequireDefault(require("../helpers/realm/isUserInRealm"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var discordSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(discordClient, message, setting, io, queue, isDefered) {
    var failed, usedDeferReply, userId, discordChannel, userCurrentCharacter, _yield$testPlayerRead, _yield$testPlayerRead2, _yield$isUserInRealm, _yield$isUserInRealm2, skillTreeMap, skillMap, embedMessage, collector, skillTreeIndex, skillIndex, selectedSkill;

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
            _context2.next = 11;
            return (0, _testPlayerReadyness["default"])(userCurrentCharacter, message, isDefered);

          case 11:
            _yield$testPlayerRead = _context2.sent;
            _yield$testPlayerRead2 = (0, _slicedToArray2["default"])(_yield$testPlayerRead, 2);
            failed = _yield$testPlayerRead2[0];
            usedDeferReply = _yield$testPlayerRead2[1];

            if (!failed) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", usedDeferReply);

          case 17:
            _context2.next = 19;
            return (0, _isUserInRealm["default"])(userCurrentCharacter, discordClient, message, isDefered);

          case 19:
            _yield$isUserInRealm = _context2.sent;
            _yield$isUserInRealm2 = (0, _slicedToArray2["default"])(_yield$isUserInRealm, 2);
            failed = _yield$isUserInRealm2[0];
            usedDeferReply = _yield$isUserInRealm2[1];

            if (!failed) {
              _context2.next = 25;
              break;
            }

            return _context2.abrupt("return", usedDeferReply);

          case 25:
            skillTreeMap = userCurrentCharacter["class"].skillTrees.map(function (skilltree, index) {
              console.log(index);
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
            _context2.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
            _context2.next = 31;
            return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[0], 0, // skillTreeIndex
            false, // selected skill
            false, // Skill Info Json
            false // add skill failReason String
            );

          case 31:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              attachment: _context2.t2,
              name: 'skillScreen.png'
            };
            _context2.t4 = [_context2.t3];
            _context2.t5 = new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-skilltree',
                options: skillTreeMap
              })]
            });
            _context2.t6 = new _discord.ActionRowBuilder({
              components: [new _discord.SelectMenuBuilder({
                customId: 'select-skill',
                options: skillMap
              })]
            });
            _context2.t7 = _discord.ActionRowBuilder;
            _context2.next = 39;
            return (0, _buttons.generateCancelSkillButton)();

          case 39:
            _context2.t8 = _context2.sent;
            _context2.t9 = [_context2.t8];
            _context2.t10 = {
              components: _context2.t9
            };
            _context2.t11 = new _context2.t7(_context2.t10);
            _context2.t12 = [_context2.t5, _context2.t6, _context2.t11];
            _context2.t13 = {
              content: _context2.t1,
              files: _context2.t4,
              components: _context2.t12
            };
            _context2.next = 47;
            return _context2.t0.send.call(_context2.t0, _context2.t13);

          case 47:
            embedMessage = _context2.sent;
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
                          _context.next = 38;
                          break;
                        }

                        if (!interaction.customId.startsWith('addSkill:')) {
                          _context.next = 24;
                          break;
                        }

                        _context.t0 = interaction;
                        _context.t1 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.next = 12;
                        return (0, _embeds.loadingSkillAddEmbed)(userCurrentCharacter.UserGroup.user.username);

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
                          _context.next = 38;
                          break;
                        }

                        _context.t5 = interaction;
                        _context.t6 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.t7 = [];
                        _context.next = 30;
                        return (0, _cancelSkillPick.renderCancelSkillPick)(userCurrentCharacter);

                      case 30:
                        _context.t8 = _context.sent;
                        _context.t9 = {
                          attachment: _context.t8,
                          name: 'cancelSkillScreen.png'
                        };
                        _context.t10 = [_context.t9];
                        _context.t11 = [];
                        _context.t12 = {
                          content: _context.t6,
                          embeds: _context.t7,
                          files: _context.t10,
                          components: _context.t11
                        };
                        _context.next = 37;
                        return _context.t5.editReply.call(_context.t5, _context.t12);

                      case 37:
                        return _context.abrupt("return");

                      case 38:
                        if (!interaction.isSelectMenu()) {
                          _context.next = 50;
                          break;
                        }

                        _context.t13 = interaction;
                        _context.t14 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.next = 43;
                        return (0, _embeds.loadingSkillSelectEmbed)(userCurrentCharacter.UserGroup.user.username);

                      case 43:
                        _context.t15 = _context.sent;
                        _context.t16 = [_context.t15];
                        _context.t17 = {
                          content: _context.t14,
                          embeds: _context.t16
                        };
                        _context.next = 48;
                        return _context.t13.editReply.call(_context.t13, _context.t17);

                      case 48:
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

                      case 50:
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
                        _context.t18 = interaction;
                        _context.t19 = (0, _messages.playingOnRealmMessage)(userCurrentCharacter);
                        _context.t20 = (0, _toConsumableArray2["default"])(jsonSkillInfo ? [(0, _embeds.skillInfoMessage)(jsonSkillInfo && jsonSkillInfo.name, jsonSkillInfo && jsonSkillInfo.description)] : []);
                        _context.next = 60;
                        return (0, _skills.renderSkillScreen)(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[skillTreeIndex], skillTreeIndex, selectedSkill, jsonSkillInfo, failAddSkillReason);

                      case 60:
                        _context.t21 = _context.sent;
                        _context.t22 = {
                          attachment: _context.t21,
                          name: 'skillScreen.png'
                        };
                        _context.t23 = [_context.t22];
                        _context.t24 = [];
                        _context.t25 = _toConsumableArray2["default"];

                        if (!selectedSkill) {
                          _context.next = 76;
                          break;
                        }

                        _context.t27 = _discord.ActionRowBuilder;
                        _context.next = 69;
                        return (0, _buttons.generateAddSkillButton)(selectedSkill);

                      case 69:
                        _context.t28 = _context.sent;
                        _context.t29 = [_context.t28];
                        _context.t30 = {
                          components: _context.t29
                        };
                        _context.t31 = new _context.t27(_context.t30);
                        _context.t26 = [_context.t31];
                        _context.next = 77;
                        break;

                      case 76:
                        _context.t26 = [];

                      case 77:
                        _context.t32 = _context.t26;
                        _context.t33 = (0, _context.t25)(_context.t32);
                        _context.t34 = new _discord.ActionRowBuilder({
                          components: [new _discord.SelectMenuBuilder({
                            customId: 'select-skilltree',
                            options: skillTreeMapEdit
                          })]
                        });
                        _context.t35 = new _discord.ActionRowBuilder({
                          components: [new _discord.SelectMenuBuilder({
                            customId: 'select-skill',
                            options: skillMapEdit
                          })]
                        });
                        _context.t36 = _discord.ActionRowBuilder;
                        _context.next = 84;
                        return (0, _buttons.generateCancelSkillButton)();

                      case 84:
                        _context.t37 = _context.sent;
                        _context.t38 = [_context.t37];
                        _context.t39 = {
                          components: _context.t38
                        };
                        _context.t40 = new _context.t36(_context.t39);
                        _context.t41 = [_context.t34, _context.t35, _context.t40];
                        _context.t42 = _context.t24.concat.call(_context.t24, _context.t33, _context.t41);
                        _context.t43 = {
                          content: _context.t19,
                          embeds: _context.t20,
                          files: _context.t23,
                          components: _context.t42
                        };
                        _context.next = 93;
                        return _context.t18.editReply.call(_context.t18, _context.t43);

                      case 93:
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

          case 51:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function discordSkills(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordSkills = discordSkills;