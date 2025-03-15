"use client"

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import LegalitasiCompanySkelaton from '@/hooks/dashboard/super-admins/layout/legalitasi-company/LegalitasiCompanyLayoutSkelaton'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/legalitasi-company/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/legalitasi-company/ui/DeleteModal'

import { useLegalitasiCompanyData } from '@/hooks/dashboard/super-admins/layout/legalitasi-company/lib/FetchLegalitasiCompany'

import { LegalitasiCompanyContent } from '@/hooks/dashboard/super-admins/layout/legalitasi-company/lib/legalitasi'

const initialFormData: LegalitasiCompanyContent = {
    companyName: '',
    legalType: '',
    registrationLabel: '',
    registrationNumbers: {
        skKoperasi: '',
        npwp: '',
        siup: '',
        tdp: '',
        nib: '',
        koperasiRegistration: ''
    },
    management: {
        chairman: '',
        secretary: '',
        treasurer: ''
    },
    address: {
        street: '',
        village: '',
        district: '',
        city: '',
        postalCode: ''
    },
    imageUrl: ''
};

export default function LegalitasiCompanyLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useLegalitasiCompanyData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const [formData, setFormData] = useState<LegalitasiCompanyContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            let imageUrl = formData.imageUrl
            if (selectedImage) {
                imageUrl = await handleImageUpload(selectedImage)
            }

            if (isEditing && editingId) {
                await handleUpdate(editingId, {
                    ...formData,
                    imageUrl: selectedImage ? imageUrl : formData.imageUrl
                } as LegalitasiCompanyContent)
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData as LegalitasiCompanyContent, imageUrl)
                toast.success('Content created successfully!')
            }

            resetForm()
            closeContentModal()
        } catch (error) {
            console.error('Error submitting content:', error)
            toast.error('Failed to save content. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData(initialFormData)
        setSelectedImage(null)
    }

    const closeContentModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const closeDeleteModal = () => {
        const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            await handleDelete(deleteId)
            closeDeleteModal()
        }
    }

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    if (isLoading) {
        return <LegalitasiCompanySkelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='min-h-full px-0 sm:px-2'
        >
            <AnimatePresence mode="wait">
                {contents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-card/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="space-y-3">
                            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent'>
                                Company Legal Information
                            </h1>
                            <p className='text-text-dark/80 text-lg'>Manage your company&apos;s legal documentation</p>
                        </div>

                        <button
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                            onClick={() => {
                                setIsEditing(false)
                                setEditingId(null)
                                setFormData(initialFormData)
                                setSelectedImage(null)
                                const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                modal?.showModal()
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create Content
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Content Display */}
            <AnimatePresence mode="wait">
                {contents.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                            staggerChildren: 0.1
                        }}
                        className='w-full bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/10 pt-4'
                    >
                        <div className="flex flex-col">
                            {/* Image Section */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative h-full w-full flex items-center justify-center bg-background-dark/50 overflow-hidden group"
                            >
                                <Image
                                    src={contents[0].imageUrl}
                                    alt={contents[0].companyName}
                                    width={500}
                                    height={500}
                                    className="object-cover w-40 h-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent opacity-60" />
                            </motion.div>

                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="p-8 md:p-12 flex flex-col relative overflow-hidden"
                            >
                                <div className="space-y-8 relative z-10 max-w-3xl mx-auto w-full">
                                    <div className="space-y-8">
                                        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-text to-text-dark bg-clip-text text-transparent leading-tight text-center'>
                                            {contents[0].companyName}
                                        </h2>

                                        <h3 className='text-2xl md:text-3xl leading-relaxed bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent font-bold text-center'>
                                            {contents[0].legalType}
                                        </h3>

                                        <div className='space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <h4 className='text-xl font-semibold text-text-dark'>Registration Numbers</h4>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-text-dark/90'>
                                                {Object.entries(contents[0].registrationNumbers).map(([key, value]) => (
                                                    <div key={key} className="flex flex-col gap-1">
                                                        <span className="text-sm text-text-dark/60">{key}</span>
                                                        <span className="font-medium">{value || '-'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <h4 className='text-xl font-semibold text-text-dark'>Management</h4>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-text-dark/90'>
                                                {Object.entries(contents[0].management).map(([role, name]) => (
                                                    <div key={role} className="flex flex-col gap-1">
                                                        <span className="text-sm text-text-dark/60">{role}</span>
                                                        <span className="font-medium">{name || '-'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='space-y-4 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <h4 className='text-xl font-semibold text-text-dark'>Address</h4>
                                            </div>
                                            <p className='text-text-dark/90 leading-relaxed text-center'>
                                                {contents[0].address.street}, {contents[0].address.village},
                                                <br />
                                                {contents[0].address.district}, {contents[0].address.city} {contents[0].address.postalCode}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10 justify-center">
                                        <button
                                            onClick={() => {
                                                setDeleteId(contents[0].id!)
                                                const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                                deleteModal?.showModal()
                                            }}
                                            className="px-6 py-3.5 text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-lg hover:shadow-red-500/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormData(contents[0])
                                                setIsEditing(true)
                                                setEditingId(contents[0].id || null)
                                                const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                                modal?.showModal()
                                            }}
                                            className="px-6 py-3.5 text-primary bg-primary/10 hover:bg-primary/20 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 md:p-16 text-center"
                    >
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-text">No Content Yet</h3>
                            <p className="text-text-dark">Create your first hero section content to get started.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContentModal
                formData={formData as LegalitasiCompanyContent}
                setFormData={(data: LegalitasiCompanyContent) => setFormData(data)}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={closeDeleteModal}
            />
        </motion.section>
    );
}