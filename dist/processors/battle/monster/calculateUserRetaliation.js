"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var calculateUserRetaliation = function calculateUserRetaliation(userCurrentCharacter, monsterId) {
  var retaliate = [];

  if (userCurrentCharacter["class"].name === 'Warrior') {
    var warriorRetaliation = userCurrentCharacter.UserClassSkills.find(function (x) {
      return x.skill.name === 'Retaliate';
    });

    if (warriorRetaliation) {
      var warriorRetaliationChance = 5 + (warriorRetaliation.points - 1) * 2; // const warriorRetaliationChance = 100;

      var didWeRetaliate = Math.random() < Number(warriorRetaliationChance) / 100;

      if (didWeRetaliate) {
        retaliate.push({
          monsterId: monsterId,
          attack: 'Kick'
        });
      }
    }
  }

  return retaliate;
};

var _default = calculateUserRetaliation;
exports["default"] = _default;