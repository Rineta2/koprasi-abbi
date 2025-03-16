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
        <section className="relative min-h-full overflow-hidden py-24 bg-gradient-to-b from-background via-background/90 to-background/50">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="space-y-32">
                    {assets.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group"
                        >
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                                <div className='flex flex-col gap-8 p-6 rounded-2xl bg-background/5 backdrop-blur-sm'>
                                    <motion.h1
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className='text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text via-text/90 to-text-dark'
                                    >
                                        {item.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        className='text-text-dark text-lg md:text-xl lg:text-2xl leading-relaxed'
                                    >
                                        {item.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.1 }}
                                        className="w-fit"
                                    >
                                        <Image
                                            src={item.svgUrl}
                                            alt={item.title}
                                            width={500}
                                            height={500}
                                            className='w-20 h-20 md:w-24 md:h-24'
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    className='relative overflow-hidden rounded-2xl shadow-2xl'
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className='w-full h-[500px] object-cover'
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
