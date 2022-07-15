"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var canStillWearItem = function canStillWearItem(item, strength, dexterity) {
  var canStillWear = true;
  var _item$itemBase = item.itemBase,
      strengthReq = _item$itemBase.strengthReq,
      dexterityReq = _item$itemBase.dexterityReq;

  if (strengthReq && strengthReq > strength) {
    canStillWear = false;
  }

  if (dexterityReq && dexterityReq > dexterity) {
    canStillWear = false;
  }

  return canStillWear;
};

var _default = canStillWearItem;
exports["default"] = _default;