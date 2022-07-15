module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'user',
      'currentRealmId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'group', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('user', 'currentRealmId'),
  ]),
};
