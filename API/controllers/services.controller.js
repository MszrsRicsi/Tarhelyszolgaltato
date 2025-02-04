const servicesService = require('../services/services.service');

exports.getAllServices = async (req, res, next) => {
    try{
        const ser = await servicesService.getAllServices();
        res.status(200).json({success:true, results: ser});
    }catch(error){
        next(error);
    }
}

exports.getServiceByID = async (req, res, next) => {
    try{
        const ser = await servicesService.getServiceByID(req.params.id);
        res.status(200).json({success:true, results: ser});
    }catch(error){
        next(error);
    }
}