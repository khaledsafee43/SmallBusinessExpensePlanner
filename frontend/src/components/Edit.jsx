
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const initialForm = {
  description: "",
  amount: "",
  category: "food",
  paymentMethod: "cash",
  date: "",
  notes: "",
};

export default function EditExpense({ expense, onClose, onUpdated }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!expense) return;

    setForm({
      description: expense.description || "",
      amount: expense.amount ?? "",
      category: expense.category || "food",
      paymentMethod: expense.paymentMethod || "cash",
      date: expense.date
        ? new Date(expense.date).toISOString().slice(0, 10)
        : "",
      notes: expense.notes || "",
    });
  }, [expense]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            amount: Number(form.amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update expense");
      }

      onUpdated?.(data.expense || data);
      onClose?.();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!expense) return null;

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
      <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Edit Expense
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the details of your expense.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close edit form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Description
              <input
                required
                maxLength={100}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Expense description"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Amount
              <input
                required
                min="0.01"
                step="0.01"
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="transport">Transport</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Payment Method
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="cash">Cash</option>
                <option value="eMoney">E-Money</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Date
              <input
                required
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Notes
              <textarea
                rows={3}
                maxLength={500}
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes (optional)"
                className={inputClass}
              />
            </label>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
