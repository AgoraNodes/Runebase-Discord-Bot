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
    lvlReq: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemBaseModel = sequelize.define('itemBase', modelDefinition, modelOptions);

  ItemBaseModel.associate = (model) => {
    ItemBaseModel.belongsTo(model.itemFamily);
    // ItemBaseModel.hasOne(model.itemCategory);
    ItemBaseModel.belongsTo(model.itemDifficulty);
  };

  return ItemBaseModel;
};