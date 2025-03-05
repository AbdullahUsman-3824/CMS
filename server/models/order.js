const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "Order Code is required"],
      trim: true,
      index: true,
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
      index: true,
    },

    orderTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    timeTaken: {
      type: Number,
      default: null,
    },

    orderTotal: {
      type: Number,
      required: [true, "Order Total is required"],
      min: [0, "Order Total cannot be negative"],
      default: 0,
    },

    paymentStatus: {
      type: Boolean,
      default: false,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        sizeId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
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
