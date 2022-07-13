"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manaSteal = exports.lifeSteal = void 0;

var lifeSteal = function lifeSteal(myDamage, _lifeSteal) {
  return _lifeSteal > 0 ? Math.round(myDamage / 100 * _lifeSteal) : null;
};

exports.lifeSteal = lifeSteal;

var manaSteal = function manaSteal(myDamage, _manaSteal) {
  return _manaSteal > 0 ? Math.round(myDamage / 100 * _manaSteal) : null;
};

exports.manaSteal = manaSteal;