module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'skill',
      'passive',
      {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'skill',
      'passive',
    );
  },
};
