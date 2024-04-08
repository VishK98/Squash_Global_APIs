const JobPost = require('../models/JobPost');
const BlogPost = require('../models/BlogPost');
const ContactUs = require('../models/ContactUs');
const Login = require('../models/Login');
const HireEmployee = require('../models/HireEmployee');
const { sendEmail } = require('../models/mail');
const multer = require('multer');
const fs = require('fs');



exports.postjob = async (req, res) => {
  const { jobProfile, salary, experience, location, requirements, responsibilities } = req.body;
  try {
    const newJobPost = new JobPost({
      jobProfile,
      salary,
      experience,
      location,
      requirements,
      responsibilities
    });
    // Save the new JobPost document
    await newJobPost.save();
    return res.status(201).send({
      success: true,
      message: "Job post updated successfully",
      data: newJobPost
    });
    // }
  } catch (error) {
    console.error("Error updating JobPost profile or creating job post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};


exports.allJobPosts = async (req, res) => {
  try {
    const jobposts = await JobPost.find();

    if (jobposts.length === 0) {
      return res.status(404).json({ message: 'No job posts found' });
    }

    res.status(200).json({ jobposts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.jobPost = async (req, res) => {
  const jobId = req.params.id;
  console.log(jobId);
  try {
    const jobposts = await JobPost.findByIdAndDelete(jobId);

    if (jobposts.length === 0) {
      return res.status(404).json({ message: 'No job posts found' });
    }
    return res.status(200).json({
      success: true,
      message: "Job post deleted successfully",
      data: jobposts
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.blogPost = async (req, res) => {
  const { blogTitle, blogDescription } = req.body;
  const blogImage = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  try {
    const newBlogPost = new BlogPost({
      blogTitle,
      blogDescription,
      blogImage,
    });
    await newBlogPost.save();
    return res.status(201).send({
      success: true,
      message: "Blog post updated successfully",
      data: newBlogPost,
    });
  } catch (error) {
    console.log(blogTitle, blogDescription, blogImage);
    console.error("Error updating Blog post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.contactUs = async (req, res) => {
  const { name, email, contact, companyName, service, message } = req.body;
  if (!name || !email || !contact || !companyName || !service || !message) {
    
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!contact) missingFields.push("contact");
    if (!companyName) missingFields.push("companyName");
    if (!service) missingFields.push("service");
    if (!message) missingFields.push("message");

    return res.status(400).send({ error: `Please fill the following fields: ${missingFields.join(", ")}.` });
  }

  try {
    const newContactUs = new ContactUs({
      name,
      email,
      contact,
      companyName,
      service,
      message
    });
    // Save the new JobPost document
    await newContactUs.save();
    return res.status(201).send({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
      data: newContactUs
    });
  } catch (error) {
    console.error("Error updating JobPost profile or creating job post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Login.findOne({ username, password });

    if (!admin) {
      return res.status(200).send({
        status: "false",
        message: "Invalid credentials"
      });
    }
    return res.status(200).send({
      status: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.allContactUs = async (req, res) => {
  try {
    const contactus = await ContactUs.find();

    if (contactus.length === 0) {
      return res.status(404).json({ message: 'No enquiry found found' });
    }

    res.status(200).json({ contactus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sendEmail = (req, res) => {
  const { name, email, contact, companyName, service, message } = req.body;
  sendEmail(name, email, contact, companyName, service, message);
  res.status(200).json({
    status: "true",
    message: 'Email sent successfully.',
    formData: { name, email, contact, companyName, service, message }
  });
};


// hire employee APIs

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('cv'); // 'cv' should match the name attribute in your form

exports.hireEmployee = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload error' });
      } else if (err) {
        // An unknown error occurred when uploading
        console.error('Unknown error:', err);
        return res.status(500).json({ error: 'Unknown error' });
      }

      // File uploaded successfully
      try {
        const { name, email, contact, role, message } = req.body;
        const cv = req.file.path; // Assuming you store the file path in the database

        // Create a new ContactUs document
        const newHireEmployee = new HireEmployee({
          name,
          email,
          contact,
          role,
          message,
          cv
        });

        await newHireEmployee.save();

        res.status(200).json({
          status: true,
          message: 'Enquiry submitted successfully',
          data: [newHireEmployee]
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error here' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sharedJobProfile = async (req, res) => {
  try {
    const jobProfile = await HireEmployee.find();

    if (jobProfile.length === 0) {
      return res.status(200).json({
        status: false,
        message: 'No job profile found'
      });
    }

    res.status(200).json({
      status: true,
      data: jobProfile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};