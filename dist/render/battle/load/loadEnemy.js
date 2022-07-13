"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadEnemy = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var loadEnemy = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(enemyType) {
    var enemyFrame, promises;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            enemyFrame = [];
            promises = [];
            promises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../../assets/images/battle/monsters/".concat(enemyType, "/"), "".concat(enemyType, ".png"))).then(function (image) {
                enemyFrame[0] = image;
                resolve();
              });
            }));
            promises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../../assets/images/battle/monsters/".concat(enemyType, "/"), "".concat(enemyType, "-1.png"))).then(function (image) {
                enemyFrame[1] = image;
                resolve();
              });
            }));
            promises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../../assets/images/battle/monsters/".concat(enemyType, "/"), "".concat(enemyType, "-2.png"))).then(function (image) {
                enemyFrame[2] = image;
                resolve();
              });
            })); // console.log('before promise wait');

            _context.next = 7;
            return Promise.all(promises);

          case 7:
            return _context.abrupt("return", enemyFrame);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadEnemy(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadEnemy = loadEnemy;