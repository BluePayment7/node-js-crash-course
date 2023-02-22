const mongoose = require("mongoose");
const Blog = require("../models/blog");

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_details = (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_post = (req, res) => {
  res.render("blogs/create", { title: "Create" });
};

const blog_create_update = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "404" });
  }
  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render("404", { title: "404" });
      }
      res.render("blogs/create", { blog: result, title: "Blog Update" });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

const blog_create_get = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "404" });
  }
  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render("404", { title: "404" });
      }
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
