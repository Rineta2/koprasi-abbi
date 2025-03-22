import React from 'react';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/potensi-sponsor/lib/PotensiSponsor';

import Image from 'next/image';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    handleSubmit,
    isSubmitting,
    isEditing,
    handleImageUpload
}) => {
    const addTextLeft = () => {
        setFormData({
            ...formData,
            textLeft: [...formData.textLeft, { title: '' }]
        });
    };

    const addTextRight = () => {
        setFormData({
            ...formData,
            textRight: [...formData.textRight, { title: '' }]
        });
    };

    const addSyarat = () => {
        setFormData({
            ...formData,
            syarat: [...formData.syarat, { title: '' }]
        });
    };

    const removeTextLeft = (index: number) => {
        setFormData({
            ...formData,
            textLeft: formData.textLeft.filter((_, i) => i !== index)
        });
    };

    const removeTextRight = (index: number) => {
        setFormData({
            ...formData,
            textRight: formData.textRight.filter((_, i) => i !== index)
        });
    };

    const removeSyarat = (index: number) => {
        setFormData({
            ...formData,
            syarat: formData.syarat.filter((_, i) => i !== index)
        });
    };

    const updateBenefitTitle = (index: number, section: 'textLeft' | 'textRight' | 'syarat', value: string) => {
        const newArray = [...formData[section]];
        newArray[index] = {
            ...newArray[index],
            title: value
        };
        setFormData({
            ...formData,
            [section]: newArray
        });
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

                                    {/* Image Upload Section */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-dark block">
                                            Image
                                        </label>

                                        {!formData.imageUrl ? (
                                            // Show file input if no image
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const imageUrl = await handleImageUpload(file);
                                                            setFormData({
                                                                ...formData,
                                                                imageUrl: imageUrl
                                                            });
                                                        } catch (error) {
                                                            console.error('Error uploading image:', error);
                                                        }
                                                    }
                                                }}
                                                className="w-full px-4 py-3 bg-background border-2 border-background-dark rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                                required
                                            />
                                        ) : (
                                            // Show preview and remove button if image exists
                                            <div className="space-y-4">
                                                <div className="w-full max-w-xs h-48 rounded-xl overflow-hidden border-2 border-background-dark">
                                                    <Image
                                                        src={formData.imageUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        imageUrl: ''
                                                    })}
                                                    className="px-4 py-2 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Remove Image
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Sections */}
                            <div className="bg-background-dark/30 p-8 rounded-2xl border-2 border-background-dark/50">
                                <h4 className="text-xl font-semibold text-text mb-6">Benefits</h4>

                                {/* Text Left Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className="text-lg font-semibold text-text">Text Left</h5>
                                        <button
                                            type="button"
                                            onClick={addTextLeft}
                                            className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                                        >
                                            Add Title
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {formData.textLeft.map((item, index) => (
                                            <div key={`left-${index}`} className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateBenefitTitle(index, 'textLeft', e.target.value)}
                                                    className="flex-1 px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                                    placeholder="Enter benefit title..."
                                                    required
                                                />
                                                {formData.textLeft.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTextLeft(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Text Right Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className="text-lg font-semibold text-text">Text Right</h5>
                                        <button
                                            type="button"
                                            onClick={addTextRight}
                                            className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                                        >
                                            Add Description
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {formData.textRight.map((item, index) => (
                                            <div key={`right-${index}`} className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateBenefitTitle(index, 'textRight', e.target.value)}
                                                    className="flex-1 px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                                    placeholder="Enter benefit description..."
                                                    required
                                                />
                                                {formData.textRight.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTextRight(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Syarat Section */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className="text-lg font-semibold text-text">Requirements</h5>
                                        <button
                                            type="button"
                                            onClick={addSyarat}
                                            className="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                                        >
                                            Add Requirement
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {formData.syarat.map((item, index) => (
                                            <div key={`syarat-${index}`} className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => updateBenefitTitle(index, 'syarat', e.target.value)}
                                                    className="flex-1 px-4 py-3 bg-background border-2 border-background-dark rounded-xl"
                                                    placeholder="Enter requirement..."
                                                    required
                                                />
                                                {formData.syarat.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSyarat(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
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