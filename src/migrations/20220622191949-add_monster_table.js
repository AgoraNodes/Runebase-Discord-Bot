module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('monster', {
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
      level: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      minHp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      maxHp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      exp: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      defense: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      block: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      minDamage: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      maxDamage: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      FR: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      CR: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      PR: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      LR: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      damageTypeId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'damageType', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      monsterTypeId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'monsterType', // name of Source model
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
    await queryInterface.dropTable('monster');
  },
};
