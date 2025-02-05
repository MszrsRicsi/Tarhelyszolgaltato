const db = require('../config/database');
const router = require('express').Router();

function generatePassword(){
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#@%';
    let password = '';
    for(let i =0; i<12; i++){
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

router.post('/create-database', (req, res) => {
    const { dbname } = req.body;
    if (!dbname){
        return res.status(400).json({message: 'Database name is required!'});
    }

    const sql = `CREATE DATABASE \`${dbname}\``;

    db.query(sql, (err, results) => {
        if (err){
            return res.status(500).json({message: err});
        }
        res.status(200).json({message: 'Database created successfully!', data: results});
    });

});

router.post('/create-user', (req, res) => {
    const { username } = req.body;
    if (!username){
        return res.status(400).json({message: 'Username is required!'});
    }
    const password = generatePassword();
    const sql = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`;
    db.query(sql, (err, results) => {
        if (err){
            return res.status(500).json({message: err});
        }
        res.status(200).json({message: 'User created successfully!', data: results, password});
    });
});

router.post('/grant-privileges', (req, res) => {
    const {username, dbname, privileges} = req.body;
    if (!username || !dbname || !privileges){
        return res.status(400).json({message: 'Missing data!'});
    }
    const sql = `USE ${dbname}; GRANT SELECT, INSERT, UPDATE, DELETE ON \`${dbname}\`.* TO '${username}'@'localhost'`;
    db.query(sql, (err, results) => {
        if (err){
            return res.status(500).json({message: err});
        }
        res.status(200).json({message: `Granted privileges to ${user.name} on ${dbname}!`, data: results});
    });
});

module.exports = router;
