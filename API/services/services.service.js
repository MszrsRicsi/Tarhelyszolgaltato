const { Service } = require('../models/service.model');

exports.getAllServices = async () => {
    return await Service.findAll();
}