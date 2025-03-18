import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.string().min(1, "Price is required"),
  status: z.string().min(1, "Please select a status"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "Please select at least one tag"),
});

export type ProductFormData = z.infer<typeof productSchema>;
