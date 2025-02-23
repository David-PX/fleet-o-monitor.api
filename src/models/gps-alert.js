module.exports = (sequelize, DataTypes) => {
    const Alert = sequelize.define("GpsAlert", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      gpsNumber: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
    });
  
    return Alert;
  };
  