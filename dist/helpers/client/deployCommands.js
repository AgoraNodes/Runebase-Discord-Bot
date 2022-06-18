"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deployCommands = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = require("dotenv");

var _builders = require("@discordjs/builders");

var _rest = require("@discordjs/rest");

var _v = require("discord-api-types/v9");

var _models = _interopRequireDefault(require("../../models"));

(0, _dotenv.config)();
var commands = [new _builders.SlashCommandBuilder().setName('help').setDescription('DM\'s you with a help message'), new _builders.SlashCommandBuilder().setName('pickclass').setDescription('Select a new class'), new _builders.SlashCommandBuilder().setName('stats').setDescription('Select stats (attributes) for your class'), new _builders.SlashCommandBuilder().setName('inventory').setDescription('Inventory Management'), new _builders.SlashCommandBuilder().setName('equipment').setDescription('Equipment Management'), new _builders.SlashCommandBuilder().setName('myrank').setDescription('Displays the user\'s rank'), new _builders.SlashCommandBuilder().setName('ranks').setDescription('Displays all the ranks'), new _builders.SlashCommandBuilder().setName('leaderboard').setDescription('Displays the top ten leaderboard'), new _builders.SlashCommandBuilder().setName('mostactive').setDescription('Displays the top ten most active users (chatting)'), new _builders.SlashCommandBuilder().setName('balance').setDescription('Display your balance'), new _builders.SlashCommandBuilder().setName('deposit').setDescription('Displays your deposit address!'), new _builders.SlashCommandBuilder().setName('withdraw').setDescription('Starts Withdrawal process'), new _builders.SlashCommandBuilder().setName('roll').setDescription('Roll the dice'), new _builders.SlashCommandBuilder().setName('price').setDescription('Displays Runebase price')].map(function (command) {
  return command.toJSON();
});

var deployCommands = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(botToken, clientId) {
    var setting, rest;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].setting.findOne();

          case 2:
            setting = _context.sent;
            rest = new _rest.REST({
              version: '9'
            }).setToken(botToken);
            rest.put(_v.Routes.applicationCommands(clientId), {
              body: commands
            }).then(function () {
              return console.log('Successfully registered application commands.');
            })["catch"](console.error);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deployCommands(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.deployCommands = deployCommands;