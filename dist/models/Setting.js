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
    maintenance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    discordHomeServerGuildId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expRewardChannelId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    joinedRoleId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var SettingModel = sequelize.define('setting', modelDefinition, modelOptions);

  SettingModel.associate = function (model) {};

  return SettingModel;
};