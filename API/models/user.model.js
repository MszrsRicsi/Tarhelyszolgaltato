const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
});

module.exports = { User };