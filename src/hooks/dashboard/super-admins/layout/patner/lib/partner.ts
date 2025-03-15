// Featured Content
export interface PartnerContent {
  id?: string;
  imageUrl: string;
  createdAt?: string;
}

// Featured Grid
export interface PartnerGridProps {
  contents: PartnerContent[];
  onEdit: (content: PartnerContent) => void;
  onDelete: (content: PartnerContent) => void;
}

// Featured Header
export interface PartnerHeaderProps {
  onCreateClick: () => void;
}

// Delete Modal
export interface DeleteModalProps {
  onConfirm: (id: string) => Promise<void>;
  editingId: string | null;
}

// Content Modal
export interface ContentModalProps {
  isEditing: boolean;
  formData: PartnerContent;
  setFormData: (data: PartnerContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}
