module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'item',
      'eDefense',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'item',
      'eDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'minEdefense',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'maxEdefense',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'minEdamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemModifier',
      'maxEdamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'item',
      'eDefense',
    );
    await queryInterface.removeColumn(
      'item',
      'eDamage',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'minEdefense',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'maxEdefense',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'minEdamage',
    );
    await queryInterface.removeColumn(
      'itemModifier',
      'maxEdamage',
    );
  },
};
