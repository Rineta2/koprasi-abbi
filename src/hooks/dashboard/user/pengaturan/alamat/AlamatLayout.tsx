"use client"

import React, { useState, useEffect } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { db } from '@/utils/firebase';

import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';

import { UserAccount } from './interface/Interface';

import toast from 'react-hot-toast';

import AddressSkelaton from '@/hooks/dashboard/user/pengaturan/alamat/AlamatSkelaton';

import { userDataSchema } from '@/hooks/dashboard/user/pengaturan/alamat/interface/schema';

export default function AlamatLayout() {
    const { user } = useAuth();
    const [formData, setFormData] = useState<Partial<UserAccount>>({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user?.uid as string);
                const userData = (await getDoc(userDoc)).data() as UserAccount;

                // Pre-fill the form with existing data
                setFormData({
                    ...userData,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Gagal mengambil data pengguna');
                setLoading(false);
            }
        };

        if (user?.uid) {
            fetchUserData();
        }
    }, [user]);

    const handleInputChange = (type: 'alamatKtp' | 'alamatDomisili', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    // Function to check if data exists
    const hasExistingData = () => {
        return !!(formData.alamatKtp || formData.alamatDomisili || formData.namaIbu || formData.namaAyah || formData.ahliWaris);
    };

    const handleSubmit = async () => {
        try {
            setIsSaving(true);
            // Validate the form data
            const validationResult = userDataSchema.safeParse({
                alamatKtp: formData.alamatKtp,
                alamatDomisili: formData.alamatDomisili,
                namaIbu: formData.namaIbu,
                namaAyah: formData.namaAyah,
                ahliWaris: formData.ahliWaris,
                statusAhliWaris: formData.statusAhliWaris,
            });

            if (!validationResult.success) {
                // Show validation errors
                const errors = validationResult.error.errors;
                errors.forEach(error => {
                    toast.error(error.message);
                });
                setIsSaving(false);
                return;
            }

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user?.uid as string);
            await updateDoc(userRef, {
                ...validationResult.data,
                updatedAt: Timestamp.now()
            });
            toast.success('Data berhasil diperbarui');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Gagal memperbarui data');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <AddressSkelaton />;
    }

    return (
        <section className="min-h-full px-2 sm:px-4 py-4 sm:py-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-background dark:bg-background-dark rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Alamat Saya
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        Kelola alamat pengiriman Anda
                    </p>
                </div>
            </div>

            {/* User Info Card */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background dark:bg-background-dark rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            Informasi Pengguna
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Detail akun dan informasi pribadi</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                        { label: 'Nama Lengkap', value: formData.fullName },
                        { label: 'Username', value: formData.username },
                        { label: 'Email', value: formData.email },
                        { label: 'Nomor Telepon', value: formData.phoneNumber },
                        {
                            label: 'Tanggal Bergabung',
                            value: formData.createdAt instanceof Timestamp
                                ? formData.createdAt.toDate().toLocaleString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short'
                                })
                                : '-'
                        }
                    ].map((item, index) => (
                        <div key={index} className="p-4 bg-background-dark dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {item.label}
                            </p>
                            <p className="text-base text-gray-900 dark:text-gray-200">
                                {item.value || '-'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Family Info Card */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background dark:bg-background-dark rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                Informasi Keluarga
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Data keluarga dan ahli waris</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                        {
                            label: 'Nama Ibu',
                            value: formData.namaIbu,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData(prev => ({ ...prev, namaIbu: e.target.value }))
                        },
                        {
                            label: 'Nama Ayah',
                            value: formData.namaAyah,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData(prev => ({ ...prev, namaAyah: e.target.value }))
                        },
                        {
                            label: 'Ahli Waris',
                            value: formData.ahliWaris,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormData(prev => ({ ...prev, ahliWaris: e.target.value }))
                        }
                    ].map((item, index) => (
                        <div key={index} className="space-y-2">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {item.label}
                            </label>

                            <input
                                type="text"
                                placeholder={item.label}
                                value={item.value || ''}
                                onChange={item.onChange}
                                disabled={hasExistingData() && !isEditing}
                                className="input w-full px-4 py-3 bg-background-dark dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300
                                disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-background-dark dark:disabled:bg-gray-800 
                                disabled:text-text dark:disabled:text-text-dark"
                            />
                        </div>
                    ))}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Status Ahli Waris
                        </label>
                        <select
                            value={formData.statusAhliWaris || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, statusAhliWaris: e.target.value }))}
                            disabled={hasExistingData() && !isEditing}
                            className="select w-full px-4 py-3 bg-background-dark dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300
                            disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-background-dark dark:disabled:bg-gray-800 
                            disabled:text-text dark:disabled:text-text-dark"
                        >
                            <option value="">Pilih Status</option>
                            {['Anak', 'Istri', 'Suami', 'Orang Tua', 'Saudara Kandung', 'Kerabat'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Address Cards */}
            {['KTP', 'Domisili'].map((type) => (
                <div key={type} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-background dark:bg-background-dark rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                    Alamat {type}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Detail alamat {type.toLowerCase()}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-background-dark dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full w-full sm:w-auto text-center sm:text-left">
                            Terakhir diperbarui: {formData.updatedAt instanceof Timestamp ?
                                formData.updatedAt.toDate().toLocaleString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short'
                                }) : '-'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {[
                            { field: 'province', label: 'Provinsi' },
                            { field: 'city', label: 'Kota' },
                            { field: 'district', label: 'Kecamatan' },
                            { field: 'postalCode', label: 'Kode Pos' },
                            { field: 'streetAddress', label: 'Alamat Jalan', colSpan: true }
                        ].map((item, index) => (
                            <div key={index} className={`space-y-2 ${item.colSpan ? 'sm:col-span-2' : ''}`}>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {item.label}
                                </label>
                                <input
                                    type="text"
                                    placeholder={item.label}
                                    value={type.toLowerCase() === 'ktp'
                                        ? formData.alamatKtp?.[item.field as keyof typeof formData.alamatKtp] || ''
                                        : formData.alamatDomisili?.[item.field as keyof typeof formData.alamatDomisili] || ''
                                    }
                                    onChange={(e) => handleInputChange(
                                        type.toLowerCase() === 'ktp' ? 'alamatKtp' : 'alamatDomisili',
                                        item.field,
                                        e.target.value
                                    )}
                                    disabled={hasExistingData() && !isEditing}
                                    className="input w-full px-4 py-3 bg-background-dark dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300
                                    disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-background-dark dark:disabled:bg-gray-800 
                                    disabled:text-text dark:disabled:text-text-dark"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-end mt-4 sm:mt-6">
                {hasExistingData() ? (
                    isEditing ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="w-full sm:w-auto btn px-6 sm:px-8 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Menyimpan...</span>
                                </div>
                            ) : (
                                'Simpan Perubahan'
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full sm:w-auto btn px-6 sm:px-8 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            Edit
                        </button>
                    )
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="w-full sm:w-auto btn px-6 sm:px-8 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Menyimpan...</span>
                            </div>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}
