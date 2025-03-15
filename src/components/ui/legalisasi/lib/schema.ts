export interface LegalisasiType {
  id: string;
  companyName: string;
  legalType: string;
  registrationLabel: string;
  registrationNumbers: {
    koperasiRegistration: string;
    nib: string;
    npwp: string;
    siup: string;
    skKoperasi: string;
    tdp: string;
  };
  management: {
    chairman: string;
    secretary: string;
    treasurer: string;
  };
  address: {
    street: string;
    city: string;
    district: string;
    village: string;
    province: string;
    postalCode: string;
  };
  imageUrl: string;
  createdAt: string;
}
