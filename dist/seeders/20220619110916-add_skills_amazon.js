"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var bowsAndCrossBowsSkills, JavelinAndSPearSkills, PassiveandMagicSkillsSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Bow and Crossbow Skills'
                }
              }, ['id']);

            case 2:
              bowsAndCrossBowsSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Javelin and Spear Skills'
                }
              }, ['id']);

            case 5:
              JavelinAndSPearSkills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Passive and Magic Skills'
                }
              }, ['id']);

            case 8:
              PassiveandMagicSkillsSkills = _context.sent;
              _context.next = 11;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Magic Arrow',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Arrow',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cold Arrow',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Multiple Shot',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Exploding Arrow',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ice Arrow',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Guided Arrow',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Strafe',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Immolation Arrow',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Freezing Arrow',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: bowsAndCrossBowsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Jab',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Power Strike',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison Javelin',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Impale',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Bolt',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Charged Strike',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Plague Javelin',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fend',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Strike',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Fury',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: JavelinAndSPearSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Inner Sight',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Critical Strike',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dodge',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Slow Missiles',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Avoid',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Penetrate',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Decoy',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Evade',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Valkyrie',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: PassiveandMagicSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Pierce',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: PassiveandMagicSkillsSkills,
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