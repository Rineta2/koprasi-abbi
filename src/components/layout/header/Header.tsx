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

import {
    headerVariants,
    logoVariants,
    navVariants,
    linkVariants,
    buttonVariants,
    itemVariants
} from '@/components/layout/header/lib/animation'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()
    const [activeDropdown, setActiveDropdown] = useState<'profile' | 'theme' | 'menu' | null>(null)

    const [activeLink, setActiveLink] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section');

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (
                    scrollPosition >= sectionTop - 50 &&
                    scrollPosition < sectionTop + sectionHeight - 50
                ) {
                    setActiveLink(section.getAttribute('id') || activeLink);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeLink]);

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

    return (
        <>
            <TopBar />
            <motion.header
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                className="fixed w-full z-50 bg-background"
            >
                <nav className="container mx-auto">
                    <div className="flex h-14 sm:h-16 md:h-18 items-center justify-between px-4">
                        <motion.div
                            variants={logoVariants}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Link
                                href="/"
                                className="flex items-center gap-2 sm:gap-2.5 hover:opacity-90 transition-all duration-300"
                            >
                                <Image
                                    src={logo}
                                    alt="Koperasi ABBI"
                                    width={32}
                                    height={32}
                                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                                    priority
                                />
                                <span className='text-sm sm:text-base md:text-lg font-bold tracking-tight hidden sm:block'>
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
                                        className={`relative text-md font-medium transition-all duration-300 py-2
                                            after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r 
                                            after:from-primary after:to-primary/70 after:transition-all after:duration-300 
                                            hover:-translate-y-[1px] text-text/80 hover:text-text 
                                            ${activeLink === link.active ? 'text-text after:w-full' : 'after:w-0 hover:after:w-full'}`}
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
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                                onClick={() => setActiveDropdown(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-background/95 border-t shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
                            >
                                <ul className='flex flex-col container mx-auto px-4 py-4 sm:py-5'>
                                    {navLink.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.2
                                            }}
                                            whileHover={{ x: 6 }}
                                            className="w-full"
                                        >
                                            <Link
                                                href={link.href}
                                                className={`block py-2.5 sm:py-3 px-4 text-sm sm:text-base font-medium 
                                                    transition-all duration-200 rounded-lg relative group
                                                    ${activeLink === link.active
                                                        ? 'text-text bg-primary/5 pl-6'
                                                        : 'text-text/80 hover:text-text hover:bg-primary/5 hover:pl-6'
                                                    }`}
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {link.label}
                                                <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full 
                                                    transition-all duration-200 
                                                    ${activeLink === link.active
                                                        ? 'bg-primary scale-100'
                                                        : 'bg-primary/70 scale-0 group-hover:scale-100'
                                                    }`}
                                                />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </>
                    )}
                </nav>
            </motion.header>
        </>
    )
}
