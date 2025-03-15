"use client"

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import AssetsSkelaton from '@/hooks/dashboard/super-admins/layout/assets/AssetsSkelaton'

import { AssetsContent } from '@/hooks/dashboard/super-admins/layout/assets/lib/Assets'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/assets/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/assets/ui/DeleteModal'

import { useAssetsData } from '@/hooks/dashboard/super-admins/layout/assets/lib/FetchAssets'

const initialFormData: AssetsContent = {
    title: '',
    description: '',
    svgUrl: '',
    imageUrl: ''
};

export default function AssetsLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useAssetsData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [selectedSvg, setSelectedSvg] = useState<File | null>(null)
    const [formData, setFormData] = useState<AssetsContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            let imageUrl = formData.imageUrl
            let svgUrl = formData.svgUrl

            if (selectedImage) {
                imageUrl = await handleImageUpload(selectedImage)
            }
            if (selectedSvg) {
                svgUrl = await handleImageUpload(selectedSvg)
            }

            if (isEditing && editingId) {
                await handleUpdate(editingId, {
                    ...formData,
                    imageUrl: selectedImage ? imageUrl : formData.imageUrl,
                    svgUrl: selectedSvg ? svgUrl : formData.svgUrl
                })
                toast.success('Content updated successfully!')
            } else {
                await createContent({
                    ...formData,
                    imageUrl,
                    svgUrl
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
        setSelectedSvg(null)
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
        return <AssetsSkelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center'
        >
            <AnimatePresence mode="wait">
                {contents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6 mb-8 bg-card/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg border-border hover:border-text/20 transition-all duration-300"
                    >
                        <div className="space-y-3">
                            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent'>
                                Insplensiasi
                            </h1>
                            <p className='text-text-dark text-base md:text-lg'>Manage your insplensiasi page</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
                                onClick={() => {
                                    setIsEditing(false)
                                    setEditingId(null)
                                    setFormData(initialFormData)
                                    setSelectedImage(null)
                                    setSelectedSvg(null)
                                    const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                    modal?.showModal()
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Create Content
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {contents.length > 0 ? (
                    <div>
                        {contents.map((content) => (
                            <motion.div
                                key={content.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                className='w-full bg-card/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-border hover:border-text/20 hover:shadow-primary/5 transition-all duration-500 overflow-hidden mb-6'
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative h-[300px] lg:h-full w-full bg-background-dark/50 overflow-hidden group"
                                    >
                                        <Image
                                            src={content.imageUrl}
                                            alt={content.title}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-8 lg:p-10 flex flex-col flex-grow backdrop-blur-md bg-card/5"
                                    >
                                        <div className="space-y-6 flex-grow">
                                            <h2 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-text via-text-dark to-text bg-clip-text text-transparent'>
                                                {content.title}
                                            </h2>

                                            <p className="text-text-dark text-base leading-relaxed line-clamp-3">
                                                {content.description}
                                            </p>
                                        </div>

                                        {content.svgUrl && (
                                            <div className="relative w-24 h-24 mx-auto my-6">
                                                <Image
                                                    src={content.svgUrl}
                                                    alt="SVG Icon"
                                                    fill
                                                    className="object-contain drop-shadow-lg"
                                                />
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-4 pt-6 mt-auto border-t border-border">
                                            <button
                                                onClick={() => {
                                                    setDeleteId(content.id!)
                                                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                                    deleteModal?.showModal()
                                                }}
                                                className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setFormData(content)
                                                    setIsEditing(true)
                                                    setEditingId(content.id || null)
                                                    const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                                    modal?.showModal()
                                                }}
                                                className="p-3 text-primary hover:text-primary-light hover:bg-primary/10 rounded-xl transition-all duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-card backdrop-blur-sm rounded-3xl shadow-xl p-12 md:p-16 text-center"
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
                selectedSvg={selectedSvg}
                setSelectedSvg={setSelectedSvg}
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