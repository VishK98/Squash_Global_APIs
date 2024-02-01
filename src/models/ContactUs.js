const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true 
    },
    state: {
        type:String,
        required:true 
    },
    contactNumber: {
        type:String,
        required:true 
    },
    about: {
        type:String,
        required:true 
    },
})

const ContactUs = new mongoose.model('ContactUs', contactUsSchema);
module.exports = ContactUs;
