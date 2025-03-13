"use client"

import Link from 'next/link'

import React, { useState } from 'react'

import loginImg from "@/base/assets/auth/register.jpg"

import Image from 'next/image'

import { z } from 'zod'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/utils/context/AuthContext'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs, addDoc, updateDoc, arrayUnion } from 'firebase/firestore'

import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

export default function RegisterLayout() {
    const { signUp } = useAuth()
    const [isChecking, setIsChecking] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Custom validation function to check username availability
    const isUsernameAvailable = async (username: string) => {
        try {
            setIsChecking(true)
            const usernameQuery = query(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
                where('username', '==', username.toLowerCase())
            )
            const querySnapshot = await getDocs(usernameQuery)
            return querySnapshot.empty
        } catch (error) {
            console.error('Error checking username:', error)
            return false
        } finally {
            setIsChecking(false)
        }
    }

    // Define schema after isUsernameAvailable is defined
    const registerSchema = z.object({
        fullName: z.string().min(3, 'Full name must be at least 3 characters'),
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .refine(async (username) => await isUsernameAvailable(username), {
                message: 'Username already taken'
            }),
        email: z.string().email('Invalid email address'),
        phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        referralCode: z.string().optional(),
    })

    type RegisterFormData = z.infer<typeof registerSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true)

            // Username validation remains the same
            const isAvailable = await isUsernameAvailable(data.username)
            if (!isAvailable) {
                setError('username', {
                    type: 'manual',
                    message: 'Username already taken'
                })
                return
            }

            // Process referral code if exists
            if (data.referralCode) {
                // Check referral code existence
                const referralQuery = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
                    where('referralCode', '==', data.referralCode),
                )
                const referralSnapshot = await getDocs(referralQuery)

                if (referralSnapshot.empty) {
                    setError('referralCode', {
                        type: 'manual',
                        message: 'Invalid referral code'
                    })
                    toast.error('Kode referral tidak valid')
                    return
                }

                // Get affiliate data
                const affiliateData = referralSnapshot.docs[0].data()
                const affiliateUsername = affiliateData.username

                // Check if user has already used any referral code
                const userAsSubscriberQuery = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_AFFILIATES as string),
                    where('subscriberDetails.username', '==', data.username)
                )
                const userAsSubscriberSnapshot = await getDocs(userAsSubscriberQuery)

                if (!userAsSubscriberSnapshot.empty) {
                    setError('referralCode', {
                        type: 'manual',
                        message: 'You have already used a referral code'
                    })
                    toast.error('Anda sudah pernah menggunakan kode referral sebelumnya')
                    return
                }

                // Get the root affiliate (Alfiet) document
                const rootAffiliateQuery = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_AFFILIATES as string),
                    where('username', '==', 'alfiet')
                )
                const rootAffiliateSnapshot = await getDocs(rootAffiliateQuery)

                const affiliateRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_AFFILIATES as string)

                if (rootAffiliateSnapshot.empty) {
                    // Create new affiliate document with Alfiet as root
                    const orderedData = {
                        createdAt: new Date(),
                        referralCode: data.referralCode,
                        status: 'active',
                        type: 'affiliate',
                        username: 'alfiet',
                        subscriberDetails: [{
                            joinedAt: new Date(),
                            type: 'subscriber',
                            username: data.username,
                            usedReferralFrom: affiliateUsername,
                            referralChain: [affiliateUsername]
                        }]
                    } as const;

                    await addDoc(affiliateRef, orderedData)
                } else {
                    // Update existing root affiliate document
                    const rootAffiliateDoc = rootAffiliateSnapshot.docs[0]

                    // Remove unnecessary check
                    const newSubscriber = {
                        joinedAt: new Date(),
                        type: 'subscriber',
                        username: data.username,
                        usedReferralFrom: affiliateUsername,
                        referralChain: [affiliateUsername]
                    } as const;

                    // Update document dengan subscriber baru
                    await updateDoc(rootAffiliateDoc.ref, {
                        subscriberDetails: arrayUnion(newSubscriber)
                    })
                }
            }

            // Proses pendaftaran user
            const newUserReferralCode = await signUp(
                data.email,
                data.password,
                data.fullName,
                data.username,
                data.phoneNumber
            )

            // Tampilkan modal referral code
            const modal = document.getElementById('referral_modal') as HTMLDialogElement
            if (modal) {
                modal.showModal()
            }

            setReferralCode(newUserReferralCode)
        } catch (error) {
            console.error('Registration error:', error)
            if (error instanceof Error) {
                if (error.message.includes('Username already taken')) {
                    setError('username', {
                        type: 'manual',
                        message: 'Username already taken'
                    })
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Add blur handler for username field to check availability
    const handleUsernameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const username = e.target.value
        if (username.length >= 3) {
            const isAvailable = await isUsernameAvailable(username)
            if (!isAvailable) {
                setError('username', {
                    type: 'manual',
                    message: 'Username already taken'
                })
            } else {
                clearErrors('username')
            }
        }
    }

    // Add state for referral code
    const [referralCode, setReferralCode] = useState<string>('')
    const [copied, setCopied] = useState(false)

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(referralCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    // Add handler for modal close
    const handleModalClose = () => {
        reset() // Reset the form
        setReferralCode('') // Reset referral code state
        setCopied(false) // Reset copied state
        router.push('/auth/login') // Redirect to login
    }

    return (
        <section className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
            {/* Enhanced geometric pattern overlay */}
            <div className="absolute inset-0">
                {/* Primary pattern with animation */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] 
                    bg-[size:32px_32px] animate-[grain_8s_steps(10)_infinite] [mask-image:radial-gradient(ellipse_at_center,white_70%,transparent_100%)]"></div>

                {/* Animated gradient blobs */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute w-[800px] h-[800px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            <div className='w-full max-w-7xl relative z-10'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20">
                    {/* Left side - Form */}
                    <div className='flex items-center justify-center p-6 lg:p-12 w-full'>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                            <div className="text-center space-y-3">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Registrasi</h2>
                                <p className="text-text/60 dark:text-gray-400">Let&apos;s get you all set up so you can access your personal account.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background overflow-hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <input
                                            {...register('fullName')}
                                            type="text"
                                            className="grow bg-transparent"
                                            placeholder="Masukan Nama Lengkap"
                                        />
                                    </label>
                                    {errors.fullName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.fullName.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <input
                                            {...register('username')}
                                            type="text"
                                            className="grow bg-transparent"
                                            placeholder="Enter username"
                                            onBlur={handleUsernameBlur}
                                        />
                                    </label>
                                    {errors.username && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.username.message}</span>
                                        </label>
                                    )}
                                    {isChecking && (
                                        <label className="label">
                                            <span className="label-text-alt text-info">
                                                Checking username availability...
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="grow bg-transparent"
                                        placeholder="Enter email"
                                    />
                                </label>
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <input
                                        {...register('phoneNumber')}
                                        type="tel"
                                        className="grow bg-transparent"
                                        placeholder="Enter phone number"
                                    />
                                </label>
                                {errors.phoneNumber && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.phoneNumber.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        {...register('password')}
                                        type="password"
                                        className="grow bg-transparent"
                                        placeholder="Enter password"
                                    />
                                </label>
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Referral Code (Optional)</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 6H10a1 1 0 110-2h3.586l-1.293-1.293A1 1 0 0112 2z" clipRule="evenodd" />
                                    </svg>
                                    <input
                                        {...register('referralCode')}
                                        type="text"
                                        className="grow bg-transparent"
                                        placeholder="Enter referral code"
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-primary text-text hover:bg-primary/80 border-0"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Creating account...
                                    </>
                                ) : (
                                    'Create account'
                                )}
                            </button>

                            <p className="text-center text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-primary hover:text-purple-600 transition-colors duration-200 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>

                    {/* Right side - Image with enhanced container */}
                    <div className='hidden lg:block'>
                        <div className="flex items-center justify-center p-12 relative h-full">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={loginImg}
                                    alt='sign in image'
                                    className='object-cover hover:scale-105 transition-transform duration-500'
                                    priority
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add modal at the end of the section */}
            <dialog id="referral_modal" className="modal">
                <div className="modal-box bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-md mx-auto">
                    {/* Success Icon Animation */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    <h3 className="font-bold text-2xl text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                        Pendaftaran Berhasil! 🎉
                    </h3>

                    <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
                        Selamat datang di komunitas kami!
                    </p>

                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Kode Referral Anda
                            </p>
                            <div className="relative">
                                <div className="font-mono text-xl bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 pr-12 text-center select-all">
                                    {referralCode}
                                </div>
                                <button
                                    onClick={handleCopyClick}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                                    title="Copy to clipboard"
                                >
                                    {copied ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
                                {copied ? (
                                    <span className="text-green-500 flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Tersalin ke clipboard!
                                    </span>
                                ) : (
                                    'Klik ikon untuk menyalin'
                                )}
                            </p>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Bagikan kode ini dengan teman-teman dan dapatkan reward!
                            </p>

                            <div className="flex justify-center gap-4">
                                <form method="dialog" className="space-x-2">
                                    <button
                                        className="btn btn-primary px-6"
                                        onClick={handleModalClose}
                                    >
                                        Lanjutkan ke Login
                                    </button>
                                    <button
                                        className="btn btn-ghost"
                                        onClick={handleModalClose}
                                    >
                                        Tutup
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                    <button onClick={handleModalClose}>close</button>
                </form>
            </dialog>
        </section>
    )
}