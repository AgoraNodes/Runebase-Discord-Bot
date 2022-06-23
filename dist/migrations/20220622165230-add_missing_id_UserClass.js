"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('UserClass', 'selectedMainSkillId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'UserClassSkill',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('UserClass', 'selectedSecondarySkillId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'UserClassSkill',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('UserClass', 'selectedMainSkillId'), queryInterface.removeColumn('UserClass', 'selectedSecondarySkillId')]);
  }
};