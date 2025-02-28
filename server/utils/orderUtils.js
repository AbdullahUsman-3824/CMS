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
  let total = 0;
  for (const item of items) {
    const product = await Product.findOne({ "sizes._id": item });
    const productPrice = product.sizes.find((size) => size._id == item).price;
    total += productPrice;
  }
  return total;
};

module.exports = { getNextOrderNumber, getItemsTotal };
