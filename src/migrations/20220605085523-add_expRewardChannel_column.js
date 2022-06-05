module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'setting', // name of Target model
      'expRewardChannelId', // name of the key we're adding
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('setting', 'expRewardChannelId');
  },
};
