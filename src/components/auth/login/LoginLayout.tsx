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
                                            type="password"
                                            className="grow bg-transparent"
                                            placeholder="Masukkan password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
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