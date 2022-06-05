module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('channel', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      channelName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      banMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastActive: {
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
    await queryInterface.dropTable('channel');
  },
};
