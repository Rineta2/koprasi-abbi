'use client'

import Link from 'next/link'
import { useState } from 'react'
import { z } from 'zod'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/utils/firebase'

export default function ForgotPasswordLayout() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; general?: string }>({})
    const [isSuccess, setIsSuccess] = useState(false)

    const forgotPasswordSchema = z.object({
        email: z.string().email('Email tidak valid')
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        setIsSuccess(false)

        try {
            // Validate the form data
            forgotPasswordSchema.parse({ email })

            // Send password reset email using Firebase
            await sendPasswordResetEmail(auth, email)

            // Show success message
            setIsSuccess(true)
        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                // Convert Zod errors into a more usable format
                const formattedErrors = error.errors.reduce((acc, curr) => ({
                    ...acc,
                    [curr.path[0]]: curr.message
                }), {})
                setErrors(formattedErrors)
            } else {
                // Handle Firebase errors
                let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.'

                // Firebase auth error codes
                if (typeof error === 'object' && error !== null && 'code' in error) {
                    const firebaseError = error as { code: string };
                    if (firebaseError.code === 'auth/user-not-found') {
                        errorMessage = 'Email tidak ditemukan.'
                    } else if (firebaseError.code === 'auth/invalid-email') {
                        errorMessage = 'Format email tidak valid.'
                    } else if (firebaseError.code === 'auth/too-many-requests') {
                        errorMessage = 'Terlalu banyak permintaan. Silakan coba lagi nanti.'
                    }
                }

                setErrors({ general: errorMessage })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800'>
            {/* Modern geometric pattern overlay */}
            <div className="absolute inset-0">
                {/* Primary pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] 
                    bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>

                {/* Secondary larger pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] 
                    bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>

                {/* Animated gradient blur */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[800px] h-[600px] bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
                </div>
            </div>

            <div className='w-full max-w-xl relative z-10'>
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8">
                    <div className='flex flex-col items-center justify-center'>
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-text">Lupa Password</h2>
                                <p className="text-text/60">Masukkan email Anda untuk mendapatkan link reset password</p>
                            </div>

                            {isSuccess ? (
                                <div className="alert alert-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Link reset password telah dikirim ke email Anda. Silakan periksa inbox Anda.</span>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {errors.general && (
                                        <div className="alert alert-error">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{errors.general}</span>
                                        </div>
                                    )}

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
                                                type="email"
                                                className="grow bg-transparent"
                                                placeholder="Masukkan email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </label>
                                        {errors.email && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.email}</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {!isSuccess && (
                                    <button
                                        type="submit"
                                        className="btn w-full bg-primary text-text hover:bg-primary/80"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Memproses...' : 'Kirim Link Reset'}
                                    </button>
                                )}

                                <div className="text-center">
                                    <Link href="/auth/login" className="link link-primary">
                                        Kembali ke halaman login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}