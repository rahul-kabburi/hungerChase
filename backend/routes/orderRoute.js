const express = require("express");
const {
  placeOrder,
  verifyAndSaveOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", authMiddleware, verifyAndSaveOrder);
router.get("/my-orders", authMiddleware, getUserOrders);
router.put("/update-status", updateOrderStatus);
router.get("/all-orders", getAllOrders);

module.exports = router;
