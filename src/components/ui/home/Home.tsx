"use client"

import React, { useState, useEffect } from 'react'

import { HomeType } from '@/components/ui/home/lib/schema'

import { FetchHome } from '@/components/ui/home/lib/FetchHome'

import HomeSkelaton from '@/components/ui/home/HomeSkelaton'

import { motion } from 'framer-motion'

import HeroText from '@/components/ui/home/ui/HeroText'

import HeroImage from '@/components/ui/home/ui/HeroImage'

export default function Home() {
    const [home, setHome] = useState<HomeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchHome((newHome) => {
            setHome(newHome);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <HomeSkelaton />;
    }

    return (
        <section className='min-h-screen relative overflow-hidden flex items-center pt-6 md:pt-0 bg-gradient-to-b from-slate-50 to-white' id='home'>
            {/* Modern mesh gradient overlay dengan animasi */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_40%)] z-0"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-24 items-center">
                    <HeroText home={home[0]} />
                    <HeroImage home={home[0]} />
                </div>
            </div>
        </section>
    )
}
