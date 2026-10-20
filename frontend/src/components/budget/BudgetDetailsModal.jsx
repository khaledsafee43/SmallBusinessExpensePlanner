import { X, CheckCircle2 } from "lucide-react";
import { currency } from "../../data/budgetData";

export default function BudgetDetailsModal({
  isOpen,
  categories,
  totalSpent,
  onClose,
}) {
  if (!isOpen) return null;

  const marketing = categories.find(
    (category) => category.name === "Marketing",
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Budget Details</h2>

            <p className="mt-1 text-sm text-slate-500">
              Current spending by category
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close budget details"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />

                <span className="text-sm font-medium text-slate-700">
                  {category.name}
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900">
                {currency(category.amount)}
              </span>
            </div>
          ))}
        </div>

        {marketing && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Marketing expenses</p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {currency(marketing.amount)}
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={19} />
          Total recorded spending: {currency(totalSpent)}
        </div>
      </div>
    </div>
  );
}
