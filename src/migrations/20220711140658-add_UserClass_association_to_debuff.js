module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'debuff',
      'UserclassId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'UserClass', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('debuff', 'UserclassId'),
  ]),
};
