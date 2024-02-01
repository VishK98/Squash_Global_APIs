const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    blogTitle: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
    blogImage: {
      data: Buffer,
      contentType: String,
    },
  });
  

const BlogPost = new mongoose.model('BlogPpst', blogPostSchema);
module.exports = BlogPost;