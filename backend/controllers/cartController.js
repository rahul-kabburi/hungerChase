const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    let cartData = req.user.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Adding to cart failed: " + error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let cartData = req.user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId]; // optional: remove if zero
      }
    }
    await userModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: "Cart Item Removed Successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Removing Cart Item Failed: " + error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Fetching cart failed: " + error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });
    res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Clearing cart failed: " + error.message,
    });
  }
};

const removeParticularItem = async (req, res) => {
  try {
    let cartData = req.user.cartData;
    const itemId = req.body.itemId;

    if (cartData[itemId]) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Removing item from cart failed: " + error.message,
    });
  }
};

const cartController = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  removeParticularItem,
};

module.exports = cartController;
