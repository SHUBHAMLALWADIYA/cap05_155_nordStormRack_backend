// emailService.js

const { transporter } = require("./config/nodemailer");


async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
