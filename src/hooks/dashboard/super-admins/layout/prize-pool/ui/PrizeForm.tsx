import { useState } from 'react';

import Image from 'next/image';

import toast from 'react-hot-toast';

import { prizeService } from '@/hooks/dashboard/super-admins/layout/prize-pool/lib/FetchPrize';

import { Prize } from '@/hooks/dashboard/super-admins/layout/prize-pool/lib/prize';

interface PrizeFormProps {
    onSuccess?: () => void;
    initialData?: Prize | null;
}

export default function PrizeForm({ onSuccess, initialData }: PrizeFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image && !initialData) {
            toast.error('Please select an image');
            return;
        }

        const loadingToast = toast.loading(initialData ? 'Updating prize...' : 'Creating prize...');
        setLoading(true);

        try {
            if (initialData) {
                await prizeService.updatePrize({
                    ...initialData,
                    title,
                    updatedAt: new Date()
                }, image);
            } else {
                await prizeService.createPrize({
                    title,
                    imageUrl: '',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, image!);
            }

            // Reset form
            setTitle('');
            setImage(null);
            setPreviewUrl('');

            // Show success message
            toast.success(initialData ? 'Prize updated successfully!' : 'Prize created successfully!');

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to save prize');
        } finally {
            toast.dismiss(loadingToast);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-text-dark block">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter prize title"
                        className="w-full px-4 py-2.5 bg-background border border-background-dark rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-text-dark block">Image</label>
                    {!image && !previewUrl ? (
                        <label
                            htmlFor="image"
                            className="border-2 border-dashed border-background-dark/50 rounded-xl p-8
                                hover:border-primary/50 hover:bg-primary/5 transition-all duration-200
                                flex flex-col items-center justify-center cursor-pointer"
                        >
                            <div className="p-3 bg-primary/10 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-text-dark mb-1">Click to upload image</p>
                            <p className="text-xs text-text-dark/60">PNG, JPG up to 10MB</p>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 10 * 1024 * 1024) {
                                            toast.error('File size should be less than 10MB');
                                            return;
                                        }
                                        setImage(file);
                                    }
                                }}
                                accept="image/*"
                                className="hidden"
                                required
                            />
                        </label>
                    ) : (
                        <div className="space-y-3">
                            <div className="relative w-full aspect-video bg-background-dark rounded-xl overflow-hidden">
                                <Image
                                    src={image ? URL.createObjectURL(image) : previewUrl}
                                    alt="Image Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    Remove
                                </button>
                                <label
                                    htmlFor="image-change"
                                    className="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer"
                                >
                                    Change Image
                                    <input
                                        id="image-change"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 10 * 1024 * 1024) {
                                                    toast.error('File size should be less than 10MB');
                                                    return;
                                                }
                                                setImage(file);
                                            }
                                        }}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Prize' : 'Create Prize')}
                </button>
            </div>
        </form>
    );
}