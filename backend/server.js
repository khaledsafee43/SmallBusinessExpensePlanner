const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
dotenv.config();
const Expense = require("./model/expense.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {});
app.post("/api/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({
      message: "Expenses saved successfully",
      expense,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid expense data",
      });
    }
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

const startServer = async () => {
  connectDB();
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server is running on port: ${process.env.PORT}`),
  );
};
startServer();
