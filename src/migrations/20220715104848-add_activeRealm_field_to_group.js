module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'group',
      'activeRealm',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('group', 'activeRealm'),
  ]),
};
