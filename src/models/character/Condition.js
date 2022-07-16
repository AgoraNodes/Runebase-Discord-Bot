module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    life: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    mana: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    stamina: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ConditionModel = sequelize.define('condition', modelDefinition, modelOptions);

  ConditionModel.associate = (model) => {
    ConditionModel.hasOne(model.UserGroupClass, {
      as: 'condition',
      foreignKey: 'conditionId',
    });
  };

  return ConditionModel;
};
