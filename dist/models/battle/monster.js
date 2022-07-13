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
    level: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    minHp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    maxHp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    exp: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    defense: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    block: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    FR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var MonsterModel = sequelize.define('monster', modelDefinition, modelOptions);

  MonsterModel.associate = function (model) {
    MonsterModel.hasMany(model.monsterAttack);
    MonsterModel.belongsTo(model.monsterType);
    MonsterModel.belongsToMany(model.battle, {
      through: 'BattleMonster'
    });
  };

  return MonsterModel;
};