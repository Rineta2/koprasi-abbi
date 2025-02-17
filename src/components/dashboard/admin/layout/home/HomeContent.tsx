"use client"

import React, { useState, useEffect } from 'react'

import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import imagekitInstance from '@/utils/imagekit'

import { HomeData, HomeFormData } from '@/components/dashboard/admin/layout/home/interface/schema'

import Image from 'next/image'

import imageCompression from 'browser-image-compression'

import { toast } from 'react-hot-toast'

import Link from 'next/link'

export default function HomeContent() {
    const [isOpen, setIsOpen] = useState(false)
    const [homeData, setHomeData] = useState<HomeData[]>([])
    const [loading, setLoading] = useState(false)
    const [editData, setEditData] = useState<HomeData | null>(null)

    const initialFormData: HomeFormData = {
        title: '',
        text: '',
        button1Text: '',
        button1Link: '',
        button2Text: '',
        button2Link: '',
        thumbnail: null
    }

    const [formData, setFormData] = useState<HomeFormData>(initialFormData)

    // Add preview state
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // Fetch data
    const fetchHomeData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_API_HOME as string))
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as HomeData[]
            setHomeData(data)
        } catch (error) {
            console.error('Error fetching data:', error)
            toast.error('Failed to fetch home content')
        }
    }

    useEffect(() => {
        fetchHomeData()
    }, [])

    // Upload image to ImageKit
    const uploadImage = async (file: File) => {
        try {
            // Meningkatkan kompresi dan menurunkan ukuran maksimum
            const options = {
                maxSizeMB: 0.5, // Menurunkan dari 1MB ke 0.5MB
                maxWidthOrHeight: 800, // Menurunkan dari 1200px ke 800px
                useWebWorker: true,
                initialQuality: 0.7 // Menambahkan initial quality
            }

            const compressedFile = await imageCompression(file, options)

            // Menambahkan validasi ukuran
            if (compressedFile.size > 5 * 1024 * 1024) { // 5MB
                throw new Error('Image size too large')
            }

            const reader = new FileReader()
            return new Promise((resolve, reject) => {
                reader.onload = async (e) => {
                    if (e.target?.result) {
                        const base64Image = e.target.result.toString().split(',')[1]
                        const uploadResponse = await imagekitInstance.upload({
                            file: base64Image,
                            fileName: compressedFile.name,
                            folder: '/home',
                            useUniqueFileName: true,
                        })
                        resolve(uploadResponse.url)
                    }
                }
                reader.onerror = reject
                reader.readAsDataURL(compressedFile)
            })
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Failed to upload image. Please try a smaller image.') // Menambahkan toast error
            throw error
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            let thumbnailUrl = ''
            if (formData.thumbnail) {
                thumbnailUrl = await uploadImage(formData.thumbnail) as string
            }

            const homeContent = {
                title: formData.title,
                text: formData.text,
                button1: {
                    text: formData.button1Text,
                    link: formData.button1Link
                },
                button2: {
                    text: formData.button2Text,
                    link: formData.button2Link
                },
                thumbnail: thumbnailUrl,
                updatedAt: Date.now()
            }

            if (editData) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_API_HOME as string, editData.id), homeContent)
                toast.success('Content updated successfully')
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_API_HOME as string), {
                    ...homeContent,
                    createdAt: Date.now()
                })
                toast.success('Content added successfully')
            }

            setFormData(initialFormData)
            setEditData(null)
            setIsOpen(false)
            fetchHomeData()
        } catch (error) {
            console.error('Error saving data:', error)
            toast.error('Failed to save content')
        } finally {
            setLoading(false)
        }
    }

    // Handle delete
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteDoc(doc(db, process.env.NEXT_PUBLIC_API_HOME as string, id))
                toast.success('Content deleted successfully')
                fetchHomeData()
            } catch (error) {
                console.error('Error deleting data:', error)
                toast.error('Failed to delete content')
            }
        }
    }

    return (
        <section className='px-6 sm:px-10 py-6 min-h-full'>
            <div className='flex flex-col gap-6'>
                <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold'>
                        Home Content
                    </h1>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsOpen(true)}
                            className='bg-primary hover:bg-primary/90 transition-colors text-primary-foreground px-6 py-2.5 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md'
                        >
                            <span>Add Content</span>
                            <FiPlus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content List */}
                {homeData.map((item, index) => (
                    <div key={index} className="mt-10 w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            {/* Content Section */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={item.button1.link}
                                        className="flex-1 text-center bg-white border-2 border-primary hover:bg-primary hover:text-white text-primary px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        {item.button1.text}
                                    </Link>

                                    <Link
                                        href={item.button2.link}
                                        className="flex-1 text-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        {item.button2.text}
                                    </Link>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => {
                                            setEditData(item)
                                            setFormData({
                                                title: item.title,
                                                text: item.text,
                                                button1Text: item.button1.text,
                                                button1Link: item.button1.link,
                                                button2Text: item.button2.text,
                                                button2Link: item.button2.link,
                                                thumbnail: null
                                            })
                                            setIsOpen(true)
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-blue-600 group"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-600 group"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">Delete</span>
                                    </button>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="w-full lg:w-[400px] h-[300px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                {item.thumbnail ? (
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span>No image available</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl w-full max-w-2xl shadow-xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {editData ? 'Edit Content' : 'Add New Content'}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                    setEditData(null)
                                    setFormData(initialFormData)
                                    if (imagePreview) {
                                        URL.revokeObjectURL(imagePreview)
                                        setImagePreview(null)
                                    }
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:rotate-90"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* Main Content Section */}
                            <div className="flex flex-col gap-6">
                                {/* Title & Text Group */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Text</label>
                                        <input
                                            type="text"
                                            value={formData.text}
                                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Buttons Section */}
                                <div className="flex flex-col gap-4">
                                    {/* Button 1 */}
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Button 1 Text</label>
                                            <input
                                                type="text"
                                                value={formData.button1Text}
                                                onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Button 1 Link</label>
                                            <input
                                                type="url"
                                                value={formData.button1Link}
                                                onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Button 2 */}
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Button 2 Text</label>
                                            <input
                                                type="text"
                                                value={formData.button2Text}
                                                onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Button 2 Link</label>
                                            <input
                                                type="url"
                                                value={formData.button2Link}
                                                onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnail Upload */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Thumbnail</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 transition-all">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        setFormData({ ...formData, thumbnail: file })
                                                        // Create preview URL
                                                        const previewUrl = URL.createObjectURL(file)
                                                        setImagePreview(previewUrl)
                                                        toast.success('Image selected successfully')
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Add image preview below the upload area */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={300}
                                        height={200}
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false)
                                        setEditData(null)
                                        setFormData(initialFormData)
                                        if (imagePreview) {
                                            URL.revokeObjectURL(imagePreview)
                                            setImagePreview(null)
                                        }
                                    }}
                                    disabled={loading}
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center gap-2 min-w-[100px] justify-center"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}