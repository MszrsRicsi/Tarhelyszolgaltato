const { Service } = require('../models/service.model');

exports.getAllServices = async (req, res, next) => {
    try{
        res.status(200).json({success:true, results: await Service.findAll()});
    }catch(error){
        next(error);
    }
}

exports.getServiceByID = async (req, res, next) => {
    if (!req.params.id)
    {
        return res.status(400).json({ message: 'Hiányzó adatok!'});
    }

    try{
        res.status(200).json({success:true, results: await Service.findOne({where: {id: req.params.id}})});
    }catch(error){
        next(error);
    }
}

exports.updateServiceByID = async (req, res, next) => {
    if (!req.params.id || !req.body.name)
    {
        return res.status(400).json({ message: 'Hiányzó adatok!'});
    }

    try{
        res.status(200).json({success:true, results: await Service.update(
            {name: req.body.name},
            {where: {id: req.params.id}}
        )});
    }catch(error){
        next(error);
    }
}