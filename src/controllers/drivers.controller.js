const { Driver, Rent } = require("../models");

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({ include: { model: Rent, as: "rents" } });
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id, { include: { model: Rent, as: "rents" } });

    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDriver = async (req, res) => {
  try {
    const { name, licenseNumber, phone, email } = req.body;

    const newDriver = await Driver.create({ name, licenseNumber, phone, email });

    res.status(201).json(newDriver);
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    await driver.update(req.body);
    res.json({ message: "Driver updated successfully", driver });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByPk(id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    await driver.destroy();
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
