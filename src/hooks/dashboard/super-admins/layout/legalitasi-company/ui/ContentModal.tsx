import React from 'react';

import Image from 'next/image';

import { LegalitasiCompanyContent } from '@/hooks/dashboard/super-admins/layout/legalitasi-company/lib/legalitasi';

interface ContentModalProps {
    formData: LegalitasiCompanyContent;
    setFormData: (data: LegalitasiCompanyContent) => void;
    selectedImage: File | null;
    setSelectedImage: (file: File | null) => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
    isEditing: boolean;
}

export function ContentModal({
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    isSubmitting,
    isEditing
}: ContentModalProps) {
    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-background rounded-2xl shadow-xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <h3 className="font-bold text-lg mb-4">
                            {isEditing ? 'Edit Content' : 'Create New Content'}
                        </h3>

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
                                    <div className="bg-background-dark/50 p-6 rounded-2xl space-y-6 border border-background-dark">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-text">Basic Information</h4>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="companyName" className="text-sm font-medium text-text-dark">Company Name</label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="legalType" className="text-sm font-medium text-text-dark">Legal Type</label>
                                            <input
                                                type="text"
                                                id="legalType"
                                                value={formData.legalType}
                                                onChange={(e) => setFormData({ ...formData, legalType: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        {/* Registration Numbers */}
                                        <div className="space-y-4">
                                            <h5 className="text-sm font-medium text-text-dark">Registration Label</h5>
                                            <input
                                                type="text"
                                                placeholder="Registration Label"
                                                value={formData.registrationLabel}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    registrationLabel: e.target.value
                                                })}
                                                className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                            />

                                            <h5 className="text-sm font-medium text-text-dark">Registration Numbers</h5>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="SK Koperasi"
                                                    value={formData.registrationNumbers.skKoperasi}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            skKoperasi: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="NPWP"
                                                    value={formData.registrationNumbers.npwp}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            npwp: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="SIUP"
                                                    value={formData.registrationNumbers.siup}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            siup: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="TDP"
                                                    value={formData.registrationNumbers.tdp}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            tdp: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="NIB"
                                                    value={formData.registrationNumbers.nib}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            nib: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Koperasi Registration"
                                                    value={formData.registrationNumbers.koperasiRegistration}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        registrationNumbers: {
                                                            ...formData.registrationNumbers,
                                                            koperasiRegistration: e.target.value
                                                        }
                                                    })}
                                                    className="px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Management */}
                                        <div className="space-y-4">
                                            <h5 className="text-sm font-medium text-text-dark">Management</h5>
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Ketua"
                                                    value={formData.management.ketua}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        management: {
                                                            ...formData.management,
                                                            ketua: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Sekretaris"
                                                    value={formData.management.sekretaris}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        management: {
                                                            ...formData.management,
                                                            sekretaris: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Bendahara"
                                                    value={formData.management.bendahara}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        management: {
                                                            ...formData.management,
                                                            bendahara: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-4">
                                            <h5 className="text-sm font-medium text-text-dark">Address</h5>
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Street"
                                                    value={formData.address.street}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        address: {
                                                            ...formData.address,
                                                            street: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Village"
                                                    value={formData.address.village}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        address: {
                                                            ...formData.address,
                                                            village: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="District"
                                                    value={formData.address.district}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        address: {
                                                            ...formData.address,
                                                            district: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    value={formData.address.city}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        address: {
                                                            ...formData.address,
                                                            city: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Postal Code"
                                                    value={formData.address.postalCode}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        address: {
                                                            ...formData.address,
                                                            postalCode: e.target.value
                                                        }
                                                    })}
                                                    className="w-full px-4 py-2 bg-background border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-8">
                                    <div className="bg-background-dark/50 p-6 rounded-2xl space-y-6 border border-background-dark">
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
                                                <div className="relative w-full h-48 bg-background-dark rounded-lg overflow-hidden">
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
                                            className="px-6 py-2 text-text-dark hover:bg-background-dark rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 disabled:opacity-50"
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
}