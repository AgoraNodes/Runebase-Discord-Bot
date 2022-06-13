module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'UserClass',
      'conditionId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'condition', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('UserClass', 'conditionId'),
  ]),
};
