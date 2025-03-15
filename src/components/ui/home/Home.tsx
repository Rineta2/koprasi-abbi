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
        <section className='min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-0' id='home'>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/50 dark:from-background-dark/5 dark:to-background-dark/50 z-0" />

            <div className="container px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='flex flex-col space-y-6 sm:space-y-8'
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            viewport={{ once: true }}
                            className='inline-block bg-primary rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-2 sm:mb-4 w-fit'
                        >
                            <p className='text-xs sm:text-sm font-medium text-white'>{home[0].title}</p>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            viewport={{ once: true }}
                            className='text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight'
                        >
                            {home[0].primaryText}
                            <span className='block mt-2 sm:mt-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent'>
                                {home[0].text}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            viewport={{ once: true }}
                            className='text-sm sm:text-base md:text-lg text-text-dark max-w-xl capitalize'
                        >
                            {home[0].description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={home[0].button.link}
                                className='inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 group w-fit shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5'
                            >
                                {home[0].button.text}
                                <div className='bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 group-hover:translate-x-1 transition-all'>
                                    <IoIosArrowForward className='text-lg' />
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='w-full h-full flex items-center justify-center mt-8 lg:mt-0'
                    >
                        <div className="relative w-[80%] sm:w-[70%] lg:w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-dark/20 blur-3xl rounded-full" />
                            <Image
                                src={home[0].imageUrl}
                                alt={home[0].title}
                                width={600}
                                height={600}
                                className="relative z-10 drop-shadow-2xl w-full h-auto"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
