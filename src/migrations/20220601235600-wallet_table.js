module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('wallet', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      available: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      locked: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      earned: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      spend: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'user', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      tokenId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'token', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('wallet');
  },
};
