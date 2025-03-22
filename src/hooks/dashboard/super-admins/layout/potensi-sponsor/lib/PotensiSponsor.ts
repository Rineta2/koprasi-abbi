interface textLeft {
  title: string;
}

interface textRight {
  title: string;
}

interface syarat {
  title: string;
}

export interface PotensiSponsorContent {
  id?: string;
  title: string;
  imageUrl: string;
  textLeft: textLeft[];
  textRight: textRight[];
  syarat: syarat[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: PotensiSponsorContent;
  setFormData: (data: PotensiSponsorContent) => void;
  handleSubmit: () => void;
  handleImageUpload: (file: File) => Promise<string>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
