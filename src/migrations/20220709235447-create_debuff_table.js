module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('debuff', {
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
      minDmg: {
        type: DataTypes.INTEGER,
      },
      maxDmg: {
        type: DataTypes.INTEGER,
      },
      reducedArmor: {
        type: DataTypes.INTEGER,
      },
      stun: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chance: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        allowNull: false,
      },
      rounds: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      BattleMonsterId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'BattleMonster', // name of Source model
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
    await queryInterface.dropTable('debuff');
  },
};
