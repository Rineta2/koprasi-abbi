"use client"

import React, { useState, useEffect } from 'react'

import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/utils/firebase';

import TransactionUnpaidSkelaton from './TransactionUnpaidSkelaton'

import { useAuth } from '@/utils/context/AuthContext'

import Image from 'next/image'

import { Pagination } from '@/base/helper/Pagination'

import { Toaster, toast } from 'react-hot-toast';

import type { MidtransSuccessResult, MidtransPendingResult, MidtransErrorResult } from '@/types/midtrans';

import { useRouter } from 'next/navigation';

import { Transaction, DetailRowProps } from '@/hooks/dashboard/user/transaksi/unpaid/lib/unpaid';

import Unpaid from '@/hooks/dashboard/user/transaksi/unpaid/ui/Unpaid';

// Definisikan tipe untuk nilai yang mungkin dalam updateData
type UpdateDataValue = string | number | Date | Array<{
    bank: string;
    va_number: string;
}> | Array<{
    name: string;
    link: string;
}> | null;

// Definisikan tipe untuk payment details
interface PaymentDetails {
    transactionStatus: string;
    statusMessage: string;
    paymentType: string;
    transactionTime: string;
    transactionId: string;
    statusCode: string;
    grossAmount: string;
    method: string;
    vaNumbers?: Array<{
        bank: string;
        va_number: string;
    }>;
    billKey?: string;
    billerCode?: string;
    qrString?: string;
    actions?: Array<{
        name: string;
        link: string;
    }>;
    paymentCode?: string;
    finishRedirectUrl?: string;
}

