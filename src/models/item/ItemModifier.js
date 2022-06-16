module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    minEdefense: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxEdefense: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    minEdamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    maxEdamage: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemModifierModel = sequelize.define('itemModifier', modelDefinition, modelOptions);

  ItemModifierModel.associate = (model) => {
    ItemModifierModel.belongsTo(model.itemQuality);
    ItemModifierModel.hasMany(model.ItemModifierItemType);
    ItemModifierModel.belongsToMany(
      model.itemType,
      { through: 'ItemModifierItemType' },
    );
  };

  return ItemModifierModel;
};
