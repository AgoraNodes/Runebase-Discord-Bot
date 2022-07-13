"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var selectAttack = function selectAttack(userState, attackUsed, attackOne, attackTwo, regularAttack) {
  var useAttack;

  if (attackUsed === 'main') {
    if (userState.condition.mana >= attackOne.cost) {
      useAttack = attackOne;
    } else {
      useAttack = regularAttack;
    }
  }

  if (attackUsed === 'secondary') {
    if (userState.condition.mana >= attackTwo.cost) {
      useAttack = attackTwo;
    } else {
      useAttack = regularAttack;
    }
  }

  return useAttack;
};

var _default = selectAttack;
exports["default"] = _default;