import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/program-affiliate/lib/ProgramAffliate';

import { toast } from 'react-hot-toast';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    handleSubmit,
    handleImageUpload,
    isSubmitting,
    isEditing
}) => {
    const addBenefit = () => {
        setFormData({
            ...formData,
            benefits: [...formData.benefits, { title: '', imageUrl: '' }]
        });
    };

    const removeBenefit = (index: number) => {
        setFormData({
            ...formData,
            benefits: formData.benefits.filter((_, i) => i !== index)
        });
    };

    const updateBenefitTitle = (index: number, value: string) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = {
            ...newBenefits[index],
            title: value
        };
        setFormData({
            ...formData,
            benefits: newBenefits
        });
    };

    const handleBenefitImageUpload = async (index: number, file: File) => {
        try {
            const imageUrl = await handleImageUpload(file);
            const newBenefits = [...formData.benefits];
            newBenefits[index] = {
                ...newBenefits[index],
                imageUrl: imageUrl
            };
            setFormData({
                ...formData,
                benefits: newBenefits
            });
        } catch (error) {
            console.error('Error uploading benefit image:', error);
            toast.error('Failed to upload image');
        }
    };

    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto">
                <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                    <div className="bg-background w-full max-w-6xl rounded-3xl shadow-2xl p-6 lg:p-8 animate-fadeIn">
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
                            {/* Basic Information */}
                            <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                                <h4 className="text-xl font-semibold text-text mb-6">Basic Information</h4>

                                <div className="space-y-4">
                                    {/* Title Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium text-text-dark block">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                            required
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="description" className="text-sm font-medium text-text-dark block">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                            rows={4}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xl font-semibold text-text">Benefits</h4>
                                    <button
                                        type="button"
                                        onClick={addBenefit}
                                        className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                                    >
                                        Add Benefit
                                    </button>
                                </div>

                                {/* Benefits List */}
                                <div className="space-y-6">
                                    {formData.benefits.map((benefit, index) => (
                                        <div key={index} className="space-y-4 p-4 bg-background-dark/20 rounded-xl">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 space-y-4">
                                                    {/* Title Input */}
                                                    <div>
                                                        <label className="text-sm font-medium text-text-dark block mb-2">
                                                            Benefit Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={benefit.title}
                                                            onChange={(e) => updateBenefitTitle(index, e.target.value)}
                                                            className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                                            placeholder="Enter benefit title..."
                                                            required
                                                        />
                                                    </div>

                                                    {/* Image Upload */}
                                                    <div>
                                                        <label className="text-sm font-medium text-text-dark block mb-2">
                                                            Benefit Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    handleBenefitImageUpload(index, file);
                                                                }
                                                            }}
                                                            className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                                        />
                                                    </div>
                                                </div>

                                                {formData.benefits.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBenefit(index)}
                                                        className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Image Preview */}
                                            {benefit.imageUrl && (
                                                <div className="relative w-full h-40 bg-background-dark rounded-xl overflow-hidden">
                                                    <Image
                                                        src={benefit.imageUrl}
                                                        alt={benefit.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
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