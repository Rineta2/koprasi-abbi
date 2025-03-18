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
        <section className='py-16 md:py-24 lg:py-32 relative overflow-hidden' id='home'>
            {/* Subtle background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"></div>
            </div>

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                        bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                        bg-clip-text text-transparent'>
                        Data Blockchain
                    </h2>
                    <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                        rounded-full mx-auto mb-6"></div>
                    <p className="text-text/70 mt-4 text-sm md:text-base">
                        Sistem pengelolaan data modern dan terdesentralisasi
                    </p>
                </motion.div>

                {dataBlockHain.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                        {/* Image Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 relative"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg relative">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-full border border-primary/10 z-20 rounded-2xl"></div>
                                <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg z-20"></div>
                                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg z-20"></div>

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr 
                                        from-primary/15 via-transparent to-transparent z-10"></div>

                                {/* Main image - fixed height approach instead of aspect ratio */}
                                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] relative">
                                    <Image
                                        src={dataBlockHain[0].imageUrl}
                                        alt={dataBlockHain[0].title}
                                        className="w-full h-full object-cover"
                                        width={600}
                                        height={450}
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-5 space-y-6"
                        >
                            {/* Title with icon */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"></path>
                                        <path d="M16 2v4"></path>
                                        <path d="M8 2v4"></path>
                                        <path d="M3 10h18"></path>
                                        <path d="M18 21V12"></path>
                                        <path d="M12 17l-3-3 3-3"></path>
                                        <path d="M15 14h-6"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {dataBlockHain[0].title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-text/80 text-base md:text-lg leading-relaxed">
                                Sistem blockchain kami menyediakan keamanan dan transparansi tertinggi dalam pengelolaan data koperasi, memastikan integritas data anggota dan transaksi keuangan.
                            </p>

                            {/* Feature points */}
                            <div className="space-y-3 pt-2">
                                {['Transaksi Terdesentralisasi', 'Keamanan Data Tinggi', 'Transparansi Penuh'].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <span className="text-text">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Stats indicators */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                                    <p className="text-sm text-text/60 mb-1">Transaksi Aman</p>
                                    <p className="text-xl font-bold text-primary">100%</p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                                    <p className="text-sm text-text/60 mb-1">Data Terlindungi</p>
                                    <p className="text-xl font-bold text-primary">24/7</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}
