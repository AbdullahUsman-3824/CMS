const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const Category = require("./models/category");

mongoose.Promise = global.Promise;
app.use(express.json());

// Connect MongoDB at default port 27017.
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CMS");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

//=================================Catogories=================================>

//show all categories
app.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//create new category
app.post("/admin/categories/new", async (req, res) => {
  try {
    const { name } = req.body;
    await Category.create({ name });
    res.send("Category created");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//show specific category
app.get("/admin/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//delete specific category
app.delete("/admin/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.send("Category not found");
    else res.send("Category deleted");
    console.log(deletedCategory);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//update specific category
app.put("/admin/categories/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name });
    if (!updatedCategory) return res.send("Category not found");
    else res.send("Category updated");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
