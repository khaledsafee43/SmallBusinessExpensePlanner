import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Expenses() {
  return (
    <main className="p-8">
      <h1 className="p-6 font-bold text-3xl text-emerald-950">
        Add New Expense
      </h1>
      <form
        dir="rtl"
        className="grid grid-cols-1 md:grid-cols-2 bg-white gap-6 shadow-md p-4 border border-gray-300 rounded-md"
      >
        <div>
          <div className="flex flex-col p-2">
            <label htmlFor="description" className="pb-2 text-left">
              Desciption
            </label>
            <input
              type="text"
              id="description"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
              placeholder="e.g. Grocery Shopping, fuel, etc"
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="paymentMethod" className="pb-2 text-left">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="py-1 rounded-md outline-none border ring-1 text-left ring-green-400/25 px-2"
            >
              <option disabled>Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="eMoney">eMoney</option>
            </select>
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="notes" className="pb-2 text-left">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={6}
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2 resize-none"
            ></textarea>
          </div>
        </div>
        <div>
          <div className="flex flex-col p-2">
            <label htmlFor="date" className="pb-2 text-left">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="category" className="pb-2 text-left">
              Category
            </label>
            <select
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
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="amount" className="pb-2 text-left">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              className="py-1 rounded-md text-left outline-none border ring-1 ring-green-400/25 px-2"
            />
          </div>
          <div className="flex gap-2 mt-6" dir="ltr">
            <button className="bg-[#07845B] py-1 px-3 rounded-md text-white">
              Save Expense
            </button>
            <button className="bg-slate-200 py-1 px-2 rounded-md border border-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
