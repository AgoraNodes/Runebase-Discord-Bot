module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'monsterAttack',
      'chance',
      {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        allowNull: false,
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('monsterAttack', 'chance'),
  ]),
};
