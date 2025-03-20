"use client"

import React, { useEffect, useState, useCallback } from 'react'

import toast from 'react-hot-toast'

import { motion } from 'framer-motion'

import { db } from '@/utils/firebase'

import { collection, query, where, Timestamp, doc, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

import { useAuth } from '@/utils/context/AuthContext'

import TransactionSkelaton from "@/hooks/dashboard/user/transaksi/transaction/TransactionSkelaton"

import Image from 'next/image'

import { Transaction } from '@/hooks/dashboard/user/transaksi/transaction/lib/transaction'

import { StatusBadge, CalendarIcon, ViewIcon } from '@/hooks/dashboard/user/transaksi/transaction/ui/icons'

import { Pagination } from '@/base/helper/Pagination'

export default function TransactionLayout() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 9; // 3x3 grid layout

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.productDetails.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;

        const transactionDate = new Date(transaction.createdAt.seconds * 1000).toISOString().split('T')[0];
        const matchesDate = !dateRange ? true : transactionDate === dateRange;

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Calculate pagination
    const offset = currentPage * ITEMS_PER_PAGE;
    const paginatedTransactions = filteredTransactions.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        // Scroll to top of the transactions section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const calculateTotalTransactions = () => {
        return transactions.reduce((total, transaction) => {
            if (transaction.status === 'success') {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    };

    const checkAndUpgradeAccount = useCallback(async (totalAmount: number) => {
        try {
            if (!user?.uid) return;

            const accountRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            const accountSnap = await getDoc(accountRef);

            if (accountSnap.exists()) {
                const accountData = accountSnap.data();

                if (accountData.accountType === 'reguler' && totalAmount >= 8050000) {
                    await updateDoc(accountRef, {
                        accountType: 'premium',
                        updatedAt: serverTimestamp()
                    });
                    toast.success('Selamat! Akun Anda telah diupgrade ke Premium!', {
                        duration: 5000,
                        position: 'top-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error upgrading account:', error);
            toast.error('Gagal mengupgrade akun. Silakan coba lagi nanti.');
        }
    }, [user]);

    useEffect(() => {
        let unsubscribe: () => void;

        const setupRealtimeListener = async () => {
            try {
                if (!user?.uid) return;

                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(transactionsRef, where('userId', '==', user.uid));

                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const transactionData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Transaction[];

                    setTransactions(transactionData);
                    setLoading(false);

                    const totalAmount = transactionData.reduce((total, transaction) => {
                        if (transaction.status === 'success') {
                            return total + transaction.amount;
                        }
                        return total;
                    }, 0);

                    checkAndUpgradeAccount(totalAmount);
                }, (error) => {
                    console.error('Error fetching transactions:', error);
                    toast.error('Gagal memuat transaksi. Silakan refresh halaman.');
                    setLoading(false);
                });
            } catch (error) {
                console.error('Error setting up realtime listener:', error);
                toast.error('Terjadi kesalahan. Silakan refresh halaman.');
                setLoading(false);
            }
        };

        setupRealtimeListener();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user, checkAndUpgradeAccount]);

    const formatDate = (timestamp: Timestamp) => {
        return new Date(timestamp.seconds * 1000).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const openModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    if (loading) {
        return (
            <TransactionSkelaton />
        )
    }

    return (
        <section className='min-h-full px-0 sm:px-2'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/20 p-6 sm:p-8 mb-8"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                            Riwayat Transaksi
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Lihat dan kelola semua transaksi Anda di satu tempat
                        </p>
                    </div>

                    <div className="mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-600">Total Transaksi Sukses</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                            Rp {calculateTotalTransactions().toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="relative mb-8">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filter Transaksi</span>
                </button>

                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Cari transaksi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 backdrop-blur-sm transition-all duration-200"
                        />
                        <input
                            type="date"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 backdrop-blur-sm transition-all duration-200"
                        />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 backdrop-blur-sm transition-all duration-200"
                        >
                            <option value="all">Semua Status</option>
                            <option value="success">Sukses</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Gagal</option>
                        </select>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedTransactions.map((transaction) => (
                    <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 hover:border-primary/30 overflow-hidden"
                    >
                        <div className="p-4 sm:p-6 space-y-4">
                            <div className="flex gap-4">
                                <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={transaction.productDetails.image}
                                        alt={transaction.productDetails.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 space-y-2">
                                    <h3 className="font-semibold text-lg sm:text-xl text-gray-800 line-clamp-2">
                                        {transaction.productDetails.title}
                                    </h3>
                                    <StatusBadge status={transaction.status} />
                                    <p className="text-base sm:text-lg font-medium text-gray-900">
                                        Rp {transaction.amount.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-1.5">
                                    <CalendarIcon />
                                    <span className="text-xs sm:text-sm">{formatDate(transaction.createdAt)}</span>
                                </div>
                                <button
                                    onClick={() => openModal(transaction)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
                                >
                                    <ViewIcon />
                                    <span className="text-xs sm:text-sm">Detail</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredTransactions.length === 0 && !loading && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Tidak ada transaksi yang sesuai dengan filter yang dipilih</p>
                </div>
            )}

            {filteredTransactions.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}

            <dialog
                id="transaction_modal"
                className={`modal ${isModalOpen ? 'modal-open' : ''}`}
                open={isModalOpen}
            >
                {selectedTransaction && (
                    <div className="modal-box w-full max-w-4xl bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl max-h-[90vh]">
                        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={selectedTransaction.status} />
                                    <h3 className="font-bold text-xl sm:text-2xl text-gray-800">
                                        Detail Transaksi
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                    <div className="w-full sm:w-1/3">
                                        <div className="relative aspect-square rounded-xl overflow-hidden">
                                            <Image
                                                src={selectedTransaction.productDetails.image}
                                                alt={selectedTransaction.productDetails.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-4">
                                            {selectedTransaction.productDetails.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-4 border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                                                <p className="text-2xl font-bold text-primary">
                                                    Rp {selectedTransaction.amount.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-[200px] bg-white rounded-xl p-4 border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Metode Pembayaran</p>
                                                <p className="text-lg font-semibold capitalize">
                                                    {selectedTransaction.paymentDetails.paymentType?.replace('_', ' ') || 'Tidak tersedia'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Info Transaksi
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-medium">{selectedTransaction.orderId}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Status Transaksi</p>
                                            <p className="font-medium capitalize">{selectedTransaction.paymentDetails.transactionStatus}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Waktu Transaksi</p>
                                            <p className="font-medium">{selectedTransaction.paymentDetails.transactionTime}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Info Pelanggan
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Nama</p>
                                            <p className="font-medium">{selectedTransaction.userDetails.fullName}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{selectedTransaction.userDetails.email}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Tipe Akun</p>
                                            <p className="font-medium capitalize">{selectedTransaction.userDetails.accountType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Timeline
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Transaksi Dibuat</p>
                                            <p className="font-medium">{formatDate(selectedTransaction.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
                                            <p className="font-medium">{formatDate(selectedTransaction.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm" onClick={closeModal}>
                    <button className="w-full h-full cursor-default">close</button>
                </form>
            </dialog>
        </section>
    )
}
