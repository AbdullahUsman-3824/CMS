// Import required modules
const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");
const catchAsync = require("../utils/asyncCatch.js");
const ExpressError = require("../utils/ExpressError");

// Function to get the next order number for today
const getNextOrderNumber = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const lastOrder = await Order.findOne({ orderTime: { $gte: todayStart } })
    .sort({ orderNumber: -1 })
    .select("orderNumber");

  return lastOrder ? lastOrder.orderNumber + 1 : 1;
};

router
  .route("/")
  // Get all orders
  .get(
    catchAsync(async (req, res) => {
      const orders = await Order.find();
      res.json(orders);
    })
  )
  // Post a new order with an incremental number
  .post(
    catchAsync(async (req, res) => {
      const nextOrderNumber = await getNextOrderNumber();

      const newOrder = await Order.create({
        ...req.body,
        orderNumber: nextOrderNumber,
        orderTime: new Date(), 
      });

      res.status(201).json({
        statusCode: 201,
        message: "Order created",
        id: newOrder._id,
        orderNumber: newOrder.orderNumber,
      });
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) return next(new ExpressError(404, "Order not found"));
      res.json(order);
    })
  )
  .put(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedOrder) return next(new ExpressError(404, "Order not found"));
      res.json(updatedOrder);
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) return next(new ExpressError(404, "Order not found"));
      res.json({ message: "Order deleted" });
    })
  );

module.exports = router;
