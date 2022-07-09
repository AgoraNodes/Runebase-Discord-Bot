module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('monster', 'minDamage'),
    queryInterface.removeColumn('monster', 'maxDamage'),
    queryInterface.removeColumn('monster', 'minAr'),
    queryInterface.removeColumn('monster', 'maxAr'),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'monster',
      'minDamage',
      {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'monster',
      'maxDamage',
      {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'monster',
      'minAr',
      {
        type: Sequelize.INTEGER,
        defaultValue: 8,
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'monster',
      'maxAr',
      {
        type: Sequelize.INTEGER,
        defaultValue: 20,
        allowNull: false,
      },
    ),
  ]),
};
