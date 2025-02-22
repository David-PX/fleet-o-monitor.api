const { Op } = require("sequelize");
const { Rent, Vehicle, Driver } = require("../models");

const getAllRents = async (req, res) => {
  try {
    const rents = await Rent.findAll({
      include: [
        { model: Vehicle, as: "vehicle" },
        { model: Driver, as: "driver" },
      ],
    });
    res.json(rents);
  } catch (error) {
    console.error("Error fetching rents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRentById = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findByPk(id, {
      include: [
        { model: Vehicle, as: "vehicle" },
        { model: Driver, as: "driver" },
      ],
    });

    if (!rent) return res.status(404).json({ message: "Rent not found" });

    res.json(rent);
  } catch (error) {
    console.error("Error fetching rent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRentsByDriver = async (req, res) => {
    try {
      const { driverId } = req.params;
      const { status } = req.query;
  
      const driver = await Driver.findByPk(driverId);
      if (!driver) return res.status(404).json({ message: "Driver not found" });

      const whereCondition = { driverId };
      if (status) {
        whereCondition.status = {
            [Op.eq]: status,
        };
      }  
  
      const rents = await Rent.findAll({
        where: whereCondition,
        include: { model: Vehicle, as: "vehicle" },
      });
  
      res.json(rents);
    } catch (error) {
      console.error("Error fetching rents for driver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const createRent = async (req, res) => {
  try {
    const { driverId, vehicleId, expectedReturnAt } = req.body;

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    if (!vehicle.available) return res.status(400).json({ message: "Vehicle is not available" });

    const driver = await Driver.findByPk(driverId);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    const rent = await Rent.create({
      driverId,
      vehicleId,
      expectedReturnAt,
      status: "ongoing",
    });

    await vehicle.update({ available: false });

    res.status(201).json({ message: "Vehicle rented successfully", rent });
  } catch (error) {
    console.error("Error creating rent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const returnVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findByPk(id);
    if (!rent) return res.status(404).json({ message: "Rent not found" });

    if (rent.status !== "ongoing") return res.status(400).json({ message: "Rent is already completed or canceled" });

    await rent.update({
      returnedAt: new Date(),
      status: "completed",
    });

    await Vehicle.update({ available: true }, { where: { id: rent.vehicleId } });

    res.json({ message: "Vehicle returned successfully", rent });
  } catch (error) {
    console.error("Error returning vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancelRent = async (req, res) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findByPk(id);
    if (!rent) return res.status(404).json({ message: "Rent not found" });

    if (rent.status !== "ongoing") return res.status(400).json({ message: "Rent is already completed or canceled" });

    await rent.update({ status: "canceled" });

    await Vehicle.update({ available: true }, { where: { id: rent.vehicleId } });

    res.json({ message: "Rent canceled successfully", rent });
  } catch (error) {
    console.error("Error canceling rent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllRents,
  getRentById,
  getRentsByDriver,
  createRent,
  returnVehicle,
  cancelRent,
};
