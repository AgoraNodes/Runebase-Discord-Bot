"use strict";

module.exports = function (sequelize, DataTypes) {
  // 1: The model schema.
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
    description: {
      type: DataTypes.STRING(4096),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ClassDescriptionModel = sequelize.define('classDescription', modelDefinition, modelOptions);

  ClassDescriptionModel.associate = function (model) {
    ClassDescriptionModel.hasOne(model["class"]);
  };

  return ClassDescriptionModel;
};