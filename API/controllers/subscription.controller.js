const subscriptionService = require('../services/subscription.service');

exports.getAllSubsriptions = async (req, res, next) => {
    try{
        const subs = await subscriptionService.getAllSubsriptions();
        res.status(200).json({success:true, results: subs});
    }catch(error){
        next(error);
    }
}