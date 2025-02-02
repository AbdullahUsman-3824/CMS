const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the Product model
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sizes: {
    type: [
      {
        size: String,
        price: Number,
        stock: Number,
      },
    ],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
