"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateModifierStringArray = void 0;

var generateModifierStringArray = function generateModifierStringArray(newItem) {
  console.log(newItem);
  var modifierStringArray = [];
  Object.keys(newItem).forEach(function (key) {
    if ((key === 'strength' || key === 'dexterity' || key === 'vitality' || key === 'energy') && newItem[key] !== null) {
      modifierStringArray.push("+".concat(newItem[key], " to ").concat(key));
    }
  });
  return modifierStringArray;
};

exports.generateModifierStringArray = generateModifierStringArray;