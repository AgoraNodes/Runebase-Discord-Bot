module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('currency', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      currency_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      conversionRate: {
        type: DataTypes.STRING,
        defaultValue: '1',
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM,
        defaultValue: 'fiat',
        allowNull: false,
        values: [
          'fiat',
          'cryptocurrency',
        ],
      },
      price: {
        type: DataTypes.STRING,
        defaultValue: '0',
        allowNull: true,
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
    await queryInterface.dropTable('currency');
  },
};
