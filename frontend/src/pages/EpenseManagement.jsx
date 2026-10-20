import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/expenses";
const PAGE_SIZE = 8;

export default function ExpenseManager() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch expenses from MongoDB through the backend
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

  // Filter by description, category, or notes
  const filteredExpenses = expenses.filter((expense) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch = [
      expense.description,
      expense.category,
      expense.notes,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(searchTerm),
    );

    const matchesCategory = category === "all" || expense.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort without mutating the original filtered array
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "low") {
      return Number(a.amount) - Number(b.amount);
    }

    if (sortBy === "high") {
      return Number(b.amount) - Number(a.amount);
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedExpenses.length / PAGE_SIZE));

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedExpenses = sortedExpenses.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const firstItem = sortedExpenses.length === 0 ? 0 : startIndex + 1;

  const lastItem = Math.min(startIndex + PAGE_SIZE, sortedExpenses.length);

  // Keep the current page valid after filtering or deleting
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSortBy("default");
    setCurrentPage(1);
  }

  // Delete an expense from the database
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) return;

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

  // Connect this handler to your edit modal when it is ready
  function handleEdit(expense) {
    console.log("Edit expense:", expense);
  }

  function formatDate(date) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-GB", {
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

  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          <p>Loading expenses...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">Unable to load expenses</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-w-0 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-2 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Manage Expenses
        </h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Search, filter, and manage all your expenses in one place.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="block min-w-0 xl:col-span-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Search expenses
            </span>

            <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <Search size={18} className="shrink-0 text-slate-400" />

              <input
                type="search"
                placeholder="Search description or notes..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                className="min-w-0 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="block min-w-0">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </span>

            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="all">All categories</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="transport">Transport</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="block min-w-0">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Sort by amount
            </span>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="default">Newest first</option>
              <option value="low">Lowest amount</option>
              <option value="high">Highest amount</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <RotateCcw size={16} />
              Reset filters
            </button>
          </div>
        </div>
      </div>

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

      {/* Expenses table */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-xs font-bold uppercase tracking-wider text-slate-500">
                <th scope="col" className="px-5 py-4">
                  Date
                </th>
                <th scope="col" className="px-5 py-4">
                  Description
                </th>
                <th scope="col" className="px-5 py-4">
                  Category
                </th>
                <th scope="col" className="px-5 py-4">
                  Amount
                </th>
                <th scope="col" className="px-5 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedExpenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="transition-colors hover:bg-emerald-50/40"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {formatDate(expense.date)}
                  </td>

                  <td className="max-w-xs px-5 py-4">
                    <p className="truncate font-semibold text-slate-800">
                      {expense.description}
                    </p>
                    {expense.notes && (
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {expense.notes}
                      </p>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex whitespace-nowrap rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      {formatCategory(expense.category)}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold tabular-nums text-slate-800">
                    ${Number(expense.amount || 0).toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(expense)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        aria-label={`Edit ${expense.description}`}
                        title="Edit expense"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(expense._id)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                        aria-label={`Delete ${expense.description}`}
                        title="Delete expense"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedExpenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-3 rounded-full bg-slate-100 p-3">
                        <Search size={22} className="text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-800">
                        No expenses found
                      </p>
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
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#07845B] px-3 text-sm font-semibold text-white">
              {currentPage}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
