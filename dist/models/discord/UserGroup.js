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
    UserGroupModel.belongsToMany(model.rank, {
      through: 'UserGroupRank'
    });
    UserGroupModel.belongsToMany(model["class"], {
      through: 'UserGroupClass'
    });
    UserGroupModel.hasOne(model.UserGroupClass);
    UserGroupModel.hasOne(model.UserGroupRank);
    UserGroupModel.belongsTo(model.group);
    UserGroupModel.belongsTo(model.user);
  };

  return UserGroupModel;
};