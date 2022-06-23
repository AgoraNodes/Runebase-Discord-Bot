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
  const UserClassModel = sequelize.define('UserClass', modelDefinition, modelOptions);

  UserClassModel.associate = (model) => {
    UserClassModel.belongsTo(model.stats, {
      as: 'stats',
      foreignKey: 'statsId',
    });
    UserClassModel.belongsTo(model.condition, {
      as: 'condition',
      foreignKey: 'conditionId',
    });
    UserClassModel.belongsTo(model.inventory, {
      as: 'inventory',
      foreignKey: 'inventoryId',
    });
    UserClassModel.belongsTo(model.equipment, {
      as: 'equipment',
      foreignKey: 'equipmentId',
    });
    UserClassModel.belongsTo(model.user, {
      foreignKey: 'userId',
    });
    UserClassModel.belongsTo(model.class);
    UserClassModel.belongsToMany(
      model.skill,
      {
        as: 'UserSkills',
        through: 'UserClassSkill',
      },
    );
    UserClassModel.belongsTo(model.UserClassSkill, {
      as: 'selectedMainSkill',
      foreignKey: 'selectedMainSkillId',
    });
    UserClassModel.belongsTo(model.UserClassSkill, {
      as: 'selectedSecondarySkill',
      foreignKey: 'selectedSecondarySkillId',
    });
    UserClassModel.hasMany(model.UserClassSkill);
    UserClassModel.hasMany(model.battle);
  };

  return UserClassModel;
};
