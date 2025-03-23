"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import InsplensiasiSkelaton from '@/hooks/dashboard/super-admins/layout/program-affiliate/ProgramAffliateSkelaton'

import { ProgramAffliateKoperasiAbbiContent } from '@/hooks/dashboard/super-admins/layout/program-affiliate-koperasi-abbi/lib/ProgramAffliateKoperasiAbbi'

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/program-affiliate-koperasi-abbi/ui/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/program-affiliate-koperasi-abbi/ui/DeleteModal'

import { useProgramAffiliateData } from '@/hooks/dashboard/super-admins/layout/program-affiliate-koperasi-abbi/lib/FetchDataProgramAffiliate'

const initialFormData: ProgramAffliateKoperasiAbbiContent = {
    title: '',
    benefits: [{
        title: '',
        text: '',
        price: '',
        imageUrl: ''
    }]
};

export default function DataBlockcheinLayout() {
    const {
        isLoading,
        programAffiliate,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useProgramAffiliateData();

    const [formData, setFormData] = useState<ProgramAffliateKoperasiAbbiContent>(initialFormData)

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

    if (programAffiliate.length === 0) {
        return <div className="text-center bg-white rounded-xl shadow-sm p-8 sm:p-12 
        border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center 
            justify-center mb-6 transition-all duration-300 hover:bg-gray-100">
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Content Yet</h3>
            <p className="text-gray-600">Create your first content to get started</p>
        </div>
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-full px-0 sm:px-2'
        >
            {/* Header Section - Modern card with better spacing */}
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                            Program Affiliate
                        </h1>
                        <p className='text-gray-600 text-sm sm:text-base'>Manage your program affiliate content</p>
                    </div>

                    {programAffiliate.length === 0 && (
                        <button
                            onClick={() => {
                                setIsEditing(false)
                                setEditingId(null)
                                setFormData(initialFormData)
                                const modal = document.getElementById('content_modal') as HTMLDialogElement
                                modal?.showModal()
                            }}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg
                            hover:bg-blue-700 active:bg-blue-800 transition-all duration-200
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none
                            font-medium text-sm sm:text-base"
                        >
                            Create Content
                        </button>
                    )}
                </div>
            </div>

            {/* Content Cards - Improved grid and card styling */}
            <div className="grid gap-6">
                {programAffiliate.map((content) => (
                    <div key={content.id}
                        className="bg-white rounded-xl shadow-sm p-6 sm:p-8 
                        transition-all duration-300 hover:shadow-md border border-gray-100"
                    >
                        <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>
                            {content.title}
                        </h2>

                        {/* Benefits Grid - Better responsive layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {content.benefits.map((benefit, index) => (
                                <div key={index}
                                    className="group bg-gray-50 rounded-xl p-4 transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100/50"
                                >
                                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                        <Image
                                            src={benefit.imageUrl}
                                            alt={benefit.title}
                                            fill
                                            className="object-cover transform transition-transform duration-300
                                            group-hover:scale-105"
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm">{benefit.text}</p>
                                        <p className="text-blue-600 font-medium">Rp {benefit.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons - Modern styling */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setDeleteId(content.id!)
                                    const modal = document.getElementById('delete_modal') as HTMLDialogElement
                                    modal?.showModal()
                                }}
                                className="w-full sm:w-auto px-4 py-2 text-red-600 bg-red-50 rounded-lg
                                hover:bg-red-100 active:bg-red-200 transition-colors duration-200
                                focus:ring-2 focus:ring-red-500 focus:outline-none text-sm font-medium"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setFormData({
                                        title: content.title,
                                        benefits: content.benefits || [{ title: '', imageUrl: '' }],
                                    })
                                    setIsEditing(true)
                                    setEditingId(content.id || null)
                                    const modal = document.getElementById('content_modal') as HTMLDialogElement
                                    modal?.showModal()
                                }}
                                className="w-full sm:w-auto px-4 py-2 text-blue-600 bg-blue-50 rounded-lg
                                hover:bg-blue-100 active:bg-blue-200 transition-colors duration-200
                                focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-medium"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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