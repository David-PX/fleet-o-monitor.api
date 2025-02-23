const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gps.controller");

router.post("/vehicle/:vehicleId/block", gpsController.shutDownVehicle);
router.post("/vehicle/:vehicleId/unblock", gpsController.turnOnVehicle);
router.post("/notification", gpsController.receiveNotification);

module.exports = router;
