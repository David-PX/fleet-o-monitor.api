module.exports = (sequelize, DataTypes) => {
    const Rent = sequelize.define("Rent", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      driverId: { type: DataTypes.INTEGER, allowNull: false },
      vehicleId: { type: DataTypes.INTEGER, allowNull: false },
      rentedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      expectedReturnAt: { type: DataTypes.DATE, allowNull: false },
      returnedAt: { type: DataTypes.DATE, allowNull: true }, 
      status: {
        type: DataTypes.ENUM("ongoing", "completed", "canceled"),
        defaultValue: "ongoing",
      },
    });
  
    Rent.associate = (models) => {
      Rent.belongsTo(models.Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
      Rent.belongsTo(models.Driver, { foreignKey: "driverId", as: "driver" });
    };
  
    return Rent;
  };
  