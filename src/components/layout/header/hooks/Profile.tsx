import { useRef } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import Image from 'next/image'

import Link from 'next/link'

import { FaUserCircle } from "react-icons/fa"

import { IoMdArrowDropdown } from "react-icons/io"

import { useAuth } from '@/utils/context/AuthContext'

// Add user interface
interface User {
    photoURL?: string;
    fullName: string;
    email: string;
    role: string;
}

interface ProfileDropdownProps {
    user: User;  // Replace 'any' with User interface
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function ProfileDropdown({ user, isOpen, setIsOpen }: ProfileDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { logout, getDashboardUrl } = useAuth()

    const handleLogout = async () => {
        try {
            setIsOpen(false)
            await logout()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="relative dropdown-trigger" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-primary/5 rounded-xl px-3 py-2 transition-all duration-300"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={`${user.fullName}'s profile picture`}
                        className="w-5 h-5 rounded-full object-cover"
                        width={20}
                        height={20}
                    />
                ) : (
                    <FaUserCircle className="w-5 h-5 text-text/80" />
                )}
                <span className="text-sm font-medium max-w-[120px] truncate text-text/80">
                    {user.fullName}
                </span>
                <IoMdArrowDropdown
                    className={`transition-transform duration-200 text-text/80 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-60 bg-background rounded-xl shadow-lg border border-primary/10 py-1 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                    >
                        <div className="px-4 py-3 border-b border-primary/10">
                            <p className="text-sm font-medium text-text">{user.fullName}</p>
                            <p className="text-xs text-text/70 truncate">{user.email}</p>
                        </div>
                        <Link
                            href={getDashboardUrl(user.role)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-text/80 hover:bg-primary/5 transition-colors"
                            onClick={() => setIsOpen(false)}
                            role="menuitem"
                        >
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">📊</span>
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text/80 hover:bg-primary/5 transition-colors"
                            role="menuitem"
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