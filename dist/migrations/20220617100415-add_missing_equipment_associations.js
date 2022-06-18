"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('equipment', 'amuletId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'mainHandId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'offHandId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'armorId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'glovesId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'beltId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'bootsId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'ringSlotOneId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('equipment', 'ringSlotTwoId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'item',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('equipment', 'amuletId'), queryInterface.removeColumn('equipment', 'mainHandId'), queryInterface.removeColumn('equipment', 'offHandId'), queryInterface.removeColumn('equipment', 'armorId'), queryInterface.removeColumn('equipment', 'glovesId'), queryInterface.removeColumn('equipment', 'beltId'), queryInterface.removeColumn('equipment', 'bootsId'), queryInterface.removeColumn('equipment', 'ringSlotOneId'), queryInterface.removeColumn('equipment', 'ringSlotTwoId')]);
  }
};