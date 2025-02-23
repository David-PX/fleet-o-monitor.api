// Server 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");


// sequelize orm
const { sequelize } = require("./src/models");

// routes
const vehicleRoutes = require("./src/routes/vehicles.routes");
const rentRoutes = require("./src/routes/rents.routes");
const driverRoutes = require("./src/routes/drivers.routes");
const gpsRoutes = require("./src/routes/gps.routes");

const app = express();
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes configuration
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/gps", gpsRoutes);

// Entry Point
app.get("/", (req, res) => {
  res.send("Fleet-o-monitor API is running...");
});

// WebSockets Connections
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


// Database Connection initialization
sequelize
  .sync({alter: true})
  .then(() => {
    console.log("Database Connection has been established successfully.");
    server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  })
  .catch((error) => console.error("❌ Error connecting to database:", error));



module.exports = { app, server, io };