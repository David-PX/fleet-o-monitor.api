const { GPSModel } = require('../models');

const getAllGPSModels = async (req, res) => {
  try {
    const gpsModels = await GPSModel.findAll();
    res.json(gpsModels);
  } catch (error) {
    console.error('Error fetching GPS models:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getGPSModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const gpsModel = await GPSModel.findByPk(id);

    if (!gpsModel) return res.status(404).json({ message: 'GPS Model not found' });

    res.json(gpsModel);
  } catch (error) {
    console.error('Error fetching GPS model:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createGPSModel = async (req, res) => {
  try {
    const {
      name,
      stopCommand,
      resumeCommand,
      speedAlertCommand,
      locationCommand,
      doorStatusCommand,
      lowBatteryMessage,
      powerOffMessage,
      ignitionOnMessage,
      ignitionOffMessage,
      overSpeedMessage,
      doorStatusChangeMessage,
    } = req.body;

    const newGPSModel = await GPSModel.create({
      name,
      stopCommand,
      resumeCommand,
      speedAlertCommand,
      locationCommand,
      doorStatusCommand,
      lowBatteryMessage,
      powerOffMessage,
      ignitionOnMessage,
      ignitionOffMessage,
      overSpeedMessage,
      doorStatusChangeMessage,
    });

    res.status(201).json(newGPSModel);
  } catch (error) {
    console.error('Error creating GPS model:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGPSModel = async (req, res) => {
  try {
    const { id } = req.params;
    const gpsModel = await GPSModel.findByPk(id);

    if (!gpsModel) return res.status(404).json({ message: 'GPS Model not found' });

    await gpsModel.update(req.body);

    res.json({ message: 'GPS Model updated successfully', gpsModel });
  } catch (error) {
    console.error('Error updating GPS model:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteGPSModel = async (req, res) => {
  try {
    const { id } = req.params;
    const gpsModel = await GPSModel.findByPk(id);

    if (!gpsModel) return res.status(404).json({ message: 'GPS Model not found' });

    await gpsModel.destroy();

    res.json({ message: 'GPS Model deleted successfully' });
  } catch (error) {
    console.error('Error deleting GPS model:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllGPSModels,
  getGPSModelById,
  createGPSModel,
  updateGPSModel,
  deleteGPSModel,
};
