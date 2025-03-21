"use client"

import React, { useEffect, useState } from 'react'

import { db } from '@/utils/firebase'

import { getAuth } from 'firebase/auth'

import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'

import Image from 'next/image'

import { Product } from '@/hooks/dashboard/user/product/lib/product'

import { useAuth } from '@/utils/context/AuthContext'

import ProductSkelaton from './ProductSkelaton'

import { motion } from 'framer-motion'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { MidtransSuccessResult, MidtransPendingResult, MidtransErrorResult } from '@/types/midtrans'

export default function ProductLayout() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [copyMessage, setCopyMessage] = useState('')
    const [loadingProductId, setLoadingProductId] = useState<string>('')
    const { user } = useAuth()
    const router = useRouter()

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
            setCopyMessage('Nomor rekening berhasil disalin!');
            // Hilangkan pesan setelah 3 detik
            setTimeout(() => {
                setCopyMessage('');
            }, 3000);
        } catch (err) {
            console.error('Gagal menyalin:', err);
            setCopyMessage('Gagal menyalin nomor rekening');
            setTimeout(() => {
                setCopyMessage('');
            }, 3000);
        }
    };

    const handlePayment = async (product: Product) => {
        setLoadingProductId(product.id);
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                throw new Error('Silakan login terlebih dahulu untuk melakukan pembayaran');
            }

            // Get fresh ID token
            const idToken = await currentUser.getIdToken(true);

            // Get user data from accounts collection using the correct Firestore methods
            const userDocRef = doc(db, 'accounts', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();

            const paymentData = {
                product: {
                    id: product.id,
                    price: product.price,
                    title: product.title,
                    status: product.status,
                    image: product.image,
                    author: {
                        id: product.author.id,
                        fullName: product.author.fullName,
                        photoUrl: product.author.photoUrl
                    },
                },
                user: {
                    id: currentUser.uid,
                    email: currentUser.email,
                    fullName: userData?.fullName || currentUser.email?.split('@')[0],
                    photoURL: userData?.photoURL || user?.photoURL || currentUser.photoURL || null,
                    accountType: userData?.accountType || user?.accountType
                },
                transaction: {
                    orderId: `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                    amount: product.price,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    paymentMethod: 'midtrans',
                    currency: 'IDR'
                }
            };

            console.log('Sending payment request with data:', paymentData);

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();
            console.log('Payment API response:', data);

            if (!response.ok) {
                throw new Error(data.error || data.details || 'Gagal memproses pembayaran');
            }

            if (!data.token) {
                throw new Error('Token pembayaran tidak diterima');
            }

            if (typeof window !== 'undefined' && window.snap) {
                const snapConfig = {
                    onSuccess: async function (result: MidtransSuccessResult) {
                        console.log('Payment success:', result);
                        try {
                            const newToken = await currentUser.getIdToken(true);

                            const notificationData = {
                                orderId: data.orderId,
                                status: 'success',
                                transaction_id: result.transaction_id,
                                payment_type: result.payment_type,
                                transaction_time: result.transaction_time,
                                transaction_status: result.transaction_status,
                                gross_amount: result.gross_amount,
                                status_message: result.status_message,
                                status_code: result.status_code,
                                va_numbers: result.va_numbers || [],
                                product: {
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    status: product.status,
                                    image: product.image,
                                }
                            };

                            console.log('Sending notification data:', notificationData);

                            const notificationResponse = await fetch('/api/payment/notification', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${newToken}`
                                },
                                body: JSON.stringify(notificationData)
                            });

                            // Log response status dan headers untuk debugging
                            console.log('Response status:', notificationResponse.status);
                            console.log('Response headers:', Object.fromEntries(notificationResponse.headers.entries()));

                            // Cek content-type dari response
                            const contentType = notificationResponse.headers.get('content-type');

                            if (!notificationResponse.ok) {
                                let errorMessage = '';
                                try {
                                    // Hanya parse sebagai JSON jika content-type adalah application/json
                                    if (contentType?.includes('application/json')) {
                                        const errorData = await notificationResponse.json();
                                        errorMessage = errorData.error || errorData.details || 'Unknown error';
                                    } else {
                                        // Jika bukan JSON, ambil text response
                                        const textError = await notificationResponse.text();
                                        console.error('Server response:', textError);
                                        errorMessage = 'Server error: Non-JSON response received';
                                    }
                                } catch (parseError) {
                                    console.error('Error parsing response:', parseError);
                                    errorMessage = 'Failed to parse server response';
                                }
                                throw new Error(`Gagal memperbarui status transaksi: ${errorMessage}`);
                            }

                            // Parse response hanya jika content-type adalah application/json
                            let responseData;
                            try {
                                if (contentType?.includes('application/json')) {
                                    responseData = await notificationResponse.json();
                                    console.log('Success response:', responseData);
                                }
                            } catch (parseError) {
                                console.error('Error parsing success response:', parseError);
                                // Tidak throw error di sini karena transaksi mungkin sudah berhasil
                            }

                            // Tambahkan delay sebelum redirect
                            setTimeout(() => {
                                router.push(`/payment/status/${data.orderId}`);
                            }, 1000);

                        } catch (error) {
                            console.error('Error updating transaction:', error);
                            // Log stack trace untuk debugging
                            if (error instanceof Error) {
                                console.error('Error stack:', error.stack);
                            }
                            alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui status transaksi');
                            // Tetap redirect ke halaman status meskipun ada error
                            router.push(`/payment/status/${data.orderId}`);
                        }
                    },
                    onPending: function (result: MidtransPendingResult) {
                        console.log('Payment pending:', result);
                        router.push(`/payment/status/${data.orderId}`);
                    },
                    onError: function (result: MidtransErrorResult) {
                        console.error('Payment error:', result);
                        router.push(`/payment/status/${data.orderId}`);
                    },
                    onClose: function () {
                        console.log('Customer closed the popup without finishing the payment');
                    }
                };

                window.snap.pay(data.token, snapConfig);
            } else {
                throw new Error('Midtrans Snap belum dimuat. Silakan muat ulang halaman.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pembayaran');
        } finally {
            setLoadingProductId('');
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
                    className="bg-white rounded-3xl shadow-md backdrop-blur-sm bg-opacity-90 p-8 mb-8"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-2">
                            <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text'>
                                Produk
                            </h1>
                            <p className='text-gray-600 text-base'>Beberapa produk yang kami tawarkan</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            key={product.id}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-xl">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                                    <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                        {product.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-base line-clamp-2">{product.description}</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={product.author.photoUrl}
                                            alt={product.author.fullName}
                                            fill
                                            className="rounded-full ring-2 ring-primary/20 shadow-md"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-700 font-semibold">{product.author.fullName}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-1.5 text-xs font-semibold bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className='flex items-center gap-3 pt-4'>
                                    <button
                                        onClick={() => handlePayment(product)}
                                        disabled={loadingProductId === product.id}
                                        className='flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {loadingProductId === product.id ? 'Memproses...' : 'Bayar Sekarang'}
                                    </button>

                                    <button
                                        onClick={handleOpenModal}
                                        disabled={loadingProductId === product.id}
                                        className='flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-md shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        Bayar Nanti
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <dialog
                    id="payment_modal"
                    className="modal fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
                >
                    <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl transform transition-all">
                        <div className="flex flex-col space-y-6">
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
                                    <p className="font-semibold text-gray-900 pl-6">BSI Koperasi ABBI</p>
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
                                    <div className="flex flex-col gap-2 pl-6">
                                        <p className="font-mono text-lg font-semibold text-gray-900 select-all">7153470752</p>
                                        <div className="flex items-center gap-3">
                                            {copyMessage && (
                                                <p className={`text-sm ${copyMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                                                    {copyMessage}
                                                </p>
                                            )}
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

                                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                    <div className="flex items-start gap-3">
                                        <svg
                                            className="w-5 h-5 text-yellow-600 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <p className="text-sm text-yellow-800">
                                            Setelah melakukan pembayaran, mohon kirimkan bukti screenshot pembayaran ke WhatsApp dibawah ini
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href='https://wa.me/6281398726682'
                                    target='_blank'
                                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    Kirim Bukti Pembayaran via WhatsApp
                                </Link>
                            </div>

                            <div className="pt-2">
                                <form method="dialog">
                                    <button className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
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
