const nodemailer = require('nodemailer');
const dotenv=require("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MYMAIL,
    pass: process.env.PASS, // or use the App Password if you have 2FA enabled
  },
});

module.exports = transporter;