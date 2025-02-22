const express = require("express");
const router = express.Router();
const { Vehicle } = require("../models");

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.findAll();
  res.json(vehicles);
});

router.post("/", async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json(vehicle);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Vehicle.update(req.body, { where: { id } });
  res.json({ message: "Car updated" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Vehicle.destroy({ where: { id } });
  res.json({ message: "Car deleted" });
});

module.exports = router;
