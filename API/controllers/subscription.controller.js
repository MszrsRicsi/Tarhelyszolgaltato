const { sendEmail } = require('../services/email.service');
const { User } = require('../models/user.model');
const { Service } = require('../models/service.model');
const { Subscription } = require('../models/subscription.model');
const db = require('../config/database');
const dbConnection = require('../config/mysql.connection')

function generatePassword(){
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#@%';
    let password = '';
    for(let i =0; i<12; i++){
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

exports.getAllSubsriptions = async (req, res, next) => {
    try{
        res.status(200).json({success:true, results: await Subscription.findAll()});
    }catch(error){
        next(error);
    }
}

exports.getSubsriptionByUserID = async (req, res, next) => {
    if (!req.params.userID){
        return res.status(400).json({ message: 'Hiányzó adatok!'});
    }

    try{
        res.status(200).json({success:true, results: await Subscription.findOne({where: {userID: req.params.userID}})});
    }catch(error){
        next(error);
    }
}

exports.createSubsription = async (req, res, next) => {
    if (!req.params.userID || !req.params.serviceID){
        return res.status(400).json({ message: 'Hiányzó adatok!'});
    }

    try{
        await Subscription.create({
            userID: req.params.userID,
            csomagID: req.params.serviceID
        });

        const user = await User.findOne({where: {id: req.params.userID}});
        const dbName = `13a_${user.name}`
        const sql1 = `CREATE DATABASE \`${dbName}\``;
        dbConnection.query(sql1, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            console.log({message: 'Database created successfully!', data: results});
            
        });

        const password = generatePassword();
        const sql2 = `CREATE USER '${dbName}'@'localhost' IDENTIFIED BY '${password}'`;
        dbConnection.query(sql2, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            console.log({message: 'User created successfully!', data: results, password});
        });

        const sql = `GRANT SELECT, INSERT, UPDATE, DELETE ON \`${dbName}\`.* TO '${dbName}'@'localhost'`; // GRANT SELECT, INSERT, UPDATE, DELETE ON a.* TO 'a'@'localhost'
       console.log(sql);
        dbConnection.query(sql, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            console.log({message: `Granted privileges to ${dbName} on database: ${dbName}!`, data: results});
        });

        sendEmail(user.email, 'Database credentials!', `Whalecum ${dbName}, you access your database on ${dbName} and ${password}`);
        res.status(200).json("Subscription purchased");

    }catch(error){
        next(error);
    }
}

exports.revokeSubsriptionByID = async (req, res, next) => {
    if (!req.params.userID || !req.params.serviceID){
        return res.status(400).json({ message: 'Hiányzó adatok!'});
    }

    try{
        const user = await User.findOne({where: {id: req.params.userID}});
        const dbName = `13a_${user.name}`
        const sql1 = `DROP DATABASE \`${dbName}\``;
        dbConnection.query(sql1, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
           console.log({message: 'Database deleted successfully!', data: results});
        });

        const sql2 = `DROP USER '${dbName}'@'localhost'`;
        dbConnection.query(sql2, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
           console.log({message: 'User deleted successfully!', data: results});
        });

        res.status(200).json(await Subscription.destroy({where: {csomagID: req.params.serviceID, userID: req.params.userID}}));
    }catch(error){
        next(error);
    }
}

exports.getAllRelated = async (req, res, next) => {
    try{
        res.status(200).json({success: true, results: await Subscription.findAll({
            include: [
                {model: User},
                {model: Service}
            ]
        })});
    }catch(error){
        next(error);
    }
}