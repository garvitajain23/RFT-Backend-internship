const Product = require("../models/product.model");

// Get all products
const getAllProducts = async () => {
  return await Product.find();
};

// Get single product by ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

// Create new product
const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Update stock after order (bonus feature)
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Insufficient stock");

  product.stock -= quantity;
  return await product.save();
};

// Delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateStock,
  deleteProduct,
};
