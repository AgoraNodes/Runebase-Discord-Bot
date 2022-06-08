module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity', // name of Target model
      'activeTalkerId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'activeTalker', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('activity', 'activeTalkerId');
  },
};
