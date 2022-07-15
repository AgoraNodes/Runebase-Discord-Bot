module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('UserGroupRank', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rankId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'rank',
          key: 'id',
        },
      },
      UserGroupId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'UserGroup',
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
    await queryInterface.dropTable('UserGroupRank');
  },
};
