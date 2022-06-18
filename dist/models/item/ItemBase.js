"use strict";

module.exports = function (sequelize, DataTypes) {
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
    levelReq: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    strengthReq: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    dexterityReq: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    levelMonster: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    durability: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    sockets: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    minDefense: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    maxDefense: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    minDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    maxDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    minThrowDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    maxThrowDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    block: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    maxStack: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    slots: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ItemBaseModel = sequelize.define('itemBase', modelDefinition, modelOptions);

  ItemBaseModel.associate = function (model) {
    ItemBaseModel.belongsTo(model.itemFamily); // ItemBaseModel.hasOne(model.itemCategory);

    ItemBaseModel.belongsTo(model.itemDifficulty);
  };

  return ItemBaseModel;
};