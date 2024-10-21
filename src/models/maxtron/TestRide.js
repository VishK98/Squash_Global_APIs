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
const testRideEmail = (name, email, contact, city, selectModel, preferredDate) => {
    // Mail options for the admin
    const adminMailOptions = {
        from: `${name} <${email}>`,
        to: 'connect@theagencyway.co.in',
        subject: 'You have got a new enquiry',
        text: `Name: ${name}\nEmail: ${email}\nContact: ${contact} \nCity: ${city} \nModel: ${selectModel} \nPreferred Date: ${preferredDate}`
    };

    // Mail options for the user
    const userMailOptions = {
        from: 'connect@theagencyway.co.in',
        to: `${name} <${email}>`,
        subject: 'Thank you for your enquiry',
        text: `Dear ${name},\n\nThank you for your enquiry. We have received the following details:\n\nName: ${name}\nContact: ${contact}\nCity: ${city}\nModel: ${selectModel}\nPreferred Date: ${preferredDate}\n\nWe will get back to you shortly.\n\nBest regards,\nThe Agency`
    };

    // Send email to admin
    transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email to admin:', error);
        } else {
            console.log('Email sent to admin: ' + info.response);
        }
    });

    // Send confirmation email to the user
    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email to user:', error);
        } else {
            console.log('Confirmation email sent to user: ' + info.response);
        }
    });
};

module.exports = { testRideEmail };
