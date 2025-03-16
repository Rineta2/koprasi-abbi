"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { DataBlockHainType } from '@/components/ui/data-blockhain/lib/DataBlockHain'

import { FetchDataBlockHain } from '@/components/ui/data-blockhain/lib/FetchDataBlockHain'

import DataBlockHainSkelaton from '@/components/ui/data-blockhain/DataBlockHainSkelaton'

export default function DataBlockHain() {
    const [dataBlockHain, setDataBlockHain] = useState<DataBlockHainType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchDataBlockHain((newDataBlockHain) => {
            setDataBlockHain(newDataBlockHain);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <DataBlockHainSkelaton />;
    }

    return (
        <section className='min-h-full relative overflow-hidden flex items-center justify-center py-10 sm:py-20' id='home'>
            {/* Modern Decorative SVG Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Abstract geometric pattern */}
                <svg className="absolute -left-[10%] -top-[10%] w-[600px] h-[600px] text-primary/5" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.2 }} />
                            <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.05 }} />
                        </linearGradient>
                    </defs>
                    <pattern id="modernGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#modernGrid)" />
                    <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.3" fill="none" strokeDasharray="1,3" />
                </svg>

                {/* Dynamic lines pattern */}
                <svg className="absolute right-0 bottom-0 w-[700px] h-[700px] text-secondary/5" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.1 }} />
                            <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.3 }} />
                        </linearGradient>
                    </defs>
                    <pattern id="modernDots" width="10" height="10" patternUnits="userSpaceOnUse">
                        <rect width="1" height="1" fill="currentColor" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#modernDots)" opacity="0.5" />
                    <path d="M10,40 Q30,20 50,40 T90,40" fill="none" stroke="url(#grad2)" strokeWidth="0.3" />
                    <path d="M10,60 Q30,40 50,60 T90,60" fill="none" stroke="url(#grad2)" strokeWidth="0.3" />
                    <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,3" />
                    <path d="M80,20 L20,80" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,3" />
                </svg>
            </div>

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/90 
                          dark:from-background-dark/0 dark:via-background-dark/10 dark:to-background-dark/90 
                          backdrop-blur-[2px] z-0" />

            <div className="container px-4 sm:px-6 relative z-10">
                {dataBlockHain.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 xl:gap-16 items-center">
                            {/* Image Container */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-30 
                                              blur-2xl group-hover:opacity-70 transition duration-700"></div>
                                <div className="relative">
                                    <Image
                                        src={dataBlockHain[0].imageUrl}
                                        alt={dataBlockHain[0].title}
                                        className="w-full h-full object-cover"
                                        priority
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </motion.div>

                            {/* Content Container */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="space-y-4 sm:space-y-6 p-4 sm:p-8 bg-white/5 dark:bg-gray-800/20 backdrop-blur-md 
                                          rounded-2xl sm:rounded-3xl border border-gray-200/10 hover:border-primary/20
                                          hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 relative"
                            >
                                {/* Decorative Icons */}
                                <svg className="absolute top-4 right-4 w-20 h-20 text-primary/10" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <svg className="absolute bottom-4 left-4 w-16 h-16 text-secondary/10" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
                                        stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                {/* Small decorative dots */}
                                <div className="absolute -top-2 -left-2 w-4 h-4">
                                    <div className="w-1 h-1 bg-primary/20 rounded-full absolute top-0 left-0"></div>
                                    <div className="w-1 h-1 bg-primary/20 rounded-full absolute top-0 right-0"></div>
                                    <div className="w-1 h-1 bg-primary/20 rounded-full absolute bottom-0 left-0"></div>
                                    <div className="w-1 h-1 bg-primary/20 rounded-full absolute bottom-0 right-0"></div>
                                </div>

                                {/* Animated Title */}
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                                >
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary 
                                                 bg-clip-text text-transparent leading-tight tracking-tight">
                                        {dataBlockHain[0].title}
                                    </h1>
                                    {/* Decorative line */}
                                    <svg className="absolute -bottom-4 left-0 w-24 h-2" viewBox="0 0 100 2">
                                        <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor"
                                            className="text-primary/30" strokeWidth="0.5" strokeDasharray="4 2" />
                                    </svg>
                                </motion.div>

                                {/* Corner accent */}
                                <div className="absolute -bottom-1 -right-1 w-8 h-8">
                                    <svg viewBox="0 0 32 32" className="text-secondary/20">
                                        <path d="M0 32 L32 32 L32 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.5" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
