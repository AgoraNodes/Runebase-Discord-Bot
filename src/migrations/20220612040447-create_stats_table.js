module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('stats', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      strength: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      dexterity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      vitality: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      energy: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      life: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      mana: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      stamina: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'user', // name of Source model
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
    await queryInterface.dropTable('stats');
  },
};
