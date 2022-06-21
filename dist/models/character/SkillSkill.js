"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var PreviousSkillModel = sequelize.define('SkillSkill', modelDefinition, modelOptions);

  PreviousSkillModel.associate = function (model) {// PreviousSkillModel.belongsTo(model.skill, {
    //   foreignKey: 'currentSkillId',
    // });
    // PreviousSkillModel.belongsTo(model.skill, {
    //   foreignKey: 'previousSkillId',
    // });
  };

  return PreviousSkillModel;
};