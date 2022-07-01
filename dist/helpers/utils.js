"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomIntFromInterval = exports.capitalize = void 0;

var capitalize = function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};

exports.capitalize = capitalize;

var randomIntFromInterval = function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.randomIntFromInterval = randomIntFromInterval;