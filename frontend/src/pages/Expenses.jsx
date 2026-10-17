import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../schemas/ExpensesSchema.js";
export default function Expenses() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors,isSubmitting  },
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
      console.log(result.expense);
      reset();
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };
  return (
    <main className="p-8">
      <h1 className="p-6 font-bold text-3xl text-emerald-950">
        Add New Expense
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="grid grid-cols-1 md:grid-cols-2 bg-white gap-6 shadow-md p-4 border border-gray-300 rounded-md"
      >
        <div>
          <div className="flex flex-col p-2">
            <label htmlFor="description" className="pb-2 text-left">
              Desciption
            </label>
            <input
              {...register("description")}
              type="text"
              id="description"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
              placeholder="e.g. Grocery Shopping, fuel, etc"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="paymentMethod" className="pb-2 text-left">
              Payment Method
            </label>
            <select
              {...register("paymentMethod")}
              id="paymentMethod"
              className="py-1 rounded-md outline-none border ring-1 text-left ring-green-400/25 px-2"
            >
              <option disabled>Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="eMoney">eMoney</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="notes" className="pb-2 text-left">
              Notes (optional)
            </label>
            <textarea
              {...register("notes")}
              id="notes"
              rows={4}
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2 resize-none"
            ></textarea>
            {errors.notes && (
              <p className="text-red-500 text-sm mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col p-2">
            <label htmlFor="date" className="pb-2 text-left">
              Date
            </label>
            <input
              {...register("date")}
              type="date"
              id="date"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="category" className="pb-2 text-left">
              Category
            </label>
            <select
              {...register("category")}
              id="category"
              className="py-1 rounded-md outline-none text-left border ring-1 ring-green-400/25 px-2"
            >
              <option disabled>Select Category</option>
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="transport">Transport</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="amount" className="pb-2 text-left">
              Amount
            </label>
            <input
              {...register("amount")}
              type="text"
              id="amount"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div className="flex gap-2 mt-6" dir="ltr">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#07845B] cursor-pointer py-1 px-3 rounded-md text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Expense"}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="bg-slate-200 py-1 px-2 rounded-md border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
