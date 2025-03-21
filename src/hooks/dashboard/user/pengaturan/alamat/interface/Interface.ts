export interface UserAccount {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  username: string;
  accountType: string;
  tanggalLahir: string;
  alamatKtp?: {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
    streetAddress: string;
    details?: string;
    type: string;
  };
  alamatDomisili?: {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
    streetAddress: string;
    details?: string;
    type: string;
  };
  namaIbu: string;
  namaAyah: string;
  ahliWaris: string;
  statusAhliWaris: string;
  role: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}
