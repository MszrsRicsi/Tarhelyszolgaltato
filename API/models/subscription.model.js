const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Subscription = db.define('Subscription', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    csomagID: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = { Subscription };