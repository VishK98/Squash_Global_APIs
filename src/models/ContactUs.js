const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;
