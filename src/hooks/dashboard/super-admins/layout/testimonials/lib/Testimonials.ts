export interface TestimonialsContent {
  id?: string;
  rating: number;
  description: string;
  name: string;
  position: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: TestimonialsContent;
  setFormData: (data: TestimonialsContent) => void;
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


// Testimonial Card Props

export interface TestimonialCardProps {
  content: TestimonialsContent;
  onDelete: (id: string) => void;
  onEdit: (content: TestimonialsContent) => void;
}

// 

export const initialFormData: TestimonialsContent = {
  description: '',
  name: '',
  position: '',
  imageUrl: '',
  rating: 0,
};