module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    make: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    plate: { type: DataTypes.STRING, allowNull: false, unique: true },
    vin: { type: DataTypes.STRING, allowNull: false, unique: true },
    fuelType: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
    gpsNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
  });

  Vehicle.associate = (models) => {
    Vehicle.hasMany(models.Rent, { foreignKey: 'vehicleId', as: 'rents' });
  };

  return Vehicle;
};
