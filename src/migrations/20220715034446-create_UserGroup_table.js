module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('UserGroup', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      exp: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      groupId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'group',
          key: 'id',
        },
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
    await queryInterface.dropTable('UserGroup');
  },
};
