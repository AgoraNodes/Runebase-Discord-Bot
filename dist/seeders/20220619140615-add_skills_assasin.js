"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var MartialArtsSkills, ShadowDisciplinesSkills, TrapsSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Martial Arts'
                }
              }, ['id']);

            case 2:
              MartialArtsSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Shadow Disciplines'
                }
              }, ['id']);

            case 5:
              ShadowDisciplinesSkills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Traps'
                }
              }, ['id']);

            case 8:
              TrapsSkills = _context.sent;
              _context.next = 11;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Tiger Strike',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dragon Talon',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fists of Fire',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dragon Claw',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cobra Strike',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Claws of Thunder',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dragon Tail',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blades of Ice',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dragon Flight',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Phoenix Strike',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: MartialArtsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Claw Mastery',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Psychic Hammer',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Burst of Speed',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Weapon Block',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cloak of Shadows',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fade',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shadow Warrior',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mind Blast',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Venom',
                level: 24,
                row: 6,
                column: 1,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shadow Master',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: ShadowDisciplinesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Fire Blast',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shock Web',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Sentinel',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Charged Bolt Sentry',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wake of Fire',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Fury',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Sentry',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wake of Inferno',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Death Sentry',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Shield',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: TrapsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('skill', null, {});
  }
};