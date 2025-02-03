const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', servicesController.getAllServices);

module.exports = router;