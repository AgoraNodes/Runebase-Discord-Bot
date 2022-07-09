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
      allowNull: false,
    },
    maxDmg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minAr: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxAr: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ranged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    defaultAttack: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    chance: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const MonsterAttackModel = sequelize.define('monsterAttack', modelDefinition, modelOptions);

  MonsterAttackModel.associate = (model) => {
    MonsterAttackModel.belongsTo(model.monster);
    MonsterAttackModel.belongsTo(model.damageType);
  };

  return MonsterAttackModel;
};
