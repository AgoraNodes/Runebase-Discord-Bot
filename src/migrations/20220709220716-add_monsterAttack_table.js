module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('monsterAttack', {
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
        allowNull: false,
      },
      maxDmg: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minAr: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxAr: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attackType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'physical',
      },
      ranged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      defaultAttack: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('monsterAttack');
  },
};
