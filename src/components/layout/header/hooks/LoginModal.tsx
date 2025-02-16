import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import Image from "next/image"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, signupSchema, LoginFormData, SignupFormData } from "@/components/layout/header/auth/auth"

import { useAuth } from '@/router/context/AuthContext'

import loginimg from "@/assets/auth/login.jpg"

import registerimg from "@/assets/auth/register.jpg"

import { LoginModalProps } from "@/components/layout/header/hooks/interface/schema"

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLoginView, setIsLoginView] = useState(true)
    const [isRegistering, setIsRegistering] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    })

    const { login, loginWithGoogle, register } = useAuth()

    const onLoginSubmit = async (data: LoginFormData) => {
        setIsLoggingIn(true)
        try {
            await login(data.email, data.password)
            onClose()
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoggingIn(false)
        }
    }

    const onSignupSubmit = async (data: SignupFormData) => {
        setIsRegistering(true)
        try {
            await register(data.name, data.email, data.password)
            setIsLoginView(true)
            signupForm.reset()
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setIsRegistering(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            onClose()
        } catch (error) {
            console.error('Google login error:', error)
        }
    }

    const handleClose = () => {
        onClose()
        setIsLoginView(true)
        loginForm.reset()
        signupForm.reset()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-5xl mockup-window bg-base-300 border max-h-[90vh] overflow-y-auto"
                    >
                        <div className="bg-base-200 p-4 sm:p-6 grid md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Left side - Illustration */}
                            <div className="hidden md:flex items-center justify-center rounded-xl relative overflow-hidden min-h-[400px]">
                                <Image
                                    src={isLoginView ? loginimg : registerimg}
                                    alt={isLoginView ? "Login illustration" : "Register illustration"}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Right side - Form */}
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                        {isLoginView ? "Sign in" : "Create Account"}
                                    </h2>
                                </div>

                                <form className="space-y-3 sm:space-y-4" onSubmit={isLoginView ? loginForm.handleSubmit(onLoginSubmit) : signupForm.handleSubmit(onSignupSubmit)}>
                                    {!isLoginView && (
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="John Doe"
                                                {...signupForm.register("name")}
                                                className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                                            />
                                            {signupForm.formState.errors.name && (
                                                <p className="text-red-500 text-sm">{signupForm.formState.errors.name.message}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="example@email.com"
                                            {...(isLoginView ? loginForm.register("email") : signupForm.register("email"))}
                                            className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                                        />
                                        {(isLoginView ? loginForm.formState.errors.email : signupForm.formState.errors.email) && (
                                            <p className="text-red-500 text-sm">
                                                {isLoginView
                                                    ? loginForm.formState.errors.email?.message
                                                    : signupForm.formState.errors.email?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            {...(isLoginView ? loginForm.register("password") : signupForm.register("password"))}
                                            className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                                        />
                                        {(isLoginView ? loginForm.formState.errors.password : signupForm.formState.errors.password) && (
                                            <p className="text-red-500 text-sm">
                                                {isLoginView
                                                    ? loginForm.formState.errors.password?.message
                                                    : signupForm.formState.errors.password?.message}
                                            </p>
                                        )}
                                    </div>

                                    {!isLoginView && (
                                        <div className="space-y-2">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                {...signupForm.register("confirmPassword")}
                                                className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                                            />
                                            {signupForm.formState.errors.confirmPassword && (
                                                <p className="text-red-500 text-sm">{signupForm.formState.errors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoggingIn || isRegistering}
                                        className="w-full py-2 sm:py-2.5 px-4 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoginView ? (
                                            isLoggingIn ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Signing in...</span>
                                                </>
                                            ) : (
                                                "Sign in"
                                            )
                                        ) : (
                                            isRegistering ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Registering...</span>
                                                </>
                                            ) : (
                                                "Register"
                                            )
                                        )}
                                    </button>
                                </form>
                                <div className="text-center">
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {isLoginView ? "Are you new here? " : "Already have an account? "}
                                        <button
                                            onClick={() => setIsLoginView(!isLoginView)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            {isLoginView ? "Sign up" : "Sign in"}
                                        </button>
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500">Or</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 text-sm sm:text-base border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-200"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}