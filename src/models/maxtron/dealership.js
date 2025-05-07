const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAX_EMAIL_USER,
        pass: process.env.MAX_EMAIL_PASS
    }
});

// Function to send email for dealership inquiries
const dealershipEmail = (name, email, phoneNumber, businessName, location) => {
    // Mail options for the admin
    const adminMailOptions = {
        from: `${name} <${email}>`,
        to: 'ruleraditya1911@gmail.com',
        subject: 'New Dealership Enquiry',
        text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber} \nBusiness Name: ${businessName}\nLocation: ${location}\n\nBest regards,\n${name}`
    };

    // Mail options for the user
    const userMailOptions = {
        from: 'ruleraditya1911@gmail.com',
        to: `${name} <${email}>`,
        subject: 'Thank you for your dealership enquiry',
        text: `Dear ${name},\n\nThank you for your dealership enquiry. We have received the following details:\n\nName: ${name}\nPhone Number: ${phoneNumber}\nBusiness Name: ${businessName}\nLocation: ${location}\n\nWe will get back to you shortly.\n\nBest regards,\nThe Maxtron`
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

module.exports = { dealershipEmail };
