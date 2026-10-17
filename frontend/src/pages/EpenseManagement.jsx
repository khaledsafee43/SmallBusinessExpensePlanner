import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
export default function ExpenseManager() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr className="text-xs font-bold uppercase tracking-wide text-slate-600">
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Description</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr
                key={expense._id}
                className="transition-colors hover:bg-emerald-50/40"
              >
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {new Date(expense.date).toISOString().slice(0, 10)}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-800">
                  {expense.description}
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {expense.category}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                  ${Number(expense.amount).toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(expense)}
                      className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                      aria-label="Edit expense"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(expense._id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                      aria-label="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing {expenses.length > 0 ? 1 : 0}–{expenses.length} of{" "}
          {expenses.length} expenses
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            className="min-w-10 rounded-lg bg-[#07845B] px-3 py-2 font-semibold text-white shadow-sm"
          >
            {currentPage}
          </button>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
