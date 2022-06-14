module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('item', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      itemBaseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'itemBase',
          key: 'id',
        },
      },
      itemQualityId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'itemQuality',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      levelReq: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      defense: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      minDamage: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      maxDamage: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      strength: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      dexterity: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      vitality: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      energy: {
        type: DataTypes.SMALLINT,
        allowNull: true,
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
    await queryInterface.dropTable('item');
  },
};
