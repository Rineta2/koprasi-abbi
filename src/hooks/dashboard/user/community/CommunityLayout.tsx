"use client"

import React from 'react'

import { motion } from 'framer-motion'

export default function CommunityLayout() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-background/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/20 dark:border-gray-800/30 p-8 mb-8"
            >
                <div className="space-y-1">
                    <h1 className='text-2xl sm:text-3xl font-bold text-text'>
                        Security Settings
                    </h1>
                    <p className='text-text-dark'>Kelola keamanan akun Anda</p>
                </div>
            </motion.div>
        </section>
    )
}
