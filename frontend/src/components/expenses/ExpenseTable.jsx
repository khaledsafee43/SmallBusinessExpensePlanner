import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
  formatDate,
  formatCategory,
}) {
  return (
    <div className="hidden min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
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
              <th scope="col" className="px-5 py-4">
                Payment
              </th>
              <th scope="col" className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
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

                <td className="whitespace-nowrap px-5 py-4">
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {formatCategory(expense.category)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 font-semibold tabular-nums text-slate-800">
                  ${Number(expense.amount || 0).toFixed(2)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {expense.paymentMethod === "eMoney" ? "E-Money" : "Cash"}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(expense)}
                      aria-label={`Edit ${expense.description}`}
                      title="Edit expense"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(expense._id)}
                      aria-label={`Delete ${expense.description}`}
                      title="Delete expense"
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
