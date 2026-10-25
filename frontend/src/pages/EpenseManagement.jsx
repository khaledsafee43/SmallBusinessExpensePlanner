import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseCard from "../components/expenses/ExpenseCard";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpensePagination from "../components/expenses/ExpensePagination";
import EditExpenseModal from "../components/expenses/EditExpenseModal";

const API_URL = "https://bizplane.onrender.com/api/expenses";
const PAGE_SIZE = 8;

export default function ExpenseManager() {
  // 1. State
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Fetch expenses
  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load expenses.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid expenses data received.");
        }

        setExpenses(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  // 3. Search and filter
  const filteredExpenses = expenses.filter((expense) => {
    const term = search.trim().toLowerCase();

    const matchesSearch = [
      expense.description,
      expense.category,
      expense.notes,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(term),
    );

    const matchesCategory = category === "all" || expense.category === category;

    return matchesSearch && matchesCategory;
  });

  // 4. Sort
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "low") {
      return Number(a.amount) - Number(b.amount);
    }

    if (sortBy === "high") {
      return Number(b.amount) - Number(a.amount);
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 5. Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedExpenses.length / PAGE_SIZE));

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedExpenses = sortedExpenses.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const firstItem = sortedExpenses.length === 0 ? 0 : startIndex + 1;

  const lastItem = Math.min(startIndex + PAGE_SIZE, sortedExpenses.length);

  // Keep page number valid after filtering or deleting
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // 6. Helpers
  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSortBy("default");
    setCurrentPage(1);
  }

  function formatDate(date) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Invalid date";
    }

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatCategory(value) {
    return String(value || "other")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) => letter.toUpperCase());
  }

  // 7. Delete expense
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense.");
      }

      setExpenses((previous) =>
        previous.filter((expense) => expense._id !== id),
      );
    } catch (err) {
      window.alert(err.message || "Could not delete this expense.");
    }
  }

  // 8. Edit expense
  function handleEdit(expense) {
    setSelectedExpense(expense);
  }

  function handleEditSaved(updatedExpense) {
    setExpenses((previous) =>
      previous.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense,
      ),
    );

    setSelectedExpense(null);
  }

  // 9. Loading and error states
  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          Loading expenses...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
        >
          <p className="font-semibold">Unable to load expenses</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  // 10. Page UI
  return (
    <section className="min-w-0 p-4 sm:p-6 lg:p-8">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Manage Expenses
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Search, filter, and manage all your expenses in one place.
        </p>
      </header>

      <ExpenseFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        setSortBy={(value) => {
          setSortBy(value);
          setCurrentPage(1);
        }}
        onReset={resetFilters}
      />

      {/* Results summary */}
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {firstItem}–{lastItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {sortedExpenses.length}
          </span>{" "}
          expenses
        </p>

        <p className="text-xs text-slate-400">
          {expenses.length} total records
        </p>
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {paginatedExpenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            onEdit={handleEdit}
            onDelete={handleDelete}
            formatDate={formatDate}
            formatCategory={formatCategory}
          />
        ))}
      </div>

      {/* Tablet and desktop table */}
      <ExpenseTable
        expenses={paginatedExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        formatDate={formatDate}
        formatCategory={formatCategory}
      />

      {/* Empty state */}
      {paginatedExpenses.length === 0 && (
        <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
          <Search size={24} className="mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-800">No expenses found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      <ExpensePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        firstItem={firstItem}
        lastItem={lastItem}
        totalItems={sortedExpenses.length}
      />

      {/* Edit modal */}
      {selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onSaved={handleEditSaved}
        />
      )}
    </section>
  );
}
