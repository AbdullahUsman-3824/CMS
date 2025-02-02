// Import required modules
const express = require("express");
const app = express();
const port = 3000;

const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/asyncCatch");
const mongoose = require("mongoose");

const Category = require("./models/category");
const Product = require("./models/product");

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

//================================= Categories =================================>>

// Route to show all categories
app.get(
  "/api/categories",
  catchAsync(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);

// Route to create a new category
app.post(
  "/api/categories/new",
  catchAsync(async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.json({ statusCode: 200, message: "Category created" });
  })
);

// Route to show a specific category by ID
app.get(
  "/api/categories/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new ExpressError(404, "Category not found"));
    res.json(category);
  })
);

// Route to delete a specific category by ID
app.delete(
  "/api/categories/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory)
      return next(new ExpressError(404, "Category not found"));
    else res.send({ statusCode: 200, message: "Category deleted" });
    console.log(deletedCategory);
  })
);

// Route to update a specific category by ID
app.put(
  "/api/categories/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name });
    if (!updatedCategory)
      return next(new ExpressError(404, "Category not found"));
    else res.send({ statusCode: 200, message: "Category updated" });
  })
);

//================================= Products =================================>>

// Route to show all products
app.get(
  "/api/products",
  catchAsync(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Route to show products of a specific category
app.get(
  "/api/products/:categoryID",
  catchAsync(async (req, res) => {
    const { categoryID } = req.params;
    const products = await Product.find({ category: categoryID });
    res.json(products);
  })
);

// Route to create a new product
app.post(
  "/api/products/new",
  catchAsync(async (req, res) => {
    const { name, category, sizes } = req.body;
    await Product.create({ name, category, sizes });
    res.json({ statusCode: 200, message: "Product created" });
  })
);

// Route to update a specific product by ID
app.put(
  "/api/products/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, category, sizes } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      category,
      sizes,
    });
    if (!updatedProduct)
      return next(new ExpressError(404, "Product not found"));
    else res.send({ statusCode: 200, message: "Product updated" });
  })
);

// Route to delete a specific product by ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.send({ statusCode: 200, message: "Product deleted" });
  console.log(deletedProduct);
});

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
