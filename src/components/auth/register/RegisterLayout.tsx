"use client"

import Link from 'next/link'

import React, { useState, useEffect } from 'react'

import loginImg from "@/base/assets/auth/register.jpg"

import Image from 'next/image'

import { z } from 'zod'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/utils/context/AuthContext'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore'

import { useRouter } from 'next/navigation'

import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

import toast from 'react-hot-toast'

interface NetworkData extends DocumentData {
    ownerReferralCode: string;
    ownerStatus: string;
    supporters: Array<{
        referralCode: string;
        status: string;
    }>;
}

export default function RegisterLayout() {
    const { signUp } = useAuth()
    const [isChecking, setIsChecking] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showReferralModal, setShowReferralModal] = useState(false)
    const [generatedReferralCode, setGeneratedReferralCode] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<'reguler' | 'premium'>('reguler')
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [infoModalContent, setInfoModalContent] = useState<{ title: string, description: string }>({ title: '', description: '' })
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

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
        status: z.enum(['reguler', 'premium']).default('reguler'), // Set default value
    })

    type RegisterFormData = z.infer<typeof registerSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            status: 'reguler' // Add default values for the form
        }
    })

    useEffect(() => {
        setValue('status', selectedStatus);
    }, [setValue, selectedStatus]);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true)
            console.log("Form submission started", data) // Debug log

            // Generate referral code
            let generatedReferralCode = '';
            if (!data.referralCode) {
                generatedReferralCode = `AFF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            } else {
                // Check if referral code exists if provided
                const networkQuery = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string),
                    where('ownerReferralCode', '==', data.referralCode)
                );
                const networkSnapshot = await getDocs(networkQuery);

                if (!networkSnapshot.empty) {
                    // This is an AFF code
                    const networkDoc = networkSnapshot.docs[0];
                    const networkData = networkDoc.data();

                    // Check if AFF code has been used (has any supporters)
                    if (networkData.supporters && networkData.supporters.length > 0) {
                        setError('referralCode', {
                            type: 'manual',
                            message: 'This affiliate code has already been used. Please use a supporter code.'
                        });
                        return;
                    }
                } else {
                    // If not an AFF code, check if it's a SUP code
                    // Get all networks and find the one containing the SUP code
                    const allNetworksQuery = query(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string));
                    const allNetworksSnapshot = await getDocs(allNetworksQuery);

                    let foundNetwork: QueryDocumentSnapshot<DocumentData> | null = null;
                    let supporterIndex: number = -1;

                    allNetworksSnapshot.forEach((doc) => {
                        const networkData = doc.data();
                        const supporterIdx = networkData.supporters?.findIndex(
                            (supporter: { referralCode: string }) => supporter.referralCode === data.referralCode
                        );
                        if (supporterIdx !== -1) {
                            foundNetwork = doc;
                            supporterIndex = supporterIdx;
                        }
                    });

                    if (!foundNetwork) {
                        setError('referralCode', {
                            type: 'manual',
                            message: 'Invalid referral code'
                        });
                        return;
                    }

                    // Use the original owner's network for SUP referrals
                    const networkData = (foundNetwork as QueryDocumentSnapshot<DocumentData>).data() as NetworkData;

                    // Update the count for the supporter whose SUP code was used
                    if (supporterIndex !== -1) {
                        const supporters = networkData.supporters;

                        // Update the supporter's count and add to usedBy array
                        await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string, (foundNetwork as QueryDocumentSnapshot<DocumentData>).id), {
                            supporters: supporters.map((sup: { referralCode: string; count?: number; usedBy?: Array<{ username: string; joinedAt: Date }> }, index: number) => {
                                if (index === supporterIndex) {
                                    return {
                                        ...sup,
                                        count: (sup.count || 0) + 1,
                                        usedBy: [...(sup.usedBy || []), {
                                            username: data.username.toLowerCase(),
                                            joinedAt: new Date()
                                        }]
                                    };
                                }
                                return sup;
                            }),
                            updatedAt: new Date()
                        });
                    }

                    data.referralCode = networkData.ownerReferralCode;
                }
                generatedReferralCode = `SUP${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            }

            // Validasi username
            const isAvailable = await isUsernameAvailable(data.username)
            if (!isAvailable) {
                setError('username', {
                    type: 'manual',
                    message: 'Username already taken'
                })
                return
            }

            // Register the user
            const newUserUid = await signUp(
                data.email,
                data.password,
                data.fullName,
                data.username,
                data.phoneNumber,
                generatedReferralCode,
                data.status as 'reguler' | 'premium' // Explicitly cast to the union type
            )

            // If user used a referral code, update referral network
            if (data.referralCode) {
                // Find existing referral network
                const networkQuery = query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string),
                    where('ownerReferralCode', '==', data.referralCode)
                );
                const networkSnapshot = await getDocs(networkQuery);
                const networkDoc = networkSnapshot.docs[0];

                if (networkDoc) {
                    // Update existing network with new supporter
                    await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string, networkDoc.id), {
                        supporters: arrayUnion({
                            uid: newUserUid,
                            username: data.username.toLowerCase(),
                            referralCode: generatedReferralCode,
                            type: 'support',
                            joinedAt: new Date(),
                            referredBy: data.referralCode,
                            status: data.status, // Add user status to supporter data
                            count: 0, // Initialize count for new supporter
                            usedBy: [] // Initialize empty array for tracking who uses this SUP code
                        }),
                        updatedAt: new Date()
                    });
                }
            } else {
                // Create new network for this user as affiliate
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string), {
                    ownerUid: newUserUid,
                    ownerUsername: data.username.toLowerCase(),
                    ownerReferralCode: generatedReferralCode,
                    type: 'affiliate',
                    ownerStatus: data.status, // Add owner status to network data
                    supporters: [], // Empty array of supporters with count field
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            // Show referral code modal
            setGeneratedReferralCode(generatedReferralCode)
            setShowReferralModal(true)

            // Don't redirect immediately, let user see their referral code
            setTimeout(() => {
                setShowReferralModal(false)
                router.push('/auth/login')
            }, 10000) // Modal will auto-close after 10 seconds

        } catch (error) {
            console.error('Registration error:', error)
            // Add detailed error logging
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);

                if (error.message.includes('Username already taken')) {
                    setError('username', {
                        type: 'manual',
                        message: 'Username already taken'
                    })
                } else {
                    // Display general error message for any other errors
                    toast.error(`Registration failed: ${error.message}`);
                }
            } else {
                console.error('Unknown error type:', error);
                toast.error('An unexpected error occurred during registration');
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

            <div className='w-full container relative z-10'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20">
                    {/* Left side - Form */}
                    <div className='flex items-center justify-center p-6 lg:p-12 w-full'>
                        <form
                            onSubmit={(e) => {
                                console.log('Form submit event triggered');
                                handleSubmit(onSubmit)(e);
                            }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className="text-center space-y-3">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Registrasi</h2>
                                <p className="text-text/60 dark:text-gray-400">Mari kita siapkan semuanya agar Anda dapat mengakses akun pribadi Anda.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Nama Lengkap</span>
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

                                <div className="form-control w-full overflow-hidden">
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
                                                Memeriksa ketersediaan nama pengguna...
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
                                    <span className="label-text">Nomor Telepon</span>
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
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                                    </svg>
                                    <input
                                        {...register('password')}
                                        type={showPassword ? "text" : "password"}
                                        className="grow bg-transparent"
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="opacity-70 hover:opacity-100"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                </label>
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <div className="flex gap-4">
                                    <div
                                        className={`flex-1 cursor-pointer h-[48px] flex items-center justify-center rounded-lg border-[1px] transition-all ${selectedStatus === 'reguler' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-black border-gray-300'}`}
                                        onClick={() => {
                                            setSelectedStatus('reguler');
                                            setValue('status', 'reguler');
                                        }}
                                    >
                                        <span className="font-medium">Reguler</span>
                                        <button
                                            type="button"
                                            className="ml-2 focus:outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setInfoModalContent({
                                                    title: 'Akun Reguler',
                                                    description: 'Hanya dengan Rp 10.000, kamu bisa mencicil emas di koperasi. Cara mudah dan aman untuk investasi masa depan. Yuk, mulai sekarang'
                                                });
                                                setShowInfoModal(true);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div
                                        className={`flex-1 cursor-pointer h-[48px] flex items-center justify-center rounded-lg border-[1px] transition-all ${selectedStatus === 'premium' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-black border-gray-300'}`}
                                        onClick={() => {
                                            setSelectedStatus('premium');
                                            setValue('status', 'premium');
                                        }}
                                    >
                                        <span className="font-medium">Premium</span>
                                        <button
                                            type="button"
                                            className="ml-2 focus:outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setInfoModalContent({
                                                    title: 'Akun Premium',
                                                    description: 'Premium! Untuk Anda yang siap berinvestasi lebih besar, jadilah anggota dengan belanja koin aset Litbinex senilai Rp 8.050.000. Keuntungan maksimal menanti.'
                                                });
                                                setShowInfoModal(true);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {/* Add hidden input for status */}
                                <input type="hidden" {...register('status')} value={selectedStatus} />
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
                                onClick={() => {
                                    console.log('Register button clicked'); // Debug log
                                }}
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

            {/* Referral Code Modal */}
            {showReferralModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full space-y-4 relative">
                        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Registration Successful!
                        </h3>
                        <div className="text-center space-y-2">
                            <p className="text-gray-600 dark:text-gray-300">
                                Your account has been created successfully. Here&apos;s your referral code:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-2xl font-mono font-bold text-primary">
                                    {generatedReferralCode}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Save this code! You&apos;ll be redirected to login in a few seconds...
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setShowReferralModal(false)
                                router.push('/auth/login')
                            }}
                            className="btn btn-primary w-full"
                        >
                            Got it, let&apos;s login!
                        </button>
                    </div>
                </div>
            )}

            {/* Status Info Modal */}
            {showInfoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all overflow-hidden animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header with gradient background */}
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-5 text-white relative">
                            <h3 className="text-2xl font-bold">
                                {infoModalContent.title}
                            </h3>
                            <button
                                onClick={() => setShowInfoModal(false)}
                                className="absolute top-5 right-5 text-white hover:text-white/80 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal body with content */}
                        <div className="p-6 text-gray-700 dark:text-gray-200">
                            <div className="flex items-start mb-4">
                                <div className="flex-shrink-0 mr-4">
                                    {infoModalContent.title.includes('Premium') ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 6H10a1 1 0 110-2h3.586l-1.293-1.293A1 1 0 0112 2z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-lg">{infoModalContent.description}</p>
                            </div>
                        </div>

                        {/* Modal footer with action button */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end">
                            <button
                                onClick={() => setShowInfoModal(false)}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                Mengerti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}