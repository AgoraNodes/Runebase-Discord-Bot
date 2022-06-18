"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemTypeRings, itemTypeAmulets;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Rings'
                }
              }, ['id']);

            case 2:
              itemTypeRings = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('itemType', {
                where: {
                  name: 'Amulets'
                }
              }, ['id']);

            case 5:
              itemTypeAmulets = _context.sent;
              queryInterface.bulkInsert('itemFamily', [// Helms
              {
                name: 'Rings',
                itemTypeId: itemTypeRings,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Amulets',
                itemTypeId: itemTypeAmulets,
                twoHanded: false,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 7:
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