const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const foodRouter = require("./routes/foodRoute.js");
const userRouter = require("./routes/userRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const orderRouter = require("./routes/orderRoute.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

connectDB();

// api endpoints
app.use("/images", express.static("uploads"));
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
