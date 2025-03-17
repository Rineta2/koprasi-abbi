"use client"

import React, { useState, useEffect } from 'react'

import { toast } from 'react-hot-toast'

import { Category } from '@/hooks/dashboard/super-admins/product/category/lib/schema'

import { categoryService } from '@/hooks/dashboard/super-admins/product/category/lib/FetchCategory'

import { CategoryModal } from '@/hooks/dashboard/super-admins/product/category/ui/CategoryModal'

import { CategoryTable } from '@/hooks/dashboard/super-admins/product/category/ui/CategoryTable'

import CategoryProductSkelaton from '@/hooks/dashboard/super-admins/product/category/CategoryProductSkelaton'

export default function CategoryProductLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState<Category[]>([])
    const [formData, setFormData] = useState<Category>({
        title: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        try {
            const data = await categoryService.fetchCategory()
            setCategory(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching category:', error)
            setIsLoading(false)
        }
    }

    // Create/Update category
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)

            if (isEditing && editingId) {
                await categoryService.updateCategory(editingId, formData)
                toast.success('Category updated successfully!')
            } else {
                await categoryService.createCategory(formData)
                toast.success('Category created successfully!')
            }

            // Reset form
            setIsEditing(false)
            setEditingId(null)
            setFormData({ title: '' })
            fetchCategory()

            // Close modal
            const modal = document.getElementById('category_modal') as HTMLDialogElement | null
            modal?.close()
        } catch (error) {
            console.error('Error submitting category:', error)
            toast.error('Failed to save category. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await categoryService.deleteCategory(id)
            fetchCategory()
            toast.success('Category deleted successfully!')
        } catch (error) {
            console.error('Error deleting category:', error)
            toast.error('Failed to delete category. Please try again.')
        }
    }

    const handleEdit = (category: Category) => {
        setIsEditing(true)
        setEditingId(category.id || null)
        setFormData({ title: category.title })
        const modal = document.getElementById('category_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const openModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ title: '' })
        const modal = document.getElementById('category_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    if (isLoading) {
        return <CategoryProductSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-text to-text-dark bg-clip-text text-transparent'>
                            Category
                        </h1>
                        <p className='text-text-dark'>Manage and organize your category</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-primary/20 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>
                </div>
            </div>

            <CategoryTable
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CategoryModal
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                formData={formData}
                onSubmit={handleSubmit}
                onClose={() => {
                    const modal = document.getElementById('category_modal') as HTMLDialogElement | null
                    modal?.close()
                    setFormData({ title: '' })
                }}
                onChange={(value) => setFormData({ title: value })}
            />
        </section>
    )
}