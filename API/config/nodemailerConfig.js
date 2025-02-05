const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tarhelyszolg@gmail.com',
        pass: 'hxuy souu mlkk dltu'
    }
});

module.exports = transporter;