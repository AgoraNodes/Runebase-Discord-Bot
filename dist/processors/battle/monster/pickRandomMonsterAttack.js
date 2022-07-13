"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var pickRandomMonsterAttack = function pickRandomMonsterAttack(remainingMonster) {
  // console.log(remainingMonster.monster.monsterAttacks);
  var pickedMonsterAttack = remainingMonster.monster.monsterAttacks.find(function (x) {
    return x.defaultAttack === true;
  });
  var nonDefaultMonsterAttacks = remainingMonster.monster.monsterAttacks.filter(function (filterAttack) {
    return filterAttack.defaultAttack === false;
  }); // console.log(nonDefaultMonsterAttacks);
  // Pick a non-default monster attack based on % chance

  var roll = Math.random();

  for (var i = 0, len = nonDefaultMonsterAttacks.length; i < len; i += 1) {
    var chance = nonDefaultMonsterAttacks[parseInt(i, 10)].chance; // log(chance);

    if (roll < chance / 100) {
      pickedMonsterAttack = nonDefaultMonsterAttacks[parseInt(i, 10)];
      break;
    }

    roll -= chance;
  }

  return [pickedMonsterAttack];
};

var _default = pickRandomMonsterAttack;
exports["default"] = _default;