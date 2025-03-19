"use client"

import React, { useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

import { StatusContent } from '@/hooks/dashboard/super-admins/product/status/lib/schema'

import { statusService } from '@/hooks/dashboard/super-admins/product/status/lib/FetchStatus'

import { StatusModal } from '@/hooks/dashboard/super-admins/product/status/ui/StatusModal'

import { StatusTable } from '@/hooks/dashboard/super-admins/product/status/ui/StatusTable'

import StatusProductSkelaton from '@/hooks/dashboard/super-admins/product/status/StatusProductSkelaton'

export default function StatusProductLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState<StatusContent[]>([])
    const [formData, setFormData] = useState<StatusContent>({
        title: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        fetchStatus()
    }, [])

    const fetchStatus = async () => {
        try {
            const data = await statusService.fetchStatus()
            setStatus(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching status:', error)
            setIsLoading(false)
        }
    }

    // Create/Update category
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await statusService.updateStatus(editingId, formData)
                toast.success('Status updated successfully!')
            } else {
                await statusService.createStatus(formData)
                toast.success('Status created successfully!')
            }

            // Reset form
            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            fetchStatus()

            // Close modal
            const modal = document.getElementById('status_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting status:', error)
            toast.error('Failed to save status. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await statusService.deleteStatus(id)
            fetchStatus()
            toast.success('Status deleted successfully!')
        } catch (error) {
            console.error('Error deleting status:', error)
            toast.error('Failed to delete status. Please try again.')
        }
    }

    const handleEdit = (status: StatusContent) => {
        setIsEditing(true)
        setEditingId(status.id || null)
        setFormData({ title: status.title })
        const modal = document.getElementById('status_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('status_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    if (isLoading) {
        return <StatusProductSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-text to-text-dark bg-clip-text text-transparent'>
                            Status
                        </h1>
                        <p className='text-text-dark'>Manage and organize your status</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary hover:opacity-90 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-primary/20 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Status
                    </button>
                </div>
            </div>

            <div className="custom-scrollbar">
                <StatusTable
                    status={status}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <StatusModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                onSubmit={handleSubmit}
                onClose={() => {
                    const modal = document.getElementById('status_modal') as HTMLDialogElement | null
                    modal?.close()
                    setFormData({ title: '' })
                }}
                onChange={(value) => setFormData({ title: value })}
            />
        </section>
    )
}