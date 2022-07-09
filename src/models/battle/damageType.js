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
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const DamageTypeModel = sequelize.define('damageType', modelDefinition, modelOptions);

  DamageTypeModel.associate = (model) => {
    DamageTypeModel.hasMany(model.monsterAttack);
  };

  return DamageTypeModel;
};
