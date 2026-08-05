import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .default(""),

  priority: z
    .enum(["low", "medium", "high"])
    .default("medium"),

  category: z
    .string()
    .trim()
    .max(50, "Category cannot exceed 50 characters")
    .default("General"),

  dueDate: z.coerce.date().optional(),
});