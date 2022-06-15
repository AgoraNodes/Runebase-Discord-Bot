module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'item',
      'ed',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'minEd',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'maxEd',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'item',
      'ed',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'minEd',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'maxEd',
    );
  },
};
