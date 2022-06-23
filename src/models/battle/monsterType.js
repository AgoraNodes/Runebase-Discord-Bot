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
  const MonsterTypeModel = sequelize.define('monsterType', modelDefinition, modelOptions);

  MonsterTypeModel.associate = (model) => {
    MonsterTypeModel.hasMany(model.monster);
  };

  return MonsterTypeModel;
};
