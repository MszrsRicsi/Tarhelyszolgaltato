const subscriptionService = require('../services/subscription.service');
const { sendEmail } = require('../services/email.service');
const { User } = require('../models/user.model')
const db = require('../config/database');

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

        const user = await User.findOne({where: {id: req.params.userID}});

        const sql1 = `CREATE DATABASE \`${user.name}\``;
        db.query(sql1, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: 'Database created successfully!', data: results});
        });

        const password = generatePassword();
        const sql2 = `CREATE USER '${user.name}'@'localhost' IDENTIFIED BY '${password}'`;
        db.query(sql2, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: 'User created successfully!', data: results, password});
        });

        const sql = `USE ${user.name}; GRANT "SELECT, INSERT, UPDATE, DELETE" ON \`${user.name}\`.* TO '${user.name}'@'localhost'`;
        db.query(sql, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: `Granted privileges to ${user.name} on database: ${user.name}!`, data: results});
        });

        sendEmail(user.email, 'Database credentials!', `Whalecum ${user.name}, you access your database on ${user.name} and ${password}`);
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