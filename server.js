require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const vehicleRoutes = require("./routes/vehicles");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.send("Fleet-o-monitor API is running...");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  })
  .catch((error) => console.error("❌ Error connecting to database:", error));
