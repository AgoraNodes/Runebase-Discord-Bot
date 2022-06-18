"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyWalkingStick, itemFamilyYewWand, itemFamilyYBoneWand, itemFamilyYGrimWand;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Normal'
                }
              }, ['id']);

            case 2:
              itemDifficultyNormal = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Exceptional'
                }
              }, ['id']);

            case 5:
              itemDifficultyExceptional = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Elite'
                }
              }, ['id']);

            case 8:
              itemDifficultyElite = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Wand'
                }
              }, ['id']);

            case 11:
              itemFamilyWalkingStick = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Wand',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 4,
                strengthReq: null,
                dexterityReq: null,
                durability: 15,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Burnt Wand',
                levelReq: 19,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 18,
                strengthReq: 25,
                dexterityReq: null,
                durability: 15,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Polished Wand',
                levelReq: 41,
                levelMonster: 55,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 33,
                strengthReq: 25,
                dexterityReq: null,
                durability: 22,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Yew Wand'
                }
              }, ['id']);

            case 16:
              itemFamilyYewWand = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Yew Wand',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 8,
                strengthReq: null,
                dexterityReq: null,
                durability: 15,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYewWand,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Petrified Wand',
                levelReq: 25,
                levelMonster: 38,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 24,
                strengthReq: 25,
                dexterityReq: null,
                durability: 15,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYewWand,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ghost Wand',
                levelReq: 48,
                levelMonster: 65,
                minDefense: null,
                maxDefense: null,
                minDamage: 20,
                maxDamage: 40,
                strengthReq: 25,
                dexterityReq: null,
                durability: 14,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYewWand,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Bone Wand'
                }
              }, ['id']);

            case 21:
              itemFamilyYBoneWand = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Bone Wand',
                levelReq: null,
                levelMonster: 18,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 7,
                strengthReq: null,
                dexterityReq: null,
                durability: 15,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYBoneWand,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tomb Wand',
                levelReq: 25,
                levelMonster: 43,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 22,
                strengthReq: 25,
                dexterityReq: null,
                durability: 15,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYBoneWand,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lich Wand',
                levelReq: 56,
                levelMonster: 75,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 31,
                strengthReq: 25,
                dexterityReq: null,
                durability: 17,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYBoneWand,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Grim Wand'
                }
              }, ['id']);

            case 26:
              itemFamilyYGrimWand = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Grim Wand',
                levelReq: null,
                levelMonster: 26,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 11,
                strengthReq: null,
                dexterityReq: null,
                durability: 15,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYGrimWand,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grave Wand',
                levelReq: 25,
                levelMonster: 49,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 29,
                strengthReq: 25,
                dexterityReq: null,
                durability: 15,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYGrimWand,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lich Wand',
                levelReq: 56,
                levelMonster: 75,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 31,
                strengthReq: 25,
                dexterityReq: null,
                durability: 17,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyYGrimWand,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
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
    return queryInterface.bulkDelete('itemBase', null, {});
  }
};