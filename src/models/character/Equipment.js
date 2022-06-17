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
  const EquipmentModel = sequelize.define('equipment', modelDefinition, modelOptions);

  EquipmentModel.associate = (model) => {
    EquipmentModel.hasOne(model.UserClass, {
      as: 'equipment',
      foreignKey: 'equipmentId',
    });
  };

  return EquipmentModel;
};
