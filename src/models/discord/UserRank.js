module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const UserRankModel = sequelize.define('UserRank', modelDefinition, modelOptions);

  UserRankModel.associate = (model) => {
  };

  return UserRankModel;
};
