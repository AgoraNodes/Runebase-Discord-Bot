module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const PreviousSkillModel = sequelize.define('SkillSkill', modelDefinition, modelOptions);

  PreviousSkillModel.associate = (model) => {
    // PreviousSkillModel.belongsTo(model.skill, {
    //   foreignKey: 'currentSkillId',
    // });
    // PreviousSkillModel.belongsTo(model.skill, {
    //   foreignKey: 'previousSkillId',
    // });
  };

  return PreviousSkillModel;
};
