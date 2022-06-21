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

var _skillTree = require("../render/skillTree");

var _skillDescription = require("../render/skillDescription");

/* eslint-disable import/prefer-default-export */
var discordSkills = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(discordClient, message, setting, io, queue) {
    var userId, discordChannel, userCurrentCharacter, cancelSkillPickId, generateSkillTreeImage, generatecancelSkillPickPicked, generateCancelSkill, generateAddSkillButton, skillTreeMap, skillMap, embedMessage, collector, skillTreeIndex, skillIndex, selectedSkill;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _fetchDiscordUserIdFromMessageOrInteraction.fetchDiscordUserIdFromMessageOrInteraction)(message);

          case 2:
            userId = _context6.sent;
            _context6.next = 5;
            return (0, _fetchDiscordChannel.fetchDiscordChannel)(discordClient, message);

          case 5:
            discordChannel = _context6.sent;
            _context6.next = 8;
            return (0, _character.fetchUserCurrentCharacter)(userId, // user discord id
            false // Need inventory?
            );

          case 8:
            userCurrentCharacter = _context6.sent;

            if (userCurrentCharacter) {
              _context6.next = 13;
              break;
            }

            _context6.next = 12;
            return message.reply({
              content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
              ephemeral: true
            });

          case 12:
            return _context6.abrupt("return");

          case 13:
            cancelSkillPickId = 'cancelSkillPick';
            _context6.next = 16;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 16:
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
                        console.log(skillTreeImage.width);
                        console.log(skillTreeImage.height);
                        console.log('---------------------');
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

                      case 22:
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

            generatecancelSkillPickPicked = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(start) {
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
                        return _context2.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function generatecancelSkillPickPicked(_x11) {
                return _ref3.apply(this, arguments);
              };
            }();

            generateCancelSkill = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Cancel skill selection",
                          emoji: '❌',
                          customId: cancelSkillPickId
                        }));

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function generateCancelSkill() {
                return _ref4.apply(this, arguments);
              };
            }();

            generateAddSkillButton = /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(mySelectedSkill) {
                var addSkillId;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        addSkillId = "addSkill:".concat(mySelectedSkill.id);
                        return _context4.abrupt("return", new _discord.MessageButton({
                          style: 'SECONDARY',
                          label: "Add Skillpoint to ".concat(mySelectedSkill.name),
                          emoji: '➕',
                          customId: addSkillId
                        }));

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function generateAddSkillButton(_x12) {
                return _ref5.apply(this, arguments);
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
            _context6.t0 = discordChannel;
            _context6.next = 25;
            return generateSkillTreeImage(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[0], 0, // skillTreeIndex
            false, // selected skill
            false // add skill failReason String
            );

          case 25:
            _context6.t1 = _context6.sent;
            _context6.t2 = [_context6.t1];
            _context6.t3 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skilltree',
                options: skillTreeMap
              })]
            });
            _context6.t4 = new _discord.MessageActionRow({
              components: [new _discord.MessageSelectMenu({
                type: 'SELECT_MENU',
                customId: 'select-skill',
                options: skillMap
              })]
            });
            _context6.t5 = _discord.MessageActionRow;
            _context6.next = 32;
            return generateCancelSkill();

          case 32:
            _context6.t6 = _context6.sent;
            _context6.t7 = [_context6.t6];
            _context6.t8 = {
              components: _context6.t7
            };
            _context6.t9 = new _context6.t5(_context6.t8);
            _context6.t10 = [_context6.t3, _context6.t4, _context6.t9];
            _context6.t11 = {
              files: _context6.t2,
              components: _context6.t10
            };
            _context6.next = 40;
            return _context6.t0.send.call(_context6.t0, _context6.t11);

          case 40:
            embedMessage = _context6.sent;
            collector = embedMessage.createMessageComponentCollector({
              filter: function filter(_ref6) {
                var discordUser = _ref6.user;
                return discordUser.id === userCurrentCharacter.user.user_id;
              }
            });
            skillTreeIndex = 0;
            collector.on('collect', /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(interaction) {
                var failAddSkillReason, skillToAddId, _yield$addSkillPoint, _yield$addSkillPoint2, skillTreeMapEdit, skillMapEdit;

                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!interaction.isButton()) {
                          _context5.next = 22;
                          break;
                        }

                        _context5.next = 3;
                        return interaction.deferUpdate();

                      case 3:
                        if (!interaction.customId.startsWith('addSkill:')) {
                          _context5.next = 11;
                          break;
                        }

                        skillToAddId = Number(interaction.customId.replace("addSkill:", ""));
                        _context5.next = 7;
                        return (0, _addSkillPoint.addSkillPoint)(userCurrentCharacter, skillToAddId, io, queue);

                      case 7:
                        _yield$addSkillPoint = _context5.sent;
                        _yield$addSkillPoint2 = (0, _slicedToArray2["default"])(_yield$addSkillPoint, 2);
                        userCurrentCharacter = _yield$addSkillPoint2[0];
                        failAddSkillReason = _yield$addSkillPoint2[1];

                      case 11:
                        if (!(interaction.customId === cancelSkillPickId)) {
                          _context5.next = 22;
                          break;
                        }

                        _context5.t0 = interaction;
                        _context5.next = 15;
                        return generatecancelSkillPickPicked();

                      case 15:
                        _context5.t1 = _context5.sent;
                        _context5.t2 = [_context5.t1];
                        _context5.t3 = [];
                        _context5.t4 = {
                          files: _context5.t2,
                          components: _context5.t3
                        };
                        _context5.next = 21;
                        return _context5.t0.update.call(_context5.t0, _context5.t4);

                      case 21:
                        return _context5.abrupt("return");

                      case 22:
                        if (!interaction.isSelectMenu()) {
                          _context5.next = 31;
                          break;
                        }

                        if (!(interaction.customId === 'select-skilltree')) {
                          _context5.next = 27;
                          break;
                        }

                        _context5.next = 26;
                        return interaction.deferUpdate();

                      case 26:
                        if (interaction.values[0].startsWith('skilltree-')) {
                          skillTreeIndex = Number(interaction.values[0].replace('skilltree-', ''));
                          selectedSkill = false;
                          skillIndex = false;
                        }

                      case 27:
                        if (!(interaction.customId === 'select-skill')) {
                          _context5.next = 31;
                          break;
                        }

                        _context5.next = 30;
                        return interaction.deferUpdate();

                      case 30:
                        if (interaction.values[0].startsWith('skill-')) {
                          skillIndex = Number(interaction.values[0].replace('skill-', ''));
                          selectedSkill = userCurrentCharacter["class"].skillTrees[Number(skillTreeIndex)].skills[Number(skillIndex)];
                        }

                      case 31:
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
                        _context5.t5 = interaction;
                        _context5.next = 36;
                        return generateSkillTreeImage(userCurrentCharacter, userCurrentCharacter["class"].skillTrees[skillTreeIndex], skillTreeIndex, selectedSkill, failAddSkillReason);

                      case 36:
                        _context5.t6 = _context5.sent;
                        _context5.t7 = [_context5.t6];
                        _context5.t8 = [];
                        _context5.t9 = _toConsumableArray2["default"];

                        if (!selectedSkill) {
                          _context5.next = 51;
                          break;
                        }

                        _context5.t11 = _discord.MessageActionRow;
                        _context5.next = 44;
                        return generateAddSkillButton(selectedSkill);

                      case 44:
                        _context5.t12 = _context5.sent;
                        _context5.t13 = [_context5.t12];
                        _context5.t14 = {
                          components: _context5.t13
                        };
                        _context5.t15 = new _context5.t11(_context5.t14);
                        _context5.t10 = [_context5.t15];
                        _context5.next = 52;
                        break;

                      case 51:
                        _context5.t10 = [];

                      case 52:
                        _context5.t16 = _context5.t10;
                        _context5.t17 = (0, _context5.t9)(_context5.t16);
                        _context5.t18 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skilltree',
                            options: skillTreeMapEdit
                          })]
                        });
                        _context5.t19 = new _discord.MessageActionRow({
                          components: [new _discord.MessageSelectMenu({
                            type: 'SELECT_MENU',
                            customId: 'select-skill',
                            options: skillMapEdit
                          })]
                        });
                        _context5.t20 = _discord.MessageActionRow;
                        _context5.next = 59;
                        return generateCancelSkill();

                      case 59:
                        _context5.t21 = _context5.sent;
                        _context5.t22 = [_context5.t21];
                        _context5.t23 = {
                          components: _context5.t22
                        };
                        _context5.t24 = new _context5.t20(_context5.t23);
                        _context5.t25 = [_context5.t18, _context5.t19, _context5.t24];
                        _context5.t26 = _context5.t8.concat.call(_context5.t8, _context5.t17, _context5.t25);
                        _context5.t27 = {
                          files: _context5.t7,
                          components: _context5.t26
                        };
                        _context5.next = 68;
                        return _context5.t5.editReply.call(_context5.t5, _context5.t27);

                      case 68:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x13) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 44:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function discordSkills(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.discordSkills = discordSkills;