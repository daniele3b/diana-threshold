const nodemailer = require("nodemailer");
const config = require('config')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: config.get('email_host'),
    port: 465,
    secure: true, 
    auth: {
      user: process.env.USER_EMAIL, 
      pass: process.env.PW_EMAIL 
    }
});

exports.transporter = transporter