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
  const UserGroupClassModel = sequelize.define('UserGroupClass', modelDefinition, modelOptions);

  UserGroupClassModel.associate = (model) => {
    UserGroupClassModel.belongsTo(model.stats, {
      as: 'stats',
      foreignKey: 'statsId',
    });
    UserGroupClassModel.belongsTo(model.condition, {
      as: 'condition',
      foreignKey: 'conditionId',
    });
    UserGroupClassModel.belongsTo(model.inventory, {
      as: 'inventory',
      foreignKey: 'inventoryId',
    });
    UserGroupClassModel.belongsTo(model.equipment, {
      as: 'equipment',
      foreignKey: 'equipmentId',
    });
    UserGroupClassModel.belongsTo(model.UserGroup, {
      foreignKey: 'UserGroupId',
    });
    UserGroupClassModel.belongsTo(model.class);
    UserGroupClassModel.belongsToMany(
      model.skill,
      {
        as: 'UserSkills',
        through: 'UserGroupClassSkill',
      },
    ); // ?
    UserGroupClassModel.belongsTo(model.UserGroupClassSkill, {
      as: 'selectedMainSkill',
      foreignKey: 'selectedMainSkillId',
    });
    UserGroupClassModel.belongsTo(model.UserGroupClassSkill, {
      as: 'selectedSecondarySkill',
      foreignKey: 'selectedSecondarySkillId',
    });
    UserGroupClassModel.hasMany(model.UserGroupClassSkill);
    UserGroupClassModel.hasMany(model.battle);
    UserGroupClassModel.hasMany(model.buff);
    UserGroupClassModel.hasMany(model.debuff);
  };

  return UserGroupClassModel;
};
