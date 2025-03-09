const { Vehicle, GPSModel, Driver } = require('../models');

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { make, model, plate, vin, fuelType, available, gpsNumber, gpsModelId, driverId } =
      req.body;

    if (gpsModelId) {
      const gpsModel = await GPSModel.findByPk(gpsModelId);
      if (!gpsModel) return res.status(404).json({ message: 'GPS model not found' });
    }

    if (driverId) {
      const driver = await Driver.findByPk(driverId);
      if (!driver) return res.status(404).json({ message: 'Driver not found' });
    }

    const newVehicle = await Vehicle.create({
      make,
      model,
      plate,
      vin,
      fuelType,
      available,
      gpsNumber,
      gpsModelId,
      driverId,
      isOn: false,
      batteryLevel: 100,
      lastUpdate: new Date(),
      latitude: null,
      longitude: null,
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    if (req.body.driverId) {
      const driver = await Driver.findByPk(req.body.driverId);
      if (!driver) return res.status(404).json({ message: 'Driver not found' });
    }

    await vehicle.update(req.body);
    res.json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
