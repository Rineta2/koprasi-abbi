"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import PartnerSkelaton from '@/components/ui/partner/PartnerSkelaton';

import { FetchPartner } from '@/components/ui/partner/lib/FetchPartner';

import { PartnerType } from '@/components/ui/partner/lib/schema';

import Image from 'next/image';

import Marquee from 'react-fast-marquee';

export default function Partner() {
    const [partner, setPartner] = useState<PartnerType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchPartner((newPartner) => {
            setPartner(newPartner);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PartnerSkelaton />;
    }

    return (
        <section className="py-12 md:py-20 overflow-hidden">
            <div className="container relative px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 md:mb-16 text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold 
                        bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                        bg-clip-text text-transparent
                        tracking-tight mb-3">
                        Bekerja Sama Dengan
                    </h2>
                    <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                        rounded-full mx-auto"></div>
                    <p className="text-text/70 mt-4 text-sm md:text-base max-w-xl mx-auto">
                        Kami bermitra dengan berbagai organisasi untuk memberikan layanan terbaik bagi anggota kami
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Left gradient fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 
                        bg-gradient-to-r from-background to-transparent z-10" />

                    <Marquee
                        gradient={false}
                        speed={30}
                        pauseOnHover={true}
                        autoFill={true}
                        loop={0}
                        className='overflow-hidden py-4'
                    >
                        {partner.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(16,145,204,0.15)' }}
                                className='group flex items-center justify-center mx-3 md:mx-5 lg:mx-6
                                    p-4 sm:p-6 md:p-8 
                                    h-28 sm:h-32 md:h-36 lg:h-40
                                    rounded-xl bg-white/[0.03]
                                    backdrop-blur-sm border border-primary/10
                                    transition-all duration-300 ease-out'
                            >
                                <div className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-full 
                                    relative flex items-center justify-center">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.id}
                                        fill
                                        className='object-contain opacity-85 group-hover:opacity-100
                                            transition-all duration-300 scale-90 group-hover:scale-95
                                            filter group-hover:brightness-110 group-hover:drop-shadow-md'
                                        sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
                                        priority={true}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </Marquee>

                    {/* Right gradient fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 
                        bg-gradient-to-l from-background to-transparent z-10" />
                </div>
            </div>
        </section>
    )
}
