const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => console.log("DB Connection Failed! - ", error));
};

module.exports = connectDB;
