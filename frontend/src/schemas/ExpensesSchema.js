import { z } from "zod";

export const expenseSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters"),

  paymentMethod: z.enum(["cash", "eMoney"], {
    message: "Please select a valid payment method",
  }),

  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),

  date: z
    .string()
    .min(1, "Date is required")
    .refine((value) => {
      const parsedDate = new Date(`${value}T00:00:00`);
      return (
        !isNaN(parsedDate.getTime()) &&
        parsedDate.toISOString().slice(0, 10) === value
      );
    }, "Please enter a valid date")
    .refine(
      (value) => value <= new Date().toLocaleDateString("en-CA"),
      "Date cannot be in the future",
    ),

  category: z.enum(["food", "rent", "transport", "other"], {
    message: "Please select a valid category",
  }),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((value) => {
      const amount = Number(value);
      return Number.isFinite(amount) && amount > 0;
    }, "Amount must be a number greater than zero"),
});
