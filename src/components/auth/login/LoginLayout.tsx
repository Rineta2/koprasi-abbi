'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useAuth } from '@/utils/context/AuthContext'

import React from 'react'

import WelcomeBanner from '@/components/auth/login/ui/Banner'
import { z } from 'zod'

export default function LoginLayout() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const loginSchema = z.object({
        email: z.string().email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter')
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        try {
            // Validate the form data
            loginSchema.parse({ email, password })

            // If validation passes, attempt login with rememberMe
            await login(email, password, rememberMe)
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Convert Zod errors into a more usable format
                const formattedErrors = error.errors.reduce((acc, curr) => ({
                    ...acc,
                    [curr.path[0]]: curr.message
                }), {})
                setErrors(formattedErrors)
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

            <div className='w-full max-w-7xl relative z-10'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20">
                    <div className='flex items-center justify-center p-6 lg:p-12'>
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-text">Selamat Datang Kembali</h2>
                                <p className="text-text/60">Silahkan masukkan email dan password untuk masuk</p>
                            </div>

                            <div className="space-y-4">
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

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-background">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="grow bg-transparent"
                                            placeholder="Masukkan password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                            <span className="label-text-alt text-error">{errors.password}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="label cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-primary"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="label-text">Ingat saya</span>
                                </label>
                                <Link href="/auth/forgot-password" className="link link-primary text-sm">
                                    Lupa password?
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    className="btn w-full bg-primary text-text hover:bg-primary/80"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Memproses...' : 'Masuk'}
                                </button>
                            </div>

                            <div className="divider">OR</div>

                            <p className="text-center">
                                Belum punya akun?{' '}
                                <Link href="/auth/register" className="link link-primary">
                                    Daftar
                                </Link>
                            </p>
                        </form>
                    </div>

                    <WelcomeBanner />
                </div>
            </div>
        </section>
    )
}