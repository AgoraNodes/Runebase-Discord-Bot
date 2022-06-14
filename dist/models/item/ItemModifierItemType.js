"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ItemModifierModel = sequelize.define('ItemModifierItemType', modelDefinition, modelOptions);

  ItemModifierModel.associate = function (model) {
    ItemModifierModel.belongsTo(model.itemType);
    ItemModifierModel.belongsTo(model.itemModifier);
  };

  return ItemModifierModel;
};