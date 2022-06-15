module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'itemFamily',
      'twoHanded',
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'itemFamily',
      'twoHanded',
    );
  },
};
