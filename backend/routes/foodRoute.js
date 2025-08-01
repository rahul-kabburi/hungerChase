const express = require("express");
const {
  addFood,
  listFoods,
  removeFood,
  deleteAllFoods,
} = require("../controllers/foodController");
const uploader = require("../middlewares/imageUpload");
const router = express.Router();

router.post("/add", uploader.single("image"), addFood);
router.get("/list", listFoods);
router.post("/remove", removeFood);
router.delete("/delete-all", deleteAllFoods);

module.exports = router;
