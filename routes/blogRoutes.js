const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_details);

router.get("/create", blogController.blog_create_post);

// handle individual blog entries
router.get("/:id", blogController.blog_create_get);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
