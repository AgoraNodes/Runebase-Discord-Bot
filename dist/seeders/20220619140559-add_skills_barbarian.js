"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var WarcriesSkills, barbarian, CombatSkillsSkills, CombatMasteriesSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Warcries'
                }
              }, ['id']);

            case 2:
              WarcriesSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Barbarian'
                }
              }, ['id']);

            case 5:
              barbarian = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Combat Skills',
                  classId: barbarian
                }
              }, ['id']);

            case 8:
              CombatSkillsSkills = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Combat Masteries'
                }
              }, ['id']);

            case 11:
              CombatMasteriesSkills = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Howl',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Find Potion',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Taunt',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shout',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Find Item',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Cry',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Orders',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grim Ward',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Cry',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Command',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: WarcriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Bash',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Leap',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Double Swing',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Stun',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Double Throw',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Leap Attack',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Concentrate',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Frenzy',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Whirlwind',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Berserk',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: CombatSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Sword Mastery',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Axe Mastery',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mace Mastery',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Polearm Mastery',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Throwing Mastery',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spear Mastery',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Increased Stamina',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Iron Skin',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Increased Speed',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: CombatMasteriesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Natural Resistance',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: CombatMasteriesSkills,
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