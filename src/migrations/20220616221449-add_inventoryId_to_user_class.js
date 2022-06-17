module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'UserClass',
      'inventoryId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'inventory', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('UserClass', 'inventoryId'),
  ]),
};
