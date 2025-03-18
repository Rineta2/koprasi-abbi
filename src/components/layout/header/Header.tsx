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

    const [showMobileMenu, setShowMobileMenu] = useState(false);

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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            // Close the mobile menu first
            setActiveDropdown(null);

            // Add small delay to ensure smooth transition
            setTimeout(() => {
                const isMobile = window.innerWidth < 768; // md breakpoint
                const headerOffset = isMobile ? 70 : 100; // Adjust these values based on your header height

                const offsetTop = element.offsetTop;
                window.scrollTo({
                    top: offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }, 100);
        }
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setActiveDropdown(null);
    };

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
                                <span className='text-sm sm:text-base md:text-lg font-bold tracking-tight hidden sm:block bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text'>
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
                                            after:from-primary after:via-primary/80 after:to-primary/60 after:transition-all after:duration-300 
                                            hover:-translate-y-[1px] text-text/70 hover:text-text 
                                            ${activeLink === link.active ? 'text-text after:w-full' : 'after:w-0 hover:after:w-full'}`}
                                        onClick={(e) => handleNavClick(e, link.href)}
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
                                        bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white 
                                        shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 
                                        transition-all duration-300 hover:translate-y-[-1px]'
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
                                className="dropdown-trigger md:hidden text-text/80 hover:text-text ml-1.5 p-1.5 
                                    hover:bg-primary/10 rounded-full transition-all duration-300"
                                onClick={toggleMobileMenu}
                            >
                                <HiMenuAlt3 className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu */}
                    <motion.div
                        initial={false}
                        animate={showMobileMenu ? "open" : "closed"}
                        variants={{
                            open: { opacity: 1, y: 0, display: "block" },
                            closed: { opacity: 0, y: -20, transitionEnd: { display: "none" } }
                        }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg"
                    >
                        <ul className="px-4 py-2">
                            {navLink.map((link, index) => (
                                <motion.li
                                    key={index}
                                    variants={linkVariants}
                                    className="mb-1 last:mb-0"
                                >
                                    <Link
                                        href={link.href}
                                        className={`block py-3.5 text-sm font-medium transition-all duration-300
                                            ${activeLink === link.active
                                                ? 'text-primary bg-primary/5 rounded-lg px-3 -mx-3'
                                                : 'text-text/70 hover:text-text hover:bg-primary/5 hover:rounded-lg hover:px-3 hover:-mx-3'
                                            }`}
                                        onClick={(e) => {
                                            handleNavClick(e, link.href);
                                            setShowMobileMenu(false);
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </nav>
            </motion.header>
        </>
    )
}
