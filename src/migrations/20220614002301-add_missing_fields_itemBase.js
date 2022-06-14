module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'itemBase',
      'minDefense',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'maxDefense',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'minDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'maxDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'itemBase',
      'minDefense',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'maxDefense',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'minDamage',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'maxDamage',
    );
  },
};
