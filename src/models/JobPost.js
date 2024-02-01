const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
    jobProfile : {
        type:String,
        required:true,
        minlength:3
    },
    salary: {
        type:String,
        required:true 
    },
    experience: {
        type:String,
        required:true 
    },
    location: {
        type:String,
        required:true 
    },
    requirements: {
        type:String,
        required:true 
    },
    responsibilities: {
        type:String,
        required:true 
    },
})

const JobPost = new mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;
