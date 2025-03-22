"use client"

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"

import { FetchInsplentasi } from "@/components/ui/insplenstasi/lib/FetchInsplentasi"
import InsplentasiSkelaton from "@/components/ui/insplenstasi/InsplentasiSkelaton"
import { InsplenstasiType } from "@/components/ui/insplenstasi/lib/schema"

import Image from "next/image"
import imgInsplentasi from "@/base/assets/insplentasi/bg.jpg"
import elang from "@/base/assets/trend-bisnis/garuda.png"
import coint from "@/base/assets/trend-bisnis/coin.png"

import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"

export default function Insplentasi() {
    const [insplenstasi, setInsplenstasi] = useState<InsplenstasiType[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();

    // Meningkatkan efek parallax untuk background
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0.85]);

    useEffect(() => {
        const unsubscribe = FetchInsplentasi((newInsplenstasi) => {
            setInsplenstasi(newInsplenstasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <InsplentasiSkelaton />;
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24">
            {/* Enhanced Parallax Background */}
            <motion.div
                className='absolute top-0 left-0 w-full h-full'
                style={{
                    y: backgroundY,
                    scale: backgroundScale,
                    opacity: backgroundOpacity,
                }}
            >
                <motion.div
                    className="absolute inset-0 bg-black"
                    style={{
                        opacity: overlayOpacity
                    }}
                />
                <Image
                    src={imgInsplentasi}
                    alt='insplentasi'
                    className='w-full h-[120%] object-cover object-center'
                    priority
                    quality={100}
                />
            </motion.div>

            {/* Tambahkan efek blur gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-8 lg:px-12">
                {insplenstasi.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 container 
                            backdrop-blur-md bg-black/40 p-6 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl 
                            border border-gray-300/30'
                    >
                        {/* Title Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className='flex flex-col md:flex-row items-center justify-center gap-6 
                                bg-white/90 p-6 md:p-8 rounded-2xl relative shadow-lg
                                transition-all duration-300 border border-gray-300'
                        >
                            <div className='flex flex-wrap items-center justify-center gap-6 z-10'>
                                <Image
                                    src={elang}
                                    alt='elang'
                                    className='w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-105'
                                />
                                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 drop-shadow-sm text-center'>
                                    {item.title}
                                </h2>
                                <Image
                                    src={coint}
                                    alt='coint'
                                    className='w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-105'
                                />
                            </div>
                        </motion.div>

                        {/* Main Image Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className='relative w-full overflow-hidden rounded-2xl bg-white/95 shadow-xl'
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                className='w-full h-full object-cover'
                            />
                        </motion.div>

                        {/* Down Arrow Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            className='flex items-center justify-center animate-bounce'
                        >
                            <MdOutlineKeyboardDoubleArrowDown className='text-3xl md:text-4xl text-white' />
                        </motion.div>

                        {/* SVG Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            className='relative w-full max-w-4xl mx-auto hover:scale-[1.02] transition-transform duration-300'
                        >
                            <Image
                                src={item.svgUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                className='w-full h-auto drop-shadow-xl'
                            />
                        </motion.div>

                        {/* Description Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md 
                                rounded-xl p-6 md:p-8 border border-gray-300"
                        >
                            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                                Grafik ini menunjukkan perkembangan dan implementasi program kami yang telah berhasil dilaksanakan dengan kolaborasi para anggota.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Pelaksanaan Program', 'Pertumbuhan Anggota', 'Pengelolaan Dana', 'Keberlanjutan'].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-300">
                                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
