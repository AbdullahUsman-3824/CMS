// Import required modules
const express = require("express");
const router = express.Router();

const Category = require("../models/category");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/asyncCatch.js");
const validateObjectId = require("../middlewares/idValidator");

// Route to handle all categories
router
  .route("/")
  // Get all categories
  .get(
    catchAsync(async (req, res) => {
      const categories = await Category.find({});
      res.json(categories);
    })
  )
  // Create a new category
  .post(
    catchAsync(async (req, res) => {
      const { name } = req.body;
      const createdCategory = await Category.create({ name });
      res.json({
        statusCode: 200,
        message: "Category created",
        id: createdCategory._id,
      });
    })
  );

// Route to handle specific category by ID
router
  .route("/:id")
  .all(validateObjectId)
  // Get a specific category by ID
  .get(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) return next(new ExpressError(404, "Category not found"));
      res.json(category);
    })
  )
  // Update a specific category by ID
  .put(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!updatedCategory)
        return next(new ExpressError(404, "Category not found"));
      res.send({ statusCode: 200, message: "Category updated" });
    })
  )
  // Delete a specific category by ID
  .delete(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory)
        return next(new ExpressError(404, "Category not found"));
      res.send({ statusCode: 200, message: "Category deleted" });
    })
  );

// Export the router to be used in other parts of the application
module.exports = router;
