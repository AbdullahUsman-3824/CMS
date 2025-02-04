// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/product");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/asyncCatch");
const validateObjectId = require("../middlewares/idValidator");

// Route to handle all products
router
  .route("/")
  // Get all products
  .get(
    catchAsync(async (req, res) => {
      const products = await Product.find({});
      res.json(products);
    })
  )
  // Create a new product
  .post(
    catchAsync(async (req, res) => {
      const { name, category, sizes } = req.body;
      const createdProduct = await Product.create({ name, category, sizes });
      res.json({
        statusCode: 200,
        message: "Product created",
        id: createdProduct._id,
      });
    })
  );

// Route to handle specific product by ID
router
  .route("/:id")
  .all(validateObjectId)
  // Get a specific product by ID
  .get(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return next(new ExpressError(404, "Product not found"));
      res.json(product);
    })

  )
  // Update a specific product by ID
  .put(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const { name, category, sizes } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          category,
          sizes,
        },
        { new: true }
      );
      if (!updatedProduct)
        return next(new ExpressError(404, "Product not found"));
      else res.send({ statusCode: 200, message: "Product updated" });
    })
  )
  // Delete a specific product by ID
  .delete(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.send({ statusCode: 200, message: "Product deleted" });
      console.log(deletedProduct);
    })
  );

// Export the router to be used in other parts of the application
module.exports = router;
