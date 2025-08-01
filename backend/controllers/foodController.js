const fs = require("fs");
const foodModel = require("../models/foodModel");
const path = require("path");

// Add Food
const addFood = async (req, res) => {
  try {
    console.log(req.file);
    let imageFileName = req.file.filename;
    await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      image: imageFileName,
    });
    res.json({
      success: true,
      message: "Food Added Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Adding Food Failed - " + error,
    });
  }
};

// Lists Foods
const listFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      message: "Food List Successfully fetched",
      data: foods,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "List Foods API Failed - ",
      error,
    });
  }
};

// Delete Food
const removeFood = async (req, res) => {
  try {
    const foodData = await foodModel.findById(req.body.id);
    if (!foodData) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    const imagePath = path.join(__dirname, `../uploads/${foodData.image}`);

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to delete image file",
        });
      }

      await foodModel.findByIdAndDelete(req.body.id);

      res.json({
        success: true,
        message: "Successfully deleted a food item",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Removing food failed. " + error.message,
    });
  }
};

const deleteAllFoods = async (req, res) => {
  try {
    await foodModel.deleteMany({});
    res.json({ success: true, message: "All food items deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

const foodController = {
  addFood,
  listFoods,
  removeFood,
  deleteAllFoods
};
module.exports = foodController;
