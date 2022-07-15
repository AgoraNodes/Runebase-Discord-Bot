module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'rank',
      'level',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('rank', 'level'),
  ]),
};
