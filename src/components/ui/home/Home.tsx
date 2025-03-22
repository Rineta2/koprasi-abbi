"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { HomeType } from '@/components/ui/home/lib/schema'

import { FetchHome } from '@/components/ui/home/lib/FetchHome'

import HomeSkelaton from '@/components/ui/home/HomeSkelaton'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

import { motion } from 'framer-motion'

export default function Home() {
    const [home, setHome] = useState<HomeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchHome((newHome) => {
            setHome(newHome);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <HomeSkelaton />;
    }

    return (
        <section className='min-h-screen relative overflow-hidden flex items-center pt-6 md:pt-0 bg-gradient-to-b from-slate-50 to-white' id='home'>
            {/* Modern mesh gradient overlay dengan animasi */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_40%)] z-0"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                        className='flex flex-col space-y-8 sm:space-y-10'
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.6,
                                type: "spring"
                            }}
                            whileHover={{ scale: 1.05 }}
                            className='inline-flex items-center gap-2 bg-white/50 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-2 sm:mb-4 w-fit hover:bg-white/80 transition-all duration-300 border border-slate-100 shadow-sm'
                        >
                            <span className='flex h-2 w-2 rounded-full bg-primary animate-pulse'></span>
                            <p className='text-xs sm:text-sm font-medium text-primary'>{home[0].title}</p>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className='text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-balance bg-clip-text text-slate-800'
                        >
                            {home[0].primaryText}
                            <span className='block mt-3 sm:mt-5 bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent animate-gradient relative'>
                                {home[0].text}
                                <svg className="absolute -bottom-8 left-0 w-32 h-3 text-primary/30" viewBox="0 0 100 12" fill="none">
                                    <path d="M0 10C30 4 70 4 100 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className='text-base sm:text-lg md:text-xl text-slate-600 max-w-xl capitalize leading-relaxed font-light'
                        >
                            {home[0].description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4"
                        >
                            <Link
                                href={home[0].button.link}
                                className='inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-dark text-white px-7 sm:px-9 py-4 sm:py-5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 group w-fit shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.25)] '
                            >
                                {home[0].button.text}
                                <div className='bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 group-hover:translate-x-1.5 transition-all duration-300'>
                                    <IoIosArrowForward className='text-lg' />
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                        whileHover={{ scale: 1.02 }}
                        className='w-full h-full flex items-center justify-center mt-8 lg:mt-0'
                    >
                        <div className="relative w-[90%] sm:w-[80%] lg:w-full aspect-square">
                            {/* Glassmorphism effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-[120px] rounded-full animate-pulse" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary-dark/30 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
                            <Image
                                src={home[0].imageUrl}
                                alt={home[0].title}
                                width={600}
                                height={600}
                                className="relative z-10 drop-shadow-2xl w-full h-auto"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
