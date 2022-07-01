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
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var BattleModel = sequelize.define('battle', modelDefinition, modelOptions);

  BattleModel.associate = function (model) {
    BattleModel.belongsTo(model.UserClass);
    BattleModel.hasMany(model.battleLog);
    BattleModel.hasMany(model.BattleMonster); // BattleModel.belongsTo(model.BattleMonster, {
    //   as: 'currentSelectedMonster',
    //   foreignKey: 'currentSelectedMonsterId',
    // });
    // BattleModel.hasMany(model.battleLog);

    BattleModel.belongsToMany(model.monster, {
      through: 'BattleMonster'
    });
  };

  return BattleModel;
};