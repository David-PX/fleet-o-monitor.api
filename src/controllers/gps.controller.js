require("dotenv").config();
const { io } = require("../../server");
const createMessage = require("../services/twilio.service");

// Models
const { Vehicle } = require("../models");
const { Alert } = require("../models");

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

const receiveNotification = async (req, res) => {
    try {
      const { From, Body } = req.body;
      console.log(`Received From ${From}: ${Body}`);
  
      let alertType = "";
      if (Body.toLowerCase().includes("low battery")) {
        alertType = "Low Battery";
      } else if (Body.toLowerCase().includes("power alarm")) {
        alertType = "Power Off";
      } else {
        return res.status(400).json({ message: "Unknown alert type" });
      }
  
      const alert = await Alert.create({
        gpsNumber: From,
        type: alertType,
        message: Body,
      });
  
      io.emit("new_alert", alert);
  
      res.json({ message: "Notification received successfully", alertType });
    } catch (error) {
      console.error("Error processing GPS alert:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = {
  shutDownVehicle,
  turnOnVehicle,
  receiveNotification,
};
