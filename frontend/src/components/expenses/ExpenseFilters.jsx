
import { Search, RotateCcw } from "lucide-react";

export default function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  onReset,
}) {
  const fieldClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Search expenses
          </span>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={search}
              placeholder="Description, category, notes..."
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-0 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={fieldClass}
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
            Sort by
          </span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className={fieldClass}
          >
            <option value="default">Newest first</option>
            <option value="low">Lowest amount</option>
            <option value="high">Highest amount</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <RotateCcw size={16} />
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}
