"use client"

import { motion } from 'framer-motion'

import React, { useState, useEffect } from 'react'

import { SisaHasilUsaha } from '@/hooks/dashboard/super-admins/layout/sisa-hasil-usaha/lib/SisaHasilUsaha'

import { sisaHasilUsahaService } from '@/hooks/dashboard/super-admins/layout/sisa-hasil-usaha/lib/FetchSisaHasilUsaha'

import SisaHasilUsahaForm from '@/hooks/dashboard/super-admins/layout/sisa-hasil-usaha/ui/SisaHasilUsahaForm'

import SisaHasilUsahaSkeleton from '@/hooks/dashboard/super-admins/layout/sisa-hasil-usaha/SisaHasilUsahaSkelaton'

import Image from 'next/image'

export default function PrizePoolLayout() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSisaHasilUsaha, setSelectedSisaHasilUsaha] = useState<SisaHasilUsaha | null>(null)
    const [sisaHasilUsaha, setSisaHasilUsaha] = useState<SisaHasilUsaha[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSisaHasilUsaha()
    }, [])

    const fetchSisaHasilUsaha = async () => {
        try {
            const data = await sisaHasilUsahaService.getAllSisaHasilUsaha()
            console.log('Fetched data:', data)
            setSisaHasilUsaha(data)
        } catch (err) {
            setError('Failed to fetch sisa hasil usaha')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateSuccess = () => {
        setIsModalOpen(false)
        setSelectedSisaHasilUsaha(null)
        fetchSisaHasilUsaha()
    }

    const handleEdit = (sisaHasilUsaha: SisaHasilUsaha) => {
        setSelectedSisaHasilUsaha(sisaHasilUsaha)
        setIsModalOpen(true)
    }

    if (loading) {
        return <SisaHasilUsahaSkeleton />
    }

    if (error) {
        return <div className='text-center text-red-500'>{error}</div>
    }

    return (
        <section className='min-h-full px-0 sm:px-2'>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-card-border shadow-lg"
            >
                <div className="space-y-3">
                    <h1 className='text-3xl md:text-4xl font-bold'>
                        Sisa Hasil Usaha
                    </h1>
                    <p className='text-lg'>Manage your sisa hasil usaha</p>
                </div>

                {sisaHasilUsaha.length === 0 && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create Sisa Hasil Usaha
                    </button>
                )}
            </motion.div>

            {sisaHasilUsaha.length === 0 ? (
                <div className='text-center text-gray-500 mt-8'>No sisa hasil usaha available</div>
            ) : (
                sisaHasilUsaha.map((sisaHasilUsaha) => (
                    <motion.div
                        key={sisaHasilUsaha.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className='w-full bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden mb-8'
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Image Section */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="relative h-[300px] lg:h-[400px] bg-card overflow-hidden group"
                            >
                                <Image
                                    src={sisaHasilUsaha.imageUrl}
                                    alt={sisaHasilUsaha.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>

                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="p-8 md:p-12 flex flex-col justify-between h-full"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">
                                        {sisaHasilUsaha.title}
                                    </h3>

                                    <p className='text-sm text-gray-500'>{sisaHasilUsaha.text}</p>
                                    <p className='text-sm text-gray-500'>{sisaHasilUsaha.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-8 border-t border-border/30 mt-auto">
                                    <button
                                        onClick={() => handleEdit(sisaHasilUsaha)}
                                        className="px-6 py-3 text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('Are you sure you want to delete this sisa hasil usaha?')) {
                                                try {
                                                    await sisaHasilUsahaService.deleteSisaHasilUsaha(sisaHasilUsaha.id, sisaHasilUsaha.imageUrl)
                                                    fetchSisaHasilUsaha()
                                                } catch (err) {
                                                    console.error('Failed to delete sisa hasil usaha:', err)
                                                }
                                            }
                                        }}
                                        className="px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="bg-background w-full max-w-2xl rounded-3xl shadow-2xl p-6 lg:p-8 animate-fadeIn">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-text">
                                        {selectedSisaHasilUsaha ? 'Edit Sisa Hasil Usaha' : 'Create New Sisa Hasil Usaha'}
                                    </h2>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setSelectedSisaHasilUsaha(null)
                                    }}
                                    className="p-2 hover:bg-background-dark/30 rounded-xl transition-all"
                                >
                                    <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <SisaHasilUsahaForm
                                onSuccess={handleCreateSuccess}
                                initialData={selectedSisaHasilUsaha}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
