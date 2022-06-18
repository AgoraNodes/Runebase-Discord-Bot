module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'item',
      'stack',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'item',
      'stack',
    );
  },
};
