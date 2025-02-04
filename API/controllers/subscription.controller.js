const subscriptionService = require('../services/subscription.service');

exports.getAllSubsriptions = async (req, res, next) => {
    try{
        const subs = await subscriptionService.getAllSubsriptions();
        res.status(200).json({success:true, results: subs});
    }catch(error){
        next(error);
    }
}

exports.getAllSubsriptionByUserID = async (req, res, next) => {
    try{
        const subs = await subscriptionService.getAllSubsriptionByUserID(req.params.userID);
        res.status(200).json({success:true, results: subs});
    }catch(error){
        next(error);
    }
}

exports.createSubsription = async (req, res, next) => {
    try{
        if (!req.params.userID || !req.params.serviceID){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const subs = await subscriptionService.createSubsription(req.params.userID, req.params.serviceID);
        res.status(200).json(subs);
    }catch(error){
        next(error);
    }
}

exports.revokeSubsriptionByID = async (req, res, next) => {
    try{
        if (!req.params.userID || !req.params.serviceID){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const subs = await subscriptionService.revokeSubsriptionByID(req.params.userID, req.params.serviceID);
        res.status(200).json(subs);
    }catch(error){
        next(error);
    }
}