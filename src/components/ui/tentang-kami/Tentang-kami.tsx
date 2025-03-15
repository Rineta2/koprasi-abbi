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
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-background'>
            <div className="container px-4 sm:px-6 lg:px-8">
                {tentangKami.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                            <motion.div
                                className='relative w-full aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl flex items-center justify-center'
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {/* Static background pattern */}
                                <div className="absolute inset-0 bg-[conic-gradient(from_45deg,#0000_25%,theme(colors.text.DEFAULT/0.05)_50%,#0000_75%)] opacity-50" />
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,theme(colors.text.DEFAULT/0.03)_0px,theme(colors.text.DEFAULT/0.03)_2px,transparent_2px,transparent_4px)]" />
                                <div className="absolute inset-0 bg-gradient-to-tl from-primary/30 via-transparent to-primary-dark/30" />

                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className='object-cover relative z-10'
                                    priority
                                />
                            </motion.div>

                            <motion.div
                                className='flex flex-col space-y-10 md:space-y-12'
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary-dark animate-gradient'>
                                    {item.title}
                                </h2>

                                <div className='flex flex-col space-y-8 text-text-dark/90'>
                                    <p className='text-base md:text-lg lg:text-xl leading-relaxed'>
                                        {item.text}
                                    </p>

                                    <p className='text-base md:text-lg lg:text-xl leading-relaxed'>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

