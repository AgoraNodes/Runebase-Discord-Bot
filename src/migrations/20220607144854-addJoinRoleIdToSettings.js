module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'setting',
      'joinedRoleId',
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'setting',
      'joinedRoleId',
    );
  },
};
