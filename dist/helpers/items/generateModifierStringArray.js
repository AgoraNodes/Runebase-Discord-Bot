"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateModifierStringArray = void 0;

var generateModifierStringArray = function generateModifierStringArray(newItem) {
  // console.log(newItem);
  // console.log(newItem.itemBase);
  // console.log(newItem.itemBase.itemFamily.itemType);
  var modifierStringArray = [];
  Object.keys(newItem).forEach(function (key) {
    if ((key === 'strength' || key === 'dexterity' || key === 'vitality' || key === 'energy') && newItem[String(key)] !== null) {
      modifierStringArray.push("+".concat(newItem[String(key)], " to ").concat(key));
    }

    if (key === 'eDefense' && newItem[String(key)] !== null) {
      modifierStringArray.push("+".concat(newItem[String(key)], "% Enhanced Defense"));
    }

    if (key === 'eDamage' && newItem[String(key)] !== null) {
      modifierStringArray.push("+".concat(newItem[String(key)], "% Enhanced Damage"));
    }
  });
  modifierStringArray.sort(function (a, b) {
    return b.endsWith('Defense') - a.endsWith('Defense');
  });
  modifierStringArray.sort(function (a, b) {
    return b.endsWith('Damage') - a.endsWith('Damage');
  });
  return modifierStringArray;
};

exports.generateModifierStringArray = generateModifierStringArray;