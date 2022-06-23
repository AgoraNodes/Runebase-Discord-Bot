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
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var DamageTypeModel = sequelize.define('damageType', modelDefinition, modelOptions);

  DamageTypeModel.associate = function (model) {
    DamageTypeModel.hasMany(model.monster);
  };

  return DamageTypeModel;
};