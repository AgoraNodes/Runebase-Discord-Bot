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
    minDmg: {
      type: DataTypes.INTEGER,
    },
    maxDmg: {
      type: DataTypes.INTEGER,
    },
    reducedArmor: {
      type: DataTypes.INTEGER,
    },
    stun: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    chance: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false,
    },
    rounds: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const DebuffModel = sequelize.define('debuff', modelDefinition, modelOptions);

  DebuffModel.associate = (model) => {
    DebuffModel.belongsTo(model.BattleMonster);
  };

  return DebuffModel;
};
