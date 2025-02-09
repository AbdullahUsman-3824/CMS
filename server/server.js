// Import required modules
const express = require("express");
const app = express();
const port = 3000;
const ExpressError = require("./utils/ExpressError.js");

// Database connection
const db = require("./mongoose.js");
db.connect();

// Import routes
const CategoryRouter = require("./routes/category.js");
const ProductRouter = require("./routes/product");

// Middleware
app.use(express.json());

// Use routes
app.use("/api/categories", CategoryRouter);
app.use("/api/products", ProductRouter);

// Catch-all route for handling 404 errors
app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

// Root route
app.get("/", (req, res) => res.send("Hello World!"));

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
