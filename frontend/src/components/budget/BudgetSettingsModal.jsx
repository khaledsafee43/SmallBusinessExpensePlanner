import { X } from "lucide-react";

export default function BudgetSettingsModal({
  isOpen,
  budgetInput,
  setBudgetInput,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <form
        onSubmit={onSave}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Set Monthly Budget
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your planned monthly spending limit.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close budget settings"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <label
          htmlFor="monthlyBudget"
          className="mt-6 block text-sm font-semibold text-slate-700"
        >
          Monthly Budget (USD)
        </label>

        <input
          id="monthlyBudget"
          type="number"
          min="0.01"
          step="0.01"
          required
          value={budgetInput}
          onChange={(event) => setBudgetInput(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
        />

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800"
          >
            Save Budget
          </button>
        </div>
      </form>
    </div>
  );
}
