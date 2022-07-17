module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    points: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const UserClassSkillModel = sequelize.define('UserGroupClassSkill', modelDefinition, modelOptions);

  UserClassSkillModel.associate = (model) => {
    UserClassSkillModel.belongsTo(model.skill, {
      foreignKey: 'skillId',
    });
    UserClassSkillModel.belongsTo(model.UserGroupClass, {
      foreignKey: 'UserGroupClassId',
    });
  };

  return UserClassSkillModel;
};
