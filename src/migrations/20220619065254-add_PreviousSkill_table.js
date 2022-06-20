module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('SkillSkill', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      currentSkillId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'skill',
          key: 'id',
        },
      },
      previousSkillId: {
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
    await queryInterface.dropTable('SkillSkill');
  },
};
