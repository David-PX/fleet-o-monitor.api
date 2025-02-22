const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rentController");

router.get("/", rentController.getAllRents);
router.get("/:id", rentController.getRentById);
router.post("/", rentController.createRent);
router.put("/:id/return", rentController.returnVehicle);
router.put("/:id/cancel", rentController.cancelRent);

module.exports = router;
