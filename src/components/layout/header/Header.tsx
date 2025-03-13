"use client"

import Link from 'next/link'

import { FaSignInAlt } from "react-icons/fa"

import { useAuth } from '@/utils/context/AuthContext'

import { motion } from 'framer-motion'

import ProfileDropdown from '@/components/layout/header/hooks/Profile'

import ThemeToggle from '@/components/layout/header/hooks/ThemaToggle'

import { useRouter } from 'next/navigation'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()

    const handleLogin = () => {
        router.push('/auth/login')
    }

    return (
        <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 w-[92%] sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
            <nav className="container">
                <div className="backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border border-neutral-200/30 dark:border-neutral-800/30 rounded-2xl shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/30">
                    <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
                        <Link
                            href="/"
                            className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-300"
                        >
                            Koprasi Abbi
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {user ? (
                                <ProfileDropdown user={user} />
                            ) : (
                                <motion.button
                                    className='cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300'
                                    onClick={handleLogin}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaSignInAlt className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                                    <span className='text-sm font-medium text-neutral-800 dark:text-neutral-200'>Login</span>
                                </motion.button>
                            )}

                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
