"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import InsplensiasiSkelaton from '@/hooks/dashboard/super-admins/layout/reward/RewardSkelaton'

import { RewardsContent } from '@/hooks/dashboard/super-admins/layout/reward/lib/Rewards'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/reward/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/reward/ui/DeleteModal'

import { useRewardData } from '@/hooks/dashboard/super-admins/layout/reward/lib/FetchDataReward'

const initialFormData: RewardsContent = {
    title: '',
    imageUrl: '',
    textLeft: [{
        title: '',
    }],
    textRight: [{
        title: '',
    }],
    syarat: [{
        title: '',
    }]
};

export default function DataBlockcheinLayout() {
    const {
        isLoading,
        rewards,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useRewardData();

    const [formData, setFormData] = useState<RewardsContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

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
        return <InsplensiasiSkelaton />
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
                            Program Affiliate
                        </h1>
                        <p className='text-gray-500'>Manage your program affiliate content</p>
                    </div>

                    {
                        rewards.length === 0 && (
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
                        )
                    }
                </div>
            </div>

            {/* Content Cards */}
            <div className="space-y-6">
                {rewards.map((content) => (
                    <div key={content.id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                    >
                        <h2 className='text-2xl font-bold text-blue-600 mb-3'>
                            {content.title}
                        </h2>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setDeleteId(content.id!)
                                    const modal = document.getElementById('delete_modal') as HTMLDialogElement
                                    modal?.showModal()
                                }}
                                className="inline-flex items-center px-4 py-2 text-red-600 bg-red-50 
                                rounded-lg hover:bg-red-100 transition-colors duration-200"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setFormData({
                                        title: content.title,
                                        imageUrl: content.imageUrl || '',
                                        textLeft: content.textLeft || [{ title: '' }],
                                        textRight: content.textRight || [{ title: '' }],
                                        syarat: content.syarat || [{ title: '' }],
                                    })
                                    setIsEditing(true)
                                    setEditingId(content.id || null)
                                    const modal = document.getElementById('content_modal') as HTMLDialogElement
                                    modal?.showModal()
                                }}
                                className="inline-flex items-center px-4 py-2 text-blue-600 bg-blue-50 
                                rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {rewards.length === 0 && (
                <div className="text-center bg-white rounded-2xl shadow-md p-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center 
                        justify-center mb-4"
                    >
                        <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Content Yet</h3>
                    <p className="text-gray-500">Create your first content to get started</p>
                </div>
            )}

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