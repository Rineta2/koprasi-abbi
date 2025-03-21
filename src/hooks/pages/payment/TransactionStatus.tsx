"use client"
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs } from 'firebase/firestore'

import Image from 'next/image'

import { TransactionData } from '@/hooks/pages/payment/lib/payment'

import TransactionEror from '@/hooks/pages/payment/ui/TransactionEror'

import Link from 'next/link'

import TransactionNotfound from '@/hooks/pages/payment/ui/TransactionNotfound'

import Spinner from '@/hooks/pages/payment/ui/Spinner'

import { motion } from 'framer-motion'

import {
    containerVariants,
    itemVariants,
    cardContentVariants,
    headingVariants
} from '@/hooks/pages/payment/lib/animation'

export default function PaymentStatusPage() {
    const params = useParams();
    const [transaction, setTransaction] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS || 'transactions');
                const q = query(
                    transactionsRef,
                    where('orderId', '==', params.id)
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error('Transaksi tidak ditemukan');
                }

                const transactionData = querySnapshot.docs[0].data() as TransactionData;
                setTransaction(transactionData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [params.id]);

    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <TransactionEror error={error} />
        );
    }

    if (!transaction) {
        return (
            <TransactionNotfound />
        );
    }

    return (
        <section className="min-h-full bg-gradient-to-br from-gray-900 via-slate-900 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Crypto-themed Background Pattern */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-color-dodge">
                <svg className="absolute top-0 left-0 w-full h-full opacity-[0.07]" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hex-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M25,0 L50,14.4 L50,43.2 L25,57.6 L0,43.2 L0,14.4 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5" />
                        </pattern>
                        <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M15 0v60M30 0v60M45 0v60M0 15h60M0 30h60M0 45h60"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                strokeOpacity="0.5" />
                            <circle cx="15" cy="15" r="2" fill="currentColor" className="text-cyan-500" />
                            <circle cx="45" cy="45" r="2" fill="currentColor" className="text-purple-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hex-grid)" />
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Animated Glow Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent animate-pulse" />
            </motion.div>

            <motion.div
                className="container max-w-7xl mx-auto relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* View Transactions Link */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <div className="crypto-card">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Lihat Semua Transaksi Anda
                                </h3>
                                <p className="text-slate-400">
                                    Pantau status dan riwayat semua transaksi Anda
                                </p>
                            </div>
                            <Link
                                href="/dashboard/user/transaction"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                            >
                                <span>View Transactions</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                    variants={itemVariants}
                >
                    <motion.div variants={itemVariants} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <svg
                                    className="w-6 h-6 text-cyan-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Amount</p>
                                <p className="text-lg font-semibold text-white">
                                    Rp {(transaction.amount || parseFloat(transaction.paymentDetails.grossAmount)).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <svg
                                    className="w-6 h-6 text-emerald-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Status</p>
                                <p className={`text-lg font-semibold ${transaction.status === 'success'
                                    ? 'text-emerald-400'
                                    : 'text-amber-400'
                                    }`}>
                                    {transaction.status === 'success' ? 'Completed' : 'Pending'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Main Content Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={itemVariants}
                >
                    {/* Product Details */}
                    <motion.div
                        className="crypto-card"
                        variants={cardContentVariants}
                    >
                        <div className="px-6 py-6">
                            <motion.h2
                                variants={headingVariants}
                                className="text-2xl font-bold text-white mb-6"
                            >
                                Detail Produk
                            </motion.h2>
                            <motion.div
                                variants={cardContentVariants}
                                className="space-y-4"
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <Image
                                        src={transaction.productDetails.image}
                                        alt={transaction.productDetails.title}
                                        width={500}
                                        height={300}
                                        className="rounded-lg object-cover w-full"
                                    />
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        {transaction.productDetails.title}
                                    </h4>
                                    <p className="text-2xl font-bold text-cyan-500 mb-2">
                                        Rp {transaction.productDetails.price.toLocaleString('id-ID')}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-400">Status:</span>
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-medium">
                                            {transaction.productDetails.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Payment Details */}
                    <motion.div
                        className="crypto-card"
                        variants={cardContentVariants}
                    >
                        {/* Buyer Details */}
                        <motion.div
                            className="crypto-card"
                            variants={cardContentVariants}
                        >
                            <div className="px-6 py-6">
                                <motion.h2
                                    variants={headingVariants}
                                    className="text-2xl font-bold text-white mb-6"
                                >
                                    Detail Pembeli
                                </motion.h2>
                                <motion.div
                                    variants={cardContentVariants}
                                    className="bg-slate-900/50 p-4 rounded-lg space-y-3"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                                            {
                                                transaction.userDetails.photoURL ? (
                                                    <Image src={transaction.userDetails.photoURL} alt={transaction.userDetails.fullName} width={48} height={48} className="rounded-full object-cover" />
                                                ) : (
                                                    <span className="text-xl font-bold text-slate-300">
                                                        {transaction.userDetails.fullName.charAt(0)}
                                                    </span>
                                                )
                                            }
                                        </div>

                                        <div>
                                            <p className="font-semibold text-white">
                                                {transaction.userDetails.fullName}
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                {transaction.userDetails.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">Tipe Akun</span>
                                            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-medium">
                                                {transaction.userDetails.accountType}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <div className="px-6 py-6">
                            <motion.h2
                                variants={headingVariants}
                                className="text-2xl font-bold text-white mb-6"
                            >
                                Detail Pembayaran
                            </motion.h2>
                            <motion.div
                                variants={cardContentVariants}
                                className="space-y-4"
                            >
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-slate-400">Total Pembayaran</span>
                                        <span className="text-2xl font-bold text-cyan-500">
                                            Rp {(transaction.amount || parseFloat(transaction.paymentDetails.grossAmount)).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    {transaction.paymentDetails.statusMessage && (
                                        <div className="text-sm text-slate-400 text-right">
                                            Status: {transaction.paymentDetails.statusMessage}
                                        </div>
                                    )}
                                </div>

                                {/* Midtrans Payment Button */}
                                {transaction.status === 'pending' && transaction.paymentDetails.redirectUrl && (
                                    <div className="bg-slate-900/50 p-4 rounded-lg">
                                        <div className="text-center">
                                            <p className="text-slate-400 mb-3">
                                                Silakan lanjutkan pembayaran melalui dashboard
                                            </p>

                                            <a
                                                href={"/dashboard/user/transaction/unpaid"}
                                                rel="noopener noreferrer"
                                                className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                                            >
                                                Lanjutkan Pembayaran
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <div className="grid gap-3">
                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-300">Metode Pembayaran</span>
                                        <span className="font-medium text-white capitalize">
                                            {
                                                transaction.paymentDetails.paymentType ? transaction.paymentDetails.paymentType.toUpperCase() : 'N/A'
                                            }
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-300">Virtual Account</span>
                                        <span className="font-medium text-white capitalize">
                                            {
                                                transaction.paymentDetails.vaNumbers && transaction.paymentDetails.vaNumbers.length > 0 ? (
                                                    <span
                                                        className="text-cyan-500 hover:text-cyan-400 text-sm flex items-center gap-2"
                                                    >
                                                        <p>{transaction.paymentDetails.vaNumbers[0].bank.toUpperCase()}</p>|
                                                        <p>{transaction.paymentDetails.vaNumbers[0].va_number}</p>
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">N/A</span>
                                                )
                                            }
                                        </span>
                                    </div>

                                    {transaction.paymentDetails.transactionTime && (
                                        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                            <span className="text-slate-400">Waktu Transaksi</span>
                                            <span className="font-medium text-white">
                                                {new Date(transaction.paymentDetails.transactionTime).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Transaction Info */}
                        <motion.div
                            className="crypto-card"
                            variants={cardContentVariants}
                        >
                            <div className="px-6 py-6">
                                <motion.h2
                                    variants={headingVariants}
                                    className="text-2xl font-bold text-white mb-6"
                                >
                                    Informasi Transaksi
                                </motion.h2>
                                <motion.div
                                    variants={cardContentVariants}
                                    className="space-y-3"
                                >
                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-300">Order ID</span>
                                        <span className="font-mono text-sm font-medium text-white">{transaction.orderId}</span>
                                    </div>

                                    {transaction.paymentDetails.token && (
                                        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                            <span className="text-slate-400">Midtrans Token</span>
                                            <span className="font-mono text-sm font-medium text-white">{transaction.paymentDetails.token}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-400">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'success'
                                            ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                                            : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'
                                            }`}>
                                            {transaction.status === 'success' ? 'Berhasil' : 'Menunggu Pembayaran'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-400">Created</span>
                                        <span className="font-medium text-slate-300">
                                            {new Date(transaction.createdAt.seconds * 1000).toLocaleString('id-ID')}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                                        <span className="text-slate-400">Last Updated</span>
                                        <span className="font-medium text-slate-300">
                                            {new Date(transaction.updatedAt.seconds * 1000).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Transaction Link */}
                    <motion.div
                        className="crypto-card col-span-full"
                        variants={cardContentVariants}
                    >
                        <div className="px-6 py-4">
                            <div className="flex items-center sm:justify-between flex-col sm:flex-row gap-2">
                                <span className="text-slate-400">Transaction Link</span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(transaction.transactionLink)}
                                    className="text-cyan-500 hover:text-cyan-400 text-sm flex items-center gap-2"
                                >
                                    <span className="font-mono text-sm">{transaction.transactionLink}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
