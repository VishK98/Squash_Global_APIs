const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { postjob, allJobPosts, jobPost, blogPost, contactUs, login,allContactUs,sendEmail,hireEmployee,sharedJobProfile,testRideEmail,bookNowEmail,dealershipEmail} = require("../controller/controller")


// router.post("/jobPost", postjob);
// router.get("/allJobPosts", allJobPosts);
// router.delete("/deleteJobPost/:id", jobPost);
// router.post("/blogPost", upload.single("blogImage"), blogPost);
router.post("/contactUs", sendEmail);
// router.post("/login", login);
// router.get("/allContactUs", allContactUs);
// router.post("/sendEmail", sendEmail);
// router.post("/testRideEmail", testRideEmail);
// router.post("/bookNowEmail", bookNowEmail);
// router.post("/dealershipEmail", dealershipEmail);
// router.post("/hireEmployee", hireEmployee);
// router.get("/sharedJobProfile", sharedJobProfile);

module.exports = router;