module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('buff', {
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
      damageBonus: {
        type: DataTypes.INTEGER,
      },
      attackBonus: {
        type: DataTypes.INTEGER,
      },
      defenseBonus: {
        type: DataTypes.INTEGER,
      },
      parryBonus: {
        type: DataTypes.INTEGER,
      },
      lifeBonus: {
        type: DataTypes.INTEGER,
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
      new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      UserClassId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'UserClass', // name of Source model
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
    await queryInterface.dropTable('buff');
  },
};
