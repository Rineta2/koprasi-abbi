import React from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/Testimonials';

// Komponen untuk menampilkan rating stars
const RatingStars = ({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) => (
    <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className="text-yellow-400 hover:scale-110 transition-transform"
            >
                {star <= rating ? <FaStar size={32} /> : <FaRegStar size={32} />}
            </button>
        ))}
    </div>
);

// Komponen input field yang dapat digunakan kembali
const InputField = ({
    label,
    id,
    value,
    onChange,
    type = "text",
    rows,
}: {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    rows?: number;
}) => (
    <div className="space-y-2 w-full">
        <label htmlFor={id} className="text-sm font-medium text-text-dark block">
            {label}
        </label>

        {type === "textarea" ? (
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl resize-none"
                rows={rows}
                required
            />
        ) : (
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                required
            />
        )}
    </div>
);

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    handleSubmit,
    handleImageUpload,
    isSubmitting,
    isEditing
}) => {
    const updateFormField = (field: string, value: string | number) => {
        if (field === 'rating') {
            setFormData({ ...formData, [field]: Number(value) });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50">
                <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                    <div className="bg-background w-full max-w-6xl rounded-3xl shadow-2xl p-6 lg:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-text">
                                {isEditing ? 'Edit Content' : 'Create New Content'}
                            </h2>
                            <p className="text-text-dark/70 mt-2">
                                {isEditing ? 'Update your content information below' : 'Fill in the details to create new content'}
                            </p>
                        </div>

                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="space-y-8"
                        >
                            <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                                <h4 className="text-xl font-semibold text-text mb-6">Basic Information</h4>

                                <div className="space-y-4">
                                    <div className='flex gap-4 w-full'>
                                        <InputField
                                            label="Name"
                                            id="name"
                                            value={formData.name}
                                            onChange={(value) => updateFormField('name', value)}
                                        />

                                        <InputField
                                            label="Position"
                                            id="position"
                                            value={formData.position}
                                            onChange={(value) => updateFormField('position', value)}
                                        />
                                    </div>

                                    {/* Image Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="image" className="text-sm font-medium text-text-dark block">
                                            Image
                                        </label>

                                        {!formData.imageUrl ? (
                                            <input
                                                type="file"
                                                id="image"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const imageUrl = await handleImageUpload(file);
                                                            setFormData({ ...formData, imageUrl });
                                                        } catch (error) {
                                                            console.error('Error uploading image:', error);
                                                            toast.error('Failed to upload image. Please try again.');
                                                        }
                                                    }
                                                }}
                                                className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                                accept="image/*"
                                                required
                                            />
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="relative w-full h-40 bg-background-dark rounded-xl overflow-hidden">
                                                    <Image
                                                        src={formData.imageUrl}
                                                        alt={formData.name || 'Preview'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <FaTimes size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <InputField
                                        label="Description"
                                        id="description"
                                        value={formData.description}
                                        onChange={(value) => updateFormField('description', value)}
                                        type="textarea"
                                        rows={4}
                                    />

                                    {/* Rating Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-dark block">Rating</label>
                                        <RatingStars
                                            rating={formData.rating}
                                            onChange={(rating) => updateFormField('rating', rating)}
                                        />
                                    </div>


                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const modal = document.getElementById('content_modal') as HTMLDialogElement;
                                        modal?.close();
                                    }}
                                    className="px-6 py-3 text-text-dark hover:bg-background-dark rounded-xl transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Content' : 'Create Content'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};