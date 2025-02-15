const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Product name must be at least 3 characters long"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(v);
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
          },
          stock: {
            type: Number,
            min: [0, "Stock cannot be negative"],
            default: 0,
          },
        },
      ],
      required: [true, "At least one size must be provided"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message:
          "At least one size with valid price and stock must be provided",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
