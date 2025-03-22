import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/lib/BonusSponsor';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    isSubmitting,
    isEditing
}) => {
    return (
        <dialog id="content_modal" className="modal">
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto">
                {/* Modal Container */}
                <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                    {/* Modal Content */}
                    <div className="bg-background w-full max-w-6xl rounded-3xl shadow-2xl p-6 lg:p-8 animate-fadeIn">
                        {/* Added Modal Header */}
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
                            {/* Form Grid Layout */}
                            <div className="flex flex-col gap-8">
                                {/* Left Column - Basic Information */}
                                <div className="space-y-6">
                                    <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                                        {/* Section Header */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-xl font-semibold text-text">Basic Information</h4>
                                        </div>

                                        {/* Form Fields */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label htmlFor="title" className="text-sm font-medium text-text-dark block">Title</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                                    placeholder="Enter title here..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="bg-background-dark/30 p-6 rounded-2xl border border-background-dark/50 transition-all hover:border-primary/30">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-primary/10 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-text">Image Upload</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                                            className="w-full text-text-dark file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-white hover:file:bg-primary/20 transition-all"
                                        />
                                        {(selectedImage || formData.imageUrl) && (
                                            <div className="relative w-full aspect-video bg-background-dark rounded-xl overflow-hidden">
                                                <Image
                                                    src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                                    alt="Image Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
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
                                    className="px-6 py-3 text-text-dark hover:bg-background-dark rounded-xl transition-all duration-300 border-2 border-background-dark/50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-primary text-background rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
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