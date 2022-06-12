module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('stats', 'userId'),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'stats',
      'userId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),
  ]),
};
