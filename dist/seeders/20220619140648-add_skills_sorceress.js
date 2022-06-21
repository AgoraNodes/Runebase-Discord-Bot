"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var FireSpellsSkills, LightningSpellskills, ColdSpellsSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Fire Spells'
                }
              }, ['id']);

            case 2:
              FireSpellsSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Lightning Spells'
                }
              }, ['id']);

            case 5:
              LightningSpellskills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Cold Spells'
                }
              }, ['id']);

            case 8:
              ColdSpellsSkills = _context.sent;
              _context.next = 11;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Fire Bolt',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Warmth',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Inferno',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blaze',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Ball',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Wall',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Enchant',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Meteor',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Mastery',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hydra',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: FireSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Charged Bolt',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Static Field',
                level: 6,
                row: 1,
                column: 1,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Telekinesis',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Nova',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chain Lightning',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Teleport',
                level: 18,
                row: 4,
                column: 3,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Thunder Storm',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Energy Shield',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Mastery',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: LightningSpellskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Ice Bolt',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Frozen Armor',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Frost Nova',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ice Blast',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shiver Armor',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Glacial Spike',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blizzard',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chilling Armor',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Frozen Orb',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: ColdSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cold Mastery',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: ColdSpellsSkills,
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