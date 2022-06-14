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
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ItemQualityModel = sequelize.define('itemQuality', modelDefinition, modelOptions);

  ItemQualityModel.associate = function (model) {
    ItemQualityModel.hasOne(model.itemModifier);
  };

  return ItemQualityModel;
};