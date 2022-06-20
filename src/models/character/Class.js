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
    attackRating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 50,
    },
    defense: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 50,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ClassModel = sequelize.define('class', modelDefinition, modelOptions);

  ClassModel.associate = (model) => {
    ClassModel.hasOne(model.user, {
      foreignKey: "currentClassId",
    });
    ClassModel.belongsTo(model.classDescription);
    ClassModel.belongsToMany(
      model.user,
      {
        through: 'UserClass',
      },
    );
    ClassModel.hasMany(model.skillTree);
  };

  return ClassModel;
};
