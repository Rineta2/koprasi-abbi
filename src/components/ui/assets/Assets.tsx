"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Image from 'next/image'

import { AssetsType } from '@/components/ui/assets/lib/schema'

import { FetchAssets } from '@/components/ui/assets/lib/FetchAssets'

import AssetsSkeleton from '@/components/ui/assets/AssetsSkelaton'

export default function Assets() {

    const [assets, setAssets] = useState<AssetsType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchAssets((newAssets) => {
            setAssets(newAssets);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <AssetsSkeleton />;
    }

    return (
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95 -z-10"></div>

            {/* Background accent elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-5"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-5"></div>

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                        bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                        bg-clip-text text-transparent'>
                        Aset Kami
                    </h2>
                    <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                        rounded-full mx-auto mb-6"></div>
                    <p className="text-text/70 mt-4 text-sm md:text-base">
                        Pengelolaan aset yang transparan dan profesional untuk kesejahteraan anggota
                    </p>
                </motion.div>

                <div className="space-y-20 md:space-y-28">
                    {assets.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
                                {/* Content section */}
                                <motion.div
                                    className={`flex flex-col lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Asset icon */}
                                    <div className="mb-6 inline-flex">
                                        <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                                            <Image
                                                src={item.svgUrl}
                                                alt=""
                                                width={60}
                                                height={60}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Asset title */}
                                    <h3 className='text-2xl md:text-3xl font-bold mb-4 text-text'>
                                        {item.title}
                                    </h3>

                                    {/* Asset description */}
                                    <p className='text-text/80 text-base md:text-lg leading-relaxed mb-6'>
                                        {item.description}
                                    </p>

                                    {/* Feature tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {['Terpercaya', 'Profesional', 'Transparan'].map((tag, i) => (
                                            <span key={i} className="px-4 py-1.5 text-sm rounded-full
                                                bg-primary/10 text-primary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Image section */}
                                <motion.div
                                    className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr 
                                            from-primary/20 via-transparent to-transparent z-10"></div>

                                        {/* Main image */}
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            width={800}
                                            height={600}
                                            className="w-full aspect-[16/9] md:aspect-[4/3] object-cover"
                                            priority={index === 0}
                                        />

                                        {/* Decorative elements without hover effects */}
                                        <div className="absolute top-0 left-0 w-full h-full border border-primary/10 z-20 rounded-2xl"></div>
                                        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg z-20"></div>
                                        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg z-20"></div>
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
