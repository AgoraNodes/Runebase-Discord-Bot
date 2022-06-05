module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('activity', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'depositAccepted',
          'depositComplete',
          'withdrawRequested',
          'withdrawAccepted',
          'withdrawComplete',
          'withdrawRejected',
          'login_s',
          'login_f',
          'logout_s',
          'ignoreme_s',
          'ignoreme_f',
          'help_s',
          'help_f',
          'account_s',
          'account_f',
        ],
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      spender_balance: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      earner_balance: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      failedAmount: {
        type: DataTypes.STRING(4000),
        allowNull: true,
      },
      dashboardUserId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'dashboardUser', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      transactionId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'transaction', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      spenderId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'user', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      earnerId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'user', // name of Source model
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
    await queryInterface.dropTable('activity');
  },
};
