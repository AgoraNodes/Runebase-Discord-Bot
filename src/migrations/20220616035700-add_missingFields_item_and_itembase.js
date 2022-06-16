module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'item',
      'minThrowDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'item',
      'maxThrowDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'minThrowDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'maxThrowDamage',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'item',
      'minThrowDamage',
    );
    await queryInterface.removeColumn(
      'item',
      'maxThrowDamage',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'minThrowDamage',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'maxThrowDamage',
    );
  },
};
