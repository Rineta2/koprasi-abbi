import { useState } from 'react'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { FaSignInAlt } from "react-icons/fa"

import { useAuth } from '@/router/context/AuthContext'

import { useModal } from '@/helper/useModal'

import { motion } from 'framer-motion'

import LoginModal from '@/components/layout/header/hooks/LoginModal'

import MenuOverlay from '@/components/layout/header/hooks/MenuOverlay'

import ProfileDropdown from '@/components/layout/header/hooks/Profile'

import ThemeToggle from '@/components/layout/header/hooks/ThemaToggle'

import { User } from '@/components/layout/header/hooks/interface/schema'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useAuth()

    useModal(isMenuOpen)
    useModal(isLoginModalOpen)

    return (
        <>
            <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 w-[92%] sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
                <nav className="container">
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border border-neutral-200/30 dark:border-neutral-800/30 rounded-2xl shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/30">
                        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
                            <Link
                                href="/"
                                className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-all duration-300"
                            >
                                Rizki Ramadhan
                            </Link>

                            <div className="flex items-center gap-2 sm:gap-4">
                                {user ? (
                                    <ProfileDropdown user={user as User} />
                                ) : (
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => setIsLoginModalOpen(true)}
                                    >
                                        <FaSignInAlt className="w-4 h-4" />
                                    </div>
                                )}

                                <ThemeToggle />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300"
                                >
                                    <motion.div
                                        animate={isMenuOpen ? "open" : "closed"}
                                        variants={{
                                            open: { rotate: 90 },
                                            closed: { rotate: 0 }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    </motion.div>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} pathname={pathname} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
    )
}
