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
    count: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
      allowNull: false
    },
    rewarded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastSentence: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ActiveTalkerModel = sequelize.define('activeTalker', modelDefinition, modelOptions);

  ActiveTalkerModel.associate = function (model) {
    ActiveTalkerModel.belongsTo(model.user);
    ActiveTalkerModel.hasOne(model.activity);
  };

  return ActiveTalkerModel;
};