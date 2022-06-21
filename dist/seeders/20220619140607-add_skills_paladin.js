"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var paladin, CombatSkillsSkills, DefensiveAurasSkills, OffensiveAurasSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Paladin'
                }
              }, ['id']);

            case 2:
              paladin = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Combat Skills',
                  classId: paladin
                }
              }, ['id']);

            case 5:
              CombatSkillsSkills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Defensive Auras'
                }
              }, ['id']);

            case 8:
              DefensiveAurasSkills = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Offensive Auras'
                }
              }, ['id']);

            case 11:
              OffensiveAurasSkills = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Prayer',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Resist Fire',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Defiance',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Resist Cold',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cleansing',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Resist Lightning',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vigor',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Meditation',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Redemption',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Salvation',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: DefensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Sacrifice',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Smite',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Bolt',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Zeal',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Charge',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vengeance',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blessed Hammer',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Conversion',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Shield',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fist of the Heavens',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Might',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Fire',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Thorns',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blessed Aim',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Concentration',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Freeze',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Shock',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sanctuary',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fanaticism',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Conviction',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: OffensiveAurasSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
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