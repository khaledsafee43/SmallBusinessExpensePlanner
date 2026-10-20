import { AlertTriangle, PiggyBank, ArrowUpRight } from "lucide-react";

import { currency } from "../../data/budgetData";

export default function BudgetStatus({
  overspent,
  totalSpent,
  monthlyBudget,
  remaining,
  onViewDetails,
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 shadow-sm sm:p-7 ${
        overspent
          ? "border-red-100 bg-gradient-to-br from-red-50 to-white"
          : "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            overspent
              ? "bg-red-100 text-red-600"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {overspent ? <AlertTriangle size={25} /> : <PiggyBank size={25} />}
        </div>

        <div>
          <h2
            className={`text-xl font-bold ${
              overspent ? "text-red-700" : "text-emerald-800"
            }`}
          >
            {overspent ? "Budget Exceeded" : "Budget on Track"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {overspent
              ? "Your spending has exceeded the monthly budget. Review your expenses and adjust your plan."
              : "Your recorded expenses are within your monthly budget. Keep monitoring your spending."}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/80 bg-white/80 p-4">
        <p className="text-xs font-medium text-slate-500">
          {overspent ? "Amount Over Budget" : "Available Budget"}
        </p>

        <p
          className={`mt-1 text-2xl font-bold ${
            overspent ? "text-red-600" : "text-emerald-700"
          }`}
        >
          {currency(overspent ? totalSpent - monthlyBudget : remaining)}
        </p>
      </div>

      <button
        type="button"
        onClick={onViewDetails}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:brightness-95 ${
          overspent
            ? "bg-red-600 hover:bg-red-700"
            : "bg-emerald-700 hover:bg-emerald-800"
        }`}
      >
        View Details
        <ArrowUpRight size={17} />
      </button>
    </div>
  );
}
