// Import required modules
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

const CategoryRouter = require("./routes/category.js");
const ProductRouter = require("./routes/product");

// Use native promises for mongoose
mongoose.Promise = global.Promise;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB at default port 27017    // need improvement in future for prodcution
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CMS");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

// Use routes
app.use("/api/categories", CategoryRouter);
app.use("/api/products", ProductRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  console.log("ERROR!");
  res.status(status).send(message);
});

app.use("*", (req, res) => res.send("Page not found"));

// Root route
app.get("/", (req, res) => res.send("Hello World!"));

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
