require('dotenv').config();
const createMessage = require('../services/twilio.service');

// Models
const { Vehicle, GpsAlert, GPSModel } = require('../models');
const { getIo } = require('../services/socket');

const shutDownVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByPk(vehicleId, { include: 'gpsModel' });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (!vehicle.gpsNumber)
      return res.status(400).json({ message: 'Vehicle does not have a GPS number' });
    if (!vehicle.gpsModel)
      return res.status(400).json({ message: 'Vehicle does not have an assigned GPS model' });

    const command = vehicle.gpsModel.stopCommand;

    const response = await createMessage(vehicle.gpsNumber, command);

    if (!response.success) {
      return res.status(500).json({ message: 'Failed to send SMS', error: response.error });
    }

    res.json({ message: 'Vehicle engine blocked successfully', sid: response.sid });
  } catch (error) {
    console.error('Error blocking vehicle engine:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const turnOnVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByPk(vehicleId, { include: 'gpsModel' });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (!vehicle.gpsNumber)
      return res.status(400).json({ message: 'Vehicle does not have a GPS number' });

    if (!vehicle.gpsModel)
      return res.status(400).json({ message: 'Vehicle does not have an assigned GPS model' });

    const command = vehicle.gpsModel.resumeCommand;

    const response = await createMessage(vehicle.gpsNumber, command);

    if (!response.success) {
      return res.status(500).json({ message: 'Failed to send SMS', error: response.error });
    }

    res.json({ message: 'Vehicle engine unblocked successfully', sid: response.sid });
  } catch (error) {
    console.error('Error unblocking vehicle engine:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const setSpeedAlert = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { speedLimit } = req.body; // Velocidad en km/h

    const vehicle = await Vehicle.findByPk(vehicleId, { include: 'gpsModel' });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (!vehicle.gpsNumber)
      return res.status(400).json({ message: 'Vehicle does not have a GPS number' });
    if (!vehicle.gpsModel)
      return res.status(400).json({ message: 'Vehicle does not have an assigned GPS model' });

    // Comando de alerta de velocidad personalizado
    const command = vehicle.gpsModel.speedAlertCommand.replace(
      '080',
      speedLimit.toString().padStart(3, '0'),
    );

    const response = await createMessage(vehicle.gpsNumber, command);

    if (!response.success) {
      return res.status(500).json({ message: 'Failed to send SMS', error: response.error });
    }

    res.json({ message: `Speed alert set to ${speedLimit} km/h successfully`, sid: response.sid });
  } catch (error) {
    console.error('Error setting speed alert:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getDoorStatus = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByPk(vehicleId, { include: 'gpsModel' });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (!vehicle.gpsNumber)
      return res.status(400).json({ message: 'Vehicle does not have a GPS number' });
    if (!vehicle.gpsModel)
      return res.status(400).json({ message: 'Vehicle does not have an assigned GPS model' });

    const command = vehicle.gpsModel.doorStatusCommand;

    const response = await createMessage(vehicle.gpsNumber, command);

    if (!response.success) {
      return res.status(500).json({ message: 'Failed to send SMS', error: response.error });
    }

    res.json({ message: 'Door status request sent successfully', sid: response.sid });
  } catch (error) {
    console.error('Error requesting door status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const receiveNotification = async (req, res) => {
  try {
    const { From, Body } = req.body;
    console.log(`Received From ${From}: ${Body.toLowerCase()}`);

    const vehicle = await Vehicle.findOne({ where: { gpsNumber: From }, include: 'gpsModel' });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (!vehicle.gpsModel)
      return res.status(400).json({ message: 'Vehicle does not have an assigned GPS model' });

    const { gpsModel } = vehicle;
    let alertType = '';

    if (Body.toLowerCase().includes(gpsModel.lowBatteryMessage)) {
      alertType = 'Low Battery';
    } else if (Body.toLowerCase().includes('power off')) {
      alertType = 'Power Off';
    } else if (Body.toLowerCase().includes(gpsModel.ignitionOnMessage)) {
      alertType = 'Ignition On';
    } else if (Body.toLowerCase().includes(gpsModel.ignitionOffMessage)) {
      alertType = 'Ignition Off';
    } else if (Body.toLowerCase().includes('speed')) {
      alertType = 'Over Speeding';
    } else if (Body.toLowerCase().includes(gpsModel.doorStatusCommand)) {
      alertType = 'Door Status Changed';
    } else {
      return res.status(400).json({ message: 'Unknown alert type' });
    }

    const alert = await GpsAlert.create({
      gpsNumber: From,
      type: alertType,
      message: Body,
    });

    const io = getIo();
    io.emit('new_alert', { msg: alert });

    res.json({ message: 'Notification received successfully', alertType });
  } catch (error) {
    console.error('Error processing GPS alert:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  shutDownVehicle,
  turnOnVehicle,
  setSpeedAlert,
  getDoorStatus,
  receiveNotification,
};
