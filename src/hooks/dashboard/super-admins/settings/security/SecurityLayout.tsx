"use client"

import React, { useState, useEffect } from 'react'

import { auth } from '@/utils/firebase'

import { useRouter } from 'next/navigation'

import SecuritySkelaton from '@/hooks/dashboard/user/pengaturan/security/SecuritySkelaton'

import DeleteAccountModal from '@/hooks/dashboard/user/pengaturan/security/ui/DeleteAccountModal'

import { motion } from 'framer-motion'

import { useAuth } from '@/utils/context/AuthContext'

export default function PrivacyContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleDeleteAccount = async () => {
        try {
            setIsDeleting(true);
            const currentUser = auth.currentUser;

            if (currentUser) {
                const idToken = await currentUser.getIdToken();

                const response = await fetch(`/api/account/${currentUser.uid}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete account');
                }

                await logout();
                router.push('/');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Gagal menghapus akun. Silakan coba login ulang dan coba lagi.');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (isLoading) {
        return <SecuritySkelaton />
    }

    return (
        <section className="min-h-full px-0 sm:px-2">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/20 dark:border-gray-800/30 p-8 mb-8"
            >
                <div className="space-y-1">
                    <h1 className='text-2xl sm:text-3xl font-bold text-text'>
                        Security Settings
                    </h1>
                    <p className='text-text-dark'>Kelola keamanan akun Anda</p>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100/10 dark:border-gray-800/30 p-10"
            >
                {/* Privacy Cards */}
                <div className="grid gap-6">
                    {/* Data Protection Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="p-6 border-gray-100 dark:border-gray-800 rounded-xl bg-background/40 backdrop-blur-2xl shadow-2xl border-gray-100/10 dark:border-gray-800/30 transition-all"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-text mb-1">Data Protection</h3>
                                <p className="text-text-dark text-sm">Data Anda dienkripsi dan dilindungi menggunakan standar industri.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Delete Account Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="p-6 border border-red-200 dark:border-red-900 rounded-xl bg-red-50 dark:bg-red-900/20"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-lg">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-text mb-1">Hapus Akun</h3>
                                    <p className="text-text-dark text-sm">Tindakan ini akan menghapus akun Anda secara permanen</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                disabled={isDeleting}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg disabled:opacity-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>{isDeleting ? 'Menghapus...' : 'Hapus Akun'}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                isLoading={isDeleting}
            />
        </section>
    )
}