const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, subscriptionController.getAllSubsriptions);

router.get('/:userID', authMiddleware, subscriptionController.getAllSubsriptionByUserID);

router.post('/:userID/:serviceID', authMiddleware, subscriptionController.createSubsription);

router.delete('/:userID/:serviceID', authMiddleware, subscriptionController.revokeSubsriptionByID);

module.exports = router;