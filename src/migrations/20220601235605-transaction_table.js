module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('transaction', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      txid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'receive',
          'send',
        ],
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      feeAmount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      confirmations: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      phase: {
        type: DataTypes.ENUM,
        values: [
          'review',
          'pending',
          'confirming',
          'confirmed',
          'rejected',
          'failed',
        ],
      },
      to_from: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      memo: {
        type: DataTypes.STRING(512),
        allowNull: true,
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
      addressId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'address', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      blockId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'block', // name of Source model
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
      addressExternalId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'addressExternal', // name of Source model
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
    await queryInterface.dropTable('transaction');
  },
};
