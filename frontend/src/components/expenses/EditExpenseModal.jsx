
import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const API_URL = "http://localhost:5000/api/expenses";

const initialForm = {
  description: "",
  amount: "",
  category: "food",
  paymentMethod: "cash",
  date: "",
  notes: "",
};

export default function EditExpenseModal({
  expense,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!expense) return;

    setForm({
      description: expense.description || "",
      amount: String(expense.amount ?? ""),
      category: expense.category || "food",
      paymentMethod: expense.paymentMethod || "cash",
      date: expense.date
        ? new Date(expense.date).toISOString().slice(0, 10)
        : "",
      notes: expense.notes || "",
    });

    setError("");
  }, [expense]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const amount = Number(form.amount);

    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/${expense._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: form.description.trim(),
          amount,
          category: form.category,
          paymentMethod: form.paymentMethod,
          date: form.date,
          notes: form.notes.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to update expense.");
      }

      // The backend should return the updated expense document.
      onSaved(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (!expense) return null;

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-expense-title"
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-xl sm:rounded-2xl"
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id="edit-expense-title"
              className="text-lg font-bold text-slate-900 sm:text-xl"
            >
              Edit Expense
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Update the details of this expense.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close edit form"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Edit form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
          <div>
            <label htmlFor="edit-description" className={labelClass}>
              Description
            </label>
            <input
              id="edit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={100}
              required
              placeholder="e.g. Grocery shopping"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-amount" className={labelClass}>
                Amount (USD)
              </label>
              <input
                id="edit-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="edit-date" className={labelClass}>
                Date
              </label>
              <input
                id="edit-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-category" className={labelClass}>
                Category
              </label>
              <select
                id="edit-category"
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
            </div>

            <div>
              <label htmlFor="edit-payment" className={labelClass}>
                Payment method
              </label>
              <select
                id="edit-payment"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="cash">Cash</option>
                <option value="eMoney">E-Money</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-notes" className={labelClass}>
              Notes <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="edit-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              maxLength={500}
              rows={3}
              placeholder="Add any additional details..."
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-slate-400">
              {form.notes.length}/500
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Modal actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#07845B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
