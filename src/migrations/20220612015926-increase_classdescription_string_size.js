module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn(
      'classDescription',
      'description',
      {
        type: DataTypes.STRING(4096),
        allowNull: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn(
      'classDescription',
      'description',
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
    );
  },
};
