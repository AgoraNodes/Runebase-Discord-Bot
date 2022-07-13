"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var calculateUserRetaliation = function calculateUserRetaliation(userCurrentCharacter, monsterId) {
  var retaliate = [];

  if (userCurrentCharacter["class"].name === 'Barbarian') {
    var barbRetaliation = userCurrentCharacter.UserClassSkills.find(function (x) {
      return x.skill.name === 'Retaliate';
    });

    if (barbRetaliation) {
      var barbRetaliationChance = 5 + (barbRetaliation.points - 1) * 2; // const barbRetaliationChance = 100;

      var didWeRetaliate = Math.random() < Number(barbRetaliationChance) / 100;

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