"use client"

import { motion } from 'framer-motion'

import React, { useEffect, useState } from 'react'

import { collection, query, where, onSnapshot } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

import { FaRegUser } from "react-icons/fa";

import { Pagination } from '@/base/helper/Pagination'

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import CancelledSkelaton from '@/hooks/dashboard/super-admins/transaction/cancelled/CancelledSkelaton';

import Cancelled from '@/hooks/dashboard/super-admins/transaction/cancelled/ui/cancelled';

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/cancelled/lib/cancelled';

import { useRouter } from 'next/navigation';

export default function UnpaidLayout() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Add pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Show 6 items per page

    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleBack = () => {
        router.push('/dashboard/super-admins/transaction');
    }

    useEffect(() => {
        const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
        const q = query(
            transactionsRef,
            where('status', '==', 'cancelled')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const transactionsData = querySnapshot.docs.map(doc => doc.data() as Transaction);
            const sortedData = transactionsData.sort((a, b) =>
                b.updatedAt.seconds - a.updatedAt.seconds
            );
            setTransactions(sortedData);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Calculate pagination values
    const offset = currentPage * itemsPerPage;

    // Filter transactions based on search and date
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.userDetails.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.productDetails.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase());

        if (!selectedDate) return matchesSearch;

        const transactionDate = new Date(transaction.paymentDetails.transactionTime);
        const isMatchingDate = transactionDate.toDateString() === selectedDate.toDateString();

        return matchesSearch && isMatchingDate;
    });

    // Update pagination to use filtered transactions
    const paginatedTransactions = filteredTransactions.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleOpenModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        const modal = document.getElementById('transaction_modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    // Tambahkan custom styles untuk calendar
    const calendarWrapperStyle = {
        position: 'relative' as const,
        zIndex: 50
    };

    if (isLoading) {
        return <CancelledSkelaton />;
    }

    if (transactions.length === 0) {
        return (
            <Cancelled handleBack={handleBack} />
        );
    }



    return (
        <section className='min-h-full px-0 sm:px-4'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 z-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
                            Transaction Dibatalkan
                        </h1>
                        <p className='text-slate-600 text-sm md:text-base'>Kelola dan organisir transaksi yang dibatalkan</p>
                    </div>

                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="group w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary/90 to-primary  rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="font-medium">Show Filter</span>
                    </button>
                </div>

                {/* Filter Section */}
                {showFilter && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                            />
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="relative" style={calendarWrapperStyle}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                customInput={
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            placeholder="Select Date"
                                            value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 cursor-pointer"
                                            readOnly
                                        />
                                        <svg
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                }
                                dateFormat="dd/MM/yyyy"
                                isClearable
                                popperClassName="z-[100]"
                                wrapperClassName="z-[100]"
                                portalId="calendar-portal"
                            />
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8'>
                {paginatedTransactions.map((transaction, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className='group bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
                    >
                        <div className='space-y-6'>
                            <div className='relative w-full h-56 rounded-2xl overflow-hidden'>
                                <Image
                                    src={transaction.productDetails.image}
                                    alt={transaction.productDetails.title}
                                    fill
                                    className='object-cover transform transition-transform duration-500 group-hover:scale-110'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
                                <h3 className='absolute bottom-0 left-0 text-white text-lg font-semibold p-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]'>
                                    {transaction.productDetails.title}
                                </h3>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-4'>
                                    {transaction.userDetails.photoURL ? (
                                        <Image
                                            src={transaction.userDetails.photoURL}
                                            alt={transaction.userDetails.fullName}
                                            width={48}
                                            height={48}
                                            className='rounded-full ring-2 ring-primary/30 transition-all duration-300 group-hover:ring-primary/50'
                                        />
                                    ) : (
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center'>
                                            <FaRegUser className='w-5 h-5 text-slate-500' />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className='font-semibold text-lg line-clamp-1'>{transaction.userDetails.fullName}</h3>
                                        <span className='inline-flex items-center px-4 py-1.5 bg-red-100/80 text-red-700 rounded-full text-sm font-medium'>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-3 bg-slate-50/50 rounded-2xl p-4 backdrop-blur-sm'>
                                <div className='flex items-center justify-between py-2 border-b border-slate-100'>
                                    <span className='text-slate-600'>Amount</span>
                                    <span className='font-semibold text-primary'>Rp {transaction.paymentDetails.grossAmount}</span>
                                </div>
                                <div className='flex items-center justify-between py-2 border-b border-slate-100'>
                                    <span className='text-slate-600'>Payment</span>
                                    <span className='font-semibold capitalize'>{transaction.paymentDetails.method}</span>
                                </div>
                                <div className='flex items-center justify-between py-2'>
                                    <span className='text-slate-600'>Date</span>
                                    <span>{transaction.updatedAt.toDate().toLocaleString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        timeZone: 'Asia/Jakarta'
                                    })}</span>
                                </div>

                                <button
                                    onClick={() => handleOpenModal(transaction)}
                                    className="w-full mt-4 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-medium">Lihat Detail</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Pagination component */}
            {transactions.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Modal */}
            <dialog id="transaction_modal" className="modal">
                <div className="modal-box w-full max-w-[95%] md:max-w-4xl bg-white/95 backdrop-blur-sm rounded-3xl p-0 overflow-hidden shadow-2xl mx-2 md:mx-auto">
                    {selectedTransaction && (
                        <div className="relative">
                            {/* Header with Image */}
                            <div className="relative h-40 sm:h-56 w-full">
                                <Image
                                    src={selectedTransaction.productDetails.image}
                                    alt={selectedTransaction.productDetails.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{selectedTransaction.productDetails.title}</h3>
                                    <div className="flex items-center gap-2 text-white/80 text-sm sm:text-base">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span>ID: {selectedTransaction.productDetails.id}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 overflow-y-auto max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-300px)]">
                                {/* Status Bar */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 gap-2 sm:gap-0">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-semibold text-red-700">{selectedTransaction.status}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 text-sm sm:text-base">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{selectedTransaction.updatedAt.toDate().toLocaleString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            timeZone: 'Asia/Jakarta'
                                        })}</span>
                                    </div>
                                </div>

                                {/* User Info Card */}
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl sm:rounded-3xl p-4 sm:p-6">
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        {selectedTransaction.userDetails.photoURL ? (
                                            <Image
                                                src={selectedTransaction.userDetails.photoURL}
                                                alt={selectedTransaction.userDetails.fullName}
                                                width={56}
                                                height={56}
                                                className="rounded-xl sm:rounded-2xl ring-4 ring-white shadow-lg w-14 h-14 sm:w-[72px] sm:h-[72px]"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg">
                                                <FaRegUser className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <h4 className="font-bold text-lg sm:text-xl truncate">{selectedTransaction.userDetails.fullName}</h4>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-slate-600 text-sm truncate">{selectedTransaction.userDetails.email}</span>
                                                </div>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
                                                    {selectedTransaction.userDetails.accountType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-slate-100">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h4 className="font-bold text-lg sm:text-xl">Payment Information</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-slate-600">Amount</p>
                                                    <p className="font-bold text-primary">Rp {selectedTransaction.paymentDetails.grossAmount}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-slate-600">Order ID</p>
                                                    <p className="font-semibold">{selectedTransaction.orderId}</p>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                    <p className="text-sm text-slate-600">Status</p>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                        {selectedTransaction.paymentDetails.transactionStatus}
                                                    </span>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                        Code: {selectedTransaction.paymentDetails.statusCode}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-slate-600">Payment Method</p>
                                                    <p className="font-semibold capitalize">{selectedTransaction.paymentDetails.method}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-slate-600">Status Message</p>
                                        </div>
                                        <p className="font-semibold">{selectedTransaction.paymentDetails.statusMessage}</p>
                                    </div>

                                    <div className="mt-6">
                                        <a
                                            href={selectedTransaction.transactionLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Transaction Page
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <form method="dialog" className="absolute top-2 sm:top-4 right-2 sm:right-4">
                                <button className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Tambahkan portal div di akhir component sebelum closing section tag */}
            <div id="calendar-portal" />
        </section>
    )
}
