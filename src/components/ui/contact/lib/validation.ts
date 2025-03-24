import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string()
    .min(3, "Nama harus minimal 3 karakter")
    .max(30, "Nama tidak boleh lebih dari 30 karakter")
    .regex(/^[A-Za-z][A-Za-z0-9\s\-]*$/, "Nama hanya boleh mengandung huruf, angka, spasi, dan tanda hubung"),

  email: z.string()
    .email("Format email tidak valid"),

  phone: z.string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka"),

  message: z.string()
    .min(10, "Pesan minimal 10 karakter")
    .max(500, "Pesan maksimal 500 karakter"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;