interface Benefit {
  title: string;
  imageUrl: string;
}

export interface ProgramAffliateContent {
  id?: string;
  title: string;
  description: string;
  benefits: Benefit[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: ProgramAffliateContent;
  setFormData: (data: ProgramAffliateContent) => void;
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
