module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    currentHp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    maxHp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const BattleMonsterModel = sequelize.define('BattleMonster', modelDefinition, modelOptions);

  BattleMonsterModel.associate = (model) => {
    BattleMonsterModel.hasMany(model.debuff);
    BattleMonsterModel.hasMany(model.buff);
    BattleMonsterModel.belongsTo(model.battle);
    BattleMonsterModel.belongsTo(model.monster);
  };

  return BattleMonsterModel;
};
