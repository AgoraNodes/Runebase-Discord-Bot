"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSkillTreeImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _grayScaleIcon = require("./grayScaleIcon");

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }

  var words = text.split(' ');
  var currentLine = 0;
  var idx = 1;

  while (words.length > 0 && idx <= words.length) {
    var str = words.slice(0, idx).join(' ');
    var w = context.measureText(str).width;

    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }

      context.fillText(words.slice(0, idx - 1).join(' '), x, y + lineHeight * currentLine);
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else {
      idx++;
    }
  }

  if (idx > 0) {
    context.fillText(words.join(' '), x, y + lineHeight * currentLine);
  }
}

var renderSkillTreeImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCharacter, skillTree, skillTreeIndex, selectedSkill) {
    var userCurrentRank, skillTreeMenuImage, skillTreeImage, canvas, ctx, _loop, i, _loop2, _i, totalSkillsPointsSpend, skillPointsLeftToSpend, finalImage;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userCurrentRank = userCharacter.user.ranks[0] ? userCharacter.user.ranks[0] : {
              id: 0
            };
            _context2.next = 3;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skilltree/", "skillTreeMenu.png"));

          case 3:
            skillTreeMenuImage = _context2.sent;
            _context2.next = 6;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skilltree/", "skilltree".concat(skillTreeIndex, ".png")));

          case 6:
            skillTreeImage = _context2.sent;
            canvas = (0, _canvas.createCanvas)(skillTreeImage.width + 25, skillTreeImage.height + 25);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 25px "HeartWarming"';
            ctx.fillStyle = "#ccc"; // ctx.textAlign = "center";

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.drawImage(skillTreeMenuImage, skillTreeImage.width - skillTreeMenuImage.width + 25, skillTreeImage.height - skillTreeMenuImage.height + 25, skillTreeMenuImage.width, skillTreeMenuImage.height);
            ctx.drawImage(skillTreeImage, 0 + 25, 0 + 25, skillTreeImage.width, skillTreeImage.height); // Rows

            ctx.strokeText('1', 5, 70, 25);
            ctx.fillText('1', 5, 70, 25);
            ctx.strokeText('2', 5, 140, 25);
            ctx.fillText('2', 5, 140, 25);
            ctx.strokeText('3', 5, 210, 25);
            ctx.fillText('3', 5, 210, 25);
            ctx.strokeText('4', 5, 280, 25);
            ctx.fillText('4', 5, 280, 25);
            ctx.strokeText('5', 5, 350, 25);
            ctx.fillText('5', 5, 350, 25);
            ctx.strokeText('6', 5, 420, 25);
            ctx.fillText('6', 5, 420, 25); // columns

            ctx.strokeText('A', 55, 20, 25);
            ctx.fillText('A', 55, 20, 25);
            ctx.strokeText('B', 125, 20, 25);
            ctx.fillText('B', 125, 20, 25);
            ctx.strokeText('C', 195, 20, 25);
            ctx.fillText('C', 195, 20, 25); // Skill Tree Names

            ctx.font = 'bold 15px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            printAtWordWrap(ctx, userCharacter["class"].skillTrees[0].name, 295, 175, 15, skillTreeMenuImage.width - 10);
            printAtWordWrap(ctx, userCharacter["class"].skillTrees[1].name, 295, 280, 15, skillTreeMenuImage.width - 10);
            printAtWordWrap(ctx, userCharacter["class"].skillTrees[2].name, 295, 385, 15, skillTreeMenuImage.width - 10);
            ctx.shadowBlur = 30;
            ctx.shadowColor = "blue";
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(selectedSkill.column === 1 ? 15 + 25 : 15 + 25 + selectedSkill.column * 48 + (48 / 2 - 4) * (selectedSkill.column - 1) - 48, selectedSkill.row === 1 ? 15 + 24 : 15 + 24 + selectedSkill.row * 48 + (48 / 2 - 4) * (selectedSkill.row - 1) - 48, 50, 50);
            ctx.stroke(); // Draw Connection

            _loop = function _loop(i) {
              var _loop3 = function _loop3(y) {
                if (skillTree.skills[i].PreviousSkill[y]) {
                  var userHasPreviousSkill = userCharacter.UserClassSkills.find(function (o) {
                    return o.skillId === skillTree.skills[i].PreviousSkill[y].id;
                  });
                  var userHasCurrentSkill = userCharacter.UserClassSkills.find(function (o) {
                    return o.skillId === skillTree.skills[i].id;
                  });

                  if (userHasPreviousSkill && userHasCurrentSkill) {
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = "#FFD700";
                    ctx.beginPath();
                    ctx.lineWidth = "3";
                    ctx.strokeStyle = "#FFD700";
                  } else {
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = "none";
                    ctx.beginPath();
                    ctx.lineWidth = "3";
                    ctx.strokeStyle = "#151515";
                  }

                  if (skillTree.skills[i].row - skillTree.skills[i].PreviousSkill[y].row === 1 || skillTree.skills[i].column === skillTree.skills[i].PreviousSkill[y].column || skillTree.skills[i].row === skillTree.skills[i].PreviousSkill[y].row && skillTree.skills[i].column - skillTree.skills[i].PreviousSkill[y].column === -1) {
                    ctx.moveTo(skillTree.skills[i].column === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 + skillTree.skills[i].column * 48 + (48 / 2 - 4) * (skillTree.skills[i].column - 1) - 48, skillTree.skills[i].row === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 - 6 + skillTree.skills[i].row * 48 + (48 / 2 - 4) * (skillTree.skills[i].row - 1) - 48);
                  } else {
                    ctx.moveTo(skillTree.skills[i].column === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 + skillTree.skills[i].column * 48 + (48 / 2 - 4) * (skillTree.skills[i].column - 1) - 48, skillTree.skills[i].row === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 - 6 + (skillTree.skills[i].row - 1) * 48 + (48 / 2 - 4) * (skillTree.skills[i].row - 1) - 48);
                  }

                  ctx.lineTo(skillTree.skills[i].PreviousSkill[y].column === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 + skillTree.skills[i].PreviousSkill[y].column * 48 + (48 / 2 - 4) * (skillTree.skills[i].PreviousSkill[y].column - 1) - 48, skillTree.skills[i].PreviousSkill[y].row === 1 ? 15 + 27 + 48 / 2 : 15 + 27 + 48 / 2 + skillTree.skills[i].PreviousSkill[y].row * 48 + (48 / 2 - 4) * (skillTree.skills[i].PreviousSkill[y].row - 1) - 48);
                  ctx.stroke();
                }
              };

              for (var y = 0; y < skillTree.skills[i].PreviousSkill.length; y++) {
                _loop3(y);
              }
            };

            for (i = 0; i < skillTree.skills.length; i++) {
              _loop(i);
            }

            ctx.shadowBlur = 0;
            ctx.shadowColor = "none";
            ctx.lineWidth = "3";
            ctx.strokeStyle = "black";
            _loop2 = /*#__PURE__*/_regenerator["default"].mark(function _loop2(_i) {
              var skillIcon, skillImage, userHasSkill, userHasPreviousSkills, userHasSkillOne, _userHasSkillOne, userHasSkillTwo, grayScaleIconBuffer;

              return _regenerator["default"].wrap(function _loop2$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCharacter.user.currentClass.name, "/").concat(skillTree.name), "".concat(skillTree.skills[_i].name, ".png")));

                    case 2:
                      skillIcon = _context.sent;
                      skillImage = void 0;
                      userHasSkill = userCharacter.UserClassSkills.find(function (o) {
                        return o.skillId === skillTree.skills[_i].id;
                      });
                      userHasPreviousSkills = true; // check if user has the previous skills

                      if (skillTree.skills[_i].PreviousSkill.length === 1) {
                        userHasSkillOne = userCharacter.UserClassSkills.find(function (o) {
                          return o.skillId === skillTree.skills[_i].PreviousSkill[0].id;
                        });

                        if (!userHasSkillOne) {
                          userHasPreviousSkills = false;
                        }
                      }

                      if (skillTree.skills[_i].PreviousSkill.length === 2) {
                        _userHasSkillOne = userCharacter.UserClassSkills.find(function (o) {
                          return o.skillId === skillTree.skills[_i].PreviousSkill[0].id;
                        });
                        userHasSkillTwo = userCharacter.UserClassSkills.find(function (o) {
                          return o.skillId === skillTree.skills[_i].PreviousSkill[1].id;
                        });

                        if (!_userHasSkillOne || !userHasSkillTwo) {
                          userHasPreviousSkills = false;
                        }
                      } // check if we need gray scaled icon


                      if (!(skillTree.skills[_i].level > userCurrentRank.id || !userHasPreviousSkills)) {
                        _context.next = 17;
                        break;
                      }

                      _context.next = 11;
                      return (0, _grayScaleIcon.renderGrayScaleIcon)(skillIcon);

                    case 11:
                      grayScaleIconBuffer = _context.sent;
                      _context.next = 14;
                      return (0, _canvas.loadImage)(grayScaleIconBuffer);

                    case 14:
                      skillImage = _context.sent;
                      _context.next = 18;
                      break;

                    case 17:
                      skillImage = skillIcon;

                    case 18:
                      // Skill Amount Boxes
                      ctx.beginPath();
                      ctx.lineWidth = "3";
                      ctx.strokeStyle = "black";
                      ctx.rect(skillTree.skills[_i].column === 1 ? 15 + 25 + skillImage.width - 5 : 15 + 25 + skillImage.width - 5 + skillTree.skills[_i].column * skillImage.width + (skillImage.width / 2 - 4) * (skillTree.skills[_i].column - 1) - skillImage.width, skillTree.skills[_i].row === 1 ? 15 + 25 + skillImage.height - 6 : 15 + 25 + skillImage.height - 6 + skillTree.skills[_i].row * skillImage.height + (skillImage.height / 2 - 4) * (skillTree.skills[_i].row - 1) - skillImage.height, 20, 20);
                      ctx.stroke(); // Skill Image

                      ctx.drawImage(skillImage, skillTree.skills[_i].column === 1 ? 15 + 25 : 15 + 25 + skillTree.skills[_i].column * skillImage.width + (skillImage.width / 2 - 4) * (skillTree.skills[_i].column - 1) - skillImage.width, skillTree.skills[_i].row === 1 ? 15 + 25 : 15 + 25 + skillTree.skills[_i].row * skillImage.height + (skillImage.height / 2 - 4) * (skillTree.skills[_i].row - 1) - skillImage.height, skillImage.width, skillImage.height);

                      if (userHasSkill) {
                        ctx.font = 'bold 12px "HeartWarming"';
                        ctx.strokeText(userHasSkill.points, skillTree.skills[_i].column === 1 ? 15 + 28 + skillImage.width : 15 + 28 + skillImage.width + skillTree.skills[_i].column * skillImage.width + (skillImage.width / 2 - 4) * (skillTree.skills[_i].column - 1) - skillImage.width, skillTree.skills[_i].row === 1 ? 15 + 33 + skillImage.height : 15 + 33 + skillImage.height + skillTree.skills[_i].row * skillImage.height + (skillImage.height / 2 - 4) * (skillTree.skills[_i].row - 1) - skillImage.height, 50);
                        ctx.fillText(userHasSkill.points, skillTree.skills[_i].column === 1 ? 15 + 28 + skillImage.width : 15 + 28 + skillImage.width + skillTree.skills[_i].column * skillImage.width + (skillImage.width / 2 - 4) * (skillTree.skills[_i].column - 1) - skillImage.width, skillTree.skills[_i].row === 1 ? 15 + 33 + skillImage.height : 15 + 33 + skillImage.height + skillTree.skills[_i].row * skillImage.height + (skillImage.height / 2 - 4) * (skillTree.skills[_i].row - 1) - skillImage.height, 50);
                      }

                    case 25:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop2);
            });
            _i = 0;

          case 56:
            if (!(_i < skillTree.skills.length)) {
              _context2.next = 61;
              break;
            }

            return _context2.delegateYield(_loop2(_i), "t0", 58);

          case 58:
            _i++;
            _context2.next = 56;
            break;

          case 61:
            totalSkillsPointsSpend = _lodash["default"].sumBy(userCharacter.UserClassSkills, 'points');
            skillPointsLeftToSpend = userCurrentRank.id - totalSkillsPointsSpend;

            if (skillPointsLeftToSpend > 0) {
              ctx.font = 'bold 18px "HeartWarming"';
              ctx.shadowBlur = 30;
              ctx.shadowColor = "red";
              ctx.beginPath();
              ctx.lineWidth = "3";
              ctx.strokeStyle = "red";
              ctx.strokeText(skillPointsLeftToSpend, 300, 105, 50);
              ctx.fillText(skillPointsLeftToSpend, 300, 105, 50);
              ctx.shadowBlur = 0;
              ctx.font = 'bold 15px "HeartWarming"';
              ctx.strokeText('Remaining', 300, 50, 70);
              ctx.fillText('Remaining', 300, 50, 70);
              ctx.strokeText('Skillpoints', 300, 70, 70);
              ctx.fillText('Skillpoints', 300, 70, 70);
            }

            _context2.next = 66;
            return canvas.toBuffer();

          case 66:
            finalImage = _context2.sent;
            return _context2.abrupt("return", finalImage);

          case 68:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));

  return function renderSkillTreeImage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderSkillTreeImage = renderSkillTreeImage;