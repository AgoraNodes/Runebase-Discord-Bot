module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'transaction', // name of Target model
      'walletId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'wallet', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('transaction', 'walletId');
  },
};
