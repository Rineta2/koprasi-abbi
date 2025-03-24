"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import { initialFormData, TestimonialsContent } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/Testimonials'

import { TestimonialCard } from '@/hooks/dashboard/super-admins/layout/testimonials/ui/components/TestimonialsCard'

import { EmptyState } from '@/hooks/dashboard/super-admins/layout/testimonials/ui/components/EmptyState'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/testimonials/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/testimonials/ui/DeleteModal'

import { useTestimonialsData } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/FetchDataTestimonials'

import { Pagination } from '@/base/helper/Pagination'

import Testimonialskelaton from './Testimonialskelaton'

export default function TestimonialsLayout() {
    const {
        isLoading,
        testimonials,
        isSubmitting,
        setIsSubmitting,
        createContent,
        handleUpdate,
        handleDelete,
        handleImageUpload,
    } = useTestimonialsData();

    const [formData, setFormData] = useState<TestimonialsContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    // Calculate pagination
    const offset = currentPage * itemsPerPage;
    const paginatedTestimonials = testimonials.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(testimonials.length / itemsPerPage);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await handleUpdate(editingId, formData)
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData)
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

    if (isLoading) {
        return <Testimonialskelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-full px-0 sm:px-2'
        >
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-1'>
                            Testimonials
                        </h1>
                        <p className='text-gray-500'>Manage your testimonials content</p>
                    </div>

                    <button
                        onClick={() => {
                            setIsEditing(false)
                            setEditingId(null)
                            setFormData(initialFormData)
                            const modal = document.getElementById('content_modal') as HTMLDialogElement
                            modal?.showModal()
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl 
                                hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow"
                    >
                        Create Content
                    </button>

                </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTestimonials.map((content) => (
                    <TestimonialCard
                        key={content.id}
                        content={content}
                        onDelete={(id) => {
                            setDeleteId(id)
                            const modal = document.getElementById('delete_modal') as HTMLDialogElement
                            modal?.showModal()
                        }}
                        onEdit={(content) => {
                            setFormData({
                                description: content.description || '',
                                name: content.name || '',
                                position: content.position || '',
                                imageUrl: content.imageUrl || '',
                                rating: content.rating || 0,
                            })
                            setIsEditing(true)
                            setEditingId(content.id || null)
                            const modal = document.getElementById('content_modal') as HTMLDialogElement
                            modal?.showModal()
                        }}
                    />
                ))}
            </div>

            {/* Add pagination component */}
            {testimonials.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                />
            )}

            {testimonials.length === 0 && <EmptyState />}

            <ContentModal
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                handleImageUpload={handleImageUpload}
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