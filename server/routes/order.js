// Import required modules
const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");
const catchAsync = require("../utils/asyncCatch.js");
const ExpressError = require("../utils/ExpressError");

/**
 * Generates the next sequential order number for the current day.
 * Format: DDMM-N (e.g., 0502-1 for the first order on Feb 5th)
 *
 * - Retrieves the most recent order for today.
 * - Extracts the last order number.
 * - Increments the order number for the new order.
 */
const getNextOrderNumber = async () => {
  // Get the start of today (00:00:00)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Find the latest order placed today, sorted by orderTime in descending order
  const lastOrder = await Order.findOne({ orderTime: { $gte: todayStart } })
    .sort({ orderTime: -1 }) // Ensures we get the most recent order
    .select("orderNumber");

  // Extract the numeric part of the last order number safely
  const lastOrderNum = lastOrder
    ? Number(lastOrder.orderNumber.split("-")[1]) || 0
    : 0;

  // Format today's date as "DDMM"
  const todayDate = `${todayStart.getDate().toString().padStart(2, "0")}${(
    todayStart.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  // Return the next order number
  return `${todayDate}-${lastOrderNum + 1}`;
};

// Route: /orders
router
  .route("/")
  /**
   * GET /orders
   * Fetch all orders from the database.
   */
  .get(
    catchAsync(async (req, res) => {
      const orders = await Order.find();
      res.json(orders);
    })
  )

  /**
   * POST /orders
   * Creates a new order with a unique order number.
   */
  .post(
    catchAsync(async (req, res) => {
      // Generate the next available order number
      const nextOrderNumber = await getNextOrderNumber();

      // Create a new order document with the generated order number
      const newOrder = await Order.create({
        ...req.body,
        orderNumber: nextOrderNumber,
        orderTime: new Date(), // Store the exact timestamp of order creation
      });

      // Send response with the created order details
      res.status(201).json({
        statusCode: 201,
        message: "Order created",
        id: newOrder._id,
        orderNumber: newOrder.orderNumber,
      });
    })
  );

// Route: /orders/:id
router
  .route("/:id")

  /**
   * GET /orders/:id
   * Fetches a specific order by its ID.
   */
  .get(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (!order) return next(new ExpressError(404, "Order not found"));

      res.json(order);
    })
  )

  /**
   * PUT /orders/:id
   * Updates an existing order by ID.
   */
  .put(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true, // Returns the updated document
      });

      if (!updatedOrder) return next(new ExpressError(404, "Order not found"));
      res.send({ statusCode: 200, message: "Order updated" });
    })
  )

  /**
   * DELETE /orders/:id
   * Deletes an order by ID.
   */
  .delete(
    catchAsync(async (req, res, next) => {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) return next(new ExpressError(404, "Order not found"));

      res.json({ message: "Order deleted" });
    })
  );

module.exports = router;
