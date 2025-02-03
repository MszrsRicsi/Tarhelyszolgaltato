const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes'));
router.use('/services', require('./services.routes'));
router.use('/subscriptions', require('./subscription.routes'));

module.exports = router;