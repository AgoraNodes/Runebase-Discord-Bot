module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'class',
      'attackRating',
      {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 50,
      },
    ),
    queryInterface.addColumn(
      'class',
      'defense',
      {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 50,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('class', 'attackRating'),
    queryInterface.removeColumn('class', 'defense'),
  ]),
};
