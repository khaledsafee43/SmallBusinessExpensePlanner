const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
dotenv.config();
const Expense = require("./model/expense.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/expenses/dashboard", async (req, res) => {
  try {
    const expenses = await Expense.find().lean();

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // Calculate category totals
    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category;

      categoryTotals[category] =
        (categoryTotals[category] || 0) + expense.amount;
    });

    const categoryData = Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        name: category,
        amount,
        value:
          totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      }),
    );

    // Prepare the last 6 months
    const now = new Date();

    const monthlyData = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

      return {
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        month: date.toLocaleString("en-US", { month: "short" }),
        expenses: 0,
      };
    });

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);

      const monthData = monthlyData.find(
        (item) =>
          item.year === expenseDate.getFullYear() &&
          item.monthIndex === expenseDate.getMonth(),
      );

      if (monthData) {
        monthData.expenses += expense.amount;
      }
    });

    res.json({
      totalExpenses,
      categoryData,
      monthlyData: monthlyData.map(({ month, expenses }) => ({
        month,
        expenses,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
});
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
