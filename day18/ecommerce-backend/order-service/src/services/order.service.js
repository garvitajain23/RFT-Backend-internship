const Order = require("../models/order.model");
const axios = require("axios");

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const CART_SERVICE_URL = process.env.CART_SERVICE_URL;

// Place order — core business logic
const placeOrder = async (userId) => {
  // Step 1: Get user's cart
  const { data: cartData } = await axios.get(
    `${CART_SERVICE_URL}/api/cart/${userId}`,
  );
  const cart = cartData.data;

  if (!cart.items || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Step 2: Deduct stock for each item (BONUS FEATURE)
  for (const item of cart.items) {
    await axios.patch(
      `${PRODUCT_SERVICE_URL}/api/products/${item.productId}/stock`,
      { quantity: item.quantity },
    );
  }

  // Step 3: Create the order
  const order = new Order({
    userId,
    items: cart.items,
    totalPrice: cart.totalPrice,
    status: "confirmed",
  });
  await order.save();

  // Step 4: Clear the cart after order
  await axios.delete(`${CART_SERVICE_URL}/api/cart/${userId}/clear`);

  return order;
};

// Get all orders for a user (ORDER HISTORY — BONUS)
const getOrdersByUser = async (userId) => {
  return await Order.find({ userId }).sort({ createdAt: -1 });
};

// Get single order
const getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

module.exports = {
  placeOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
};
