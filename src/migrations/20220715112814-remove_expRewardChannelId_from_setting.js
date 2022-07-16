module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('setting', 'expRewardChannelId'),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'setting',
      'expRewardChannelId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
  ]),
};
