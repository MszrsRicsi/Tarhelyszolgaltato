const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, subscriptionController.getAllSubsriptions);

router.get('/:userID', authMiddleware, subscriptionController.getSubsriptionByUserID);

router.post('/:userID/:serviceID', authMiddleware, subscriptionController.createSubsription);

router.delete('/:userID/:serviceID', authMiddleware, subscriptionController.revokeSubsriptionByID);

router.get('/get/AllRelated', authMiddleware, subscriptionController.getAllRelated);

module.exports = router;