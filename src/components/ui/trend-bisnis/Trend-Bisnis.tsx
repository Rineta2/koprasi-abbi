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
        <section className="relative min-h-full py-12 md:py-20 overflow-hidden flex items-center">
            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
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

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8 order-2 lg:order-1"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={trendBisnis[0].svgUrl}
                                alt="trend-bisnis"
                                width={500}
                                height={500}
                                className="w-16 h-16 md:w-20 md:h-20"
                            />
                        </div>
                        <p className="text-text-dark text-lg md:text-xl leading-relaxed">
                            {trendBisnis[0].description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                            <Image
                                src={trendBisnis[0].imageUrl}
                                alt="trend-bisnis"
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1 }}
                className="absolute -top-20 left-10 animate-pulse-slow"
            >
                <Image src={topImg} alt="top" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 right-0 animate-pulse-slow"
            >
                <Image src={bottomImg} alt="bottom" />
            </motion.div>
        </section>
    )
}
