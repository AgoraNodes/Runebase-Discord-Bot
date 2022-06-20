module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('UserClassSkill', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      UserClassId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'UserClass',
          key: 'id',
        },
      },
      skillId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'skill',
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
    await queryInterface.dropTable('UserClassSkill');
  },
};
