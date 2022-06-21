"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var Firestorm, MoltenBoulder, ArcticBlast, Fissure, CycloneArmor, Twister, Volcano, Tornado, Armageddon, Hurricane;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Firestorm'
                }
              }, ['id']);

            case 2:
              Firestorm = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Molten Boulder'
                }
              }, ['id']);

            case 5:
              MoltenBoulder = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Arctic Blast'
                }
              }, ['id']);

            case 8:
              ArcticBlast = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fissure'
                }
              }, ['id']);

            case 11:
              Fissure = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Cyclone Armor'
                }
              }, ['id']);

            case 14:
              CycloneArmor = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Twister'
                }
              }, ['id']);

            case 17:
              Twister = _context.sent;
              _context.next = 20;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Volcano'
                }
              }, ['id']);

            case 20:
              Volcano = _context.sent;
              _context.next = 23;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Tornado'
                }
              }, ['id']);

            case 23:
              Tornado = _context.sent;
              _context.next = 26;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Armageddon'
                }
              }, ['id']);

            case 26:
              Armageddon = _context.sent;
              _context.next = 29;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Hurricane'
                }
              }, ['id']);

            case 29:
              Hurricane = _context.sent;
              _context.next = 32;
              return queryInterface.bulkInsert('SkillSkill', [{
                currentSkillId: Armageddon,
                previousSkillId: Hurricane,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Armageddon,
                previousSkillId: Volcano,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Volcano,
                previousSkillId: Fissure,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Fissure,
                previousSkillId: MoltenBoulder,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: MoltenBoulder,
                previousSkillId: Firestorm,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Hurricane,
                previousSkillId: Tornado,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Tornado,
                previousSkillId: Twister,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Twister,
                previousSkillId: CycloneArmor,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: CycloneArmor,
                previousSkillId: ArcticBlast,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 32:
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
    return queryInterface.bulkDelete('SkillSkill', null, {});
  }
};