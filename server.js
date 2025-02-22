require("dotenv").config();
const express = require("express");
const cors = require("cors");

// sequelize orm
const { sequelize } = require("./src/models");

// routes
const vehicleRoutes = require("./src/routes/vehicles.routes");
const rentRoutes = require("./routes/rents");
const driverRoutes = require("./routes/drivers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/drivers", driverRoutes);

app.get("/", (req, res) => {
  res.send("Fleet-o-monitor API is running...");
});

sequelize
  .sync({alter: true})
  .then(() => {
    console.log("Database Connection has been established successfully.");
    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  })
  .catch((error) => console.error("❌ Error connecting to database:", error));
