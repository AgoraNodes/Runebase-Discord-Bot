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
    rewarded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var UserJoinedModel = sequelize.define('userJoined', modelDefinition, modelOptions);

  UserJoinedModel.associate = function (model) {
    UserJoinedModel.belongsTo(model.user, {
      as: 'userJoined',
      foreignKey: 'userJoinedId'
    });
    UserJoinedModel.belongsTo(model.user, {
      as: 'userInvitedBy',
      foreignKey: 'userInvitedById'
    });
    UserJoinedModel.hasOne(model.activity);
  };

  return UserJoinedModel;
};