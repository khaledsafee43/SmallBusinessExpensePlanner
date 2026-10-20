
import { Wallet, Settings2 } from "lucide-react";

export default function BudgetHeader({ onOpenSettings }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <Wallet size={17} />
          FINANCIAL PLANNING
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Budget Overview
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 md:text-base">
          Track your spending, monitor your budget, and make informed
          financial decisions.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenSettings}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
      >
        <Settings2 size={18} />
        Set Monthly Budget
      </button>
    </header>
  );
}
