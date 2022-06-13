module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    strength: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    dexterity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    vitality: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    energy: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    life: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    mana: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    stamina: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const StatsModel = sequelize.define('stats', modelDefinition, modelOptions);

  StatsModel.associate = (model) => {
    StatsModel.hasOne(model.UserClass, {
      as: 'stats',
      foreignKey: 'statsId',
    });
  };

  return StatsModel;
};
