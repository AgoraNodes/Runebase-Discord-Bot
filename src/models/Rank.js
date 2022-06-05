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
    expNeeded: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discordRankRoleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const RankModel = sequelize.define('rank', modelDefinition, modelOptions);

  RankModel.associate = (model) => {
    RankModel.belongsToMany(
      model.user,
      { through: 'UserRank' },
    );
  };

  return RankModel;
};
