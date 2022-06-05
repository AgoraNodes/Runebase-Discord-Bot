module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'setting', // name of Target model
      'discordHomeServerGuildId', // name of the key we're adding
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('setting', 'discordHomeServerGuildId');
  },
};
