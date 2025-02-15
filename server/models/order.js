const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderCode: {
      type: String,
      required: [true, "Order Code is required"],
      trim: true,
    },

    orderType: {
      type: String,
      enum: {
        values: ["dineIn", "takeAway", "delivery"],
        message: "Order Type must be either dineIn, takeAway, or delivery",
      },
      required: [true, "Order Type is required"],
    },

    orderStatus: {
      type: String,
      enum: {
        values: ["pending", "processing", "delivered", "cancelled"],
        message: "Invalid Order Status",
      },
      default: "pending",
      required: true,
    },

    orderTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    timeTaken: {
      type: Date,
    },

    orderTotal: {
      type: Number,
      required: [true, "Order Total is required"],
      min: [0, "Order Total cannot be negative"],
    },

    paymentStatus: {
      type: Boolean,
      default: false,
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Order must contain at least one item"],
      },
    ],

    customerName: {
      type: String,
      trim: true,
      minlength: [3, "Customer Name must be at least 3 characters"],
      maxlength: [50, "Customer Name cannot exceed 50 characters"],
    },

    customerPhone: {
      type: String,
      match: [
        /^(\+92|0)?[3-9][0-9]{9}$/,
        "Invalid Phone Number (Must be Pakistani format)",
      ],
    },

    customerAddress: {
      type: String,
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [100, "Address cannot exceed 100 characters"],
    },

    tableID: {
      type: Schema.Types.ObjectId,
      ref: "Table",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
