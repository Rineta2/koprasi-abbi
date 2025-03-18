"use client"

import React, { useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

import { TagsContent } from '@/hooks/dashboard/super-admins/product/tags/lib/schema'

import { tagsService } from '@/hooks/dashboard/super-admins/product/tags/lib/FetchProductTags'

import { TagsModal } from '@/hooks/dashboard/super-admins/product/tags/ui/TagsModal'

import { TagsTable } from '@/hooks/dashboard/super-admins/product/tags/ui/TagsTable'

import TagsProductSkelaton from '@/hooks/dashboard/super-admins/product/tags/ProductTagsSkelaton'

export default function TagsProductLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [tags, setTags] = useState<TagsContent[]>([])
    const [formData, setFormData] = useState<TagsContent>({
        title: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        fetchTags()
    }, [])

    const fetchTags = async () => {
        try {
            const data = await tagsService.fetchTags()
            setTags(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching tags:', error)
            setIsLoading(false)
        }
    }

    // Create/Update category
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await tagsService.updateTags(editingId, formData)
                toast.success('Tags updated successfully!')
            } else {
                await tagsService.createTags(formData)
                toast.success('Tags created successfully!')
            }

            // Reset form
            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            fetchTags()

            // Close modal
            const modal = document.getElementById('tags_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting tags:', error)
            toast.error('Failed to save tags. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await tagsService.deleteTags(id)
            fetchTags()
            toast.success('Tags deleted successfully!')
        } catch (error) {
            console.error('Error deleting tags:', error)
            toast.error('Failed to delete tags. Please try again.')
        }
    }

    const handleEdit = (tags: TagsContent) => {
        setIsEditing(true)
        setEditingId(tags.id || null)
        setFormData({ title: tags.title })
        const modal = document.getElementById('tags_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('tags_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    if (isLoading) {
        return <TagsProductSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-text to-text-dark bg-clip-text text-transparent'>
                            Tags
                        </h1>
                        <p className='text-text-dark'>Manage and organize your tags</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-primary/20 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Tags
                    </button>
                </div>
            </div>

            <TagsTable
                tags={tags}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TagsModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                onSubmit={handleSubmit}
                onClose={() => {
                    const modal = document.getElementById('tags_modal') as HTMLDialogElement | null
                    modal?.close()
                    setFormData({ title: '' })
                }}
                onChange={(value) => setFormData({ title: value })}
            />
        </section>
    )
}