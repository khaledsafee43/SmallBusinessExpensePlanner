const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
dotenv.config();
const Expense = require("./model/expense.js");
const Budget = require("./model/Budget.js");
const Contact = require("./model/Contact.js");

const app = express();

app.use(
  cors({
    origin: "https://small-business-expense-planner-phi.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

app.get("/api/budget", async (req, res) => {
  try {
    let budget = await Budget.findOne();

    if (!budget) {
      budget = await Budget.create({
        monthlyBudget: 5350,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch budget",
    });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { description, amount, category, paymentMethod, date, notes } =
      req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        description,
        amount,
        category,
        paymentMethod,
        date,
        notes,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found.",
      });
    }

    return res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Update expense error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid expense data or expense ID.",
      });
    }

    return res.status(500).json({
      message: "Failed to update expense.",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { fullName, email, subject, message } = req.body;

    const contact = await Contact.create({
      fullName,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form.",
    });
  }
});

app.put("/api/budget", async (req, res) => {
  try {
    const monthlyBudget = Number(req.body.monthlyBudget);

    if (!Number.isFinite(monthlyBudget) || monthlyBudget <= 0) {
      return res.status(400).json({
        message: "Monthly budget must be greater than zero",
      });
    }

    const budget = await Budget.findOneAndUpdate(
      {},
      { $set: { monthlyBudget } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save budget",
    });
  }
});

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

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete expense",
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
