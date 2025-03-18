"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Image from 'next/image'

import { TrendBisnisType } from '@/components/ui/trend-bisnis/lib/schema'

import { FetchTrendBisnis } from '@/components/ui/trend-bisnis/lib/FetchTrenBisnis'

import TrendBisnisSkeleton from '@/components/ui/trend-bisnis/Trend-BisnisSkelaton'

import topImg from "@/base/assets/trend-bisnis/top.png"

import bottomImg from "@/base/assets/trend-bisnis/bottom.png"

import garudaImg from "@/base/assets/trend-bisnis/garuda.png"

import cointImg from "@/base/assets/trend-bisnis/coin.png"

export default function TrendBisnis() {

    const [trendBisnis, setTrendBisnis] = useState<TrendBisnisType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchTrendBisnis((newTrendBisnis) => {
            setTrendBisnis(newTrendBisnis);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <TrendBisnisSkeleton />;
    }

    return (
        <section className="min-h-screen bg-background relative overflow-hidden py-12 md:py-20">
            <div className="container px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={garudaImg}
                            alt="garuda"
                            className="w-20 h-20 md:w-28 md:h-28 transition-transform hover:scale-110"
                        />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-text to-text-dark"
                    >
                        {trendBisnis[0].title}
                    </motion.h1>
                    <motion.div
                        initial={{ rotate: 180, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={cointImg}
                            alt="coin"
                            className="w-20 h-20 md:w-28 md:h-28 transition-transform hover:scale-110"
                        />
                    </motion.div>
                </motion.div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 flex flex-col gap-6 md:gap-8 order-2 lg:order-1"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Image
                                    src={trendBisnis[0].svgUrl}
                                    alt="trend-bisnis"
                                    width={500}
                                    height={500}
                                    className="w-12 h-12 md:w-14 md:h-14"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                                Analisis Ekonomi
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-base md:text-lg leading-relaxed text-text">
                                {trendBisnis[0].description}
                            </p>

                            {/* Feature points */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {['Peluang Investasi', 'Strategi Bisnis', 'Perkembangan Pasar', 'Analisis Data'].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.1 * i }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <span className="text-sm md:text-base text-text">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(16,145,204,0.2)' }}
                            className="self-start mt-2 px-6 py-3 bg-primary text-white rounded-xl font-medium 
                                    transition-all duration-300 hover:bg-primary/90 shadow-md"
                        >
                            Pelajari Lebih Lanjut
                        </motion.button>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-6 order-1 lg:order-2"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            {/* Decorative elements */}
                            <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-white/30 z-10"></div>
                            <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-white/30 z-10"></div>

                            {/* Image with hover effect */}
                            <div className="group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-primary/20 z-10 opacity-70"></div>
                                <Image
                                    src={trendBisnis[0].imageUrl}
                                    alt="trend-bisnis"
                                    width={800}
                                    height={600}
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 
                                            group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background decorative elements - simplified */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-20 left-10"
                >
                    <Image src={topImg} alt="decoration" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-0 right-0"
                >
                    <Image src={bottomImg} alt="decoration" />
                </motion.div>

                {/* Additional subtle background elements */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
        </section>
    )
}
