module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('class', {
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
      strength: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      dexterity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      vitality: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      energy: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      life: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      mana: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      stamina: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      classDescriptionId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'classDescription', // name of Source model
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
    await queryInterface.dropTable('class');
  },
};
