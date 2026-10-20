import { z } from "zod";

export const contactShema = z.object({
  fullName: z
    .string()
    .trim()
    .min(4, "The full name must be over the 3 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Thu sujbect must be over the 3 characters"),
  message: z
    .string()
    .trim()
    .min(3, "your message not be one or three characters")
    .max(200, "your message can't be over the 200 characters"),
});
