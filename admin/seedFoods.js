const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const foods = require("./food_data.json"); // ✅ no 'assert' needed here
const SERVER_URL = "http://localhost:8080";
const imagePath = path.join(__dirname, "public/seedImages");

async function seedData() {
  for (const item of foods) {
    try {
      const form = new FormData();
      form.append("name", item.name);
      form.append("description", item.description);
      form.append("price", item.price);
      form.append("category", item.category);
      form.append("rating", item.rating);
      form.append(
        "image",
        fs.createReadStream(path.join(imagePath, item.image))
      );

      const res = await axios.post(`${SERVER_URL}/api/v1/food/add`, form, {
        headers: form.getHeaders(),
      });

      console.log(`Added: ${item.name}`);
    } catch (err) {
      console.error(
        `Failed to add ${item.name}:`,
        err.response?.data || err.message
      );
    }
  }
}

seedData();
