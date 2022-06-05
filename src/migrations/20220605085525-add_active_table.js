module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('active', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lastSeen: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      groupId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'group', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('active');
  },
};
