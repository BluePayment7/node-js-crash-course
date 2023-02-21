const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to MongoDB
// username: group5
// password: #6b.#y3MzApsPvU
mongoose.set("strictQuery", false);
const dbURI =
  "mongodb+srv://group5:group5password@cluster0.9j8r4ed.mongodb.net/Group_5_Final_Project_DB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI /* , { useNewUrlParser: true, useUnifiedTopology: true } */)
  .then((result) => {
    console.log("connected to MongoDB");
    // listen for requests
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

// register view engine
app.set("view engine", "ejs");
// if not in the views folder
// app.set('views', 'nameoffolder');

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // for accepting form data
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
});

// handle individual blog entries
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

//#region NOT USED
/* //redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
}); */
/* // middleware
app.use((req, res, next) => {
  console.log("new request made: ");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});
app.use((req, res, next) => {
  console.log("in the next middleware... "); */
//#endregion
//#region mongoose and mongo sandbox routes
/* app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "info about blog",
    body: "A whole bunch of actual information about my blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("63ef9f9efc49220460e828ea")
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
}); */
//#endregion
