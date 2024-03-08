const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { postjob, allJobPosts, jobPost, blogPost, contactUs, login } = require("../controller/controller")


router.post("/jobPost", postjob);
router.get("/allJobPosts", allJobPosts);
router.delete("/deleteJobPost/:id", jobPost);
router.post("/blogPost", upload.single("blogImage"), blogPost);
router.post("/contactUs", contactUs);
router.post("/login", login);

module.exports = router;