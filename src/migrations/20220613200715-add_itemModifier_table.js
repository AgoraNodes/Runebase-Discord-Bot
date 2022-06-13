module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('itemModifier', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      itemQualityId: {
        type: DataTypes.BIGINT,
        references: {
          model: 'itemQuality', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      levelReq: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      levelMonster: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      prefix: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      suffix: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minStrength: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      maxStrength: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      minDexterity: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      maxDexterity: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      minVitality: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      maxVitality: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      minEnergy: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      maxEnergy: {
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
    await queryInterface.dropTable('itemModifier');
  },
};
