"use client"
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs } from 'firebase/firestore'

import { useAuth } from '@/utils/context/AuthContext'

import Image from 'next/image'

import { VANumber, TransactionData } from '@/hooks/pages/payment/lib/payment'

import TransactionEror from '@/hooks/pages/payment/ui/TransactionEror'

import { motion } from 'framer-motion'

function PaymentInstructions({ payment_type, va_numbers }: {
    payment_type: string;
    va_numbers?: VANumber[]
}) {
    if (!va_numbers || va_numbers.length === 0) return null;

    const getPaymentMethod = () => {
        switch (payment_type) {
            case 'bank_transfer':
                return va_numbers[0].bank.toUpperCase();
            default:
                return payment_type.toUpperCase();
        }
    };

    return (
        <div className="mt-4 p-4 bg-slate-800/50 shadow-lg shadow-cyan-500/10 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700">
            <h2 className="text-white text-lg font-semibold mb-3">
                Payment Method: {getPaymentMethod()} Virtual
            </h2>

            {va_numbers.map((va, index) => (
                <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-slate-900/50 rounded">
                            <Image
                                src={`/images/banks/${va.bank.toLowerCase()}.png`}
                                alt={va.bank.toUpperCase()}
                                fill
                                className="h-8 w-auto object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-slate-300">
                                {va.bank.toUpperCase()} Virtual Account
                            </p>
                            <p className="text-sm text-slate-400">
                                Transfer sebelum batas waktu pembayaran berakhir
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Nomor Virtual Account</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(va.va_number);
                                }}
                                className="text-cyan-500 hover:text-cyan-700 flex items-center gap-2 text-sm"
                            >
                                <span>Salin</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                        <div className="font-mono text-lg font-medium text-slate-300 tracking-wider">
                            {va.va_number}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function PaymentStatusPage() {
    const params = useParams();
    const { user } = useAuth();
    const [transaction, setTransaction] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            if (!user) {
                setError('Silakan login terlebih dahulu');
                setLoading(false);
                return;
            }

            try {
                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS || 'transactions');
                const q = query(
                    transactionsRef,
                    where('orderId', '==', params.id),
                    where('userId', '==', user.uid)
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
    }, [params.id, user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <motion.div
                    className="flex flex-col items-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative">
                        {/* Outer spinning ring */}
                        <motion.div
                            className="w-24 h-24 rounded-full border-4 border-cyan-500/20"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                scale: {
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        />

                        {/* Inner spinning ring */}
                        <motion.div
                            className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-cyan-500 border-r-cyan-500 border-b-transparent border-l-transparent"
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Center dot */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Loading text with typing effect */}
                    <div className="flex items-center gap-2">
                        <motion.p
                            className="text-cyan-500 font-medium text-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Loading
                        </motion.p>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((index) => (
                                <motion.span
                                    key={index}
                                    className="w-2 h-2 bg-cyan-500 rounded-full"
                                    animate={{
                                        y: ["0%", "-50%", "0%"],
                                        opacity: [1, 0.5, 1]
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: index * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Optional subtle background glow */}
                    <motion.div
                        className="absolute w-48 h-48 bg-cyan-500/5 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <TransactionEror error={error} />
        );
    }

    if (!transaction) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Transaksi Tidak Ditemukan</h1>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
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
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent animate-pulse" />
            </div>

            {/* Main Content */}
            <div className="container max-w-7xl mx-auto relative z-10">
                {/* Header Card */}
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-lg shadow-cyan-500/10 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Detail Transaksi
                        </h1>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${transaction.status === 'success'
                            ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                            : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'
                            }`}>
                            {transaction.status === 'success' ? 'Berhasil' : 'Pending'}
                        </span>
                    </div>
                </div>

                {/* Global styles for cards */}
                <style jsx global>{`
                    .crypto-card {
                        @apply bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 
                               shadow-lg shadow-cyan-500/10 p-6 text-white;
                    }
                    .crypto-input {
                        @apply bg-slate-900/50 border border-slate-700/50 rounded-xl p-4;
                    }
                    .crypto-text {
                        @apply text-white;
                    }
                    .crypto-label {
                        @apply text-slate-300;
                    }
                    .crypto-heading {
                        @apply text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6;
                    }
                `}</style>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Product Details */}
                        <div className="crypto-card">
                            <div className="px-6 py-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Detail Produk</h2>
                                <div className="space-y-4">
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
                                </div>
                            </div>
                        </div>

                        {/* Buyer Details */}
                        <div className="crypto-card">
                            <div className="px-6 py-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Detail Pembeli</h2>
                                <div className="bg-slate-900/50 p-4 rounded-lg space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                                            <span className="text-xl font-bold text-slate-300">
                                                {transaction.userDetails.fullName.charAt(0)}
                                            </span>
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Payment Details */}
                        <div className="crypto-card">
                            <div className="px-6 py-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Detail Pembayaran</h2>
                                <div className="space-y-4">
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
                                                    Silakan lanjutkan pembayaran melalui Midtrans
                                                </p>
                                                <a
                                                    href={transaction.paymentDetails.redirectUrl}
                                                    target="_blank"
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
                                                {transaction.paymentDetails.method || 'Midtrans Payment Gateway'}
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
                                </div>
                            </div>
                        </div>

                        {/* Transaction Info */}
                        <div className="crypto-card">
                            <div className="px-6 py-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Informasi Transaksi</h2>
                                <div className="space-y-3">
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
                                </div>
                            </div>
                        </div>

                        {/* Transaction Link */}
                        <div className="crypto-card">
                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between">
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
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    {transaction.paymentDetails.paymentType === 'bank_transfer' && (
                        <PaymentInstructions
                            payment_type={transaction.paymentDetails.paymentType}
                            va_numbers={transaction.paymentDetails.va_numbers}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
