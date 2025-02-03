const express = require("express");
const router = express.Router();

const Category = require("../models/category");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/asyncCatch.js");

// Default route                                                   "GET /api/categories"
router.get(
  "/",
  catchAsync(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);

// // Route to create a new category                                  "POST /api/categories/new"
router.post(
  "/new",
  catchAsync(async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.json({ statusCode: 200, message: "Category created" });
  })
);

// // Route to update a specific category by ID                       "PUT /api/categories/:id/edit"
router.put(
  "/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name });
    if (!updatedCategory)
      return next(new ExpressError(404, "Category not found"));
    else res.send({ statusCode: 200, message: "Category updated" });
  })
);

// // Route to show/delete a specific category by ID                   "GET,DELETE /api/categories/:id"
router
  .route("/:id")
  .get(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) return next(new ExpressError(404, "Category not found"));
      res.json(category);
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory)
        return next(new ExpressError(404, "Category not found"));
      else res.send({ statusCode: 200, message: "Category deleted" });
      console.log(deletedCategory);
    })
  );

module.exports = router;
