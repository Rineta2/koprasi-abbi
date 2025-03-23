interface Benefit {
  title: string;
  text: string;
  price: string;
  imageUrl: string;
}

export interface ProgramAffliateKoperasiAbbiContent {
  id?: string;
  title: string;
  benefits: Benefit[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: ProgramAffliateKoperasiAbbiContent;
  setFormData: (data: ProgramAffliateKoperasiAbbiContent) => void;
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
