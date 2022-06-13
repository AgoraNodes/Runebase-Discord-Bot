module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    diceOne: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    diceTwo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    payout: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expRewarded: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const RollDiceModel = sequelize.define('rollDice', modelDefinition, modelOptions);

  RollDiceModel.associate = (model) => {
    RollDiceModel.belongsTo(model.user);
    RollDiceModel.hasOne(model.activity);
  };

  return RollDiceModel;
};
