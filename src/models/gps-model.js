module.exports = (sequelize, DataTypes) => {
  const GPSModel = sequelize.define('GPSModel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true, unique: true },

    stopCommand: { type: DataTypes.STRING, allowNull: true },
    resumeCommand: { type: DataTypes.STRING, allowNull: true },
    speedAlertCommand: { type: DataTypes.STRING, allowNull: true },
    locationCommand: { type: DataTypes.STRING, allowNull: true },
    doorStatusCommand: { type: DataTypes.STRING, allowNull: true },

    lowBatteryMessage: { type: DataTypes.STRING, allowNull: false },
    powerOffMessage: { type: DataTypes.STRING, allowNull: false },
    ignitionOnMessage: { type: DataTypes.STRING, allowNull: false },
    ignitionOffMessage: { type: DataTypes.STRING, allowNull: false },
    overSpeedMessage: { type: DataTypes.STRING, allowNull: false },
    doorStatusChangeMessage: { type: DataTypes.STRING, allowNull: false },
  });

  return GPSModel;
};
