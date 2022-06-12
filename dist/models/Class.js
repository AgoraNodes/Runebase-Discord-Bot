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
    strength: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    dexterity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    vitality: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    energy: {
      type: DataTypes.SMALLINT,
      allowNull: false
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

  var ClassModel = sequelize.define('class', modelDefinition, modelOptions);

  ClassModel.associate = function (model) {
    ClassModel.belongsTo(model.classDescription);
    ClassModel.belongsToMany(model.user, {
      through: 'UserClass'
    });
  };

  return ClassModel;
};