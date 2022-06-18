"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemTypeHelms, itemTypeArmors, itemTypeShields, itemTypeGloves, itemTypeBoots, itemTypeBelts, itemTypeAxes, itemTypeBows, itemTypeCrossbows, itemTypeDaggers, itemTypeJavelins, itemTypeMaces, itemTypePolearms, itemTypeScepters, itemTypeSpears, itemTypeStaves, itemTypeSwords, itemTypeThrowing, itemTypeWands, itemTypeCirclets, itemTypeBarbHelms, itemTypeDruidPelts, itemTypePalaShields, itemTypeNecroHeads, itemTypeAmaWeapons, itemTypeAssaKatars, itemTypeSorcOrbs;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Helms'
                }
              }, ['id']);

            case 2:
              itemTypeHelms = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Armors'
                }
              }, ['id']);

            case 5:
              itemTypeArmors = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Shields'
                }
              }, ['id']);

            case 8:
              itemTypeShields = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Gloves'
                }
              }, ['id']);

            case 11:
              itemTypeGloves = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Boots'
                }
              }, ['id']);

            case 14:
              itemTypeBoots = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Belts'
                }
              }, ['id']);

            case 17:
              itemTypeBelts = _context.sent;
              _context.next = 20;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Axes'
                }
              }, ['id']);

            case 20:
              itemTypeAxes = _context.sent;
              _context.next = 23;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Bows'
                }
              }, ['id']);

            case 23:
              itemTypeBows = _context.sent;
              _context.next = 26;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Crossbows'
                }
              }, ['id']);

            case 26:
              itemTypeCrossbows = _context.sent;
              _context.next = 29;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Daggers'
                }
              }, ['id']);

            case 29:
              itemTypeDaggers = _context.sent;
              _context.next = 32;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Javelins'
                }
              }, ['id']);

            case 32:
              itemTypeJavelins = _context.sent;
              _context.next = 35;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Maces'
                }
              }, ['id']);

            case 35:
              itemTypeMaces = _context.sent;
              _context.next = 38;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Polearms'
                }
              }, ['id']);

            case 38:
              itemTypePolearms = _context.sent;
              _context.next = 41;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Scepters'
                }
              }, ['id']);

            case 41:
              itemTypeScepters = _context.sent;
              _context.next = 44;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Spears'
                }
              }, ['id']);

            case 44:
              itemTypeSpears = _context.sent;
              _context.next = 47;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Staves'
                }
              }, ['id']);

            case 47:
              itemTypeStaves = _context.sent;
              _context.next = 50;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Swords'
                }
              }, ['id']);

            case 50:
              itemTypeSwords = _context.sent;
              _context.next = 53;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Throwing'
                }
              }, ['id']);

            case 53:
              itemTypeThrowing = _context.sent;
              _context.next = 56;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Wands'
                }
              }, ['id']);

            case 56:
              itemTypeWands = _context.sent;
              _context.next = 59;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Circlets'
                }
              }, ['id']);

            case 59:
              itemTypeCirclets = _context.sent;
              _context.next = 62;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Barbarian Helms'
                }
              }, ['id']);

            case 62:
              itemTypeBarbHelms = _context.sent;
              _context.next = 65;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Druid Pelts'
                }
              }, ['id']);

            case 65:
              itemTypeDruidPelts = _context.sent;
              _context.next = 68;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Paladin Shields'
                }
              }, ['id']);

            case 68:
              itemTypePalaShields = _context.sent;
              _context.next = 71;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Necromancer Shrunken Heads'
                }
              }, ['id']);

            case 71:
              itemTypeNecroHeads = _context.sent;
              _context.next = 74;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Amazon Weapons'
                }
              }, ['id']);

            case 74:
              itemTypeAmaWeapons = _context.sent;
              _context.next = 77;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Assassin Katars'
                }
              }, ['id']);

            case 77:
              itemTypeAssaKatars = _context.sent;
              _context.next = 80;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Sorceress Orbs'
                }
              }, ['id']);

            case 80:
              itemTypeSorcOrbs = _context.sent;
              queryInterface.bulkInsert('itemFamily', [// Helms
              {
                name: 'Cap',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Skull Cap',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Helm',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Full Helm',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Helm',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mask',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crown',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Helm',
                itemTypeId: itemTypeHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Armors
              {
                name: 'Quilted Armor',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Leather Armor',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hard Leather Armor',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Studded Leather',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ring Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scale Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Breast Plate',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chain Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Splint Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Light Plate',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Field Plate',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Plate Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Plate',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Full Plate Mail',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ancient Armor',
                itemTypeId: itemTypeArmors,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Shields
              {
                name: 'Buckler',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Small Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Large Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Kite Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spiked Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tower Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Shield',
                itemTypeId: itemTypeShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Gloves
              {
                name: 'Leather Gloves',
                itemTypeId: itemTypeGloves,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavy Gloves',
                itemTypeId: itemTypeGloves,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chain Gloves',
                itemTypeId: itemTypeGloves,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Light Gauntlets',
                itemTypeId: itemTypeGloves,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gauntlets',
                itemTypeId: itemTypeGloves,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Boots
              {
                name: 'Boots',
                itemTypeId: itemTypeBoots,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavy Boots',
                itemTypeId: itemTypeBoots,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chain Boots',
                itemTypeId: itemTypeBoots,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Light Plated Boots',
                itemTypeId: itemTypeBoots,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Greaves',
                itemTypeId: itemTypeBoots,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Belts
              {
                name: 'Sash',
                itemTypeId: itemTypeBelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Light Belt',
                itemTypeId: itemTypeBelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Belt',
                itemTypeId: itemTypeBelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavy Belt',
                itemTypeId: itemTypeBelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Plated Belt',
                itemTypeId: itemTypeBelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Axes
              {
                name: 'Hand Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Double Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Military Pick',
                itemTypeId: itemTypeAxes,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // 2h axes
              {
                name: 'Large Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Broad Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Giant Axe',
                itemTypeId: itemTypeAxes,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Bows
              {
                name: 'Short Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: "Hunter's Bow",
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Long Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Composite Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Short Battle Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Long Battle Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Short War Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Long War Bow',
                itemTypeId: itemTypeBows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // CrossBows
              {
                name: 'Light Crossbow',
                itemTypeId: itemTypeCrossbows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crossbow',
                itemTypeId: itemTypeCrossbows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavy Crossbow',
                itemTypeId: itemTypeCrossbows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Repeating Crossbow',
                itemTypeId: itemTypeCrossbows,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Daggers
              {
                name: 'Dagger',
                itemTypeId: itemTypeDaggers,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dirk',
                itemTypeId: itemTypeDaggers,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Kris',
                itemTypeId: itemTypeDaggers,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade',
                itemTypeId: itemTypeDaggers,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Javelins
              {
                name: 'Javelin',
                itemTypeId: itemTypeJavelins,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Pilum',
                itemTypeId: itemTypeJavelins,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Short Spear',
                itemTypeId: itemTypeJavelins,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Glaive',
                itemTypeId: itemTypeJavelins,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Throwing Spear',
                itemTypeId: itemTypeJavelins,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Maces
              {
                name: 'Club',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spiked Club',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mace',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Morning Star',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Flail',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Hammer',
                itemTypeId: itemTypeMaces,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // 2h
              {
                name: 'Maul',
                itemTypeId: itemTypeMaces,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Maul',
                itemTypeId: itemTypeMaces,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Polearms
              {
                name: 'Bardiche',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Voulge',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scythe',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poleaxe',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Halberd',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Scythe',
                itemTypeId: itemTypePolearms,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Scepters
              {
                name: 'Scepter',
                itemTypeId: itemTypeScepters,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grand Scepter',
                itemTypeId: itemTypeScepters,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Scepter',
                itemTypeId: itemTypeScepters,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Spears
              {
                name: 'Spear',
                itemTypeId: itemTypeSpears,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Trident',
                itemTypeId: itemTypeSpears,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Brandistock',
                itemTypeId: itemTypeSpears,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spetum',
                itemTypeId: itemTypeSpears,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Pike',
                itemTypeId: itemTypeSpears,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Staves
              {
                name: 'Short Staff',
                itemTypeId: itemTypeStaves,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Long Staff',
                itemTypeId: itemTypeStaves,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gnarled Staff',
                itemTypeId: itemTypeStaves,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Staff',
                itemTypeId: itemTypeStaves,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Staff',
                itemTypeId: itemTypeStaves,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Swords
              {
                name: 'Short Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scimitar',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sabre',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Falchion',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crystal Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Broad Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Long Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // 2h
              {
                name: 'Two-handed Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Claymore',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Giant Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bastard Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Flamberge',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Sword',
                itemTypeId: itemTypeSwords,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Throwing
              {
                name: 'Throwing Knife',
                itemTypeId: itemTypeThrowing,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Balanced Knife',
                itemTypeId: itemTypeThrowing,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Throwing Axe',
                itemTypeId: itemTypeThrowing,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Balanced Axe',
                itemTypeId: itemTypeThrowing,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Wands
              {
                name: 'Wand',
                itemTypeId: itemTypeWands,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Yew Wand',
                itemTypeId: itemTypeWands,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Wand',
                itemTypeId: itemTypeWands,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grim Wand',
                itemTypeId: itemTypeWands,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Circlets
              {
                name: 'Circlet',
                itemTypeId: itemTypeCirclets,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Coronet',
                itemTypeId: itemTypeCirclets,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tiara',
                itemTypeId: itemTypeCirclets,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Diadem',
                itemTypeId: itemTypeCirclets,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Barb Helms
              {
                name: 'Jawbone Cap',
                itemTypeId: itemTypeBarbHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fanged Helm',
                itemTypeId: itemTypeBarbHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Horned Helm',
                itemTypeId: itemTypeBarbHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Assault Helmet',
                itemTypeId: itemTypeBarbHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Avenger Guard',
                itemTypeId: itemTypeBarbHelms,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Druid Pels
              {
                name: 'Wolf Head',
                itemTypeId: itemTypeDruidPelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hawk Helm',
                itemTypeId: itemTypeDruidPelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Antlers',
                itemTypeId: itemTypeDruidPelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Falcon Mask',
                itemTypeId: itemTypeDruidPelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spirit Mask',
                itemTypeId: itemTypeDruidPelts,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Pladin SHields
              {
                name: 'Targe',
                itemTypeId: itemTypePalaShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rondache',
                itemTypeId: itemTypePalaShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heraldic Shield',
                itemTypeId: itemTypePalaShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Aerin Shield',
                itemTypeId: itemTypePalaShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crown Shield',
                itemTypeId: itemTypePalaShields,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Necro Heads
              {
                name: 'Preserved Head',
                itemTypeId: itemTypeNecroHeads,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Zombie Head',
                itemTypeId: itemTypeNecroHeads,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Unraveller Head',
                itemTypeId: itemTypeNecroHeads,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gargoyle Head',
                itemTypeId: itemTypeNecroHeads,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demon Head',
                itemTypeId: itemTypeNecroHeads,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Amazon Weapons
              {
                name: 'Stag Bow',
                itemTypeId: itemTypeAmaWeapons,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Reflex Bow',
                itemTypeId: itemTypeAmaWeapons,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Maiden Spear',
                itemTypeId: itemTypeAmaWeapons,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Maiden Pike',
                itemTypeId: itemTypeAmaWeapons,
                twoHanded: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Maiden Javelin',
                itemTypeId: itemTypeAmaWeapons,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Assasin Katars
              {
                name: 'Katar',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wrist Blade',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hatchet Hands',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cestus',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Claws',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Talons',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scissors Katar',
                itemTypeId: itemTypeAssaKatars,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, // Sorc Orbs
              {
                name: 'Eagle Orb',
                itemTypeId: itemTypeSorcOrbs,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sacred Globe',
                itemTypeId: itemTypeSorcOrbs,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Smoked Sphere',
                itemTypeId: itemTypeSorcOrbs,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Clasped Orb',
                itemTypeId: itemTypeSorcOrbs,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: "Jared's Stone",
                itemTypeId: itemTypeSorcOrbs,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 82:
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
    return queryInterface.bulkDelete('itemFamily', null, {});
  }
};