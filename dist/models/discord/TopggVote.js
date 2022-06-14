"use strict";

module.exports = function (sequelize, DataTypes) {
  // 1: The model schema.
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var TopggVoteModel = sequelize.define('topggVote', modelDefinition, modelOptions);

  TopggVoteModel.associate = function (model) {
    TopggVoteModel.belongsTo(model.user);
    TopggVoteModel.hasOne(model.activity);
  };

  return TopggVoteModel;
};