export default function TransactionPaid() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const { user } = useAuth();
    const [loadingPayment, setLoadingPayment] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
        let unsubscribe: () => void;

        const setupRealtimeListener = async () => {
            try {
                if (!user?.uid) return;

                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(
                    transactionsRef,
                    where('userId', '==', user.uid),
                    where('status', '==', 'pending')
                );

                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const transactionData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Transaction[];

                    setTransactions(transactionData);
                    setIsLoading(false);
                });
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setIsLoading(false);
            }
        };

        setupRealtimeListener();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);

    const handleBuy = () => {
        router.push('/dashboard/user/product');
    }

    const formatDate = (timestamp: { seconds: number }) => {
        return new Date(timestamp.seconds * 1000).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    // Update filter function to use single date
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.productDetails.title.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedDate) {
            const transactionDate = new Date(transaction.createdAt.seconds * 1000);
            const selected = new Date(selectedDate);
            return matchesSearch &&
                transactionDate.getDate() === selected.getDate() &&
                transactionDate.getMonth() === selected.getMonth() &&
                transactionDate.getFullYear() === selected.getFullYear();
        }

        return matchesSearch;
    });

    // Update pagination calculations to use filtered transactions
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Add this before the return statement
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    };

    // Update date change handler
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setCurrentPage(0);
    };

    const openModal = (transactionId: string) => {
        const modal = document.getElementById(`modal_${transactionId}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelTransaction = async (transactionId: string) => {
        const modal = document.getElementById(`cancel_modal_${transactionId}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const confirmCancelTransaction = async (transactionId: string) => {
        const cancelPromise = new Promise<string>(async (resolve, reject) => {
            try {
                const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);
                await updateDoc(transactionRef, {
                    status: 'cancelled',
                    'paymentDetails.transactionStatus': 'cancelled',
                    'paymentDetails.statusMessage': 'Transaction cancelled by user',
                    updatedAt: new Date()
                });

                const modal = document.getElementById(`cancel_modal_${transactionId}`) as HTMLDialogElement;
                if (modal) {
                    modal.close();
                }
                resolve('Transaksi berhasil dibatalkan');
            } catch {
                reject('Gagal membatalkan transaksi');
            }
        });

        toast.promise(
            cancelPromise,
            {
                loading: 'Membatalkan transaksi...',
                success: (message: string) => message,
                error: (err: string) => err,
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 3000,
                    icon: '✅',
                },
                error: {
                    duration: 3000,
                    icon: '❌',
                },
            }
        );
    };

    const handleContinuePayment = async (transactionId: string, midtransToken: string) => {
        setLoadingPayment(transactionId);

        const paymentPromise = new Promise<string>(async (resolve, reject) => {
            try {
                if (!midtransToken) {
                    reject('Token pembayaran tidak tersedia');
                    return;
                }

                // Close any open modals
                const modal = document.getElementById(`modal_${transactionId}`) as HTMLDialogElement;
                if (modal) {
                    modal.close();
                }

                const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);

                // Open Snap payment popup
                window.snap.pay(midtransToken, {
                    onSuccess: async function (result: MidtransSuccessResult) {
                        try {
                            // Buat object update dengan tipe yang spesifik
                            const updateData: Record<string, UpdateDataValue> = {
                                status: 'success',
                                updatedAt: new Date()
                            };

                            // Buat payment details object
                            const paymentDetails: PaymentDetails = {
                                transactionStatus: result.transaction_status,
                                statusMessage: result.status_message,
                                paymentType: result.payment_type,
                                transactionTime: result.transaction_time,
                                transactionId: result.transaction_id,
                                statusCode: result.status_code,
                                grossAmount: result.gross_amount,
                                method: 'midtrans'
                            };

                            // Handle VA Numbers for bank transfer
                            if (result.payment_type === 'bank_transfer') {
                                if (result.va_numbers && result.va_numbers.length > 0) {
                                    paymentDetails.vaNumbers = result.va_numbers;
                                } else if (result.permata_va_number) {
                                    paymentDetails.vaNumbers = [{
                                        bank: 'permata',
                                        va_number: result.permata_va_number
                                    }];
                                }
                            }

                            // Handle Mandiri Bill
                            if (result.payment_type === 'echannel') {
                                paymentDetails.billKey = result.bill_key;
                                paymentDetails.billerCode = result.biller_code;
                            }

                            // Handle QRIS
                            if (result.payment_type === 'qris') {
                                paymentDetails.qrString = result.qr_string;
                                if (result.actions) {
                                    paymentDetails.actions = result.actions;
                                }
                            }

                            // Handle E-Wallet (DANA, OVO, etc)
                            if (['dana', 'ovo', 'gopay', 'shopeepay'].includes(result.payment_type)) {
                                if (result.actions) {
                                    paymentDetails.actions = result.actions;
                                }
                                if (result.payment_code) {
                                    paymentDetails.paymentCode = result.payment_code;
                                }
                            }

                            // Add redirect URL
                            paymentDetails.finishRedirectUrl = `/payment/status/${transactionId}`;

                            // Flatten payment details for Firestore update
                            Object.entries(paymentDetails).forEach(([key, value]) => {
                                if (value !== undefined) {  // Only add defined values
                                    updateData[`paymentDetails.${key}`] = value as UpdateDataValue;
                                }
                            });

                            await updateDoc(transactionRef, updateData);
                            resolve('Pembayaran berhasil');

                            // Redirect ke halaman status
                            router.push(`/payment/status/${transactionId}`);
                        } catch {
                            reject('Gagal mengupdate status pembayaran');
                        }
                    },
                    onPending: async function (result: MidtransPendingResult) {
                        try {
                            await updateDoc(transactionRef, {
                                status: 'pending',
                                'paymentDetails.transactionStatus': 'pending',
                                'paymentDetails.statusMessage': result.status_message,
                                'paymentDetails.transactionId': result.transaction_id,
                                'paymentDetails.statusCode': result.status_code,
                                'paymentDetails.actions': result.actions || null,
                                'paymentDetails.finishRedirectUrl': `/payment/status/${transactionId}`,
                                updatedAt: new Date()
                            });
                            resolve('Pembayaran dalam proses');
                            router.push(`/payment/status/${transactionId}`);
                        } catch {
                            reject('Gagal mengupdate status pembayaran');
                        }
                    },
                    onError: async function (result: MidtransErrorResult) {
                        try {
                            await updateDoc(transactionRef, {
                                status: 'failed',
                                'paymentDetails.transactionStatus': 'failed',
                                'paymentDetails.statusMessage': result.status_message,
                                'paymentDetails.statusCode': result.status_code,
                                updatedAt: new Date()
                            });
                            reject('Pembayaran gagal');
                            router.push(`/payment/status/${transactionId}`);
                        } catch {
                            reject('Gagal mengupdate status pembayaran');
                        }
                    },
                    onClose: function () {
                        reject('Pembayaran dibatalkan');
                    }
                });
            } catch {
                reject('Gagal memuat halaman pembayaran');
            } finally {
                setLoadingPayment('');
            }
        });

        toast.promise(
            paymentPromise,
            {
                loading: 'Mempersiapkan pembayaran...',
                success: (message: string) => message,
                error: (err: string) => err,
            },
            {
                style: {
                    minWidth: '300px',
                },
                success: {
                    duration: 5000,
                    icon: '✅',
                },
                error: {
                    duration: 4000,
                    icon: '❌',
                },
            }
        );
    };

    if (isLoading) {
        return <TransactionUnpaidSkelaton />
    }

    if (transactions.length === 0) {
        return (
            <Unpaid handleBuy={handleBuy} />
        );
    }


    return (
        <section className='min-h-full px-0 sm:px-2'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/30 p-6 sm:p-8 mb-8 transition-all hover:shadow-xl">
                <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                    Transaksi Pending
                </h1>
                <p className='text-sm sm:text-base text-gray-600 mt-2'>
                    Berikut adalah daftar transaksi yang sedang menunggu pembayaran.
                </p>

                {/* Update search and date filter controls */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari transaksi..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>

            {/* Update to show filtered results count */}
            <div className="mb-4 text-sm text-gray-600">
                Menampilkan {filteredTransactions.length} transaksi
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">
                {paginatedTransactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={transaction.productDetails.image}
                                        alt={transaction.productDetails.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1 space-y-2 sm:space-y-3">
                                    <h3 className="font-semibold text-lg line-clamp-2 text-gray-800">
                                        {transaction.productDetails.title}
                                    </h3>

                                    <p className="text-primary font-medium text-lg">
                                        Rp {new Intl.NumberFormat('id-ID').format(transaction.amount)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {formatDate(transaction.createdAt)}
                                    </p>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            className="w-full bg-primary text-white py-2.5 px-4 rounded-xl hover:bg-primary/90 active:scale-95 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                                            onClick={() => openModal(transaction.id)}
                                        >
                                            <span>Lihat Detail</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => handleContinuePayment(transaction.id, transaction.midtransToken)}
                                                disabled={loadingPayment === transaction.id}
                                                className="bg-primary/10 text-primary py-2.5 px-4 rounded-xl hover:bg-primary/20 active:scale-95 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                {loadingPayment === transaction.id ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                        <span>Memuat...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Lanjutkan Pembayaran</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleCancelTransaction(transaction.id)}
                                                className="bg-red-50 text-red-600 py-2.5 px-4 rounded-xl hover:bg-red-100 active:scale-95 transition-all duration-200 text-sm font-medium"
                                            >
                                                Batalkan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <dialog id={`modal_${transaction.id}`} className="modal">
                            <div className="modal-box bg-white w-11/12 max-w-6xl p-4 sm:p-6 lg:p-8">
                                {/* Header with gradient background */}
                                <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Detail Transaksi</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
                                                <p className="text-sm text-gray-600">Order ID:
                                                    <span className="font-medium ml-1">{transaction.orderId}</span>
                                                </p>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium w-fit">
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>

                                        <form method="dialog">
                                            <button className="btn btn-circle btn-ghost bg-white/80 hover:bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {/* Product Information Card */}
                                    <div className="w-full">
                                        <div className="bg-gray-50/50 rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                            <div className="relative w-full h-48 sm:h-56 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                                                <Image
                                                    src={transaction.productDetails.image}
                                                    alt={transaction.productDetails.title}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-all duration-500"
                                                />
                                            </div>
                                            <div className="mt-6 space-y-4">
                                                <h4 className="text-xl font-semibold text-gray-800">
                                                    {transaction.productDetails.title}
                                                </h4>
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-2xl font-bold text-primary">
                                                        Rp {new Intl.NumberFormat('id-ID').format(transaction.amount)}
                                                    </span>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                                                            {transaction.productDetails.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction Details Section */}
                                    <div className="w-full flex flex-col gap-4 sm:gap-6">
                                        {/* Payment Details Card */}
                                        <div className="bg-gray-50/50 rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Detail Pembayaran
                                            </h4>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex-1 space-y-3 sm:space-y-4">
                                                    <DetailRow
                                                        label="Metode Pembayaran"
                                                        value={transaction.paymentDetails?.paymentType
                                                            ? transaction.paymentDetails.paymentType.replace(/_/g, ' ')
                                                            : 'Belum dipilih'
                                                        }
                                                    />
                                                    <DetailRow
                                                        label="Status Transaksi"
                                                        value={transaction.paymentDetails?.transactionStatus || 'Pending'}
                                                        isStatus
                                                    />
                                                    <DetailRow
                                                        label="Jumlah Pembayaran"
                                                        value={`Rp ${new Intl.NumberFormat('id-ID').format(
                                                            parseInt(transaction.paymentDetails?.grossAmount || '0')
                                                        )}`}
                                                        isPrimary
                                                    />
                                                    <DetailRow
                                                        label="Status Message"
                                                        value={transaction.paymentDetails?.statusMessage || 'Menunggu pembayaran'}
                                                    />
                                                </div>

                                                <div className="flex-1 space-y-3 sm:space-y-4">
                                                    <DetailRow label="Tanggal Transaksi" value={formatDate(transaction.createdAt)} />
                                                    <DetailRow label="Tanggal Update" value={formatDate(transaction.updatedAt)} />
                                                    <DetailRow label="Waktu Pembayaran" value={transaction.paymentDetails.transactionTime} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buyer Information Card */}
                                        <div className="bg-gray-50/50 rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Informasi Pembeli
                                            </h4>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex-1 space-y-3 sm:space-y-4">
                                                    <DetailRow label="Nama Lengkap" value={transaction.userDetails.fullName} />
                                                    <DetailRow label="Email" value={transaction.userDetails.email} />
                                                </div>
                                                <div className="flex-1 space-y-3 sm:space-y-4">
                                                    <DetailRow label="ID Pengguna" value={transaction.userDetails.id} isCode />
                                                    <DetailRow label="Tipe Akun" value={transaction.userDetails.accountType} isStatus />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Transaction IDs Card */}
                                        <div className="bg-gray-50/50 rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                                Link Transaksi
                                            </h4>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-600 text-sm mb-2">Link Transaksi</span>
                                                    <code
                                                        className="bg-gray-100 px-4 py-3 rounded-xl text-sm font-mono overflow-x-auto hover:bg-gray-200 transition-colors cursor-pointer"
                                                        onClick={() => window.open(transaction.transactionLink, '_blank')}
                                                    >
                                                        {transaction.transactionLink}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => handleContinuePayment(transaction.id, transaction.midtransToken)}
                                        disabled={loadingPayment === transaction.id}
                                        className="flex-1 bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 active:scale-95 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        {loadingPayment === transaction.id ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                <span>Memuat...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Lanjutkan Pembayaran</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => confirmCancelTransaction(transaction.id)}
                                        className="flex-1 bg-red-50 text-red-600 py-3 px-6 rounded-xl hover:bg-red-100 active:scale-95 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <span>Batalkan Transaksi</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                        {/* Add Cancel Confirmation Modal */}
                        <dialog id={`cancel_modal_${transaction.id}`} className="modal">
                            <div className="modal-box bg-white w-11/12 max-w-lg p-6">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Konfirmasi Pembatalan</h3>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Apakah Anda yakin ingin membatalkan transaksi ini? Tindakan ini tidak dapat dibatalkan.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 w-full mt-2">
                                        <form method="dialog" className="flex-1">
                                            <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 transition-all duration-200 text-sm font-medium">
                                                Kembali
                                            </button>
                                        </form>
                                        <button
                                            className="flex-1 bg-red-50 text-red-600 py-2.5 px-4 rounded-xl hover:bg-red-100 active:scale-95 transition-all duration-200 text-sm font-medium"
                                            onClick={() => confirmCancelTransaction(transaction.id)}
                                        >
                                            Ya, Batalkan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </React.Fragment>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    )
}

const DetailRow = ({
    label,
    value,
    isStatus = false,
    isPrimary = false,
    isCode = false
}: DetailRowProps) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 text-sm">
        <span className="text-gray-600">{label}</span>
        {isStatus ? (
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full font-medium capitalize w-fit">
                {value}
            </span>
        ) : isPrimary ? (
            <span className="font-bold text-primary text-base sm:text-lg">
                {value}
            </span>
        ) : isCode ? (
            <code className="bg-gray-100 px-2 py-1 rounded-lg font-mono text-xs w-full sm:w-auto overflow-x-auto">
                {value}
            </code>
        ) : (
            <span className="font-medium capitalize">
                {value}
            </span>
        )}
    </div>
);
