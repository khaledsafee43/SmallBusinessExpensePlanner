import { useEffect, useState } from "react";

import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetSummary from "../components/budget/BudgetSummary";
import CategoryBreakdown from "../components/budget/CategoryBreakdown";
import BudgetStatus from "../components/budget/BudgetStatus";
import BudgetSettingsModal from "../components/budget/BudgetSettingsModal";
import BudgetDetailsModal from "../components/budget/BudgetDetailsModal";

export default function Budget() {
  // Budget states
  const [monthlyBudget, setMonthlyBudget] = useState(5350);
  const [budgetInput, setBudgetInput] = useState("5350");

  // Modal states
  const [showSettings, setShowSettings] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Expenses states
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch expenses and budget from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [expensesResponse, budgetResponse] = await Promise.all([
          fetch("https://bizplane.onrender.com/api/expenses"),
          fetch("https://bizplane.onrender.com/api/budget"),
        ]);

        if (!expensesResponse.ok) {
          throw new Error("Failed to load expenses");
        }

        if (!budgetResponse.ok) {
          throw new Error("Failed to load monthly budget");
        }

        const expensesData = await expensesResponse.json();
        const budgetData = await budgetResponse.json();

        if (!Array.isArray(expensesData)) {
          throw new Error("Invalid expenses data");
        }

        const savedBudget = Number(budgetData.monthlyBudget);

        if (!Number.isFinite(savedBudget) || savedBudget <= 0) {
          throw new Error("Invalid monthly budget data");
        }

        setExpenses(expensesData);
        setMonthlyBudget(savedBudget);
        setBudgetInput(String(savedBudget));
      } catch (error) {
        setError(error.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Colors for each category
  const categoryColors = {
    food: "#059669",
    rent: "#3B82F6",
    transport: "#F97316",
    other: "#818CF8",
  };

  // Group expenses by category
  const categories = Object.values(
    expenses.reduce((result, expense) => {
      const category = String(expense.category || "other").toLowerCase();

      if (!result[category]) {
        result[category] = {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          amount: 0,
          color: categoryColors[category] || "#818CF8",
        };
      }

      result[category].amount += Number(expense.amount) || 0;

      return result;
    }, {}),
  );

  // Calculate total expenses
  const totalSpent = expenses.reduce((total, expense) => {
    return total + (Number(expense.amount) || 0);
  }, 0);

  // Calculate budget statistics
  const percentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  const remaining = Math.max(monthlyBudget - totalSpent, 0);

  const overspent = totalSpent > monthlyBudget;

  // Save budget to database
  async function saveBudget(event) {
    if (event) {
      event.preventDefault();
    }

    const value = Number(budgetInput);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    try {
      const response = await fetch("https://bizplane.onrender.com/api/budget", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyBudget: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save budget");
      }

      const savedBudget = Number(data.monthlyBudget);

      setMonthlyBudget(savedBudget);
      setBudgetInput(String(savedBudget));
      setShowSettings(false);
    } catch (error) {
      alert(error.message || "Could not save budget.");
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Loading budget data...</p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <p className="text-red-600">Failed to load data: {error}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </main>
    );
  }

  // Main page
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BudgetHeader
          onOpenSettings={() => {
            setBudgetInput(String(monthlyBudget));
            setShowSettings(true);
          }}
        />

        <BudgetSummary
          monthlyBudget={monthlyBudget}
          totalSpent={totalSpent}
          percentage={percentage}
          remaining={remaining}
          overspent={overspent}
        />

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <CategoryBreakdown categories={categories} totalSpent={totalSpent} />

          <BudgetStatus
            overspent={overspent}
            totalSpent={totalSpent}
            monthlyBudget={monthlyBudget}
            remaining={remaining}
            onViewDetails={() => setShowDetails(true)}
          />
        </section>

        <BudgetSettingsModal
          isOpen={showSettings}
          budgetInput={budgetInput}
          setBudgetInput={setBudgetInput}
          onClose={() => setShowSettings(false)}
          onSave={saveBudget}
        />

        <BudgetDetailsModal
          isOpen={showDetails}
          categories={categories}
          totalSpent={totalSpent}
          onClose={() => setShowDetails(false)}
        />
      </div>
    </main>
  );
}
