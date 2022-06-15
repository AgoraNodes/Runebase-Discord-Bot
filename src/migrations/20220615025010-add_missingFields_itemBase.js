module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'itemBase',
      'maxStack',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'block',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'itemBase',
      'maxStack',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'block',
    );
  },
};
