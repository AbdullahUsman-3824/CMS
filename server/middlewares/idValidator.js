const mongoose = require("mongoose");

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Invalid ID format" });
  }
  next();
};

module.exports = validateObjectId;
