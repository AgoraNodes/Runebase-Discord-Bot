module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'group',
      'expRewardChannelId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('group', 'expRewardChannelId'),
  ]),
};
