module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'setting',
      'roleDiceChannelId',
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'setting',
      'roleDiceChannelId',
    );
  },
};
