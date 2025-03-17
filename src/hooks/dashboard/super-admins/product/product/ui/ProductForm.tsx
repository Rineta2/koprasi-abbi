import React, { useState } from 'react';
import Image from 'next/image';
import { useProduct } from '@/hooks/dashboard/super-admins/product/product/lib/FetchProduct';
import { StatusProduct } from '@/hooks/dashboard/super-admins/product/product/lib/Product';
import { useAuth } from '@/utils/context/AuthContext';

interface ProductFormProps {
    onClose: () => void;
    statusList: StatusProduct[];
    isEditing: boolean;
}

export default function ProductForm({ onClose, statusList, isEditing }: ProductFormProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const { createProduct } = useProduct();
    const { user } = useAuth();

    // Generate slug from title
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphen
            .replace(/-+/g, '-')        // Replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens
    };

    // Handle title change and auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const formatPrice = (value: string) => {
        const number = value.replace(/\D/g, '');
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPrice(formatPrice(value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image');
            return;
        }

        try {
            const selectedStatus = statusList.find(s => s.id === status);
            if (!selectedStatus) {
                throw new Error('Status not found');
            }

            const priceNumber = parseInt(price.replace(/,/g, ''), 10);
            if (isNaN(priceNumber)) {
                throw new Error('Invalid price');
            }

            await createProduct({
                title,
                slug,
                price: priceNumber,
                status: selectedStatus.title,
                description,
                image: '',
            }, image);

            const modal = document.getElementById('product_modal') as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            onClose();
        } catch (error) {
            console.error('Error creating product:', error);
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
            <div className="modal-box bg-card max-w-6xl p-0 overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">
                        {isEditing ? 'Edit Product' : 'Create New Product'}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="btn btn-circle btn-ghost btn-sm hover:bg-background-dark text-text transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Author Info (Read Only) */}
                        <div className="bg-background-dark rounded-2xl p-5">
                            <h3 className="text-sm font-medium text-text-dark mb-4">Author Information</h3>
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

                        {/* Form Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full p-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text">
                                    Slug
                                    <span className="ml-2 text-xs text-text-dark">(Auto-generated)</span>
                                </label>

                                <input
                                    type="text"
                                    value={slug}
                                    className="w-full p-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            {/* Price */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dark">
                                        Rp
                                    </span>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={handlePriceChange}
                                        className="w-full p-3.5 pl-11 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    {statusList.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Add Description field after the grid layout */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px]"
                                placeholder="Enter product description..."
                                required
                            />
                        </div>

                        {/* Image Upload - Full Width */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">Image</label>
                            {preview ? (
                                <div className="relative w-full h-56 rounded-xl overflow-hidden border border-border group">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-contain"
                                    />
                                    {/* Overlay with actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                        {/* Change Image Button */}
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
                                        {/* Remove Image Button */}
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
                                    className="w-full p-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                    required
                                />
                            )}
                        </div>
                    </form>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-4 z-10">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3.5 bg-background-dark hover:bg-background-dark/80 text-text rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all"
                    >
                        {isEditing ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}