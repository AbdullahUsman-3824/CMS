// Import required modules
const express = require("express");
const router = express.Router();

const Order = require("../models/order.js");
const catchAsync = require("../utils/asyncCatch.js");
const ExpressError = require("../utils/ExpressError");
const validateObjectId = require("../middlewares/idValidator");

/**
 * Generates the next sequential order number for the current day.
 * Format: TYP-DDMM-N (e.g., DIN-0502-1 for the first Dine-In order on Feb 5th)
 *
 * - Retrieves the most recent order for today.
 * - Extracts the last order number.
 * - Increments the order number for the new order.
 */

const getNextOrderNumber = async (orderType) => {
  // Set order type: "DIN" (Dine-In), "TAK" (Takeaway), "DEL" (Delivery), or "UNK" (Unknown)
  const orderTypeMap = {
    dineIn: "DIN",
    takeAway: "TAK",
    delivery: "DEL",
  };
  const typeCode = orderTypeMap[orderType] || "UNK";

  // Get the start of today (00:00:00)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Find the latest order of today, ensuring the correct sorting order
  const lastOrder = await Order.findOne({ orderTime: { $gte: todayStart } })
    .sort({ orderNumber: -1, orderTime: -1 })
    .select("orderNumber");

  // Extract the last numeric part safely
  const lastOrderNum = lastOrder
    ? Number(lastOrder.orderNumber.match(/\d+$/)?.[0]) || 0
    : 0;

  // Format today's date as "DDMM"
  const todayDate = `${todayStart.getDate().toString().padStart(2, "0")}${(
    todayStart.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  // Return the next order number
  return `${typeCode}-${todayDate}-${lastOrderNum + 1}`;
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
    catchAsync(async (req, res, next) => {
      const { orderType } = req.body;
      if (!orderType) return new ExpressError(404, "Order type required");

      // Generate the next available order number
      const nextOrderNumber = await getNextOrderNumber(orderType);

      // Create a new order document with the generated order number
      const newOrder = await Order.create({
        ...req.body,
        orderNumber: nextOrderNumber,
        orderTime: new Date(), 
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
  .all(validateObjectId)
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
