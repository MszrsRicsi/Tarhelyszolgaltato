const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Service = db.define('Service', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = { Service };