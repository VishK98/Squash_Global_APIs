const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
const sendEmail = (name, email, contact, service, message) => {
    // console.log(`Email ==> ${process.env.EMAIL_USER}`);
    // console.log(`Password ==> ${process.env.EMAIL_PASS}`);
    const mailOptions = {
        from: email,
        to: 'connect@theagencyway.co.in',
        subject: 'You have got a new enquiry',
        text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nService: ${service}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendEmail };
