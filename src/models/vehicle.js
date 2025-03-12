module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    make: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    plate: { type: DataTypes.STRING, allowNull: false, unique: false },
    vin: { type: DataTypes.STRING, allowNull: false, unique: false },
    fuelType: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },

    gpsNumber: { type: DataTypes.STRING, allowNull: true, unique: false },
    gpsModelId: { type: DataTypes.INTEGER, allowNull: true },

    driverId: { type: DataTypes.INTEGER, allowNull: true },
    isOn: { type: DataTypes.BOOLEAN, defaultValue: true },
    batteryLevel: { type: DataTypes.INTEGER, defaultValue: 100 },
    lastUpdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
  });

  // TODO: UNCOMMENT THIS CODE WHEN RENTS ARE IMPLEMENTED
  // Vehicle.associate = (models) => {
  //   Vehicle.hasMany(models.Rent, { foreignKey: 'vehicleId', as: 'rents' });
  // };

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.GPSModel, { foreignKey: 'gpsModelId', as: 'gpsModel' });
    Vehicle.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
  };

  return Vehicle;
};
