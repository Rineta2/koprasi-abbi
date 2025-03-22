"use client"

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { FetchTentangKami } from '@/components/ui/tentang-kami/lib/FetchTentangKami';

import { TentangKamiType } from '@/components/ui/tentang-kami/lib/schema';

import TentangKamiSkelaton from '@/components/ui/tentang-kami/Tentang-kamiSkelaton';

import { SectionHeader } from '@/components/ui/tentang-kami/ui/TentangKamiHeader';

import { ImageSection } from '@/components/ui/tentang-kami/ui/Image';

import { FeatureItem } from '@/components/ui/tentang-kami/ui/FeatureItem';

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

    const features = ['Terpercaya', 'Profesional', 'Transparan', 'Berorientasi Anggota'];

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
                        <SectionHeader title={item.title} />

                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center'>
                            <ImageSection imageUrl={item.imageUrl} title={item.title} />

                            <motion.div
                                className='lg:col-span-7 flex flex-col space-y-6 md:space-y-8'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className='space-y-6 text-text'>
                                    <p className='text-base md:text-lg leading-relaxed'>{item.text}</p>
                                    <p className='text-base md:text-lg leading-relaxed'>{item.description}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {features.map((feature, index) => (
                                        <FeatureItem key={index} feature={feature} index={index} />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
            </div>
        </section>
    );
}

