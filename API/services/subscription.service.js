const { Subscription } = require('../models/subscription.model');

exports.getAllSubsriptions = async () => {
    return await Subscription.findAll();
}

exports.getAllSubsriptionByUserID = async (userID) => {
    return await Subscription.findOne({where: {userID}});
}

exports.createSubsription = async (userID, serviceID) => {
    return await Subscription.create({
        userID: userID,
        csomagID: serviceID
    });
}

exports.revokeSubsriptionByID = async (userID, subsID) => {
    return await Subscription.destroy({where: {csomagID: subsID, userID: userID}});
}