"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/utils/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '@/utils/context/AuthContext'
import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'

interface TransactionData {
    status: string;
    orderId: string;
    amount: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    midtransToken: string;
    userId: string;
    userDetails: {
        id: string;
        email: string;
        fullName: string;
        photoURL: string;
        accountType: string;
    };
    productDetails: {
        id: string;
        title: string;
        price: number;
        image: string;
        status: string;
    };
    paymentDetails: {
        paymentType: string;
        transactionTime: string;
        statusMessage: string;
        statusCode: string;
        transactionId: string;
        transactionStatus: string;
        grossAmount: string;
    };
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Error</h1>
                    <p className="mt-2 text-gray-600">{error}</p>
                </div>
            </div>
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Status Pembayaran
                        </h1>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${transaction.paymentDetails.transactionStatus === 'settlement' ? 'bg-green-100 text-green-800' :
                                    transaction.paymentDetails.transactionStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {transaction.paymentDetails.transactionStatus === 'settlement' ? 'Berhasil' :
                                        transaction.paymentDetails.transactionStatus === 'pending' ? 'Menunggu Pembayaran' :
                                            'Gagal'}
                                </span>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Detail Produk
                                </h2>
                                <div className="space-y-2">
                                    <div className="aspect-w-16 aspect-h-9 mb-4">
                                        <Image
                                            src={transaction.productDetails.image}
                                            alt={transaction.productDetails.title}
                                            width={100}
                                            height={100}
                                            className="rounded-lg object-cover w-full h-48"
                                        />
                                    </div>
                                    <p className="text-gray-600">{transaction.productDetails.title}</p>
                                    <p className="text-gray-900 font-semibold">
                                        Rp {transaction.productDetails.price.toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Status: {transaction.productDetails.status}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Detail Pembayaran
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Pembayaran</span>
                                        <span className="text-gray-900 font-semibold">
                                            Rp {parseFloat(transaction.paymentDetails.grossAmount).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Metode Pembayaran</span>
                                        <span className="text-gray-900">{transaction.paymentDetails.paymentType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Waktu Transaksi</span>
                                        <span className="text-gray-900">
                                            {new Date(transaction.paymentDetails.transactionTime).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID</span>
                                        <span className="text-gray-900">{transaction.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Transaction ID</span>
                                        <span className="text-gray-900">{transaction.paymentDetails.transactionId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status Message</span>
                                        <span className="text-gray-900">{transaction.paymentDetails.statusMessage}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Riwayat Transaksi
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Dibuat pada</span>
                                        <span className="text-gray-900">
                                            {new Date(transaction.createdAt.seconds * 1000).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Terakhir diupdate</span>
                                        <span className="text-gray-900">
                                            {new Date(transaction.updatedAt.seconds * 1000).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Detail Pembeli
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        {
                                            transaction.userDetails.photoURL && (
                                                <Image
                                                    src={transaction.userDetails.photoURL}
                                                    alt={transaction.userDetails.fullName}
                                                    width={100}
                                                    height={100}
                                                />
                                            )
                                        }
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {transaction.userDetails.fullName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {transaction.userDetails.email}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Tipe Akun: {transaction.userDetails.accountType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
