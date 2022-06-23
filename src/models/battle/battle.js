module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const BattleModel = sequelize.define('battle', modelDefinition, modelOptions);

  BattleModel.associate = (model) => {
    BattleModel.belongsTo(model.UserClass);
    BattleModel.hasMany(model.battleLog);
    BattleModel.hasMany(model.BattleMonster);
    // BattleModel.hasMany(model.battleLog);
    BattleModel.belongsToMany(
      model.monster,
      {
        through: 'BattleMonster',
      },
    );
  };

  return BattleModel;
};
