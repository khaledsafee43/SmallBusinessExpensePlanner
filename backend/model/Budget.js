const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    monthlyBudget: {
      type: Number,
      required: true,
      min: 0.01,
      default: 5350,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Budget", budgetSchema);
