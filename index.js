import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs : blogs});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    var blogTitle = req.body["blogTitle"];
    var blogDescription = req.body["blogDescription"];
    var x = { title : blogTitle, description : blogDescription};
    blogs.push(x);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    res.render("update.ejs", {blogs: blogs, index : req.body.index});
});

app.post("/update/:index", (req, res) => {
    const index = req.params.index; // Get the index from the route parameter
    const updatedTitle = req.body.blogTitle;
    const updatedDescription = req.body.blogDescription;

    // Update the corresponding blog item in the 'blogs' array
    blogs[index].title = updatedTitle;
    blogs[index].description = updatedDescription;

    // Redirect to the index page or another appropriate page after updating
    res.redirect("/"); // Redirect to the home page or a success page
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    blogs.splice(index, 1);
    res.redirect("/");
});

app.post("/search", (req, res) => {
    const query = req.body.search;
    console.log(query);
    blogs.forEach((blog) => {
        if( query == blog["title"]){
            res.render("index.ejs", {data: blog});
        }
    });

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Capstone project! Listening on port :${port}.`);
});