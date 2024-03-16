const mongoose = require("mongoose");


const hireEmployeeSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    cv: {
        type: String, // Assuming you'll store the file path in the database
        required: true
    }
});


const HireEmployee = mongoose.model('HireEmployee', hireEmployeeSchema);
module.exports = HireEmployee;