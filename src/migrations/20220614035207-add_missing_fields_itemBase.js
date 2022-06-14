module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'itemBase',
      'strengthReq',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'dexterityReq',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'durability',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'itemBase',
      'sockets',
      {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn(
      'itemBase',
      'strengthReq',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'dexterityReq',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'durability',
    );
    await queryInterface.removeColumn(
      'itemBase',
      'sockets',
    );
  },
};
