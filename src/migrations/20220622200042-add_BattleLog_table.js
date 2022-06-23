module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('battleLog', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      log: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      battleId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'battle', // name of Source model
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
    await queryInterface.dropTable('battleLog');
  },
};
