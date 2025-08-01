const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  removeParticularItem,
} = require("../controllers/cartController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.get("/get", authMiddleware, getCart);
router.post("/clear", authMiddleware, clearCart);
router.post("/remove-item", authMiddleware, removeParticularItem);
module.exports = router;
