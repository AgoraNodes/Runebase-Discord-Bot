"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    exp: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var UserGroupModel = sequelize.define('UserGroup', modelDefinition, modelOptions);

  UserGroupModel.associate = function (model) {
    UserGroupModel.belongsTo(model.user, {
      foreignKey: 'userId'
    });
  };

  return UserGroupModel;
};