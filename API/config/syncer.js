const { Service } = require("../models/service.model");
const { Subscription } = require("../models/subscription.model");
const { User } = require("../models/user.model");

User.hasOne(Subscription, {foreignKey: "userID"});
Subscription.belongsTo(User, {foreignKey: "userID"});

Service.hasMany(Subscription, {foreignKey: "csomagID"});
Subscription.belongsTo(Service, {foreignKey: "csomagID"});