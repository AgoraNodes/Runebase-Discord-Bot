module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'monster',
      'minAr',
      {
        type: DataTypes.INTEGER,
        defaultValue: 8,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'monster',
      'maxAr',
      {
        type: DataTypes.INTEGER,
        defaultValue: 20,
        allowNull: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'monster',
      'minAr',
    );
    await queryInterface.removeColumn(
      'monster',
      'maxAr',
    );
  },
};
