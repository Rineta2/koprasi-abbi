import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import Image from 'next/image'

import Link from 'next/link'

import { FaUserCircle } from "react-icons/fa"

import { IoMdArrowDropdown } from "react-icons/io"

import { useAuth } from '@/router/context/AuthContext'

import { ProfileDropdownProps } from '@/components/layout/header/hooks/interface/schema'

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { logout, getDashboardUrl } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            setIsProfileOpen(false)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 rounded-xl px-3 py-2 transition-all duration-300"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt="Profile"
                        className="w-5 h-5 rounded-full object-cover"
                        width={20}
                        height={20}
                    />
                ) : (
                    <FaUserCircle className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                )}
                <span className="text-sm font-medium max-w-[120px] truncate text-neutral-700 dark:text-neutral-300">
                    {user.displayName}
                </span>
                <IoMdArrowDropdown className={`transition-transform duration-200 text-neutral-700 dark:text-neutral-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-60 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 py-1"
                    >
                        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">{user.displayName}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                        </div>
                        <Link
                            href={getDashboardUrl(user.role)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">📊</span>
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">🚪</span>
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}