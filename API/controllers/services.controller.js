const servicesService = require('../services/services.service');

exports.getAllServices = async (req, res, next) => {
    try{
        const subs = await servicesService.getAllServices();
        res.status(200).json({success:true, results: subs});
    }catch(error){
        next(error);
    }
}