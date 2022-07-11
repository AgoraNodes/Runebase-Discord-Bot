module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'buff',
      'critBonus',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('buff', 'critBonus'),
  ]),
};
