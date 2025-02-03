const { Subscription } = require('../models/subscription.model');

exports.getAllSubsriptions = async () => {
    return await Subscription.findAll();
}