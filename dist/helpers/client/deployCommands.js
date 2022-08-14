"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deployCommands = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = require("dotenv");

var _discord = require("discord.js");

var _rest = require("@discordjs/rest");

var _v = require("discord-api-types/v9");

var _models = _interopRequireDefault(require("../../models"));

(0, _dotenv.config)();
var commands = [new _discord.SlashCommandBuilder().setName('help').setDescription('DM\'s you with a help message'), new _discord.SlashCommandBuilder().setName('pickclass').setDescription('Select a new class'), new _discord.SlashCommandBuilder().setName('stats').setDescription('Select stats (attributes) for your class'), new _discord.SlashCommandBuilder().setName('skills').setDescription('Skill Management'), new _discord.SlashCommandBuilder().setName('resetstats').setDescription('Reset your Attributes/Stats'), new _discord.SlashCommandBuilder().setName('resetskills').setDescription('Reset your skills'), new _discord.SlashCommandBuilder().setName('changerealm').setDescription('Change your Realm'), new _discord.SlashCommandBuilder().setName('inventory').setDescription('Inventory Management'), new _discord.SlashCommandBuilder().setName('equipment').setDescription('Equipment Management'), new _discord.SlashCommandBuilder().setName('battle').setDescription('Battle a monster'), new _discord.SlashCommandBuilder().setName('heal').setDescription('Heal yourself'), new _discord.SlashCommandBuilder().setName('myrank').setDescription('Displays the user\'s rank'), new _discord.SlashCommandBuilder().setName('ranks').setDescription('Displays all the ranks'), new _discord.SlashCommandBuilder().setName('leaderboard').setDescription('Displays the top ten leaderboard'), new _discord.SlashCommandBuilder().setName('mostactive').setDescription('Displays the top ten most active users (chatting)'), new _discord.SlashCommandBuilder().setName('balance').setDescription('Display your balance'), new _discord.SlashCommandBuilder().setName('deposit').setDescription('Displays your deposit address!'), new _discord.SlashCommandBuilder().setName('withdraw').setDescription('Starts Withdrawal process'), new _discord.SlashCommandBuilder().setName('roll').setDescription('Roll the dice'), new _discord.SlashCommandBuilder().setName('price').setDescription('Displays Runebase price')].map(function (command) {
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
              version: '10'
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