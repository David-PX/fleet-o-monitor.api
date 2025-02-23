require("dotenv").config();
const createMessage = require("../services/twilio.service");
const { Vehicle } = require("../models");


const shutDownVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (!vehicle.gpsNumber) return res.status(400).json({ message: "Vehicle does not have a GPS number" });

    const response = await createMessage(vehicle.gpsNumber, "stop123456"); 

    if (!response.success) {
      return res.status(500).json({ message: "Failed to send SMS", error: response.error });
    }

    res.json({ message: "Vehicle engine blocked successfully", sid: response.sid });
  } catch (error) {
    console.error("Error blocking vehicle engine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const turnOnVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (!vehicle.gpsNumber) return res.status(400).json({ message: "Vehicle does not have a GPS number" });

    const response = await createMessage(vehicle.gpsNumber, "resume123456");

    if (!response.success) {
      return res.status(500).json({ message: "Failed to send SMS", error: response.error });
    }

    res.json({ message: "Vehicle engine unblocked successfully", sid: response.sid });
  } catch (error) {
    console.error("Error unblocking vehicle engine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  shutDownVehicle,
  turnOnVehicle
};
