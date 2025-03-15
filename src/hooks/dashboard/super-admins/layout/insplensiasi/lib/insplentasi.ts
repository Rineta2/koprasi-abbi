export interface InsplensiasiContent {
  id?: string;
  title: string;
  imageUrl: string;
  svgUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: InsplensiasiContent;
  setFormData: (data: InsplensiasiContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  selectedSvg: File | null;
  setSelectedSvg: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
