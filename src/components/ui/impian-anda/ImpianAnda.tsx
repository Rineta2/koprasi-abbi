"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FetchImpianAnda } from "@/components/ui/impian-anda/lib/FetchImpianAnda"
import ImpianAndaSkelaton from "@/components/ui/impian-anda/ImpianAndaSkelaton"
import { ImpianAndaType } from "@/components/ui/impian-anda/lib/schema"
import Image from "next/image"

export default function ImpianAnda() {
    const [impianAnda, setImpianAnda] = useState<ImpianAndaType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchImpianAnda((newImpianAnda) => {
            setImpianAnda(newImpianAnda);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ImpianAndaSkelaton />;
    }

    return (
        <section className='py-24 md:py-32 lg:py-40 relative overflow-hidden'>
            {/* Modern geometric pattern overlay with wider spacing */}
            <div className="absolute inset-0 -z-10">
                {/* Primary pattern - wider grid spacing */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc20_1px,transparent_1px),linear-gradient(to_bottom,#1091cc20_1px,transparent_1px)] 
                    bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>

                {/* Secondary larger pattern - even wider spacing */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc10_1px,transparent_1px),linear-gradient(to_bottom,#1091cc10_1px,transparent_1px)] 
                    bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>

                {/* Diagonal accent lines with more spacing */}
                <div className="absolute h-[1px] w-[200%] bg-gradient-to-r from-primary/20 to-transparent transform -rotate-45 left-[-50%] top-[25%]"></div>
                <div className="absolute h-[1px] w-[200%] bg-gradient-to-r from-primary/20 to-transparent transform -rotate-45 left-[-50%] top-[75%]"></div>

                {/* Animated gradient blur */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[900px] h-[700px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
                </div>
            </div>

            <div className="container px-6 sm:px-8 lg:px-12 mx-auto relative z-10 max-w-[1600px]">
                {/* Section header */}
                <motion.div
                    className="text-center mb-24 md:mb-32 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 
                        bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                        bg-clip-text text-transparent tracking-tight'>
                        Wujudkan Impian Anda
                    </h2>
                    <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-primary to-primary/30 
                        rounded-full mx-auto mb-8"></div>
                    <p className="text-text/70 mt-6 text-base md:text-lg max-w-2xl mx-auto">
                        Kami siap membantu mewujudkan berbagai impian dan kebutuhan finansial Anda dengan solusi yang tepat
                    </p>
                </motion.div>

                <div className="space-y-40 md:space-y-56 lg:space-y-64">
                    {impianAnda.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            key={item.id}
                            className="py-8 md:py-12"
                        >
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-24 items-center'>
                                {/* Content container */}
                                <motion.div
                                    className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <div className="bg-background/70 backdrop-blur-sm p-8 md:p-10 lg:p-12 rounded-2xl border border-primary/10 shadow-lg">
                                        {/* Small icon tag */}
                                        <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            Solusi Finansial
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-text tracking-tight">
                                            {item.title}
                                        </h3>

                                        {/* Underline */}
                                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full mb-8"></div>

                                        {/* Description */}
                                        <p className="text-text/80 text-base md:text-lg leading-relaxed mb-10">
                                            {item.description}
                                        </p>

                                        {/* Feature points */}
                                        <div className="space-y-5">
                                            {['Proses Mudah', 'Bunga Kompetitif', 'Tenor Fleksibel'].map((feature, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                    </div>
                                                    <span className="text-text text-base md:text-lg">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Image container */}
                                <motion.div
                                    className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-xl">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 left-0 w-full h-full border border-primary/10 z-20 rounded-3xl"></div>
                                        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-xl z-20"></div>
                                        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-xl z-20"></div>

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr 
                                            from-primary/15 via-transparent to-transparent z-10"></div>

                                        {/* Main image with fixed height */}
                                        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[650px] relative">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                                width={1000}
                                                height={700}
                                                priority={index === 0}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
