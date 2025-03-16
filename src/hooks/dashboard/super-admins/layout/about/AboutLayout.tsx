"use client"

import React, { useEffect } from 'react'

import { motion } from "framer-motion"

import Image from 'next/image'

import AboutSkeleton from "@/hooks/dashboard/super-admins/layout/about/AboutSkelaton"

import { containerVariants, itemVariants } from '@/hooks/dashboard/super-admins/layout/about/lib/animations'

import AboutForm from '@/hooks/dashboard/super-admins/layout/about/ui/AboutForm'

import DeleteModal from '@/hooks/dashboard/super-admins/layout/about/ui/DeleteModal'

import { useAbout } from '@/hooks/dashboard/super-admins/layout/about/lib/FetchAbout'

export default function AboutLayout() {
    const {
        images,
        loading,
        isLoading,
        isEditing,
        selectedImage,
        deleteLoading,
        formData,
        setIsEditing,
        setSelectedImage,
        setImageToDelete,
        setFormData,
        fetchImages,
        handleEdit,
        handleFormSubmit,
        handleDeleteImage,
        confirmDelete,
    } = useAbout();

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    if (isLoading) {
        return <AboutSkeleton />;
    }

    return (
        <motion.section
            className='min-h-screen py-0 px-0 sm:py-4 sm:px-4'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-card to-card/80 backdrop-blur-sm rounded-3xl border p-8 mb-8 border-gray-100/10 dark:border-gray-800/20 shadow-lg shadow-primary/5"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent'>
                            About Us
                        </h1>
                        <p className='text-text-dark/80 text-lg'>Kelola konten tentang kami</p>
                    </div>
                    {images.length === 0 && (

                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setSelectedImage(null);
                                setFormData({ title: '', text: '', description: '', image: null });
                                (document.getElementById('about_modal') as HTMLDialogElement)?.showModal();
                            }}
                            className="group w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="font-medium">Add Content</span>
                        </button>
                    )}
                </div>
            </motion.div>

            {images.map((item) => {
                return (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="mb-16 last:mb-0"
                    >
                        <div className='relative bg-gradient-to-br from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-12 overflow-hidden'>
                            {/* Background Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 relative'>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/10">
                                        <Image
                                            src={item?.imageUrl || "/placeholder.jpg"}
                                            alt="Team working"
                                            className="w-full h-full object-cover"
                                            width={1200}
                                            height={900}
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex flex-col justify-center space-y-8"
                                    variants={itemVariants}
                                >
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="inline-block"
                                        >
                                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">
                                                {item?.title}
                                            </h2>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="prose prose-lg dark:prose-invert"
                                        >
                                            <span className="block text-xl text-text-dark/90 font-medium leading-relaxed">
                                                {item?.text}
                                            </span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <p className="text-lg text-text-dark/70 leading-relaxed">
                                                {item?.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Action Buttons */}
                                    <motion.div
                                        className="flex flex-col sm:flex-row gap-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="font-semibold">Edit Content</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleDeleteImage(item.id)}
                                            className="flex-1 px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-red-200/20 text-red-500 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:bg-red-500/5 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="font-semibold">Delete Content</span>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )
            })}

            <AboutForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                handleFormSubmit={handleFormSubmit}
                isEditing={isEditing}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />

            <DeleteModal
                deleteLoading={deleteLoading}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setImageToDelete(null);
                    (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
                }}
            />
        </motion.section>
    )
}