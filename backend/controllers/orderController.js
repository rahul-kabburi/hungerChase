const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const payment_order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    });

    res.json({ success: true, order: payment_order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Payment order failed", error });
  }
};

const verifyAndSaveOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
      items,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const newOrder = new orderModel({
      userId: req.user._id,
      items,
      amount,
      address,
      payment: true,
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Order verification failed",
      error: err.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  verifyAndSaveOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
