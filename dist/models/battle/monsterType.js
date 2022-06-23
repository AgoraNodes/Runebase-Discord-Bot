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

  var MonsterTypeModel = sequelize.define('monsterType', modelDefinition, modelOptions);

  MonsterTypeModel.associate = function (model) {
    MonsterTypeModel.hasMany(model.monster);
  };

  return MonsterTypeModel;
};