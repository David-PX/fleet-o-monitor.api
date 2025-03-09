const express = require('express');
const router = express.Router();
const gpsModelController = require('../controllers/gps-models.controller');

// 📌 Definir rutas CRUD para GPSModel
router.get('/', gpsModelController.getAllGPSModels);
router.get('/:id', gpsModelController.getGPSModelById);
router.post('/', gpsModelController.createGPSModel);
router.put('/:id', gpsModelController.updateGPSModel);
router.delete('/:id', gpsModelController.deleteGPSModel);

module.exports = router;
