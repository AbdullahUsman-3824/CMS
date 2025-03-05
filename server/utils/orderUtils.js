const Order = require("../models/order.js");
const Product = require("../models/product");

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

// Get items total
const getItemsTotal = async (items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ExpressError(400, "Order must contain at least one item."));
  }

  let orderTotal = 0;
  const processedItems = [];

  for (const item of items) {
    const { productId, sizeId, quantity } = item;

    // Validate required fields
    if (!productId || !sizeId || !quantity || quantity <= 0) {
      return next(
        new ExpressError(
          400,
          "Each item must have a valid productId, sizeId, and quantity."
        )
      );
    }

    // Fetch product to validate existence and get price
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ExpressError(404, "Product not found."));
    }

    // Find the correct size
    const selectedSize = product.sizes.find(
      (size) => size._id.toString() == sizeId
    );
    if (!selectedSize) {
      return next(new ExpressError(400, "Invalid size selection."));
    }

    // Calculate total price
    const itemTotal = selectedSize.price * quantity;
    orderTotal += itemTotal;

    // Add processed item to the list
    processedItems.push({
      productId,
      sizeId,
      quantity,
      price: selectedSize.price,
    });
  }
  return { orderTotal, processedItems };
};

module.exports = { getNextOrderNumber, getItemsTotal };
