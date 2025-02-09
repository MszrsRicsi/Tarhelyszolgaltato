const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, servicesController.getAllServices);

router.get('/:id', authMiddleware, servicesController.getServiceByID);

router.patch('/:id', authMiddleware, servicesController.updateServiceByID);

module.exports = router;