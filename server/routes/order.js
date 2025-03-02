// Import required modules
const express = require("express");
const router = express.Router();

const Order = require("../models/order.js");
const catchAsync = require("../utils/asyncCatch.js");
const ExpressError = require("../utils/ExpressError");
const validateObjectId = require("../middlewares/idValidator");

const { getNextOrderNumber, getItemsTotal } = require("../utils/orderUtils.js");

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
      const total = await getItemsTotal(req.body.items);

      // Create a new order document with the generated order number
      const newOrder = await Order.create({
        ...req.body,
        orderNumber: nextOrderNumber,
        orderTotal: total,
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
      const order = await Order.findById(id);
  
      if (!order) return next(new ExpressError(404, "Order not found"));
  
      const { orderStatus } = req.body;
  
      // Calculate time taken if order is delivered
      if (
        orderStatus === "delivered" &&
        order.orderStatus !== "delivered" &&
        order.orderTime
      ) {
        const orderTime = new Date(order.orderTime);
        if (isNaN(orderTime)) {
          return next(new ExpressError(400, "Invalid order time format"));
        }
        req.body.timeTaken = (Date.now() - orderTime.getTime()) / 1000; 
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!updatedOrder) return next(new ExpressError(404, "Order not found"));
  
      res.json({ statusCode: 200, message: "Order updated" });
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
