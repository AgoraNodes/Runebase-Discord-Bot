"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var SummoningSpellsSkills, PoisonandBonekills, CursesSkills;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Summoning Spells'
                }
              }, ['id']);

            case 2:
              SummoningSpellsSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Poison and Bone Spells'
                }
              }, ['id']);

            case 5:
              PoisonandBonekills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skillTree', {
                where: {
                  name: 'Curses'
                }
              }, ['id']);

            case 8:
              CursesSkills = _context.sent;
              _context.next = 11;
              return queryInterface.bulkInsert('skill', [// Amazon
              // Bows
              {
                name: 'Raise Skeleton',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Skeleton Mastery',
                level: 1,
                row: 1,
                column: 1,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Clay Golem',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Golem Mastery',
                level: 12,
                row: 3,
                column: 1,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Raise Skeletal Mage',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blood Golem',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summon Resist',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Iron Golem',
                level: 24,
                row: 5,
                column: 2,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Golem',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Revive',
                level: 30,
                row: 6,
                column: 3,
                skillTreeId: SummoningSpellsSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Teeth',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Armor',
                level: 1,
                row: 1,
                column: 3,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison Dagger',
                level: 6,
                row: 2,
                column: 1,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Corpse Explosion',
                level: 6,
                row: 2,
                column: 2,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Wall',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison Explosion',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Spear',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Prison',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison Nova',
                level: 30,
                row: 6,
                column: 1,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Spirit',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: PoisonandBonekills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Passice
              {
                name: 'Amplify Damage',
                level: 1,
                row: 1,
                column: 2,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dim Vision',
                level: 6,
                row: 1,
                column: 1,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Weaken',
                level: 6,
                row: 2,
                column: 3,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Iron Maiden',
                level: 12,
                row: 3,
                column: 2,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Terror',
                level: 12,
                row: 3,
                column: 3,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Confuse',
                level: 18,
                row: 4,
                column: 1,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Life Tap',
                level: 18,
                row: 4,
                column: 2,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Attract',
                level: 24,
                row: 5,
                column: 1,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Decrepify',
                level: 24,
                row: 5,
                column: 3,
                skillTreeId: CursesSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lower Resist',
                level: 30,
                row: 6,
                column: 2,
                skillTreeId: CursesSkills,
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