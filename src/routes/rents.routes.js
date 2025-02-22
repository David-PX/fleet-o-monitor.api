const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rents.controller");

router.get("/", rentController.getAllRents);
router.get("/:id", rentController.getRentById);
router.get("/driver/:driverId", rentController.getRentsByDriver);
router.post("/", rentController.createRent);
router.put("/:id/return", rentController.returnVehicle);
router.put("/:id/cancel", rentController.cancelRent);

module.exports = router;
