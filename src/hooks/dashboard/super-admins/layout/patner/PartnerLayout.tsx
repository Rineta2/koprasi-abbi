"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import PartnerSkelaton from '@/hooks/dashboard/super-admins/layout/patner/PartnerSkelaton'

import { usePartnerContent } from '@/hooks/dashboard/super-admins/layout/patner/lib/FetchPatner'

import { Pagination } from '@/base/helper/Pagination'

import { useModal } from '@/hooks/dashboard/super-admins/layout/patner/lib/FetchPatner'

import { PartnerHeader } from '@/hooks/dashboard/super-admins/layout/patner/ui/PartnerHeader'

import { PartnerGrid } from '@/hooks/dashboard/super-admins/layout/patner/ui/PartnerGrid'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/patner/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/patner/ui/DeleteModal'

export default function PartnerLayout() {
    const {
        isLoading,
        contents,
        handleSubmit,
        handleDelete,
        isSubmitting,
        formData,
        setFormData,
        selectedImage,
        setSelectedImage,
        isEditing,
        setIsEditing,
        editingId,
        setEditingId,
    } = usePartnerContent()

    const { openContentModal, openDeleteModal } = useModal()
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 8

    // Calculate pagination
    const totalPages = Math.ceil(contents.length / itemsPerPage)
    const paginatedContents = contents.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    }

    if (isLoading) {
        return <PartnerSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-2'>
            <PartnerHeader onCreateClick={() => {
                setIsEditing(false);
                setEditingId(null);
                setFormData({
                    imageUrl: ''
                });
                openContentModal();
            }} />

            <PartnerGrid
                contents={paginatedContents}
                onEdit={(content) => {
                    setIsEditing(true);
                    setEditingId(content.id || null);
                    setFormData({
                        imageUrl: content.imageUrl
                    });
                    openContentModal();
                }}
                onDelete={(content) => {
                    setEditingId(content.id || null);
                    openDeleteModal();
                }}
            />

            {contents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </motion.div>
            )}

            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onCancel={() => {
                    const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
                    modal?.close();
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                        imageUrl: ''
                    });
                    setSelectedImage(null);
                }}
            />

            <DeleteModal
                onConfirm={handleDelete}
                editingId={editingId}
            />
        </section>
    )
}