const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// app.use(cors({
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
//   credentials: true, // Allow sending cookies and authorization headers
// }));

const multer = require("multer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("./db/conn");
const JobPost = require('./models/JobPost'); // Import your JobPost model
const BlogPost = require('./models/BlogPost');
const ContactUs = require('./models/ContactUs');
const Login = require('./models/Login');
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Post job APIs
app.post("/api/jobPost", async (req, res) => {
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
});

// Get all job post APIs
app.get('/api/allJobPosts', async (req, res) => {
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
});

// Delete job post by their ID APIs
app.delete("/api/jobPost/:id", async (req, res) => {
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
});

// Post blog APIs
app.post("/api/blogPost", upload.single("blogImage"), async (req, res) => {
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
    console.log(blogTitle,blogDescription,blogImage);
    console.error("Error updating Blog post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// ContactUs APIs
app.post("/api/contactUs", async (req, res) => {
  const { fullName, email, state, contactNumber, about} = req.body;
  try {
    const newContactUs = new ContactUs({
      fullName,
      email,
      state,
      contactNumber,
      about
    });
    // Save the new JobPost document
    await newContactUs.save();
    return res.status(201).send({
      success: true,
      message: "We will try to contact you soon . ..",
      data: newContactUs
    });
    // }
  } catch (error) {
    console.error("Error updating JobPost profile or creating job post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});


// Login APIs
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Login.findOne({ username, password });

    if (!admin) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    return res.status(200).send({
      sucess: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
