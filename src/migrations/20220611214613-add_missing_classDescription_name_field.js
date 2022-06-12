module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'classDescription',
      'name',
      {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'classDescription',
      'name',
    );
  },
};
