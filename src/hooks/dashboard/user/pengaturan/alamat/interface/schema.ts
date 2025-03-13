import { z } from "zod";

export const addressSchema = z.object({
  province: z.string().min(1, "Provinsi harus diisi"),
  city: z.string().min(1, "Kota harus diisi"),
  district: z.string().min(1, "Kecamatan harus diisi"),
  postalCode: z
    .string()
    .min(1, "Kode pos harus diisi")
    .regex(/^\d+$/, "Kode pos harus berupa angka"),
  streetAddress: z.string().min(1, "Alamat jalan harus diisi"),
});

export const userDataSchema = z.object({
  alamatKtp: addressSchema,
  alamatDomisili: addressSchema,
  namaIbu: z.string().min(1, "Nama ibu harus diisi"),
  namaAyah: z.string().min(1, "Nama ayah harus diisi"),
  ahliWaris: z.string().min(1, "Ahli waris harus diisi"),
  statusAhliWaris: z.string().min(1, "Status ahli waris harus dipilih"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
export type UserDataSchema = z.infer<typeof userDataSchema>;
