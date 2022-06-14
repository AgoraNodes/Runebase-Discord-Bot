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

  var UserRankModel = sequelize.define('UserRank', modelDefinition, modelOptions);

  UserRankModel.associate = function (model) {};

  return UserRankModel;
};