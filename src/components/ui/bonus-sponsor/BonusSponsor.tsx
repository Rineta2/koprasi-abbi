"use client"

import React, { useState, useEffect } from 'react'

import { BonusSponsorType } from '@/components/ui/bonus-sponsor/lib/schema'

import { FetchBonusSponsor } from '@/components/ui/bonus-sponsor/lib/FetchBonusSponsor'

import BonusSponsorSkeleton from '@/components/ui/bonus-sponsor/BonusSponsorSkeleton'

import { FloatingElements } from '@/components/ui/bonus-sponsor/ui/FloatingElement'

import { SponsorCard } from '@/components/ui/bonus-sponsor/ui/SponsorCard'

export default function BonusSponsor() {
    const [bonusSponsor, setBonusSponsor] = useState<BonusSponsorType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchBonusSponsor((newBonusSponsor) => {
            setBonusSponsor(newBonusSponsor);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <BonusSponsorSkeleton />;
    }

    return (
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
            <FloatingElements />

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
                <div className="flex flex-col space-y-24 md:space-y-32">
                    {bonusSponsor.map((item, index) => (
                        <SponsorCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}