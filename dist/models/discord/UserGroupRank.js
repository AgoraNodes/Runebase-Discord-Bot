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

  var UserGroupRankModel = sequelize.define('UserGroupRank', modelDefinition, modelOptions);

  UserGroupRankModel.associate = function (model) {
    UserGroupRankModel.belongsTo(model.UserGroup, {
      foreignKey: 'UserGroupId'
    });
    UserGroupRankModel.belongsTo(model.rank);
  };

  return UserGroupRankModel;
};