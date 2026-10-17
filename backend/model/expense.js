const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "eMoney"],
    },

    notes: {
      type: String,
      maxlength: 500,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["food", "rent", "transport", "other"],
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
