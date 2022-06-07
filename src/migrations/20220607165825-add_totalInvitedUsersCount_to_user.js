module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'user',
      'totalInvitedUsersCount',
      {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'user',
      'totalInvitedUsersCount',
    );
  },
};
