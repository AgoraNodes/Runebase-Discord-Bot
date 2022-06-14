module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
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
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const itemModel = sequelize.define('item', modelDefinition, modelOptions);

  itemModel.associate = (model) => {
    itemModel.belongsTo(model.itemBase);
    // itemModel.hasOne(model.itemCategory);
    itemModel.belongsTo(model.itemQuality);
  };

  return itemModel;
};
