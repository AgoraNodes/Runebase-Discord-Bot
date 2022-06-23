module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('BattleMonster', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      currentHp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      maxHp: {
        type: DataTypes.BIGINT,
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
      monsterId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'monster', // name of Source model
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
    await queryInterface.dropTable('BattleMonster');
  },
};
