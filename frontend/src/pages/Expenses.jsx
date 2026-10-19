
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../schemas/ExpensesSchema.js";
import {
  Wallet,
  CalendarDays,
  CreditCard,
  Tags,
  FileText,
  StickyNote,
  Save,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  CircleDollarSign,
} from "lucide-react";

const inputClass =
  "mt-2.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

export default function Expenses() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      paymentMethod: "",
      notes: "",
      date: "",
      category: "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          amount: Number(data.amount),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save expense");
      }

      alert("Expense saved successfully!");
      reset();
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <Wallet size={15} />
              EXPENSE MANAGEMENT
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Add New Expense
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Record your business expenses, organize your transactions,
              and keep your financial information up to date.
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
            <CircleDollarSign size={30} />
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Form Top Bar */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-5 sm:px-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <FileText size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Expense Information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Fields marked with * are required.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-x-8 gap-y-6 p-5 sm:p-8 md:grid-cols-2">
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="text-sm font-semibold text-slate-700"
              >
                Description <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-[27px] -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register("description")}
                  type="text"
                  id="description"
                  maxLength={100}
                  placeholder="e.g. Grocery shopping, fuel..."
                  aria-invalid={!!errors.description}
                  className={`${inputClass} pl-10 ${
                    errors.description
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                />
              </div>

              {errors.description && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="text-sm font-semibold text-slate-700"
              >
                Amount <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <CircleDollarSign
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-[27px] -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register("amount")}
                  type="number"
                  id="amount"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  aria-invalid={!!errors.amount}
                  className={`${inputClass} pl-10 ${
                    errors.amount
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                />
              </div>

              {errors.amount && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="text-sm font-semibold text-slate-700"
              >
                Category <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Tags
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-[27px] -translate-y-1/2 text-slate-400"
                />
                <select
                  {...register("category")}
                  id="category"
                  aria-invalid={!!errors.category}
                  className={`${inputClass} appearance-none pl-10 ${
                    errors.category
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="rent">Rent</option>
                  <option value="transport">Transport</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {errors.category && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="text-sm font-semibold text-slate-700"
              >
                Payment Method <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <CreditCard
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-[27px] -translate-y-1/2 text-slate-400"
                />
                <select
                  {...register("paymentMethod")}
                  id="paymentMethod"
                  aria-invalid={!!errors.paymentMethod}
                  className={`${inputClass} appearance-none pl-10 ${
                    errors.paymentMethod
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                >
                  <option value="">Select payment method</option>
                  <option value="cash">Cash</option>
                  <option value="eMoney">E-Money</option>
                </select>
              </div>

              {errors.paymentMethod && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="md:col-span-2">
              <label
                htmlFor="date"
                className="text-sm font-semibold text-slate-700"
              >
                Expense Date <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-[27px] -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register("date")}
                  type="date"
                  id="date"
                  aria-invalid={!!errors.date}
                  className={`${inputClass} pl-10 ${
                    errors.date
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                />
              </div>

              {errors.date && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-slate-700"
              >
                Notes <span className="font-normal text-slate-400">(Optional)</span>
              </label>

              <div className="relative">
                <StickyNote
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-5 text-slate-400"
                />
                <textarea
                  {...register("notes")}
                  id="notes"
                  rows={4}
                  maxLength={500}
                  placeholder="Add additional information about this expense..."
                  aria-invalid={!!errors.notes}
                  className={`${inputClass} resize-y pl-10 ${
                    errors.notes
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : ""
                  }`}
                />
              </div>

              {errors.notes && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:opacity-50"
            >
              <RotateCcw size={17} />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving Expense...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Expense
                  <ArrowLeft size={17} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Helper Note */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-emerald-700"
          />
          <p className="text-xs leading-6 text-emerald-900 sm:text-sm">
            Keep your expense information accurate to maintain organized
            financial records and make better budgeting decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
