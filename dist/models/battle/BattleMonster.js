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
    currentHp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    maxHp: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var BattleMonsterModel = sequelize.define('BattleMonster', modelDefinition, modelOptions);

  BattleMonsterModel.associate = function (model) {
    BattleMonsterModel.belongsTo(model.battle);
    BattleMonsterModel.belongsTo(model.monster);
  };

  return BattleMonsterModel;
};