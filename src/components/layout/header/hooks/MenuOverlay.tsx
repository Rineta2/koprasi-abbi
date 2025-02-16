import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

import { navLink, socialLinks } from "@/components/layout/header/data/data"

import { MenuOverlayProps } from "@/components/layout/header/hooks/interface/schema"

export default function MenuOverlay({ isOpen, onClose, pathname }: MenuOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50"
                >
                    {/* Modern gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50/90 to-neutral-100/80 dark:from-neutral-950 dark:via-neutral-900/90 dark:to-neutral-800/80 backdrop-blur-xl" />

                    {/* Content Container */}
                    <div className="relative h-full">
                        <div className="container mx-auto h-full p-6 sm:p-8 md:p-12">
                            <div className="flex flex-col h-full">
                                {/* Navigation Grid */}
                                <div className="flex-1 flex flex-col md:flex-row gap-12 md:gap-20">
                                    {/* Left Column - Main Navigation */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <nav className="space-y-4 sm:space-y-8">
                                            {navLink.map((item, index) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        delay: index * 0.1,
                                                        duration: 0.5,
                                                        ease: [0.22, 1, 0.36, 1]
                                                    }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={onClose}
                                                        className={`group w-fit flex items-center text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold 
                                                            ${pathname === item.href
                                                                ? 'text-neutral-900 dark:text-white'
                                                                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                                                            } transition-colors duration-300`}
                                                    >
                                                        <span className="relative overflow-hidden py-1">
                                                            <span className="relative inline-block transform transition-transform duration-500 group-hover:-translate-y-full">
                                                                {item.label}
                                                            </span>
                                                            <span className="absolute top-full left-0 inline-block transform transition-transform duration-500 group-hover:-translate-y-full">
                                                                {item.label}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Right Column - Social Links */}
                                    <div className="md:w-72 flex flex-col justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                    Connect with me
                                                </h3>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {socialLinks.map((social, index) => (
                                                        <motion.a
                                                            key={social.label}
                                                            href={social.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            whileHover={{
                                                                scale: 1.05,
                                                                y: -4,
                                                            }}
                                                            whileTap={{ scale: 0.95 }}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{
                                                                delay: 0.4 + (index * 0.1),
                                                            }}
                                                            className="aspect-square flex items-center justify-center rounded-2xl bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/30 hover:shadow-xl hover:shadow-neutral-200/30 dark:hover:shadow-neutral-900/40 transition-all duration-300"
                                                            aria-label={social.label}
                                                        >
                                                            <social.icon className="w-6 h-6" />
                                                        </motion.a>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                                <p>Let&apos;s create something amazing together</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-auto pt-8 flex flex-wrap items-center justify-between text-sm text-neutral-600 dark:text-neutral-400"
                                >
                                    <p>© 2024 Your Name. All rights reserved.</p>
                                    <p>Made with ❤️ in Indonesia</p>
                                </motion.div>
                            </div>

                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 180,
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/30 hover:shadow-xl hover:shadow-neutral-200/30 dark:hover:shadow-neutral-900/40 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}