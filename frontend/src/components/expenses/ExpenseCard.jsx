import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
  formatDate,
  formatCategory,
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="break-words font-semibold text-slate-900">
            {expense.description}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(expense.date)}
          </p>
        </div>

        <p className="shrink-0 text-lg font-bold tabular-nums text-slate-900">
          ${Number(expense.amount || 0).toFixed(2)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          {formatCategory(expense.category)}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          {expense.paymentMethod === "eMoney" ? "E-Money" : "Cash"}
        </span>
      </div>

      {expense.notes && (
        <p className="mt-3 break-words text-sm text-slate-500">
          {expense.notes}
        </p>
      )}

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onEdit(expense)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(expense._id)}
          className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </article>
  );
}
