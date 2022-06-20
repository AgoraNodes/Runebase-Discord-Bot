module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'skill',
      'row',
      {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'skill',
      'column',
      {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'skill',
      'row',
    );
    await queryInterface.removeColumn(
      'skill',
      'column',
    );
  },
};
