import React from 'react'

import { motion } from 'framer-motion'

import Link from 'next/link'

import { IoLocation } from "react-icons/io5"

import { CgMail } from "react-icons/cg";

export default function TopBar() {
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    }

    // Add child animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full sticky top-0 py-2 sm:py-3 bg-primary z-40"
        >
            <div className='container mx-auto px-3 sm:px-4 lg:px-6'>
                <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-2 text-sm gap-2 sm:gap-0">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="group w-full sm:w-auto"
                    >
                        <Link href="mailto:koprasiabbi@gmail.com"
                            className='flex items-center justify-center sm:justify-start gap-2.5 text-white group-hover:text-white/90 text-xs md:text-sm font-medium transition-all duration-300'>
                            <motion.span
                                whileHover={{ rotate: 15 }}
                                className="text-lg text-white group-hover:text-white/90"
                            >
                                <CgMail />
                            </motion.span>
                            <span className='group-hover:text-white/90'>koprasiabbi@gmail.com</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center sm:justify-start gap-2.5 group w-full sm:w-auto"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="text-lg text-white group-hover:text-white/90"
                        >
                            <IoLocation />
                        </motion.div>
                        <p className="text-xs md:text-sm text-white group-hover:text-white/90 text-center sm:text-left">
                            Jl. KH. Abdul Hamid KM.1 Cemplang, Desa Sukamulya
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}