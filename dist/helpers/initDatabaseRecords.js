"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDatabaseRecords = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var initDatabaseRecords = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient) {
    var createUSDCurrencytRecord, discordBotUser, discordBotSetting, autoWithdrawalSetting, withdrawSetting;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].currency.findOrCreate({
              where: {
                id: 1
              },
              defaults: {
                id: 1,
                currency_name: "USD",
                iso: 'USD',
                type: 'FIAT'
              }
            });

          case 2:
            createUSDCurrencytRecord = _context.sent;
            _context.next = 5;
            return _models["default"].user.findOne({
              where: {
                user_id: "".concat(discordClient.user.id)
              }
            });

          case 5:
            discordBotUser = _context.sent;

            if (discordBotUser) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return _models["default"].user.create({
              username: discordClient.user.username,
              user_id: "".concat(discordClient.user.id)
            });

          case 9:
            _context.next = 11;
            return _models["default"].setting.findOne({
              where: {
                name: 'discord'
              }
            });

          case 11:
            discordBotSetting = _context.sent;

            if (discordBotSetting) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return _models["default"].setting.create({
              name: 'discord'
            });

          case 15:
            _context.next = 17;
            return _models["default"].featureSetting.findOne({
              where: {
                type: 'global',
                name: 'autoWithdrawal'
              }
            });

          case 17:
            autoWithdrawalSetting = _context.sent;

            if (autoWithdrawalSetting) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return _models["default"].featureSetting.create({
              type: 'global',
              name: 'autoWithdrawal',
              enabled: true
            });

          case 21:
            _context.next = 23;
            return _models["default"].featureSetting.findOne({
              where: {
                type: 'global',
                name: 'withdraw'
              }
            });

          case 23:
            withdrawSetting = _context.sent;

            if (withdrawSetting) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return _models["default"].featureSetting.create({
              type: 'global',
              name: 'withdraw',
              enabled: true
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initDatabaseRecords(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.initDatabaseRecords = initDatabaseRecords;