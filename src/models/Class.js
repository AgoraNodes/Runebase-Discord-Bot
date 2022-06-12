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
    strength: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    dexterity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    vitality: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    energy: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    life: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    mana: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    stamina: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ClassModel = sequelize.define('class', modelDefinition, modelOptions);

  ClassModel.associate = (model) => {
    ClassModel.belongsTo(model.classDescription);
  };

  return ClassModel;
};
