"use client"

import React, { useEffect, useState } from 'react'

import { db } from '@/utils/firebase'

import { collection, onSnapshot } from 'firebase/firestore'

import Image from 'next/image'

import { Product } from '@/hooks/dashboard/user/product/lib/product'

import { useAuth } from '@/utils/context/AuthContext'

import ProductSkelaton from './ProductSkelaton'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import { Toaster } from 'react-hot-toast'

export default function ProductLayout() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        // Membuat listener untuk products
        const productsRef = collection(db, 'products')
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[]

            const filteredProducts = productsData.filter(product => {
                return product.status === user?.accountType
            })

            setProducts(filteredProducts)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching products:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    const handleOpenModal = () => {
        const modal = document.getElementById('payment_modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const copyToClipboard = async () => {
        const text = '7153470752';
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Nomor rekening berhasil disalin!', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '12px',
                },
                icon: '📋',
            });
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                textArea.remove();
                toast.success('Nomor rekening berhasil disalin!', {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '12px',
                    },
                    icon: '📋',
                });
            } catch (err) {
                console.error('Gagal menyalin:', err);
                toast.error('Gagal menyalin nomor rekening', {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#EF4444',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '12px',
                    },
                });
            }
        }
    };

    if (loading) {
        return (
            <ProductSkelaton />
        )
    }

    return (
        <>
            <section className='min-h-full px-0 sm:px-2'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 mb-8"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="space-y-2">
                            <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 text-transparent bg-clip-text'>
                                Produk
                            </h1>
                            <p className='text-text-dark/80 text-lg'>Beberapa produk yang kami tawarkan</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            key={product.id}
                            className="group bg-white rounded-2xl p-6 border border-gray-200"
                        >
                            <div className="relative w-full h-56 mb-5 overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
                                        {product.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                <p className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </p>
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={product.author.photoUrl}
                                            alt={product.author.fullName}
                                            fill
                                            className="rounded-full ring-2 ring-white ring-offset-2 shadow-md"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{product.author.fullName}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className='flex items-center gap-3 pt-2'>
                                    <button className='flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_16px_rgba(59,130,246,0.3)] transition-all duration-200'>
                                        Bayar Sekarang
                                    </button>

                                    <button
                                        onClick={handleOpenModal}
                                        className='flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:shadow-[0_8px_16px_rgba(239,68,68,0.3)] transition-all duration-200'
                                    >
                                        Bayar Nanti
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal */}
                <dialog
                    id="payment_modal"
                    className="modal fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <div className="relative bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl transform transition-all">
                        <Toaster />
                        <div className="flex flex-col space-y-6">
                            {/* Header */}
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-8 h-8 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Informasi Pembayaran
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Silakan transfer ke rekening berikut
                                </p>
                            </div>

                            {/* Content */}
                            <div className="bg-gray-50/50 rounded-2xl p-6 space-y-4 border border-gray-100">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <label className="text-sm">Bank</label>
                                    </div>
                                    <p className="font-semibold text-gray-900 pl-6">Koperasi ABBI</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                        <label className="text-sm">Nomor Rekening</label>
                                    </div>
                                    <div className="flex items-center gap-3 pl-6">
                                        <p className="font-mono text-lg font-semibold text-gray-900 select-all">7153470752</p>
                                        <button
                                            onClick={copyToClipboard}
                                            type="button"
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-200 hover:scale-105"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                                />
                                            </svg>
                                            Salin
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2">
                                <form method="dialog">
                                    <button
                                        className="w-full px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        Tutup
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>
            </section>
        </>
    )
}
