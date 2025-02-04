const { Service } = require('../models/service.model');

exports.getAllServices = async () => {
    return await Service.findAll();
}

exports.getServiceByID = async (id) => {
    return await Service.findOne({where: {id}});
}