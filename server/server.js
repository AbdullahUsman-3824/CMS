// Import required modules
const express = require("express");
const app = express();
const port = 3000;

const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/asyncCatch");
const mongoose = require("mongoose");

const Category = require("./models/category");

// Use native promises for mongoose
mongoose.Promise = global.Promise;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB at default port 27017
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CMS");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

//=================================Categories=================================>

// Route to show all categories
app.get(
  "/admin/categories",
  catchAsync(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

// Route to create a new category
app.post(
  "/admin/categories/new",
  catchAsync(async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.send("Category created");
  })
);

// Route to show a specific category by ID
app.get(
  "/admin/categories/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new ExpressError(404, "Category not found"));
    res.send(category);
  })
);

// Route to delete a specific category by ID
app.delete(
  "/admin/categories/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory)
      return next(new ExpressError(404, "Category not found"));
    else res.send("Category deleted");
    console.log(deletedCategory);
  })
);

// Route to update a specific category by ID
app.put(
  "/admin/categories/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name });
    if (!updatedCategory)
      return next(new ExpressError(404, "Category not found"));
    else res.send("Category updated");
  })
);

// Global error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  console.log("ERROR!");
  res.status(status).send(message);
});

// Root route
app.get("/", (req, res) => res.send("Hello World!"));

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));