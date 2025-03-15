export interface AssetsContent {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  svgUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: AssetsContent;
  setFormData: (data: AssetsContent) => void;
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
