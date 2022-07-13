"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var calculateCritDamage = function calculateCritDamage(myDamage, critChance) {
  var damage = myDamage;
  var didWeCrit = Math.random() < Number(critChance) / 100;

  if (didWeCrit) {
    damage = myDamage + Math.round(myDamage / 100 * 75);
  }

  return [didWeCrit, damage];
};

var _default = calculateCritDamage;
exports["default"] = _default;