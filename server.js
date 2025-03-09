// Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { initializeSocket, getIo } = require('./src/services/socket');

// sequelize orm
const { sequelize } = require('./src/models');
const { seedGPSModels } = require('./src/seeders/seed');

// routes
const vehicleRoutes = require('./src/routes/vehicles.routes');
const rentRoutes = require('./src/routes/rents.routes');
const driverRoutes = require('./src/routes/drivers.routes');
const gpsRoutes = require('./src/routes/gps.routes');
const twilioRoutes = require('./src/routes/twilio.routes');
const gpsModelRoutes = require('./src/routes/gps-model.routes');
const createMessage = require('./src/services/twilio.service');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/rents', rentRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/gps', gpsRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/gps-models', gpsModelRoutes);

app.get('/', async (req, res) => {
  const io = getIo();
  io.emit('mensaje', { msg: 'Hello from server!' });
  const response = await createMessage('+18492202181', 'HOLA');
  res.send('Fleet-o-monitor API is running...');
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database Connection has been established successfully.');
    server.listen(PORT, async () => {
      console.log(`🚀 Server running on ${PORT}`);
      await seedGPSModels();
      initializeSocket(server);

      const io = getIo();
      setInterval(() => {
        const latitude = -69.8941572163946;
        const longitude = 18.502440213256392;
        const id = uuidv4();
        const io = getIo();
        io.emit('location', { id, latitude, longitude });
        console.log('Message sent successfully');
      }, 5000);
    });
  })
  .catch((error) => console.error('❌ Error connecting to database:', error));
