"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var BarbarianDescription, WarriorDescription, Barbarian, Warrior, newWarriorDescription, AmazonDescription, NecromancerDescription, PaladinDescription, AssasinDescription, SorceressDescription, DruidDescription, NewAmazonDescription, Amazon, NewDruidDescription, Druid, NewSorceressDescription, Sorceress, NewAssasinDescription, Assasin, NewPaladinDescription, Paladin, NewNecromancerDescription, Necromancer;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Barbarian'
                }
              }, ['id']);

            case 2:
              BarbarianDescription = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Warrior'
                }
              }, ['id']);

            case 5:
              WarriorDescription = _context.sent;

              if (!(!BarbarianDescription && !WarriorDescription)) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Barbarian',
                description: 'Barbarian Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 9:
              _context.next = 11;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Barbarian'
                }
              }, ['id']);

            case 11:
              Barbarian = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Warrior'
                }
              }, ['id']);

            case 14:
              Warrior = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Warrior'
                }
              }, ['id']);

            case 17:
              newWarriorDescription = _context.sent;

              if (!(!Barbarian && !Warrior)) {
                _context.next = 21;
                break;
              }

              _context.next = 21;
              return queryInterface.bulkInsert('class', [{
                name: 'Barbarian',
                strength: 30,
                dexterity: 20,
                vitality: 25,
                energy: 10,
                life: 55,
                mana: 10,
                stamina: 92,
                attackRating: 50,
                defense: 50,
                classDescriptionId: newWarriorDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 21:
              _context.next = 23;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Amazon'
                }
              }, ['id']);

            case 23:
              AmazonDescription = _context.sent;

              if (AmazonDescription) {
                _context.next = 27;
                break;
              }

              _context.next = 27;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Amazon',
                description: 'Amazon Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 27:
              _context.next = 29;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Necromancer'
                }
              }, ['id']);

            case 29:
              NecromancerDescription = _context.sent;

              if (NecromancerDescription) {
                _context.next = 33;
                break;
              }

              _context.next = 33;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Necromancer',
                description: 'Necromancer Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 33:
              _context.next = 35;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Paladin'
                }
              }, ['id']);

            case 35:
              PaladinDescription = _context.sent;

              if (PaladinDescription) {
                _context.next = 39;
                break;
              }

              _context.next = 39;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Paladin',
                description: 'Paladin Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Assasin'
                }
              }, ['id']);

            case 41:
              AssasinDescription = _context.sent;

              if (AssasinDescription) {
                _context.next = 45;
                break;
              }

              _context.next = 45;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Assasin',
                description: 'Assasin Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 45:
              _context.next = 47;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Sorceress'
                }
              }, ['id']);

            case 47:
              SorceressDescription = _context.sent;

              if (SorceressDescription) {
                _context.next = 51;
                break;
              }

              _context.next = 51;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Sorceress',
                description: 'Sorceress Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 51:
              _context.next = 53;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Druid'
                }
              }, ['id']);

            case 53:
              DruidDescription = _context.sent;

              if (DruidDescription) {
                _context.next = 57;
                break;
              }

              _context.next = 57;
              return queryInterface.bulkInsert('classDescription', [{
                name: 'Druid',
                description: 'Druid Description',
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 57:
              _context.next = 59;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Amazon'
                }
              }, ['id']);

            case 59:
              NewAmazonDescription = _context.sent;
              _context.next = 62;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Amazon'
                }
              }, ['id']);

            case 62:
              Amazon = _context.sent;

              if (Amazon) {
                _context.next = 66;
                break;
              }

              _context.next = 66;
              return queryInterface.bulkInsert('class', [{
                name: 'Amazon',
                strength: 20,
                dexterity: 25,
                vitality: 20,
                energy: 15,
                life: 50,
                mana: 15,
                stamina: 84,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewAmazonDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 66:
              _context.next = 68;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Druid'
                }
              }, ['id']);

            case 68:
              NewDruidDescription = _context.sent;
              _context.next = 71;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Druid'
                }
              }, ['id']);

            case 71:
              Druid = _context.sent;

              if (Druid) {
                _context.next = 75;
                break;
              }

              _context.next = 75;
              return queryInterface.bulkInsert('class', [{
                name: 'Druid',
                strength: 15,
                dexterity: 20,
                vitality: 25,
                energy: 20,
                life: 55,
                mana: 20,
                stamina: 84,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewDruidDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 75:
              _context.next = 77;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Sorceress'
                }
              }, ['id']);

            case 77:
              NewSorceressDescription = _context.sent;
              _context.next = 80;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Sorceress'
                }
              }, ['id']);

            case 80:
              Sorceress = _context.sent;

              if (Sorceress) {
                _context.next = 84;
                break;
              }

              _context.next = 84;
              return queryInterface.bulkInsert('class', [{
                name: 'Sorceress',
                strength: 10,
                dexterity: 5,
                vitality: 10,
                energy: 35,
                life: 40,
                mana: 35,
                stamina: 74,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewSorceressDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 84:
              _context.next = 86;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Assasin'
                }
              }, ['id']);

            case 86:
              NewAssasinDescription = _context.sent;
              _context.next = 89;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Assasin'
                }
              }, ['id']);

            case 89:
              Assasin = _context.sent;

              if (Assasin) {
                _context.next = 93;
                break;
              }

              _context.next = 93;
              return queryInterface.bulkInsert('class', [{
                name: 'Assasin',
                strength: 20,
                dexterity: 20,
                vitality: 20,
                energy: 25,
                life: 50,
                mana: 25,
                stamina: 95,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewAssasinDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 93:
              _context.next = 95;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Paladin'
                }
              }, ['id']);

            case 95:
              NewPaladinDescription = _context.sent;
              _context.next = 98;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Paladin'
                }
              }, ['id']);

            case 98:
              Paladin = _context.sent;

              if (Paladin) {
                _context.next = 102;
                break;
              }

              _context.next = 102;
              return queryInterface.bulkInsert('class', [{
                name: 'Paladin',
                strength: 25,
                dexterity: 20,
                vitality: 25,
                energy: 15,
                life: 55,
                mana: 15,
                stamina: 89,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewPaladinDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 102:
              _context.next = 104;
              return queryInterface.rawSelect('classDescription', {
                where: {
                  name: 'Necromancer'
                }
              }, ['id']);

            case 104:
              NewNecromancerDescription = _context.sent;
              _context.next = 107;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Necromancer'
                }
              }, ['id']);

            case 107:
              Necromancer = _context.sent;

              if (Necromancer) {
                _context.next = 111;
                break;
              }

              _context.next = 111;
              return queryInterface.bulkInsert('class', [{
                name: 'Necromancer',
                strength: 15,
                dexterity: 25,
                vitality: 15,
                energy: 25,
                life: 45,
                mana: 25,
                stamina: 79,
                attackRating: 50,
                defense: 50,
                classDescriptionId: NewNecromancerDescription,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 111:
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
    queryInterface.bulkDelete('class', null, {});
    queryInterface.bulkDelete('classDescription', null, {});
  }
};