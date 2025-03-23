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
    ketua: string;
    sekretaris: string;
    bendahara: string;
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

// Props untuk komponen HeaderSection
export interface HeaderSectionProps {
  data: LegalisasiType
}

// Props untuk komponen RegistrationSection
export interface RegistrationSectionProps {
  data: LegalisasiType
}

// Props untuk komponen ManagementSection
export interface ManagementSectionProps {
  data: LegalisasiType
}


// Props untuk komponen AddressSection
export interface AddressSectionProps {
  data: LegalisasiType
}
