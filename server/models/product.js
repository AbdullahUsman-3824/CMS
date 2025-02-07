const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

// Define the schema for the Product model
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true, // Prevents duplicate product names
    trim: true, // Removes extra spaces
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v); // Validates image extensions
      },
      message: "Invalid image URL format",
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  sizes: {
    type: [
      {
        size: {
          type: String,
          required: [true, "Size is required"],
          trim: true,
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price cannot be negative"],
          default: 0, // Ensures a valid default price
        },
        stock: {
          type: Number,
          min: [0, "Stock cannot be negative"],
          default: 0, // Prevents undefined stock
        },
      },
    ],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one size must be provided",
    },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
