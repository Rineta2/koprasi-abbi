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
        <div className="container relative px-4 md:px-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative text-center text-2xl md:text-3xl font-bold mb-12 md:mb-16
                    bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text text-transparent
                    after:absolute after:content-[''] after:w-24 md:after:w-32 after:h-1 
                    after:bg-gradient-to-r after:from-white/40 after:to-transparent
                    after:bottom-[-0.75rem] md:after:bottom-[-1rem] after:left-1/2 after:-translate-x-1/2
                    after:rounded-full after:blur-sm
                    tracking-tight">
                Bekerja Sama Dengan
            </motion.h2>
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <Marquee
                gradient={false}
                speed={35}
                pauseOnHover={true}
                autoFill={true}
                loop={0}
                className='overflow-hidden'
            >
                {partner.map((item) => (
                    <div
                        key={item.id}
                        className='group relative flex items-center justify-center p-4 md:p-8 mx-3 md:mx-6 
                        rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08]
                        hover:from-white/[0.05] hover:to-white/[0.12]
                        backdrop-blur-xl border border-white/10 
                        transition-all duration-500 ease-out 
                        hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] 
                        hover:-translate-y-1 hover:scale-[1.02]'
                    >
                        <div className="w-[120px] md:w-[160px] h-[60px] md:h-[80px] relative flex items-center justify-center">
                            <Image
                                src={item.imageUrl}
                                alt={item.id}
                                fill
                                className='object-contain opacity-50 group-hover:opacity-100 
                                transition-all duration-500 scale-95 group-hover:scale-100
                                filter group-hover:brightness-110'
                                sizes="(max-width: 768px) 120px, 160px"
                            />
                        </div>
                    </div>
                ))}
            </Marquee>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
        </div>
    )
}
