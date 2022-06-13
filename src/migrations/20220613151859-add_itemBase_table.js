module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('itemBase', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lvlReq: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      itemFamilyId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'itemFamily', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      itemDifficultyId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'itemDifficulty', // name of Source model
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
    await queryInterface.dropTable('itemBase');
  },
};
