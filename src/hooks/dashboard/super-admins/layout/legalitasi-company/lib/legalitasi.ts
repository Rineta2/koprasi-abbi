export interface Button {
  text: string;
  link: string;
}

export interface LegalitasiCompanyContent {
  id?: string;
  companyName: string;
  legalType: string;
  registrationLabel: string;
  registrationNumbers: {
    skKoperasi: string;
    npwp: string;
    siup: string;
    tdp: string;
    nib: string;
    koperasiRegistration: string;
  };
  management: {
    chairman: string;
    secretary: string;
    treasurer: string;
  };
  address: {
    street: string;
    village: string;
    district: string;
    city: string;
    postalCode: string;
  };
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: LegalitasiCompanyContent;
  setFormData: (data: LegalitasiCompanyContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
