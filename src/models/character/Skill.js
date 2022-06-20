module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    row: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    column: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const SkillModell = sequelize.define('skill', modelDefinition, modelOptions);

  SkillModell.associate = (model) => {
    SkillModell.belongsTo(model.skillTree);
    SkillModell.belongsToMany(
      model.UserClass,
      {
        through: 'UserClassSkill',
      },
    );
    SkillModell.belongsToMany(
      model.skill,
      {
        through: model.SkillSkill,
        as: 'CurrentSkill',
        foreignKey: 'currentSkillId',
      },
    );
    SkillModell.belongsToMany(
      model.skill,
      {
        through: model.SkillSkill,
        as: 'PreviousSkill',
        foreignKey: 'previousSkillId',
      },
    );
  };

  return SkillModell;
};
