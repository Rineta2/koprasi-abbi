interface textLeft {
  title: string;
}

interface textRight {
  title: string;
}

interface syarat {
  title: string;
}

export interface RewardsContent {
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
  formData: RewardsContent;
  setFormData: (data: RewardsContent) => void;
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
