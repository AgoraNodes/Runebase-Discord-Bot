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

  var SkillTreeModel = sequelize.define('skillTree', modelDefinition, modelOptions);

  SkillTreeModel.associate = function (model) {
    SkillTreeModel.hasMany(model.skill);
    SkillTreeModel.belongsTo(model["class"]);
  };

  return SkillTreeModel;
};