const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to MongoDB
mongoose.set("strictQuery", false);
const dbURI =
  "mongodb+srv://tutorial:tut1234@cluster0.9j8r4ed.mongodb.net/Class_Tutorial?retryWrites=true&w=majority";
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
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
