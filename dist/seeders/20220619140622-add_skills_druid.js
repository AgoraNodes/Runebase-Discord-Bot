"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var ElementalskillsSkills, ShapeShiftingkills, SummoningSkillsSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Elemental Skills'
                }
              }, ['id']);

            case 2:
              ElementalskillsSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Shape Shifting Skills'
                }
              }, ['id']);

            case 5:
              ShapeShiftingkills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Summoning Skills'
                }
              }, ['id']);

            case 8:
              SummoningSkillsSkills = _context.sent;
              _context.next = 11;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Firestorm',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Molten Boulder',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Arctic Blast',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fissure',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cyclone Armor',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Twister',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Volcano',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tornado',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Armageddon',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hurricane',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: ElementalskillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Werewolf',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lycanthropy',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Werebear',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Feral Rage',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Maul',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rabies',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Claws',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hunger',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shock Wave',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fury',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: ShapeShiftingkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Raven',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison Creeper',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Oak Sage',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summon Spirit Wolf',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Carrion Vine',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heart of Wolverine',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summon Dire Wolf',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Solar Creeper',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spirit of Barbs',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: SummoningSkillsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summon Grizzly',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: SummoningSkillsSkills,
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