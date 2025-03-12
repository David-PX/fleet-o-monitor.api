module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    licenseNumber: { type: DataTypes.STRING, allowNull: false, unique: false },
    phone: { type: DataTypes.STRING, allowNull: true, unique: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
  });

  // Driver.associate = (models) => {
  //   Driver.hasMany(models.Rent, { foreignKey: 'driverId', as: 'rents' });
  // };

  return Driver;
};
