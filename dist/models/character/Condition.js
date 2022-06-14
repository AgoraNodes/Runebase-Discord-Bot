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
    life: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    mana: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    stamina: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ConditionModel = sequelize.define('condition', modelDefinition, modelOptions);

  ConditionModel.associate = function (model) {
    ConditionModel.hasOne(model.UserClass, {
      as: 'condition',
      foreignKey: 'conditionId'
    });
  };

  return ConditionModel;
};