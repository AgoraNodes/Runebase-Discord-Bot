"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ItemTypeModel = sequelize.define('itemType', modelDefinition, modelOptions);

  ItemTypeModel.associate = function (model) {
    ItemTypeModel.hasOne(model.itemFamily);
    ItemTypeModel.belongsToMany(model.itemModifier, {
      through: 'ItemModifierItemType'
    });
  };

  return ItemTypeModel;
};