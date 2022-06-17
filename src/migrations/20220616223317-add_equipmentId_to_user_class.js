module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'UserClass',
      'equipmentId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'equipment', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('UserClass', 'equipmentId'),
  ]),
};
