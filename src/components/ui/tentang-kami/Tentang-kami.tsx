"use client"

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { FetchTentangKami } from '@/components/ui/tentang-kami/lib/FetchTentangKami';

import { TentangKamiType } from '@/components/ui/tentang-kami/lib/schema';

import TentangKamiSkelaton from '@/components/ui/tentang-kami/Tentang-kamiSkelaton';

import Image from 'next/image';

export default function TentangKami() {
    const [tentangKami, setTentangKami] = useState<TentangKamiType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchTentangKami((newTentangKami) => {
            setTentangKami(newTentangKami);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <TentangKamiSkelaton />;
    }

    return (
        <section className='relative py-16 md:py-24 lg:py-32 flex items-center overflow-hidden bg-gradient-to-b from-background to-background/95' id='about'>
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                {tentangKami.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        {/* Section header */}
                        <motion.div
                            className="text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                                bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                                bg-clip-text text-transparent'>
                                {item.title}
                            </h2>
                            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                                rounded-full mx-auto mb-6"></div>
                        </motion.div>

                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center'>
                            {/* Image container */}
                            <motion.div
                                className='lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl'
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 z-10" />

                                <div className="group relative overflow-hidden aspect-[4/3]">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out'
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                    />
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30 -z-0"></div>
                                <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30 -z-0"></div>
                            </motion.div>

                            {/* Content container */}
                            <motion.div
                                className='lg:col-span-7 flex flex-col space-y-6 md:space-y-8'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className='space-y-6 text-text'>
                                    <p className='text-base md:text-lg leading-relaxed'>
                                        {item.text}
                                    </p>

                                    <p className='text-base md:text-lg leading-relaxed'>
                                        {item.description}
                                    </p>
                                </div>

                                {/* Feature highlights */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {['Terpercaya', 'Profesional', 'Transparan', 'Berorientasi Anggota'].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.1 * index }}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base font-medium text-text">{feature}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
            </div>
        </section>
    )
}

