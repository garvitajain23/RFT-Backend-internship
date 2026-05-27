const Cart = require("../models/cart.model");
const axios = require("axios");

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

// Helper: recalculate total price
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Get cart by userId
const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { userId, items: [], totalPrice: 0 };
  return cart;
};

// Add item to cart
const addToCart = async (userId, productId, quantity) => {
  // Call product service to validate product exists
  const { data } = await axios.get(
    `${PRODUCT_SERVICE_URL}/api/products/${productId}`,
  );
  const product = data.data;

  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Not enough stock");

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Create new cart for this user
    cart = new Cart({ userId, items: [] });
  }

  // Check if product already in cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  cart.totalPrice = calculateTotal(cart.items);
  return await cart.save();
};

// Remove item from cart
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  cart.totalPrice = calculateTotal(cart.items);
  return await cart.save();
};

// Clear entire cart (called after order is placed)
const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { items: [], totalPrice: 0 },
    { new: true },
  );
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
