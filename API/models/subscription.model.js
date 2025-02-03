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
        allowNull: false
    },
    csomagID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = { Subscription };