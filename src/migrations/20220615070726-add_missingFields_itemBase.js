module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'itemBase',
      'slots',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'itemBase',
      'slots',
    );
  },
};
