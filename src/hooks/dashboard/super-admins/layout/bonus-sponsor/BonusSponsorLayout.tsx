"use client"

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import InsplensiasiSkelaton from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/BonusSponsorSkelaton'

import { BonusSponsorContent } from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/lib/BonusSponsor'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/ui/DeleteModal'

import { useBonusSponsorData } from '@/hooks/dashboard/super-admins/layout/bonus-sponsor/lib/FetchDataBonusSponsor'

const initialFormData: BonusSponsorContent = {
    title: '',
    imageUrl: ''
};

export default function DataBlockcheinLayout() {
    const {
        isLoading,
        bonussponsor,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useBonusSponsorData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [formData, setFormData] = useState<BonusSponsorContent>(initialFormData)

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
                })
                toast.success('Content updated successfully!')
            } else {
                await createContent({
                    ...formData,
                    imageUrl
                })
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
        return <InsplensiasiSkelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='min-h-full px-0 sm:px-2'
        >
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-card/80 backdrop-blur-sm p-8 rounded-3xl border border-card-border"
                >
                    <div className="space-y-3">
                        <h1 className='text-3xl md:text-4xl font-bold text-gray-700'>
                            Bonus Sponsor
                        </h1>
                        <p className='text-gray-600 text-lg'>Manage your insplensiasi page</p>
                    </div>
                    {bonussponsor.length === 0 && (

                        <button
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
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
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Hero Content Display */}
            <AnimatePresence mode="wait">
                {bonussponsor.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                            staggerChildren: 0.1
                        }}
                        className='w-full bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden'
                    >
                        <div className="flex flex-col">
                            {/* Image Section - Moved to top */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative h-full w-full bg-background-dark/50 overflow-hidden group flex items-center justify-center"
                            >
                                <Image
                                    src={bonussponsor[0].imageUrl}
                                    alt={bonussponsor[0].title}
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="p-8 flex flex-col items-center text-center"
                            >
                                <div className="space-y-8 max-w-2xl mx-auto">
                                    <div className="space-y-6 mt-8">
                                        <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-text to-text-dark bg-clip-text text-transparent'>
                                            {bonussponsor[0].title}
                                        </h2>
                                    </div>

                                    <div className="flex justify-center gap-4 pt-8 border-t border-border/30">
                                        <button
                                            onClick={() => {
                                                setDeleteId(bonussponsor[0].id!)
                                                const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                                deleteModal?.showModal()
                                            }}
                                            className="px-6 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormData(bonussponsor[0])
                                                setIsEditing(true)
                                                setEditingId(bonussponsor[0].id || null)
                                                const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                                modal?.showModal()
                                            }}
                                            className="px-6 py-3 text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1"
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
                formData={formData}
                setFormData={setFormData}
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