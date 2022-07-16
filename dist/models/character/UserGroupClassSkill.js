"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    points: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var UserClassSkillModel = sequelize.define('UserGroupClassSkill', modelDefinition, modelOptions);

  UserClassSkillModel.associate = function (model) {
    UserClassSkillModel.belongsTo(model.skill, {
      foreignKey: 'skillId'
    });
    UserClassSkillModel.belongsTo(model.UserGroupClass, {
      foreignKey: 'UserGroupClassId'
    });
    UserClassSkillModel.belongsTo(model.UserGroupClass, {
      foreignKey: 'UserClassId'
    }); // remove this after moving with seeds
  };

  return UserClassSkillModel;
};