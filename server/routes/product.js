const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/asyncCatch");

// Default route
router.get(
  "/",
  catchAsync(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Route to show products of a specific category
router.get(
  "/:categoryID",
  catchAsync(async (req, res) => {
    const { categoryID } = req.params;
    const products = await Product.find({ category: categoryID });
    res.json(products);
  })
);

// Route to create a new product
router.post(
  "/new",
  catchAsync(async (req, res) => {
    const { name, category, sizes } = req.body;
    await Product.create({ name, category, sizes });
    res.json({ statusCode: 200, message: "Product created" });
  })
);

// Route to update a specific product by ID
router.put(
  "/:id/edit",
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
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.send({ statusCode: 200, message: "Product deleted" });
    console.log(deletedProduct);
  })
);

module.exports = router;
