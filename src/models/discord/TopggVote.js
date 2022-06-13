module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
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
  const TopggVoteModel = sequelize.define('topggVote', modelDefinition, modelOptions);

  TopggVoteModel.associate = (model) => {
    TopggVoteModel.belongsTo(model.user);
    TopggVoteModel.hasOne(model.activity);
  };

  return TopggVoteModel;
};
