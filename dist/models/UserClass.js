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

  var UserClassModel = sequelize.define('UserClass', modelDefinition, modelOptions);

  UserClassModel.associate = function (model) {};

  return UserClassModel;
};