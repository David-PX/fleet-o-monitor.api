// Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { initializeSocket, getIo } = require('./src/services/socket');

// sequelize orm
const { sequelize } = require('./src/models');
// const { seedGPSModels } = require('./src/seeders/seed');

// routes
const vehicleRoutes = require('./src/routes/vehicles.routes');
const rentRoutes = require('./src/routes/rents.routes');
const driverRoutes = require('./src/routes/drivers.routes');
const gpsRoutes = require('./src/routes/gps.routes');
const twilioRoutes = require('./src/routes/twilio.routes');
const gpsModelRoutes = require('./src/routes/gps-model.routes');
const { createMessage } = require('./src/services/twilio.service');

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
  res.send('Fleet-o-monitor API is running...');
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database Connection has been established successfully.');
    server.listen(PORT, async () => {
      console.log(`🚀 Server running on ${PORT}`);
      // await seedGPSModels();
      initializeSocket(server);

      const routeCoordinates = [
        { lat: 18.48769, lng: -69.964547 },
        { lat: 18.487548, lng: -69.964354 },
        { lat: 18.487234, lng: -69.964025 },
        { lat: 18.486998, lng: -69.9638 },
        { lat: 18.48665, lng: -69.9636 },
        { lat: 18.4862, lng: -69.96355 },
        { lat: 18.4858, lng: -69.9638 },
        { lat: 18.4855, lng: -69.9641 },
        { lat: 18.48525, lng: -69.9645 },
        { lat: 18.4851, lng: -69.965 },
        { lat: 18.48515, lng: -69.9654 },
        { lat: 18.4854, lng: -69.9659 },
        { lat: 18.48575, lng: -69.9662 },
        { lat: 18.4861, lng: -69.9663 },
        { lat: 18.4865, lng: -69.96625 },
        { lat: 18.4869, lng: -69.9661 },
        { lat: 18.4873, lng: -69.9658 },
        { lat: 18.4876, lng: -69.9655 },
        { lat: 18.48775, lng: -69.9652 },
        { lat: 18.4878, lng: -69.9649 },
        { lat: 18.48769, lng: -69.964547 },
      ];

      let index = 0;
      // setInterval(() => {
      //   const id = uuidv4();
      //   const io = getIo();
      //   const data = { id, latitude: routeCoordinates[index].lat,
      //     longitude: routeCoordinates[index].lng  }
      //   io.emit('location', data);
      //   console.log('Message sent successfully', data);
      //   index = (index + 1) % routeCoordinates.length;
      // }, 5000);
    });
  })
  .catch((error) => console.error('❌ Error connecting to database:', error));
