"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import ImpianAndaSkelaton from "@/components/ui/impian-anda/ImpianAndaSkelaton"

import { PrizePoolType } from "@/components/ui/prize-pool/lib/schema"

import { FetchPrizePool } from "@/components/ui/prize-pool/lib/FetchPrizePool"

import { containerVariants } from "@/components/ui/prize-pool/lib/animation"

import {
    TopLeftDecoration,
    TopRightDecoration,
    BottomRightDecoration,
    CenterRightDecoration
} from "@/components/ui/prize-pool/ui/Decorations"

import { PrizePoolItem } from "@/components/ui/prize-pool/ui/PrizePoolItem"

export default function PrizePool() {
    const [prizePool, setPrizePool] = useState<PrizePoolType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchPrizePool((newPrizePool) => {
            setPrizePool(newPrizePool);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ImpianAndaSkelaton />;
    }

    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-32 relative overflow-hidden'>
            <TopLeftDecoration />
            <TopRightDecoration />
            <BottomRightDecoration />
            <CenterRightDecoration />

            <motion.div
                className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {prizePool.map((item) => (
                    <PrizePoolItem key={item.id} item={item} />
                ))}
            </motion.div>
        </section>
    )
}
