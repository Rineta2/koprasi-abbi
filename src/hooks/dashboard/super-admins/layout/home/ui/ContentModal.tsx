import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/home/lib/home';

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
            <div className="fixed inset-0 bg-text/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-background rounded-2xl shadow-xl border border-border max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    {/* Basic Information Section */}
                                    <div className="bg-card p-6 rounded-2xl space-y-6 border border-border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-text">Basic Information</h4>
                                        </div>

                                        {/* Title Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="title" className="text-sm font-medium text-text-dark">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="primaryText" className="text-sm font-medium text-text-dark">Primary Text</label>
                                            <input
                                                type="text"
                                                id="primaryText"
                                                value={formData.primaryText}
                                                onChange={(e) => setFormData({ ...formData, primaryText: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="text" className="text-sm font-medium text-text-dark">Text</label>
                                            <input
                                                type="text"
                                                id="text"
                                                value={formData.text}
                                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                required
                                            />
                                        </div>

                                        {/* Description Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-text-dark">Description</label>
                                            <textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                                                rows={4}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Button Settings */}
                                    <div className="bg-card p-6 rounded-2xl space-y-6 border border-border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-text">Button Settings</h4>
                                        </div>

                                        {/* Button 1 Settings */}
                                        <div className="space-y-4">
                                            <h5 className="text-sm font-medium text-text-dark">Primary Button</h5>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className='flex flex-col gap-2'>
                                                    <span className='text-sm font-medium text-text-dark'>Button Text</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Button Text"
                                                        value={formData.button.text}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            button: { ...formData.button, text: e.target.value }
                                                        })}
                                                        className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                        required
                                                    />
                                                </label>

                                                <label className='flex flex-col gap-2'>
                                                    <span className='text-sm font-medium text-text-dark'>Button Link</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Button Link"
                                                        value={formData.button.link}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            button: { ...formData.button, link: e.target.value }
                                                        })}
                                                        className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                        required
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-8">
                                    <div className="bg-card p-6 rounded-2xl space-y-6 border border-border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-text">Image Upload</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                                                className="w-full text-text-dark"
                                            />
                                            {(selectedImage || formData.imageUrl) && (
                                                <div className="relative w-full h-48 bg-card rounded-lg overflow-hidden">
                                                    <Image
                                                        src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const modal = document.getElementById('content_modal') as HTMLDialogElement;
                                                modal?.close();
                                            }}
                                            className="px-6 py-2 text-text-dark hover:bg-card rounded-lg transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all"
                                        >
                                            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};