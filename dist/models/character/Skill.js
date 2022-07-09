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
    row: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    column: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    passive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var SkillModell = sequelize.define('skill', modelDefinition, modelOptions);

  SkillModell.associate = function (model) {
    SkillModell.belongsTo(model.skillTree); // SkillModell.hasMany(model.UserClassSkill);

    SkillModell.belongsToMany(model.UserClass, {
      through: 'UserClassSkill'
    });
    SkillModell.belongsToMany(model.skill, {
      through: model.SkillSkill,
      as: 'CurrentSkill',
      foreignKey: 'previousSkillId'
    });
    SkillModell.belongsToMany(model.skill, {
      through: model.SkillSkill,
      as: 'PreviousSkill',
      foreignKey: 'currentSkillId'
    });
  };

  return SkillModell;
};