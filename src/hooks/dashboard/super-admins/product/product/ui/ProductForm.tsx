import React, { useState } from 'react';

import Image from 'next/image';

import { useProduct } from '@/hooks/dashboard/super-admins/product/product/lib/FetchProduct';

import { ProductFormProps } from '@/hooks/dashboard/super-admins/product/product/lib/Product';

import { useAuth } from '@/utils/context/AuthContext';

import { toast } from 'react-hot-toast';

import { productSchema, type ProductFormData } from '@/hooks/dashboard/super-admins/product/product/lib/ProductSchema';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { formatPrice } from "@/base/helper/priceFormat"

export default function ProductForm({ onClose, statusList, tagsList, categoryList, isEditing, editingProduct }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: editingProduct?.title || '',
            slug: editingProduct?.slug || '',
            price: editingProduct ? formatPrice(editingProduct.price.toString()) : '',
            status: editingProduct ? statusList.find(s => s.title === editingProduct.status)?.id || '' : '',
            category: editingProduct ? categoryList.find(c => c.title === editingProduct.category)?.id || '' : '',
            description: editingProduct?.description || '',
            tags: editingProduct ? tagsList.filter(tag => editingProduct.tags.includes(tag.title)).map(tag => tag.id) : [],
        }
    });

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(editingProduct?.image || '');
    const { createProduct, updateProduct } = useProduct();
    const { user } = useAuth();
    const [selectedTags, setSelectedTags] = useState<string[]>(
        editingProduct ? tagsList.filter(tag => editingProduct.tags.includes(tag.title)).map(tag => tag.id) : []
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate slug from title
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    // Handle title change and auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setValue('title', newTitle);
        setValue('slug', generateSlug(newTitle));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue('price', formatPrice(value));
    };

    const handleTagClick = (tagId: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tagId)) {
                return prev.filter(id => id !== tagId);
            }
            return [...prev, tagId];
        });
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);

        try {
            const selectedStatus = statusList.find(s => s.id === data.status);
            const selectedCategory = categoryList.find(c => c.id === data.category);

            if (!selectedStatus || !selectedCategory) {
                throw new Error('Status or category not found');
            }

            const selectedTagsTitles = tagsList
                .filter(tag => data.tags.includes(tag.id))
                .map(tag => tag.title);

            const priceNumber = parseInt(data.price.replace(/,/g, ''), 10);
            if (isNaN(priceNumber)) {
                throw new Error('Invalid price');
            }

            const productData = {
                title: data.title,
                slug: data.slug,
                price: priceNumber,
                status: selectedStatus.title,
                category: selectedCategory.title,
                description: data.description,
                image: editingProduct?.image || '',
                tags: selectedTagsTitles,
            };

            if (isEditing && editingProduct) {
                await updateProduct(editingProduct.id, productData, image || undefined);
            } else {
                if (!image) {
                    throw new Error('Please select an image');
                }
                await createProduct(productData, image);
            }

            const modal = document.getElementById('product_modal') as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('product_modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        onClose();
    };

    return (
        <dialog id="product_modal" className="modal">
            <div className="modal-box bg-white dark:bg-gray-800 max-w-6xl p-0 overflow-hidden rounded-2xl shadow-xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6 flex justify-between items-center z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Product' : 'Create New Product'}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form wrapper - Pindahkan form ke sini */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Modal Body */}
                    <div className="p-8 overflow-y-auto max-h-[calc(100vh-12rem)]">
                        <div className="space-y-8">
                            {/* Author Info Card */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Author Information</h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 flex-shrink-0">
                                        {user?.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt={user.fullName || ''}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                                                <span className="text-text-dark text-base">
                                                    {user?.fullName?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="font-medium text-text">{user?.fullName || 'Unknown User'}</p>
                                        <p className="text-sm text-text-dark">{user?.email || ''}</p>
                                        <p className="text-xs text-primary capitalize">{user?.role || ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Title Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Product Title
                                    </label>
                                    <input
                                        {...register('title')}
                                        type="text"
                                        onChange={handleTitleChange}
                                        className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                            } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                                        placeholder="Enter product title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Slug Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Slug <span className="text-xs text-gray-500">(Auto-generated)</span>
                                    </label>
                                    <input
                                        {...register('slug')}
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                {/* Price Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                            Rp
                                        </span>
                                        <input
                                            {...register('price')}
                                            type="text"
                                            onChange={handlePriceChange}
                                            className={`w-full px-4 py-3 pl-12 bg-white dark:bg-gray-900 border ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                                } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                                            placeholder="0"
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-red-500 text-sm">{errors.price.message}</p>
                                    )}
                                </div>

                                {/* Status Dropdown */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                    <select
                                        {...register('status')}
                                        className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border ${errors.status ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                            } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                                    >
                                        <option value="">Select Status</option>
                                        {statusList.map((status) => (
                                            <option key={status.id} value={status.id}>
                                                {status.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm">{errors.status.message}</p>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                                    {preview ? (
                                        <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 group">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                                <label className="btn btn-circle btn-ghost text-white cursor-pointer">
                                                    <input
                                                        type="file"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImage(null);
                                                        setPreview('');
                                                    }}
                                                    className="btn btn-circle btn-ghost text-white"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                        />
                                    )}
                                </div>

                                {/* Category Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select
                                        {...register('category')}
                                        className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                            } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                                    >
                                        <option value="">Select Category</option>
                                        {categoryList.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tags
                                    <span className="ml-2 text-xs text-gray-500">(Click to select multiple)</span>
                                </label>
                                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                                    {tagsList.map((tag) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => handleTagClick(tag.id)}
                                            className={`
                                                px-4 py-2 rounded-full transition-all
                                                ${selectedTags.includes(tag.id)
                                                    ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
                                                }
                                        `}
                                        >
                                            <span className="flex items-center gap-2">
                                                {selectedTags.includes(tag.id) && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {tag.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    {...register('description')}
                                    className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                                        } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[120px] resize-none`}
                                    placeholder="Enter product description..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer - Pindahkan ke dalam form */}
                    <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-8 py-2 flex justify-end gap-4 z-10">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                                </>
                            ) : (
                                <span>{isEditing ? 'Update Product' : 'Create Product'}</span>
                            )}
                        </button>
                    </div>
                </form>

                <form method="dialog" className="modal-backdrop">
                    <button onClick={onClose}>close</button>
                </form>
            </div>
        </dialog>
    );
}