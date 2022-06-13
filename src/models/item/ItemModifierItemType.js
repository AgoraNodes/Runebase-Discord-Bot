module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemModifierModel = sequelize.define('ItemModifierItemType', modelDefinition, modelOptions);

  ItemModifierModel.associate = (model) => {
    ItemModifierModel.belongsTo(model.itemType);
    ItemModifierModel.belongsTo(model.itemModifier);
  };

  return ItemModifierModel;
};
