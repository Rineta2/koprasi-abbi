"use client"

import Link from 'next/link'

import { useState, useEffect } from 'react'

import { HiMenuAlt3 } from 'react-icons/hi'

import { FaSignInAlt } from "react-icons/fa"

import { useAuth } from '@/utils/context/AuthContext'

import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

import ProfileDropdown from '@/components/layout/header/hooks/Profile'

import ThemeToggle from '@/components/layout/header/hooks/ThemaToggle'

import TopBar from '@/components/layout/header/hooks/TopBar'

import Image from 'next/image'

import logo from '@/base/assets/logo/logo.png'

import { navLink } from '@/components/layout/header/data/data'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()
    const [activeDropdown, setActiveDropdown] = useState<'profile' | 'theme' | 'menu' | null>(null)

    const handleLogin = () => {
        router.push('/auth/login')
    }

    // Add click outside handler for the entire header
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.dropdown-trigger')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const logoVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    }

    const navVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    }

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    }

    const buttonVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: 10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    }

    return (
        <>
            <TopBar />
            <motion.header
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="fixed w-full z-50"
            >
                <nav className="container mx-auto">
                    <div className="backdrop-blur-xl bg-background/80 shadow-sm">
                        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between px-4">
                            <motion.div
                                variants={logoVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Link
                                    href="/"
                                    className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-all duration-300"
                                >
                                    <Image
                                        src={logo}
                                        alt="Koperasi ABBI"
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain"
                                        priority
                                    />
                                    <span className='text-base sm:text-lg md:text-xl font-bold tracking-tight hidden sm:block'>
                                        Koperasi ABBI
                                    </span>
                                </Link>
                            </motion.div>

                            <motion.ul
                                variants={navVariants}
                                className='hidden md:flex items-center gap-10'
                            >
                                {navLink.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        variants={linkVariants}
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className='relative text-sm font-medium text-text/80 hover:text-text transition-all duration-300 py-2
                                            after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary 
                                            after:to-primary/70 after:transition-all after:duration-300 hover:after:w-full hover:-translate-y-[1px]'
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                variants={buttonVariants}
                                className="flex items-center gap-3 sm:gap-4 md:gap-6"
                            >
                                {user ? (
                                    <motion.div variants={itemVariants}>
                                        <ProfileDropdown
                                            user={user}
                                            isOpen={activeDropdown === 'profile'}
                                            setIsOpen={(open) => setActiveDropdown(open ? 'profile' : null)}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        variants={itemVariants}
                                        className='flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full
                                        bg-gradient-to-r from-primary to-primary/90 text-white shadow-sm shadow-primary/20
                                        hover:shadow-md hover:shadow-primary/30 transition-all duration-300'
                                        onClick={handleLogin}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaSignInAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        <span className='text-xs sm:text-sm font-medium hidden sm:block'>Login</span>
                                    </motion.button>
                                )}

                                <motion.div variants={itemVariants}>
                                    <ThemeToggle
                                        isOpen={activeDropdown === 'theme'}
                                        setIsOpen={(open) => setActiveDropdown(open ? 'theme' : null)}
                                    />
                                </motion.div>

                                <motion.button
                                    variants={itemVariants}
                                    className="dropdown-trigger md:hidden text-text/80 hover:text-text ml-1.5 p-1.5 hover:bg-primary/5 rounded-full transition-colors duration-200"
                                    onClick={() => setActiveDropdown(activeDropdown === 'menu' ? null : 'menu')}
                                >
                                    <HiMenuAlt3 className="w-6 h-6" />
                                </motion.button>
                            </motion.div>
                        </div>

                        {activeDropdown === 'menu' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-background/95 border-t shadow-lg"
                            >
                                <ul className='flex flex-col container mx-auto px-4 py-6'>
                                    {navLink.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ x: 10 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className='block py-3 px-4 text-base font-medium text-text/80 hover:text-text 
                                                transition-all duration-200 rounded-lg hover:bg-primary/5 relative
                                                hover:pl-6'
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </nav>
            </motion.header>
        </>
    )
}
