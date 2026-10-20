
import { CalendarDays, TrendingUp } from "lucide-react";
import { currency } from "../../data/budgetData";

export default function BudgetSummary({
  monthlyBudget,
  totalSpent,
  percentage,
  remaining,
  overspent,
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl" />

        <div className="relative flex items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 sm:h-16 sm:w-16">
            <CalendarDays size={30} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-600 sm:text-base">
              Monthly Budget
            </p>

            <p className="mt-1 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {currency(monthlyBudget)}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Your planned monthly spending limit
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Spent
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {currency(totalSpent)}
            </p>
          </div>

          <div
            className={`rounded-xl p-3 ${
              overspent
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Budget used</span>

          <span
            className={`font-bold ${
              overspent ? "text-red-600" : "text-emerald-700"
            }`}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>

        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Monthly budget used"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.min(percentage, 100)}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              overspent ? "bg-red-500" : "bg-emerald-600"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>Spent: {currency(totalSpent)}</span>

          <span>
            {overspent
              ? `Over budget by ${currency(totalSpent - monthlyBudget)}`
              : `Remaining: ${currency(remaining)}`}
          </span>
        </div>
      </div>
    </section>
  );
}
