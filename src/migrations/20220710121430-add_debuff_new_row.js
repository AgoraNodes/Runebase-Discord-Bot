module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'debuff',
      'new',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('debuff', 'new'),
  ]),
};
